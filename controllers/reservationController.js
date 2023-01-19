const CatchAsyncError = require('../middleware/CatchAsyncError');
const Reservations = require('../module/reservations');
const ErrorHandler = require('../utils/errorHandelr');


module.exports.updateReservation = CatchAsyncError(async (req, res, next) => {

    const { id } = req.params;
    const { Active, } = req.body

    const reserv = await Reservations.findById(id)

    if (reserv) {
        const ReserveBike = await Reservations.findByIdAndUpdate(id, {
            $set: {
                Active,
            }
        }, {
            new: true
        })

        // console.log("updated", ReserveBike);
        res.status(200).json(ReserveBike);
    } else {
        return next(new ErrorHandler("unauthorized", 400))


    }


})

module.exports.updateReservation2 = CatchAsyncError(async (req, res, next) => {

    const { id } = req.params;
    const {
        rating
    } = req.body
    // console.log("req.body", req.body)
    const reserv = await Reservations.findById(id)
    if (reserv) {
        const ReserveBike = await Reservations.findByIdAndUpdate(id, {
            $set: {
                Rate: rating
            }
        }, {
            new: true
        })

        // console.log("updated", ReserveBike);
        res.status(200).json(ReserveBike);
    } else {
        return next(new ErrorHandler("unauthorized", 400))
    }


})
module.exports.ReserveBike = CatchAsyncError(async (req, res, next) => {


    const addCart = await Reservations.create({
        BikeId: req.body.BikeId,
        UserId: req.body.UserId,
        Datefrom: req.body.Datefrom,
        Todate: req.body.Todate,
    })

    res.status(200).json(addCart);


})
module.exports.ReservationsOnBikes = CatchAsyncError(async (req, res, next) => {

    const { id } = req.params;
    // console.log("id", id)
    const addCart = await Reservations.find(
        {
            BikeId: id
        }
    )
    res.status(200).json(addCart);


})
module.exports.UserReservations = CatchAsyncError(async (req, res, next) => {

    const { id } = req.params;
    // console.log("cart ", id);
    const addCart = await Reservations.find({
        UserId: id
    })
    res.status(200).json(addCart);


})
module.exports.allReservations = CatchAsyncError(async (req, res, next) => {

    const id = req.params.id;
    // console.log("cart ", id);
    const addCart = await Reservations.find()
    res.status(200).json(addCart);


})
module.exports.CancelReservation = CatchAsyncError(async (req, res, next) => {

    const { id } = req.params
    // console.log("id", id)
    const reser = await Reservations.findOneAndRemove(id);
    res.status(200).send(reser);

})