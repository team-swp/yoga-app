<<<<<<< .merge_file_fbivF9
import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
=======
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
} from '@mui/material';
>>>>>>> .merge_file_7gj8k8
import { Link } from "react-router-dom";
import { updateSemester } from "../../../../helper/semesterAPI";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import StatusButton from "./StatusButtons";

function ManageSemester() {
  const [semesters, setSemesters] = useState([]);
  const [manageUpdateSemester, setManageUpdateSemester] = useState({})
  const [value, setValue] = useState('')
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [statusValue, setStatusValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

<<<<<<< .merge_file_fbivF9
=======
  const handleToggle = async (event, semester) => {
    try {
      const updatedSemesterData = { ...semester, status: event.target.checked };
      const response = await updateSemester(updatedSemesterData);
      if (response && response.data) {
        console.log(response.data.data.semestername);
        setManageUpdateSemester(semesters);
        const manageUpdateSemester = semesters.map((semesterItem) =>
          semesterItem._id === response.data._id ? response.data : semesterItem,
          toast.success(`${response.data.data.semestername} status updated success`)
        );
        setSemesters(manageUpdateSemester);
      }
    } catch (error) {
      console.error(error);
    }
  };

>>>>>>> .merge_file_7gj8k8
  useEffect(() => {
    fetchSemesters();
  }, [manageUpdateSemester, page]);




  // useEffect(() => {
  //   async function fecthSemester() {
  //     try {
  //       const requestUrl = 'http://localhost:3001/api/semester/get'
  //       const response = await fetch(requestUrl)

  //       const responseJSON = await response.json()
  //       console.log(responseJSON);
  //       setSchedule(responseJSON)

  //     } catch (error) {
  //       console.log('Failed')
  //     }
  //   }
  //   fecthSemester();
  // }, [])

  //reset page//
  async function fetchSemesters2() {
    const response = await axios.get(`http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${3}`)
    const semestersData = response.data.items;
    setPage(response.data.pagination.pageNum)
    setPageCount(response.data.pagination.pageCount)
    setSemesters(semestersData);
  }

  //reset button//
  const handleReset = () => {
    fetchSemesters();
    setPage(1);
    setPageCount(0);
    setStartDate('');
    setEndDate('');
  }

  //update khong load lai trang//
  async function fetchSemesters(startDate = '', endDate = '') {
    const response = await axios.get(`http://localhost:3001/api/semestersPaging/get?page=${page}&limit=3&startDate=${startDate}&endDate=${endDate}`);
    const semestersData = response.data.items;
    setPage(response.data.pagination.pageNum)
    setPageCount(response.data.pagination.pageCount)
    setSemesters(semestersData);
  }

  /////////////////////// hàm reset này sẽ làm mới lại trang mà trả ô tìm kiếm bằng rỗng//////////////////////////////////
  // const handleReset = () => {
  //   fetchSemesters2()
  //   setSemesterValue("")
  //   setValue("")
  //   setStatusValue("")
  //   setPrice('')
  //   setPageCount(1)
  // }
  ///////////////////// đây là hàm search tìm kiếm///////////////////////////////////////////////
  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.get(`http://localhost:3001/api/coursesPaging/get?page=${1}&limit=${4}&q=${value}&semester=${semesterValue}&status=${statusValue}&price=${price}`)

  //     const semesterData = response.data.items;
  //     console.log(response.data);
  //     setPage(response.data.pagination.pageNum)
  //     setPageCount(response.data.pagination.pageCount)
  //     setCourses(semesterData);
  //   } catch (error) {
  //     toast.error('Not Found!!!')
  //   }
  // }

  /////////////////// handle việc next và prev trong page/////////////////////////

  const handleSearch = async (e) => {
    e.preventDefault();
    // Chuyển đổi giá trị startDate và endDate sang định dạng dd/mm/yyyy
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-GB');
    const formattedEndDate = new Date(endDate).toLocaleDateString('en-GB');

    console.log("formattedStartDate:", formattedStartDate);
    console.log("formattedEndDate:", formattedEndDate);

    try {
      await fetchSemesters(formattedStartDate, formattedEndDate);
      setStartDate('');
      setEndDate('');
    } catch (error) {
      toast.error('Not Found!!!')
    }
<<<<<<< .merge_file_fbivF9
    fecthSemesterList();
  }, []);
=======
  }

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
  //////////////////////////////////////////////////////////////////////////////////////

>>>>>>> .merge_file_7gj8k8

  return (
    <div>
      <Container>
<<<<<<< .merge_file_fbivF9
        <div className={cx("text-end")}>
          <Link to="/addnewsemester" className={cx("btn btn-primary")}>
            Add new Semester
          </Link>
        </div>
        <table className="container">
          <thead>
            <tr>
              <td>Semester ID</td>
              <td>Semester Name</td>
              <td>Start Date</td>
              <td>End Date</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {semesterList.map((semesterItem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{semesterItem.semestername}</td>
                <td>{semesterItem.startDate}</td>
                <td>{semesterItem.endDate}</td>
                <td>{semesterItem.status ? "Active" : "Inactive"}</td>
                <Link
                  to={`/updatesemester/${semesterItem._id}`}
                  className={cx("btn btn-secondary")}
                >
                  Update
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
=======
        <Toaster position="top-center" reverseOrder={false} />

        <TableContainer component={Paper}>
          <div
            style={{ float: "right", marginTop: "15px", marginRight: "10px" }}
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
          <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "800px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onSubmit={handleSearch}
          >
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="end-date"
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ marginLeft: "1rem" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginLeft: "1rem" }}>
              Search
            </Button>
            <Button
              style={{ marginLeft: "1rem" }}
              variant="outlined"
              onClick={handleReset}
            >
              Reset
            </Button>
          </form>

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
>>>>>>> .merge_file_7gj8k8
      </Container>


    </div >
  );
}

export default ManageSemester;