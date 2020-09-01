const Joi = require('joi');

const newUserSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().optional(),
    password: Joi.string().required(),
    dob: Joi.date().required(),
    gender: Joi.string().valid('MALE', 'FEMALE').optional(),
});


const validateNewUserRequest= function(newUserRequest){
    return newUserSchema.validate(newUserRequest);
};

module.exports = {
    validateNewUserRequest,
};
