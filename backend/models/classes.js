const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    classname: {
      type: String,
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    instructor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    schedule_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
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
  },
  { timestamps: true }
);

//

// Trigger 3: Check if the instructor exists in the Account table and has role == "instructor"
classSchema.pre("save", async function (next) {
  try {
    if (this.instructor_id) {
      const Account = require("./accounts");
      const instructor = await Account.findById(this.instructor_id);
      if (!instructor || instructor.role !== "instructor") {
        throw new Error(`${instructor.email}'s account is not instructor`);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

classSchema.pre("save", async function (next) {
  try {
    //không thể có 2 lớp cùng lịch cùng h trong 1 phòng
    const existingClass = await this.constructor.findOne({
      _id: { $ne: this._id },
      classname: this.classname,
      schedule_id: this.schedule_id,
    });
    if (existingClass) {
      throw new Error(
        "A class with the same classname and schedule already exists."
      );
    }

    next();
  } catch (error) {
    next(error);
  }
});

// khác lớp nma cùng lịch thì không thể có cùng 1 giáo viên
// Trigger 2: Check if newClassName != existClassName && newSchedule_id = existSchedule_id cannot have the same instructor_id
classSchema.pre("save", async function (next) {
  try {
    if (this.instructor_id) {
      const existingClass = await this.constructor.findOne({
        _id: { $ne: this._id },
        classname: { $ne: this.classname },
        schedule_id: this.schedule_id,
        instructor_id: this.instructor_id,
      });

      if (existingClass) {
        throw new Error(
          "A class with the same schedule and instructor already exists."
        );
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

classSchema.pre("save", async function (next) {
  const allowedDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];


  // Kiểm tra days chỉ chứa các giá trị thứ hợp lệ
  const invalidDays = this.days.filter((day) => !allowedDays.includes(day.toLowerCase()));
  if (invalidDays.length > 0) {
    const error = new Error(
      "Invalid days. Please use valid weekdays (e.g., Monday, Tuesday, etc.)."
    );
    return next(error);
  }

  // Nếu không có lỗi, tiếp tục lưu dữ liệu
  next();
});

module.exports = mongoose.model("Class", classSchema);