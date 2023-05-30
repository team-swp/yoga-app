import { useParams } from "react-router-dom";
import styles from "./CourseDetail.module.css";
import classNames from "classnames/bind";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { itemData3 } from "../Courses/CoursesList";
import { Container, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckIcon from "@mui/icons-material/Check";
import ScrollToTopOnMount from "../../ScrollToTopOnMount";

const cx = classNames.bind(styles);

function CourseDetail() {
  const courseName = useParams();
  const course = itemData3.find((obj) => {
    return obj.id === courseName.id;
  });

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
      <Container>
        <h1 className={cx("course-header")}>{course.title}</h1>
        <Grid container spacing={2}>
          <Grid item md={7}>
            <div className={cx("course-learn")}>
              <p>What you will learn ?</p>
              <ul className={cx("course-learn-list")}>
                <li>
                  <CheckIcon fontSize="small" sx={{ marginRight: 1 }} /> Ea
                  exercitation occaecat sint proident fugiat ut nostrud aute eu
                  sint ut laboris ut.
                </li>
                <li>
                  <CheckIcon fontSize="small" sx={{ marginRight: 1 }} /> Ullamco
                  irure voluptate adipisicing laboris adipisicing.
                </li>
                <li>
                  <CheckIcon fontSize="small" sx={{ marginRight: 1 }} />{" "}
                  Pariatur cupidatat quis fugiat irure culpa occaecat.
                </li>
                <li>
                  <CheckIcon fontSize="small" sx={{ marginRight: 1 }} />{" "}
                  Occaecat nisi sunt adipisicing adipisicing sit pariatur ea
                  anim reprehenderit.
                </li>
                <li>
                  <CheckIcon fontSize="small" sx={{ marginRight: 1 }} />
                  Aliqua eiusmod excepteur tempor nisi ea.
                </li>
              </ul>
            </div>
            <div className={cx("course-requirement")}>
              <p>Requirement </p>
              <ul className={cx("course-requirement-list")}>
                <li>
                  Ea exercitation occaecat sint proident fugiat ut nostrud aute
                  eu sint ut laboris ut.
                </li>
                <li>
                  Ullamco irure voluptate adipisicing laboris adipisicing.
                </li>
                <li> Pariatur cupidatat quis fugiat irure culpa occaecat.</li>
              </ul>
            </div>
          </Grid>
          <Grid item md={5}>
            <div className={cx("course-container")}>
              <div className={cx("course-image")}>
                <img src={course.img} alt={course.title} />
              </div>
              <p className={cx("course-price")}>{course.price}$</p>
              <div class="flex justify-evenly align-center">
                <button className={cx("course-button")}>
                  <p>JOIN US NOW</p>
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
              <div class="my-3 text-center">30-Day Money-Back Guarantee</div>
              <hr class="mb-3 border-t border-gray-500 mx-auto my-4 w-full" />
              <div className={cx("course-policy")}>
                <h6>This course include:</h6>
                <p>
                  <CheckIcon fontSize="small" sx={{ marginRight: 1 }} />
                  {course.time}
                </p>
                <p>
                  <ScheduleIcon fontSize="small" sx={{ marginRight: 1 }} />
                  Certificate of completion
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid md={12}>
          <div className={cx("course-description")}>
            <p>Description</p>
            <div className={cx("course-description-content")}>
              <span>
                {course.desc}. Proident reprehenderit cillum elit mollit magna
                irure non aute quis. Eiusmod aute amet qui laboris. Dolor
                laborum in consequat consectetur. Incididunt ullamco ullamco
                occaecat incididunt nisi tempor velit duis commodo culpa minim
                labore dolore.
              </span>
            </div>
          </div>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default CourseDetail;
