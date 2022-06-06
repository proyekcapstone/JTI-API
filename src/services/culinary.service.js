const httpStatus = require('http-status');
const Culinary = require('../models/culinary.model');
const cloudinary = require('cloudinary').v2;
const ApiError = require('../utils/ApiError');

/**
 * Create Culinary
 * @param {Object} culinaryBody
 * @param {String} image
 * @returns {Promise<any>}
 */
const createCulinary = async (culinaryBody, image) => {
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image Not Found!');
  }

  const result = await cloudinary.uploader.upload(image);

  const culinaryRequest = {
    name: culinaryBody.name,
    image: result.secure_url,
    description: culinaryBody.description,
    address: culinaryBody.address,
    city: culinaryBody.city,
    province: culinaryBody.province,
    postalCode: culinaryBody.postalCode,
    telephone: culinaryBody.telephone,
    openTime: culinaryBody.openTime,
    openDay: culinaryBody.openDay,
    ticket: culinaryBody.ticket,
    website: culinaryBody.website,
    instagram: culinaryBody.instagram,
    cloudinary_id: result.public_id,
  };
  const culinary = new Culinary(culinaryRequest);
  const data = await culinary.save();
  return data;
};

/**
 * Query all Culinarys
 * @returns {Promise<any>}
 */
const getCulinarys = async () => {
  const culinarys = await Culinary.find();
  if (!culinarys) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Culinarys Not Found!');
  }
  return culinarys;
};

/**
 * Query Culinary by id
 * @param {number} id
 * @returns {Promise<any>}
 */
const getCulinary = async (id) => {
  const culinary = await Culinary.findById(id);
  if (!culinary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Culinarys Not Found!');
  }
  return culinary;
};

/**
 * Update Culinary by id
 * @param {number} id
 * @param {Object} culinaryBody
 * @param {String} imageRequset
 * @returns {Promise<any>}
 */
const updateCulinary = async (id, culinaryBody, imageRequset) => {
  if (!imageRequset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image Not Found!');
  }

  const result = await cloudinary.uploader.upload(imageRequset);

  const culinary = await getCulinary(id);
  await cloudinary.uploader.destroy(culinary.cloudinary_id, (error, result) => {
    console.log(result, error);
  });

  const culinaryRequest = {
    name: culinaryBody.name || culinary.name,
    image: result.secure_url || culinary.image,
    description: culinaryBody.description || culinary.description,
    address: culinaryBody.address || culinary.address,
    city: culinaryBody.city || culinary.city,
    province: culinaryBody.province || culinary.province,
    postalCode: culinaryBody.postalCode || culinary.postalCode,
    telephone: culinaryBody.telephone || culinary.telephone,
    openTime: culinaryBody.openTime || culinary.openTime,
    openDay: culinaryBody.openDay || culinary.openDay,
    ticket: culinaryBody.ticket || culinary.ticket,
    website: culinaryBody.website || culinary.website,
    instagram: culinaryBody.instagram || culinary.instagram,
    cloudinary_id: result.public_id || culinary.cloudinary_id,
  };

  const data = await Culinary.findByIdAndUpdate(
    id,
    { $set: culinaryRequest },
    { new: true }
  );
  return data;
};

/**
 * Delete Culinary by id
 * @param {number} id
 * @returns {Promise<any>}
 */
const deleteCulinary = async (id) => {
  const culinary = await getCulinary(id);
  await cloudinary.uploader.destroy(culinary.cloudinary_id, (error, result) => {
    console.log(result, error);
  });
  await Culinary.findByIdAndDelete(id);
  return 'Culinary Successfully Deleted!';
};

const searchCulinary = async (query) => {
  const searchQuery = query;
  const culinary = await Culinary.find({
    name: { $regex: searchQuery, $options: '$i' },
  });
  return culinary;
};

module.exports = {
  createCulinary,
  getCulinarys,
  getCulinary,
  updateCulinary,
  deleteCulinary,
  searchCulinary,
};
