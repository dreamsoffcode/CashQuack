const { User } = require("../db");


async function signupAuthMiddleware(req, res, next) {

    const userFound = await User.findOne({ username: req.body.username }).exec()
    if (userFound != null) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    } else {
        next()
    }
}

module.exports = signupAuthMiddleware