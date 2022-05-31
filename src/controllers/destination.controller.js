const httpStatus = require("http-status");
const { destinationService } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const createDestination = catchAsync(async (req, res) => {
    try {
        const image = req.file.path;
        const destination = await destinationService.createDestination(req.body, image);
        res.status(httpStatus.CREATED).send(destination);
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
})

const getDestinations = catchAsync(async (req, res) => {
    try {
        const destinations = await destinationService.getDestinations();
        res.status(httpStatus.OK).send(destinations);
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
})

module.exports = {
    createDestination,
    getDestinations
}