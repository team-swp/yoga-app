import styles from "./WeeklySchedule.module.css";
import classNames from "classnames/bind";
import moment from "moment";
import yoga2 from "../../../assets/yoga2.jpg";
import { Container } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomEvent, EventWrapper, minTime, parseTime } from "./TimeUtils";
import ScheduleInfo from "./ScheduleInfo";
import useSchedule from "./ScheduleUtils";
import { useEffect, useState } from "react";

const localizer = momentLocalizer(moment);
const cx = classNames.bind(styles);

function Schedules() {
  const moment = require("moment");

  const { checkSchedule } = useSchedule();

  const [totalEvents, setTotalEvents] = useState([]);
  useEffect(() => {
    const events = [];

    for (let i = 0; i < checkSchedule.length; i++) {
      const {
        startDate,
        endDate,
        startTime,
        endTime,
        days,
        courseName,
        className,
        scheduleName,
        instructorName,
        statusSemester,
      } = checkSchedule[i];
      const start = moment(new Date(startDate));
      const end = moment(new Date(endDate));

      const startDateTime = parseTime(
        startTime,
        days,
        start.toDate(),
        end.toDate()
      );
      const endDateTime = parseTime(
        endTime,
        days,
        start.toDate(),
        end.toDate()
      );

      for (let j = 0; j < startDateTime.length && j < endDateTime.length; j++) {
        const currentStart = moment(startDateTime[j]);
        const currentEnd = moment(endDateTime[j]);
        if (
          statusSemester &&
          currentStart.isSameOrAfter(start) &&
          currentEnd.isSameOrBefore(end)
        ) {
          events.push({
            title: courseName,
            description: scheduleName,
            instructor: instructorName,
            room: className,
            start: startDateTime[j],
            end: endDateTime[j],
          });
        }
      }
    }
    setTotalEvents(events);
  }, [checkSchedule, moment]);

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
        <div>
          <h2 className="w-full text-2xl text-left font-bold mt-8 mb-6">
            WEEKLY SCHEDULE
          </h2>
          <hr className="mb-10 border-t border-gray-500 mx-auto my-4 w-full" />
        </div>
        <div>
          <ScheduleInfo totalSchedule={checkSchedule} />
        </div>
        <div className={cx("weekly-schedule")}>
          <Calendar
            localizer={localizer}
            events={totalEvents}
            step={15}
            showMultiDayTimes
            defaultView={"week"}
            views={["week"]}
            components={{
              event: CustomEvent,
              eventWrapper: EventWrapper,
            }}
            min={minTime}
          />
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Schedules;
