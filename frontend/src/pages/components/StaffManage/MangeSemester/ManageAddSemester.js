import { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { addSemester } from "../../../../helper/semesterAPI";
import { Toaster, toast } from "react-hot-toast";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function ManageAddSemester() {
    const [semestername, setSemestername] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // Thêm các trạng thái khác nếu cần thiết

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Gửi yêu cầu POST để thêm semester
        try {
            const response = await addSemester({ semestername, startDate, endDate })
            if (response) {
                // Semester được thêm thành công
                toast.success("Add new Semester successfully!")
            } else {
                // Xử lý lỗi khi không thêm được semester
                toast.error('Failed to add semester...');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to add semester...');
        }
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndtDateChange = (date) => {
        setEndDate(date);
    };

    return (
        <div>
            <Header />
            <Container>
                <Toaster position="top-center"></Toaster>
                <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginTop: '1em' }}>Add New Semester</h1>
                <form onSubmit={handleSubmit} style={{ marginLeft: '38%' }}>
                    <TextField
                        label="Semester Name"
                        type="text"
                        value={semestername}
                        onChange={(e) => setSemestername(e.target.value)}
                        fullWidth
                        required
                        style={{ width: '250px' }}
                    />
                    <div style={{ marginTop: '1em' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                inputFormat="MM/DD/YYYY"
                                animateYearScrolling
                                fullWidth
                                required
                            />
                        </LocalizationProvider>
                    </div>
                    <div style={{ marginTop: '1em' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} locale="en" >
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={handleEndtDateChange}
                                inputFormat="MM/DD/YYYY"
                                animateYearScrolling
                                fullWidth
                                required
                            />
                        </LocalizationProvider>
                    </div>
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginBottom: '1em', marginTop: '1em' }}>Add Semester</Button>
                </form>
            </Container>

            <Footer />
        </div>

    );
}

export default ManageAddSemester;