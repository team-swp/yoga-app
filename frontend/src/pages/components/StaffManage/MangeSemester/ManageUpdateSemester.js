import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSemester, updateSemester } from "../../../../helper/semesterAPI";
import {
    Container,
    TextField,
    Button,

} from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Toaster, toast } from "react-hot-toast";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";

function ManageUpdateSemester() {
    const [semester, setSemester] = useState({});
    const semesterId = useParams();
    const [semestername, setSemestername] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate()

    const handleBack = () => {
        navigate("/staffmanage")
    }

    useEffect(() => {
        fetchSemester();
    }, [semesterId]);

    async function fetchSemester() {
        try {
            const response = await getSemester();
            const semester = response.data.find((obj) => obj._id === semesterId.id);


            setSemester(semester);
            // Set initial values for the input fields
            setSemestername(semester.semestername);
            // setStartDate(semester.startDate);
            // setEndDate(semester.endDate);
            setStatus(semester.status);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await updateSemester({
                _id: semesterId.id,
                semestername: semestername,
                startDate: startDate,
                endDate: endDate,
                status: status,
            });
            if (response) {
                toast.success(" Updated successfully!");
            } else {
                toast.error("Failed to update...");
            }
        } catch (error) {
            toast.error("Failed to update...", error);
        }
    }

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndtDateChange = (date) => {
        setEndDate(date);
    };


    return (
        <>
            <Header />
            <Container>
                <Toaster position="top-center"></Toaster>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px', marginTop: '1em' }}>Update Semester</h1>
                </div>
                <form onSubmit={handleSubmit} style={{ marginLeft: '39%' }}>
                    <TextField
                        label="Semester Name"
                        type="text"
                        name="semester"
                        value={semestername}
                        onChange={(event) => setSemestername(event.target.value)}
                        required
                        style={{ width: 250 }}
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
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginBottom: '1em', marginTop: '1em' }}>
                        Update Semester
                    </Button>
                    <Button
                        onClick={handleBack}
                        style={{
                            marginBlock: "20px",
                            float: "right",
                            backgroundColor: "grey",
                            border: "none",
                            color: "white",
                            padding: "10px 20px",
                            textAlign: "center",
                            textDecoration: "none",
                            display: "inline-block",
                            fontSize: "10px",
                            cursor: "pointer",
                        }}
                    >
                        Back
                    </Button>
                </form>
            </Container>
            <Footer />
        </>
    );
}
export default ManageUpdateSemester;