const httpStatus = require("http-status");
const { hotelService } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const createHotel = catchAsync(async (req, res) => {
    try {
        const hotel = await hotelService.createHotel(req.body);
        res.status(httpStatus.CREATED).send(hotel);
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
});

const getHotels = catchAsync(async (req, res) => {
    try {
        const hotels = await hotelService.getHotels();
        res.status(httpStatus.OK).send(hotels);
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
});

module.exports = {
    createHotel,
    getHotels
};