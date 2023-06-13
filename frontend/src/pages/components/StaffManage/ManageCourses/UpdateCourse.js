import { useEffect, useState } from "react";
<<<<<<< HEAD:frontend/src/pages/components/StaffManage/ManageCourses/UpdateCourse.js
import { Container, TextField, Button, Select, Menu, MenuItem } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link, useParams } from "react-router-dom";
import { getCourse, updateCourse } from "../../../../helper/courseAPI";
=======
import { Container, TextField, Button, Select, Menu, MenuItem, FormGroup, FormControl, FormLabel, FormControlLabel, Checkbox, CircularProgress, Typography } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link, useParams } from "react-router-dom";
import { getCourse, updateCourse } from "../../../helper/courseAPI";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
>>>>>>> ef9cf68ab873de8c8f3c8c9e4266e802db3001f6:frontend/src/pages/components/UpdateCourse/UpdateCourse.js

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
    const [videos, setVideos] = useState([])
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);
        setUpdateSuccess(false);

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
                videos,
                images,

            });

            if (response) {
                setUpdateSuccess(true);
                setTimeout(() => {
                    setUpdateSuccess(false);
                }, 3000);
            } else {
                setErrorMessage("Failed to update course");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Error occurred while updating the course. Please try again later.");
        }

        setIsSubmitting(false);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getCourse();
                const course = response.data.find((obj) => obj._id === courseId.id);

                setCourse(course);
                setCoursename(course.coursename);
                setDescription(course.description);
                setPrice(course.price);
                setWillLearn(course.willLearn);
                setRequirement(course.requirement);
                setForWho(course.forWho);
                setSemesterId(course.semester_id);
                setImages(course.images)
                setVideos(course.videos)

            } catch (error) {
                console.error(error);
                setErrorMessage("Error occurred while fetching the course details. Please try again later.");
            }
        };

        fetchCourses();
    }, []);



    return (
        <>
            <Header />

            <Container maxWidth="md" sx={styles.container}>
                <div style={{ textAlign: 'center', position: 'sticky', top: 100, color: '#333', fontSize: '24px', marginTop: '40px' }}>
                    Update Course
                    {errorMessage &&
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
                            <CancelOutlinedIcon sx={{ mr: 1 }} />
                            <Typography variant="body1" >
                                {errorMessage}
                            </Typography></div>

                    }

                    {updateSuccess &&
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4caf50', color: 'white', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
                            <CheckCircleOutlineOutlinedIcon sx={{ mr: 1 }} />
                            <Typography variant="body1">
                                Course updated successfully!
                            </Typography>
                        </div>
                    }
                </div>



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
                        label="Images (comma separated URLs)"
                        type="text"
                        value={images}
                        onChange={(e) => setImages(e.target.value)}
                        fullWidth
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="Videos (comma separated URLs)"
                        type="text"
                        value={videos}
                        onChange={(e) => setVideos(e.target.value)}
                        fullWidth
                        required
                        sx={styles.textField}
                    />


                    {isSubmitting ? (
                        <CircularProgress style={{ marginTop: "1rem" }} />
                    ) : (
                        <Button color="success" type="submit" variant="contained" sx={styles.button}>
                            Update Course
                        </Button>
                    )}

                    <Link
                        to="/managecourse"
                        style={{
                            float: 'right',
                            backgroundColor: 'grey',
                            border: 'none',
                            color: 'white',
                            padding: '10px 20px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginBlock: '30px'

                        }}
                    >
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