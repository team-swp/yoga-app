import { useEffect, useState } from "react";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { getCourse } from "../../../helper/courseAPI";

function ManageCourses() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [courses, setCourses] = useState([]);

    const handleSearchChange = (event) => {
        setShowErrorMessage(false);
        setSearchKeyword(event.target.value);
    };

    const handleSearch = () => {
        if (searchKeyword.trim() === "") {
            setShowErrorMessage(true);
            return;
        }
        const filteredCourses = courses.filter((course) =>
            course.coursename.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setSearchResults(filteredCourses);
    };

    useEffect(() => {
        if (searchKeyword === "") {
            setSearchResults([]);
        }
    }, [searchKeyword]);

    useEffect(() => {
        fetchCourses();
    }, []);

    async function fetchCourses() {
        try {
            const response = await getCourse();
            if (response && response.data) {
                setCourses(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Header />
            <div className="bg-gray-400">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 py-2">
                    <h1 className="text-black-100 text-center font-bold text-md sm:text-xs md:text-md lg:text-xl">
                        Manage Courses
                    </h1>
                </div>
            </div>
            <Container>
                <div style={{ float: 'right', marginTop: '15px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/addnewcourse"
                    >
                        Add new course
                    </Button>
                </div>
                <div style={{ marginTop: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searchKeyword && (
                                        <IconButton
                                            onClick={() => setSearchKeyword("")}
                                            style={{ marginTop: '5px', padding: 0, color: 'gray', fontSize: '20px' }}
                                        >
                                            clear
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                        style={{ marginRight: '8px' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        style={{ marginLeft: '8px' }}
                    >
                        Search
                    </Button>
                </div>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Course Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(searchResults.length > 0 ? searchResults : courses).map((courseItem, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{courseItem.coursename}</TableCell>
                                    <TableCell>{courseItem.price}</TableCell>
                                    <TableCell>{courseItem.status ? "Active" : "Inactive"}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            component={Link}
                                            to={`/updatecourse/${courseItem._id}`}
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Link
                    to="/staffmanage"
                    style={{
                        float: 'right',
                        backgroundColor: '#4CAF50',
                        border: 'none',
                        color: 'white',
                        padding: '10px 20px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Back
                </Link>
            </Container>
            <Footer />
        </div>
    );
}

export default ManageCourses;

