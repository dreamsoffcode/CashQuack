const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
function authMiddleware(req, res, next){
    try{
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.sendStatus(403)
        } 
        const token = authHeader.split(" ")[1]
        const {userId} = jwt.verify(token, JWT_SECRET)
        req.userId = userId
        if(userId)next();
    }catch(err){
        res.sendStatus(403)
    }
}

module.exports = authMiddleware