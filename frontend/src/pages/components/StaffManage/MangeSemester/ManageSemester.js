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
  IconButton,
  Modal,
  Fade,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  addSemester,
  getSemester,
  updateSemester,
} from "../../../../helper/semesterAPI";
import { updateCourse } from "../../../../helper/courseAPI";
import { updateClass } from "../../../../helper/classAPI";
import { Toaster, toast } from "react-hot-toast";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import StatusButton from "./StatusButtons";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

function ManageSemester() {
  //Manage Semester
  const [classes, setClasses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const [manageUpdateSemester, setManageUpdateSemester] = useState({});
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);

  //Add Semester
  const [semesternames, setSemesternames] = useState("");
  const [startDates, setStartDates] = useState("");
  const [endDates, setEndDates] = useState("");
  const [reset, setReset] = useState({});
  const [openModals, setOpenModals] = useState(false);

  //Update Semester
  const [semester, setSemester] = useState({});
  const semesterId = useParams();
  const [semestername, setSemestername] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedSemesters, setSelectedSemesters] = useState(null);
  const apdapter = new AdapterDayjs();

  //Manage Semester
  const handleToggle = async (event, semester) => {
    setSelectedSemester(semester);
    setConfirmModalOpen(true);
  };

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const updatedSemesterData = {
        ...selectedSemester,
        status: !selectedSemester.status,
      };
      const semesterResponse = await updateSemester(updatedSemesterData);
      if (semesterResponse && semesterResponse.data) {
        console.log(semesterResponse.data.data.semestername);

        const courseResponse = await axios.get(
          "https://yoga-app-swp.onrender.com/api/course/get"
        );
        const courseData = courseResponse.data;
        if (Array.isArray(courseData) && courseData.length > 0) {
          const coursesWithSemester = courseData.filter(
            (course) => course.semester_id === semesterResponse.data.data._id
          );
          if (coursesWithSemester.length > 0) {
            coursesWithSemester.forEach(async (course) => {
              try {
                const updatedCourseData = { ...course };
                if (!selectedSemester.status === false) {
                  updatedCourseData.status = false;
                }

                const response = await updateCourse(updatedCourseData);
                if (response && response.data) {
                  console.log(response.data.data.coursename);

                  const classResponse = await axios.get(
                    "https://yoga-app-swp.onrender.com/api/class/get"
                  );
                  const classData = classResponse.data;
                  if (Array.isArray(classData) && classData.length > 0) {
                    const classWithCourse = classData.filter(
                      (classs) => classs.course_id === response.data.data._id
                    );
                    if (classWithCourse.length > 0) {
                      classWithCourse.forEach(async (classs) => {
                        try {
                          const updatedClassData = { ...classs };
                          console.log(course.status, 123);
                          if (!selectedSemester.status === false) {
                            updatedClassData.status = false;
                          }
                          const classResponse = await updateClass(
                            updatedClassData
                          );
                          if (classResponse && classResponse.data) {
                            console.log(classResponse.data.data.classname);
                            const updatedClasss = classes.map((classItem) =>
                              classItem._id === classResponse.data._id
                                ? classResponse.data
                                : classItem
                            );
                            setClasses(updatedClasss);
                          }
                        } catch (error) {
                          console.error(error);
                        }
                      });
                    } else {
                      console.log("No class found with the updated course");
                    }
                  } else {
                    console.log("Class data is empty or invalid");
                  }
                  setUpdatedCourse(courses);
                  setCourses([...courses]);
                }
              } catch (error) {
                console.error(error);
              }
            });
          } else {
            console.log("No courses found with the updated semester");
          }
        } else {
          console.log("Course data is empty or invalid");
        }
        toast.success(
          `${semesterResponse.data.data.semestername} status updated successfully`
        );
        setManageUpdateSemester(semesters);
        setSemesters([...semesters]);
        setConfirmModalOpen(false);
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
    setSearchQuery("");
  };

  async function fetchSemester2() {
    const url = `https://yoga-app-swp.onrender.com/api/semestersPaging/get?page=${1}&limit=${100}&q=${searchQuery}`;
    const response = await axios.get(url);
    const semestersData = response.data.items;
    setPage(response.data.pagination.pageNum);
    setPageCount(response.data.pagination.pageCount);
    setSemesters(semestersData);
  }

  async function fetchSemesters() {
    const response = await axios.get(
      `https://yoga-app-swp.onrender.com/api/semestersPaging/get?page=${page}&limit=${3}`
    );
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

  //Add Semester
  const handleOpens = (event) => {
    setOpenModals(true);
  };

  const handleSubmits = async (event) => {
    try {
      const response = await addSemester({
        semestername: semesternames,
        startDate: startDates,
        endDate: endDates,
      });

      if (response) {
        toast.success("Add New Semester Succesfully!");
        setReset();
      } else {
        toast.error("Fail to add new Semester...");
      }
      setOpenModals(false);
    } catch (error) {
      console.log(error);
      toast.error("Fail to add new Semester...");
    }
  };

  const handleCloses = () => {
    setOpenModals(false);
  };

  const handleStartDateChanges = (date) => {
    setStartDates(date.toISOString());
  };

  const handleEndtDateChanges = (date) => {
    setEndDates(date.toISOString());
  };

  useEffect(() => {
    fetchSemesters();
  }, [reset, page]);

  //Update Semester

  const handleOpen = (event, semester) => {
    setSelectedSemesters(semester);
    setSemester(semester);

    const adapStartDate = apdapter.date(new Date(semester.startDate));
    const adapEndDate = apdapter.date(new Date(semester.endDate));

    setSemestername(semester.semestername);
    setStartDate(adapStartDate);
    setEndDate(adapEndDate);

    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      const updateSemesterData = {
        ...selectedSemesters,
        _id: selectedSemesters._id,
        semestername: semestername,
        startDate: startDate,
        endDate: endDate,
      };
      const semestersResponse = await updateSemester(updateSemesterData);
      if (semestersResponse && semestersResponse.data) {
        console.log(semestersResponse.data.data.semestername);
        setManageUpdateSemester(selectedSemesters);
        const updatedSemesters = semesters.map((semesterItem) =>
          semesterItem._id === semestersResponse.data._id
            ? semestersResponse.data
            : semesterItem
        );
        setSemesters(updatedSemesters);
        toast.success(
          `${semestersResponse.data.data.semestername} updated successfully`
        );
      } else {
        toast.error("Fail to  update Semester...");
      }
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Fail to update Semester...");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndtDateChange = (date) => {
    setEndDate(date);
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
              onClick={(event) => handleOpens(event)}
            >
              Add new Semester
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>
                  Semester ID
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Semester Name
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Start Date
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>End Date</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  Disable-Enable
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {semesters.map((semesterItem, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: "center" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {semesterItem.semestername}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {new Date(semesterItem.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {new Date(semesterItem.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <Switch
                      checked={semesterItem.status}
                      onChange={(event) => handleToggle(event, semesterItem)}
                      color={semesterItem.status ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <StatusButton status={semesterItem.status} />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <Button
                      onClick={(event) => handleOpen(event, semesterItem)}
                      style={{
                        fontSize: "10px",
                        backgroundColor: "orange",
                        color: "#fff",
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={confirmModalOpen}
          onClose={handleCancel}
          closeAfterTransition
        >
          <Fade in={confirmModalOpen}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Paper
                style={{
                  width: "400px",
                  padding: "2em",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                }}
                elevation={3}
              >
                <h3
                  style={{
                    marginBottom: "1em",
                    fontSize: "1.5em",
                    fontWeight: "bold",
                  }}
                >
                  Confirmation
                </h3>
                <p>
                  Are you sure you want to change the status of this Semester?
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "2rem",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleConfirm}
                    style={{ marginRight: "1rem", backgroundColor: "black" }}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      border: "2px solid #000",
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Paper>
            </div>
          </Fade>
        </Modal>
        <Modal open={openModals} onClose={handleCloses} closeAfterTransition>
          <Fade in={openModals}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Paper
                style={{
                  width: "400px",
                  padding: "2em",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                }}
                elevation={3}
              >
                <h3
                  style={{
                    marginBottom: "1em",
                    fontSize: "1.5em",
                    fontWeight: "bold",
                  }}
                >
                  Add Semester
                </h3>
                <Toaster position="top-center"></Toaster>
                <TextField
                  label="Semester Name"
                  type="text"
                  value={semesternames}
                  onChange={(e) => setSemesternames(e.target.value)}
                  fullWidth
                  required
                  style={{ width: "250px" }}
                />
                <div style={{ marginTop: "1em" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                    <DatePicker
                      label="Start Date"
                      value={startDates}
                      onChange={handleStartDateChanges}
                      inputFormat="MM/DD/YYYY"
                      animateYearScrolling
                      fullWidth
                      required
                    />
                  </LocalizationProvider>
                </div>
                <div style={{ marginTop: "1em" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                    <DatePicker
                      label="End Date"
                      value={endDates}
                      onChange={handleEndtDateChanges}
                      inputFormat="MM/DD/YYYY"
                      animateYearScrolling
                      fullWidth
                      required
                    />
                  </LocalizationProvider>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "2rem",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSubmits}
                    style={{ marginRight: "1rem", backgroundColor: "black" }}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCloses}
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      border: "2px solid #000",
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Paper>
            </div>
          </Fade>
        </Modal>
        <Modal open={openModal} onClose={handleClose} closeAfterTransition>
          <Fade in={openModal}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Paper
                style={{
                  width: "400px",
                  padding: "2em",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                }}
                elevation={3}
              >
                <h3
                  style={{
                    marginBottom: "1em",
                    fontSize: "1.5em",
                    fontWeight: "bold",
                  }}
                >
                  Update Semester
                </h3>
                <Toaster position="top-center"></Toaster>
                <TextField
                  label="Semester Name"
                  type="text"
                  name="semester"
                  value={semestername}
                  onChange={(event) => setSemestername(event.target.value)}
                  required
                  style={{ width: 250 }}
                />
                <div style={{ marginTop: "1em" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      inputFormat="MM/DD/YYYY"
                      animateYearScrolling
                      fullWidth
                      required
                    />
                  </LocalizationProvider>
                </div>
                <div style={{ marginTop: "1em" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={handleEndtDateChange}
                      inputFormat="MM/DD/YYYY"
                      animateYearScrolling
                      fullWidth
                      required
                    />
                  </LocalizationProvider>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "2rem",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    style={{ marginRight: "1rem", backgroundColor: "black" }}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      border: "2px solid #000",
                    }}
                  >
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

export default ManageSemester;
