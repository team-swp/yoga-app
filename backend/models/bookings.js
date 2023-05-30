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

module.exports = mongoose.model("Booking", bookingSchema);
