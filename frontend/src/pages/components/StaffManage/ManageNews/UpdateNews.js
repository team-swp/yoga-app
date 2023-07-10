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
import { updateNews } from "../../../../helper/premiumAPI";
import { getMember } from "../../../../helper/loginAPI";

function UpdateNews() {
  const [news, setNews] = useState({});
  const newsId = useParams();
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  
  const newsFormik = useFormik({
    initialValues: {
      subject: "",
      content: "",
      
    },
    validationSchema: Yup.object({
      subject: Yup.string().required("Title of the news is required").min(6, "Must be at least 6 characters"),
      content: Yup.string().required("Content of the news is required").min(6, "Must be at least 6 characters"),
      
    }),
    onSubmit: async (values) => {
        const staffId = selectedStaff ? selectedStaff._id : null;

      try {
        const response = await updateNews({
          _id: newsId.id,
          ...values,
          staff_id:staffId
        });

        if (response) {
          toast.success("Updated news success");
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
        const [newsResponse, userResponse] = await Promise.all([
          axios.get("http://localhost:3001/api/news/get"),
          getMember()
        ]);

        const newsData = newsResponse.data;
        const userData = userResponse.data;

        const combinedData = newsData.map((news) => {
          const user = userData.find(
            (user) => user._id === news.staff_id
          );
          const userName = user ? user.username : "";
          return {
            ...news,
            username: userName,
          };
        });
        const news = combinedData.find((obj) => obj._id === newsId.id);
        console.log(news);
        setNews(news);
        newsFormik.setValues({
          subject: news.subject,
          content: news.content,
        
        });
        setSelectedStaff(news.username);
      
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchStaffs() {
      try {
        const response = await getMember();
        const userData = response.data;
        const filteredStaffs = userData.filter(
          (user) => user.role === "staff"
        );
        setStaffList(filteredStaffs);
        console.log(filteredStaffs);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchStaffs();
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
          Update News
        </div>
        <form onSubmit={newsFormik.handleSubmit} sx={styles.form}>
          <TextField
            label="Subject"
            type="text"
            name="subject"
            value={newsFormik.values.subject}
            onChange={newsFormik.handleChange}
            onBlur={newsFormik.handleBlur}
            required
            sx={styles.textField}
            error={
              newsFormik.touched.subject && newsFormik.errors.subject
            }
            helperText={
              newsFormik.touched.subject && newsFormik.errors.subject
                ? newsFormik.errors.subject
                : ""
            }
          />
          <TextField
            label="Content"
            type="text"
            name="content"
            value={newsFormik.values.content}
            onChange={newsFormik.handleChange}
            onBlur={newsFormik.handleBlur}
            required
            multiline
            rows={4}
            sx={styles.textField}
            error={
              newsFormik.touched.content && newsFormik.errors.content
            }
            helperText={
              newsFormik.touched.content && newsFormik.errors.content
                ? newsFormik.errors.content
                : ""
            }
          />
         
          <Autocomplete
            value={selectedStaff}
            onChange={(event, newValue) => setSelectedStaff(newValue)}
            options={staffList}
           key={staffList._id}
            getOptionLabel={(option) => option.username || selectedStaff}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Staff"
                name="staff_id"
                required
                sx={{ marginBottom: "10px" }}
               
              />
            )}
          />

          <Button
            color="success"
            type="submit"
            variant="contained"
            sx={styles.button}
          >
            Update News
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

export default UpdateNews;

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
    width: "100%",
    marginBottom: "1rem",
  },
  button: {
    marginTop: "1rem",
    width: "100%",
  },
};
