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
<<<<<<< HEAD
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../Header/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { updateCourse } from "../../../../helper/courseAPI";
=======
import { getCourse, updateCourse } from "../../../../helper/courseAPI";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import { getSemester } from "../../../helper/semesterAPI";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { getSemester } from "../../../../helper/semesterAPI";
import axios from "axios";

>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
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

<<<<<<< HEAD
  const formik = useFormik({
    initialValues: {
      coursename: "",
      description: "",
      price: 0,
      willLearn: "",
      requirement: "",
      forWho: "",
      images: "",
      videos: "",
    },
    validationSchema: Yup.object({
      coursename: Yup.string().required("Course Name is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required"),
      willLearn: Yup.string().required("What you will learn is required"),
      requirement: Yup.string().required("Requirements are required"),
      forWho: Yup.string().required("Target audience is required"),
      images: Yup.mixed().required("Images are required"),
      videos: Yup.mixed().required("Videos are required"),
    }),
    onSubmit: async (values) => {
      try {
        // Lấy id của học kỳ từ selectedSemester
        const semesterId = selectedSemester ? selectedSemester._id : null;

        const response = await updateCourse({
          _id: courseId.id,
          ...values,
          semester_id: semesterId, // Sử dụng id học kỳ
        });

        if (response) {
          toast.success("Updated course success");
        } else {
          toast.error("Failed to update");
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
=======
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
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed

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
<<<<<<< HEAD
        formik.setValues({
          coursename: course.coursename,
          description: course.description,
          price: course.price,
          willLearn: course.willLearn,
          requirement: course.requirement,
          forWho: course.forWho,
          images: course.images,
          videos: course.videos,
        });
        setSelectedSemester(combinedData.semester.semestername);
=======
        setCoursename(course.coursename);
        setDescription(course.description);
        setPrice(course.price);
        setWillLearn(course.willLearn);
        setRequirement(course.requirement);
        setForWho(course.forWho);
        setSemesterId(course.semestername);
        setImages(course.images);
        setVideos(course.videos);
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
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
<<<<<<< HEAD
      <Header />
      <Toaster />
=======
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
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
<<<<<<< HEAD
        </div>
        <form onSubmit={formik.handleSubmit} sx={styles.form}>
=======
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
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
          <TextField
            label="Course Name"
            type="text"
            name="coursename"
            value={coursename}
            onChange={(event) => setCoursename(event.target.value)}
            required
            sx={styles.textField}
<<<<<<< HEAD
            error={
              formik.touched.coursename && formik.errors.coursename
                ? true
                : false
            }
            helperText={
              formik.touched.coursename && formik.errors.coursename
                ? formik.errors.coursename
                : ""
            }
=======
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
          />
          <TextField
            label="Description"
            type="text"
            name="description"
<<<<<<< HEAD
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
=======
            value={description}
            onChange={(event) => setDescription(event.target.value)}
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
            required
            multiline
            rows={4}
            sx={styles.textField}
<<<<<<< HEAD
            error={
              formik.touched.description && formik.errors.description
                ? true
                : false
            }
            helperText={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : ""
            }
=======
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
          />
          <TextField
            label="Price"
            type="number"
            name="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
            sx={styles.textField}
<<<<<<< HEAD
            error={
              formik.touched.price && formik.errors.price ? true : false
            }
            helperText={
              formik.touched.price && formik.errors.price
                ? formik.errors.price
                : ""
            }
=======
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
          />
          <TextField
            label="What you will learn"
            type="text"
            name="willLearn"
<<<<<<< HEAD
            value={formik.values.willLearn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
=======
            value={willLearn}
            onChange={(event) => setWillLearn(event.target.value)}
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
            required
            multiline
            rows={4}
            sx={styles.textField}
<<<<<<< HEAD
            error={
              formik.touched.willLearn && formik.errors.willLearn
                ? true
                : false
            }
            helperText={
              formik.touched.willLearn && formik.errors.willLearn
                ? formik.errors.willLearn
                : ""
            }
=======
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
          />
          <TextField
            label="Requirements"
            type="text"
            name="requirement"
<<<<<<< HEAD
            value={formik.values.requirement}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
=======
            value={requirement}
            onChange={(event) => setRequirement(event.target.value)}
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
            required
            multiline
            rows={4}
            sx={styles.textField}
<<<<<<< HEAD
            error={
              formik.touched.requirement && formik.errors.requirement
                ? true
                : false
            }
            helperText={
              formik.touched.requirement && formik.errors.requirement
                ? formik.errors.requirement
                : ""
            }
=======
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
          />
          <TextField
            label="Who is this course for?"
            type="text"
            name="forWho"
<<<<<<< HEAD
            value={formik.values.forWho}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
=======
            value={forWho}
            onChange={(event) => setForWho(event.target.value)}
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
            required
            multiline
            rows={4}
            sx={styles.textField}
<<<<<<< HEAD
            error={formik.touched.forWho && formik.errors.forWho ? true : false}
            helperText={
              formik.touched.forWho && formik.errors.forWho
                ? formik.errors.forWho
                : ""
            }
=======
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
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
<<<<<<< HEAD
                error={
                  formik.touched.semester_id && formik.errors.semester_id
                    ? true
                    : false
                }
                helperText={
                  formik.touched.semester_id && formik.errors.semester_id
                    ? formik.errors.semester_id
                    : ""
                }
=======
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
              />
            )}
          />
          <TextField
            label="Images (comma separated URLs)"
<<<<<<< HEAD
            type="text"
            name="images"
            value={formik.values.images}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            required
            sx={styles.textField}
            error={formik.touched.images && formik.errors.images ? true : false}
            helperText={
              formik.touched.images && formik.errors.images
                ? formik.errors.images
                : ""
            }
          />
          <TextField
            label="Videos (comma separated URLs)"
            type="text"
            name="videos"
            value={formik.values.videos}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            required
            sx={styles.textField}
            error={formik.touched.videos && formik.errors.videos ? true : false}
            helperText={
              formik.touched.videos && formik.errors.videos
                ? formik.errors.videos
                : ""
            }
          />

          <Button
            color="success"
            type="submit"
            variant="contained"
            sx={styles.button}
          >
            Update Course
          </Button>

          <Link
            to="/staffmanage"
=======
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
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
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
<<<<<<< HEAD

=======
>>>>>>> 65377656e335824ddc87cae7be9a821275dde5ed
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
