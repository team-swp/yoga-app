import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import styles from "./ManageSchedule.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ManageSchedule() {

    const [scheduleList, setScheduleList] = useState([])

    useEffect(() => {
        async function fecthScheduleList() {
            try {
                const requestUrl = 'http://localhost:3001/api/schedule/get'
                const response = await fetch(requestUrl)
                const responseJSON = await response.json()
                console.log(responseJSON)
                setScheduleList(responseJSON)
            } catch (error) {
                console.log('Failed')

            }
        }
        fecthScheduleList();

    }, [])


    return (<div>
        <Header />
        <div class="bg-gray-400">
            <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
                <h1 class="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
                    Manage Schedule
                </h1>
            </div>
        </div>
        <Container>
            <div className={cx("text-end")}><Link to="/addnewschedule" className={cx("btn btn-primary")}>Add new Schedule</Link></div>
            <table className="container">
                <thead>
                    <tr>
                        <td>Schedule Name</td>
                        <td>Start Time</td>
                        <td>End Time</td>
                        <td>Status</td>
                    </tr>

                </thead>
                <tbody>
                    {scheduleList.map((scheduleItem, index) => (
                        <tr key={index}>
                            <td>{scheduleItem.schedulename}</td>
                            <td>{scheduleItem.startTime}</td>
                            <td>{scheduleItem.endTime}</td>
                            <td>{scheduleItem.status ? 'Active' : 'Inactive'}</td>
                            <Link
                                to={`/updateschedule/${scheduleItem._id}`}
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

export default ManageSchedule;
