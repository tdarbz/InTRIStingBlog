// ArticleList.js
import React from 'react';
import Article from './Article';

function ArticleList({ articles, fetchArticles }) {
  return (
    <div>
      {articles.map(article => (
        <Article key={article._id} article={article} fetchArticles={fetchArticles} />
      ))}
    </div>
  );
}

export default ArticleList;
