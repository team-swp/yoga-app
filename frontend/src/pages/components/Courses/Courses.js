import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useInView } from "react-intersection-observer";
import classNames from "classnames/bind";
import styles from "./Courses.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import yoga2 from "../../../assets/yoga2.jpg";
import { getCourse } from "../../../helper/courseAPI";
import CourseItems from "./CourseItems";

const cx = classNames.bind(styles);

function Courses() {
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCourse();
        setCourseList(response.data.filter((course) => course.status));
        var newLink = document.createElement("a");
        newLink.href = "#course_list";
        newLink.click();
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  setTimeout(() => {}, 0);

  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: "-100px",
  });

  return (
    <div>
      <Header />
      <div className="bg-gray-400">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
          <h1 className="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
            START YOUR TRAINING JOURNEY
          </h1>
        </div>
      </div>
      <div className={cx("courses-img-yoga2")}>
        <img src={yoga2} alt="yoga2" />
      </div>
      <Container>
        <h2 className="w-full text-2xl text-left font-bold mt-8 mb-6">
          OUR COURSES
        </h2>
        <hr className="mb-10 border-t border-gray-500 mx-auto my-4 w-full" />
        <div
          id="course_list"
          className={cx("courses-container", { "in-view": inView })}
          ref={ref}
        >
          {courseList.map((course) => (
            <CourseItems course={course} />
          ))}
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Courses;
