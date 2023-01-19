const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Model: {
        type: String,
        required: true
    },
    Availability: {
        type: String,
        default: "avl",
        enum: ["Not available", "avl"]
    },
    Color: {
        type: String,
        required: true,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    Rating: {
        type: Number,
        default: 0,
        required: false,
    },
    Location: {
        type: String,
        required: false,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "Users",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamp: true })

module.exports = mongoose.model('bike', userSchema)

   // if (searchModel !== "") {
    //   let filterbyModel = filteredData?.filter((person) => {
    //     return person.Model?.toLowerCase().includes(searchModel?.toLowerCase())
    //   });
    //   setFiltered(filterbyModel)
    // } else if (searchLoc !== "") {
    //   let filterbyLocation = filteredData?.filter((person) => {
    //     return person.Location?.toLowerCase().includes(searchLoc?.toLowerCase())
    //   });
    //   setFiltered(filterbyLocation)
    // } else if (searchAval !== "") {
    //   let filterbyAvailability = filteredData?.filter((person) => {
    //     return person.Availability?.toLowerCase().includes(searchAval?.toLowerCase())
    //   });
    //   setFiltered(filterbyAvailability)
    // } else if (searchRat !== "") {
    //   let filterbyRating = filteredData?.filter((person) => {
    //     return person.Rating?.toLowerCase().includes(searchRat?.toLowerCase())
    //   });
    //   setFiltered(filterbyRating)
    // }