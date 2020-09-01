const Joi = require('joi');

const courseEnrollmentSchema = Joi.object({
    course_id: Joi.string().required(),
    student_username: Joi.string().required()
});


const validateCourseEnrollmentRequest = function (courseEnrollmentRequest) {
    return courseEnrollmentSchema.validate(courseEnrollmentRequest);
};

module.exports = {
    validateCourseEnrollmentRequest,
};
