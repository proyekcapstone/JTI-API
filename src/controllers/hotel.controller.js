const httpStatus = require('http-status');
const { hotelService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createHotel = catchAsync(async (req, res) => {
  try {
    const image = req.file.path;
    const hotel = await hotelService.createHotel(req.body, image);
    res.status(httpStatus.CREATED).send(hotel);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const getHotels = catchAsync(async (req, res) => {
  try {
    const hotels = await hotelService.getHotels();
    res.status(httpStatus.OK).send({
      message: 'Get Hotels Success',
      hotels: hotels,
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const getHotelById = catchAsync(async (req, res) => {
  try {
    const hotel = await hotelService.getHotelById(req.params.id);
    res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const updateHotel = catchAsync(async (req, res) => {
  try {
    const image = req.file.path;
    const hotel = await hotelService.updateHotel(
      req.params.id,
      req.body,
      image
    );
    res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const deleteHotel = catchAsync(async (req, res) => {
  try {
    const hotel = await hotelService.deleteHotel(req.params.id);
    res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const searchHotel = catchAsync(async (req, res) => {
  try {
    const hotel = await hotelService.searchHotel(req.query.name);
    res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

module.exports = {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  searchHotel,
};
