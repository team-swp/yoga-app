const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema(
  {
    paymentname: {
      type: String,
      required: true,
      unique: true,
    },
    image:{
      type: String,
      required:false
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

module.exports = mongoose.model("PaymentMethod", paymentMethodSchema);