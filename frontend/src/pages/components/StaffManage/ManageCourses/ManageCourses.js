import { Select, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Switch,
} from "@mui/material";
import "./ManageCourses.css";
import { Link } from "react-router-dom";
import { getSemester } from "../../../../helper/semesterAPI";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import StatusButton from "./StatusButton2";

import { updateCourse } from "../../../../helper/courseAPI";
function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [semesterValue, setSemesterValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  /////// update done////////////
  const handleToggle = async (event, course) => {
    try {
      const updatedCourseData = { ...course, status: event.target.checked };

      const semesterId = course.semester_id; // Lấy semester_id từ course

      // Kiểm tra trạng thái của semester dựa trên semesterId
      const semesterResponse = await getSemester();

      if (semesterResponse && semesterResponse.data) {
        const semester = semesterResponse.data.find(semester => semester._id === semesterId);

        if (!semester || semester.status === true) {
          const response = await updateCourse(updatedCourseData);
          if (response && response.data) {
            console.log(response.data.data.coursename);
            setUpdatedCourse(courses);
            const updatedCourses = courses.map(
              (courseItem) =>
                courseItem._id === response.data._id ? response.data : courseItem
            );
            setCourses(updatedCourses);

            toast.success(`${response.data.data.coursename} status updated successfully`);
          }
        } else {
          toast.error('Cannot update status. Semester status is false.');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  ////////////////////////////////////////////////
  //////// địt mẹ cấm sửa dùm nha////////////////
  useEffect(() => {
    fetchCourses();
  }, [updatedCourse, page]);
  ////////////////////////////////////////////////
  useEffect(() => {
    async function fecthSemester() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/semestersPaging/get?limit=${1000}`
        );
        const coureseData = response.data.items;
        console.log();
        setSchedule(coureseData);
      } catch (error) {
        console.log("Failed");
      }
    }
    fecthSemester();
  }, []);
  ////////////////////////////  chạy lại cái này để reset lại trang ////////////////////////////////////////////////
  async function fetchCourses2() {
    const response = await axios.get(
      `http://localhost:3001/api/coursesPaging/get?page=${page}&limit=${4}`
    );
    const coureseData = response.data.items;
    setPage(response.data.pagination.pageNum);
    setPageCount(response.data.pagination.pageCount);
    setCourses(coureseData);
  }
  ////////////////////////////// cái này thì là khi update nó k bị load lại với page////////////////////////////
  async function fetchCourses() {
    const response = await axios.get(url2);
    const coureseData = response.data.items;
    setPage(response.data.pagination.pageNum);
    setPageCount(response.data.pagination.pageCount);
    setCourses(coureseData);
  }
  /////////////////////// hàm reset này sẽ làm mới lại trang mà trả ô tìm kiếm bằng rỗng//////////////////////////////////
  const handleReset = () => {
    fetchCourses2();
    setSemesterValue("");
    setValue("");
    setStatusValue("");
  };
  var url2 = null;
  if (value !== "" && semesterValue !== "" && statusValue !== "") {
    url2 = `http://localhost:3001/api/coursesPaging/get?page=${page}&limit=${4}&q=${value}&semester_id=${semesterValue}&status=${statusValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue === "") {
    url2 = `http://localhost:3001/api/coursesPaging/get?page=${page}&limit=${4}&q=${value}`;
  } else if (value === "" && semesterValue !== "" && statusValue === "") {
    url2 = `http://localhost:3001/api/coursesPaging/get?page=${page}&limit=${4}&semester_id=${semesterValue}`;
  } else if (value === "" && semesterValue === "" && statusValue !== "") {
    url2 = `http://localhost:3001/api/coursesPaging/get?page=${page}&limit=${4}&status=${statusValue}`;
  } else if (value !== "" && semesterValue !== "" && statusValue === "") {
    url2 = `http://localhost:3001/api/coursesPaging/get?page=${page}&limit=${4}&q=${value}&semester_id=${semesterValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue !== "") {
    url2 = `http://localhost:3001/api/coursesPaging/get?page=${page}&limit=${4}&q=${value}&status=${statusValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue !== "") {
    url2 = `http://localhost:3001/api/coursesPaging/get?page=${page}&limit=${4}&q=${value}&status=${statusValue}`;
  } else if (value === "" && semesterValue !== "" && statusValue !== "") {
    url2 = `http://localhost:3001/api/coursesPaging/get?page=${page}&limit=${4}&semester_id=${semesterValue}&status=${statusValue}`;
  } else {
    url2 = `http://localhost:3001/api/coursesPaging/get?page=${page}&limit=${4}`;
  }

  var url = null;
  if (value !== "" && semesterValue !== "" && statusValue !== "") {
    url = `http://localhost:3001/api/coursesPaging/get?page=${1}&limit=${4}&q=${value}&semester_id=${semesterValue}&status=${statusValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue === "") {
    url = `http://localhost:3001/api/coursesPaging/get?page=${1}&limit=${4}&q=${value}`;
  } else if (value === "" && semesterValue !== "" && statusValue === "") {
    url = `http://localhost:3001/api/coursesPaging/get?page=${1}&limit=${4}&semester_id=${semesterValue}`;
  } else if (value === "" && semesterValue === "" && statusValue !== "") {
    url = `http://localhost:3001/api/coursesPaging/get?page=${1}&limit=${4}&status=${statusValue}`;
  } else if (value !== "" && semesterValue !== "" && statusValue === "") {
    url = `http://localhost:3001/api/coursesPaging/get?page=${1}&limit=${4}&q=${value}&semester_id=${semesterValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue !== "") {
    url = `http://localhost:3001/api/coursesPaging/get?page=${1}&limit=${4}&q=${value}&status=${statusValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue !== "") {
    url = `http://localhost:3001/api/coursesPaging/get?page=${1}&limit=${4}&q=${value}&status=${statusValue}`;
  } else if (value === "" && semesterValue !== "" && statusValue !== "") {
    url = `http://localhost:3001/api/coursesPaging/get?page=${1}&limit=${4}&semester_id=${semesterValue}&status=${statusValue}`;
  } else {
    url = `http://localhost:3001/api/coursesPaging/get?page=${1}&limit=${4}&q=${value}&semester_id=${semesterValue}&status=${statusValue}`;
  }
  ///////////////////// đây là hàm search tìm kiếm///////////////////////////////////////////////
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(url);
      const semesterData = response.data.items;
      console.log(response.data);
      setPage(response.data.pagination.pageNum);
      setPageCount(response.data.pagination.pageCount);
      setCourses(semesterData);
    } catch (error) {
      toast.error("Please try agian !!!");
    }
  };
  /////////////////// handle việc next và prev trong page/////////////////////////
  const handlePageChange = (page) => {
    setPage(page);
  };
  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return parseInt(p) + 1;
    });
  }
  const startIndex = (page - 1) * 4;
  const endIndex = startIndex + 4;
  //////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <Container>
        <Toaster position="top-center" reverseOrder={false} />
        <TableContainer component={Paper}>
          <div
            style={{ float: "right", marginTop: "40px", marginRight: "10px" }}
          >
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/addnewcourse"
            >
              Add new course
            </Button>
          </div>
          <form onSubmit={handleSearch}>
            <div
              style={{
                marginTop: '10px',
                maxWidth: "800px",
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <input
                autoFocus
                style={{ marginLeft: '10px', marginRight: '10px' }}
                type="text"
                variant="outlined"
                placeholder="Search by  name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="border-solid border-2 border-black p-2"
              />
              <p style={{ fontWeight: "normal", fontSize: "13px" }}>
                Select Semester :
              </p>
              <Select
                value={semesterValue}
                onChange={(e) => setSemesterValue(e.target.value)}
                style={{ marginLeft: "1rem", marginRight: "1rem" }}
              >
                <MenuItem value="">All Semesters</MenuItem>
                {schedule.map((semester, index) => (
                  <MenuItem key={index} value={semester._id}>
                    {semester.semestername}
                  </MenuItem>
                ))}
              </Select>

              <>
                <p
                  style={{
                    fontWeight: "normal",
                    fontSize: "13px",

                  }}
                >
                  Select Status :
                </p>
              </>
              <Select
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
                style={{ marginLeft: "1rem", marginRight: "1rem" }}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="true">Enabled</MenuItem>
                <MenuItem value="false">Disabled</MenuItem>
              </Select>
            </div>
            <div
              style={{
                marginLeft: "10px",
                marginBottom: "10px",
                maxWidth: "500px",
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ display: "block" }}
              >
                Search
              </Button>
              <Button
                style={{ marginLeft: "1rem" }}
                variant="outlined"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </form>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>ID</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Course Name
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Price</TableCell>
                <TableCell style={{ textAlign: "center" }}>Semester</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Disable/Enable{" "}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Status </TableCell>
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    style={{ fontSize: "30px" }}
                  >
                    No courses available !!!
                  </TableCell>
                </TableRow>
              ) : (
                courses.map((courseItem, index) => {
                  const semester = schedule.find(
                    (item2) => item2._id === courseItem.semester_id
                  );
                  return (
                    <TableRow key={index}>
                      <TableCell style={{ textAlign: "center" }}>
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {courseItem.coursename}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {courseItem.price}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {semester ? semester.semestername : "N/A"}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Switch
                          checked={courseItem.status}
                          onChange={(event) => handleToggle(event, courseItem)}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <StatusButton status={courseItem.status} />
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          color="warning"
                          component={Link}
                          to={`/updatecourse/${courseItem._id}`}
                          style={{ fontSize: "10px" }}
                        >
                          Update & Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination gap-7" style={{ marginTop: "10px" }}>
          <Button
            disabled={page === 1}
            onClick={handlePrevious}
            style={{
              marginRight: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              backgroundColor: "#ccc",
              cursor: "pointer",
            }}
          >
            Previous
          </Button>

          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`page-button ${page === page ? "active" : ""}`}
              >
                {page}
              </button>
            )
          )}
          <Button
            className="next-button border"
            onClick={handleNext}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              backgroundColor: "#ccc",
              cursor: "pointer",
            }}
          >
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default ManageCourses;