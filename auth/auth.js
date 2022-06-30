const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
    console.log("in verifyToken function")
    if (!req.headers.authorization) {
        res.send({ message: "Unauthorized for token" })
    } else {
        jwt.verify(req.headers.authorization, "secret", function (err, decoded) {
            console.log(req.headers.authorization)
            if(decoded) {
                req.user = decoded.data
                next()
            }else{
                res.send({ message: "Unauthorized for token" })
            }
        })
    }
}