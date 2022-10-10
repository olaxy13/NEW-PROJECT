const Joi = require('joi');

const productValidator = Joi.object({
    title: Joi.string().required().max(40).error(new Error('Title is required.')),
    description: Joi.string().required().error(new Error('Description is required.')),
    category: Joi.array().items(Joi.string()).required().error(new Error('category is required.')),
    review: Joi.string().required().error(new Error('review is required.')),
    price: Joi.number().required().error(new Error('price is required.')),
})  
module.exports = productValidator;