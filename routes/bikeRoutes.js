const { Router } = require('express');
const { createbikeReview } = require('../controllers/bikeController');

const bikeController = require('../controllers/bikeController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/Auth');

const router = Router();

//bikes route controller
router.get('/bikes', bikeController.GetAllBikes)
router.get('/Singlebike/:id', bikeController.GetSingleBike)

router.put('/updateBike/:id', isAuthenticatedUser, bikeController.updateBike)
router.put('/RatingForBike/:id', isAuthenticatedUser, createbikeReview)

router.put('/review/:id', bikeController.createbikeReview)

router.post('/addBike', isAuthenticatedUser, authorizeRoles("manager"), bikeController.AddBike)
router.delete('/deletebike/:id', isAuthenticatedUser, authorizeRoles("manager"), bikeController.DeleteBike)

module.exports = router