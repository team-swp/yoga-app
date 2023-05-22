const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const cors = require('cors')
//env
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

//connect database
mongoose.connect(MONGO_URI)
const db = mongoose.connection
db.on('error',() => console.error(error))
db.once('open',() => console.log('Connected database successfull...'))
app.use(cors())
app.use(express.json())
const router = require('./routes/route') 

app.get('/', (req, res) => {
  res.status(201).json("Home GET Request");
});

app.use('/api',router)
app.listen(PORT, ()=> console.log(`Server Started ${PORT}`))
