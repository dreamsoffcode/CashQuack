const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect("mongodb+srv://admin:h1P1XmkBIvH4mbSH@cluster0.sc24xe1.mongodb.net/wallet")
.then(()=>console.log("Connection to db secured"))
.catch((err)=>console.log("Connection to db failed"))

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 30 
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type : Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
}


