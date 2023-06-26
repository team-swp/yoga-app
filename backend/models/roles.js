const mongoose = require("mongoose");

const roleschema = new mongoose.Schema(
  {
    rolename: {
      type: String,
      required: true,
      unique:true
    },
    description: {
      type: String,
      required: false,
    },
    status:{
      type:Boolean,
      required:true,
      default:true
    },
    meta_data: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleschema);