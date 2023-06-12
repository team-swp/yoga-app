
import { useState } from "react";
import { Container } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { addClass } from "../../../helper/classAPI";

function AddNewClass() {
    const [classname, setClassname] = useState("");
    const [scheduleId, setScheduleId] = useState("");
    const [courseId, setCourseId] = useState("")
    const [instructorId, setInstructorId] = useState("")
    const [status, setStatus] = useState(false)
    // Thêm các trạng thái khác nếu cần thiết



    const handleSubmit = async (event) => {
        event.preventDefault();
        // Gửi yêu cầu POST để thêm lớp học mới
        try {
            const response = await addClass({ classname, schedule_id: scheduleId, course_id: courseId, intructor_id: instructorId })
            if (response) {
                // Lớp học được thêm thành công
                // Chuyển hướng người dùng đến trang quản lý lớp học
                alert("Add New Class Succesfully")
            } else {
                // Xử lý lỗi khi không thêm được lớp học
                console.log('Failed to add class');
            }
        } catch (error) {
            console.log('Failed to add class:', error);
        }
    };

    return (
        <div>
            <Header />
            <Container>
                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '20px' }}>Add New Class</h1>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Class Name:</label>
                            <input
                                type="text"
                                value={classname}
                                onChange={(e) => setClassname(e.target.value)}
                                style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Schedule ID:</label>
                            <input
                                type="text"
                                value={scheduleId}
                                onChange={(e) => setScheduleId(e.target.value)}
                                style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Course ID:</label>
                            <input
                                type="text"
                                value={courseId}
                                onChange={(e) => setCourseId(e.target.value)}
                                style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Instructor ID:</label>
                            <input
                                type="text"
                                value={instructorId}
                                onChange={(e) => setInstructorId(e.target.value)}
                                style={{ width: '100%', padding: '5px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Status:</label>
                            <input
                                type="checkbox"
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                            />
                        </div>
                        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>Update Class</button>
                    </form>
                </div>
            </Container>

            <Footer />
        </div>

    );
}

export default AddNewClass;
