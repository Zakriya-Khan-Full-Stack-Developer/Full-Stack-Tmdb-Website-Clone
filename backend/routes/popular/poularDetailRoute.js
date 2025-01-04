import express from 'express';
import axios from 'axios';

const router = express.Router();
const AUTH_TOKEN = process.env.TMDB_API_TOKEN; // Make sure your token is in .env

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

// Route 1: Get Person Details
router.get('/person/:id', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
  fetchData(url, 'Person Details', res);
});

// Route 2: Get Person Combined Credits (Movies and TV Shows)
router.get('/person/:id/combined_credits', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`;
  fetchData(url, 'Person Combined Credits (Movies & TV Shows)', res);
});

// Route 3: Get Person External IDs (social media, etc.)
router.get('/person/:id/external_ids', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/person/${id}/external_ids`;
  fetchData(url, 'Person External IDs', res);
});

// Route 4: Get Person Images (Photos, etc.)
router.get('/person/:id/images', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/person/${id}/images`;
  fetchData(url, 'Person Images', res);
});

// Route 5: Get Latest Person Information
router.get('/person/latest', async (req, res) => {
  const url = 'https://api.themoviedb.org/3/person/latest';
  fetchData(url, 'Latest Person Information', res);
});

// Route 6: Get Person Movie Credits
router.get('/person/:id/movie_credits', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`;
  fetchData(url, 'Person Movie Credits', res);
});

// Route 7: Get Person TV Credits
router.get('/person/:id/tv_credits', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/person/${id}/tv_credits?language=en-US`;
  fetchData(url, 'Person TV Credits', res);
});

// Route 8: Get Person Translations
router.get('/person/:id/translations', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/person/${id}/translations`;
  fetchData(url, 'Person Translations', res);
});

export default router;
