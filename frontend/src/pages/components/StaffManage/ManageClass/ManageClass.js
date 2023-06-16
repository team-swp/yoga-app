<<<<<<< HEAD
import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import styles from "./ManageClass.css"
=======
import { useEffect, useState } from "react";
import styles from "./ManageClass.css";
>>>>>>> f84de0755a1dc8d3941db51ef52370bdf17d748f
import classNames from "classnames/bind";
import { Container, Switch, colors } from "@mui/material";
import { Link } from "react-router-dom";
import { getUser } from "../../../../helper/loginAPI";
import { getClass, updateClass } from "../../../../helper/classAPI";
const cx = classNames.bind(styles);
function ManageClass() {
<<<<<<< HEAD
    const [query, setQuery] = useState("")
    const [classList, setClassList] = useState([])
    const [scheduleList, setScheduleList] = useState([])
    const [courseList, setCourseList] = useState([]);
    const [instructorList, setInstructorList] = useState([]);
    const [updatedClass, setUpdatedClass] = useState({});
    const [classes, setClasses] = useState([]);
    const [showEnabled, setShowEnabled] = useState(true);
    const [showDisabled, setShowDisabled] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [updatedClassList, setUpdatedClassList] = useState([]);
=======
  const [query, setQuery] = useState("");
  const [classList, setClassList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [updatedClass, setUpdatedClass] = useState({});
  const [classes, setClasses] = useState([]);
>>>>>>> f84de0755a1dc8d3941db51ef52370bdf17d748f

  const classIformation = classList.concat.scheduleList;

<<<<<<< HEAD
    const handleToggle = async (event, classes) => {
        try {
            console.log(classes.classId, event.target.checked, 123);
            const response = await updateClass({ _id: classes.classId, status: event.target.checked });
            setUpdatedClassList([...updatedClassList, response]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        async function fetchClassList() {
            try {
                const requestUrl = 'http://localhost:3001/api/class/get'
                const response = await fetch(requestUrl)
                const responseJSON = await response.json()
                setClassList(responseJSON)

            } catch (error) {
                console.log('Failed')
            }
        }
        fetchClassList();

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




    const list = () => {
        let temp = [];
        for (var classes of classList) {
            let tempObject = {}
            for (let schedule of scheduleList) {
                if (classes.schedule_id === schedule._id) {
                    const schedulename = schedule.schedulename
                    const classId = classes._id
                    const classname = classes.classname
                    const courseId = classes.course_id
                    const instructorId = classes.instructor_id; // Thêm thông tin về id của Instructor
                    const instructor = instructorList.find((inst) => inst._id === instructorId)?.username; // Tìm kiếm thông tin về Instructor

                    const courseName = courseList.find((course) => course._id === courseId)?.coursename;


                    tempObject = Object.assign(tempObject, { schedulename })
                    tempObject = Object.assign(tempObject, { classId })
                    tempObject = Object.assign(tempObject, { classname })
                    tempObject = Object.assign(tempObject, { courseId: courseName })
                    tempObject = Object.assign(tempObject, { instructor: instructor })
                    temp.push(tempObject)
                }
            }

        }
        return temp
    }
    console.log(list());

    const filteredList = list().filter((classItem) => {
        if (showEnabled && showDisabled) {
            return true;
        } else if (showEnabled && !classItem.status) {
            return false;
        } else if (showDisabled && classItem.status) {
            return false;
        }
        return true;
    });

    const classesPerPage = 3;
    const pagesVisited = pageNumber * classesPerPage;

    const pageCount = Math.ceil(filteredList.length / classesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (<div>
        <Header />
        <div class="bg-gray-400">
            <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
                <h1 class="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
                    Manage Class
                </h1>
            </div>
        </div>
        <Container>

            <div className={cx("text-end")}>
                <Link to="/addnewclass" className={cx("btn btn-primary")}>Add new class</Link>
            </div>
            <div className="searchfilter">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <table className="container">
                <thead>
                    <tr>
                        <td>Class Id</td>
                        <td> Class Name</td>
                        <td> Schedule </td>
                        <td>Course</td>
                        <td>Intructor</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>

                </thead>
                <tbody>
                    {filteredList.slice(pagesVisited, pagesVisited + classesPerPage).filter((classItem) => {
                        return (
                            classItem.classname.toLowerCase().includes(query) ||
                            classItem.schedulename.toLowerCase().includes(query)
                        );
                    }).map((classItem, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{classItem.classname}</td>
                            <td>{classItem.schedulename}</td>
                            <td>{classItem.courseId}</td>
                            <td>{classItem.instructor}</td>
                            <td>
                                <Switch checked={updatedClassList.find((item) =>
                                    item._id === classItem.classId)?.status || classItem.status}
                                    onChange={(event) => handleToggle(event, classItem)} />
                            </td>
                            <Link
                                to={`/updateclass/${classItem.classId} `}
                                className={cx("btn btn-secondary")}
                                onClick={() => { console.log(classItem); }}
                            >
                                Update
                            </Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ margin: '20px', marginLeft: '70%', textAlign: 'center' }}>
                <span>Show Status</span>
                <div className={cx("filter")}>
                    <button
                        onClick={() => setShowEnabled(!showEnabled)}
                        className={cx("btn", { "btn-secondary": showEnabled, "btn-primary": !showEnabled })}
                        style={{ backgroundColor: 'red' }}
                    >
                        Disabled
                    </button>
                    <button
                        onClick={() => setShowDisabled(!showDisabled)}
                        className={cx("btn", { "btn-secondary": showDisabled, "btn-primary": !showDisabled })}
                        style={{ backgroundColor: 'green' }}
                    >
                        Enabled
                    </button>
                </div>
            </div>
            {
                pageCount > 0 &&
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination"}
                    previousLinkClassName={"previousBtn"}
                    nextLinkClassName={"nextBtn"}
                    disabledClassName={"disabled"}
                    activeClassName={"active"}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    forcePage={pageNumber}
                    disableInitialCallback={true}
                />
            }
        </Container>
        <Footer />
    </div>
    );
=======
  const handleToggle = async (events, classes) => {
    try {
      const updatedClassData = { ...classes, status: events.target.checked };
      const response = await updateClass(updatedClassData);
      if (response && response.data) {
        setUpdatedClass(response.data);
        const updatedClasses = classes.map((courseItem) =>
          courseItem._id === response.data._id ? response.data : courseItem
        );
        setClasses(updatedClasses);
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

    async function fecthScheduleList() {
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
    fecthScheduleList();
  }, []);

  const list = () => {
    let temp = [];
    for (var classes of classList) {
      let tempObject = {};
      for (let schedule of scheduleList) {
        if (classes.schedule_id === schedule._id) {
          const schedulename = schedule.schedulename;
          const classId = classes._id;
          const classname = classes.classname;
          const courseId = classes.course_id;
          const instructor = classes.instructor_id;
          tempObject = Object.assign(tempObject, { schedulename });
          tempObject = Object.assign(tempObject, { classId });
          tempObject = Object.assign(tempObject, { classname });
          tempObject = Object.assign(tempObject, { courseId });
          tempObject = Object.assign(tempObject, { instructor });
          temp.push(tempObject);
        }
      }
    }
    return temp;
  };
  console.log(list());
  return (
    <div>
      <Container>
        <div className={cx("text-end")}>
          <Link to="/addnewclass" className={cx("btn btn-primary")}>
            Add new class
          </Link>
        </div>
        <div className="searchfilter">
          <input
            type="text"
            placeholder="Search..."
            className="search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <table className="container">
          <thead>
            <tr>
              <td>Class Id</td>
              <td> Class Name</td>
              <td> Schedule </td>
              <td>Course</td>
              <td>Intructor</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {list()
              .filter((classItem) => {
                return (
                  classItem.classname.toLowerCase().includes(query) ||
                  classItem.schedulename.toLowerCase().includes(query)
                );
              })
              .map((classItem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{classItem.classname}</td>
                  <td>{classItem.schedulename}</td>
                  <td>{classItem.courseId}</td>
                  <td>{classItem.instructor}</td>
                  <td>
                    {!classItem.status ? "Disabled" : "Enabled"}
                    <Switch
                      checked={classItem.status}
                      onChange={(event) => handleToggle(event, classItem)}
                      color={classItem.status ? "error" : "error"}
                    />
                  </td>
                  <Link
                    to={`/updateclass/${classItem.classId} `}
                    className={cx("btn btn-secondary")}
                    onClick={() => {
                      console.log(classItem);
                    }}
                  >
                    Update
                  </Link>
                </tr>
              ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
>>>>>>> f84de0755a1dc8d3941db51ef52370bdf17d748f
}

export default ManageClass;
