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
    <div className={styles.background_reset}>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
