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

const getDestination = catchAsync(async (req, res) => {
    try {
        const destination = await destinationService.getDestination(req.params.id);
        res.status(httpStatus.OK).send(destination);
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
})

const updateDestination = catchAsync(async (req, res) => {
    try {
        const image = req.file.path;
        const destination = await destinationService.updateDestination(req.params.id, req.body, image);
        res.status(httpStatus.OK).send(destination);
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
})

const deleteDestination = catchAsync(async (req, res) => {
    try {
        const destination = await destinationService.deleteDestination(req.params.id);
        res.status(httpStatus.OK).send(destination);
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
})

module.exports = {
    createDestination,
    getDestinations,
    getDestination,
    updateDestination,
    deleteDestination
}