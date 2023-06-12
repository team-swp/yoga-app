import { useState, useEffect } from "react";
import styles from "./WeeklySchedule.module.css";
import classNames from "classnames/bind";
import moment from 'moment'
import yoga2 from "../../../assets/yoga2.jpg";
import { Container } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getCourse } from "../../../helper/courseAPI";
import { getClass } from "../../../helper/classAPI";
import { getSchedule } from "../../../helper/scheduleAPI";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const cx = classNames.bind(styles);

function WeeklyTimetable() {
  function parseTime(timeStr) {
    const [hourMinuteStr, amPmStr] = timeStr.split(" ");
    const [hour, minute] = hourMinuteStr.split(":");
    const currentDate = new Date();
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    let parsedTime = parseInt(hour);
    if (amPmStr === "PM") {
      parsedTime += 12;
    }
    date.setHours(parsedTime, parseInt(minute), 0, 0);
    return date;
  }

  const [courseList, setCourseList] = useState([]);
  const [classList, setClassList] = useState([]);
  console.log(courseList);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getCourse();
        const classResponse = await getClass();
        const scheduleResponse = await getSchedule();

        const updatedCourseList = response.data.map((course) => ({
          id: course._id,
          coursename: course.coursename,
          classes: [],
        }));
        const newClassList = classResponse.data.map((classItem) => {
          const scheduleList = scheduleResponse.data.filter(
            (scheduleItem) => classItem.schedule_id === scheduleItem._id
          );
          console.log(scheduleList);
          const newClassItem = {
            id: classItem._id,
            name: classItem.classname,
            course_id: classItem.course_id,
            schedules: [],
          };

          scheduleList.forEach((scheduleItem) => {
            // Lấy ngày của scheduleItem
            const days = scheduleItem.days;
            // Nếu day không phải mảng, thì chuyển thành mảng
            if (!Array.isArray(days)) {
              scheduleItem.days = [days];
            }
            // Tìm kiếm xem có scheduleItem khác cùng lớp học và cùng ngày không.
            const otherScheduleItems = scheduleList.filter(
              (item) => item._id !== scheduleItem._id && item.days === days
            );

            // Nếu có thì đưa ngày đó vào thuộc tính days của scheduleItem

            if (otherScheduleItems.length > 0) {
              otherScheduleItems.forEach((otherItem) => {
                scheduleItem.days.push(otherItem.days);
              });
            }

            newClassItem.schedules.push(scheduleItem);
          });

          return newClassItem;
        });

        updatedCourseList.forEach((course) => {
          const classListForCourse = newClassList.filter(
            (classItem) => classItem.course_id === course.id
          );
          course.classes = classListForCourse;
        });

        setClassList(newClassList);
        setCourseList(updatedCourseList);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const weeklySchedule = [];

  courseList.forEach((course) => {
    course.classes.forEach((classItem) => {
      classItem.schedules.forEach((scheduleItem) => {
        const startTime = parseTime(scheduleItem.startTime);
        const endTime = parseTime(scheduleItem.endTime);
        scheduleItem.days.forEach((day) => {
          weeklySchedule.push({
            day: day,
            startTime: startTime,
            endTime: endTime,
            className: classItem.name,
            courseName: course.coursename,
          });
        });
      });
    });
  });

  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");

  const events = [];
  for (
    let date = startOfWeek.clone();
    date.isBefore(endOfWeek);
    date.add(1, "days")
  ) {
    const dayEvents = weeklySchedule.filter((event) => {
      return moment(event.day, "dddd").isSame(date, "day");
    });

    dayEvents.forEach((event) => {
      const eventDate = date.clone().set({
        hour: event.startTime.getHours(),
        minute: event.startTime.getMinutes(),
      });

      events.push({
        start: eventDate.toDate(),
        end: eventDate
          .clone()
          .add({
            hours: event.endTime.getHours() - event.startTime.getHours(),
            minutes: event.endTime.getMinutes() - event.startTime.getMinutes(),
          })
          .toDate(),
        title: event.courseName,
      });
    });
  }

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
            WEEKLY SCHEDULE
          </h2>
          <hr class="mb-10 border-t border-gray-500 mx-auto my-4 w-full" />
        </div>
        <div className={cx("weekly-schedule")}>
          <Calendar
            localizer={localizer}
            events={events}
            showMultiDayTimes
            defaultView={"week"}
            views={["day", "week"]}
          />
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default WeeklyTimetable;
