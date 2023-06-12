import styled from "@emotion/styled";

const StyledScheduleInfo = styled.div`
  padding: 16px;
  margin: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  h6 {
    margin-bottom: 8px;
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
        <h6>{`Semester: ${firstSchedule.semesterName}`}</h6>
        <p>{`Start date: ${startDateString}`}</p>
        <p>{`End date: ${endDateString}`}</p>
      </StyledScheduleInfo>
    );
  } else {
    return <div>No schedule available</div>;
  }
}

export default ScheduleInfo;
