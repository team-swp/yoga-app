import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/profile.png";
import styles from "../../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../../helper/validate";
import convertToBase64 from "../../helper/convert";
import { registerUser } from "../../helper/loginAPI";

import { registerUserAction } from "../../redux/actions";
function Register() {
  const [file, setFile] = useState("");

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
      values = await Object.assign(values, { avatar: file || "" });
      let registerPromise = registerUser(values); //func registerUser trả lại 1 promise
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successfully...!</b>,
        error: <b>Could not Register or Email has been existed</b>,
      });
    },
  });
  const resizeImage = (image, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Kiểm tra và điều chỉnh kích thước ảnh nếu nó vượt quá kích thước tối đa
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        // Tạo một canvas mới để vẽ ảnh đã điều chỉnh kích thước
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Chuyển đổi canvas thành base64 và trả về
        const resizedImage = canvas.toDataURL("image/jpeg");
        resolve(resizedImage);
      };
    });
  };
  const onUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    // Kích thước tối đa mới cho ảnh (ví dụ: 800x600)
    const maxWidth = 500;
    const maxHeight = 500;

    // Thay đổi kích thước ảnh
    const resizedImage =  resizeImage(base64, maxWidth, maxHeight);
    resizedImage.then((resize)=>{
      console.log(resize);
      setFile(resize);
    })
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-grey-500">
             Remember ! Let's choose a beautiful avatar 
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="avatar"
              />
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
