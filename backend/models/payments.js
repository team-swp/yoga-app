const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: true,
      default: "Yoga HeartBeat",
    },
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentMethod_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentMethod",
      required: true,
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
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

paymentSchema.pre("save", async function (next) {
  const PaymentMethod = require("./payment_methods"); // Đường dẫn tới file model của Payment
  const Booking = require("./bookings"); // Đường dẫn tới file model của Booking
  try {
    const payment = this;
    const paymentMethod = await PaymentMethod.findOne({
      _id: payment.paymentMethod_id,
    });

    if (
      paymentMethod &&
      paymentMethod.paymentname === "Pay at the yoga center"
    ) {
      const booking = await Booking.findOne({ _id: payment.booking_id });
      if (booking) {
        booking.status = 5;
        await booking.save();
      }
    } else if (
      paymentMethod &&
      paymentMethod.paymentname !== "Pay at the yoga center"
    ) {
      const booking = await Booking.findOne({ _id: payment.booking_id });
      if (booking) {
        booking.status = 10;
        await booking.save();
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
