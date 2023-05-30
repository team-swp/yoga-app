const mongoose = require("mongoose");

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
    days: {
      type: Array,
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

scheduleSchema.pre("save", async function (next) {
  const allowedDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // Kiểm tra startTime và endTime có định dạng hh:mm AM/PM
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
  if (!timeRegex.test(this.startTime) || !timeRegex.test(this.endTime)) {
    const error = new Error(
      "Invalid startTime or endTime format. Please use hh:mm AM/PM format."
    );
    return next(error);
  }

  // Kiểm tra startTime không có thời gian sau endTime, endTime phải lớn hơn startTime, không được bằng và phải cách nhau ít nhất 90 phút
  const startDateTime = new Date(`01/01/2023 ${this.startTime}`);
  const endDateTime = new Date(`01/01/2023 ${this.endTime}`);
  const timeDifferenceInMinutes = Math.abs(endDateTime - startDateTime) / 60000;
  if (startDateTime >= endDateTime || timeDifferenceInMinutes < 90) {
    const error = new Error(
      "Invalid startTime and endTime. startTime must be before endTime and they should be at least 90 minutes apart."
    );
    return next(error);
  }

  // Kiểm tra startTime và endTime nằm trong phạm vi giờ hợp lệ (1-12 AM/PM)
  const startHour = parseInt(this.startTime.split(":")[0]);
  const endHour = parseInt(this.endTime.split(":")[0]);
  if (startHour < 1 || startHour > 12 || endHour < 1 || endHour > 12) {
    const error = new Error(
      "Invalid startTime or endTime. Please use valid hour range (1-12 AM/PM)."
    );
    return next(error);
  }

  // Kiểm tra days chỉ chứa các giá trị thứ hợp lệ
  const invalidDays = this.days.filter(
    (day) => !allowedDays.includes(day.toLowerCase())
  );
  if (invalidDays.length > 0) {
    const error = new Error(
      "Invalid days. Please use valid weekdays (e.g., Monday, Tuesday, etc.)."
    );
    return next(error);
  }

  // Kiểm tra trùng lặp schedule với ngày và thời gian đã tồn tại
  const existingSchedule = await this.constructor.findOne({
    _id: { $ne: this._id },
    days: { $in: this.days },
    $or: [
      { startTime: { $lte: this.startTime, $gt: this.endTime } },
      { endTime: { $gte: this.endTime, $lt: this.startTime } },
    ],
  });

  if (existingSchedule) {
    const error = new Error(
      `A schedule (${existingSchedule.schedulename}) with the same date and overlapping time already exists.`
    );
    return next(error);
  }

  // Kiểm tra nếu startTime hoặc endTime của schedule mới nằm trong khoảng thời gian của một schedule khác
  const conflictingSchedule = await this.constructor.findOne({
    _id: { $ne: this._id },
    days: { $in: this.days },
    $or: [
      { startTime: { $gte: this.startTime, $lt: this.endTime } },
      { endTime: { $gt: this.startTime, $lte: this.endTime } },
    ],
  });

  if (conflictingSchedule) {
    const error = new Error(
      `The startTime or endTime conflicts with an existing (${conflictingSchedule.schedulename}) schedule. `
    );
    return next(error);
  }

  // Nếu không có lỗi, tiếp tục lưu dữ liệu
  next();
});

module.exports = mongoose.model("Schedule", scheduleSchema);
