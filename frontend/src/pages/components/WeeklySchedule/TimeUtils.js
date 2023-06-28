import { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import useSchedule from "./ScheduleUtils";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

let lastParsedDayOfWeek = -1; // initialize to an impossible value
const localizer = momentLocalizer(moment);

export function parseTime(timeStr, days, startDate, endDate) {
  const [hourMinuteStr, amPmStr] = timeStr.split(" ");
  const [hour, minute] = hourMinuteStr.split(":");
  let dayOfWeek = startDate.getDay();

  // update lastParsedDayOfWeek
  if (startDate < new Date()) {
    lastParsedDayOfWeek = startDate.getDay();
  }

  const daysInWeek = 7;
  let targetDays;

  if (days && days.length > 0) {
    days = days.map((day) => day.toLowerCase());
    const matchingDays = [];

    let i = 1;
    while (matchingDays.length < days.length) {
      const index = (dayOfWeek + i) % daysInWeek;
      if (days.includes(getDayName(index))) {
        matchingDays.push(index);
      }
      i++;
    }

    targetDays = matchingDays;
  }

  const parsedTimes = [];

  // loop through each day between startDate and endDate
  let currentDate = new Date(startDate.getTime()); // create a copy of startDate
  while (currentDate <= endDate) {
    // check if the current day matches any of the target days
    if (!targetDays || targetDays.includes(currentDate.getDay())) {
      let parsedTime = parseInt(hour);
      if (amPmStr === "PM" && hour !== "12") {
        parsedTime += 12;
      } else if (amPmStr === "AM" && hour === "12") {
        parsedTime = 0;
      }
      currentDate.setHours(parsedTime, parseInt(minute), 0, 0);
      parsedTimes.push(new Date(currentDate.getTime())); // create a copy of currentDate
    }
    // move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return parsedTimes;
}

export function getDayName(dayIndex) {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[dayIndex].toLowerCase();
}

export function getNextDates(dayIndices) {
  const today = new Date();
  const daysInWeek = 7;
  const nextDates = dayIndices.map((dayIndex) => {
    const diff = (dayIndex - today.getDay() + daysInWeek) % daysInWeek;
    const nextDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + diff
    );
    return nextDate;
  });
  return nextDates;
}

export const today = new Date();

export const minTime = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  7,
  0,
  0
); // Giờ bắt đầu là 7h sáng

export function CustomEvent({ event }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setSelectedDate(event.start);
    setOpen(true);
  };

  return (
    <div>
      <strong style={{ fontSize: "15px" }}>{event.title}</strong>
      <p style={{ marginTop: "5px", fontSize: "16px" }}>{event.room}</p>
      <p style={{ marginTop: "5px", fontSize: "12px" }}>{event.description}</p>
      <p style={{ marginTop: "5px", fontSize: "12px" }}>{event.instructor}</p>
      <button
        style={{ marginTop: "5px", fontSize: "12px" }}
        onClick={handleOpen}
      >
        View more...
      </button>
      {open && (
        <KeepMountedModal
          selectedDate={selectedDate}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export function CustomEventforModal({ event }) {
  return (
    <div>
      <strong style={{ fontSize: "15px" }}>{event.title}</strong>
      <p style={{ marginTop: "5px", fontSize: "16px" }}>{event.room}</p>
      <p style={{ marginTop: "5px", fontSize: "12px" }}>{event.description}</p>
      <p style={{ marginTop: "5px", fontSize: "12px" }}>{event.instructor}</p>
    </div>
  );
}

export function EventWrapper({ children, event }) {
  return <div style={{ backgroundColor: event.color }}>{children}</div>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal({ onClose, selectedDate }) {
  const moment = require("moment");
  const { totalSchedule } = useSchedule();

  const [totalEvents, setTotalEvents] = useState([]);

  useEffect(() => {
    const events = [];

    for (let i = 0; i < totalSchedule.length; i++) {
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
      } = totalSchedule[i];
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
  }, [totalSchedule, moment]);
  return (
    <div>
      <Modal
        keepMounted
        open={true}
        onClose={onClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div style={{ height: "500px" }}>
            <Calendar
              localizer={localizer}
              events={totalEvents}
              step={15}
              showMultiDayTimes
              defaultView={"day"}
              views={["day"]}
              components={{
                event: CustomEventforModal,
                eventWrapper: EventWrapper,
              }}
              min={minTime}
              defaultDate={selectedDate}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
