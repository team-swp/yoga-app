const PaymentMethod = require("../models/payment_methods");
const Payment = require("../models/payments");
require("dotenv").config();
const moment = require("moment");
const dateFormat = require("dateformat");
const { log } = require("console");
const { registerMail } = require("./Mailer");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { pagingnation } = require("./Pagingnation");
const Booking = require("../models/bookings");
const Account = require("../models/accounts");
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

module.exports.getPaymentsPaging = async (req, res) => {
  try {
    const pagingPayload = await pagingnation(
      req.query.page,
      req.query.limit,
      Payment
   
    );
    res.send(pagingPayload);
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

module.exports.createPayment = async (req, res, next) => {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = process.env.vnp_TmnCode;
  var secretKey = process.env.vnp_HashSecret;
  var vnpUrl = process.env.vnp_Url;
  var returnUrl = process.env.vnp_ReturnUrl;
  var date = new Date();
  var expireDate = moment(date).add(10, "minutes").format("YYYYMMDDHHmmss");
  let createDate = moment(date).format("YYYYMMDDHHmmss");
  var orderId = dateFormat(date, "HHmmss");
  var amount = req.body.amount;
  var bankCode = "VNBANK"; //'VNPAYQR' //req.body.bankCode;
  var orderInfo = req.body.orderDescription;
  var orderType = req.body.orderType;
  var locale = "vn";
  if (locale === null || locale === "") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params["vnp_ExpireDate"] = expireDate;

  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  res.send(vnpUrl);
  //   res.writeHead(302, {
  //     Location: ur
  // });
};

module.exports.runUrl = async (req, res, next) => {
  res.redirect(req.url);
};

module.exports.vnpayIPN = async (req, res, next) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];
  let orderId = vnp_Params["vnp_TxnRef"];
  let rspCode = vnp_Params["vnp_ResponseCode"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  let secretKey = process.env.vnp_HashSecret;
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  let paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
  //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
  //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
  let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
  let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
  const getData = vnp_Params["vnp_OrderInfo"]; //id,thiengk563@gmail.com,name
  const dataArray = getData.split("%2C");
  const userID = dataArray[0];
  const email = dataArray[1];
  const replacedEmail = email.replace("%40", "@");
  if (secureHash === signed) {
    //kiểm tra checksum
    if (checkOrderId) {
      if (checkAmount) {
        if (paymentStatus == "0") {
          //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
          if (rspCode == "00") {
            const booking = new Booking({
              member_id: userID,
            });
            booking.save()
              .then((result) => {
              const bookingID = result._id;
              const payment = new Payment({
                recipient: "Yoga HeartBeat",
                paymentDate: vnp_Params["vnp_PayDate"],
                paymentAmount: vnp_Params["vnp_Amount"],
                paymentMethod_id: "647da80b6aa8563399cbc6ff",
                booking_id: bookingID,
                status: 10,
                meta_data: `${vnp_Params["vnp_BankCode"]} ${vnp_Params["vnp_CardType"]}`,
              });
              // return save result as a response
              const usernamePayment = dataArray[2];
              payment.save()
                .then(async (result) => {
                  const memeberAccount = await Account.findOneAndUpdate({_id:userID},{meta_data:`{"isMember":true}`})
                  req.user = {
                    userEmail: replacedEmail,
                    username: usernamePayment,
                    text: `We are pleased to inform you that your payment (id; ${result._id}) has been successfully processed. Thank you for your purchase and for choosing our services. If you have any questions or need further assistance, please don't hesitate to contact our support team.`,
                    subject: "Payment Successful",
                    result_id: result._id,
                  };
                  next();
                })
                .catch((error) =>
                  res.status(500).send({ error: error.message })
                );
            });
          } else {
            //fail
            const booking = new Booking({
              member_id: userID,
            });
            booking.save()
              .then((result) => {
              const bookingID = result._id;
              
              const payment = new Payment({
                recipient: "Yoga HeartBeat",
                paymentDate: vnp_Params["vnp_PayDate"],
                paymentAmount: vnp_Params["vnp_Amount"],
                paymentMethod_id: "647da80b6aa8563399cbc6ff",
                booking_id: bookingID,
                status: 5,
                meta_data: `${vnp_Params["vnp_BankCode"]} ${vnp_Params["vnp_CardType"]}`,
              });
              // return save result as a response
              const usernamePayment = dataArray[2];
              payment.save()
                .then(async (result) => {
                  const memeberAccount = await Account.findOneAndUpdate({_id:userID},{meta_data:`{"isMember":false}`})
                  req.user = {
                    userEmail: replacedEmail,
                    username: usernamePayment,
                    text: `We are pleased to inform you that your payment (id; ${result._id}) has been successfully processed. Thank you for your purchase and for choosing our services. If you have any questions or need further assistance, please don't hesitate to contact our support team.`,
                    subject: "Payment Successful",
                    result_id: result._id,
                  };
                  next();
                })
                .catch((error) =>
                  res.status(500).send({ error: error.message })
                );
            });
          }
        } else {
          res.status(200).json({
            RspCode: "02",
            Message: "This order has been updated to the payment status",
          });
        }
      } else {
        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
};

module.exports.vnpayReturn = async (req, res, next) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let tmnCode = process.env.vnp_TmnCode;
  let secretKey = process.env.vnp_HashSecret;
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.render("success", { code: "97" });
  }
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
module.exports.haveDonePayment = (req, res) => {
  let nodeConfig = {
    service: "gmail",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(nodeConfig);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Heart Beat",
      link: "heartbeat.com",
      logo: "https://png.pngtree.com/template/20191108/ourmid/pngtree-yoga-logo-design-stock-meditation-in-lotus-flower-illustration-image_328924.jpg",
    },
  });
  const { username, userEmail, text, subject, result_id } = req.user;
  // body of the email
  var email = {
    body: {
      name: username || "No Name",
      intro:
        text ||
        "Welcome to Yoga HeartBeat! We're very excited to have you join with us.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  var emailBody = MailGenerator.generate(email);

  let message = {
    from: process.env.SMTP_USERNAME,
    to: userEmail,
    subject: subject || "Login Succesful",
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      const url = process.env.returnHome;
      res.redirect(url + "?pmid=" + result_id);
    })
    .catch((error) => res.status(500).send({ error }));
};
