const Class = require("../models/classes");

module.exports.addClass = async (req, res) => {
  const {
    classname,
    course_id,
    instructor_id,
    schedule_id,
    status,
    meta_data,
  } = req.body;
  try {
    const newClass = new Class({
      classname: classname,
      course_id,
      instructor_id,
      schedule_id,
      status,
      meta_data: meta_data || "", //to side data
    });
    // return save result as a response
    newClass
      .save()
      .then((result) => res.status(201).send({ msg: "Add Class Successfully" }))
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getClasses = async (req, res) => {
  try {
    const allClasses = await Class.find();
    res.send(allClasses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateClass = async (req, res) => {
  const fieldsToUpdate = [
    "classname",
    "course_id",
    "instructor_id",
    "schedule_id",
    "status",
    "meta_data",
  ];

  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      res.newClass[field] = req.body[field];
    }
  }
  try {
    const updateClass = await res.newClass.save();
    res.json(updateClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getClassById = async (req, res, next) => {
  let newClass;
  try {
    newClass = await Class.findById(req.body._id);
    if (newClass === null) {
      return res.status(404).json({ message: "Cannot Find Class" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.newClass = newClass;
  next();
};
