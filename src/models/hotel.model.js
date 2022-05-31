const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const hotelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        // imageHotel: {
        //     type: String,
        //     required: true,
        // },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
hotelSchema.plugin(toJSON);

/**
 * @typedef Hotel
 */
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
