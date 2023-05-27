const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  coursename: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required: false,
  },
  price:{
    type: Number,
    required: true,
  },
  semester_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Semester',
    required: true,
  },
  meta_data: {
    type: String,
    required: false,
  },
},
{timestamps:true}
);  

module.exports = mongoose.model("Course", courseSchema);
