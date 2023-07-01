import { Select, MenuItem, TextField, FormControl } from "@mui/material";

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
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { updateClass } from "../../../../helper/classAPI";
import StatusButton from "./StatusButon";
import classNames from "classnames/bind";
import styles from "./ManageClass.css";

import { Modal } from "@mui/material";

const cx = classNames.bind(styles);

function ManageClass() {
  const [classes, setClasses] = useState([]);
  const [updatedClass, setUpdatedClass] = useState({});
  const [classList, setClassList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const dayList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sturday",
    "Sunday",
  ];
  const [courseList, setCourseList] = useState([]);
  const [instructorList, setInstructorList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [dayValue, setDayValue] = useState("");
  const [slotValue, setSlotValue] = useState("");
  const [instructorValue, setInstructorValue] = useState("");
  const [courseValue, setCourseValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = async (event, classs) => {
    try {
      const updatedClassData = { ...classs, status: event.target.checked };
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
    } catch (error) {
      console.error(error);
    }
  };

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
  //-------------------------------------------------------------------------------------------------------

  useEffect(() => {
    fetchClasses();
  }, [updatedClass, page]);

  //----------------------------------------------------------------------------------------------------------
  var url2 = `http://localhost:3001/api/classesPaging/get?page=${page}&limit=${4}`;
  if (searchQuery !== "") {
    url2 += `&q=${searchQuery}`;
  }
  if (statusValue !== "") {
    url2 += `&status=${statusValue}`;
  }
  if (instructorValue !== "") {
    url2 += `&instructor_id=${instructorValue}`;
  }
  if (dayValue !== "") {
    url2 += `&days=${dayValue}`;
  }
  if (slotValue !== "") {
    url2 += `&schedule_id=${slotValue}`;
  }
  if (courseValue !== "") {
    url2 += `&course_id=${courseValue}`;
  }

  async function fetchClasses3() {
    const response = await axios.get(
      `http://localhost:3001/api/classesPaging/get?page=${page}&limit=${4}`
    );
    const classData = response.data.items;
    setPage(response.data.pagination.pageNum);
    setPageCount(response.data.pagination.pageCount);
    setClasses(classData);
  }

  async function fetchClasses() {
    const response = await axios.get(url2);
    const classData = response.data.items;
    setPage(response.data.pagination.pageNum);
    setPageCount(response.data.pagination.pageCount);
    setClasses(classData);
  }

  var url = `http://localhost:3001/api/classesPaging/get?page=${1}&limit=${4}`;

  if (searchQuery !== "") {
    url += `&q=${searchQuery}`;
  }
  if (statusValue !== "") {
    url += `&status=${statusValue}`;
  }
  if (instructorValue !== "") {
    url += `&instructor_id=${instructorValue}`;
  }
  if (dayValue !== "") {
    url += `&days=${dayValue}`;
  }
  if (slotValue !== "") {
    url += `&schedule_id=${slotValue}`;
  }
  if (courseValue !== "") {
    url += `&course_id=${courseValue}`;
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(url);
      const classData = response.data.items;
      setPage(response.data.pagination.pageNum);
      setPageCount(response.data.pagination.pageCount);
      setClasses(classData);
      handleCloseModal();
    } catch (error) {}
  };
  const handleReset = () => {
    fetchClasses3();
    setSearchQuery("");
    setCourseValue("");
    setInstructorValue("");
    setSlotValue("");
    setStatusValue("");
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

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

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
      <div style={{display:'flex', marginTop: "15px",
              marginBottom: "15px",
              marginLeft: "10px",}}> <Button
            variant="contained"
            color="primary"
            style={{ display: "block" }}
            onClick={handleOpenModal}
          >
            Search
          </Button>
          <Button
            style={{ marginLeft: "1rem" }}
            variant="outlined"
            onClick={handleReset}
          >
            Reset
          </Button></div>
         

          <Modal
  open={isOpen}
  onClose={handleCloseModal}
  sx={{
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    height:150,
  backgroundColor:"none",
    boxShadow: "none",
    p: 4
  }}
>
  <form onSubmit={handleSearch}>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
      <Button type="submit" variant="contained" color="primary" style={{marginRight:10}}>
        Filter
      </Button>
      <Button variant="contained" onClick={handleCloseModal}>
        Cancel
      </Button>
    </div>
    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
      <input
        autoFocus
        style={{ marginRight: "1rem" }}
        type="text"
        variant="outlined"
        placeholder="Search by class name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-solid border-2 border-black p-1"
      />

      <select
        value={instructorValue}
        onChange={(e) => setInstructorValue(e.target.value)}
        className="border-solid border-2 border-black p-1"
      >
        <option value="">All Instructor</option>
        {instructorList.map((user, index) => (
          <option key={index} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>

      <select
        value={slotValue}
        onChange={(e) => setSlotValue(e.target.value)}
        className="border-solid border-2 border-black p-1"
      >
        <option value="">All Schedule</option>
        {scheduleList.map((user, index) => (
          <option key={index} value={user._id}>
            {user.schedulename}
          </option>
        ))}
      </select>

      <select
        value={courseValue}
        onChange={(e) => setCourseValue(e.target.value)}
        className="border-solid border-2 border-black p-1"
      >
        <option value="">All course</option>
        {courseList.map((user, index) => (
          <option key={index} value={user._id}>
            {user.coursename}
          </option>
        ))}
      </select>

      <select
        value={dayValue}
        onChange={(e) => setDayValue(e.target.value)}
        className="border-solid border-2 border-black p-1"
      >
        <option value="">All course</option>
        {dayList.map((user, index) => (
          <option key={index} value={user._id}>
            {user}
          </option>
        ))}
      </select>

      <select
        value={statusValue}
        onChange={(e) => setStatusValue(e.target.value)}
        
        className="border-solid border-2 border-black p-1"
      >
        <option value="">All Statuses</option>
        <option value="true">Enabled</option>
        <option value="false">Disabled</option>
      </select>
    </div>
  </form>
</Modal>


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
