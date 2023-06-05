import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../assets/profile.png";
import styles from "../../../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { emailValidation, passwordValidate } from "../../../helper/validate";
import { useDispatch, useSelector } from "react-redux";
import { verifyPassword, getUser } from "../../../helper/loginAPI";
import { userSelector } from "../../../redux/selectors";
import { addUserLogin, setDataLogin } from "../../../redux/actions";
function Password() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: emailValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(addUserLogin(values)); //reRender mới bắt đầu update state
      navigate("/recovery");
    },
  });
  let title = "ENTER YOUR EMAIL TO RECOVERY PASSWORD.";

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
                  placeholder="email..."
                />
                <button className={styles.btn} type="submit">
                  Recovery
                </button>
              </div>
              <div className="text-center py-4 mt-10">
                <span className="text-gray-500">
                  <Link className="text-red-500" to="/login">
                    Login Now?
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

export default Password;
