import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./ManageSemester.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ManageSemester() {
  const [semesterList, setSemesterList] = useState([]);

  useEffect(() => {
    async function fecthSemesterList() {
      try {
        const requestUrl = "http://localhost:3001/api/semester/get";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setSemesterList(responseJSON);
      } catch (error) {
        console.log("Failed");
      }
    }
    fecthSemesterList();
  }, []);

  return (
    <div>
      <Container>
        <div className={cx("text-end")}>
          <Link to="/addnewsemester" className={cx("btn btn-primary")}>
            Add new Semester
          </Link>
        </div>
        <table className="container">
          <thead>
            <tr>
              <td>Semester ID</td>
              <td>Semester Name</td>
              <td>Start Date</td>
              <td>End Date</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {semesterList.map((semesterItem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{semesterItem.semestername}</td>
                <td>{semesterItem.startDate}</td>
                <td>{semesterItem.endDate}</td>
                <td>{semesterItem.status ? "Active" : "Inactive"}</td>
                <Link
                  to={`/updatesemester/${semesterItem._id}`}
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

export default ManageSemester;
