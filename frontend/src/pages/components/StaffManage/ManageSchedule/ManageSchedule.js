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
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { updateSchedule } from "../../../../helper/scheduleAPI";
import StatusButton from "./StatusButons";
import axios from "axios";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import { getClass, updateClass } from "../../../../helper/classAPI";



function ManageSchedule() {
  const [classs, setClasss] = useState([])
  const [scheduleList, setScheduleList] = useState()
  const [schedules, setSchedules] = useState([]);
  const [manageEditSchedule, setManageEditSchedule] = useState({})
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);



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
            console.log('No class found with the updated schedule');
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
              component={Link}
              to="/addnewschedule"
            >
              Add new Schedule
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
                <TableCell style={{ textAlign: "center" }}>Schedule Name</TableCell>
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
                      component={Link}
                      to={`/updateschedule/${scheduleItem._id}`}
                      variant="contained"
                      color="secondary"
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
                <p>Are you sure you want to change the status of this Schedule?</p>
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

export default ManageSchedule;