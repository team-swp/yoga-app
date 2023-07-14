import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Fade,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Modal, Box, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import _ from "lodash";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import { addNews, updateNews } from "../../../../helper/premiumAPI";
import { getMember } from "../../../../helper/loginAPI";
import StatusButton from "./Statusbutton2";

function BasicExample() {
  const validationSchema = Yup.object().shape({
    subject: Yup.string()
      .required("Title of the news is required")
      .min(6, "Must be at least 6 characters"),
    content: Yup.string()
      .required("Content of the news is required")
      .min(6, "Must be at least 6 characters"),
  });

  const [listNews, setListNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [listOfStaff, setListOfStaff] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getMember();
        const user = response.data;
        const staff = user.filter(
          (listOfStaff) =>
            listOfStaff.status === true && listOfStaff.role === "staff"
        );

        setListOfStaff(staff);
      } catch {
        console.log("Failed to fetch users");
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    function compare(a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      return 0;
    }
    async function fetchNews() {
      try {
        const response = await axios.get("http://localhost:3001/api/news/get");

        setListNews(response.data.sort(compare));
      } catch (error) {
        console.log("Failed to fetch news");
      }
    }
    fetchNews();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  //----------------------- search----------------------//
  const handleSearch = _.debounce((event) => {
    let term = event.target.value.toLowerCase();
    if (term) {
      let filteredNews = listNews.filter((item) =>
        item.subject.toLowerCase().includes(term)
      );
      setCurrentPage(1);
      setListNews(filteredNews);
    } else {
      function compare(a, b) {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        if (a.createdAt < b.createdAt) {
          return 1;
        }
        return 0;
      }
      async function fetchNews() {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/news/get"
          );
          setListNews(response.data.sort(compare));
        } catch (error) {
          console.log("Failed to fetch news");
        }
      }
      fetchNews();
    }
  }, 500);

  const totalPages = Math.ceil(listNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //---------------------------- form -----------------------------//
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  //---------------------------- form ------------------------- //
  const handleAddNews = async (values) => {
    try {
      const staffID = selectedStaff ? selectedStaff._id : null;
      const response = await addNews({
        subject: values.subject,
        content: values.content,
        staff_id: staffID,
      });

      if (response) {
        toast.success("Added new course successfully");
        values.subject = "";
        values.content = "";
        values.staff_id = "";
        setSelectedStaff(null);
        handleCloseModal();
        function compare(a, b) {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        }
        async function fetchNews() {
          try {
            const response = await axios.get(
              "http://localhost:3001/api/news/get"
            );
            setListNews(response.data.sort(compare));
          } catch (error) {
            console.log("Failed to fetch news");
          }
        }
        fetchNews();
      } else {
        toast.error("Failed to add new class");
      }
    } catch (error) {
      toast.error("Failed to add new class");
    }
  };
  //-----------------------------toggle---------------------------------------------////
  const handleToggleStatus = (itemId) => {
    setSelectedItemId(itemId);
    setShowConfirmModal(true);
  };
  const handleCancel = async () => {
    setShowConfirmModal(false);
  };

  const handleStatusToggleConfirm = async () => {
    setShowConfirmModal(false);
    const updatedList = [...listNews];
    const selectedItem = updatedList.find(
      (item) => item._id === selectedItemId
    );
    console.log(selectedItem);
    selectedItem.status = !selectedItem.status;

    setListNews(updatedList);
    try {
      await updateNews({
        _id: selectedItem._id,
        status: selectedItem.status,
      });
      toast.success(`${selectedItem.subject} status updated successfully`);
    } catch {
      console.log("Error");
    }
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  //---------------------------------------------------------------------------------------///
  return (
    <>
      <Modal open={isOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Add News
          </Typography>

          <Formik
            initialValues={{
              subject: "",
              content: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddNews}
          >
            {({ errors, touched }) => (
              <Form>
                <Autocomplete
                  value={selectedStaff}
                  onChange={(event, newValue) => setSelectedStaff(newValue)}
                  options={listOfStaff}
                  getOptionLabel={(option) => option.username}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Staff"
                      name="staff_id"
                      required
                      sx={{ marginBottom: "10px" }}
                      error={errors.staff_id && touched.staff_id}
                      helperText={
                        errors.staff_id && touched.staff_id && errors.staff_id
                      }
                    />
                  )}
                />
                <Field
                  name="subject"
                  as={TextField}
                  label="Subject"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  sx={{ marginBottom: "10px" }}
                  error={errors.subject && touched.subject}
                  helperText={
                    errors.subject && touched.subject && errors.subject
                  }
                />
                <Field
                  name="content"
                  as={TextField}
                  label="Content"
                  fullWidth
                  required
                  sx={{ marginBottom: "10px" }}
                  error={errors.content && touched.content}
                  helperText={
                    errors.content && touched.content && errors.content
                  }
                />
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCloseModal}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <Container key={endIndex}>
        <Toaster></Toaster>
        <TableContainer component={Paper}>
          <div
            style={{
              float: "right",
              marginTop: "15px",
              marginRight: "10px",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="contained"
              color="success"
              component={Link}
              onClick={handleOpenModal}
            >
              Write a notification
            </Button>
          </div>
          <form
            style={{
              padding: "15px",
              maxWidth: "800px",
              display: "flex",
              alignItems: "end",
              justifyContent: "left",
            }}
            onSubmit={handleSearch}
          >
            <input
              placeholder="Search by name"
              className="border-solid border-2 border-black p-2"
              onChange={handleSearch}
            />
          </form>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Create At</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Disable/Enable</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listNews.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    style={{ fontSize: "30px" }}
                  >
                    The result not available !!!
                  </TableCell>
                </TableRow>
              ) : (
                listNews &&
                listNews.length > 0 &&
                listNews.slice(startIndex, endIndex).map((item, index) => {
                  const staff = listOfStaff.find(
                    (x) => x._id === item.staff_id
                  );
                  return (
                    <TableRow key={item._id}>
                      <TableCell>
                        {moment(item.createdAt).format("DD/MM/YY")}
                      </TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell>{item.content}</TableCell>
                      <TableCell>{staff ? staff.username : "N/A"}</TableCell>
                      <TableCell>
                        <StatusButton status={item.status} />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={item.status}
                          onChange={() => handleToggleStatus(item._id)}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          color="warning"
                          component={Link}
                          to={`/updatesenews/${item._id}`}
                          style={{ fontSize: "10px" }}
                        >
                          Update & Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination gap-7" style={{ marginTop: "10px" }}>
          <Button
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            className="previous-button border"
            color="primary"
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`page-button ${
                  currentPage === page ? "active" : ""
                }`}
              >
                {page}
              </button>
            )
          )}
          <Button
            className="next-button border"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            color="primary"
          >
            Next
          </Button>
        </div>
      </Container>

      <Modal
        open={showConfirmModal}
        onClose={handleCancel}
        closeAfterTransition
      >
        <Fade in={showConfirmModal}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Paper
              style={{
                width: "400px",
                padding: "2em",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
              }}
              elevation={3}
            >
              <h3
                style={{
                  marginBottom: "1em",
                  fontSize: "1.5em",
                  fontWeight: "bold",
                }}
              >
                Confirmation
              </h3>
              <p>Are you sure you want to change the status of this Course?</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleStatusToggleConfirm}
                  style={{ marginRight: "1rem", backgroundColor: "black" }}
                >
                  Confirm
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  style={{
                    backgroundColor: "#fff",
                    color: "#000",
                    border: "2px solid #000",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default BasicExample;
