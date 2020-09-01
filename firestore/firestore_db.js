const admin = require("firebase-admin");

if (!process.env.SERVICE_ACCOUNT_FILE_NAME) {
    process.env.SERVICE_ACCOUNT_FILE_NAME = 'acumen-students-firebase-adminsdk-82sck-0e2395a07e.json';
}

if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'https://acumen-students.firebaseio.com';
}
const serviceAccount = require(`../${process.env.SERVICE_ACCOUNT_FILE_NAME}`);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.DATABASE_URL
    });
}

const db = admin.firestore();

const usersCollection = db.collection('users');
const verificationCodesCollection = db.collection('verification-codes');
const studentsEnrollmentCollection = db.collection('students-enrollments');

module.exports = {
    usersCollection,
    verificationCodesCollection,
    studentsEnrollmentCollection
};
