const jwt = require('jsonwebtoken')

const authCheckMiddleware = (req, res,next)=>{
    try {
        const token = req.headers.token
        const permission = req.headers.permission
        const id = req.headers.id
        const key = process.env.TOKEN
        const decoded = jwt.verify(token, key);


        if (JSON.stringify(decoded.permission) == permission && decoded.id == id ){
            next()
        } else {
            res.status(401).send("un authorize").end()
        }

    }catch (e) {
        res.status(401).send("un authorize").end()
    }
}
module.exports = {authCheckMiddleware}