import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const articles = [
  {
    id: 1,
    title: 'Article 1',
    content: 'Content of Article 1',
  },
  {
    id: 2,
    title: 'Article 2',
    content: 'Content of Article 2',
  },
  {
    id: 3,
    title: 'Article 3',
    content: 'Content of Article 3',
  },
];






const NewsPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleClick = (id) => {
    const article = articles.find((article) => article.id === id);
    setSelectedArticle(article);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        News Page
      </Typography>

      <Paper style={{ maxHeight: '400px', overflow: 'auto' }}>
        <List component="nav">
          {articles.map((article) => (
            <ListItem
              key={article.id}
              button
              onClick={() => handleArticleClick(article.id)}
            >
              <ListItemText primary={article.title} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {selectedArticle && (
        <div>
          <Typography variant="h6" gutterBottom>
            {selectedArticle.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedArticle.content}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
