import { Link } from "react-router-dom";
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Courses.module.css";
import { useDispatch } from "react-redux";
import { setCourseId } from "../../../redux/actions";
import { updateCourse } from "../../../helper/courseAPI";
import { getAvatarToAWS } from "../../../helper/loginAPI";

function CourseItems({ course }) {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const handleCourseClick = (courseId) => {
    dispatch(setCourseId(courseId));
  };
  const [file, setFile] = useState();
  const loadImageAgain = async (e) => {
    if (course.images) {
      const { url } = await getAvatarToAWS({ imageName: course._id });
      setFile(url);
      e.target.src = file;
      updateCourse({ _id: course._id, images: [url] });
    }
  };
  return (
    <>
      <Link to="/course" onClick={() => handleCourseClick(course._id)}>
        <div className={cx("courses-items")} key={course._id}>
          <div className={cx("courses-image")}>
            <img
              src={course.images[0] || file}
              alt={course.coursename}
              onError={loadImageAgain}
            />
          </div>
          <p className={cx("courses-title")}>{course.coursename}</p>
        </div>
      </Link>
    </>
  );
}

export default CourseItems;
