const Schedule = require("../models/schedules");
const { pagingnation } = require("./Pagingnation");

module.exports.addSchedule = async (req, res) => {
  const { schedulename, startTime, endTime, meta_data } = req.body;
  try {
    const schedule = new Schedule({
      schedulename: schedulename,
      startTime: startTime,
      endTime: endTime,
      meta_data: meta_data || "", //to store side data
    });

    // return save result as a response 
    
    schedule
      .save()
      .then((result) =>
        res.status(201).send({ msg: "Add Schedule Successfully" })
      )
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getSchedules = async (req, res) => {
  try {
    const schedule = await Schedule.find();
    res.send(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getSchedulesPaging = async (req, res) => {
  try {
    const pagingPayload = await pagingnation(req.query.page,req.query.limit,Schedule,req.query.q,'schedulename')
    res.send(pagingPayload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateSchedule = async (req, res) => {
  const fieldsToUpdate = [
    "schedulename",
    "startTime",
    "endTime",
    "status",
    "meta_data",
  ];

  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      res.schedule[field] = req.body[field];
    }
  }
  try {
    const updateSchedule = await res.schedule.save();
    res.json(updateSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getScheduleById = async (req, res, next) => {
  let schedule;
  try {
    schedule = await Schedule.findById(req.body._id);
    if (schedule === null) {
      return res.status(404).json({ message: "Cannot Find Schedule" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.schedule = schedule;
  next();
};
