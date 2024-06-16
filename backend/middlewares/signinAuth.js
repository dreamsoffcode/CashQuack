const { User } = require("../db");


async function signinAuthMiddleware(req, res, next) {

    //https://mongoosejs.com/docs/api/model.html#Model.findOne()
    const userFound = await User.findOne({  
        username: req.body.username, 
        password: req.body.password 
    }).exec()

    if (userFound == null) {
        res.status(411).json({
            message: "Error while logging in"
        })
    } else {
        req.userId = userFound._id
        next()
    }
}

module.exports = signinAuthMiddleware