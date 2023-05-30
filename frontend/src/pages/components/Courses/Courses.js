import { Container } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Courses.module.css";
import { itemData3 } from "./CoursesList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import yoga2 from "../../../assets/yoga2.jpg";
import Calendar from "react-calendar";

const cx = classNames.bind(styles);

function Courses() {
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: "-100px",
  });

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
          {itemData3.map((item) => (
            <div className={cx("courses-items")} key={item.id}>
              <Link to={`/course/${item.id}`}>
                <div className={cx("courses-image")}>
                  <img src={item.img} alt={item.title} />
                </div>
              </Link>
              <h6 className={cx("courses-title")}>{item.title}</h6>
              <p className={cx("courses-price")}>${item.price}</p>
            </div>
          ))}
        </div>

        <div>
          <Calendar className={cx("react-calendar")} />
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Courses;
