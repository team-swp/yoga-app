
import { useEffect, useState } from "react";
import { Container, TableCell, Switch } from '@mui/material';
import { Link } from "react-router-dom";
import { updateSemester } from "../../../../helper/semesterAPI";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import styles from "./ManageSemester.css"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function ManageSemester() {
  const [semesters, setSemesters] = useState([]);
  const [manageUpdateSemester, setManageUpdateSemester] = useState({})
  const [value, setValue] = useState('')
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [statusValue, setStatusValue] = useState('');

  /////// update done//////////// 
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

  ////////////////////////////  chạy lại cái này để reset lại trang ////////////////////////////////////////////////
  async function fetchSemesters2() {
    const response = await axios.get(`http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${3}`)
    const semestersData = response.data.items;
    setPage(response.data.pagination.pageNum)
    setPageCount(response.data.pagination.pageCount)
    setSemesters(semestersData);
  }

  ////////////////////////////// cái này thì là khi update nó k bị load lại với page////////////////////////////
  async function fetchSemesters() {
    const response = await axios.get(`http://localhost:3001/api/semestersPaging/get?page=${page}&limit=${3}`)
    console.log(response.data.items);
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


  return (
    <div>
      <Container>
        <Toaster position="top-center" reverseOrder={false} />
        <div className={cx("text-end")}><Link to="/addnewsemester" className={cx("btn btn-primary")}>Add new Semester</Link></div>
        <table className="container">
          <thead>
            <tr>
              <td>Semester ID</td>
              <td>Semester Name</td>
              <td>Start Date</td>
              <td>End Date</td>
              <td>Status</td>
              <td>Action</td>
            </tr>

          </thead>
          <tbody>
            {semesters.map((semesterItem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{semesterItem.semestername}</td>
                <td>{semesterItem.startDate.split('T00:00:00.000Z')}</td>
                <td>{semesterItem.endDate.split('T00:00:00.000Z')}</td>
                <TableCell>
                  <Switch
                    checked={semesterItem.status}
                    onChange={(event) => handleToggle(event, semesterItem)}
                    color={semesterItem.status ? 'success' : 'error'}
                  />
                </TableCell>
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
        <footer style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <button
            disabled={page === 1}
            onClick={handlePrevious}
            style={{
              marginRight: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              backgroundColor: "#ccc",
              cursor: "pointer",
            }}
          >
            Previous
          </button>
          <select
            value={page}
            onChange={(event) => {
              setPage(event.target.value);

            }}
            style={{
              marginRight: "1rem",
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
          <button
            disabled={page == pageCount}
            onClick={handleNext}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              backgroundColor: "#ccc",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </footer>
      </Container >


    </div >
  );
}

export default ManageSemester;