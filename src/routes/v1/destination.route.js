const express = require('express');
const uploadImg = require('../../config/cloudinary');
const validate = require('../../middlewares/validate');
const { destinationValidation } = require('../../validations');
const { destinationController } = require('../../controllers');

// const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(
    uploadImg.single('image'),
    validate(destinationValidation.createDestination),
    destinationController.createDestination
  )
  .get(destinationController.getDestinations);

router.route('/search').get(destinationController.searchDestination);

router
  .route('/:id')
  .get(destinationController.getDestination)
  .put(
    uploadImg.single('image'),
    validate(destinationValidation.updateDestination),
    destinationController.updateDestination
  )
  .delete(
    validate(destinationValidation.deleteDestination),
    destinationController.deleteDestination
  );

module.exports = router;
