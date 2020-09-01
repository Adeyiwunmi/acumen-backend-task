const {validateCourseEnrollmentRequest} = require('../validators/course-enrollment-validator');
const {findCourseById} = require('./courses-helper');
const uuid = require('uuid');

const {studentsEnrollmentCollection} = require('../firestore/firestore_db');


const createEnrollment = async function (req, res) {
        const enrollmentRequest = req.body;
        const validationResult = validateCourseEnrollmentRequest(enrollmentRequest);
        if (validationResult.error) {
            return res.status(400).send(validationResult.error);
        }
        const course = findCourseById(enrollmentRequest.course_id);
        if (!course) {
            return res.status(400).send("Invalid Course");
        }

        const enrollmentId = uuid.v1();
        const enrollmentData = {
            student_username: enrollmentRequest.student_username,
            course_id: enrollmentRequest.course_id,
            course_title: course.title,
            course_author: course.author,
            course_image: course.image,
            enrollment_id: enrollmentId,
        };

        await studentsEnrollmentCollection.doc(enrollmentId).set(enrollmentData);
        return res.send(enrollmentData);
};


const listEnrollments = async function (req, res) {
    const student_username = req.params.student_usename;
    if (!student_username){
        return res.status(400).send(' provide student_username as request parameter');
    }
    const enrollments = await  studentsEnrollmentCollection.get();
    const student_enrollments = [];
    enrollments.forEach((enrollment) => {
        student_enrollments.push(enrollment.data());
    });
    return res.status(200).send(student_enrollments);
};

const deleteEnrollment = async function(req, res){
    const enrollment_id = req.params.enrollment_id;
    if (!enrollment_id){
        return res.status(400).send(' provide enrollment_id as request parameter');
    }
    const enrollmentDoc = studentsEnrollmentCollection.doc(enrollment_id);
    await enrollmentDoc.delete();
    return res.status(200).send('Enrollment successfully deleted');
};

module.exports = {
    createEnrollment,
    listEnrollments,
    deleteEnrollment,
};


