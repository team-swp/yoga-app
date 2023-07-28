import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./CourseDetail.module.css";
import classNames from "classnames/bind";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Container, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckIcon from "@mui/icons-material/Check";
import ScrollToTopOnMount from "../../ScrollToTopOnMount";
import { getCourse } from "../../../helper/courseAPI";
import Loading from "./Loading";

const cx = classNames.bind(styles);

function CourseDetail() {
  const token = localStorage.getItem("token");
  const courseId = localStorage.getItem("courseId");
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [foundCourse, setFoundCourse] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  //fetchData
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCourse();
        const filteredCourses = response.data.filter(
          (obj) => obj._id === courseId && obj.status === true
        );
        if (filteredCourses.length > 0) {
          setCourse(filteredCourses[0]);
        } else {
          setFoundCourse(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [courseId]);

  const handleSubmit = async () => {
    try {
      navigate("/checkout");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ScrollToTopOnMount />
      <Header />
      <div className="bg-gray-400">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
          <h1 className="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
            START YOUR TRAINING JOURNEY
          </h1>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : foundCourse ? (
        <Container>
          <h1 className={cx("course-header")}>{course.coursename}</h1>
          <Grid container spacing={2}>
            <Grid item md={7}>
              <div className={cx("course-learn")}>
                <p>What you will learn ?</p>
                <ul className={cx("course-learn-list")}>
                  <li>
                    <CheckIcon fontSize="small" sx={{ marginRight: 1 }} />
                    {course.willLearn}
                  </li>
                </ul>
              </div>
              <div className={cx("course-requirement")}>
                <p>Requirement </p>
                <ul className={cx("course-requirement-list")}>
                  <li>{course.requirement}</li>
                </ul>
              </div>
            </Grid>
            <Grid item md={5} className={cx("course-wrapper")}>
              <div className={cx("course-container")}>
                <div className={cx("course-image")}>
                  <img src={course.images[0]} alt={course.coursename} />
                </div>
                <div className="flex justify-evenly align-center my-3">
                  <button
                    className={cx("course-button")}
                    onClick={() => {
                      if (token) handleSubmit();
                      else navigate("/login");
                    }}
                  >
                    JOIN US NOW
                  </button>
                  <FavoriteIcon
                    sx={{
                      mt: "8px",
                      border: "5px solid #ccc",
                      borderRadius: "100px",
                      fontSize: "35px",
                      backgroundColor: "#ccc",
                    }}
                  />
                </div>
                <div className="my-3 text-center">
                  7-Days Trial For Free Guarantee
                </div>
                <hr className="mb-3 border-t border-gray-500 mx-auto my-4 w-full" />
                <div className={cx("course-policy")}>
                  <h6>This course include:</h6>
                  <p>
                    <CheckIcon fontSize="small" sx={{ marginRight: 1 }} />
                    Lasts 4 to 10 weeks
                  </p>
                  <p>
                    <ScheduleIcon fontSize="small" sx={{ marginRight: 1 }} />
                    Certificate of completion
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid>
            <div className={cx("course-description")}>
              <p>Description</p>
              <div className={cx("course-description-content")}>
                <span>{course.description}</span>
              </div>
            </div>
          </Grid>
        </Container>
      ) : (
        <div
          style={{
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Sorry, Something Went Wrong !
        </div>
      )}
      <Footer />
    </div>
  );
}

export default CourseDetail;
