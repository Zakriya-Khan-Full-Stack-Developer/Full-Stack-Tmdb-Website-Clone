import express from 'express';
import axios from 'axios';

const router = express.Router();
const AUTH_TOKEN = process.env.TMDB_API_TOKEN; // Ensure this is defined in your .env file

// Helper function to handle axios requests
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

// Route 1: Get Episode Details
router.get('/tv/:series_id/season/:season_number/episode/:episode_number', async (req, res) => {
  const { series_id, season_number, episode_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}?language=en-US`;
  fetchData(url, 'Episode Details', res);
});

// Route 2: Get Episode Account States
router.get('/tv/:series_id/season/:season_number/episode/:episode_number/account_states', async (req, res) => {
  const { series_id, season_number, episode_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}/account_states`;
  fetchData(url, 'Episode Account States', res);
});

// Route 3: Get Episode Changes
router.get('/tv/:series_id/season/:season_number/episode/:episode_number/changes', async (req, res) => {
  const { series_id, season_number, episode_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}/changes`;
  fetchData(url, 'Episode Changes', res);
});

// Route 4: Get Episode Credits
router.get('/tv/:series_id/season/:season_number/episode/:episode_number/credits', async (req, res) => {
  const { series_id, season_number, episode_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}/credits?language=en-US`;
  fetchData(url, 'Episode Credits', res);
});

// Route 5: Get Episode External IDs
router.get('/tv/:series_id/season/:season_number/episode/:episode_number/external_ids', async (req, res) => {
  const { series_id, season_number, episode_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}/external_ids`;
  fetchData(url, 'Episode External IDs', res);
});

// Route 6: Get Episode Images
router.get('/tv/:series_id/season/:season_number/episode/:episode_number/images', async (req, res) => {
  const { series_id, season_number, episode_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}/images`;
  fetchData(url, 'Episode Images', res);
});

// Route 7: Get Episode Translations
router.get('/tv/:series_id/season/:season_number/episode/:episode_number/translations', async (req, res) => {
  const { series_id, season_number, episode_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}/translations`;
  fetchData(url, 'Episode Translations', res);
});

// Route 8: Get Episode Videos
router.get('/tv/:series_id/season/:season_number/episode/:episode_number/videos', async (req, res) => {
  const { series_id, season_number, episode_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}/videos?language=en-US`;
  fetchData(url, 'Episode Videos', res);
});

// Route 9: Rate an Episode
router.post('/tv/:series_id/season/:season_number/episode/:episode_number/rating', async (req, res) => {
  const { series_id, season_number, episode_number } = req.params;
  const { value } = req.body; // assuming the rating is sent in the body as a numeric value
  const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}/rating`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
    data: { value },
  };

  try {
    const response = await axios(options);
    res.json({ description: 'Rate Episode', data: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Error rating episode', message: error.message });
  }
});

// Route 10: Delete Rating for Episode
router.delete('/tv/:series_id/season/:season_number/episode/:episode_number/rating', async (req, res) => {
  const { series_id, season_number, episode_number } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}/rating`;
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  };

  try {
    const response = await axios(options);
    res.json({ description: 'Delete Episode Rating', data: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting episode rating', message: error.message });
  }
});

export default router;
