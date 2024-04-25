// ArticleForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ArticleForm({ fetchArticles }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const createArticle = async () => {
    const newArticle = { title, content, author };
    await axios.post('http://localhost:3000/articles', newArticle);
    fetchArticles();
  };

  return (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" />
      <button onClick={createArticle}>Create Article</button>
    </div>
  );
}

export default ArticleForm;
