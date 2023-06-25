import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Select,
  Menu,
  MenuItem,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Typography,
  Autocomplete,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";
import { getCourse, updateCourse } from "../../../../helper/courseAPI";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import { getSemester } from "../../../helper/semesterAPI";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { getSemester } from "../../../../helper/semesterAPI";
import axios from "axios";

function UpdateCourse() {
  const [course, setCourse] = useState({});
  const courseId = useParams();
  const [coursename, setCoursename] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [willLearn, setWillLearn] = useState("");
  const [requirement, setRequirement] = useState("");
  const [forWho, setForWho] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [semesterList, setSemesterList] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setUpdateSuccess(false);

    try {
      // Lấy id của học kỳ từ selectedSemester
      const semesterId = selectedSemester ? selectedSemester._id : null;

      const response = await updateCourse({
        _id: courseId.id,
        coursename: coursename,
        description: description,
        price: price,
        willLearn: willLearn,
        requirement: requirement,
        forWho: forWho,
        semester_id: semesterId, // Sử dụng id học kỳ
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
      setErrorMessage(
        "Error occurred while updating the course. Please try again later."
      );
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [courseResponse, semesterResponse] = await Promise.all([
          axios.get("http://localhost:3001/api/course/get"),
          axios.get("http://localhost:3001/api/semester/get"),
        ]);

        const courseData = courseResponse.data;
        const semesterData = semesterResponse.data;

        // Tiến hành kết hợp dữ liệu từ hai API
        // Ví dụ: Lấy tên học kỳ dựa trên semester_id từ dữ liệu course
        const combinedData = courseData.map((course) => {
          const semester = semesterData.find(
            (semester) => semester._id === course.semester_id
          );
          const semesterName = semester ? semester.semestername : "";
          return {
            ...course,
            semestername: semesterName,
          };
        });
        const course = combinedData.find((obj) => obj._id === courseId.id);
        console.log(course);
        setCourse(course);
        setCoursename(course.coursename);
        setDescription(course.description);
        setPrice(course.price);
        setWillLearn(course.willLearn);
        setRequirement(course.requirement);
        setForWho(course.forWho);
        setSemesterId(course.semestername);
        setImages(course.images);
        setVideos(course.videos);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchSemesters() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/semester/get"
        );
        const semesterData = response.data;
        setSemesterList(semesterData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSemesters();
  }, []);

  return (
    <>
      <Container maxWidth="md" sx={styles.container}>
        <div
          style={{
            textAlign: "center",
            position: "sticky",
            top: 100,
            color: "#333",
            fontSize: "24px",
            marginTop: "40px",
          }}
        >
          Update Course
          {errorMessage && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "red",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <CancelOutlinedIcon sx={{ mr: 1 }} />
              <Typography variant="body1">{errorMessage}</Typography>
            </div>
          )}
          {updateSuccess && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#4caf50",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <CheckCircleOutlineOutlinedIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                Course updated successfully!
              </Typography>
            </div>
          )}
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
          <Autocomplete
            value={selectedSemester}
            onChange={(event, newValue) => setSelectedSemester(newValue)}
            options={semesterList}
            getOptionLabel={(option) => option.semestername}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Semester"
                type="text"
                name="semester_id"
                required
                sx={styles.textField}
              />
            )}
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
            <Button
              color="success"
              type="submit"
              variant="contained"
              sx={styles.button}
            >
              Update Course
            </Button>
          )}

          <Link
            to="/managecourse"
            style={{
              float: "right",
              backgroundColor: "grey",
              border: "none",
              color: "white",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              cursor: "pointer",
              marginBlock: "10px",
            }}
          >
            Back
          </Link>
        </form>
      </Container>
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
