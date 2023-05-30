import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../assets/profile.png";
import styles from "../../../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { emailValidation } from "../../../helper/validate";
import { useDispatch } from "react-redux";
import { addUserLogin,setDataLogin } from "../../../redux/actions";
import { getUserByToken } from "../../../helper/loginAPI";
function Username() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
    if(token&&token!=='undefined'){
      let getUserToken = getUserByToken()
      getUserToken.then((res)=>{
        res.data.data= Object.assign(res.data.data,{token})
        dispatch(addUserLogin(res.data.data))
        dispatch(setDataLogin(res.data.data))
        navigate('/profile')
      })
    }else{

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
      await dispatch(addUserLogin(values)); //reRender mới bắt đầu update state
      navigate("/password");
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
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="email"
                placeholder="Email..."
              />
              <button className={styles.btn} type="submit">
                Let's Go
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a member{" "}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Username;
