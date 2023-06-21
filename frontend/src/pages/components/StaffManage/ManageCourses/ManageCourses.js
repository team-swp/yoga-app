<<<<<<< HEAD
=======
import { Select, MenuItem, TextField } from "@mui/material";
>>>>>>> ee8ce9dc7f024fddcf3d30f62591c915cc0e07ae
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
<<<<<<< HEAD
  Radio,
=======
>>>>>>> ee8ce9dc7f024fddcf3d30f62591c915cc0e07ae
} from "@mui/material";
import "./ManageCourses.css";
import { Link } from "react-router-dom";

import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import StatusButton from "./StatusButton2";

import { updateCourse } from "../../../../helper/courseAPI";
function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [updatedCourse, setUpdatedCourse] = useState({});
<<<<<<< HEAD
  const [totalCourse, setTotalCourse] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [statusFilter, setStatusFilter] = useState("both");
  const [courseList, setcourseList] = useState([]);

  //thay đổi status//////////////////////////////////////

=======
  const [schedule, setSchedule] = useState([]);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [semesterValue, setSemesterValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  /////// update done////////////
>>>>>>> ee8ce9dc7f024fddcf3d30f62591c915cc0e07ae
  const handleToggle = async (event, course) => {
    try {
      const updatedCourseData = { ...course, status: event.target.checked };
      const response = await updateCourse(updatedCourseData);
      if (response && response.data) {
        console.log(response.data.data.coursename);
        setUpdatedCourse(courses);
        const updatedCourses = courses.map(
          (courseItem) =>
            courseItem._id === response.data._id ? response.data : courseItem,
          toast.success(
            `${response.data.data.coursename} status updated success`
          )
        );
        setCourses(updatedCourses);
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
<<<<<<< HEAD
  //////////////////////////////////////////////////
  //Search
  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  //Search
  const handleSearch = () => {
    if (searchKeyword.trim() === "") {
      return;
    }
    const filteredCourses = courseList.filter(
      (course) =>
        course.coursename.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        course.price
          .toString()
          .toLowerCase()
          .includes(searchKeyword.toLowerCase()) ||
        (course.status ? "Enabled" : "Disabled").toLowerCase() ===
          searchKeyword.toLowerCase()
    );
    setSearchResults(filteredCourses);
    // Kiểm tra nếu không có kết quả tìm kiếm
    if (filteredCourses.length === 0) {
      toast.error("Can not found!");
    } else {
    }
  };

  // dùng effect để chạy search
  useEffect(() => {
    if (searchKeyword === "") {
      setSearchResults([]);
    }
  }, [searchKeyword]);
  ///////////////////////////////////////////////////

  useEffect(() => {
    async function fetchSemesters() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/coursesPaging/get"
        );
        const semesterData = response.data.items;
        console.log(response.data);
        setcourseList(semesterData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSemesters();
  }, [updatedCourse]);

  // chạy để lấy dữ liệu course
  useEffect(() => {
    fetchCourses();
  }, [updatedCourse, courseList, currentPage]);

  useEffect(() => {
    async function fecthScheduleList() {
      try {
        const requestUrl = "http://localhost:3001/api/semester/get";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);
        setSchedule(responseJSON);
        console.log(schedule);
      } catch (error) {
        console.log("Failed");
      }
    }
    fecthScheduleList();
  }, []);

  //////////////////////// pagination

  async function fetchCourses() {
    const requestUrl = `http://localhost:3001/api/coursespaging/get?page=${currentPage}&limit=${perPage}&status=${statusFilter}`;
    const response = await fetch(requestUrl);
    const responseJSON = await response.json();
    const { items } = responseJSON;
    const { pagination } = responseJSON;
    setTotalPage(pagination.pageCount);
    setCourses(items);
    setTotalCourse(pagination.count);
    setPage(pagination.pageNum);
  }
=======
  //////////////////////////////////////////////////////////////////////////////////////
>>>>>>> ee8ce9dc7f024fddcf3d30f62591c915cc0e07ae

  return (
    <div>
      <Container>
        <Toaster position="top-center" reverseOrder={false} />
<<<<<<< HEAD
        <div style={{ float: "right", marginTop: "15px" }}>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/addnewcourse"
          >
            Add new course
          </Button>
        </div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            label="..."
            variant="outlined"
            value={searchKeyword}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {searchKeyword && (
                    <IconButton
                      onClick={() => setSearchKeyword("")}
                      style={{
                        marginTop: "5px",
                        padding: 0,
                        color: "gray",
                        fontSize: "20px",
                      }}
                    >
                      clear
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            style={{ marginRight: "8px" }}
          />
          <Button
            variant="contained"
            color="info"
            onClick={handleSearch}
            style={{ marginLeft: "8px" }}
          >
            Search
          </Button>
        </div>
=======
>>>>>>> ee8ce9dc7f024fddcf3d30f62591c915cc0e07ae
        <TableContainer component={Paper}>
          <div
            style={{ float: "right", marginTop: "15px", marginRight: "10px" }}
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
          <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "800px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onSubmit={handleSearch}
          >
            <TextField
              type="text"
              variant="outlined"
              placeholder="Search course name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ marginRight: "1rem" }}
            />

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
            <p style={{ fontWeight: "normal", fontSize: "13px" }}>
              Select Semester
            </p>

            <Select
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
              style={{ marginLeft: "1rem", marginRight: "1rem" }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="true">Enabled</MenuItem>
              <MenuItem value="false">Disabled</MenuItem>
            </Select>
            <>
              <p style={{ fontWeight: "normal", fontSize: "13px" }}>
                Select Status
              </p>
            </>
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
            <Button
              style={{ marginLeft: "1rem" }}
              variant="outlined"
              onClick={handleReset}
            >
              Reset
            </Button>
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
<<<<<<< HEAD
              {(searchResults.length > 0 ? searchResults : courses).map(
                (courseItem, index) => {
=======
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
>>>>>>> ee8ce9dc7f024fddcf3d30f62591c915cc0e07ae
                  const semester = schedule.find(
                    (item2) => item2._id === courseItem.semester_id
                  );
                  return (
                    <TableRow key={index}>
<<<<<<< HEAD
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{courseItem.coursename}</TableCell>
                      <TableCell>{courseItem.price}</TableCell>
                      <TableCell>
                        {semester ? semester.semestername : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={courseItem.status}
                          onChange={(event) => handleToggle(event, courseItem)}
                          color={courseItem.status ? "error" : "error"}
                        />
                      </TableCell>
                      <TableCell>
=======
                      <TableCell style={{ textAlign: "center" }}>
                        {index + 1}
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
                          color={courseItem.status ? "success" : "error"}
                        />
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <StatusButton status={courseItem.status} />
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
>>>>>>> ee8ce9dc7f024fddcf3d30f62591c915cc0e07ae
                        <Button
                          variant="contained"
                          color="warning"
                          component={Link}
                          to={`/updatecourse/${courseItem._id}`}
<<<<<<< HEAD
                        >
                          Update
=======
                          style={{ fontSize: "10px" }}
                        >
                          Update & Detail
>>>>>>> ee8ce9dc7f024fddcf3d30f62591c915cc0e07ae
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
<<<<<<< HEAD
                }
=======
                })
>>>>>>> ee8ce9dc7f024fddcf3d30f62591c915cc0e07ae
              )}
            </TableBody>
          </Table>
        </TableContainer>
<<<<<<< HEAD

        <footer style={{ marginTop: "10px", marginBottom: "10px" }}>
=======
        <footer
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
>>>>>>> ee8ce9dc7f024fddcf3d30f62591c915cc0e07ae
          <button
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
          </button>
          <select
            value={page}
            onChange={(event) => {
              setPage(event.target.value);
            }}
            style={{
              marginRight: "1rem",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {Array(pageCount)
              .fill(null)
              .map((_, index) => {
                return (
                  <option key={index} style={{ padding: "0.5rem" }}>
                    {parseInt(index + 1)}
                  </option>
                );
              })}
          </select>
          <button
<<<<<<< HEAD
            disabled={page === totalPage}
=======
            disabled={page == pageCount}
>>>>>>> ee8ce9dc7f024fddcf3d30f62591c915cc0e07ae
            onClick={handleNext}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              backgroundColor: "#ccc",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </footer>
      </Container>
    </div>
  );
}

export default ManageCourses;
