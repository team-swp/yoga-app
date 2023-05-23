import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD:frontend/src/components/pages/Login/Password.js
import avatar from "../../../assets/profile.png";
import styles from "../../../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
=======
import avatar from "../../assets/profile.png";
import styles from "../../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
>>>>>>> ded8bc2346c5400b366988cf45a254ceaa054dea:frontend/src/components/Login/Password.js
import { useFormik } from "formik";
import { passwordValidate } from "../../../helper/validate";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD:frontend/src/components/pages/Login/Password.js
import { verifyPassword } from "../../../redux/actions";
import { userSelector, getAllState } from "../../../redux/selectors";

=======
import { verifyPassword, getUser } from "../../helper/loginAPI";
import { userSelector } from "../../redux/selectors";
import { setDataLogin } from "../../redux/actions";
>>>>>>> ded8bc2346c5400b366988cf45a254ceaa054dea:frontend/src/components/Login/Password.js
function Password() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      let loginPromise = verifyPassword({
        email: user.email,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match!</b>,
      });

      loginPromise.then((res) => {
        const token = res.data.token
        const id = res.data._id;
        let getUserData = getUser({ id });
        getUserData.then((res) => {
          res.data = Object.assign(res.data,{token})
          console.log(res.data);
          dispatch(setDataLogin(res.data)); //reducer là kho lưu trữ nhận giá trị lưu trữ không phải phần xử lí
          navigate("/profile");
        });
      });
      // function asyncFunction1() {
      //   return new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       resolve(allState); // Hoàn thành Promise
      //     }, 2000);
      //   });
      // }
      // asyncFunction1()
      //   .then((stateAll)=>{
      //   console.log('all',stateAll);
      // })
      // navigate(allState.page_uri)

      // setTimeout(() => {
      // }, 3000);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again</h4>
            <span className="py-4 text-xl w-2/3 text-center text-grey-500">
              Explore More by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Password..."
              />
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?{" "}
                <Link className="text-red-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;
