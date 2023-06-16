import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useInView } from "react-intersection-observer";
import classNames from "classnames/bind";
import styles from "./Courses.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import yoga2 from "../../../assets/yoga2.jpg";
import { getCourse } from "../../../helper/courseAPI";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourseId } from "../../../redux/actions";
import { getCourseID } from "../../../redux/selectors";

const cx = classNames.bind(styles);

function Courses() {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCourse();
        setCourseList(response.data.filter((course) => course.status));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: "-100px",
  });

  const dispatch = useDispatch();

  const handleCourseClick = (courseId) => {
    dispatch(setCourseId(courseId));
  };

  return (
    <div>
      <Header />
      <div class="bg-gray-400">
        <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
          <h1 class="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
            START YOUR TRAINING JOURNEY
          </h1>
        </div>
      </div>
      <div className={cx("courses-img-yoga2")}>
        <img src={yoga2} alt="yoga2" />
      </div>
      <Container>
        <h2 class="w-full text-2xl text-left font-bold mt-8 mb-6">
          OUR COURSES
        </h2>
        <hr class="mb-10 border-t border-gray-500 mx-auto my-4 w-full" />
        <div
          className={cx("courses-container", { "in-view": inView })}
          ref={ref}
        >
          {courseList.map((course) => (
            <Link to="/course" onClick={() => handleCourseClick(course._id)}>
              <div className={cx("courses-items")} key={course._id}>
                <div className={cx("courses-image")}>
                  <img src={course.images[0]} alt={course.coursename} />
                </div>
                <h6 className={cx("courses-title")}>{course.coursename}</h6>
                <p className={cx("courses-price")}>${course.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Courses;
