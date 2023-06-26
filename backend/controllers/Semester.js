const Semester = require("../models/semesters");
const { pagingnation } = require("./Pagingnation");

module.exports.addSemester = async (req, res) => {
  const { semestername, startDate, endDate, meta_data } = req.body;
  try {
    const semester = new Semester({
      semestername: semestername,
      startDate: startDate,
      endDate: endDate,
      meta_data: meta_data || "", //to store side data
    });
    // return save result as a response
    semester
      .save()
      .then((result) =>
        res.status(201).send({ msg: "Add Semester Successfully" })
      )
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getSemester = async (req, res) => {
  try {
    const semesters = await Semester.find();
    const temp = [];
    semesters.filter((semester, index) => {
      const startDateString = semester.startDate.toISOString().split("T")[0];
      const endDateString = semester.endDate.toISOString().split("T")[0];

      let rest = Object.assign({}, semester.toJSON());
      rest = { ...rest, startDate: startDateString, endDate: endDateString };

      // console.log(rest);
      temp.push(rest);
    });
    res.send(temp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getSemestersPaging = async (req, res) => {
  try {
    const pagingPayload = await pagingnation(Semester,'semestername',req.query)
    res.send(pagingPayload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateSemester = async (req, res) => {
  if (req.body.semestername != null) {
    res.semester.semestername = req.body.semestername;
  }
  if (req.body.startDate != null) {
    res.semester.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.semester.endDate = req.body.endDate;
  }
  if (req.body.meta_data != null) {
    res.semester.meta_data = req.body.meta_data;
  }
  if (req.body.status != null) {
    res.semester.status = req.body.status;
  }

  try {
    const updateSemester = await res.semester.save();
    res.json(updateSemester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.getSemesterById = async (req, res, next) => {
  let semester;
  try {
      semester = await Semester.findById(req.body._id);
      if (semester === null) {
        return res.status(404).json({ message: "Cannot Find Semester" });
      }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.semester = semester;
  next();
};