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
  colors,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getCourse, updateCourse } from "../../../../helper/courseAPI";

function ManageCourses() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState({});

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

  // dùng effect để chạy search
  useEffect(
    () => {
      if (searchKeyword === "") {
        setSearchResults([]);
      }
    },
    [searchKeyword],
    [updatedCourse]
  );

  // chạy để lấy dữ liệu course
  useEffect(() => {
    fetchCourses();
  }, [updatedCourse]);

  async function fetchCourses() {
    try {
      const response = await getCourse();
      if (response && response.data) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
  return (
    <div>
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
                <TableCell>Enable/Disable</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(searchResults.length > 0 ? searchResults : courses).map(
                (courseItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{courseItem.coursename}</TableCell>
                    <TableCell>{courseItem.price}</TableCell>
                    <TableCell>
                      {!courseItem.status ? "Disabled" : "Enabled"}
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
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default ManageCourses;
