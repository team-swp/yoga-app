const Course = require("../models/courses");

module.exports.addCourse = async (req, res) => {
  const {
    coursename,
    description,
    price,
    willLearn,
    requirement,
    forWho,
    semester_id,
    images,
    videos,
    meta_data,
  } = req.body;
  try {
    const course = new Course({
      coursename: coursename,
      description:
        description || "Sorry we are updating this course's description",
      price: price,
      willLearn:
        willLearn ||
        "Sorry beacause this course have a lot of things to learn, we are updating !",
      requirement:
        requirement || "For beginners that do not any knowledge about yoga",
      forWho: forWho || "For everyone that find the thing to heal them soul",
      images: images||[],
      videos: videos||[],
      semester_id: semester_id, //base 64
      meta_data: meta_data || "", //to side data
    });
    // return save result as a response
    course.save()
      .then((result) =>
        res.status(201).send({ msg: "Add Course Successfully" })
      )
      .catch((error) => { console.log(error); return res.status(500).send({ error: error.message })});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getCourses = async (req, res) => {
  try {
    const course = await Course.find();
    res.send(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateCourse = async (req, res) => {
  const fieldsToUpdate = [
    "coursename",
    "description",
    "price",
    "willLearn",
    "requirement",
    "forWho",
    "semester_id",
    "images",
    "status",
    "videos",
    "meta_data",
  ];

  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      res.course[field] = req.body[field];
    }
  }
  try {
    const updateCourse = await res.course.save();
    res.json(updateCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getCourseById = async (req, res, next) => {
  let course;
  try {
    course = await Course.findById(req.body._id);
    if (course === null) {
      return res.status(404).json({ message: "Cannot Find Course" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.course = course;
  next();
};
