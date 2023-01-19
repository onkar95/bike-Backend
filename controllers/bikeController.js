const CatchAsyncError = require('../middleware/CatchAsyncError');
const Bike = require('../module/bike');
const User = require('../module/user');


exports.createbikeReview = CatchAsyncError(async (req, res, next) => {
    const { rating, comment, bikeID, userID } = req.body;

    const user = await User.findById(userID)

    const review = {
        user: user._id,
        name: user.name,
        rating: Number(rating),
        comment,
    };

    const bike = await Bike.findById(bikeID);

    //check for already review by user to update else create new
    const isReviewed = bike.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        bike.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        bike.reviews.push(review);
        bike.numOfReviews = bike.reviews.length;
    }

    let sum = 0;

    bike.reviews.forEach((rev) => {
        sum += rev.rating;
    });

    bike.Rating = sum / bike.reviews.length;

    await bike.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });

});


module.exports.GetSingleBike = CatchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const getbike = await Bike.findById(id);
    res.status(200).send(getbike);

})
module.exports.AddBike = CatchAsyncError(async (req, res, next) => {
    const { Model, Rating, Color, Location } = req.body;

    const bikeDetails = await Bike.create({
        Model,
        Rating,
        Color,
        Location
    });

    res.status(201).json({
        bikeDetails
    });

})

module.exports.GetAllBikes = CatchAsyncError(async (req, res, next) => {

    const list = await Bike.find()
    return res.send(list);


})

module.exports.DeleteBike = CatchAsyncError(async (req, res, next) => {

    const { id } = req.params

    const users = await Bike.findByIdAndDelete(id);
    res.status(200).send(users);

})

module.exports.updateBike = CatchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { Model, Color, Location, Availability, Rating } = req.body

    const bike1 = await Bike.findById(id)

    if (bike1) {
        if (Availability && Model) {
            const addBike = await bike.findByIdAndUpdate(id, {
                $set: {
                    Availability,
                    Model,
                    Color,
                    Location
                }
            }, {
                new: true
            })
            res.status(200).json(addBike);
        }
        else if (Availability && !Model) {
            const addBike = await Bike.findByIdAndUpdate(id, {
                $set: { Availability }
            }, {
                new: true
            })
            res.status(200).json(addBike);
        } else if (Rating && !Availability && !Model) {
            const addBike = await Bike.findByIdAndUpdate(id, {
                $set: {
                    Rating,
                }
            }, {
                new: true
            })
            // console.log("updated", addBike);
            res.status(200).json(addBike);

        } else {
            const addBike = await Bike.findByIdAndUpdate(id, {
                $set: {
                    Model,
                    Rating,
                    Color,
                    Location
                }
            }, {
                new: true
            })
            // console.log("updated", addBike);
            res.status(200).json(addBike);
        }


    } else {
        return next(new ErrorHandler("unauthorized", 400))

    }


})