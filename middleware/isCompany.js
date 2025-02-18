const jwt = require('jsonwebtoken')

function isCompany(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded.payload

        if(req.user.role == "Company") {
            next()
        } else {
            res.status(401).json({ err: 'Your are not legiable to add an event'})
        }

    } catch(err) {
        res.status(401).json({ err: 'Your are not legiable to add an event'})
    }
}

module.exports = isCompany;