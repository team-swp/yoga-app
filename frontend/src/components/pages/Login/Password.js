import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../assets/profile.png";
import styles from "../../../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../../../helper/validate";
import { useDispatch, useSelector } from "react-redux";
import { verifyPassword } from "../../../redux/actions";
import { userSelector, getAllState } from "../../../redux/selectors";

function Password() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allState = useSelector(getAllState);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      function B() {
        console.log(allState);
      }

      async function A(B) {
        values = await Object.assign(values, user);
        await dispatch(verifyPassword(values));
        B();
      }

      A(B);
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
