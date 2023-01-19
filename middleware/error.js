const ErrorHandler = require('../utils/errorHandelr')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    //worng mongodb id error
    if (err.name === "castError") {
        const message = `Resource not found Invalid:${err.path}`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // message: err.stack,
    })

}