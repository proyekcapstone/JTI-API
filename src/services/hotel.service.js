const httpStatus = require("http-status");
const Hotel = require("../models/hotel.model");
const ApiError = require("../utils/ApiError");

/**
 * Create Hotel
 * @param {Object} hotelBody 
 * @param {String} image 
 * @returns {Promise<Hotel>}
 */
const createHotel = async (hotelBody) => {
    // if (!imageHotel) {
    //     throw new ApiError(httpStatus.NOT_FOUND, 'Image Not Found!');
    // }
    const hotel = {
        name: hotelBody.name,
        description: hotelBody.description,
    };
    // imageHotel: imageHotel,
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