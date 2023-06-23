
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
    Switch,
} from '@mui/material';
import { Link } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import StatusButton from './Statusbutton2';
import { updatePremium } from '../../../../helper/premiumAPI';
function ManagePremium() {
    const [courses, setCourses] = useState([]);
    const [updatedCourse, setUpdatedCourse] = useState({})


    /////// update done//////////// 
    const handleToggle = async (event, course) => {
        try {
            const updatedCourseData = { ...course, status: event.target.checked };
            const response = await updatePremium(updatedCourseData);
            if (response && response.data) {
                console.log(response.data.data.premiumname)
                const updatedCourses = courses.map((courseItem) =>

                    courseItem._id === response.data._id ? response.data : courseItem,
                    toast.success(`${response.data.data.premiumname} status updated success`)
                );
                setUpdatedCourse(updatedCourses);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [updatedCourse]);

    async function fetchCourses() {
        const response = await axios.get(`http://localhost:3001/api/premium/get`)
        const coureseData = response.data;
        console.log(response.data);
        setCourses(coureseData);
    }


    return (
        <div>
            <Container>
                <Toaster position="top-center" reverseOrder={false} />
                <TableContainer component={Paper}>
                    <div style={{ float: 'right', marginTop: '15px', marginRight: '10px', marginBottom: '15px' }}>
                        <Button
                            variant="contained"
                            color="success"
                            component={Link}
                            to="/addnewpremium"
                        >
                            Add New Premium
                        </Button>
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: 'center' }}>ID</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Premium Name</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Price origin</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Price Discount</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Duration by month</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Disable/Enable </TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Status </TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">No package premium available</TableCell>
                                </TableRow>
                            ) : (
                                courses.map((courseItem, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell style={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>{courseItem.premiumname}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>{courseItem.priceOriginal}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>{courseItem.priceDiscount}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>{courseItem.durationByMonth}</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>
                                                <Switch
                                                    checked={courseItem.status}
                                                    onChange={(event) => handleToggle(event, courseItem)}
                                                    color={courseItem.status ? 'success' : 'error'}
                                                />
                                            </TableCell>
                                            <TableCell style={{ textAlign: 'center' }}><StatusButton status={courseItem.status} /></TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>
                                                <Button
                                                    variant="contained"
                                                    color="warning"
                                                    component={Link}
                                                    to={`/updatepremiumpack/${courseItem._id}`}
                                                    style={{ fontSize: '10px' }}
                                                >
                                                    Update and Detail
                                                </Button>
                                            </TableCell>
                                        </TableRow>)
                                }
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container >


        </div >
    );
}

export default ManagePremium;