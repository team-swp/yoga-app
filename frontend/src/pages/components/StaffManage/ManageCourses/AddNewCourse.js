import React, { useState } from 'react';
import { addCourse } from '../../../../helper/courseAPI';
import { Container, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';

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
    const handleSubmit = async (e) => {
        e.preventDefault();
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
                status: status,
            });
            if (response) {
                alert("Course added successfully!");
                setCoursename("");
                setDescription("");
                setPrice("");
                setWillLearn("");
                setRequirement("");
                setForWho("");
                setSemesterId("");
                setStatus("");
                setImages([]);
            } else {
                alert("Failed to add course");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to add course");
        }
    };

    return (
        <div><Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <div style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>
                Add New Course
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
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    required
                    sx={{ marginBottom: '10px' }}
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
                    required
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
                <FormControl fullWidth required sx={{ marginBottom: '10px' }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: '#007bff', color: '#fff', marginTop: '60px', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    ADD A COURSE
                </Button>
                <Link to="/managecourse" style={{ marginTop: '60px', float: 'right', backgroundColor: '#4CAF50', border: 'none', color: 'white', padding: '10px 20px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', cursor: 'pointer' }}>
                    Back
                </Link>
            </form>

        </Container>

        </div >


    );
}

export default AddNewCourse;
