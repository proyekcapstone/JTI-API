const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createHotel = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    province: Joi.string().required(),
    postalcode: Joi.string().required(),
    telephone: Joi.string().required(),
    cloudinary_id: Joi.string(),
  }),
};

const getHotel = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateHotel = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
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
    cloudinary_id: Joi.string(),
  }),
};

const deleteHotel = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createHotel,
  getHotel,
  updateHotel,
  deleteHotel,
};
