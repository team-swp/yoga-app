import { useEffect, useState } from "react";
import { Container, TextField, Button, Autocomplete } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { updateCourse } from "../../../../helper/courseAPI";
import Header from "../../Header/Header";
import axios from "axios";
import convertToBase64 from "../../../../helper/convert";
import { getAvatarToAWS, postAvatarToAWS } from "../../../../helper/loginAPI";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "./UpdateCourse.module.css";

function UpdateCourse() {
  const [course, setCourse] = useState({});
  const courseId = useParams();
  const [semesterList, setSemesterList] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  //---------------------------------------------------------------------------------------------//
  useEffect(() => {
    async function fetchData() {
      try {
        const [courseResponse, semesterResponse] = await Promise.all([
          axios.get("http://localhost:3001/api/course/get"),
          axios.get("http://localhost:3001/api/semester/get"),
        ]);
        const courseData = courseResponse.data;
        const semesterData = semesterResponse.data;
        const combinedData = courseData.map((course) => {
          const semester = semesterData.find(
            (semester) => semester._id === course.semester_id
          );
          const semesterName = semester ? semester.semestername : "";
          return {
            ...course,
            semester_id: semesterName,
          };
        });
        const course = combinedData.find((obj) => obj._id === courseId.id);
        console.log(course);
        setCourse(course);
        // Set form values
        formik.setValues({
          coursename: course.coursename,
          description: course.description,
          price: course.price,
          willLearn: course.willLearn,
          requirement: course.requirement,
          forWho: course.forWho,
          semester_id: course.semestername,
          videos: course.videos,
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  //------------------------------------------------------------------------------------------------------------------//
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
  //-------------------------------------------------------------------------------------------------------//
  const handleSubmit = async (values) => {
    try {
      // Lấy id của học kỳ từ selectedSemester
      const semesterId = selectedSemester ? selectedSemester._id : null;
      const response = await updateCourse({
        _id: courseId.id,
        ...values,
        semester_id: semesterId, // Sử dụng id học kỳ
        images: [file],
      });

      if (response) {
        toast.success("Course Updated Success");
      } else {
        toast.error("Course Updated Fail !!!");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Error occurred while updating the course. Please try again later."
      );
    }
  };
  //---------------------------------------------------------------------------------------------------------------------//
  const validationSchema = Yup.object().shape({
    coursename: Yup.string().required("Course Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .min(0, "Price must be greater than 0")
      .required("Price is required"),
    willLearn: Yup.string().required("What you will learn is required"),
    requirement: Yup.string().required("Requirements are required"),
    forWho: Yup.string().required("Who is this course for? is required"),
    semester_id: Yup.string(),
    videos: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      coursename: "",
      description: "",
      price: 0,
      willLearn: "",
      requirement: "",
      forWho: "",
      semester_id: "",
      videos: [],
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const resizeImage = (image, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        // Kiểm tra và điều chỉnh kích thước ảnh nếu nó vượt quá kích thước tối đa
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
          }
          if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }
        // Tạo một canvas mới để vẽ ảnh đã điều chỉnh kích thước
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        // Chuyển đổi canvas thành base64 và trả về
        const resizedImage = canvas.toDataURL("image/jpeg");
        resolve(resizedImage);
      };
    });
  };

  const [imageTemp, setImageTemp] = useState();
  const [file, setFile] = useState();

  const loadImageAgain = async (e) => {
    if (course.images) {
      const { url } = await getAvatarToAWS({ imageName: course._id });
      setFile(url);
      e.target.src = file;
      updateCourse({ _id: course._id, images: [url] });
    }
  };

  const onUpload = async (e) => {
    const avatar = e.target.files[0];
    if (avatar) {
      if (avatar.type.startsWith("image/")) {
        const base64 = await convertToBase64(avatar);

        // Kích thước tối đa mới cho ảnh (ví dụ: 800x600)
        const maxWidth = 500;
        const maxHeight = 500;

        // Thay đổi kích thước ảnh
        const resizedImage = resizeImage(base64, maxWidth, maxHeight);
        resizedImage.then((resize) => {
          setImageTemp(resize);
        });

        const formData = new FormData();
        formData.append("avatar", avatar);
        formData.append("imageName", course._id);

        const { data, status } = await postAvatarToAWS(formData);
        if (status === 200) {
          data.imageName = course._id;
          const { url } = await getAvatarToAWS(data);
          setFile(url);
          const updateAva = updateCourse({ _id: course._id, images: [url] });
          updateAva
            .then(() => {
              toast.success("Update Image Successfully");
            })
            .then(() => {
              toast.error("Update Image Not Successfully");
            });
        }
      } else {
        toast.error("Please select an image");
      }
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="md" className={style.container}>
        <Toaster></Toaster>
        <h1 className={style.h1}>Update Course</h1>
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <TextField
            className="textField"
            autoFocus
            label="Course Name"
            type="text"
            name="coursename"
            value={formik.values.coursename}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
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
            multiline
            rows={4}
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
            className={style.textField}
          />
          <TextField
            autoFocus
            label="Price"
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            error={formik.touched.price && formik.errors.price ? true : false}
            helperText={
              formik.touched.price && formik.errors.price
                ? formik.errors.price
                : ""
            }
            className={style.textField}
          />
          <TextField
            label="What you will learn"
            type="text"
            name="willLearn"
            value={formik.values.willLearn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            multiline
            rows={4}
            error={
              formik.touched.willLearn && formik.errors.willLearn ? true : false
            }
            helperText={
              formik.touched.willLearn && formik.errors.willLearn
                ? formik.errors.willLearn
                : ""
            }
            className={style.textField}
          />
          <TextField
            label="Requirements"
            type="text"
            name="requirement"
            value={formik.values.requirement}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            multiline
            rows={4}
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
            className={style.textField}
          />
          <TextField
            label="Who is this course for?"
            type="text"
            name="forWho"
            value={formik.values.forWho}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            multiline
            rows={4}
            error={formik.touched.forWho && formik.errors.forWho ? true : false}
            helperText={
              formik.touched.forWho && formik.errors.forWho
                ? formik.errors.forWho
                : ""
            }
            className={style.textField}
          />
          <Autocomplete
            autoFocus
            id="semester"
            options={semesterList}
            getOptionLabel={(option) => option.semestername}
            onChange={(event, value) => setSelectedSemester(value)}
            className={style.textField}
            value={selectedSemester}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Semester"
                name="semester_id"
                value={formik.values.semester_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            label="Videos"
            type="text"
            name="videos"
            value={formik.values.videos}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.videos && formik.errors.videos ? true : false}
            helperText={
              formik.touched.videos && formik.errors.videos
                ? formik.errors.videos
                : ""
            }
            className={style.textField}
          />
          <img
            src={imageTemp || file}
            alt="course"
            width="100"
            height="100"
            style={{ marginTop: "20px" }}
            onError={loadImageAgain}
          />
          <div className={style.button}>
            {" "}
            <Button
              color="error"
              variant="contained"
              component="label"
              className={style.uploadImage}
            >
              Upload Image
              <input type="file" accept="image/*" hidden onChange={onUpload} />
            </Button>
            <Button
              className={style.update}
              variant="contained"
              color="success"
              type="submit"
            >
              Update
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/staffmanage"
              className={style.cancleButton}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default UpdateCourse;
