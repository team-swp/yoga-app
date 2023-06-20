import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSchedule, updateSchedule } from "../../../../helper/scheduleAPI";
import { Container, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Toaster, toast } from "react-hot-toast";

function ManageEditSchedule() {
    const [schedule, setSchedule] = useState({});
    const scheduleId = useParams();
    const [schedulename, setSchedulename] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [days, setDays] = useState([]);

    console.log(schedule);
    useEffect(() => {
        fetchSchedules();
    }, [scheduleId]);

    async function fetchSchedules() {
        try {
            const response = await getSchedule();
            const schedule = response.data.find((obj) => obj._id === scheduleId.id);


            setSchedule(schedule);

            // Set initial values for the input fields
            setSchedulename(schedule.schedulename);
            setStartTime(schedule.startTime);
            setEndTime(schedule.endTime);
            setDays(schedule.days);

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
        <>
            <Header />
            <Container maxWidth="md" sx={styles.container}>
                <Toaster position="top-center"></Toaster>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>Update Schedule</h1>
                </div>
                <form onSubmit={handleSubmit} sx={styles.form}>
                    <TextField
                        label="Schedule Name"
                        type="text"
                        name="schedule"
                        value={schedulename}
                        onChange={(event) => setSchedulename(event.target.value)}
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="Start Time"
                        type="text"
                        name="startTime"
                        value={startTime}
                        onChange={(event) => setStartTime(event.target.value)}
                        required
                        multiline
                        sx={styles.textField}
                    />
                    <TextField
                        label="End Time"
                        type="text"
                        name="endTime"
                        value={endTime}
                        onChange={(event) => setEndTime(event.target.value)}
                        required
                        multiline
                        sx={styles.textField}
                    />
                    <Button type="submit" variant="contained" sx={styles.button}>
                        Update Schedule
                    </Button>
                </form>
            </Container>
            <Footer />
        </>
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
        width: "100%",
    },
    button: {
        marginTop: "1rem",
        width: "100%",
    },
};
