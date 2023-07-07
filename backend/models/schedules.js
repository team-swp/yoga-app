const mongoose = require("mongoose");
const moment = require("moment");
const scheduleSchema = new mongoose.Schema(
  {
    schedulename: {
      type: String,
      required: true,
      unique: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    meta_data: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

// .pre middleware to validate startTime and endTime
scheduleSchema.pre("save", async function (next) {
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

  // Check if startTime and endTime have valid format (hh:mm AM/PM)
  if (!timeRegex.test(this.startTime) || !timeRegex.test(this.endTime)) {
    const error = new Error(
      "Invalid startTime or endTime format. Please use hh:mm AM/PM format."
    );
    return next(error);
  }

  // Calculate time difference in minutes between startTime and endTime
  const [startHour, startMinute, startPeriod] = this.startTime.split(/:| /);
  const [endHour, endMinute, endPeriod] = this.endTime.split(/:| /);
  const startDateTime = new Date(
    0,
    0,
    1,
    convertTo24Hour(startHour, startPeriod),
    startMinute
  );
  const endDateTime = new Date(
    0,
    0,
    1,
    convertTo24Hour(endHour, endPeriod),
    endMinute
  );
  const timeDifferenceInMinutes = Math.abs(endDateTime - startDateTime) / 60000;

  // Check if startTime and endTime have a minimum difference of 90 minutes
  if (timeDifferenceInMinutes < 90) {
    const error = new Error(
      "Invalid startTime and endTime. startTime and endTime should be at least 90 minutes apart."
    );
    return next(error);
  }
  //làm thêm phần check ở trong range của thằng khác
  next();
});

scheduleSchema.pre("save", async function (next) {
  const existingSchedule = await this.constructor.findOne({
    $or: [
      { startTime: this.startTime, _id: { $ne: this._id } }, // Check for duplicate startTime
      { endTime: this.endTime, _id: { $ne: this._id } },
      { startTime: this.endTime, _id: { $ne: this._id } },
      { endTime: this.startTime, _id: { $ne: this._id } }, // Check for duplicate endTime
    ],
  });

  if (existingSchedule) {
    const error = new Error(
      `Schedule with the same startTime or endTime already exists (${existingSchedule.schedulename}).`
    );
    return next(error);
  }

  next();
});

// Helper function to convert hour to 24-hour format
function convertTo24Hour(hour, period) {
  if (period === "PM" && hour !== "12") {
    hour = parseInt(hour) + 12;
  }
  if (period === "AM" && hour === "12") {
    hour = 0;
  }
  return parseInt(hour);
}

function convertToDateTime(timeString) {
  const [time, period] = timeString.split(' ');
  const [hours, minutes] = time.split(':');
  
  let hoursValue = parseInt(hours);
  if (period === 'PM' && hoursValue !== 12) {
    hoursValue += 12;
  } else if (period === 'AM' && hoursValue === 12) {
    hoursValue = 0;
  }

  const currentDate = new Date();
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hoursValue,
    parseInt(minutes)
  );
}

scheduleSchema.pre("save", async function (next) {
  const newSchedule = this;
  const arrCheck = []
  try {
    const newScheduleStartTime = convertToDateTime(newSchedule.startTime)
    const newScheduleEndTime = convertToDateTime(newSchedule.endTime)

    const existingSchedules = await this.constructor.find()

    existingSchedules.forEach(schedule=>{
      const startTime = convertToDateTime(schedule.startTime)
      const endTime = convertToDateTime(schedule.endTime)
      if(newScheduleStartTime>=startTime&&newScheduleStartTime<=endTime||newScheduleEndTime>=startTime&&newScheduleEndTime<=endTime){
        arrCheck.push(schedule.schedulename)
      }
      if(startTime>=newScheduleStartTime&&startTime<=newScheduleEndTime||endTime>=newScheduleStartTime&&endTime<=newScheduleEndTime){
        arrCheck.push(schedule.schedulename)

      }
    })
    if (arrCheck.length > 0) {
      return next(
        new Error(`The new schedule conflicts with an existing schedule (${arrCheck.join(", ")})`)
      );
    }

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Schedule", scheduleSchema);
