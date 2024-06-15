const express = require('express')
const jwt = require('jsonwebtoken')
const signupValidMiddleware = require('../middlewares/signupValidation')
const signupAuthMiddleware = require('../middlewares/signupAuth')
const { User } = require('../db')
const router = express.Router()

router.post('/signup', signupValidMiddleware, signupAuthMiddleware, async (req, res)=>{
    const { username, password, firstName, lastName } = req.body;
    try{
        const newUser = await User.create({
            username, password, firstName, lastName
        })

        res.status(200).json({
            userId : newUser._id,

        })
    }catch(err){
        res.sendStatus(500)
    }
})

module.exports = router