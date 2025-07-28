const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourContoller');


router.param('id', tourController.checkID);


// Create a checkBody middleware
// Check if body contains the name and price property
// if not, send back 400 (bad request)

router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.createTour);

router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;
