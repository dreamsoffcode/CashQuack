const express = require('express')
const jwt = require('jsonwebtoken')
const signupValidMiddleware = require('../middlewares/signupValidation')
const signupAuthMiddleware = require('../middlewares/signupAuth')
const { User } = require('../db')
const { JWT_SECRET } = require('../config')
const signinValidMiddleware = require('../middlewares/signinValidation')
const signinAuthMiddleware = require('../middlewares/signinAuth')
const authMiddleware = require('../middlewares/tokenAuth')
const validateUpdDataMiddleware = require('../middlewares/updateValidation')
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

router.put('/', authMiddleware, validateUpdDataMiddleware, async (req, res)=>{
    const {password, firstName, lastName} = req.body
    const userId = req.userID
    
    const updateFields = {}
    if(password)updateFields.password = password
    if(firstName)updateFields.firstName = firstName
    if(lastName)updateFields.lastName = lastName
    
    try {   
        const updateResponse = await User.updateOne({_id : userId}, updateFields).exec()
        if(!updateResponse.acknowledged)throw new Error('error')
    }catch(err){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
})

module.exports = router