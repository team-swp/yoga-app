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
} from "@mui/material";

import "./ManageCourses.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import { updateCourse } from "../../../../helper/courseAPI";
function ManageCourses() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const [totalCourse, setTotalCourse] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [schedule, setSchedule] = useState([]);

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
    setShowErrorMessage(false);
    setSearchKeyword(event.target.value);
  };

  //Search
  const handleSearch = () => {
    if (searchKeyword.trim() === "") {
      setShowErrorMessage(true);
      return;
    }

    const filteredCourses = courses.filter(
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
      setShowNotFoundMessage(true);
    } else {
      setShowNotFoundMessage(false);
    }
  };
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
  // dùng effect để chạy search
  useEffect(() => {
    if (searchKeyword === "") {
      setSearchResults([]);
    }
  }, [searchKeyword]);
  ///////////////////////////////////////////////////

  // chạy để lấy dữ liệu course
  useEffect(() => {
    fetchCourses();
  }, [updatedCourse]);

  //////////////////////// pagination
  useEffect(() => {
    fetchCourses();
  }, [currentPage]);

  async function fetchCourses() {
    const requestUrl = `http://localhost:3001/api/coursespaging/get?page=${currentPage}&limit=${perPage}`;
    const response = await fetch(requestUrl);
    const responseJSON = await response.json();
    const { items } = responseJSON;
    console.log(responseJSON);
    const { pagination } = responseJSON;
    console.log(pagination.pageCount);
    setTotalPage(pagination.pageCount);
    setCourses(items);
    setTotalCourse(pagination.count);
    setPage(pagination.pageNum);
    console.log(pagination.pageNum);
  }

  return (
    <div>
      <Header />
      <div className="bg-gray-400">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
          <h1 className="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
            Manage Courses
          </h1>
        </div>
      </div>
      <Container>
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

        {showNotFoundMessage && (
          <div
            style={{
              marginBottom: "16px",
              color: "red",
            }}
          >
            No results found.
          </div>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Enable/Disable</TableCell>
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
        <Link
          to="/staffmanage"
          style={{
            marginTop: "10px",
            float: "right",
            backgroundColor: "grey",
            border: "none",
            color: "white",
            padding: "10px 20px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Back
        </Link>

        <footer>
          <button disabled={page === 1} onClick={handlePrevious}>
            Previous
          </button>
          <select
            value={currentPage}
            onChange={(event) => {
              setCurrentPage(event.target.value);
              console.log(currentPage);
            }}
          >
            {Array(totalPage)
              .fill(null)
              .map((_, index) => {
                return <option key={index}>{parseInt(index + 1)}</option>;
              })}
          </select>
          <button disabled={page == totalPage} onClick={handleNext}>
            Next
          </button>
        </footer>
      </Container>

      <Footer />
    </div>
  );
}

export default ManageCourses;
