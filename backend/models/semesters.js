const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
  {
    semestername: {
      type: String,
      required: true,
      unique: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    meta_data: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
      default:true,
    }
  },
  { timestamps: true }
);

semesterSchema.pre("save", async function (next) {
  const currentDate = new Date;
  if (this.isModified("startDate") && this.startDate < currentDate) {
    return next(new Error("Start date cannot be in the past."));
  }

    const existingSemester = await mongoose.model("Semester").findOne({
      _id: { $ne: this._id }, // Exclude current semester from the check
      startDate: this.startDate,
      endDate: this.endDate,
    });

    if (existingSemester) {
      return next(new Error(`${existingSemester.semestername} semester already has been the same start date and end date.`));
    }
  //đoạn code nhận 1 semester phải kéo dài ít nhất 3 tháng
  // const minimumEndDate = new Date(this.startDate);
  // minimumEndDate.setMonth(minimumEndDate.getMonth() + 3);
  // if (
  //   this.isModified("startDate") &&
  //   this.isModified("endDate") &&
  //   this.endDate < minimumEndDate
  // ) {
  //   return next(new Error("EndDate must be at least 3 months after StartDate."));
  // }
  if (
    this.isModified("startDate") &&
    this.isModified("endDate") &&
    this.startDate >= this.endDate
  ) {
    return next(new Error("End date must be greater than StartDate."));
  }
  next();
});

module.exports = mongoose.model("Semester", semesterSchema);