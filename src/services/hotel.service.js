const httpStatus = require('http-status');
const cloudinary = require('cloudinary').v2;
const Hotel = require('../models/hotel.model');
const ApiError = require('../utils/ApiError');

/**
 * Create Hotel
 * @param {Object} hotelBody
 * @param {String} image
 * @returns {Promise<any>}
 */
const createHotel = async (hotelBody, image) => {
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image Not Found!');
  }

  const result = await cloudinary.uploader.upload(image);

  const hotelRequest = {
    name: hotelBody.name,
    image: result.secure_url,
    description: hotelBody.description,
    address: hotelBody.address,
    city: hotelBody.city,
    province: hotelBody.province,
    postalcode: hotelBody.postalcode,
    telephone: hotelBody.telephone,
    cloudinary_id: result.public_id,
  };
  const hotel = new Hotel(hotelRequest);
  const data = await hotel.save();
  return data;
};

/**
 * Query all Hotels
 * @returns {Promise<any>}
 */
const getHotels = async () => {
  const hotels = await Hotel.find();
  if (!hotels) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hotels Not Found');
  }
  return hotels;
};

/**
 * Query Hotel by id
 * @param {number} id
 * @returns {Promise<any>}
 */
const getHotelById = async (id) => {
  const hotel = await Hotel.findById(id);
  if (!hotel) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hotels Not Found!');
  }
  return hotel;
};

/**
 * Update Hotel by id
 * @param {number} id
 * @param {Object} hotelBody
 * @param {String} imageRequset
 * @returns {Promise<any>}
 */
const updateHotel = async (id, hotelBody, imageRequset) => {
  if (!imageRequset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image Not Found!');
  }

  const result = await cloudinary.uploader.upload(imageRequset);

  const hotel = await getHotelById(id);
  await cloudinary.uploader.destroy(hotel.cloudinary_id, (error, result) => {
    console.log(result, error);
  });

  const hotelRequest = {
    name: hotelBody.name || hotel.name,
    image: result.secure_url || hotel.image,
    description: hotelBody.description || hotel.description,
    address: hotelBody.address || hotel.address,
    city: hotelBody.city || hotel.city,
    province: hotelBody.province || hotel.province,
    postalCode: hotelBody.postalCode || hotel.postalCode,
    telephone: hotelBody.telephone || hotel.telephone,
    cloudinary_id: result.public_id || hotel.cloudinary_id,
  };

  const data = await Hotel.findByIdAndUpdate(
    id,
    { $set: hotelRequest },
    { new: true }
  );
  return data;
};

/**
 * Delete Destination by id
 * @param {number} id
 * @returns {Promise<any>}
 */
const deleteHotel = async (id) => {
  const hotel = await getHotelById(id);
  await cloudinary.uploader.destroy(hotel.cloudinary_id, (error, result) => {
    console.log(result, error);
  });
  await Hotel.findByIdAndDelete(id);
  return 'Hotel Successfully Deleted!';
};

const searchHotel = async (query) => {
  const searchQuery = query;
  const hotel = await Hotel.find({
    name: { $regex: searchQuery, $options: '$i' },
  });
  return hotel;
};

module.exports = {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  searchHotel,
};
