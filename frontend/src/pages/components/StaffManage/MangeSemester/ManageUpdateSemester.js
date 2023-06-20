import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSemester, updateSemester } from "../../../../helper/semesterAPI";
import { Container, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Toaster, toast } from "react-hot-toast";

function ManageUpdateSemester() {
    const [semester, setSemester] = useState({});
    const semesterId = useParams();
    const [semestername, setSemestername] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchSemester();
    }, [semesterId]);
    console.log(semester);

    async function fetchSemester() {
        try {
            const response = await getSemester();
            const semester = response.data.find((obj) => obj._id === semesterId.id);


            setSemester(semester); console.log(semester);

            // Set initial values for the input fields
            setSemestername(semester.semestername);
            setStartDate(semester.startDate);
            setEndDate(semester.endDate);
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


    return (
        <>
            <Header />
            <Container maxWidth="md" sx={styles.container}>
                <Toaster position="top-center"></Toaster>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>Update Semester</h1>
                </div>
                <form onSubmit={handleSubmit} sx={styles.form}>
                    <TextField
                        label="Semester Name"
                        type="text"
                        name="semester"
                        value={semestername}
                        onChange={(event) => setSemestername(event.target.value)}
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="Start Date"
                        type="text"
                        name="startDate"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        required
                        multiline
                        sx={styles.textField}
                    />
                    <TextField
                        label="End Date"
                        type="text"
                        name="endDate"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        required
                        multiline
                        sx={styles.textField}
                    />
                    <Button type="submit" variant="contained" sx={styles.button}>
                        Update Semester
                    </Button>
                </form>
            </Container>
            <Footer />
        </>
    );
}
export default ManageUpdateSemester;

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