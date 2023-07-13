import React, { useEffect, useState } from "react";
import avatar from "../../../assets/profile.png";
import styles from "../../../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../../../helper/validate";
import convertToBase64 from "../../../helper/convert";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors";
import { getPasswordCurr, updateUser } from "../../../helper/loginAPI";
import { setDataLogin, updateData } from "../../../redux/actions";
import { getAvatarToAWS, postAvatarToAWS } from "../../../helper/loginAPI";

import Header from "../Header/Header";
import DoneIcon from "@mui/icons-material/Done";
import Recovery from "./PasswordGoogle";
import PasswordReset from "./PasswordReset";
import PurchaseHistory from "./PurchaseHistory";

function Profile() {
  const user = useSelector(userSelector);
  const [file, setFile] = useState(user.avatar || "");
  const [imageTemp, setImageTemp] = useState(true);
  const [isNotPass, setIsNotPass] = useState(true);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("information");
  const defaultAvatarURL =
    "https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg";

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
      console.log(values);
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
  const loadImageAgain = async (e) => {
    if (user.avatar) {
      const { url } = await getAvatarToAWS({ imageName: user._id });
      setFile(url);
      e.target.src = file;
      updateUser({ avatar: url });
    } else {
      e.target.src = defaultAvatarURL;
      return;
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
          setImageTemp(resize);
        });

        const formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("imageName", user._id);
        const { data, status } = await postAvatarToAWS(formData);
        if (status === 200) {
          data.imageName = user._id;
          const { url } = await getAvatarToAWS(data);
          const result = updateUser({ avatar: url });
          result
            .then((data) => {
              dispatch(setDataLogin(data.data.data));
              toast.success("Update Avatar Successfully");
            })
            .catch(() => {
              console.log("error");
            });
          setFile(url);
          console.log(file);
        }
      } else {
        toast.error("Please select an image");
      }
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const isPassword = async () => {
      const isOldPassword = await getPasswordCurr();
      if (isOldPassword && isOldPassword.data && isOldPassword.data.password) {
        setIsNotPass(true);
      } else {
        setIsNotPass(false);
      }
    };
    isPassword();
  }, []);

  const imgStyle = `${styles.profile_img} object-cover h-44  `;
  const avatarURL = user.avatar || defaultAvatarURL;
  return (
    <div className="">
      <div>
        <Header />
      </div>
      <Toaster></Toaster>
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
              <button
                onClick={() => handleTabChange("information")}
                className=" uppercase"
              >
                Update Information
              </button>
              <button
                onClick={() => handleTabChange("password")}
                className=" uppercase pr-6"
              >
                Update Password
              </button>
              <button
                onClick={() => handleTabChange("purchase")}
                className=" uppercase pr-6"
              >
                Purchase History
              </button>
            </div>
          </div>
          <div className="flex flex-col border-l-2 border-black w-full lg:w-[70%]">
            <div className="border-b-2 border-black flex justify-center py-12">
              <div className=" font-semibold text-3xl">PROFILE</div>
            </div>
            {activeTab === "information" && (
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
                    <p>Your email</p>
                  </div>
                  <input
                    {...formik.getFieldProps("email")}
                    readOnly
                    className={styles.textbox}
                    type="email"
                    placeholder="Email*"
                  />
                  <div>
                    <p>Your Name</p>
                  </div>
                  <input
                    {...formik.getFieldProps("username")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Username*"
                  />
                  <div>
                    <p>Your telephone</p>
                  </div>
                  <input
                    {...formik.getFieldProps("phone")}
                    className={styles.textbox}
                    type="text"
                    placeholder="phone"
                  />
                  <div className="flex items-center gap-2">
                    <DoneIcon />
                    <p>Please notify me about updates to my products.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <DoneIcon />
                    <p>Please notify me of all offers granted to me.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <DoneIcon />
                    <p>Please email me about new products and promotions.</p>
                  </div>

                  <div
                    className=" pt-3
                  
                "
                  >
                    <div className=" ml-10">
                      <p>Avatar</p>
                    </div>
                    <div className="flex gap-5 items-center">
                      <label htmlFor="profile">
                        <img
                          src={imageTemp || user.avatar || avatar}
                          className={imgStyle}
                          alt="avatar"
                          onError={loadImageAgain}
                        />
                      </label>
                      <div>
                        <p>Click on current avatar to choose new image * </p>
                        <input
                          onChange={onUpload}
                          type="file"
                          id="profile"
                          name="avatar"
                          style={{ width: 500, height: 500 }}
                        />
                      </div>
                    </div>
                  </div>
                  <button className={styles.btn_savechange} type="submit">
                    Save change
                  </button>
                </div>
              </form>
            )}
            {activeTab === "password" &&
              (isNotPass ? <PasswordReset /> : <Recovery />)}
            {activeTab === "purchase" && <PurchaseHistory />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
