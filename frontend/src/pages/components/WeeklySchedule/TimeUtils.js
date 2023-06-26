export function parseTime(timeStr, days, startDate, endDate) {
  const [hourMinuteStr, amPmStr] = timeStr.split(" ");
  const [hour, minute] = hourMinuteStr.split(":");
  let dayOfWeek = startDate.getDay();

  const daysInWeek = 7;
  let targetDays;

  if (days && days.length > 0) {
    var days = days.map((day) => day.toLowerCase());
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
  return (
    <div>
      <strong style={{ fontSize: "15px" }}>{event.title}</strong>
      <p style={{ marginTop: "5px", fontSize: "16px" }}>{event.room}</p>
      <p style={{ marginTop: "5px", fontSize: "12px" }}>{event.description}</p>
    </div>
  );
}

export function EventWrapper({ children, event }) {
  return <div style={{ backgroundColor: event.color }}>{children}</div>;
}
