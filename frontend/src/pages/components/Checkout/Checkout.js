import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import {
  emailValidation,
  loginValidation,
  paymentVerify,
} from "../../../helper/validate";
import { useDispatch, useSelector } from "react-redux";
import { addUserLogin, setDataLogin } from "../../../redux/actions";
import {
  getUser,
  getUserByToken,
  updateUser,
  verifyPassword,
} from "../../../helper/loginAPI";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../../context/AuthGoogleContext";
import { addBooking, checkBooking } from "../../../helper/bookingAPI";
import styles from "./checkout.module.css";
import vnpayImage from "../../../assets/vnpay.png";
import homepayImage from "../../../assets/yogapaymenthome.png";
import {
  addPayment,
  createVnpay,
  runUrlVnpay,
} from "../../../helper/paymentAPI";
import axios from "axios";
import { premiumSelector, userSelector } from "../../../redux/selectors";
import { Box, Typography } from "@mui/material";
import { Modal } from "@mui/base";
import classNames from "classnames/bind";
import soundSpringFlower from '../../../assets/LisaSpringFlower.mp3'
import soundHalfLove from '../../../assets/LisaHalfLove.mp3'
import soundBigDeal from '../../../assets/LisaBigDeal.mp3'

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { soundPlay } = UserAuth();
  const user = useSelector(userSelector);
  const premium = useSelector(premiumSelector);
  const [emailType, setEmailType] = useState(user.email);
  const [isSelected, setIsSelected] = useState(true);
  const [isSelected2, setIsSelected2] = useState(false);
  const [open, setOpen] = useState(true);
  const handleRadioChange = () => {
    setIsSelected2(false);
    setIsSelected(true);
  };

  const handleRadioChange2 = () => {
    setIsSelected(false);
    setIsSelected2(true);
  };
  const openModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  useEffect(()=>{
    toast.success(`Your premium booking is ${premium.premiumname}`)
    if(premium.premiumname.includes('Spring')){
      console.log('zo');
      soundPlay(soundSpringFlower)
    }else if(premium.premiumname.includes('Half')){
      soundPlay(soundHalfLove)
    }else{
      soundPlay(soundBigDeal)
    }
  },[])
  const formik = useFormik({
    initialValues: {
      email: user.email,
      phone: (user.phone && `0${user.phone}`) || "",
      amount: premium.paymentAmount,
      username: user.username || "",
    },
    validate: paymentVerify,
    validateOnBlur: false,
    validateOnChange: false,
    // handleSubmit(values,{props,setSubmitting}){
    //   console.log('test 1');
    //   setSubmitting(false);
    //   console.log('test 2');
    // }
    onSubmit: async (values) => {
    
      const checkBookingPromise = checkBooking();
      checkBookingPromise
        .then(() => {
          if (isSelected) {
            const vnpayLink = createVnpay({
              amount: values.amount,
              orderDescription: `${user._id},${values.email},${
                values.username || "Member"
              } ,${premium.premium_id}`, //bookingID lấy trong state
              orderType: 190004,
            });
            vnpayLink
              .then((data) => {
                console.log(data);
                if (data.data) {
                  var newLink = document.createElement("a");
                  newLink.href = data.data;
                  newLink.textContent = "VNPAY PAYMENT";
                  newLink.target = "_blank";
                  newLink.click();
                  navigate("/");
                } else {
                  toast.error("The system is maintenance");
                }
              })
              .catch(() => {
                toast.error("Payment is maintenance please choose other");
              });
          } else {
            const date = new Date();
            const bookingPromise = addBooking({ member_id: user._id });
            toast.promise(bookingPromise, {
              loading: "Checking...",
              success: <b>Payment Successfully...!</b>,
              error: <b>Payment not Successfully !</b>,
            });
            bookingPromise
              .then((result) => {
                const paymentPromise = addPayment({
                  recipient: "Yoga HeartBeat",
                  paymentDate: date,
                  paymentAmount: values.amount,
                  paymentMethod_id: "647496600eeb65cda05ee191",
                  booking_id: result.data.data.result._id,
                  premium_id: premium.premium_id,
                  status: 5,
                  meta_data: "Pay at Yoga Center",
                });
                paymentPromise
                  .then( async(result) => {
                    const urlID = result.data.data.result._id;
                    const date = new Date()
                  const dateString = date.toISOString();
                    const updateMember = updateUser({
                      meta_data:`{"isMember":false}` ,
                      // meta_data:`{"isMember":true,"MemberDuration":"${premium.duration}","startDateMember":"${dateString}"}` ,
                    });
                    updateMember.then((result) => {
                      //qua trang thanh toán thành công
                      dispatch(setDataLogin(result.data.data))
                      navigate(`/paymentstatus?pmid=${urlID}`);
                    });
                  })
                  .catch(() => {
                    //chỗ này làm thêm delete nếu ko thành công xóa mấy thg cũ
                    // toast.error("Payment not Successfully");
                  });
              })
              .catch(() => {
                // toast.error("Booking not Successfully");
              });
          }
        })
        .catch((error) => {
          // console.log(error.error.response.data.message);
          toast.error(error.error.response.data.message);
        });
    },
  });

  let title = "please check your information before submit.";

  return (
    <div className={styles.background_all}>
      <div className="container mx-auto ">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center ">
          <div className={styles.glass} sx={{ backgroundColor: "#fff" }}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Checkout</h4>
              <span className="py-4 text-xl w-2/3 text-center text-grey-500">
                {title.toLowerCase()}
              </span>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="textbox flex-col  items-center gap-6 mb-10 ">
                <div className="textbox px-5 py-4 h2 font-bold text-xl">
                  1. Your information
                </div>
                <div className="textbox flex  items-left gap-6 mb-2">
                  <input
                    {...formik.getFieldProps("email")}
                    className={styles.textbox}
                    type="email"
                    placeholder="Enter your email address"
                  />

                  <input
                    {...formik.getFieldProps("phone")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="textbox flex-col  items-center gap-6 mb-10 ">
                <div className="textbox px-5 py-4 h2 font-bold text-xl">
                  2. Payment Info
                </div>
                <div className="textbox flex  items-left gap-6 mb-2">
                  <input
                    readOnly
                    {...formik.getFieldProps("amount")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Payment amount"
                  />

                  <input
                    {...formik.getFieldProps("username")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Enter your fullname"
                  />
                </div>
              </div>
              <div className="textbox flex flex-col items-left mt-10 mb-10">
                <div className="textbox px-5 py-4 h2 font-bold text-xl">
                  3. Choose your payment methods
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`${styles.div_radio} ${
                      isSelected ? styles.active : ""
                    } justify-between p-4`}
                    onClick={handleRadioChange}
                  >
                    <label className={styles.lable}>
                      <img src={vnpayImage} alt="VNPAY" />
                      <div style={{ whiteSpace: "nowrap" }}>
                        Thẻ ATM Nội Địa
                      </div>
                    </label>
                    <input
                      {...formik.getFieldProps("method")}
                      type="radio"
                      placeholder="Payment amount"
                      checked={isSelected}
                      value="ATM"
                    />
                  </div>

                  <div
                    className={`${styles.div_radio} ${
                      isSelected2 ? styles.active : ""
                    } justify-between p-4`}
                    onClick={handleRadioChange2}
                  >
                    <label className={`lable ${styles.lable}`}>
                      <img src={homepayImage} alt="Payment at Yoga Center" />
                      <div style={{ whiteSpace: "nowrap" }}>
                        Thanh Toán Tại Trung Tâm YOGA
                      </div>
                    </label>
                    <input
                      {...formik.getFieldProps("method")}
                      type="radio"
                      checked={isSelected2}
                      value="YogaCenter"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.ticket_devider}></div>
              <div className="textbox flex flex-col items-center">
                <button className={styles.btn} type="submit">
                  Payment now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;