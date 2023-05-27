const Semester = require("../models/semesters");

module.exports.addCourse =  async (req, res) => {
  const { semestername, startDate, endDate, meta_data } = req.body;
  try {
        const semester = new Semester({
          semestername: semestername,
          startDate: startDate,
          endDate: endDate, 
          meta_data:meta_data||''//to store side data
        }); 
        // return save result as a response
        semester.save()
          .then((result) =>
            res.status(201).send({ msg: "Add Semester Successfully" })
          )
          .catch((error) => res.status(500).send({ error }));
   
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}