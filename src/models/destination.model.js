const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const destinationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
        postalCode: {
            type: Number,
            required: true,
        },
        telephone: {
            type: Number,
            required: true,
        },
        openTime: {
            type: String,
            required: true,
        },
        openDay: {
            type: String,
            required: true,
        },
        ticket: {
            type: Number,
            required: true,
        },
        website: {
            type: String,
            required: true,
        },
        instagram: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

// add plugin that converts mongoose to json
destinationSchema.plugin(toJSON);

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
