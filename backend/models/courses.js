const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  coursename: {
    type: String,
    required: true,
    unique: true,
  },
  description:{
    type:String,
    required: false,
  },
  price:{
    type: Number,
    required: true,
  },
  willLearn:{
    type: String,
    required: false,
  },
  requirement:{
    type: String,
    required: false,
  },
  forWho:{
    type: String,
    required: false,
  }
  ,
  semester_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Semester',
    required: true,
  },
  images:{
    type:Array,
    required: false,
  },
  videos:{
    type:Array,
    required: false,
  }
  ,
  status:{
    type:Boolean,
    default: true,
    required:true
  }
  ,
  meta_data: {
    type: String,
    required: false,
  },
},
{timestamps:true}
);  

module.exports = mongoose.model("Course", courseSchema);
