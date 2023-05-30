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
      required: true,
    },
    booking_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: Number,
      default: 5,
      required: true,
      //0 thất bại book, do lớp đầy, do đã tham gia vào lớp r
      //10 book thành công thanh toán nộp tiền đầy đủ
      //5 book thành công, chọn phương thức thanh toán thành công, nhưng chưa nộp tiền
    },
    meta_data: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

bookingSchema.pre('save', async function (next) {
  try {
    const Account = require('./accounts')
    const booking = this;
    const member = await Account.findOne({ _id: booking.member_id });

    if (member.role !== 'user') {
      throw new Error('Invalid member role');
    }
    next();
  } catch (error) {
    next(error);
  }
});
//1 thằng không thể book 2 lớp giống nhau
bookingSchema.pre('save', async function (next) {
  try {
    const existingBooking = await this.constructor.findOne({
      member_id: this.member_id,
      class_id: this.class_id,
    });
    if (existingBooking) {
      throw new Error('Duplicate booking');
    }

    const Class = require('./classes');
    const classInfo = await Class.findById(this.class_id);//mới
    const existingBookings = await this.constructor.find({
      member_id: this.member_id,
      status: { $ne: 0 },
    });

    for (const booking of existingBookings) {//duyệt để lấy lớp
      const existingClass = await Class.findById(booking.class_id);//lấy đc mọi lớp của nó

      if (existingClass.course_id.toString() === classInfo.course_id.toString()) {// duyệt course của lớp cũ có bằng course lớp mới không
        throw new Error('Duplicate course booking');//sau đó báo lỗi
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

//1 thằng không thể book 2 lớp có khóa học giống nhau


module.exports = mongoose.model("Booking", bookingSchema);
