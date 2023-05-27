const Course = require("../models/courses");

module.exports.addCourse =  async (req, res) => {
  const { coursename, description, price, semester_id, meta_data } = req.body;
  try {
        const course = new Course({
          coursename: coursename,
          description: description||'Sorry we are updating this course\'s description',
          price: price,
          semester_id: semester_id, //base 64
          meta_data:meta_data||''//to store image[], video[]
        });
        // return save result as a response
        course.save()
          .then((result) =>
            res.status(201).send({ msg: "Add Course Successfully" })
          )
          .catch((error) => res.status(500).send({ error }));
   
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}