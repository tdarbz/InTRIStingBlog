import React from 'react';
import axios from 'axios';

function Article({ article, fetchArticles }) {
  const updateArticle = async () => {
    // Prompt for new title and content
    const newTitle = prompt('New title:', article.title);
    const newContent = prompt('New content:', article.content);

    // If the user cancels either prompt, the value will be null
    // In such a case, retain the original value
    const updatedTitle = newTitle !== null ? newTitle : article.title;
    const updatedContent = newContent !== null ? newContent : article.content;

    // Proceed only if there are changes
    if (updatedTitle !== article.title || updatedContent !== article.content) {
      try {
        await axios.put(`http://localhost:5050/articles/${article._id}`, {
          title: updatedTitle,
          content: updatedContent
        });
        fetchArticles(); // Refresh the articles list
      } catch (error) {
        console.error('Error updating article:', error);
        alert('Error updating article');
      }
    }
  };

  const deleteArticle = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this article?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5050/articles/${article._id}`);
        fetchArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('Error deleting article');
      }
    }
  };

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <p>Written by {article.author}</p>
      <button onClick={updateArticle}>Update</button>
      <button onClick={deleteArticle}>Delete</button>
    </div>
  );
}

export default Article;
