const Joi = require('joi');

const toySchema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    info: Joi.string().min(5).max(1024).required(),
    category: Joi.string().min(2).max(255).required(),
    img_url: Joi.string().allow('').optional(), 
    price: Joi.number().min(0).required()
 
});

module.exports = toySchema;
