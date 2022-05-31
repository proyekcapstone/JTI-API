const httpStatus = require("http-status");
const Hotel = require("../models/hotel.model");
const ApiError = require("../utils/ApiError");

/**
 * Create Hotel
 * @param {Object} hotelBody 
 * @param {String} image 
 * @returns {Promise<Hotel>}
 */
const createHotel = async (hotelBody, image) => {
    if (!image) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Image Not Found!');
    }
    const hotel = {
        name: hotelBody.name,
        image: image,
        description: hotelBody.description,
        address: hotelBody.address,
        city: hotelBody.city,
        province: hotelBody.province,
        postalcode: hotelBody.postalcode,
        telephone: hotelBody.telephone
    };
    return Hotel.create(hotel);
};

/**
 * Query all Hotels
 * @returns {Promise<Hotel>}
 */
const getHotels = async () => {
    const hotels = await Hotel.find();
    return hotels;
};

module.exports = {
    createHotel,
    getHotels,
};