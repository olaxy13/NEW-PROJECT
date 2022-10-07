const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string().min(5).required(),
})


const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string().min(5).required(),
})



const profileSchema = Joi.object({
    
})

module.exports ={
    authSchema: authSchema,
    loginSchema: loginSchema,
    profileSchema:profileSchema
}  