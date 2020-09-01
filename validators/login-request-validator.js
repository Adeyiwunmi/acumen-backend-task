const Joi = require('joi');

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});


const validateLoginRequest = function (loginRequest) {
    return loginSchema.validate(loginRequest);
};

module.exports = {
    validateLoginRequest,
};
