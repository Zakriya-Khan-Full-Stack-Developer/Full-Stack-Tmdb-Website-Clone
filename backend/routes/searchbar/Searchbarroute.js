import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const AUTH_TOKEN = process.env.TMDB_API_TOKEN;

// Helper function to fetch data with axios
const fetchData = async (url, description, res) => {
  try {
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    res.json({ description, data: response.data });
  } catch (error) {
    res.status(500).json({ error: `Error fetching ${description}:`, message: error.message });
  }
};

// Updated Routes with Query and Pagination Parameters
router.get('/search/collection', async (req, res) => {
  const query = req.query.query || ''; // Search query
  const page = req.query.page || 1; // Page parameter
  const url = `https://api.themoviedb.org/3/search/collection?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`;
  fetchData(url, 'Collection Search Results', res);
});

router.get('/search/company', async (req, res) => {
  const query = req.query.query || '';
  const page = req.query.page || 1;
  const url = `https://api.themoviedb.org/3/search/company?query=${encodeURIComponent(query)}&page=${page}`;
  fetchData(url, 'Company Search Results', res);
});

router.get('/search/keyword', async (req, res) => {
  const query = req.query.query || '';
  const page = req.query.page || 1;
  const url = `https://api.themoviedb.org/3/search/keyword?query=${encodeURIComponent(query)}&page=${page}`;
  fetchData(url, 'Keyword Search Results', res);
});

router.get('/search/movie', async (req, res) => {
  const query = req.query.query || '';
  const page = req.query.page || 1;
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`;
  fetchData(url, 'Movie Search Results', res);
});

router.get('/search/multi', async (req, res) => {
  const query = req.query.query || '';
  const page = req.query.page || 1;
  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`;
  fetchData(url, 'Multi Search Results', res);
});

router.get('/search/person', async (req, res) => {
  const query = req.query.query || '';
  const page = req.query.page || 1;
  const url = `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`;
  fetchData(url, 'Person Search Results', res);
});

router.get('/search/tv', async (req, res) => {
  const query = req.query.query || '';
  const page = req.query.page || 1;
  const url = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`;
  fetchData(url, 'TV Search Results', res);
});

export default router;
