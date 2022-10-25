const Joi = require('joi');

const depositValidator = Joi.object({
    full_name: Joi.string().required().error(new Error('Full Name is required.')),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .error(new Error("Email is required")),
    amount: Joi.number().required().error(new Error('Amount is required.')),
    bank: Joi.string().required().error(new Error('Bank is required.')),
})  
module.exports = depositValidator;