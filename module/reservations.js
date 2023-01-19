const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    BikeId: {
        type: String,
        required: [true, 'Please enter a model name']
    },
    UserId: {
        type: String,
        required: [true, 'Please enter a email'],
    },
    Datefrom: {
        type: String,
        required: [true, 'Please enter color'],
    },
    Todate: {
        type: String,
        required: [true, 'Please enter a location'],
    },
    Active: {
        type: Boolean,
        default: true,
        required: false
    },
    Rate: {
        type: Number,
        default: 0,
        required: false
    },
    // Date:new Date(mongoose.now)
}, { timestamp: { createdAt: 'created_at' } })

module.exports = mongoose.model('bikeReservations', userSchema)