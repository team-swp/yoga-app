const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
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
  meta_data: {
    type: String,
    required: false,
  },
},
{timestamps:true}
);  

module.exports = mongoose.model("Account", accountSchema);
