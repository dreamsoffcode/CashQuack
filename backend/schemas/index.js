const zod = require('zod')

const usernameSchema = zod.string().min(3).max(30)
const nameSchema = zod.string().min(1).max(50)
const passwordSchema = zod.string().min(6)

module.exports = {
    usernameSchema,
    nameSchema, 
    passwordSchema
}