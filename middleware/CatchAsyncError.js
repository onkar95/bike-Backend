module.exports = (controllerFun) => (req, res, next) => {
    Promise.resolve(controllerFun(req, res, next)).catch(next)
}
