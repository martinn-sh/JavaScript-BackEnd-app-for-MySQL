const validator = require('validator')

module.exports = function (req, res, next) {
    if (!validator.isUUID(req.params.id))
        return res.status(404).send('Invalid ID')

    next()
}