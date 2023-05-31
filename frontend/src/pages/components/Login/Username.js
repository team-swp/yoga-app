import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../assets/profile.png";
import styles from "../../../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { emailValidation } from "../../../helper/validate";
import { useDispatch } from "react-redux";
import { addUserLogin, setDataLogin } from "../../../redux/actions";
import { getUserByToken } from "../../../helper/loginAPI";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../../context/AuthGoogleContext";
import { addBooking } from "../../../helper/bookingAPI";

function Username() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token && token !== "undefined") {
    let getUserToken = getUserByToken();
    getUserToken.then((res) => {
      res.data.data = Object.assign(res.data.data, { token });
      dispatch(addUserLogin(res.data.data));
      dispatch(setDataLogin(res.data.data));
      navigate("/profile");
    });
  } else {
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: emailValidation,
    validateOnBlur: false,
    validateOnChange: false,
    // handleSubmit(values,{props,setSubmitting}){
    //   console.log('test 1');
    //   setSubmitting(false);
    //   console.log('test 2');
    // }

    onSubmit: async (values) => {
      dispatch(addUserLogin(values)); //reRender mới bắt đầu update state
      navigate("/password");
    },
  });
  const { googleSignIn } = UserAuth();
  const handleGoogleSignIn = () => {
    try {
      let loginPromise = googleSignIn();
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match!</b>,
      });

      loginPromise.then(() => {
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const socialLoginComing = (social) => {
    toast(`Sorry we are updating ${social} to login`, {
      icon: "👏",
      style: {
        fontSize:"13px",
        borderRadius: "10px",
        background: "#87DEE3",
        color: "000",
      },
    });
    console.log("click");
  };
  let title = "YOUR ACCOUNT FOR HEARTBEAT.";
  return (
    <div className={styles.background_all}>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Hello Again</h4>
              <span className="py-4 text-xl w-2/3 text-center text-grey-500">
                {title.toLowerCase()}
              </span>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps("email")}
                  className={styles.textbox}
                  type="email"
                  placeholder="Email..."
                />
                <button className={styles.btn} type="submit">
                  Let's Go
                </button>
                {/* <GoogleButton onClick={handleGoogleSignIn} /> */}
              </div>
              <div className={styles.line_divided}></div>
              <div className="flex justify-evenly items-center ">
                <div
                  onClick={() => {
                    socialLoginComing("Facebook");
                  }}
                  className="h-9 w-9"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    style={{ color: "#1877f2", cursor: "pointer" }}
                    viewBox="0 0 24 24"
                    className="hover:brightness-150"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </div>

                <div className="h-12 w-12" onClick={handleGoogleSignIn}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    style={{ color: "#ea4335", cursor: "pointer" }}
                    viewBox="0 0 24 24"
                    className="hover:brightness-200"
                  >
                    <path
                      d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div onClick={() => {
                    socialLoginComing("Instagram");
                  }} className="h-7 w-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "#c13584", cursor: "pointer" }}
                    className="hover:brightness-200"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Not a member{" "}
                  <Link className="text-red-500" to="/register">
                    Sign Up Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Username;
