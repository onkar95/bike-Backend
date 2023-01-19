const { Router } = require('express');

const reservationController = require('../controllers/reservationController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/Auth');

const router = Router();




//reservations
router.get('/manager/bikeReservations/:id', reservationController.ReservationsOnBikes)
router.get('/manager/reservations', reservationController.allReservations)

router.get('/userReservations/:id', reservationController.UserReservations)
router.post('/ReserveBike', reservationController.ReserveBike)
router.delete('/deleteReservation/:id', reservationController.CancelReservation)

router.put('/updateReservation/:id', reservationController.updateReservation)
router.put('/updateReservation2/:id', reservationController.updateReservation2)



module.exports = router;

