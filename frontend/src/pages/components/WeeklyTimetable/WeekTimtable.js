import { useState, useRef, useEffect } from "react";
import styles from "./WeeklyTimetable.module.css";
import classNames from "classnames/bind";
import yoga2 from "../../../assets/yoga2.jpg";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { userSelector } from "../../../redux/selectors";
import { getBooking } from "../../../helper/bookingAPI";
import { getSchedule } from "../../../helper/scheduleAPI";

const cx = classNames.bind(styles);

function WeeklyTimetable() {
  const user = useSelector(userSelector);

  const [bookList, setBookList] = useState([]);
  const [filteredBook, setFilteredBook] = useState(null);
  const [matchingSchedule, setMatchingSchedule] = useState(null);

  console.log(user);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getBooking();
        const filteredBook = response.data.find(
          (book) => book.member_id === user._id
        );
        if (filteredBook) {
          setFilteredBook(filteredBook);

          const schedulesResponse = await getSchedule();
          const matchingSchedule = schedulesResponse.data.find(
            (schedule) => schedule.id === filteredBook.id
          );

          if (matchingSchedule) {
            setMatchingSchedule(matchingSchedule);
          }
        }

        setBookList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [user._id]);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const weeklySchedule = [];

  const today = new Date();

  const todayString = `${today.getMonth() + 1}/${today.getDate()}`;

  if (matchingSchedule) {
    daysOfWeek.forEach((day) => {
      if (matchingSchedule.days.includes(day)) {
        const scheduleItem = {
          day,
          name: matchingSchedule.schedulename,
          startTime: matchingSchedule.startTime,
          endTime: matchingSchedule.endTime,
        };
        weeklySchedule.push(scheduleItem);
      }
    });
  }

  const scheduleByDay = daysOfWeek.map((day) =>
    weeklySchedule.reduce((acc, item) => {
      if (item.day === day) {
        acc.push(item);
      }
      return acc;
    }, [])
  );
  console.log(scheduleByDay);

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
        <div>
          <h2 class="w-full text-2xl text-left font-bold mt-8 mb-6">
            WEEKLY TIMETABLE
          </h2>
          <hr class="mb-10 border-t border-gray-500 mx-auto my-4 w-full" />
          <table className={cx("week-table")}>
            <thead className={cx("week-table--head")}>
              <tr>
                {daysOfWeek.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklySchedule.map((item) => (
                <tr key={item.day}>
                  {daysOfWeek.map((day) => (
                    <td
                      key={`${item.day}-${day}`}
                      className={cx("week-table--body")}
                    >
                      {item.day === day && item.name}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default WeeklyTimetable;
