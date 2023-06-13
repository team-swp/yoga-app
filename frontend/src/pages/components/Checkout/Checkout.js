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
  verifyPassword,
} from "../../../helper/loginAPI";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../../context/AuthGoogleContext";
import { addBooking } from "../../../helper/bookingAPI";
import styles from "./checkout.module.css";
import vnpayImage from "../../../assets/vnpay.png";
import homepayImage from "../../../assets/yogapaymenthome.png";
import { createVnpay, runUrlVnpay } from "../../../helper/paymentAPI";
import axios from "axios";
import { userSelector } from "../../../redux/selectors";
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [emailType, setEmailType] = useState();
  const [isSelected, setIsSelected] = useState(true);
  const [isSelected2, setIsSelected2] = useState(false);
  const handleRadioChange = () => {
    setIsSelected2(false);
    setIsSelected(true);
  };

  const handleRadioChange2 = () => {
    setIsSelected(false);
    setIsSelected2(true);
  };

  const user = useSelector(userSelector);
  const formik = useFormik({
    initialValues: {
      email: user.email,
      phone: user.phone || "",
      amount: "",
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
      console.log(values);
      if (isSelected) {
        const vnpayLink = createVnpay({
          amount: values.amount,
          orderDescription: `647da69ec4e008c1eee52e17,${values.email},${
            values.username || "Member"
          }`, //bookingID lấy trong state
          orderType: 190004,
        });
        vnpayLink.then((data) => {
          console.log(data.data);
          // window.open(data.data, '_blank', 'noopener,noreferrer');
          window.location.href = data.data;
        });
      }

      // let loginPromise = verifyPassword({
      //   email: values.email,
      //   password: values.password,
      // });
      // toast.promise(loginPromise, {
      //   loading: "Checking...",
      //   success: <b>Login Successfully...!</b>,
      //   error: <b>Password Not Match!</b>,
      // });

      // loginPromise
      //   .then((res) => {
      //     const token = res.data.token;
      //     const id = res.data._id;
      //     let getUserData = getUser({ id });
      //     getUserData
      //       .then((res) => {
      //         res.data = Object.assign(res.data, { token });
      //         console.log(res.data);
      //         dispatch(setDataLogin(res.data)); //reducer là kho lưu trữ nhận giá trị lưu trữ không phải phần xử lí
      //         navigate("/");
      //       })
      //       .catch((res) => {
      //         navigate("/login");
      //       });
      //   })
      //   .catch((res) => {
      //     navigate("/login");
      //   });
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
                    value={emailType}
                  />

                  <input
                    {...formik.getFieldProps("phone")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Enter your phone number"
                    value={emailType}
                  />
                </div>
              </div>

              <div className="textbox flex flex-col items-left mt-10 mb-10">
                <div className="textbox px-5 py-4 h2 font-bold text-xl">
                  2. Payment Info
                </div>
                <div className="textbox flex items-left pr-5 mb-2 w-8/12 ">
                  <input
                    {...formik.getFieldProps("amount")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Payment amount"
                  />

                  <div></div>
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
                        Thanh Toán Tại Trung Tâm YOGA{" "}
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
