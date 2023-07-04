import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../Header/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { updateCourse } from "../../../../helper/courseAPI";
function UpdateCourse() {
  const [course, setCourse] = useState({});
  const courseId = useParams();
  const [coursename, setCoursename] = useState("");
  const [price, setPrice] = useState(0);
  const [semesterList, setSemesterList] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  
console.log(selectedSemester);


  const formik = useFormik({
    initialValues: {
      coursename: "",
      description: "",
      price: 0,
      willLearn: "",
      requirement: "",
      forWho: "",
      images: "",
     
    },
    validationSchema: Yup.object({
      coursename: Yup.string().required("Course Name is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required"),
      willLearn: Yup.string().required("What you will learn is required"),
      requirement: Yup.string().required("Requirements are required"),
      forWho: Yup.string().required("Target audience is required"),
      images: Yup.mixed().required("Images are required"),
  
    }),
    onSubmit: async (values) => {
      try {
        // Lấy id của học kỳ từ selectedSemester
        const semesterId = selectedSemester ? selectedSemester.semestername : null;

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
        formik.setValues({
          coursename: course.coursename,
          description: course.description,
          price: course.price,
          willLearn: course.willLearn,
          requirement: course.requirement,
          forWho: course.forWho,
          images: course.images,
         semestername:course.semestername
        });
        setSelectedSemester(course.semestername);
        console.log(combinedData.course.semestername);
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
        // Lọc ra những semester có giá trị status là true
        const filteredSemesters = semesterData.filter(
          (semester) => semester.status === true
        );
        setSemesterList(filteredSemesters);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchSemesters();
  }, []);
  return (
    <>
      <Header />
      <Toaster />
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
        </div>
        <form onSubmit={formik.handleSubmit} sx={styles.form}>
          <TextField
            label="Course Name"
            type="text"
            name="coursename"
            value={formik.values.coursename}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            sx={styles.textField}
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
          />
          <TextField
            label="Description"
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            multiline
            rows={4}
            sx={styles.textField}
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
          />
          <TextField
            label="Price"
            type="number"
            name="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
            sx={styles.textField}
            error={
              formik.touched.price && formik.errors.price ? true : false
            }
            helperText={
              formik.touched.price && formik.errors.price
                ? formik.errors.price
                : ""
            }
          />
          <TextField
            label="What you will learn"
            type="text"
            name="willLearn"
            value={formik.values.willLearn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            multiline
            rows={4}
            sx={styles.textField}
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
          />
          <TextField
            label="Requirements"
            type="text"
            name="requirement"
            value={formik.values.requirement}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            multiline
            rows={4}
            sx={styles.textField}
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
          />
          <TextField
            label="Who is this course for?"
            type="text"
            name="forWho"
            value={formik.values.forWho}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            multiline
            rows={4}
            sx={styles.textField}
            error={formik.touched.forWho && formik.errors.forWho ? true : false}
            helperText={
              formik.touched.forWho && formik.errors.forWho
                ? formik.errors.forWho
                : ""
            }
          />
          <Autocomplete
            value={selectedSemester}
            onChange={(event, newValue) => setSelectedSemester(newValue)}
            options={semesterList}
            getOptionLabel={(option) => option.semestername || selectedSemester}

            renderInput={(params) => (
              <TextField
                {...params}
                label="Semester"
                type="text"
                name="semester_id"
                required
                sx={styles.textField}
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
              />
            )}
          />
          <TextField
            label="Images (comma separated URLs)"
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
