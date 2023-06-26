const mongoose = require("mongoose");

const premiumSchema = new mongoose.Schema(
  {
    premiumname: {
      type: String,
      required: true,
      unique: true,
    },
    priceOriginal: {
      type: Number,
      required: true,
    },
    priceDiscount: {
      type: Number,
      required: false,
    },
    benefit: {
      type: String,
      required: false,
    },
    rules: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    durationByMonth:{
      type:Number,
      required:true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    meta_data: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

premiumSchema.pre("save", function (next) {
  if (this.priceOriginal<0||  this.priceDiscount<0) {
    return next(new Error("Price must be greater than 0"));
  }

  if (this.priceOriginal < this.priceDiscount) {
    return next(new Error("Price discount cannot be greater than original price"));
  }
  next();
});
module.exports = mongoose.model("Premium", premiumSchema);