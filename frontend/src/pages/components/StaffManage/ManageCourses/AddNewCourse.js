import React, { useState } from 'react';
<<<<<<< HEAD:frontend/src/pages/components/StaffManage/ManageCourses/AddNewCourse.js
import { addCourse } from '../../../../helper/courseAPI';
import { Container, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
=======
import { addCourse } from '../../../helper/courseAPI';
import { Container, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, CircularProgress, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
>>>>>>> ef9cf68ab873de8c8f3c8c9e4266e802db3001f6:frontend/src/pages/components/AddNewCourse/AddNewCourse.js
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


function AddNewCourse() {
    const [coursename, setCoursename] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [willLearn, setWillLearn] = useState("");
    const [requirement, setRequirement] = useState("");
    const [forWho, setForWho] = useState("");
    const [semester_id, setSemesterId] = useState("");
    const [status, setStatus] = useState("");
    const [images, setImages] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [addSuccess, setAddSuccess] = useState(false);
    const [videos, setVideos] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);
        setAddSuccess(false);
        try {
            const response = await addCourse({
                coursename: coursename,
                description,
                price: price,
                willLearn,
                requirement,
                forWho,
                semester_id: semester_id,
                images,
                videos,
                status: status,

            })

            if (response) {
                setAddSuccess(true);
                setTimeout(() => {
                    setAddSuccess(false);
                }, 3000);
                setCoursename("");
                setDescription("");
                setPrice("");
                setWillLearn("");
                setRequirement("");
                setForWho("");
                setSemesterId("");
                setStatus("");
                setVideos([])
                setImages([]);
            } else {
                setErrorMessage("Failed to update course");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Error occurred while updating the course. Please try again later.");
        }
        setIsSubmitting(false);
    };

    return (
        <div>
            <Header />
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
                <div style={{ textAlign: 'center', position: 'sticky', top: 100, color: '#333', fontSize: '24px', marginTop: '40px' }}>
                    Add New Course
                    {errorMessage &&
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
                            <CancelOutlinedIcon sx={{ mr: 1 }} />
                            <Typography variant="body1" >
                                {errorMessage}
                            </Typography></div>

                    }

                    {addSuccess &&
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4caf50', color: 'white', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
                            <CheckCircleOutlineOutlinedIcon sx={{ mr: 1 }} />
                            <Typography variant="body1">
                                Course updated successfully!
                            </Typography>
                        </div>
                    }
                </div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Course Name"
                        type="text"
                        value={coursename}
                        onChange={(e) => setCoursename(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="Description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        sx={{ marginBottom: '10px' }}
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
                        label="Will learn"
                        type="text"
                        value={willLearn}
                        onChange={(e) => setWillLearn(e.target.value)}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="Semester ID"
                        type="text"
                        value={semester_id}
                        onChange={(e) => setSemesterId(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="Requirement"
                        type="text"
                        value={requirement}
                        onChange={(e) => setRequirement(e.target.value)}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="For Who"
                        type="text"
                        value={forWho}
                        onChange={(e) => setForWho(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="For images"
                        type="text"
                        value={images}
                        onChange={(e) => setImages(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField
                        label="For video"
                        type="text"
                        value={videos}
                        onChange={(e) => setVideos(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: '10px' }}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Status</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={status === 'true'} onChange={(event) => setStatus(event.target.checked ? 'true' : 'false')} />}
                                label="Active"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={status === 'false'} onChange={(event) => setStatus(event.target.checked ? 'false' : 'true')} />}
                                label="Inactive"
                            />
                        </FormGroup>
                    </FormControl>

                    {isSubmitting ? (
                        <CircularProgress style={{ marginTop: "1rem" }} />
                    ) : (
                        <Button color="success" type="submit" variant="contained" sx={styles.button}>
                            ADD A CLASS
                        </Button>
                    )}
                    <Link to="/managecourse" style={{ marginBlock: '30px', float: 'right', backgroundColor: 'grey', border: 'none', color: 'white', padding: '10px 20px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', cursor: 'pointer' }}>
                        Back
                    </Link>
                </form>
            </Container >
            <Footer />
        </div >



    );
}

export default AddNewCourse;
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