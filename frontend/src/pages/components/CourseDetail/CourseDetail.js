import { useNavigate, useParams } from "react-router-dom";
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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { getCourse } from "../../../helper/courseAPI";
import { getClass } from "../../../helper/classAPI";
import { getSchedule } from "../../../helper/scheduleAPI";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors";
import { addBooking } from "../../../helper/bookingAPI";

const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CourseDetail() {
  //courseAPI
  const [course, setCourse] = useState(null);
  const [classList, setClassList] = useState([]);
  const courseId = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCourse();
        const course = response.data.find((obj) => obj._id === courseId.id);
        const classList = await getClass();
        const classes = classList.data.filter(
          (obj) => obj.course_id === course._id
        );
        setClassList(classes);
        setCourse(course);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const user = useSelector(userSelector);

  //   //scheduleAPI
  //   // const [scheduleList, setScheduleList] = useState([]);
  //   // useEffect(() => {
  //   //   async function fetchData() {
  //   //     try {
  //   //       const response = await getSchedule();
  //   //       setScheduleList(response.data);
  //   //     } catch (error) {
  //   //       console.log(error);
  //   //     }
  //   //   }
  //   //   fetchData();
  //   // }, []);

  //   // const classesWithSchedule = classes.map((classObj) => {
  //   //   const matchingSchedule = scheduleList.find(
  //   //     (schedule) => schedule._id === classObj.schedule_id
  //   //   );
  //   //   if (matchingSchedule) {
  //   //     return {
  //   //       ...classObj,
  //   //       schedules: [matchingSchedule],
  //   //     };
  //   //   } else {
  //   //     return { ...classObj, schedules: [] };
  //   //   }
  //   // });
  //   // console.log(classesWithSchedule);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const token = localStorage.getItem("token");

  const [selectedClass, setSelectedClass] = useState(null);

  const handleSubmit = async () => {
    const booking = {
      // member_id: user._id,
      class_id: selectedClass,
    };
    try {
      const response = await addBooking(booking);
      console.log(response);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <ScrollToTopOnMount />
      <Header />
      <div class="bg-gray-400">
        <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
          <h1 class="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
            START YOUR TRAINING JOURNEY
          </h1>
        </div>
      </div>
      {course && (
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
            <Grid item md={5}>
              <div className={cx("course-wrapper")}>
                <div className={cx("course-container")}>
                  <div className={cx("course-image")}>
                    <img src={course.images[0]} alt={course.coursename} />
                  </div>
                  <p className={cx("course-price")}>{course.price}$</p>
                  <div class="flex justify-evenly align-center">
                    <button
                      className={cx("course-button")}
                      onClick={handleOpen}
                    >
                      JOIN US NOW
                    </button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <div className={cx("close")} onClick={handleClose}>
                          &times;
                        </div>
                        <label className={cx("popup-lable")} for="class-select">
                          Choose class:
                        </label>
                        <select
                          className={cx("popup-select")}
                          name="class"
                          id="class-select"
                          onChange={(event) =>
                            setSelectedClass(event.target.value)
                          }
                        >
                          {classList.map((classObj) => (
                            <option key={classObj._id} value={classObj._id}>
                              {classObj.classname}
                            </option>
                          ))}
                        </select>
                        <button
                          className={cx("popup-button")}
                          onClick={() => {
                            if (token) {
                              handleSubmit();
                            } else {
                              navigate("/login");
                            }
                          }}
                        >
                          Submit
                        </button>
                      </Box>
                    </Modal>
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
                  <div class="my-3 text-center">
                    30-Day Money-Back Guarantee
                  </div>
                  <hr class="mb-3 border-t border-gray-500 mx-auto my-4 w-full" />
                  <div className={cx("course-policy")}>
                    <h6>This course include:</h6>
                    <p>
                      <CheckIcon fontSize="small" sx={{ marginRight: 1 }} />
                      Lasts 4 to 8 weeks
                    </p>
                    <p>
                      <ScheduleIcon fontSize="small" sx={{ marginRight: 1 }} />
                      Certificate of completion
                    </p>
                  </div>
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
      )}
      <Footer />
    </div>
  );
}

export default CourseDetail;
