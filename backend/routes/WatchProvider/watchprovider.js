import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const router = Router();

// Helper Function to Fetch Data from TMDB API
const fetchData = async (url, res) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`, // Use TMDB token from .env
    },
  };

  try {
    const response = await axios.get(url, options);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
};

// Route: Fetch All Regions
router.get('/regions', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/watch/providers/regions?language=en-US';
  fetchData(url, res);
});

// Route: Fetch Movie Providers
router.get('/movies', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/watch/providers/movie?language=en-US';
  fetchData(url, res);
});

// Route: Fetch TV Providers
router.get('/tv', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/watch/providers/tv?language=en-US';
  fetchData(url, res);
});

export default router; // ES Module export
