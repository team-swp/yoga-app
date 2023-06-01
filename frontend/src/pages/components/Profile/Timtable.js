import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import yoga2 from "../../../assets/yoga2.jpg";
import styles from "./Timetable.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Timetable() {
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
      <Footer />
    </div>
  );
}

export default Timetable;
