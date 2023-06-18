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
  TextField,
  InputAdornment,
  IconButton,
  Switch,
  Radio,
} from "@mui/material";
import "./ManageCourses.css";
import { Link } from "react-router-dom";
import { updateCourse } from "../../../../helper/courseAPI";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
function ManageCourses() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const [totalCourse, setTotalCourse] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [statusFilter, setStatusFilter] = useState("both");
  const [courseList, setcourseList] = useState([]);

  //thay đổi status//////////////////////////////////////

  const handleToggle = async (event, course) => {
    try {
      const updatedCourseData = { ...course, status: event.target.checked };
      const response = await updateCourse(updatedCourseData);
      if (response && response.data) {
        setUpdatedCourse(response.data);
        const updatedCourses = courses.map((courseItem) =>
          courseItem._id === response.data._id ? response.data : courseItem
        );
        setCourses(updatedCourses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Lọc danh sách khóa học dựa trên trạng thái
    let filtered = courses;
    if (statusFilter === "enable") {
      filtered = courseList.filter((course) => course.status);
    } else if (statusFilter === "disable") {
      filtered = courseList.filter((course) => !course.status);
    }
    // else if (statusFilter === "both")
    //     filtered = courses.filter(courses => courses.status)

    setSearchResults(filtered);
  }, [courseList, statusFilter, courses]);

  // thay đổi tiến lên hoặc xuống trang
  function handlePrevious() {
    setCurrentPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setCurrentPage((p) => {
      if (p === totalPage) return p;
      return parseInt(p) + 1;
    });
  }
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

  return (
    <div>
      <Container>
        <Toaster position="top-center" reverseOrder={false} />
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>
                  <Radio
                    value="both"
                    checked={statusFilter === "both"}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  />
                  Both
                  <Radio
                    value="enable"
                    checked={statusFilter === "enable"}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  />
                  Enable
                  <Radio
                    value="disable"
                    checked={statusFilter === "disable"}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  />
                  Disable
                </TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(searchResults.length > 0 ? searchResults : courses).map(
                (courseItem, index) => {
                  const semester = schedule.find(
                    (item2) => item2._id === courseItem.semester_id
                  );
                  return (
                    <TableRow key={index}>
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
                        <Button
                          variant="contained"
                          color="warning"
                          component={Link}
                          to={`/updatecourse/${courseItem._id}`}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <footer style={{ marginTop: "10px", marginBottom: "10px" }}>
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
            value={currentPage}
            onChange={(event) => {
              setCurrentPage(event.target.value);
              console.log(currentPage);
            }}
            style={{
              marginRight: "1rem",
              padding: "0.5rem",
              borderRadius: "4px",
            }}
          >
            {Array(totalPage)
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
            disabled={page === totalPage}
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
