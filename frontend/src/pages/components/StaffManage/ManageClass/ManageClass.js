import { useEffect, useState } from "react"
import styles from "./ManageClass.css"
import classNames from "classnames/bind";
import { Container, Switch, colors } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import { getUser } from "../../../../helper/loginAPI";
import { updateClass } from "../../../../helper/classAPI";
const cx = classNames.bind(styles);
function ManageClass() {
    const [query, setQuery] = useState("")
    const [classList, setClassList] = useState([])
    const [scheduleList, setScheduleList] = useState([])
    const [updatedClass, setUpdatedClass] = useState({});
    const [classes, setClasses] = useState([]);

    const classIformation = classList.concat.scheduleList

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
                const requestUrl = 'http://localhost:3001/api/class/get'
                const response = await fetch(requestUrl)
                const responseJSON = await response.json()
                setClassList(responseJSON)

            } catch (error) {
                console.log('Failed')
            }
        }
        fecthClassList();

        async function fecthScheduleList() {
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
        fecthScheduleList();
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
                    const instructor = classes.instructor_id
                    tempObject = Object.assign(tempObject, { schedulename })
                    tempObject = Object.assign(tempObject, { classId })
                    tempObject = Object.assign(tempObject, { classname })
                    tempObject = Object.assign(tempObject, { courseId })
                    tempObject = Object.assign(tempObject, { instructor })
                    temp.push(tempObject)
                }
            }

        }
        return temp
    }
    console.log(list());
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
                    {list().filter((classItem) => {
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
                                {!classItem.status ? 'Disabled' : 'Enabled'}
                                <Switch

                                    checked={classItem.status}
                                    onChange={(event) => handleToggle(event, classItem)}
                                    color={classItem.status ? 'error' : 'error'}
                                /></td>
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
        </Container>
        <Footer />
    </div>



    );
}

export default ManageClass;