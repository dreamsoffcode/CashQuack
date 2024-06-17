const { passwordSchema, nameSchema } = require("../schemas");

function validateUpdDataMiddleware(req, res, next){
    // console.log(req)
    const {password, firstName, lastName} = req.body
    if((password && !passwordSchema.safeParse(password).success)
    || (firstName && !nameSchema.safeParse(firstName).success)
    || (lastName && !nameSchema.safeParse(lastName).success)
    ){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    if (password || firstName || lastName)next()
    else return res.status(411).json({
        message: 'No data to change'
    })
}

module.exports = validateUpdDataMiddleware;