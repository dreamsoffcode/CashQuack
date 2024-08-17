const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const accountRouter = require('./accounts')

// router.get('/', ()=>{
//         console.log("hit api v1")
// })

router.use('/user', userRouter)
router.use('/account', accountRouter)

module.exports = {
    router
}