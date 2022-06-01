const Joi = require('joi');
const { objectId } = require('./custom.validation');

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
        cloudinary_id: Joi.string(),
    })
}

const getDestination = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId)
    })
}

const updateDestination = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId)
    }),
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
        cloudinary_id: Joi.string(),
    })
}

const deleteDestination = {
    params: Joi.object().keys({
        id: Joi.string().custom(objectId)
    })
}

module.exports = {
    createDestination,
    getDestination,
    updateDestination,
    deleteDestination
}