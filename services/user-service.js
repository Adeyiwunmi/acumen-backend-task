const {validateNewUserRequest} = require('../validators/register-user-request-validator');
const {validateVerifyUserRequest} = require('../validators/verify-user-validator');
const {validateLoginRequest} = require('../validators/login-request-validator');

const jwt = require('jsonwebtoken');
const {usersCollection, verificationCodesCollection} = require('../firestore/firestore_db');
const {sendVerificationCodeToUser} = require('../services/mail-service');
const bcrypt = require('bcrypt');
const util = require('util');

const bcryptHash = util.promisify(bcrypt.hash);
const bcryptCompare = util.promisify(bcrypt.compare);


const generateVerificationCode = function () {
    return Math.floor(100000 + Math.random() * 900000);
};


const persistUserVerificationCode = async function (username, verificationCode) {
    const verificationCodeData = {
        username,
        code: verificationCode,
        activated: false,
    };
    verificationCode = `${verificationCode}`;
    await verificationCodesCollection.doc(verificationCode).set(verificationCodeData);
};

const hashUserPassword = async function (userData) {
    userData.password = await bcryptHash(userData.password, 10);
};

const registerNewUser = async function (req, res) {
        let userData = req.body;

        const result = validateNewUserRequest(userData);
        if (result.error) {
            return res.status(400).send(result.error);
        }

        const username = userData.user_name ? userData.user_name : userData.email;
        let usersWithExistingEmail = await usersCollection.doc(username).get();
        if (usersWithExistingEmail.exists) {
            return res.status(400).send('A user already exist with the same username');
        }

        userData = {
            ...userData,
            emailConfirmed: false
        };
        userData.username = username;
        await hashUserPassword(userData);
        await usersCollection.doc(username).set(userData);
        const verificationCode = generateVerificationCode();
        await sendVerificationCodeToUser(userData, verificationCode);
        await persistUserVerificationCode(username, verificationCode);
        return res.status(200).send(userData);

};


const verifyUserEmail = async function (req, res) {
    try {

        let verifyUserRequest = req.body;
        const result = validateVerifyUserRequest(verifyUserRequest);
        if (result.error) {
            return res.status(400).send(result.error);
        }

        let existingVerificationCode = await verificationCodesCollection.doc(verifyUserRequest.verification_code).get();
        if (!existingVerificationCode.exists) {
            return res.status(400).send('Invalid Verification Code');
        }
        existingVerificationCode = existingVerificationCode.data();
        if (existingVerificationCode.activated) {
            return res.status(400).send('Verification Code already activated');
        }

        if (existingVerificationCode.username !== verifyUserRequest.username) {
            return res.status(400).send('User Id does not match');
        }

        existingVerificationCode.activated = true;
        await verificationCodesCollection.doc(verifyUserRequest.verification_code).set(existingVerificationCode);

        let userData = await usersCollection.doc(existingVerificationCode.username).get();
        userData = userData.data();
        userData.emailConfirmed = true;
        await usersCollection.doc(existingVerificationCode.username).set(userData);
        return res.status(200).send(userData);


    } catch (e) {
        return res.status(500).send(e.message);
    }
};


const login = async function (req, res) {

        let loginRequest = req.body;
        const validationResult = validateLoginRequest(loginRequest);
        if (validationResult.error) {
            return res.status(400).send(validationResult.error);
        }

        let existingUser = await usersCollection.doc(loginRequest.username).get();
        if (!existingUser.exists) {
            return res.status(401).send('Invalid username/password combination');
        }
        existingUser = existingUser.data();

        if (!existingUser.emailConfirmed) {
            return res.status(401).send('user email is not verified');
        }
        const bcryptResult = await bcryptCompare(loginRequest.password, existingUser.password);
        if (!bcryptResult) {
            return res.status(401).send('Invalid username/password combination');
        }
        const token = jwt.sign({data: existingUser,}, process.env.JWT_SECRET, {expiresIn: 60 * 60});

        return res.status(200).send({token, username: loginRequest.username});

};

module.exports = {
    registerNewUser,
    verifyUserEmail,
    login
};
