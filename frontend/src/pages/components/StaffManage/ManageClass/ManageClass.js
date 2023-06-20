import { Select, MenuItem, TextField, FormControl } from '@mui/material';

import { useEffect, useState } from "react";
import {
    Container,
    Switch,
} from '@mui/material';
import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { updateClass } from '../../../../helper/classAPI';
import classNames from "classnames/bind";
import styles from './ManageClass.css'

const cx = classNames.bind(styles);


function ManageClass() {
    const [classes, setClasses] = useState([]);
    const [updatedClass, setUpdatedClass] = useState({})
    const [classList, setClassList] = useState([])
    const [scheduleList, setScheduleList] = useState([])
    const [courseList, setCourseList] = useState([]);
    const [instructorList, setInstructorList] = useState([]);
    const [value, setValue] = useState('')
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [semesterValue, setSemesterValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [price, setPrice] = useState('')

    /////// update done//////////// 
    const handleToggle = async (event, classs) => {
        try {
            const updatedClassData = { ...classs, status: event.target.checked };
            const response = await updateClass(updatedClassData);
            if (response && response.data) {
                console.log(response.data.data.classname);
                setUpdatedClass(classes);
                const updatedClass = classes.map((classItem) =>
                    classItem._id === response.data._id ? response.data : classItem,
                    toast.success(`${response.data.data.classname} status updated success`)
                );
                setClasses(updatedClass);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, [updatedClass, page]);

    useEffect(() => {

        async function fecthClassList() {
            try {
                const requestUrl = 'http://localhost:3001/api/class/get'
                const response = await fetch(requestUrl)
                const responseJSON = await response.json()
                setClassList(responseJSON)

            } catch (error) {
                console.log('Failed')
            }
        }
        fecthClassList();

        async function fetchScheduleList() {
            try {
                const requestUrl = 'http://localhost:3001/api/schedule/get'
                const response = await fetch(requestUrl)
                const responseJSON = await response.json()
                console.log(responseJSON)
                setScheduleList(responseJSON)
                console.log(scheduleList)

            } catch (error) {
                console.log('Failed')
            }
        }
        fetchScheduleList();

        async function fetchCourseList() {
            try {
                const requestUrl = 'http://localhost:3001/api/course/get'
                const response = await fetch(requestUrl)
                const responseJSON = await response.json()
                setCourseList(responseJSON)
            } catch (error) {
                console.log('Failed')
            }
        }
        fetchCourseList();

        async function fetchInstructorList() {
            try {
                const requestUrl = 'http://localhost:3001/api/accounts'
                const response = await fetch(requestUrl)
                const responseJSON = await response.json()
                setInstructorList(responseJSON)
            } catch (error) {
                console.log('Failed')
            }
        }
        fetchInstructorList();
    }, [])

    ////////////////////////////  chạy lại cái này để reset lại trang ////////////////////////////////////////////////
    async function fetchClasses2() {
        const response = await axios.get(`http://localhost:3001/api/classesPaging/get?page=${page}&limit=${3}`)
        const classData = response.data.items;
        setPage(response.data.pagination.pageNum)
        setPageCount(response.data.pagination.pageCount)
        setClasses(classData);
    }
    ////////////////////////////// cái này thì là khi update nó k bị load lại với page////////////////////////////
    async function fetchClasses() {
        const response = await axios.get(`http://localhost:3001/api/classesPaging/get?page=${page}&limit=${3}`)
        const classData = response.data.items;
        setPage(response.data.pagination.pageNum)
        setPageCount(response.data.pagination.pageCount)
        setClasses(classData);
    }

    /////////////////////// hàm reset này sẽ làm mới lại trang mà trả ô tìm kiếm bằng rỗng//////////////////////////////////
    // const handleReset = () => {
    //   fetchCourses2()
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
                <div className={cx("text-end")}>
                    <Link to="/addnewclass" className={cx("btn btn-primary")}>Add new class</Link>
                </div>
                <table className="container">
                    <thead>
                        <tr>
                            <td>Class Id</td>
                            <td> Class Name</td>
                            <td> Schedule </td>
                            <td>Course</td>
                            <td>Intructor</td>
                            <td>Days</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>

                    </thead>
                    <tbody>
                        {classes.map((classItem, index) => {
                            const scheduleId = classItem.schedule_id;
                            const courseId = classItem.course_id;
                            const instructorId = classItem.instructor_id;
                            const scheduleName = scheduleList.find((schedule) => schedule._id === scheduleId)?.schedulename;
                            const courseName = courseList.find((course) => course._id === courseId)?.coursename;
                            const instructor = instructorList.find((inst) => inst._id === instructorId)?.username;

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{classItem.classname}</td>
                                    <td>{scheduleName}</td>
                                    <td>{courseName}</td>
                                    <td>{instructor}</td>
                                    <td>{classItem.days}</td>
                                    <td>
                                        <Switch
                                            checked={classItem.status}
                                            onChange={(event) => handleToggle(event, classItem)}
                                            color={classItem.status ? 'success' : 'error'}
                                        />
                                    </td>
                                    <Link
                                        to={`/updateclass/${classItem._id} `}
                                        className={cx("btn btn-secondary")}
                                        onClick={() => { console.log(classItem); }}
                                    >
                                        Update
                                    </Link>
                                </tr>
                            )
                        })}
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

export default ManageClass;