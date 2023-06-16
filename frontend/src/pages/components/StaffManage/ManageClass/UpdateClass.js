import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClass, updateClass } from "../../../../helper/classAPI";
import { Container, TextField, Button } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { getSchedule } from "../../../../helper/scheduleAPI";
import { getCourse } from "../../../../helper/courseAPI";
import { getUser } from "../../../../helper/loginAPI";

function UpdateClass() {
    const [classes, setClasses] = useState({});
    const classesId = useParams();
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
            const classes = response.data.find((obj) => obj._id === classesId.id);
            setClasses(classes);

            // Set initial values for the input fields
            setClassname(classes.classname);
            if (classes.schedule_id) {
                const response = await getSchedule();
                const schedulename = response.data.find((obj) => obj._id === classes.schedule_id);
                setScheduleId(schedulename.schedulename);
            }
            if (classes.course_id) {
                const response = await getCourse();
                const coursename = response.data.find((obj) => obj._id === classes.course_id);
                setCourseId(coursename.coursename);
            }
            if (classes.instructor_id) {
                const id = classes.instructor_id;
                const response = await getUser({ id }); console.log(response.data);
                setInstructorId(response.data.username);
            }
            setStatus(classes.status);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await updateClass({
                _id: classesId.id,
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


