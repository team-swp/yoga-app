import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Typography } from '@mui/material';
import Footer from '../Footer/Footer';
import Navigation from '../Header/Navigation/Navigation';
import { CSSTransition } from 'react-transition-group';
const baseUrl = 'https://yoga-app-swp.onrender.com/api/news/get';

function NewsList() {
  const [list, setList] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isNewsSelected, setIsNewsSelected] = useState(false);
 
  useEffect(() => {
    const test = async () => {
      const { data } = await axios.get(`${baseUrl}`);
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const filterData = data.filter((item) => item.status === true);
      const latestItem = filterData[0];
      setListOrigin([latestItem]);
    };
    test();
  }, []);

  useEffect(() => {
    function compare(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    }
    const test = async () => {
      const { data } = await axios.get(`${baseUrl}`);
      const filterData = data.filter((item) => item.status === true);
      setList(filterData.sort(compare));
    };
    test();
  }, []);

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
          marginTop:"20px"
          ,marginBottom:"10px"
        }}
      >
        {' '}
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
          <div style={{ flex: '1', maxWidth: '60rem' }}>
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

        <div style={{ flex: '1' }}>
          {list.map((news, index) => {
            return (
              
              <div key={index} onClick={() => handleNewsClick(news)}>
                <div className="row mb-4 border-bottom pb-2">
                  <div className="col-3" style={{ marginTop: '10px' }}>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                      className="img-fluid shadow-1-strong rounded"
                      alt="Hollywood Sign on The Hill"
                    />
                  </div>

                  <div className="col-6">
                    <strong>{news.subject}</strong>
                    <p>
                      <u>{moment(news.createdAt).format('DD/MM/YY')}</u>
                    </p>
                    <div>{news.content}</div>
                  </div>
                </div>
                
              </div>
             
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewsList;