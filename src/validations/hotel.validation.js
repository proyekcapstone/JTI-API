const Joi = require('joi');

const createHotel = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string(),
        description: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        province: Joi.string().required(),
        postalcode: Joi.string().required(),
        telephone: Joi.string().required()
    })
};

module.exports = {
    createHotel,
};