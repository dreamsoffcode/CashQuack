const express = require('express')
const jwt = require('jsonwebtoken')
const signupValidMiddleware = require('../middlewares/signupValidation')
const signupAuthMiddleware = require('../middlewares/signupAuth')
const { User, Account } = require('../db')
const { JWT_SECRET } = require('../config')
const signinValidMiddleware = require('../middlewares/signinValidation')
const signinAuthMiddleware = require('../middlewares/signinAuth')
const authMiddleware = require('../middlewares/tokenAuth')
const validateUpdDataMiddleware = require('../middlewares/updateValidation')
const router = express.Router()

router.post('/signup', signupValidMiddleware, signupAuthMiddleware, async (req, res) => {

    const { username, password, firstName, lastName } = req.body;
    try {
        const newUser = await User.create({
            username, password, firstName, lastName
        })

        const account = await Account.create({
            userId: newUser._id,
            balance: ceil(Math.random()*10000)
        })

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET)

        res.status(200).json({
            message: "User created successfully",
            token
        })

    } catch (err) {
        res.sendStatus(500)
    }
})

router.post('/signin', signinValidMiddleware, signinAuthMiddleware, (req, res) => {
    let { userId } = req;

    try {
        const token = jwt.sign({ userId }, JWT_SECRET)

        res.status(200).json({
            token
        })
    } catch (err) {
        res.status(411).json({
            message: "Error while logging in"
        })
    }

})

router.put('/', authMiddleware, validateUpdDataMiddleware, async (req, res) => {
    const { password, firstName, lastName } = req.body
    const userId = req.userId

    // console.log(userId)

    const updateFields = {}
    if (password) updateFields.password = password
    if (firstName) updateFields.firstName = firstName
    if (lastName) updateFields.lastName = lastName

    try {
        const updateResponse = await User.updateOne({ _id: userId }, {
            $set: updateFields
        }).exec()
        if (!updateResponse.acknowledged) throw new Error('error')
        res.status(200).json({
            message: "Updated successfully"
        })
    } catch (err) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
})

router.get('/bulk', authMiddleware, async (req, res) => {
    let filter = new RegExp(req.query.filter, 'i')
    console.log(filter)
    try{
        const bulkUsers = await User.find({
            $or: [
                {
                    firstName: filter
                },
                {
                    lastName: filter
                }
            ]   
        }, 'firstName lastName _id').exec()

        res.status(200).json({
            users : bulkUsers
        })
    }catch(err){
        res.sendStatus(500)
    }
})

module.exports = router