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

/**
 * @swagger
 * tags:
 *   name: Destination
 *   description: Destination management and retrieval
 */

/**
 * @swagger
 * /destination:
 *   post:
 *     summary: Create a Destination
 *     tags: [Destination]
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
 *                $ref: '#/components/schemas/Destination'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all destination
 *     description: Only admins can retrieve all destination.
 *     tags: [Destination]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Destination name
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
 *                     $ref: '#/components/schemas/Destination'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /destination/{id}:
 *   get:
 *     summary: Get a Destination
 *     tags: [Destination]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Destination id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Destination'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update a Destination
 *     tags: [Destination]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Destination id
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
 *     summary: Delete a Destination
 *     tags: [Destination]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Destination id
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
