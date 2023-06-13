import { useEffect, useState } from "react";
import { Container, TextField, Button, Select, Menu, MenuItem } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link, useParams } from "react-router-dom";
import { getCourse, updateCourse } from "../../../../helper/courseAPI";

function UpdateCourse() {
    const [course, setCourse] = useState({});
    const courseId = useParams();
    const [coursename, setCoursename] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [willLearn, setWillLearn] = useState("");
    const [requirement, setRequirement] = useState("");
    const [forWho, setForWho] = useState("");
    const [semester_id, setSemesterId] = useState("");
    const [status, setStatus] = useState(false);
    const [images, setImages] = useState([])

    useEffect(() => {
        fetchCourses();
    }, []);

    async function fetchCourses() {
        try {
            const response = await getCourse();
            const course = response.data.find((obj) => obj._id === courseId.id);

            setCourse(course);

            // Set initial values for the input fields
            setCoursename(course.coursename);
            setDescription(course.description);
            setPrice(course.price);
            setWillLearn(course.willLearn);
            setRequirement(course.requirement);
            setForWho(course.forWho);
            setSemesterId(course.semester_id);
            setImages(course.images)
            setStatus(course.status);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await updateCourse({
                _id: courseId.id,
                coursename: coursename,
                description: description,
                price: price,
                willLearn: willLearn,
                requirement: requirement,
                forWho: forWho,
                semester_id: semester_id,
                images,
                status: status,
            });
            if (response) {
                alert("Course updated successfully!");
            } else {
                alert("Failed to update course");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Header />
            <Container maxWidth="md" sx={styles.container}>
                <form onSubmit={handleSubmit} sx={styles.form}>
                    <TextField
                        label="Course Name"
                        type="text"
                        name="coursename"
                        value={coursename}
                        onChange={(event) => setCoursename(event.target.value)}
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="Description"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                        multiline
                        rows={4}
                        sx={styles.textField}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        name="price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="What you will learn"
                        type="text"
                        name="willLearn"
                        value={willLearn}
                        onChange={(event) => setWillLearn(event.target.value)}
                        required
                        multiline
                        rows={4}
                        sx={styles.textField}
                    />
                    <TextField
                        label="Requirements"
                        type="text"
                        name="requirement"
                        value={requirement}
                        onChange={(event) => setRequirement(event.target.value)}
                        required
                        multiline
                        rows={4}
                        sx={styles.textField}
                    />
                    <TextField
                        label="Who is this course for?"
                        type="text"
                        name="forWho"
                        value={forWho}
                        onChange={(event) => setForWho(event.target.value)}
                        required
                        multiline
                        rows={4}
                        sx={styles.textField}
                    />
                    <TextField
                        label="Semester ID"
                        type="text"
                        name="semester_id"
                        value={semester_id}
                        onChange={(event) => setSemesterId(event.target.value)}
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="For images"
                        type="text"
                        value={images}
                        onChange={(e) => setImages(e.target.value)}
                        fullWidth
                        required
                        sx={styles.textField}
                    />
                    <div sx={styles.textField}>Status</div>
                    <Select
                        label="Status"
                        name="status"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        required
                    // sx={styles.textField}
                    >
                        <MenuItem value={status}>Active</MenuItem>
                        <MenuItem value={status}>Inactive</MenuItem>
                    </Select>
                    <Button type="submit" variant="contained" sx={styles.button}>
                        Update Course
                    </Button>
                    <Link to="/managecourse" style={{ marginTop: '10px', float: 'right', backgroundColor: '#4CAF50', border: 'none', color: 'white', padding: '10px 20px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', cursor: 'pointer' }}>
                        Back
                    </Link>
                </form>
            </Container>
            <Footer />
        </>
    );
}

export default UpdateCourse;

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
