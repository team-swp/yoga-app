import { useState } from "react";
import { Container } from "@mui/material";
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
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>Add New Semester</h1>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Semester Name:</label>
                            <input
                                type="text"
                                value={semestername}
                                onChange={(e) => setSemestername(e.target.value)}
                                style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Start Date:</label>
                            <input
                                type="text"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>End Date:</label>
                            <input
                                type="text"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>Add Semester</button>
                    </form>
                </div>
            </Container>

            <Footer />
        </div>

    );
}

export default ManageAddSemester;