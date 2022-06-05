const httpStatus = require('http-status');
const cloudinary = require('cloudinary').v2;
const Destination = require('../models/destination.model');
const ApiError = require('../utils/ApiError');

/**
 * Create Destination
 * @param {Object} destinationBody
 * @param {String} image
 * @returns {Promise<any>}
 */
const createDestination = async (destinationBody, image) => {
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image Not Found!');
  }

  const result = await cloudinary.uploader.upload(image);

  const destinationRequest = {
    name: destinationBody.name,
    image: result.secure_url,
    description: destinationBody.description,
    address: destinationBody.address,
    city: destinationBody.city,
    province: destinationBody.province,
    postalCode: destinationBody.postalCode,
    telephone: destinationBody.telephone,
    openTime: destinationBody.openTime,
    openDay: destinationBody.openDay,
    ticket: destinationBody.ticket,
    website: destinationBody.website,
    instagram: destinationBody.instagram,
    cloudinary_id: result.public_id,
  };
  const destination = new Destination(destinationRequest);
  const data = await destination.save();
  return data;
};

/**
 * Query all Destinations
 * @returns {Promise<any>}
 */
const getDestinations = async () => {
  const destinations = await Destination.find();
  if (!destinations) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Destinations Not Found!');
  }
  return destinations;
};

/**
 * Query Destination by id
 * @param {number} id
 * @returns {Promise<any>}
 */
const getDestination = async (id) => {
  const destination = await Destination.findById(id);
  if (!destination) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Destinations Not Found!');
  }
  return destination;
};

/**
 * Update Destination by id
 * @param {number} id
 * @param {Object} destinationBody
 * @param {String} imageRequset
 * @returns {Promise<any>}
 */
const updateDestination = async (id, destinationBody, imageRequset) => {
  if (!imageRequset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image Not Found!');
  }

  const result = await cloudinary.uploader.upload(imageRequset);

  const destination = await getDestination(id);
  await cloudinary.uploader.destroy(
    destination.cloudinary_id,
    (error, result) => {
      console.log(result, error);
    }
  );

  const destinationRequest = {
    name: destinationBody.name || destination.name,
    image: result.secure_url || destination.image,
    description: destinationBody.description || destination.description,
    address: destinationBody.address || destination.address,
    city: destinationBody.city || destination.city,
    province: destinationBody.province || destination.province,
    postalCode: destinationBody.postalCode || destination.postalCode,
    telephone: destinationBody.telephone || destination.telephone,
    openTime: destinationBody.openTime || destination.openTime,
    openDay: destinationBody.openDay || destination.openDay,
    ticket: destinationBody.ticket || destination.ticket,
    website: destinationBody.website || destination.website,
    instagram: destinationBody.instagram || destination.instagram,
    cloudinary_id: result.public_id || destination.cloudinary_id,
  };

  const data = await Destination.findByIdAndUpdate(
    id,
    { $set: destinationRequest },
    { new: true }
  );
  return data;
};

/**
 * Delete Destination by id
 * @param {number} id
 * @returns {Promise<any>}
 */
const deleteDestination = async (id) => {
  await Destination.findByIdAndDelete(id);
  return 'Destination Successfully Deleted!';
};

module.exports = {
  createDestination,
  getDestinations,
  getDestination,
  updateDestination,
  deleteDestination,
};
