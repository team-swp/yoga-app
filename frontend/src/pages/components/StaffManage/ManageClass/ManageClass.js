import { useEffect, useState } from "react";
import {
  TextField,
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
  IconButton,
  Modal,
  Fade,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { updateClass } from "../../../../helper/classAPI";
import StatusButton from "./StatusButon";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { getCourse } from "../../../../helper/courseAPI";
import { getSchedule } from "../../../../helper/scheduleAPI";
import classNames from "classnames/bind";
import styles from './ManageClass.css'

const cx = classNames.bind(styles);

function ManageClass() {
  const [classes, setClasses] = useState([]);
  const [updatedClass, setUpdatedClass] = useState({});
  const [classList, setClassList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [instructorList, setInstructorList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleToggle = async (event, classs) => {
    setSelectedClass(classs);
    setConfirmModalOpen(true);
  };
  const handleConfirm = async () => {
    try {
      const updatedClassData = { ...selectedClass, status: !selectedClass.status };
      const courseId = selectedClass.course_id;
      const scheduleId = selectedClass.schedule_id;
      const courseResponse = await getCourse();
      const scheduleResponse = await getSchedule();
      if (courseResponse && courseResponse.data && scheduleResponse && scheduleResponse.data) {
        const course = courseResponse.data.find(course => course._id === courseId);
        const schedule = scheduleResponse.data.find(schedule => schedule._id === scheduleId);
        if ((course.status === true) && (schedule.status === true)) {
          const response = await updateClass(updatedClassData);
          if (response && response.data) {
            console.log(response.data.data.classname);
            setUpdatedClass(classes);
            const updatedClass = classes.map(
              (classItem) =>
                classItem._id === response.data._id ? response.data : classItem,
              toast.success(
                `${response.data.data.classname} status updated success`
              )
            );
            setClasses(updatedClass);

          }
        } else {
          toast.error('Cannot update status. Course or Schedule status is false.');
        }
        setConfirmModalOpen(false);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  useEffect(() => {
    fetchClasses();
  }, [updatedClass, page]);

  useEffect(() => {
    async function fecthClassList() {
      try {
        const requestUrl = "http://localhost:3001/api/class/get";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setClassList(responseJSON);
      } catch (error) {
        console.log("Failed");
      }
    }
    fecthClassList();

    async function fetchScheduleList() {
      try {
        const requestUrl = "http://localhost:3001/api/schedule/get";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);
        setScheduleList(responseJSON);
        console.log(scheduleList);
      } catch (error) {
        console.log("Failed");
      }
    }
    fetchScheduleList();

    async function fetchCourseList() {
      try {
        const requestUrl = "http://localhost:3001/api/course/get";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setCourseList(responseJSON);
      } catch (error) {
        console.log("Failed");
      }
    }
    fetchCourseList();

    async function fetchInstructorList() {
      try {
        const requestUrl = "http://localhost:3001/api/accounts";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setInstructorList(responseJSON);
      } catch (error) {
        console.log("Failed");
      }
    }
    fetchInstructorList();
  }, []);

  async function fetchClasses2() {
    const response = await axios.get(
      `http://localhost:3001/api/classesPaging/get?page=${1}&limit=${100}&q=${searchQuery}`
    );
    const classData = response.data.items;
    setPage(response.data.pagination.pageNum);
    setPageCount(response.data.pagination.pageCount);
    setClasses(classData);
  }

  async function fetchClasses() {
    const response = await axios.get(
      `http://localhost:3001/api/classesPaging/get?page=${page}&limit=${3}`
    );
    const classData = response.data.items;
    setPage(response.data.pagination.pageNum);
    setPageCount(response.data.pagination.pageCount);
    setClasses(classData);
  }

  const handleSearch = () => {
    fetchClasses2();
  };

  const handleReset = () => {
    fetchClasses();
    setSearchQuery("");
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
            style={{
              float: "right",
              marginTop: "15px",
              marginBottom: "15px",
              marginRight: "10px",
            }}
          >
            <Button
              variant="contained"
              color="success"
              component={Link}
              to="/addnewclass"
            >
              Add new Class
            </Button>
          </div>
          <div
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "800px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              label="Search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value.toLowerCase())
              }
              style={{ marginRight: "1rem" }}
            />
            <IconButton onClick={handleReset} sx={{ ml: -8 }}>
              <RestartAltOutlinedIcon />
            </IconButton>
            <Button
              onClick={handleSearch}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ ml: 3 }}
            >
              Search
            </Button>
          </div>
          <Table sx={{ minWidth: 650 }} aria-label="class table">
            <TableHead>
              <TableRow>
                <TableCell>Class Id</TableCell>
                <TableCell>Class Name</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Disable-Enable</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.map((classItem, index) => {
                const scheduleId = classItem.schedule_id;
                const courseId = classItem.course_id;
                const instructorId = classItem.instructor_id;
                const scheduleName = scheduleList.find(
                  (schedule) => schedule._id === scheduleId
                )?.schedulename;
                const courseName = courseList.find(
                  (course) => course._id === courseId
                )?.coursename;
                const instructor = instructorList.find(
                  (inst) => inst._id === instructorId
                )?.username;
                return (
                  <TableRow key={classItem._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{classItem.classname}</TableCell>
                    <TableCell>{scheduleName}</TableCell>
                    <TableCell>{courseName}</TableCell>
                    <TableCell>{instructor}</TableCell>
                    <TableCell>{classItem.days.join(", ")}</TableCell>
                    <TableCell>
                      <Switch
                        checked={classItem.status}
                        onChange={(event) => handleToggle(event, classItem)}
                        color={classItem.status ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <StatusButton status={classItem.status} />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        component={Link}
                        to={`/updateclass/${classItem._id} `}
                        style={{ fontSize: "10px" }}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={confirmModalOpen}
          onClose={handleCancel}
          closeAfterTransition
        >
          <Fade in={confirmModalOpen}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Paper style={{ width: "400px", padding: "2em", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", textAlign: "center" }} elevation={3}>
                <h3 style={{ marginBottom: "1em", fontSize: "1.5em", fontWeight: "bold" }}>
                  Confirmation
                </h3>
                <p>Are you sure you want to change the status of this Class?</p>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
                  <Button variant="contained" onClick={handleConfirm} style={{ marginRight: "1rem", backgroundColor: "black" }}>
                    Confirm
                  </Button>
                  <Button variant="outlined" onClick={handleCancel} style={{ backgroundColor: "#fff", color: "#000", border: "2px solid #000" }}>
                    Cancel
                  </Button>
                </div>
              </Paper>
            </div>
          </Fade>
        </Modal>
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
    </div>
  );
}

export default ManageClass;
