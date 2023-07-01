const Account = require("../models/accounts");
const Booking = require("../models/bookings");
const Payment = require("../models/payments");
const Premium = require("../models/premiums");
module.exports.checkIsMember = async (req, res, next) => {
  try {
    if (req.account.role !== "user") {
      return res.status(400).send({
        message: `Only User Can Booking!!!`,
      });
    }
    //check user trước nếu meta_data có isMember:true
    if (req.body.isTry) {
      const bookingData = await Booking.findOne({
        member_id: req.account.userId,
      });
      if (bookingData) {
        return res.status(400).send({
          message: `Have Been Already Trial`,
        });
      }
    }
    const memberPromise = Account.findOne({ _id: req.account.userId });
    const [member] = await Promise.all([memberPromise]);
    if (member) {
      if (!member.meta_data) {
        next();
        return;
      }else if(!JSON.parse(member.meta_data).isMember){
        if(JSON.parse(member.meta_data).payment_id){
          return res.status(400).send({
            message: `Your Premium Is Pending, Please Come To Yoga Center To Complete Your Payment`,
          });
        }
        next();
        return;
      }else{
        const check = JSON.parse(member.meta_data)
        if(!check.isMember){
          return res.status(400).send({
            message: `Your Premium Is Pending, Please Come To Yoga Center To Complete Your Payment`,
          });
        }
      }
      const memberMetaData = JSON.parse(member.meta_data);
      if (memberMetaData) {
        const isMember = memberMetaData.isMember;
        if (isMember) {
          const bookingInPeriod = await Booking.findOne({
            member_id: req.account.userId,
          }).sort({ createdAt: -1 });
          if (bookingInPeriod) {
            const payment = await Payment.findOne({
              booking_id: bookingInPeriod._id,
            }).sort({ createdAt: -1 });
            const dateCheck = payment.paymentDate;
            const currentDate = new Date();
            const premium = await Premium.findById(payment.premium_id);
            const monthPremium = premium.durationByMonth;
            const dateCheckPlus = new Date(dateCheck);
            dateCheckPlus.setMonth(dateCheckPlus.getMonth() + monthPremium);
            if (dateCheckPlus > currentDate) {
              const dateString = dateCheckPlus.toString();
              const index = dateString.indexOf("G");
              const trimmedString = dateString.substring(0, index);
              return res.status(400).send({
                message: `Your premium package is valid until ${trimmedString}`,
              });
            }
          }
        }
      }
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
