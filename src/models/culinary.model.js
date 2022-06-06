const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const culinarySchema = new mongoose.Schema(
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
    cloudinary_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
culinarySchema.plugin(toJSON);

const Culinary = mongoose.model('Culinary', culinarySchema);

module.exports = Culinary;
