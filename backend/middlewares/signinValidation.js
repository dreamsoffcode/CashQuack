const zod = require('zod')
const schema = require('../schemas')


function signinValidMiddleware(req, res, next) {
    const { username, password} = req.body;
    if (!schema.usernameSchema.safeParse(username).success
        || !schema.passwordSchema.safeParse(password).success) {
        res.status(411).json({
            message: "Error while logging in"
        })
    }else{
        next()
    }
}

module.exports = signinValidMiddleware