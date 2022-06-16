const httpStatus = require('http-status');
const { culinaryService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const createCulinary = catchAsync(async (req, res) => {
  try {
    const image = req.file.path;
    const culinary = await culinaryService.createCulinary(req.body, image);
    res.status(httpStatus.CREATED).send(culinary);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const getCulinarys = catchAsync(async (req, res) => {
  try {
    const culinaries = await culinaryService.getCulinarys();
    res.status(httpStatus.OK).send({
      message: 'Get Culinaries Success',
      culinaries: culinaries,
    });
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const getCulinary = catchAsync(async (req, res) => {
  try {
    const culinary = await culinaryService.getCulinary(req.params.id);
    res.status(httpStatus.OK).send(culinary);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const updateCulinary = catchAsync(async (req, res) => {
  try {
    const image = req.file.path;
    const culinary = await culinaryService.updateCulinary(
      req.params.id,
      req.body,
      image
    );
    res.status(httpStatus.OK).send(culinary);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const deleteCulinary = catchAsync(async (req, res) => {
  try {
    const culinary = await culinaryService.deleteCulinary(req.params.id);
    res.status(httpStatus.OK).send(culinary);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

const searchCulinary = catchAsync(async (req, res) => {
  try {
    const culinary = await culinaryService.searchCulinary(req.query.name);
    res.status(httpStatus.OK).send(culinary);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
});

module.exports = {
  createCulinary,
  getCulinarys,
  getCulinary,
  updateCulinary,
  deleteCulinary,
  searchCulinary,
};
