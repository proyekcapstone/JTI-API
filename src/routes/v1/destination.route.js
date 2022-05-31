const express = require('express');
const uploadImg = require('../../config/cloudinary');
const validate = require('../../middlewares/validate');
const { destinationValidation } = require('../../validations');
const { destinationController } = require('../../controllers');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
    .route('/')
    .post(uploadImg.single('image'), validate(destinationValidation.createDestination), destinationController.createDestination)
    .get(destinationController.getDestinations);

module.exports = router;