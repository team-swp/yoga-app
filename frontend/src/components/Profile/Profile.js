import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/profile.png";
import styles from "../../styles/Username.module.css";
import toast,{ Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../../helper/validate";
import convertToBase64 from "../../helper/convert";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors";
import { updateUser } from "../../helper/loginAPI";
import { updateData } from "../../redux/actions";
function Profile() {
  const user = useSelector(userSelector);
  const [file, setFile] = useState(user.avatar||'');
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: user.email,
      username: user.username,
      phone: user.phone||'',
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { avatar: file ||user.avatar || "" });
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });
      updatePromise.then(res => {
        dispatch(updateData(res.data.data))
        console.log(user);
      })
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
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-grey-500">
              You can update the details
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div  className="profile flex justify-center py-4">
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
                style={{width:500, height:500}}
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                readOnly
                className={styles.textbox}
                type="email"
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username*"
              />
              <input
                {...formik.getFieldProps("phone")}
                className={styles.textbox}
                type="text"
                placeholder="phone"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later
                <Link className="text-red-500" to="/">
                  Logout Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;