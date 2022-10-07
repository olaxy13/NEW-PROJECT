const Joi = require('joi');

const registerValidator = Joi.object({
    fullName: Joi.string().required().error(new Error('Full name is required.')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string().min(5).required(),
})
module.exports = registerValidator;