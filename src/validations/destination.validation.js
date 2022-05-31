const Joi = require('joi');

const createDestination = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string(),
        description: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        province: Joi.string().required(),
        postalCode: Joi.number().integer().required(),
        telephone: Joi.number().integer().required(),
        openTime: Joi.string().required(),
        openDay: Joi.string().required(),
        ticket: Joi.number().integer().required(),
        website: Joi.string().required(),
        instagram: Joi.string().required(),
    })
}

module.exports = {
    createDestination,
}