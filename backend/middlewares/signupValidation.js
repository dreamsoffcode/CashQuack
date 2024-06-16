const zod = require('zod')
const schema = require('../schemas')


function signupValidMiddleware(req, res, next) {
    const { username, password, firstName, lastName } = req.body;
    if (!schema.usernameSchema.safeParse(username).success
        || !schema.passwordSchema.safeParse(password).success
        || !schema.nameSchema.safeParse(firstName).success
        || !schema.nameSchema.safeParse(lastName).success) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }else{
        next()
    }
}

module.exports = signupValidMiddleware