// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Article from '/Users/satoshi/Downloads/perscholas/Darby_Tristan_BlogInTRISting_Capstone/blog-app/src/components/Article.js'; // Make sure this path is correct

function App() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:3000/articles'); // Make sure to use the correct port
      setArticles(res.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      alert('Error fetching articles');
    }
  };

  const createArticle = async () => {
    const newArticle = { title, content, author };
    try {
      await axios.post('http://localhost:3000/articles', newArticle); // Make sure to use the correct port
      fetchArticles();
      setTitle(''); // Clear the input fields after submission
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error('Failed to create article:', error);
      alert('Failed to create article'); // Displaying a simple alert, or you could set error messages in state
    }
  };

  return (
    <div>
      <h1>InTristing Blog</h1>
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
        <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" />
        <button onClick={createArticle}>Create Article</button>
      </div>
      {articles.map(article => (
        <Article key={article._id} article={article} fetchArticles={fetchArticles} />
      ))}
    </div>
  );
}

export default App;
