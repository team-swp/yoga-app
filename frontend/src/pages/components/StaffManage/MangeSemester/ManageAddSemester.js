import { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { addSemester } from "../../../../helper/semesterAPI";
import { Toaster, toast } from "react-hot-toast";

function ManageAddSemester() {
    const [semestername, setSemestername] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // Thêm các trạng thái khác nếu cần thiết

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Gửi yêu cầu POST để thêm semester
        try {
            const response = await addSemester({ semestername, startDate, endDate })
            if (response) {
                // Semester được thêm thành công
                toast.success("Add new Semester successfully!")
            } else {
                // Xử lý lỗi khi không thêm được semester
                toast.error('Failed to add semester...');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to add semester...');
        }
    };

    return (
        <div>
            <Header />
            <Container>
                <Toaster position="top-center"></Toaster>
                <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px', marginTop: '1em' }}>Add New Semester</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Semester Name"
                        type="text"
                        value={semestername}
                        onChange={(e) => setSemestername(e.target.value)}
                        fullWidth
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="Start Date"
                        type="text"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        fullWidth
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="End Date"
                        type="text"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        fullWidth
                        required
                        sx={styles.textField}
                    />
                    <Button type="submit" variant="contained" style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginBottom: '1em' }}>Add Semester</Button>
                </form>
            </Container>

            <Footer />
        </div>

    );
}

export default ManageAddSemester;
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