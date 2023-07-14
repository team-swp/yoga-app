import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { addCourse } from "../../../../helper/courseAPI";



const validationSchema = Yup.object().shape({
  coursename: Yup.string().required("Course Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .min(-1, "Price must be gretter than 0")
    .typeError("Price must be a number")
    .required("Price is required"),

  willLearn: Yup.string().required("Will Learn is required"),
  requirement: Yup.string().required("Requirement is required"),
  forWho: Yup.string().required("For Who is required"),
  images: Yup.string().required("Images is required"),

});

function AddNewCourse() {
  const [semesterList, setSemesterList] = React.useState([]);
  const [selectedSemester, setSelectedSemester] = React.useState(null);
  const navigate = useNavigate()
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
  const handleSubmit = async (values) => {
    try {
      const semesterId = selectedSemester ? selectedSemester._id : null;
      const response = await addCourse({
        coursename: values.coursename,
        description: values.description,
        price: values.price,
        willLearn: values.willLearn,
        requirement: values.requirement,
        forWho: values.forWho,
        semester_id: semesterId,
        images: values.images,

        status: values.status,
      });

      if (response) {
        toast.success("Added new course success");
        values.coursename = "";
        values.description = "";
        values.price = "";
        values.willLearn = "";
        values.requirement = "";
        values.semester_id = ""
        values.forWho = "";
        values.images = "";
        navigate("/staffmanage")
        setSelectedSemester(null);
      } else {
        toast.error("Failed to add new class");
      }
    } catch (error) {
      toast.error("Failed to add new class");
    }
  };

  return (
    <div>
      <Header />
      <Toaster></Toaster>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
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
          Add New Course
        </div>
        <Formik
          initialValues={{
            coursename: "",
            description: "",
            price: "",
            willLearn: "",
            requirement: "",
            forWho: "",
            images: "",
            videos: "",

          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="coursename"
                as={TextField}
                label="Course Name"
                fullWidth
                required
                sx={{ marginBottom: "10px" }}
                error={errors.coursename && touched.coursename}
                helperText={errors.coursename && touched.coursename && errors.coursename}
              />
              <Field
                name="description"
                as={TextField}
                label="Description"
                fullWidth
                required
                multiline
                rows={4}
                sx={{ marginBottom: "10px" }}
                error={errors.description && touched.description}
                helperText={errors.description && touched.description && errors.description}
              />
              <Field
                name="price"
                as={TextField}
                label="Price"
                type="number"
                required
                sx={styles.textField}
                error={errors.price && touched.price}
                helperText={errors.price && touched.price && errors.price}
              />
              <Field
                name="willLearn"
                as={TextField}
                label="Will learn"
                fullWidth
                required
                multiline
                rows={4}
                sx={{ marginBottom: "10px" }}
                error={errors.willLearn && touched.willLearn}
                helperText={errors.willLearn && touched.willLearn && errors.willLearn}
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
                    name="semester_id"
                    required
                    sx={styles.textField}
                    error={errors.semester_id && touched.semester_id}
                    helperText={errors.semester_id && touched.semester_id && errors.semester_id}
                  />
                )}
              />
              <Field
                name="requirement"
                as={TextField}
                label="Requirement"
                fullWidth
                required
                multiline
                rows={4}
                sx={{ marginBottom: "10px" }}
                error={errors.requirement && touched.requirement}
                helperText={errors.requirement && touched.requirement && errors.requirement}
              />
              <Field
                name="forWho"
                as={TextField}
                label="For Who"
                fullWidth
                required
                sx={{ marginBottom: "10px" }}
                error={errors.forWho && touched.forWho}
                helperText={errors.forWho && touched.forWho && errors.forWho}
              />
              <Field
                name="images"
                as={TextField}
                label="For images"
                fullWidth
                required
                sx={{ marginBottom: "10px" }}
                error={errors.images && touched.images}
                helperText={errors.images && touched.images && errors.images}
              />



              <Button
                color="success"
                type="submit"
                variant="contained"
                sx={styles.button}
              >
                ADD A CLASS
              </Button>

              <Link
                to="/staffmanage"
                style={{
                  marginBlock: "30px",
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
                }}
              >
                Back
              </Link>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
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