import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/profile.png";
import styles from "../../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../../helper/validate";
import {
  registerUser,
} from "../../helper/loginAPI";
function Register() {
  const navigate = useNavigate();
  const formData = new FormData();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      phone: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
     
      let registerPromise = registerUser(values); //func registerUser trả lại 1 promise
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successfully...!</b>,
        error: <b>Could not Register or Email has been existed</b>,
      });
      registerPromise
        .then(() => {    
          navigate("/");
        })
        .catch(() => {
        console.log('1234');
          <b>Could not Register or Email has been existed</b>;
        });
    },
  });


  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-grey-500">
              Happy to join with us !
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={ avatar}
                  className={styles.profile_img}
                  alt="avatar"
                  />
              </label>

            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="email"
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Your Fullname*"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="password*"
              />
              <input
                {...formik.getFieldProps("phone")}
                className={styles.textbox}
                type="text"
                placeholder="phone"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?
                <Link className="text-red-500" to="/">
                    Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
