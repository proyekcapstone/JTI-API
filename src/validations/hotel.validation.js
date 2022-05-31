const Joi = require('joi');

const createHotel = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        // imageHotel: Joi.string().required(),
    })
};

module.exports = {
    createHotel,
};