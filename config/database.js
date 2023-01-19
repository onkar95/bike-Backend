const mongoose = require("mongoose")

const connectTODataBase = () => {

    mongoose.connect(process.env.mongoDB, {
        useNewUrlParser: true,

    })
        .then((data) =>
            console.log(`mongoDb connected with server:${data.connection.host}`))
        .catch((err) => console.log(err.message))
}

module.exports = connectTODataBase