const Joi = require('joi');

const profileValidator = Joi.object({
    handle: Joi.string().required().max(40).error(new Error('Handle is required.')),
    bio: Joi.string().required().error(new Error('Handle is required.')),
    social: Joi.object({
        youtube: Joi.string().uri,
        twitter: Joi.string().uri,
        facebook: Joi.string().uri,
        linkedin: Joi.string().uri,
        instagram: Joi.string().uri,
    })

})
module.exports = profileValidator;