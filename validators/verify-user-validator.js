const Joi = require('joi');

const verifyUserValidator = Joi.object({
    username: Joi.string().required(),
    verification_code: Joi.string().length(6).required(),
});


const validateVerifyUserRequest = function (verifyUserRequest) {
    return verifyUserValidator.validate(verifyUserRequest);
};

module.exports = {
    validateVerifyUserRequest,
};
