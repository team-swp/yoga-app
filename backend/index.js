const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression")

app.use(express.json())
//env
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
app.set('view engine', 'html');
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: "500mb",
  })
);
app.use(bodyParser.json());
app.use(compression({
  level:6,
  threshold:100*1000,
  filter:(req,res)=>{
    if(req.headers['x-no-compression']){
      return false
    }
    return compression.filter(req,res)
  }
}))
//connect database
mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.on("error", () => console.error(error));
db.once("open", () => console.log("Connected database successfull..."));
const router = require("./routes/route");

app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});
app.use("/api", router);
app.listen(PORT, () => console.log(`Server Started ${PORT}`));
