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
  Fade,
  Modal
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { updateClass } from "../../../../helper/classAPI";
import StatusButton from "./StatusButon";
import classNames from "classnames/bind";
import styles from "./ManageClass.css";
import { getCourse } from "../../../../helper/courseAPI";
import { getSchedule } from "../../../../helper/scheduleAPI";


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
          toast.error('Cannot update status. Course or Slot status is false.');
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
        setScheduleList(responseJSON);
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
        const FilterInstructor = responseJSON.filter((x) => x.role === "instructor")
        setInstructorList(FilterInstructor);
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

    } catch (error) { }
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
          <div
            style={{
              display: "flex",
              marginTop: "15px",
              marginBottom: "15px",
              marginLeft: "10px",
            }}
          >
            {" "}
            <Button
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
            </Button>
          </div>

          <Modal
            open={isOpen}
            onClose={handleCloseModal}
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 1200,
              height: 150,
              backgroundColor: "none",
              boxShadow: "none",
              p: 4,
            }}
          >
            <form onSubmit={handleSearch}>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <input
                  autoFocus
                  type="text"
                  variant="outlined"
                  placeholder="Search by class name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-solid border-2 border-black p-1"
                />

                <select
                  onClick={handleSearch}
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
                  onClick={handleSearch}
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
                  onClick={handleSearch}
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
                  onClick={handleSearch}
                  value={dayValue}
                  onChange={(e) => setDayValue(e.target.value)}
                  className="border-solid border-2 border-black p-1"
                >
                  <option value="">Day of the week</option>
                  {dayList.map((user, index) => (
                    <option key={index} value={user._id}>
                      {user}
                    </option>
                  ))}
                </select>

                <select
                  onClick={handleSearch}
                  value={statusValue}
                  onChange={(e) => setStatusValue(e.target.value)}
                  className="border-solid border-2 border-black p-1"
                >
                  <option value="">All Statuses</option>
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginRight: 10 }}
                >
                  Filter
                </Button>
                <Button variant="contained" onClick={handleCloseModal}>
                  Cancel
                </Button>
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
              {
                classes.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      align="center"
                      style={{ fontSize: "30px" }}
                    >
                      The result not  available !!!
                    </TableCell>
                  </TableRow>
                ) :


                  classes.map((classItem, index) => {
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