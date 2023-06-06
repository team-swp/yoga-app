import React, { useEffect, useRef, useState } from "react";
import { Link, location } from "react-router-dom";
import avatar from "../../../assets/profile.png";
import styles from "../../../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../../../helper/validate";
import convertToBase64 from "../../../helper/convert";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors";
import { updateUser } from "../../../helper/loginAPI";
import { updateData } from "../../../redux/actions";
import { getAvatarToAWS, postAvatarToAWS } from "../../../helper/loginAPI";
import { logOut } from "../../../redux/actions";
import { UserAuth } from "../../../context/AuthGoogleContext";
import { addBooking } from "../../../helper/bookingAPI";
import Navigation from "../Header/Navigation/Navigation";
import Header from "../Header/Header";
import { Container } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Password from "../Login/Password";
import Profile from "./Profile";
import Recovery from "../Login/Recovery";

const PasswordProfile = () => {
  const { logOut } = UserAuth();
  const user = useSelector(userSelector);
  const [file, setFile] = useState(user.avatar || "");
  const [imageTemp, setImageTemp] = useState(true);
  const dispatch = useDispatch();
  const userCurr = {
    username: user,
  };
  const [screen, setScreen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: user.email,
      username: user.username,
      phone: user.phone || "",
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, {
        avatar: file || user.avatar || "",
      });
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>,
      });
      updatePromise.then((res) => {
        dispatch(updateData(res.data.data));
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
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
          }

          if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
          }
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
  // const onUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertToBase64(file);

  //   // Kích thước tối đa mới cho ảnh (ví dụ: 800x600)
  //   const maxWidth = 500;
  //   const maxHeight = 500;

  //   // Thay đổi kích thước ảnh
  //   const resizedImage = resizeImage(base64, maxWidth, maxHeight);
  //   resizedImage.then((resize) => {
  //     console.log(resize);
  //     setFile(resize);
  //   });
  // };
  const loadImageAgain = (e) => {
    if (user.avatar) {
      e.target.src = file;
    }
  };
  const onUpload = async (e) => {
    const avatar = e.target.files[0];
    if (avatar) {
      if (avatar.type.startsWith("image/")) {
        const base64 = await convertToBase64(avatar);

        // Kích thước tối đa mới cho ảnh (ví dụ: 800x600)
        const maxWidth = 500;
        const maxHeight = 500;

        // Thay đổi kích thước ảnh
        const resizedImage = resizeImage(base64, maxWidth, maxHeight);
        resizedImage.then((resize) => {
          console.log(resize);
          setImageTemp(resize);
        });

        const formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("imageName", user._id);

        const { data, status } = await postAvatarToAWS(formData);
        if (status === 200) {
          data.imageName = user._id;
          const { url } = await getAvatarToAWS(data);
          setFile(url);
        }
      } else {
        toast.error("Please select an image");
      }
    }
  };

  const handleSavechange = () => {
    const alert = document.createElement("div");
    alert.className = "alert";
    alert.innerHTML = "Update successfully";

    document.body.appendChild(alert);

    setTimeout(function () {
      alert.parentNode.removeChild(alert);
    }, 3000);
  };

  const handleLogout = () => {
    logOut();
  };
  const imgStyle = `${styles.profile_img} object-cover h-44  `;
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="bg-gray-200 w-[90%] lg:w-[1200px] h-auto my-6 mx-auto">
        <div className="flex flex-col lg:flex-row h-full">
          <div className="flex flex-col border-r-red-400 w-full lg:w-[30%] ">
            <div className=" border-b-2 border-black">
              <div className="flex justify-center pt-14">
                <img
                  src={imageTemp || user.avatar || avatar}
                  className={imgStyle}
                  alt="avatar"
                  onError={loadImageAgain}
                />
              </div>
              <div className="flex justify-center pt-5 text-2xl mb-5">
                <p>Hello, {user.username}</p>
              </div>
            </div>

            <div className="flex flex-col items-center py-24 gap-24 font-bold">
              <button className=" uppercase">Update Information</button>
              <button className=" uppercase pr-6">Update Password</button>
            </div>
          </div>
          <div className="flex flex-col border-l-2 border-black w-full lg:w-[70%]">
            <div className="border-b-2 border-black flex justify-center py-12">
              <div className=" font-semibold text-3xl">PROFILE</div>
            </div>
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div
                style={{ width: 150, height: "auto", margin: "auto" }}
                className="profile flex justify-center py-4"
              >
                <input
                  onChange={onUpload}
                  type="file"
                  id="profile"
                  name="avatar"
                  style={{ width: 500, height: 500 }}
                />
              </div>

              <div className="textbox flex flex-col items-left ml-20 gap-6">
                <div className="">
                  <p>Current Password</p>
                </div>
                <input
                  {...formik.getFieldProps("email")}
                  className={styles.textbox}
                  type="password"
                  placeholder="Current password*"
                />
                <div>
                  <p>New Password</p>
                </div>
                <input
                  {...formik.getFieldProps("username")}
                  className={styles.textbox}
                  type="password"
                  placeholder="New password*"
                />
                <div>
                  <p>Verify password </p>
                </div>
                <input
                  {...formik.getFieldProps("phone")}
                  className={styles.textbox}
                  type="text"
                  placeholder="Input new password again*"
                />

                <button
                  className={styles.btn_savechange}
                  type="submit"
                  onClick={handleSavechange}
                >
                  Save change
                </button>

                <div
                  className=" pt-12
                "
                ></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordProfile;
