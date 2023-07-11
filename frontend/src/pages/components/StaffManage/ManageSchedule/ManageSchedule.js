import React, { useState, useEffect } from "react";
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
import { Link, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { getSchedule, addSchedule, updateSchedule } from "../../../../helper/scheduleAPI";
import { getClass, updateClass } from "../../../../helper/classAPI";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import StatusButton from "./StatusButons";
import axios from "axios";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';


function ManageSchedule() {

  //Manage Schedule
  const [classs, setClasss] = useState([])
  const [scheduleList, setScheduleList] = useState()
  const [schedules, setSchedules] = useState([]);
  const [manageEditSchedule, setManageEditSchedule] = useState({})
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  //Add Schedule 
  const [schedulename, setSchedulename] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()

  //Update Schedule
  const adapter = new AdapterDayjs();
  const [schedule, setSchedule] = useState({});
  const scheduleId = useParams();
  const [schedulenames, setSchedulenames] = useState("");
  const [startTimes, setStartTimes] = useState();
  const [endTimes, setEndTimes] = useState();
  const [selectedSchedules, setSelectedSchedules] = useState(null);
  const [openModals, setOpenModals] = useState(false);
  const navigates = useNavigate();

  //Manage Schedule
  const handleToggle = async (event, schedule) => {
    setSelectedSchedule(schedule);
    setConfirmModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const updatedScheduleData = { ...selectedSchedule, status: !selectedSchedule.status };
      const scheduleResponse = await updateSchedule(updatedScheduleData);
      if (scheduleResponse && scheduleResponse.data) {
        console.log(scheduleResponse.data.data.schedulename);

        const classResponse = await getClass();
        const classData = classResponse.data;
        if (Array.isArray(classData) && classData.length > 0) {
          const classWithSchedule = classData.filter((classes) =>
            classes.schedule_id === scheduleResponse.data.data._id
          );
          if (classWithSchedule.length > 0) {
            classWithSchedule.forEach(async (classes) => {
              try {
                const updatedClassesData = { ...classes };
                if (!selectedSchedule.status === false) {
                  updatedClassesData.status = false;
                }
                const response = await updateClass(updatedClassesData);
                if (response && response.data) {
                  console.log(response.data.data.classname);
                  const updatedClasses = classs.map((classItem) =>
                    classItem._id === response.data._id ? response.data : classData
                  );
                  setClasss(updatedClasses);
                }
              } catch (error) {
                console.error(error);
              }
            });
          } else {
            console.log('No class found with the updated slot');
          }
        } else {
          console.log('Class data is emty or invalid');
        }
        toast.success(`${scheduleResponse.data.data.schedulename} status updated succesfully`);
        setManageEditSchedule(schedules)
        setSchedules([...schedules]);
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
    fetchSchedules();
  }, [manageEditSchedule, page]);

  async function fetchSchedule2() {
    const response = await axios.get(`http://localhost:3001/api/schedulesPaging/get?page=${page}&limit=${100}&q=${searchQuery}`);
    const schedulesData = response.data.items;
    setPage(response.data.pagination.pageNum)
    setPageCount(response.data.pagination.pageCount)
    setSchedules(schedulesData);
  }

  async function fetchSchedules() {
    const response = await axios.get(`http://localhost:3001/api/schedulesPaging/get?page=${page}&limit=${3}`);
    const schedulesData = response.data.items;
    setPage(response.data.pagination.pageNum)
    setPageCount(response.data.pagination.pageCount)
    setSchedules(schedulesData);
  }

  useEffect(() => {
    async function fecthScheduleList() {
      try {
        const requestUrl = "http://localhost:3001/api/schedule/get";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        setScheduleList(responseJSON);
      } catch (error) {
        console.log("Failed");
      }
    }
    fecthScheduleList();
  }, []);

  const handleSearch = () => {
    fetchSchedule2();
  }

  const handleReset = () => {
    fetchSchedules();
    setSearchQuery('');
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

  //Add Schedule

  const handleOpen = (event, schedule) => {
    setOpenModal(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await addSchedule({ schedulename, startTime, endTime })
      if (response) {
        toast.success("Add New Slot Succesfully!")
      } else {
        toast.error("Fail to add new Slot...")
      }
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Fail to add new Slot...")
    }
  }

  const handleClose = () => {
    setOpenModal(false);
  }

  const handleStartTimeChange = (moment) => {
    setStartTime(moment.format('hh:mm A'));
  };

  const handleEndTimeChange = (moment) => {
    setEndTime(moment.format('hh:mm A'));
  };

  //Update Schedule
  const handleOpens = (event, schedules) => {
    setSelectedSchedules(schedules);
    setSchedule(schedules);

    const startTimeAsDate = dayjs(schedules.startTime, "h:mm A").toDate();
    const adapStartTime = adapter.date(startTimeAsDate);

    const endTimeAsDate = dayjs(schedules.endTime, "h:mm A").toDate();
    const adapEndTime = adapter.date(endTimeAsDate);

    setSchedulenames(schedules.schedulename);
    setStartTimes(adapStartTime);
    setEndTimes(adapEndTime);

    setOpenModals(true);
  }

  const handleSubmits = async () => {
    try {

      const stringStartTime = startTimes.format("hh:mm A");
      const stringEndTime = endTimes.format("hh:mm A");
      const updateScheduleData = {
        ...selectedSchedules,
        _id: selectedSchedules._id,
        schedulename: schedulenames,
        startTime: stringStartTime,
        endTime: stringEndTime,
      };
      const scheduleResponse = await updateSchedule(updateScheduleData);
      if (scheduleResponse && scheduleResponse.data) {
        setManageEditSchedule(selectedSchedules);
        const updatedSchedules = schedules.map((scheduleItem) =>
          scheduleItem._id === scheduleResponse.data._id ? scheduleResponse.data : scheduleItem
        );
        setSchedule(updatedSchedules);
        toast.success(`${scheduleResponse.data.data.schedulename} update successful`);
      } else {
        toast.error("Fail to update Slot...")
      }
      setOpenModals(false);
    } catch (error) {
      console.log(error);
      toast.error("Fail to update Slot...")
    }
  }

  const handleCloses = () => {
    setOpenModals(false);
  }

  const handleStartTimeChanges = (event) => {
    setStartTimes(event);
  };

  const handleEndTimeChanges = (event) => {
    setEndTimes(event);
  };

  return (
    <div>
      <Container>
        <Toaster position="top-center" reverseOrder={false} />

        <TableContainer component={Paper}>
          <div
            style={{ float: "right", marginTop: "15px", marginRight: "10px", marginBottom: '1em' }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={(event) => handleOpen(event)}
            >
              Add new Slot
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
                <TableCell style={{ textAlign: "center" }}>Slot Name</TableCell>
                <TableCell style={{ textAlign: "center" }}>Start Time</TableCell>
                <TableCell style={{ textAlign: "center" }}>End Time</TableCell>
                <TableCell style={{ textAlign: "center" }}>Status</TableCell>
                <TableCell style={{ textAlign: "center" }}>Disable-Enable</TableCell>
                <TableCell style={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((scheduleItem, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: "center" }}>
                    {scheduleItem.schedulename}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {scheduleItem.startTime}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {scheduleItem.endTime}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={scheduleItem.status}
                      onChange={(event) => handleToggle(event, scheduleItem)}
                      color={scheduleItem.status ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <StatusButton status={scheduleItem.status} />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(event) => handleOpens(event, scheduleItem)}
                      style={{ fontSize: "10px", backgroundColor: "orange", color: "#fff" }}
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Paper style={{ width: "400px", padding: "2em", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", textAlign: "center" }} elevation={3}>
                <h3 style={{ marginBottom: "1em", fontSize: "1.5em", fontWeight: "bold" }}>
                  Confirmation
                </h3>
                <p>Are you sure you want to change the status of this Slot?</p>
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
        <Modal
          open={openModal}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={openModal}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Paper style={{ width: "400px", padding: "2em", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", textAlign: "center" }} elevation={3}>
                <h3 style={{ marginBottom: "1em", fontSize: "1.5em", fontWeight: "bold" }}>
                  Add Slot
                </h3>
                <Toaster position="top-center"></Toaster>
                <TextField
                  label="Slot Name"
                  type="text"
                  name="schedule"
                  value={schedulename}
                  onChange={(event) => setSchedulename(event.target.value)}
                  required
                  style={{ width: 250 }}
                />

                <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginRight: '10em' }}>Start Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <TimePicker
                      ampm={true}
                      value={startTime}
                      onChange={handleStartTimeChange}
                      inputFormat="hh:mm A"
                      inputProps={{ style: { width: '100%', padding: '5px', border: '1px solid #ccc' } }}

                    />

                  </LocalizationProvider>
                </div>

                <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginRight: '10em' }}>End Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <TimePicker
                      ampm={true}
                      value={endTime}
                      onChange={handleEndTimeChange}
                      inputFormat="hh:mm A"
                      inputProps={{ style: { width: '100%', padding: '5px', border: '1px solid #ccc' } }}

                    />
                  </LocalizationProvider>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
                  <Button variant="contained" onClick={handleSubmit} style={{ marginRight: "1rem", backgroundColor: "black" }}>
                    Confirm
                  </Button>
                  <Button variant="outlined" onClick={handleClose} style={{ backgroundColor: "#fff", color: "#000", border: "2px solid #000" }}>
                    Cancel
                  </Button>
                </div>
              </Paper>
            </div>
          </Fade>
        </Modal>
        <Modal
          open={openModals}
          onClose={handleCloses}
          closeAfterTransition
        >
          <Fade in={openModals}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Paper style={{ width: "400px", padding: "2em", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", textAlign: "center" }} elevation={3}>
                <h3 style={{ marginBottom: "1em", fontSize: "1.5em", fontWeight: "bold" }}>
                  Update Slot
                </h3>
                <Toaster position="top-center"></Toaster>
                <TextField
                  label="Slot Name"
                  type="text"
                  name="schedule"
                  value={schedulenames}
                  onChange={(event) => setSchedulenames(event.target.value)}
                  required
                  style={{ width: 260 }}
                />

                <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginRight: '10em' }}>Start Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      ampm={true}
                      value={startTimes}
                      onChange={handleStartTimeChanges}
                      inputFormat="hh:mm A"
                      inputProps={{
                        style: {
                          width: "100%",
                          padding: "5px",
                          border: "1px solid #ccc",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginRight: '10em' }}>End Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      ampm={true}
                      value={endTimes}
                      onChange={handleEndTimeChanges}
                      inputFormat="hh:mm A"
                      inputProps={{
                        style: {
                          width: "100%",
                          padding: "5px",
                          border: "1px solid #ccc",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
                  <Button variant="contained" onClick={handleSubmits} style={{ marginRight: "1rem", backgroundColor: "black" }}>
                    Confirm
                  </Button>
                  <Button variant="outlined" onClick={handleCloses} style={{ backgroundColor: "#fff", color: "#000", border: "2px solid #000" }}>
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

export default ManageSchedule;