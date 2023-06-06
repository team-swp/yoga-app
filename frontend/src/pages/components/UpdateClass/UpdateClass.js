import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClass, updateClass } from "../../../helper/classAPI";
import { Container, TextField, Button } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function UpdateClass() {
    const [classes, setClasses] = useState({});
    const classId = useParams();
    const [classname, setClassname] = useState("");
    const [scheduleId, setScheduleId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [instructorId, setInstructorId] = useState("");
    const [status, setStatus] = useState(false);

    useEffect(() => {
        fetchClasses();
    }, []);

    async function fetchClasses() {
        try {
            const response = await getClass();
            const classes = response.data.filter((obj) => obj._id === classId.id);
            console.log(classId);
            setClasses(classes);

            // Set initial values for the input fields
            setClassname(classes.classname);
            setScheduleId(classes.scheduleId);
            setCourseId(classes.courseId);
            setInstructorId(classes.instructorId);
            setStatus(classes.status);
            console.log(classes);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await updateClass({
                _id: classId.id,
                classname: classname,
                scheduleId: scheduleId,
                courseId: courseId,
                instructorId: instructorId,
                status: status,
            });
            if (response) {
                alert("Class updated successfully!");
            } else {
                alert("Failed to update class");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Header />
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>Update Class</h1>
            </div>
            <Container maxWidth="md" sx={styles.container}>
                <form onSubmit={handleSubmit} sx={styles.form}>
                    <TextField
                        label="Class Name"
                        type="text"
                        name="classname"
                        value={classname}
                        onChange={(event) => setClassname(event.target.value)}
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="Schedule ID"
                        type="text"
                        name="scheduleId"
                        value={scheduleId}
                        onChange={(event) => setScheduleId(event.target.value)}
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="Course ID"
                        type="text"
                        name="courseId"
                        value={courseId}
                        onChange={(event) => setCourseId(event.target.value)}
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="Intructor ID"
                        type="text"
                        name="instructorId"
                        value={instructorId}
                        onChange={(event) => setInstructorId(event.target.value)}
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="Status"
                        type="checkbox"
                        name="status"
                        checked={status}
                        onChange={(event) => setStatus(event.target.checked)}
                        sx={styles.textField}
                    />
                    <Button type="submit" variant="contained" sx={styles.button}>
                        Update Course
                    </Button>
                </form>
            </Container>
            <Footer />
        </>
    );
}

export default UpdateClass;

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


