import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Modal,
  Button,
} from "@mui/material";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import _, { debounce } from "lodash";
import { getNews } from "../../../helper/premiumAPI";
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import moment from "moment";
const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [listNews, setListNews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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
        const statuses = response.data.filter((x) => x.status === true);
        setListNews(statuses.sort(compare));
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

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listNews);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.subject.toLowerCase().includes(term)
      );
      setCurrentPage(1);
      setListNews(cloneListUsers);
    } else {
      async function fetchUsers() {
        try {
          const response = await getNews();
          setListNews(response.data);
        } catch {
          console.log("fail");
        }
      }
      fetchUsers();
    }
  }, 500);

  const totalPages = Math.ceil(listNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleClick = (id) => {
    const listNew = listNews.find((article) => article._id === id);
    setSelectedArticle(listNew);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Header />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontFamily: "SangBleu Sunrise", marginTop: "10px" }}
        >
          News
        </Typography>
      </div>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <form onSubmit={handleSearch}>
          <input
            placeholder="Search by title"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: "5px  ",
              border: " 1px solid black",
              width: "500px",
              height: "35px",
            }}
            onChange={(event) => handleSearch(event)}
          />
          <SearchIcon />
        </form>
      </div>

      <Paper
        style={{
          height: "278px",
          marginBottom: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the alpha value as needed
        }}
      >
        <List component="nav">
          {listNews &&
            listNews.length > 0 &&
            listNews.slice(startIndex, endIndex).map((article) => (
              <ListItem
              key={article._id}
              onClick={() => handleArticleClick(article._id)}
              style={{
                display: "flex",
                borderBottom: "1px solid black",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "10px", fontSize: "14px" }}>
                  {moment(article.createdAt).format("DD/MM/YY")}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontFamily: "SangBleu Sunrise",
                
                    color: "black",
                    marginLeft:'300px'
                  }}
                >
                  {article.subject}
                </div>
              </div>
              <Button
                onClick={handleModalOpen}
                style={{
                  display: "flex",
                  borderBottom: "1px solid black",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                
                  see more
                </Button>
              </ListItem>
            ))}
        </List>
      </Paper>

      {selectedArticle && (
        <div>
          <Modal open={openModal}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "60%",

                padding: "20px",
                backgroundColor: "rgba(300, 300, 300, 1)",
              }}
            >
              <div onClick={handleModalClose}>
                <CloseIcon />
              </div>

              <Typography
                variant="h4"
                gutterBottom
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  fontFamily: "SangBleu Sunrise",
                  fontWeight: "bolder",
                }}
              >
                Trung tâm yoga xin thông báo
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                {selectedArticle.subject}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedArticle.content}
              </Typography>
            </div>
          </Modal>
        </div>
      )}

      <div
        className="pagination gap-7"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
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
              className={`page-button ${currentPage === page ? "active" : ""}`}
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
      <Footer />
    </div>
  );
};

export default NewsPage;
