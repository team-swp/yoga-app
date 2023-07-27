import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Typography } from '@mui/material';
import Footer from '../Footer/Footer';
import Navigation from '../Header/Navigation/Navigation';
import { CSSTransition } from 'react-transition-group';

const ITEMS_PER_PAGE = 4; // Number of news items per page
const baseUrl = 'https://yoga-app-swp.onrender.com/api/news/get';

function NewsList() {
  const [list, setList] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isNewsSelected, setIsNewsSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(baseUrl);
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const filterData = data.filter((item) => item.status === true);
        setListOrigin([filterData[0]]);
        setList(filterData);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchData();
  }, []);

  // Calculate the total number of pages based on the number of news items
  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to get the current page's news items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return list.slice(startIndex, endIndex);
  };

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setIsNewsSelected(true);
  };

  const handleBackToList = () => {
    setIsNewsSelected(false);
  };

  return (
    <div
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginBottom: '10px',
      }}
    >
      <Navigation />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h4" gutterTop style={{ fontFamily: 'SangBleu Sunrise' }}>
          NOTIFICATIONS
        </Typography>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 4,
          justifyContent: 'space-evenly',
          marginTop: '10px',
          flexWrap: 'wrap',
          marginBottom: '10px',
        }}
      >
        {isNewsSelected && selectedNews ? (
          <div style={{ flex: '1', maxWidth: '60rem', marginLeft: "20px" }}>
            <div className="card px-3 pt-3">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4" data-mdb-ripple-color="light">
                  <img src="https://mdbcdn.b-cdn.net/img/new/fluid/city/113.webp" className="img-fluid" alt="Selected News" />
                  <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </div>

                <div className="row mb-3">
                  <div className="text-end">
                    <h4>{moment(selectedNews.createdAt).format('DD/MM/YY')}</h4>
                  </div>
                </div>

                <h4>
                  <strong>{selectedNews.subject}</strong>
                </h4>

                <p style={{ marginTop: '10px' }}>{selectedNews.content}</p>

                <hr />
                <button onClick={handleBackToList}>Back to News List</button>
              </div>
            </div>
          </div>
        ) : null}

        <div style={{ flex: '1', marginLeft: "50px" }}>
          {getCurrentPageItems().map((news, index) => (
            <div key={index} onClick={() => handleNewsClick(news)} style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', cursor: 'pointer' }}>
              <div className="row mb-4 border-bottom pb-2">
                <div className="col-3" style={{ marginTop: '10px' }}>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                    className="img-fluid shadow-1-strong rounded"
                    alt="Hollywood Sign on The Hill"
                  />
                </div>

                <div className="col-9">
                  <strong>{news.subject}</strong>
                  <p>
                    <u>{moment(news.createdAt).format('DD/MM/YY')}</u>
                  </p>
                  <div>{news.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination controls */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous Page
        </button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next Page
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default NewsList;
