import styled from "@emotion/styled";

const StyledScheduleInfo = styled.div`
  padding: 16px;
  margin: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  .semester-name {
    font-weight: bold;
    margin-bottom: 8px;
    color: #0066cc;
    font-size: 20px;
  }

  .date {
    margin-bottom: 4px;
    font-size: 16px;
  }
`;
function ScheduleInfo({ totalSchedule }) {
  const scheduleInfo = totalSchedule.map((schedule) => {
    const startDate = new Date(schedule.startDate);
    const endDate = new Date(schedule.endDate);

    return {
      semesterName: schedule.semesterName,
      startDate,
      endDate,
    };
  });

  if (scheduleInfo.length > 0) {
    const firstSchedule = scheduleInfo[0];
    const startDateString = `${firstSchedule.startDate.getDate()}/${
      firstSchedule.startDate.getMonth() + 1
    }/${firstSchedule.startDate.getFullYear()}`;
    const endDateString = `${firstSchedule.endDate.getDate()}/${
      firstSchedule.endDate.getMonth() + 1
    }/${firstSchedule.endDate.getFullYear()}`;

    return (
      <StyledScheduleInfo>
        <div className="semester-name">{`Semester: ${firstSchedule.semesterName}`}</div>
        <div className="date">{`Start date: ${startDateString}`}</div>
        <div className="date">{`End date: ${endDateString}`}</div>
      </StyledScheduleInfo>
    );
  }
}

export default ScheduleInfo;
