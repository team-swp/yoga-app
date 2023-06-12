<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../assets/profile.png";
import styles from "../../../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { userSelector } from "../../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, generateOTP } from "../../../helper/loginAPI";
import { setActionOTP } from "../../../redux/actions";
import ResetPass from "./ResetPass";

function PasswordReset() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();
  const [email, setEmail] = useState(
    user.email || JSON.parse(localStorage.getItem("email"))
  );
  const [screen, setScreen] = useState(true);
  console.log(user);
  useEffect(() => {
    generateOTP(email).then((OTP) => {
      localStorage.setItem("email", JSON.stringify(email));
      console.log(OTP);
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while generating OTP!");
    });
  }, [email]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      console.log(email);
      let { status } = await verifyOTP({ email, code: OTP });
      if (status === 201) {
        toast.success("Verify Successfully!");
        dispatch(setActionOTP({ OTP: true }));
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wront OTP! Check email again!");
    }
  }

  function resendOTP() {
    console.log(email);
    let sentPromise = generateOTP("resend", email);
    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    sentPromise.then((OTP) => {
      console.log("resend", OTP);
    });
  }

  const handleReset = () => {
    setScreen(true);
  };
  return (
    <div className={styles.background_reset}>
=======
import React, { useState } from "react";
import styles from "../../../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../../../helper/validate";
import { resetPassword, authenticatePassword } from "../../../helper/loginAPI";
import { userSelector } from "../../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActionOTP } from "../../../redux/actions";

function Reset() {
  const user = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsAuthenticating(true);
      const email = user.email || JSON.parse(localStorage.getItem("email"));

      // Xác thực mật khẩu cũ
      const isAuthenticated = await authenticatePassword({
        email,
        password: values.currentPassword,
      });

      if (isAuthenticated) {
        // Nếu mật khẩu cũ hợp lệ, tiến hành đổi mật khẩu
        let resetPromise = resetPassword({ email, password: values.password });

        toast.promise(resetPromise, {
          loading: "Updating...",
          success: (response) => {
            dispatch(setActionOTP({ OTP: false }));
            navigate("/");
            return <b>{response.message}</b>;
          },
          error: (error) => {
            if (error.statusCode === 401) {
              return <b>Current password is incorrect!</b>;
            } else {
              return <b>Could not reset password!</b>;
            }
          },
        });
      } else {
        toast.error("Current password is incorrect!");
      }

      setIsAuthenticating(false);
    },
  });

  return (
    <div className={styles.background_all}>
>>>>>>> 2663665387ee226401d4e94ef8fd2388f24b7a97
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
<<<<<<< HEAD
              <h4 className="text-5xl font-bold">Recovery</h4>
              <span className="py-4 text-xl w-2/3 text-center text-grey-500">
                Enter OTP to recover password.
              </span>
            </div>
            <form className="py-20">
              <div className="textbox flex flex-col items-center gap-6">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
                <button className={styles.btn} onClick={onSubmit} type="submit">
                  Verify
                </button>
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Can't get OTP ?
                  <button onClick={resendOTP} className="text-red-500">
                    Resend
                  </button>
                </span>
              </div>
=======
              <h4 className="text-5xl font-bold">Reset Password</h4>
              <span className="py-4 text-xl w-2/3 text-center text-grey-500">
                Enter your current and new password.
              </span>
            </div>
            <form className="py-20" onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps("currentPassword")}
                  className={styles.textbox}
                  type="password"
                  placeholder="Current Password..."
                />
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type="password"
                  placeholder="New Password..."
                />
                <input
                  {...formik.getFieldProps("confirm_pwd")}
                  className={styles.textbox}
                  type="password"
                  placeholder="Repeat Password..."
                />
                <button
                  className={styles.btn}
                  type="submit"
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? "Authenticating..." : "Confirm"}
                </button>
              </div>
>>>>>>> 2663665387ee226401d4e94ef8fd2388f24b7a97
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default PasswordReset;
=======
export default Reset;
>>>>>>> 2663665387ee226401d4e94ef8fd2388f24b7a97
