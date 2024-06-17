const { Account } = require("../db")

async function balanceCheckMiddleware(req, res, next){
    try{
        const accountFound = await Account.findOne({userId: req.userId}).exec()
        if(!accountFound){
            return res.status(400).json({
                message: 'Invalid Account'
            })
        }
        if(accountFound.balance < req.body.amount){
            return res.status(400).json({
                message: 'Insufficient balance'
            })
        }
    }
    catch(err){
        return res.sendStatus(500)
    }
    next()
}

module.exports = balanceCheckMiddleware