import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Helper Function to Fetch Trending Data
const fetchTrendingData = async (url, res) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`, // Use TMDB token from .env
    },
  };

  try {
    const response = await axios.get(url, options);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching trending data:', error.message);
    return res.status(500).json({ error: 'Failed to fetch trending data' });
  }
};

// Route: Fetch All Trending (Movies + TV + People)
router.get('/trending/all', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
  fetchTrendingData(url, res);
});

// Route: Fetch Trending Movies
router.get('/trending/movies', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  fetchTrendingData(url, res);
});

// Route: Fetch Trending People
router.get('/trending/people', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/trending/person/day?language=en-US';
  fetchTrendingData(url, res);
});

// Route: Fetch Trending TV Shows
router.get('/trending/tv', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
  fetchTrendingData(url, res);
});

export default router; // ES Module export
