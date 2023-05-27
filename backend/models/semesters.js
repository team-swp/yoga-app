const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
  semestername: {
    type: String,
    required: true,
  },
  startDate:{
    type:Date,
    required: true,
  },
  endDate:{
    type:Date,
    required: true,
  },
  meta_data: {
    type: String,
    required: false,
  },
},
{timestamps:true}
);  

module.exports = mongoose.model("Semester", semesterSchema);
