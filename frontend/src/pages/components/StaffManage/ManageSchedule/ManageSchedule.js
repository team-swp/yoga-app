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
} from "@mui/material";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { updateSchedule } from "../../../../helper/scheduleAPI";
import StatusButton from "./StatusButons";
import axios from "axios";


function ManageSchedule() {
  const [scheduleList, setScheduleList] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [manageEditSchedule, setManageEditSchedule] = useState({})

  useEffect(() => {
    async function fecthScheduleList() {
      try {
        const requestUrl = "http://localhost:3001/api/schedule/get";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);
        setScheduleList(responseJSON);
      } catch (error) {
        console.log("Failed");
      }
    }
    fecthScheduleList();
  }, []);

  const handleToggle = async (event, schedule) => {
    try {
      const updatedScheduleData = { ...schedule, status: event.target.checked };
      const response = await updateSchedule(updatedScheduleData);
      if (response && response.data) {
        console.log(response.data.data.schedulename);
        setManageEditSchedule(schedules);
        const updateSchedules = schedules.map((scheduleItem) =>
          scheduleItem._id === response.data._id ? response.data : scheduleItem,
          toast.success(`${response.data.data.schedulename} status updated success`)
        );
        setSchedules(updateSchedules);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [manageEditSchedule, page]);

  async function fetchSchedules() {
    const response = await axios.get(`http://localhost:3001/api/schedulesPaging/get?page=${page}`);
    const schedulesData = response.data.items;
    setPage(response.data.pagination.pageNum)
    setPageCount(response.data.pagination.pageCount)
    setSchedules(schedulesData);
  }

  return (
    <div>
      <Container>
        <Toaster position="top-center" reverseOrder={false} />

        <TableContainer component={Paper}>
          <div
            style={{ float: "right", marginTop: "15px", marginRight: "10px" }}
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
              {scheduleList.map((scheduleItem, index) => (
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
                      tyle={{ fontSize: "10px", backgroundColor: 'orange' }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default ManageSchedule;
