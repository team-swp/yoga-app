import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSchedule, updateSchedule } from "../../../../helper/scheduleAPI";
import { Container, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Toaster, toast } from "react-hot-toast";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function ManageEditSchedule() {
    const [schedule, setSchedule] = useState({});
    const scheduleId = useParams();
    const [schedulename, setSchedulename] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    console.log(schedule);
    useEffect(() => {
        fetchSchedules();
    }, [scheduleId]);

    const handleStartTimeChange = (moment) => {
        setStartTime(moment.format('hh:mm A'));
    };

    const handleEndTimeChange = (moment) => {
        setEndTime(moment.format('hh:mm A'));
    };

    async function fetchSchedules() {
        try {
            const response = await getSchedule();
            const schedule = response.data.find((obj) => obj._id === scheduleId.id);


            setSchedule(schedule);

            // Set initial values for the input fields
            setSchedulename(schedule.schedulename);
            setStartTime(schedule.startTime);
            setEndTime(schedule.endTime);

        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await updateSchedule({
                _id: scheduleId.id,
                schedulename: schedulename,
                startTime: startTime,
                endTime: endTime,
            });
            if (response) {
                toast.success("Updated successfully!");
            } else {
                toast.error("Failed to update Schedule...");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update Schedule...");
        }
    }


    return (
        <div>
            <Header />
            <Container>
                <Toaster position="top-center"></Toaster>
                <div style={{ maxWidth: '400px', margin: '0 auto', }}>
                    <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', margin: '1em' }}>Update Schedule</h1>
                    <form onSubmit={handleSubmit} style={{ width: 400, marginLeft: '4.3em' }}>
                        <TextField
                            label="Schedule Name"
                            type="text"
                            name="schedule"
                            value={schedulename}
                            onChange={(event) => setSchedulename(event.target.value)}
                            required
                            style={{ width: 260 }}
                        />

                        <div style={{ marginBottom: '10px', marginTop: '10px', width: '400px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Start Time:</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <TimePicker
                                    ampm={true}
                                    value={startTime}
                                    onChange={handleStartTimeChange}
                                    inputFormat="hh:mm A"
                                    inputProps={{ style: { width: '100%', padding: '5px', border: '1px solid #ccc' } }}

                                />

                            </LocalizationProvider>
                        </div>

                        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
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
                            Update Schedule
                        </button>
                    </form>
                </div>
            </Container>
            <Footer />
        </div>
    );
}
export default ManageEditSchedule;

const styles = {
    container: {
        marginTop: "2rem",
        marginBottom: "2rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    textField: {
        marginBottom: "1rem",
        width: "260px",
    },
    button: {
        marginTop: "1rem",
        width: "100%",
    },
};
