const PaymentMethod = require("../models/payment_methods");
const Payment = require("../models/payments");

//payment medthod
module.exports.addPaymentMethod = async (req, res) => {
  const { paymentname } = req.body;
  try {
    const paymentMethod = new PaymentMethod({
      paymentname: paymentname,
    });
    // return save result as a response
    paymentMethod
      .save()
      .then((result) =>
        res.status(201).send({ msg: "Add Payment Method Successfully" })
      )
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.find();
    res.send(paymentMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updatePaymentMethod = async (req, res) => {
  const fieldsToUpdate = ["paymentname", "status", "meta_data"];

  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      res.paymentMethod[field] = req.body[field];
    }
  }
  try {
    const updatePaymentMethod = await res.paymentMethod.save();
    res.json(updatePaymentMethod);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getPaymentMethodById = async (req, res, next) => {
  let paymentMethod;
  try {
    paymentMethod = await PaymentMethod.findById(req.body._id);
    if (paymentMethod === null) {
      return res.status(404).json({ message: "Cannot Find Payment Method" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.paymentMethod = paymentMethod;
  next();
};

module.exports.addPaymentMethod = async (req, res) => {
  const { paymentname } = req.body;
  try {
    const paymentMethod = new PaymentMethod({
      paymentname: paymentname,
    });
    // return save result as a response
    paymentMethod
      .save()
      .then((result) =>
        res.status(201).send({ msg: "Add Payment Method Successfully" })
      )
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//------------------------------------------------------------------------------------------------------//
//payment chưa làm ghim lại
module.exports.addPayment = async (req, res) => {
  const {
    recipient,
    paymentDate,
    paymentAmount,
    paymentMethod_id,
    booking_id,
    description,
    status,
    meta_data,
  } = req.body;
  try {
    const payment = new Payment({
      recipient,
      paymentDate,
      paymentAmount,
      paymentMethod_id,
      booking_id,
      description,
      status,
      meta_data,
    });
    // return save result as a response
    payment
      .save()
      .then((result) =>
        res.status(201).send({ msg: "Add Payment Successfully" })
      )
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.find();
    res.send(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updatePayment = async (req, res) => {
  const fieldsToUpdate = [
    "recipient",
    "paymentDate",
    "paymentAmount",
    "paymentMethod_id",
    "booking_id",
    "description",
    "status",
    "meta_data",
  ];

  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      res.payment[field] = req.body[field];
    }
  }
  try {
    const updatePayment = await res.payment.save();
    res.json(updatePayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getPaymentById = async (req, res, next) => {
  let payment;
  try {
    payment = await Payment.findById(req.body._id);
    if (payment === null) {
      return res.status(404).json({ message: "Cannot Find Payment" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.payment = payment;
  next();
};
