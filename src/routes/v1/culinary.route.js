const express = require('express');
const uploadImg = require('../../config/cloudinary');
const validate = require('../../middlewares/validate');
const { culinaryValidation } = require('../../validations');
const { culinaryController } = require('../../controllers');

// const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(
    uploadImg.single('image'),
    validate(culinaryValidation.createCulinary),
    culinaryController.createCulinary
  )
  .get(culinaryController.getCulinarys);

router.route('/search').get(culinaryController.searchCulinary);

router
  .route('/:id')
  .get(culinaryController.getCulinary)
  .put(
    uploadImg.single('image'),
    validate(culinaryValidation.updateCulinary),
    culinaryController.updateCulinary
  )
  .delete(
    validate(culinaryValidation.deleteCulinary),
    culinaryController.deleteCulinary
  );

module.exports = router;
