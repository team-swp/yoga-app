import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClass, updateClass } from "../../../../helper/classAPI";
import { Container, TextField, Button, MenuItem, Autocomplete } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import axios from "axios";
import { getSchedule } from "../../../../helper/scheduleAPI";
import { getCourse } from "../../../../helper/courseAPI";
import { getUser } from "../../../../helper/loginAPI";
import { Toaster, toast } from "react-hot-toast";

function UpdateClass() {
    const [classes, setClasses] = useState({});
    const classesId = useParams();
    const [classname, setClassname] = useState("");
    const [scheduleId, setScheduleId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [instructorId, setInstructorId] = useState("");
    const [scheduleList, setScheduleList] = useState("");
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [courseList, setCourseList] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [instructorList, setInstructorList] = useState("");
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [days, setDays] = useState([]);

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        async function fetchSchedule() {
            try {
                const response = await axios.get(
                    "http://localhost:3001/api/schedule/get"
                );
                const scheduleData = response.data;
                setScheduleList(scheduleData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSchedule();

        async function fetchCourse() {
            try {
                const response = await axios.get(
                    "http://localhost:3001/api/course/get"
                );
                const courseData = response.data;
                setCourseList(courseData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCourse();

        async function fetchInstructor() {
            try {
                const response = await axios.get(
                    "http://localhost:3001/api/accounts"
                );
                setInstructorList(response.data.filter((ins) => ins.role === "instructor"));
                console.log(setInstructorList);
            } catch (error) {
                console.error(error);
            }
        }

        fetchInstructor();
    }, []);

    async function fetchClasses() {
        try {
            const response = await getClass();
            const classes = response.data.find((obj) => obj._id === classesId.id);
            setClasses(classes)
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
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const temp = [days]
            console.log(temp);
            const scheduleId = selectedSchedule ? selectedSchedule._id : null;
            const courseId = selectedCourse ? selectedCourse._id : null;
            const instructorId = selectedInstructor ? selectedInstructor._id : null;
            const response = await updateClass({
                _id: classesId.id,
                classname,
                schedule_id: scheduleId,
                course_id: courseId,
                instructor_id: instructorId,
                days: [days],
            });
            if (response) {
                toast.success("Updated successfully!");
            } else {
                toast.error("Failed to update class...");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update class...");
        }
    }

    return (
        <>
            <Header />
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px', marginTop: '20px' }}>Update Class</h1>
            </div>
            <Container maxWidth="md" sx={styles.container}>
                <Toaster position="top-center"></Toaster>
                <form onSubmit={handleSubmit} sx={styles.form}>
                    <TextField
                        label="Class Name"
                        type="text"
                        value={classname}
                        onChange={(e) => setClassname(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: "10px" }}
                    />
                    <Autocomplete
                        value={selectedSchedule}
                        onChange={(event, newValue) => setSelectedSchedule(newValue)}
                        options={scheduleList}
                        getOptionLabel={(option) => option.schedulename}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Schedule"
                                type="text"
                                name="schedule_id"
                                required
                                sx={styles.textField}
                            />
                        )}
                    />
                    <Autocomplete
                        value={selectedCourse}
                        onChange={(event, newValue) => setSelectedCourse(newValue)}
                        options={courseList}
                        getOptionLabel={(option) => option.coursename}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Course"
                                type="text"
                                name="course_id"
                                required
                                sx={styles.textField}
                            />
                        )}
                    />
                    <Autocomplete
                        value={selectedInstructor}
                        onChange={(event, newValue) => setSelectedInstructor(newValue)}
                        options={instructorList}
                        getOptionLabel={(option) => option.username}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Instructor"
                                type="text"
                                name="instructor_id"
                                required
                                sx={styles.textField}
                            />
                        )}
                    />
                    <TextField
                        select
                        label="Day of the week"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        variant="outlined"
                        sx={styles.textField}
                    >
                        <MenuItem value="Monday">Monday</MenuItem>
                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                        <MenuItem value="Thursday">Thursday</MenuItem>
                        <MenuItem value="Friday">Friday</MenuItem>
                        <MenuItem value="Saturday">Saturday</MenuItem>
                        <MenuItem value="Sunday">Sunday</MenuItem>
                    </TextField>
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


