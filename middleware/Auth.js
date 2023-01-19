const ErrorHandler = require("../utils/errorHandelr");
const jwt = require("jsonwebtoken");
const CatchAsyncError = require("./CatchAsyncError");
const user = require("../module/user");


exports.isAuthenticatedUser = CatchAsyncError(async (req, res, next) => {
    // const token1 = req.headers['x-access-token']
    const { token } = req.cookies;
    if (!token) {

        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_Secret)


    req.user = await user.findById(decoded.id);
    next()

})


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.Role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.Role} is not allowed to access this resouce `,
                    403
                )
            );
        }

        next();
    };
};