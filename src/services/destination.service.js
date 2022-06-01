const httpStatus = require("http-status")
const Destination = require("../models/destination.model")
const ApiError = require("../utils/ApiError")

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
    const destination = {
        name: destinationBody.name,
        image: image,
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
    }
    return Destination.create(destination);
}

/**
 * Query all Destinations
  * @returns {Promise<any>}
 */
const getDestinations = async () => {
    const destinations = await Destination.find();
    if(!destinations) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Destinations Not Found!');
    }
    return destinations;
}

/**
 * Query Destination by id
 * @param {number} id 
 * @returns {Promise<any>}
 */
const getDestination = async (id) => {
    const destination = await Destination.findById(id);
    if(!destination) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Destinations Not Found!');
    }
    return destination;
}

module.exports = {
    createDestination,
    getDestinations,
    getDestination
}