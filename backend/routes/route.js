const express = require("express");
const router = express.Router();
const Account = require("../models/accounts");
const {
  Auth,
  localVariables,
  AuthStaff,
  AuthAdmin,
} = require("../middleware/auth");
require("dotenv").config();
const { registerMail } = require("../controllers/Mailer");
const moment = require("moment");

const {
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
} = require("../controllers/OTP");
const {
  getAllAccount,
  getAccountById,
  verifyUser,
  Login,
  register,
  update,
  getAccountByIdAuth,
  getAccountPaging,
  updateRoleAccount,
  updateAccountForStaff,
<<<<<<< HEAD
  updatePassword,
  updateUserForAdmin,
  charDataAccount,
  charDataSparkLine,
=======
>>>>>>> 2a44cf877dc5be9bc304ee6200ffa14b2023c744
} = require("../controllers/Account");

const crypto = require("crypto");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const dateFormat = require("dateformat");

const { postImage, getImage } = require("../AWS/StoreImageS3");
const {
  addSemester,
  getSemester,
  updateSemester,
  getSemesterById,
  getSemestersPaging,
} = require("../controllers/Semester");
const {
  addCourse,
  getCourses,
  getCourseById,
  updateCourse,
  getCoursesPaging,
} = require("../controllers/Course");
const {
  addSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  getSchedulesPaging,
} = require("../controllers/Schedule");
const {
  addClass,
  getClasses,
  getClassById,
  updateClass,
  getClassesPaging,
} = require("../controllers/Class");

const {
  verifyTokenGoogle,
  CheckExistAccount,
} = require("../Firebase/Firebase-admin");
const {
  addPaymentMethod,
  getPaymentMethod,
  getPaymentMethodById,
  updatePaymentMethod,
  addPayment,
  getPayment,
  getPaymentById,
  updatePayment,
  createPayment,
  vnpayIPN,
  vnpayReturn,
  runUrl,
  haveDonePayment,
  getPaymentsPaging,
  getPaymentParams,
  charDataPayment,
  charDataPaymentPremium,
  charDataPaymentPremiumLineChart,
} = require("../controllers/Payment");
const {
  addBooking,
  getBooking,
  updateBooking,
  getBookingsPaging,
} = require("../controllers/Booking");
const Semester = require("../models/semesters");
const { log } = require("console");
const { addRole, updateRole, getRoleById } = require("../controllers/Role");
const { getUserIP } = require("../middleware/blockIP");

const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;

//Getting all
router.get("/accounts", getAllAccount); // thêm phần kiểm tra role người dùng
//Getting one
router.get("/accounts/:id", getAccountById, (req, res) => {
  const { password, ...rest } = Object.assign({}, res.account.toJSON());
  res.send(rest);
});

//login
router.post("/accounts/login", verifyUser, Login);

//Creating one
router.post("/accounts/register", register);
//Updating one
router.patch("/accounts", Auth, getAccountByIdAuth, update);

//update role for user
router.patch("/accounts/updateRole", AuthAdmin, updateRoleAccount);

//update user for staff
router.patch("/staff/account/update", AuthStaff, updateAccountForStaff);

//getAccessToken
router.get("/accessToken", Auth, getAccountByIdAuth, (req, res) => {
  const { password, ...rest } = Object.assign({}, res.account.toJSON());
  res.send(rest);
});

//Get password
router.post("/password", Auth, getAccountByIdAuth, (req, res) => {
  const { password, ...rest } = Object.assign({}, res.account.toJSON());
  res.send({ password });
});

//Deleting one

// router.delete("/accounts/:id", getAccountById, async (req, res) => {
//   try {
//     await Account.findByIdAndDelete(res.account.id);
//     res.json({ message: "Deleted Account" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.post("/authenticate", verifyUser, (req, res) => res.end());
///End Account
//Genarate OTP

router.get("/genarateOTP", verifyUser, localVariables, generateOTP);
router.get("/verifyOTP", verifyUser, verifyOTP);
router.get("/createResetSession", createResetSession);

//resetPassword
router.put("/accounts/resetpassword", verifyUser, resetPassword);

//mail
router.post("/registerMail", registerMail); //sendMail
module.exports = router;

//image in aws S3
router.post("/image/post", upload.single("avatar"), postImage);

router.get("/image/get", getImage);

//semester
router.post("/semester/add", AuthStaff, addSemester); //thêm phần auth xác thực xem người dùng có mang role là staff hay không
router.get("/semester/get", getSemester); //ai cũng có thể get
router.patch("/semester/update", AuthStaff, getSemesterById, updateSemester); //thêm phần auth xác thực xem người dùng có mang role là staff hay không
//course , thêm auth y chang semester
//chưa check down
router.post("/course/add", AuthStaff, addCourse);
router.get("/course/get", getCourses);
router.patch("/course/update", AuthStaff, getCourseById, updateCourse);

//schedule thêm auth y chang semester
router.post("/schedule/add", AuthStaff, addSchedule);
router.get("/schedule/get", getSchedules);
router.patch("/schedule/update", AuthStaff, getScheduleById, updateSchedule);

//class thêm auth
router.post("/class/add", AuthStaff, addClass);
router.get("/class/get", getClasses);
router.patch("/class/update", AuthStaff, getClassById, updateClass);
//payment Method
router.post("/payment/method/add", AuthStaff, addPaymentMethod);
router.get("/payment/method/get", getPaymentMethod);
router.patch(
  "/payment/method/update",
  AuthStaff,
  getPaymentMethodById,
  updatePaymentMethod
);

//Role
router.post("/role/add", AuthAdmin, addRole);
router.patch("/role/update", AuthAdmin, getRoleById, updateRole);

//payment
router.post("/payment/add", /*Auth,*/ addPayment);
router.get("/payment/get", getPayment);
router.get("/payment/get/:id", getPaymentParams);
router.patch("/payment/update", AuthStaff, getPaymentById, updatePayment);
//payment Method
router.post("/payment/method/add", AuthStaff, addPaymentMethod);
router.get("/payment/method/get", getPaymentMethod);
router.patch(
  "/payment/method/update",
  AuthStaff,
  getPaymentMethodById,
  updatePaymentMethod
);
router.post("/booking/add", Auth, addBooking); // có tài khoản thì mới đucợ book
router.get("/booking/get", getBooking);
router.patch("/booking/update", Auth, updateBooking); //người booking nếu đang duyệt thì đc sửa, chỉ ng book mới đc sửa, trong trạng thái duyệt
//google
router.post("/google/verify", verifyTokenGoogle, CheckExistAccount);

///-payyyment VNPAY

router.post("/create_payment_url", createPayment);

router.get("/vnpay_ipn", vnpayIPN, haveDonePayment);

router.get("/vnpay_return", vnpayReturn);

router.post("/runUrlVnPAY", runUrl);

//pagingnation

router.get("/coursesPaging/get", getCoursesPaging);
router.get("/accountsPaging/get", getAccountPaging);
router.get("/bookingsPaging/get", getBookingsPaging);
router.get("/paymentsPaging/get", getPaymentsPaging);
router.get("/schedulesPaging/get", getSchedulesPaging);
router.get("/semestersPaging/get", getSemestersPaging);
router.get("/classesPaging/get", getClassesPaging);

//IP
// router.get("/ipUser",getUserIP)
//Chart 
router.post('/chart/payments',charDataPayment)
router.post('/chart/customer',charDataAccount)
router.post('/chart/product',charDataPaymentPremium)
router.post('/chart/members',charDataSparkLine)
router.post('/chart/premium',charDataPaymentPremiumLineChart)