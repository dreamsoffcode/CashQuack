const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const { router } = require('./routes/index') 
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/api/v1', router)


const PORT = process.env.PORT || 3000
app.listen(PORT,  ()=>console.log("Lisening on port", PORT))


