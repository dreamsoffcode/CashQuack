const express = require('express')
const jwt = require('jsonwebtoken')
const signupValidMiddleware = require('../middlewares/signupValidation')
const signupAuthMiddleware = require('../middlewares/signupAuth')
const { User } = require('../db')
const { JWT_SECRET } = require('../config')
const signinValidMiddleware = require('../middlewares/signinValidation')
const signinAuthMiddleware = require('../middlewares/signinAuth')
const router = express.Router()

router.post('/signup', signupValidMiddleware, signupAuthMiddleware, async (req, res)=>{

    const { username, password, firstName, lastName } = req.body;
    try{
        const newUser = await User.create({
            username, password, firstName, lastName
        })

        const token = jwt.sign({userId: newUser._id}, JWT_SECRET)

        res.status(200).json({
            message: "User created successfully",
            token
        })

    }catch(err){
        res.sendStatus(500)
    }
})

router.post('/signin', signinValidMiddleware, signinAuthMiddleware, (req, res)=>{
    let { userId } = req;

    try{
        const token = jwt.sign({userId}, JWT_SECRET)

        res.status(200).json({
            token
        })
    }catch(err){
        res.status(411).json({
            message: "Error while logging in"
        })
    }

})

module.exports = router