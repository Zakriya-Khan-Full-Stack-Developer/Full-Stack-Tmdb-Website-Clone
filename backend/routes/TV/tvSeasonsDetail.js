import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const router = express.Router();
const AUTH_TOKEN = process.env.TMDB_API_TOKEN; // Make sure your token is in .env

// Helper function for fetching data using axios
const fetchData = async (url, description, res) => {
  try {
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`, // Using TMDB token from .env
      },
    });
    res.json({ description, data: response.data });
  } catch (error) {
    res.status(500).json({ error: `Error fetching ${description}:`, message: error.message });
  }
};

// Route 1: Get Season Details
router.get('/tv/:id/season/:season_number', async (req, res) => {
  const { id, season_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?language=en-US`;
  fetchData(url, 'Season Details', res);
});

// Route 2: Get Season Account States
router.get('/tv/:id/season/:season_number/account_states', async (req, res) => {
  const { id, season_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/account_states`;
  fetchData(url, 'Season Account States', res);
});

// Route 3: Get Season Aggregate Credits
router.get('/tv/:id/season/:season_number/aggregate_credits', async (req, res) => {
  const { id, season_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/aggregate_credits?language=en-US`;
  fetchData(url, 'Season Aggregate Credits', res);
});

// Route 4: Get Season Credits
router.get('/tv/:id/season/:season_number/credits', async (req, res) => {
  const { id, season_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/credits?language=en-US`;
  fetchData(url, 'Season Credits', res);
});

// Route 5: Get Season Images
router.get('/tv/:id/season/:season_number/images', async (req, res) => {
  const { id, season_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/images`;
  fetchData(url, 'Season Images', res);
});

// Route 6: Get Season Translations
router.get('/tv/:id/season/:season_number/translations', async (req, res) => {
  const { id, season_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/translations`;
  fetchData(url, 'Season Translations', res);
});

// Route 7: Get Season Videos
router.get('/tv/:id/season/:season_number/videos', async (req, res) => {
  const { id, season_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/videos?language=en-US`;
  fetchData(url, 'Season Videos', res);
});

// Route 8: Get Season Watch Providers
router.get('/tv/:id/season/:season_number/watch/providers', async (req, res) => {
  const { id, season_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/watch/providers?language=en-US`;
  fetchData(url, 'Season Watch Providers', res);
});

export default router;
