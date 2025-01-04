import express from 'express';
import axios from 'axios';

const router = express.Router();
const AUTH_TOKEN = process.env.TMDB_API_TOKEN; // Ensure your token is in .env

// Helper function for fetching data
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

// Route 1: Get TV Series Details
router.get('/tv/:id', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
  fetchData(url, 'TV Series Details', res);
});

// Route 2: Get TV Series Account States
router.get('/tv/:id/account_states', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/account_states`;
  fetchData(url, 'TV Series Account States', res);
});

// Route 3: Get TV Series Aggregate Credits
router.get('/tv/:id/aggregate_credits', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=en-US`;
  fetchData(url, 'TV Series Aggregate Credits', res);
});

// Route 4: Get TV Series Alternative Titles
router.get('/tv/:id/alternative_titles', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/alternative_titles`;
  fetchData(url, 'TV Series Alternative Titles', res);
});

// Route 5: Get TV Series Content Ratings
router.get('/tv/:id/content_ratings', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/content_ratings`;
  fetchData(url, 'TV Series Content Ratings', res);
});

// Route 6: Get TV Series Credits
router.get('/tv/:id/credits', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;
  fetchData(url, 'TV Series Credits', res);
});

// Route 7: Get TV Series Episode Groups
router.get('/tv/:id/episode_groups', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/episode_groups`;
  fetchData(url, 'TV Series Episode Groups', res);
});

// Route 8: Get TV Series Images
router.get('/tv/:id/images', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/images`;
  fetchData(url, 'TV Series Images', res);
});

// Route 9: Get TV Series Keywords
router.get('/tv/:id/keywords', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/keywords`;
  fetchData(url, 'TV Series Keywords', res);
});

// Route 10: Get Latest TV Series
router.get('/tv/latest', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/tv/latest';
  fetchData(url, 'Latest TV Series', res);
});

// Route 11: Get TV Series Lists
router.get('/tv/:id/lists', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/lists?language=en-US&page=1`;
  fetchData(url, 'TV Series Lists', res);
});

// New Routes for Recommendations, Similar Shows, and Others

// Route 12: Get TV Series Recommendations
router.get('/tv/:id/recommendations', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`;
  fetchData(url, 'TV Series Recommendations', res);
});

// Route 13: Get TV Series Screened Theatrically
router.get('/tv/:id/screened_theatrically', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/screened_theatrically`;
  fetchData(url, 'TV Series Screened Theatrically', res);
});

// Route 14: Get Similar TV Series
router.get('/tv/:id/similar', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`;
  fetchData(url, 'Similar TV Series', res);
});

// Route 15: Get TV Series Translations
router.get('/tv/:id/translations', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/translations`;
  fetchData(url, 'TV Series Translations', res);
});

// Route 16: Get TV Series Videos
router.get('/tv/:id/videos', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
  fetchData(url, 'TV Series Videos', res);
});

// Route 17: Get TV Series Watch Providers
router.get('/tv/:id/watch/providers', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/watch/providers`;
  fetchData(url, 'TV Series Watch Providers', res);
});

export default router;
