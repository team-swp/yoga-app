
import { useEffect, useState } from "react"
import styles from "./ManageClass.css"
import classNames from "classnames/bind";
import { Container } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { getUser } from '../../../helper/loginAPI'
const cx = classNames.bind(styles);
function ManageClass() {

    const [classList, setClassList] = useState([])
    const [scheduleList, setScheduleList] = useState([])

    const classIformation = classList.concat.scheduleList
    // useEffect(() => {
    //     const fecthData = getClass()
    //     fecthData.then((dataApi) => {
    //         setData(dataApi.data)

    //     })
    // }, [])

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

    // useEffect(() => {

    //     return fecthScheduleList

    // }, [])



    const list = () => {
        let temp = [];
        for (var classes of classList) {
            // const classInstruc = await classes.instructor_id
            // const instructor = getUser({ classInstruc })
            let tempObject = {}
            for (let schedule of scheduleList) {
                if (classes.schedule_id === schedule._id) {
                    // const classInstruc = classes.instructor_id
                    // const instructorName = await getUser({ classInstruc })

                    const schedulename = schedule.schedulename
                    const classId = classes._id
                    const classname = classes.classname
                    const courseId = classes.course_id
                    const instructor = classes.username
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
            <div className={cx("text-end")}><Link to="/addnewclass" className={cx("btn btn-primary")}>Add new class</Link></div>
            <table className="container">
                <thead>
                    <tr>
                        <td>Class Id</td>
                        <td> Class Name</td>
                        <td> Schedule </td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>

                </thead>
                <tbody>
                    {list().map((classItem, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{classItem.classname}</td>
                            <td>{classItem.schedulename}</td>
                            <td>{classItem.status ? 'Active' : 'Inactive'}</td>
                            <Link
                                to={`/updateclass/${classItem._id}`}
                                className={cx("btn btn-secondary")}
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