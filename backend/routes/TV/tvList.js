import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// TMDB Base URLs for Movies and TV
const TMDB_BASE_URL_MOVIES = 'https://api.themoviedb.org/3/movie';
const TMDB_BASE_URL_TV = 'https://api.themoviedb.org/3/tv';
const TMDB_TOKEN = `Bearer ${process.env.TMDB_API_TOKEN}`;

// Helper function to fetch data from TMDB
const fetchData = async (url, res) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TMDB_TOKEN,
    },
  };

  try {
    const response = await axios.get(url, options);
    console.log(response.data); // For debugging
    return res.status(200).json(response.data);
  } catch (error) {
    // Handle errors and provide a more detailed response
    if (error.response) {
      console.error('Error fetching data:', error.response.data);
      return res.status(error.response.status).json({ error: error.response.data });
    } else {
      console.error('Error fetching data:', error.message);
      return res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
};

// MOVIE ROUTES
// Route for fetching movies by category (upcoming, popular, top-rated, etc.)
// Movie route in your backend
router.get('/movies/:category', (req, res) => {
  const { category } = req.params; // e.g., "popular", "top-rated"
  const { language = 'en', page = 1 } = req.query;  // Default to language 'en' and page 1
  const url = `${TMDB_BASE_URL_MOVIES}/${category}?language=${language}&page=${page}`;
  fetchData(url, res);
});

// TV ROUTES
// Route for fetching TV shows by category (top-rated, popular, airing today, etc.)
router.get('/tv/:category', (req, res) => {
  const { category } = req.params; // e.g., "top-rated", "popular"
  const { language = 'en', page = 1 } = req.query;
  const url = `${TMDB_BASE_URL_TV}/${category}?language=${language}&page=${page}`;
  fetchData(url, res);
});

export default router;
