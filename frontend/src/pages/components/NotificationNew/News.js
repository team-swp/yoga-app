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

const NewsPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleClick = (id) => {
    const listNew = listNews.find((article) => article._id === id);
    setSelectedArticle(listNew);
  };

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
       const statuses = response.data.filter((x) => x.status === true)
        setListNews(statuses.sort(compare));
      } catch (error) {
        console.log("Failed to fetch news");
      }
    }
    fetchNews();
  }, []);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Header/>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontFamily:'cursive' }}> <Typography variant="h4" gutterBottom >
       Notification
      </Typography></div>
     

      <Paper style={{ maxHeight: '400px', overflow: 'auto', marginBottom: '20px' }}>
      <List component="nav">
        {listNews.map((article) => (
          <ListItem
            key={article._id}
            button
            onClick={() => handleArticleClick(article._id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
          
            <ListItemText style={{ marginLeft: '10px' }} primary={article.subject} />
            <Button
              onClick={handleModalOpen}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                marginLeft: 'auto'
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
          <Modal open={openModal} onClose={handleModalClose}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60%", backgroundColor: "#fff", padding: "20px" }}>
              <Typography variant="h6" gutterBottom>
                {selectedArticle.subject}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedArticle.content}
              </Typography>
            </div>
          </Modal>
         
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default NewsPage;
