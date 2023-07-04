const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const Account = require("./models/accounts");

app.use(express.json());
//env
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
app.set("view engine", "html");
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
//auto function
cron.schedule(
  "* * 1 * * *",
  () => {
    const members = Account.find({
      meta_data: { $regex: `"isMember":true`, $options: "i" },
    })
      .then(async (result) => {
        const date = new Date();
        const length = result.length
        for (let i = 0; i < length; i++) {
          let element = result[i];
          let metaData = JSON.parse(element.meta_data);
          let memDate = new Date(metaData.startDateMember);
          if (typeof metaData.MemberDuration === "number") {
            memDate.setMonth(memDate.getMonth() + metaData.MemberDuration);
          } else {
            memDate.setDate(memDate.getDate() + 7);
          }
          if (memDate < date) {
            const expired = `{"isMember":false}`
            await Account.findOneAndUpdate({ _id: element._id }, { meta_data: expired })
          }
        }

      })
      .catch((error) => {
        return error;
      });
  },
  {
    scheduled: true,
    timezone: "Asia/Saigon",
  }
);

app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});
app.use("/api", router);
app.listen(PORT, () => console.log(`Server Started ${PORT}`));