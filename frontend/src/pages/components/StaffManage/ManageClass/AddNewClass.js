
import { useState, useEffect } from "react";
import { Container, TextField, Autocomplete, MenuItem } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import axios from "axios";
import { addClass } from "../../../../helper/classAPI";
import { Toaster, toast } from "react-hot-toast";

function AddNewClass() {
    const [classname, setClassname] = useState("");
    const [scheduleList, setScheduleList] = useState("");
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [courseList, setCourseList] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [instructorList, setInstructorList] = useState("");
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [days, setDays] = useState([]);
    // Thêm các trạng thái khác nếu cần thiết



    const handleSubmit = async (event) => {
        event.preventDefault();
        // Gửi yêu cầu POST để thêm lớp học mới
        try {
            const temp = [days]
            console.log(temp);
            const scheduleId = selectedSchedule ? selectedSchedule._id : null;
            const courseId = selectedCourse ? selectedCourse._id : null;
            const instructorId = selectedInstructor ? selectedInstructor._id : null;
            const response = await addClass({
                classname,
                schedule_id: scheduleId,
                course_id: courseId,
                instructor_id: instructorId,
                days: [days]
            })
            if (response) {
                // Lớp học được thêm thành công
                // Chuyển hướng người dùng đến trang quản lý lớp học
                toast.success("Add New Class Succesfully!")
            } else {
                // Xử lý lỗi khi không thêm được lớp học
                toast.error("Fail to add new Class...")
            }
        } catch (error) {
            console.log(error);
            toast.error("Fail to add new Class...")
        }
    };

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

    return (
        <div>
            <Header />
            <Container>
                <Toaster position="top-center"></Toaster>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px', marginTop: '20px' }}>Add New Class</h1>
                    <form onSubmit={handleSubmit}>
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

                        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>Update Class</button>
                    </form>
                </div>
            </Container>

            <Footer />
        </div>

    );
}

export default AddNewClass;
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
