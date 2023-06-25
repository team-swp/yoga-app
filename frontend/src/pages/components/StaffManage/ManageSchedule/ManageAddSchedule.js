import * as React from 'react';
import { useState } from "react";
import { Container, TextField } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { addSchedule } from "../../../../helper/scheduleAPI";
import { Toaster, toast } from "react-hot-toast";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function ManageAddSchedule() {
    const [schedulename, setSchedulename] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
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
            console.log(startTime);
            const response = await addSchedule({ schedulename, startTime, endTime })
            if (response) {
                // Lớp học được thêm thành công
                // Chuyển hướng người dùng đến trang quản lý lớp học
                toast.success("Add New Schedule Succesfully!")
            } else {
                // Xử lý lỗi khi không thêm được schedule
                toast.error("Fail to add new Schedule...")
            }
        } catch (error) {
            console.log(error);
            toast.error("Fail to add new Schedule...")
        }
    };

    return (
        <div>
            <Header />
            <Container>
                <Toaster position="top-center"></Toaster>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '2em', marginTop: "2em" }}>Add New Schedule</h1>
                    <form onSubmit={handleSubmit} style={{ width: 800 }}>
                        <TextField
                            label="Schedule Name"
                            type="text"
                            name="schedule"
                            value={schedulename}
                            onChange={(event) => setSchedulename(event.target.value)}
                            required
                            style={{ width: 530 }}
                        />
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Start Time:</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    ampm={true}
                                    value={startTime}
                                    onChange={handleStartTimeChange}
                                    inputFormat="hh:mm A"
                                    inputProps={{ style: { width: '100%', padding: '5px', border: '1px solid #ccc' } }}

                                />

                            </LocalizationProvider>
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>End Time:</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <TimePicker
                                    ampm={true}
                                    value={endTime}
                                    onChange={handleEndTimeChange}
                                    inputFormat="hh:mm A"
                                    inputProps={{ style: { width: '100%', padding: '5px', border: '1px solid #ccc' } }}

                                />
                            </LocalizationProvider>
                        </div>
                        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1em', marginBottom: '1em' }}>
                            Add Schedule
                        </button>
                    </form>
                </div>
            </Container>

            <Footer />
        </div>

    );
}

export default ManageAddSchedule;
