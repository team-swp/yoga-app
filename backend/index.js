const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
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
// app.use(express.json())

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
