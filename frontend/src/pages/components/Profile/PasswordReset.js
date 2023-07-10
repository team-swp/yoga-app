import React, { useEffect, useState } from "react";
import styles from "../../../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../../../helper/validate";
import { getPasswordCurr, updateUser } from "../../../helper/loginAPI";

var bcrypt = require("bcryptjs");

function Reset() {
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
      console.log(values.password);
      // Xác thực mật khẩu cũ
      const isOldPassword = await getPasswordCurr();
      console.log(isOldPassword.data.password);
      console.log(values.currentPassword, "asasdsad");

      if (isOldPassword)
        bcrypt
          .compare(values.currentPassword, isOldPassword.data.password)

          .then((isSuccess) => {
            if (isSuccess) {
              bcrypt
                .compare(values.password, isOldPassword.data.password)
                .then((isSame) => {
                  if (!isSame) {
                    let updatePromise = updateUser({
                      password: values.password,
                    });
                    toast.promise(updatePromise, {
                      loading: "Updating...",
                      success: <b>Update Successfully...!</b>,
                      error: <b>Could not Update!</b>,
                    });
                  } else {
                    toast.error("New password cannot same Old Password");
                  }
                });
            } else {
              toast.error("Old Password not match");
            }
            console.log(isSuccess);
          })

          .catch((isFail) => {
            toast.error("Old Password not match");
          });
    },
  });

  return (
    <div className={styles.background_reset}>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Change Password</h4>
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
                <button className={styles.btn} type="submit">
                  Submit
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
