const express = require('express')
const authMiddleware = require('../middlewares/tokenAuth')
const { Account } = require('../db')
const transferValidMiddleware = require('../middlewares/transferValidation')
const balanceCheckMiddleware = require('../middlewares/balanceCheck')
const router = express.Router()

router.get('/balance', authMiddleware, async (req, res)=>{
    const {userId} = req
    
    try{
        const accountFound = await Account.findOne({userId}).exec()
        if(accountFound){
            res.status(200).json({
                balance: accountFound.balance
            })
        }else{
            res.sendStatus(404)
        }
    }catch(err){
        res.sendStatus(500)
    }
    
})

router.post('/transfer', authMiddleware, transferValidMiddleware, balanceCheckMiddleware, async (req, res)=>{
    const fromAccount = req.userId
    const toAccount = req.body.to
    const amount = req.body.amount
    try{
        await Account.updateOne({userId: fromAccount}, {
            $inc:{
                balance : -amount
            }
        }).exec()

        await Account.updateOne({userId: toAccount}, {
            $inc:{
                balance : amount
            }
        }).exec()

        res.status(200).json({
            message: "Transfer successful"
        })
    }catch(err){
        res.sendStatus(500)
    }
})

module.exports = router
