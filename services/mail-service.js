const nodemailer = require('nodemailer');
const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});

const sendVerificationCodeToUser = async function (userData, verificationCode) {

    const mailDetails = {
        from: 'acumen@acumen.com',
        to: userData.email,
        subject: 'Welcome To Acumen',
        text: `Welcome to Acumen, kindly confirm your email address with the verification code ${verificationCode} .`
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs', err);
        } else {
            console.log('Email sent successfully');
        }
    });
};


module.exports = {
    sendVerificationCodeToUser
};




