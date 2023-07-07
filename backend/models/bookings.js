const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    class_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: false,
    },
    booking_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    meta_data: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

bookingSchema.pre("save", async function (next) {
  try {
    const Account = require("./accounts");
    const booking = this;
    const member = await Account.findOne({ _id: booking.member_id });

    if (member.role !== "user") {
      throw new Error("Invalid member role");
    }
    next();
  } catch (error) {
    next(error);
  }
});
//1 thằng không thể book 2 lớp giống nhau viết thêm nếu có lớp mới check
bookingSchema.pre("save", async function (next) {
  try {
    if (this.class_id) {
      const existingBooking = await this.constructor.findOne({
        member_id: this.member_id,
        class_id: this.class_id,
      });
      if (existingBooking) {
        throw new Error("Duplicate booking");
      }

      const Class = require("./classes");
      const classInfo = await Class.findById(this.class_id); //mới
      const existingBookings = await this.constructor.find({
        member_id: this.member_id,
        status: { $ne: 0 },
      });

      for (const booking of existingBookings) {
        //duyệt để lấy lớp
        const existingClass = await Class.findById(booking.class_id); //lấy đc mọi lớp của nó

        if (
          existingClass.course_id.toString() === classInfo.course_id.toString()
        ) {
          // duyệt course của lớp cũ có bằng course lớp mới không
          throw new Error("Duplicate course booking"); //sau đó báo lỗi
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

bookingSchema.pre("save", async function (next) {
  const Class = require("./classes");

  try {
    if (this.class_id) {
      // Retrieve the class associated with the booking
      const classDoc = await Class.findById(this.class_id); //lấy thg classID hiện tạia
      const courseID = classDoc.course_id; // lấy đc course thg này cb học
      const classCheck = this.class_id;
      const classHaveCourse = Class.find({
        course_id: courseID,
        _id: { $ne: classCheck },
      }); // trả ra 1 mảng những cái lớp chứa course đó trừ cái class vừa nhâp
      for (let classes of classHaveCourse) {
        const existingBookings = await this.constructor.find({
          member_id: this.member_id,
          class_id: classes._id,
        });
        if (existingBookings) {
          const error = new Error("Invalid course_id");
          next(error);
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

//1 thằng không thể book 2 lớp có khóa học giống nhau

module.exports = mongoose.model("Booking", bookingSchema);
