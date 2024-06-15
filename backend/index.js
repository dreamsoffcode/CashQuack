const express = require("express");
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { rootRouter } = require('./routes/index') 
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/api/v1', rootRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT)


