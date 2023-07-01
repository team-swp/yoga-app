const News = require("../models/news");

module.exports.addNews = async (req, res) => {
  const { staff_id, subject, content, status,meta_data } = req.body;
  try {
    const news = new News({
      staff_id: staff_id,
      subject: subject,
      content: content,
      status: status ,
      meta_data//to store side data
    });
    // return save result as a response
    news
      .save()
      .then((result) =>
        res.status(201).send({ msg: "Add News Successfully" })
      )
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.send(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateNews = async (req, res) => {
  const fieldsToUpdate = [
    "staff_id",
    "subject",
    "content",
    "status",
    "meta_data",
  ];

  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      res.news[field] = req.body[field];
    }
  }
  try {
    const updateNews = await res.news.save();
    res.json(updateNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.getNewsById = async (req, res, next) => {
  let news;
  try {
      news = await News.findById(req.body._id);
      if (news === null) {
        return res.status(404).json({ message: "Cannot Find News" });
      }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.news = news;
  next();
};