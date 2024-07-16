const { accountIdSchema, balanceSchema } = require("../schemas")

function transferValidMiddleware(req, res, next){
    req.body.amount = parseInt(req.body.amount)
    let {to, amount} = req.body
    if ( accountIdSchema.safeParse(to).success && balanceSchema.safeParse(amount).success ){
        next()
    }else{
        res.status(400).json({
            message: 'Invalid Input'
        })
    }
}

module.exports = transferValidMiddleware