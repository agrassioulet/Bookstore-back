const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.send({ message: "Unauthorized for token" })
    } else {
        jwt.verify(req.headers.authorization, "secret", function (err, decoded) {
            if(decoded) {
                req.user = decoded.data
                next()
            }else{
                res.send({ message: "Unauthorized for token" })
            }
        })
    }
}