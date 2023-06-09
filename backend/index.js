const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const Account = require("./models/accounts");
const Sentry = require("@sentry/node");

app.use(express.json());

Sentry.init({
  dsn: "https://5ec7370fd13f4bf69ba5f2b71cbeb08a@o4505497353256960.ingest.sentry.io/4505497430851584",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
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
db.on("error", (error) => console.error(error.message));
db.once("open", () => console.log("Connected database successfull..."));
const router = require("./routes/route");
const { MailExpire3DaysBefore, MailExpired } = require("./controllers/Mailer");
//auto function
cron.schedule(
  "* 0 0 * * *",
  async () => {
    const members = Account.find({
      meta_data: { $regex: `"isMember":true`, $options: "i" },
    })
      .then(async (result) => {
        const date = new Date();
        const datePrevious3Days = new Date(date)
        datePrevious3Days.setDate(date.getDate() - 3);
  
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
          if (date.getDate()>memDate.getDate() && date.getDate() - memDate.getDate() >=3 ) {//lấy ngày hôm nay trừ đi hạn sử dụng nếu lớn hơn 3 set về người thường
            const expired = `{"isMember":false}`
            await Account.findOneAndUpdate({ _id: element._id }, { meta_data: expired })
            await MailExpired(element.username,element.email)
          }
          if(memDate.getDate()>date.getDate() && memDate.getDate()- date.getDate() <=3 ){//lấy memdate - ngày hôm nay nếu còn hạn nhỏ hơn 3 thì zô  
            await MailExpire3DaysBefore(element.username,element.email)
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



// Helper function to generate email body using MailGenerator library
const generateEmailBody = (email) => {
  // Implementation of generating email body using MailGenerator library
  // Replace this with your actual implementation
  return "Generated email body";
};

app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use("/api", router);

app.use(Sentry.Handlers.errorHandler());
// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(PORT, () => console.log(`Server Started ${PORT}`));