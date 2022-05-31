const Joi = require('joi');

const createHotel = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string(),
        description: Joi.string().required(),
    })
};

module.exports = {
    createHotel,
};