const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    phone: {
      type: Number,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
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
accountSchema.pre("save", async function (next) {
  const Role = require('./roles')
  try {
    const roleExists = await Role.exists({ rolename: this.role });
    if (!roleExists) {
      const error = new Error("Invalid role");
      error.statusCode = 400;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
});
module.exports = mongoose.model("Account", accountSchema);