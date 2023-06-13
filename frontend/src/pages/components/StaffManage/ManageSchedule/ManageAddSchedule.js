
import { useState } from "react";
import { Container } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { addSchedule } from "../../../../helper/scheduleAPI";
import Datetime from 'react-datetime';

function ManageAddSchedule() {
    const [schedulename, setSchedulename] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [days, setDays] = useState([]);
    const [status, setStatus] = useState(false)
    // Thêm các trạng thái khác nếu cần thiết

    const handleStartTimeChange = (moment) => {
        setStartTime(moment.format('hh:mm A'));
    };

    const handleEndTimeChange = (moment) => {
        setEndTime(moment.format('hh:mm A'));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Gửi yêu cầu POST để thêm lớp học mới
        try {
            const temp = [days]
            console.log(temp);
            const response = await addSchedule({ schedulename, startTime, endTime, days: [days] })
            if (response) {
                // Lớp học được thêm thành công
                // Chuyển hướng người dùng đến trang quản lý lớp học
                alert("Add New Schedule Succesfully")
            } else {
                // Xử lý lỗi khi không thêm được schedule
                console.log('Failed to add schedule');
            }
        } catch (error) {
            console.log('Failed to add schedule:', error);
        }
    };

    return (
        <div>
            <Header />
            <Container>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>Add New Schedule</h1>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Schedule Name:</label>
                            <input
                                type="text"
                                value={schedulename}
                                onChange={(e) => setSchedulename(e.target.value)}
                                style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Start Time:</label>
                            <Datetime
                                dateFormat={false}
                                timeFormat="hh:mm A"
                                value={startTime}
                                onChange={handleStartTimeChange}
                                inputProps={{ style: { width: '100%', padding: '5px', border: '1px solid #ccc' } }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>End Time:</label>
                            <Datetime
                                dateFormat={false}
                                timeFormat="hh:mm A"
                                value={endTime}
                                onChange={handleEndTimeChange}
                                inputProps={{ style: { width: '100%', padding: '5px', border: '1px solid #ccc' } }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Day of the week:</label>
                            <select
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}
                            >
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Status:</label>
                            <input
                                type="checkbox"
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                            />
                        </div>
                        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>Add Schedule</button>
                    </form>
                </div>
            </Container>

            <Footer />
        </div>

    );
}

export default ManageAddSchedule;
