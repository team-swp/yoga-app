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
} from '@mui/material';
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
  const [semesterValue, setSemesterValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  useEffect(() => {
    fetchSemesters();
  }, [manageUpdateSemester, page]);

  const handleReset = () => {
    fetchSemester2();
    setStartDate('');
    setEndDate('');
    setValue('');
  };

  async function fetchSemester2() {
    const response = await axios.get(`http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${3}`);
    const semestersData = response.data.items;
    setPage(response.data.pagination.pageNum);
    setPageCount(response.data.pagination.pageCount);
    setSemesters(semestersData); console.log(semestersData);
  }

  async function fetchSemesters() {
    const response = await axios.get(url2);
    const semestersData = response.data.items;
    setPage(response.data.pagination.pageNum);
    setPageCount(response.data.pagination.pageCount);
    setSemesters(semestersData);
  }


  var url2 = null;
  if (value !== "" && semesterValue !== "" && statusValue !== "") {
    url2 = `http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${1000}&q=${value}&semestername=${semesterValue}&status=${statusValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue === "") {
    url2 = `http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${1000}&q=${value}`;
  } else if (value === "" && semesterValue !== "" && statusValue === "") {
    url2 = `http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${1000}&semestername=${semesterValue}`;
  } else if (value === "" && semesterValue === "" && statusValue !== "") {
    url2 = `http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${1000}&status=${statusValue}`;
  } else if (value !== "" && semesterValue !== "" && statusValue === "") {
    url2 = `http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${1000}&q=${value}&semestername=${semesterValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue !== "") {
    url2 = `http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${1000}&q=${value}&status=${statusValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue !== "") {
    url2 = `http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${1000}&q=${value}&status=${statusValue}`;
  } else if (value === "" && semesterValue !== "" && statusValue !== "") {
    url2 = `http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${1000}&semestername=${semesterValue}&status=${statusValue}`;
  } else {
    url2 = `http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${3}`;
  }


  var url = null;
  if (value !== "" && semesterValue !== "" && statusValue !== "") {
    url = `http://localhost:3001/api/semestersPaging/get?page=${1}&limit=${4}&q=${value}&semestername=${semesterValue}&status=${statusValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue === "") {
    url = `http://localhost:3001/api/semestersPaging/get?page=${1}&limit=${4}&q=${value}`;
  } else if (value === "" && semesterValue !== "" && statusValue === "") {
    url = `http://localhost:3001/api/semestersPaging/get?page=${1}&limit=${4}&semestername=${semesterValue}`;
  } else if (value === "" && semesterValue === "" && statusValue !== "") {
    url = `http://localhost:3001/api/semestersPaging/get?page=${1}&limit=${4}&status=${statusValue}`;
  } else if (value !== "" && semesterValue !== "" && statusValue === "") {
    url = `http://localhost:3001/api/semestersPaging/get?page=${1}&limit=${4}&q=${value}&semestername=${semesterValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue !== "") {
    url = `http://localhost:3001/api/semestersPaging/get?page=${1}&limit=${4}&q=${value}&status=${statusValue}`;
  } else if (value !== "" && semesterValue === "" && statusValue !== "") {
    url = `http://localhost:3001/api/semestersPaging/get?page=${1}&limit=${4}&q=${value}&status=${statusValue}`;
  } else if (value === "" && semesterValue !== "" && statusValue !== "") {
    url = `http://localhost:3001/api/semestersPaging/get?page=${1}&limit=${4}&semestername=${semesterValue}&status=${statusValue}`;
  } else {
    url = `http://localhost:3001/api/semestersPaging/get?page=${1}&limit=${4}&q=${value}&semestername=${semesterValue}&status=${statusValue}`;
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
              to="/addnewclass"
            >
              Add new Semester
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