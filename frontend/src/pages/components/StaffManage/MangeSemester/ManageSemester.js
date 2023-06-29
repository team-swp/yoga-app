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
  TextField,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { Link } from "react-router-dom";
import { updateSemester } from "../../../../helper/semesterAPI";
import { updateCourse } from "../../../../helper/courseAPI";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import StatusButton from "./StatusButtons";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

function ManageSemester() {
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [manageUpdateSemester, setManageUpdateSemester] = useState({})
  const [value, setValue] = useState('')
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [semesterValue, setSemesterValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  const handleToggle = async (event, semester) => {
    try {
      const updatedSemesterData = { ...semester, status: event.target.checked };
      const semesterResponse = await updateSemester(updatedSemesterData);

      if (semesterResponse && semesterResponse.data) {
        console.log(semesterResponse.data.data.semestername);

        const courseResponse = await axios.get('http://localhost:3001/api/course/get');
        const courseData = courseResponse.data;

        if (Array.isArray(courseData) && courseData.length > 0) {
          const coursesWithSemester = courseData.filter((course) =>
            course.semester_id === semesterResponse.data.data._id
          );

          if (coursesWithSemester.length > 0) {
            coursesWithSemester.forEach(async (course) => {
              try {
                const updatedCourseData = { ...course };
                if (!event.target.checked === false) {
                  updatedCourseData.status = false;
                }
                const response = await updateCourse(updatedCourseData);

                if (response && response.data) {
                  console.log(response.data.data.coursename);

                  const updatedCourses = courses.map((courseItem) =>
                    courseItem._id === response.data._id ? response.data : courseItem
                  );
                  setCourses(updatedCourses);

                  if (!event.target.checked) {
                    toast.success(`${response.data.data.coursename} status updated successfully`);
                  }
                }
              } catch (error) {
                console.error(error);
              }
            });
          } else {
            console.log('No courses found with the updated semester');
          }
        } else {
          console.log('Course data is empty or invalid');
        }
        toast.success(`${semesterResponse.data.data.semestername} status updated successfully`);
        setManageUpdateSemester(semesters);
        setSemesters([...semesters]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, [manageUpdateSemester, page]);

  const handleReset = () => {
    fetchSemesters();
    setSearchQuery('');
  };

  async function fetchSemester2() {
    const url = `http://localhost:3001/api/semestersPaging/get?page=${1}&limit=${100}&q=${searchQuery}`;
    const response = await axios.get(url);
    const semestersData = response.data.items;
    setPage(response.data.pagination.pageNum);
    setPageCount(response.data.pagination.pageCount);
    setSemesters(semestersData);
  }

  async function fetchSemesters() {
    const response = await axios.get(`http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${3}`);
    const semestersData = response.data.items;
    setPage(response.data.pagination.pageNum);
    setPageCount(response.data.pagination.pageCount);
    setSemesters(semestersData);
  }

  const handleSearch = () => {
    fetchSemester2();
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

  return (
    <div>
      <Container>
        <Toaster position="top-center" reverseOrder={false} />

        <TableContainer component={Paper}>
          <div
            style={{ float: "right", marginTop: "15px", marginBottom: '15px', marginRight: "10px" }}
          >
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/addnewsemester"
            >
              Add new Semester
            </Button>
          </div>
          <div style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "800px",
            display: "flex",
            alignItems: "center",
          }}>
            <TextField
              label="Search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value.toLowerCase())}
              style={{ marginRight: "1rem" }}
            />
            <IconButton onClick={handleReset} sx={{ ml: -8 }}>
              <RestartAltOutlinedIcon />
            </IconButton>
            <Button onClick={handleSearch} type="submit" variant="contained" color="primary" sx={{ ml: 3 }}>
              Search
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }} >Semester ID</TableCell>
                <TableCell style={{ textAlign: "center" }} >Semester Name</TableCell>
                <TableCell style={{ textAlign: "center" }} >Start Date</TableCell>
                <TableCell style={{ textAlign: "center" }} >End Date</TableCell>
                <TableCell style={{ textAlign: "center" }} >Disable-Enable</TableCell>
                <TableCell style={{ textAlign: "center" }} >Status</TableCell>
                <TableCell style={{ textAlign: "center" }} >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {semesters.map((semesterItem, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: "center" }} >
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }} >
                    {semesterItem.semestername}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }} >
                    {new Date(semesterItem.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }} >
                    {new Date(semesterItem.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={semesterItem.status}
                      onChange={(event) => handleToggle(event, semesterItem)}
                      color={semesterItem.status ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <StatusButton status={semesterItem.status} />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to={`/updatesemester/${semesterItem._id}`}
                      style={{ fontSize: "10px", backgroundColor: 'orange' }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
          <Button
            disabled={page === 1}
            onClick={handlePrevious}
            variant="contained"
          >
            Previous
          </Button>
          <select
            value={page}
            onChange={(event) => setPage(event.target.value)}
            style={{
              margin: "0 1rem",
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
          <Button
            disabled={page == pageCount}
            onClick={handleNext}
            variant="contained"
          >
            Next
          </Button>
        </footer>
      </Container>


    </div >
  );
}

export default ManageSemester;