import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import styles from "./ManageSemester.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ManageSemester() {
  const [semesterList, setSemesterList] = useState([]);

<<<<<<< HEAD
    const [semesterList, setSemesterList] = useState([])
    const [query, setQuery] = useState("")

=======
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
>>>>>>> f84de0755a1dc8d3941db51ef52370bdf17d748f

  return (
    <div>
      <Container>
        <div className={cx("text-end")}>
          <Link to="/addnewsemester" className={cx("btn btn-primary")}>
            Add new Semester
          </Link>
        </div>
<<<<<<< HEAD
        <Container>
            <div className={cx("text-end")}><Link to="/addnewsemester" className={cx("btn btn-primary")}>Add new Semester</Link></div>
            <div className="searchfilter">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search"
                    onChange={(e) => setQuery(e.target.value)}
                />
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
                    {semesterList.filter((classItem) => {
                        return (
                            classItem.semestername.toLowerCase().includes(query)
                        );
                    }).map((semesterItem, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{semesterItem.semestername}</td>
                            <td>{semesterItem.startDate}</td>
                            <td>{semesterItem.endDate}</td>
                            <td>{semesterItem.status ? 'Enable' : 'Disable'}</td>
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
        <Footer />
    </div>
    );
=======
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
                  to={`//${semesterItem._id}`}
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
>>>>>>> f84de0755a1dc8d3941db51ef52370bdf17d748f
}

export default ManageSemester;
