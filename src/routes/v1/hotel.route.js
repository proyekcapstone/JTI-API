const express = require('express');
const uploadImg = require('../../config/cloudinary');
const validate = require('../../middlewares/validate');
const { hotelValidation } = require('../../validations');
const { hotelController } = require('../../controllers');
// const auth = require('../../middlewares/auth');

const router = express.Router();

router
    .route('/')
    .post(uploadImg.single('image'), validate(hotelValidation.createHotel), hotelController.createHotel)
    .get(hotelController.getHotels);

module.exports = router;