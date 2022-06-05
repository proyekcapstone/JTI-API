const express = require('express');
const uploadImg = require('../../config/cloudinary');
const validate = require('../../middlewares/validate');
const { hotelValidation } = require('../../validations');
const { hotelController } = require('../../controllers');
// const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(
    uploadImg.single('image'),
    validate(hotelValidation.createHotel),
    hotelController.createHotel
  )
  .get(hotelController.getHotels);

router
  .route('/:id')
  .get(hotelController.getHotelById)
  .put(
    uploadImg.single('image'),
    validate(hotelValidation.updateHotel),
    hotelController.updateHotel
  )
  .delete(validate(hotelValidation.deleteHotel), hotelController.deleteHotel);

module.exports = router;
