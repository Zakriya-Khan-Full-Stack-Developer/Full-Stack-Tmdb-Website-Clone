import express from 'express';
import axios from 'axios';

const router = express.Router();
const AUTH_TOKEN = process.env.TMDB_API_TOKEN; // Use your token here

// Helper function for fetching data with Axios
const fetchData = async (url, description, res) => {
  try {
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`, // Ensure your API token is added
      },
    });
    res.json({ description, data: response.data });
  } catch (error) {
    res.status(500).json({ error: `Error fetching ${description}:`, message: error.message });
  }
};

// Route: Get External IDs (for a given source)
router.get('/find/external_id', async (req, res) => {
  const external_source = req.query.external_source; // External source should be passed as query parameter
  const url = `https://api.themoviedb.org/3/find/external_id?external_source=${external_source}`;
  fetchData(url, 'External IDs', res);
});

// Route: Get Movie Genres List
router.get('/genre/movie/list', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
  fetchData(url, 'Movie Genres List', res);
});

// Route: Get TV Genres List
router.get('/genre/tv/list', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/genre/tv/list?language=en';
  fetchData(url, 'TV Genres List', res);
});

// Route: Discover Movies (popular)
router.get('/discover/movie', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  fetchData(url, 'Discover Movies', res);
});

// Route: Discover TV Shows (popular)
router.get('/discover/tv', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';
  fetchData(url, 'Discover TV Shows', res);
});

export default router;
