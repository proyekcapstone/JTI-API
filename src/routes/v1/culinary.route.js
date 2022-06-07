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

/**
 * @swagger
 * tags:
 *   name: Culinary
 *   description: Culinary management and retrieval
 */

/**
 * @swagger
 * /culinary:
 *   post:
 *     summary: Create a Culinary
 *     tags: [Culinary]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: Object
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all Culinary
 *     description: Only admins can retrieve all Culinary.
 *     tags: [Culinary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Culinary name
 *
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /culinary/{id}:
 *   get:
 *     summary: Get a Culinary
 *     tags: [Culinary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Culinary id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update a Culinary
 *     tags: [Culinary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Culinary id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Culinary
 *     tags: [Culinary]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Culinary id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
