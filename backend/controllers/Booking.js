const Account = require("../models/accounts");
const Booking = require("../models/bookings");
const Payment = require("../models/payments");
const { pagingnation } = require("./Pagingnation");

module.exports.addBooking = async (req, res) => {
  try {
    const bookTry = await Booking.findOne({
      member_id: req.account.userId,
      meta_data: `"isTry":true`,
    });

    if (bookTry && req.body.isTry) {
      res.status(400).json({ message: "Cannot book try" });
    }
    //check user trước nếu meta_data có isMember:true
    const { member_id, class_id, booking_date, status, meta_data } = req.body;
    const booking = new Booking({
      member_id: req.account.userId,
      class_id,
      booking_date,
      status,
      meta_data: meta_data || "",
    });
    // return save result as a response
    booking
      .save()
      .then((result) =>
        res.status(201).send({ result, msg: "Add Booking Successfully" })
      )
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.find();
    res.send(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getBookingsPaging = async (req, res) => {
  try {
    const pagingPayload = await pagingnation(Booking, "member_id", req.query);
    res.send(pagingPayload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateBooking = async (req, res) => {
  const fieldsToUpdate = [
    "member_id",
    "class_id",
    "booking_date",
    "status",
    "meta_data",
  ];

  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      res.booking[field] = req.body[field];
    }
  }
  try {
    const updateBooking = await res.booking.save();
    res.json(updateBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getBookingById = async (req, res, next) => {
  let booking;
  try {
    booking = await Booking.findById(req.body._id);
    if (booking === null) {
      return res.status(404).json({ message: "Cannot Find Booking" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.booking = booking;
  next();
};