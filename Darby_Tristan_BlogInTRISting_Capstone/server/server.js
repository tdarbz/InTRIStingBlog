// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://darbytristan:L1j96guq6JilqGq5@cluster0.bseep8i.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Models
const Article = mongoose.model('Article', new mongoose.Schema({
  title: String,
  content: String,
  author: String
}));

// Routes
app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.send(articles);
  } catch (error) {
    console.error('Error in GET /articles:', error);
    res.status(500).send(error.message);
  }
});

app.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.send(articles);
  } catch (error) {
    console.error('Error in GET /:', error);
    res.status(500).send(error.message);
  }
});

app.post('/', async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    const savedArticle = await newArticle.save();
    res.send(savedArticle);
  } catch (error) {
    console.error('Error in POST /:', error);
    res.status(500).send(error.message);
  }
});

app.post('/articles', async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    const savedArticle = await newArticle.save();
    res.send(savedArticle);
  } catch (error) {
    console.error('Error in POST /articles:', error);
    res.status(500).send(error.message);
  }
});

app.get('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.send(article);
  } catch (error) {
    console.error(`Error in GET /articles/${req.params.id}:`, error);
    res.status(500).send(error.message);
  }
});

app.put('/articles/:id', async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArticle) {
      return res.status(404).send('Article not found');
    }
    res.send(updatedArticle);
  } catch (error) {
    console.error(`Error in PUT /articles/${req.params.id}:`, error);
    res.status(500).send(error.message);
  }
});

app.delete('/articles/:id', async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).send('Article not found');
    }
    res.send(deletedArticle);
  } catch (error) {
    console.error(`Error in DELETE /articles/${req.params.id}:`, error);
    res.status(500).send(error.message);
  }
});

// Start the server on port 5000
const port = 5050;
app.listen(port, () => console.log(`Server listening on port ${port}`));
