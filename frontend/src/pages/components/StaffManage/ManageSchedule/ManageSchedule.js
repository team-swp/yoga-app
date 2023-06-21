import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./ManageSchedule.css";
import classNames from "classnames/bind";
import Navigation from "../../Header/Navigation/Navigation";

const cx = classNames.bind(styles);

function ManageSchedule() {
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    async function fecthScheduleList() {
      try {
        const requestUrl = "http://localhost:3001/api/schedule/get";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);
        setScheduleList(responseJSON);
      } catch (error) {
        console.log("Failed");
      }
    }
    fecthScheduleList();
  }, []);

  return (
    <div>
      <Navigation/>
      <Container style={{marginTop:'5%'}}>
        <div className={cx("text-end")}>
          <Link to="/addnewschedule" className={cx("btn btn-primary")}>
            Add new Schedule
          </Link>
        </div>
        <table className="container">
          <thead>
            <tr>
              <td>Schedule Name</td>
              <td>Start Time</td>
              <td>End Time</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {scheduleList.map((scheduleItem, index) => (
              <tr key={index}>
                <td>{scheduleItem.schedulename}</td>
                <td>{scheduleItem.startTime}</td>
                <td>{scheduleItem.endTime}</td>
                <td>{scheduleItem.status ? "Active" : "Inactive"}</td>
                <Link
                  to={`/updateschedule/${scheduleItem._id}`}
                  className={cx("btn btn-secondary")}
                >
                  Update
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
}

export default ManageSchedule;
