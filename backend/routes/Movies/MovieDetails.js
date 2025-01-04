import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const TMDB_API_URL = 'https://api.themoviedb.org/3/movie';
const AUTH_TOKEN = process.env.TMDB_API_TOKEN; // Ensure the API token is stored in .env

// Helper function to make axios calls
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

// Route 1: Get Movie Details
router.get('/movie/:id', async (req, res) => {
  const { id } = req.params;
  const url = `${TMDB_API_URL}/${id}?language=en-US`;
  fetchData(url, 'Movie Details', res);
});

// Route 2: Get Account States (rating, watchlist, etc.)
router.get('/movie/:id/account_states', async (req, res) => {
  const { id } = req.params;
  const url = `${TMDB_API_URL}/${id}/account_states`;
  fetchData(url, 'Account States for the Movie', res);
});

// Route 3: Get Alternative Titles
router.get('/movie/:id/alternative_titles', async (req, res) => {
  const { id } = req.params;
  const url = `${TMDB_API_URL}/${id}/alternative_titles`;
  fetchData(url, 'Alternative Titles for the Movie', res);
});

// Route 4: Get Movie Credits (cast and crew)
router.get('/movie/:id/credits', async (req, res) => {
  const { id } = req.params;
  const url = `${TMDB_API_URL}/${id}/credits?language=en-US`;
  fetchData(url, 'Movie Credits (Cast and Crew)', res);
});

// Route 5: Get Movie Keywords
router.get('/movie/:id/keywords', async (req, res) => {
  const { id } = req.params;
  const url = `${TMDB_API_URL}/${id}/keywords`;
  fetchData(url, 'Movie Keywords', res);
});

// Route 6: Get Images (posters, backdrops)
router.get('/movie/:id/images', async (req, res) => {
  const { id } = req.params;
  const url = `${TMDB_API_URL}/${id}/images`;
  fetchData(url, 'Movie Images', res);
});

// Route 7: Get Videos (trailers, teasers)
router.get('/movie/:id/videos', async (req, res) => {
  const { id } = req.params;
  const url = `${TMDB_API_URL}/${id}/videos?language=en-US`;
  fetchData(url, 'Movie Videos (Trailers and Teasers)', res);
});

// Route 8: Get Watch Providers (streaming options)
router.get('/movie/:id/watch/providers', async (req, res) => {
  const { id } = req.params;
  const url = `${TMDB_API_URL}/${id}/watch/providers`;
  fetchData(url, 'Watch Providers for the Movie', res);
});

// Route 9: Get Release Dates
router.get('/movie/:id/release_dates', async (req, res) => {
  const { id } = req.params;
  const url = `${TMDB_API_URL}/${id}/release_dates`;
  fetchData(url, 'Release Dates for the Movie', res);
});

// Route 10: Get Recommendations
router.get('/movie/:id/recommendations', async (req, res) => {
  const { id } = req.params;
  const url = `${TMDB_API_URL}/${id}/recommendations?language=en-US&page=1`;
  fetchData(url, 'Movie Recommendations', res);
});

// New Route: Get Media (videos, backdrops, posters)
router.get('/movie/:id/media', async (req, res) => {
  const { id } = req.params;
  const videoUrl = `${TMDB_API_URL}/${id}/videos?language=en-US`;
  const imageUrl = `${TMDB_API_URL}/${id}/images`;

  try {
    const [videosResponse, imagesResponse] = await Promise.all([
      axios.get(videoUrl, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }),
      axios.get(imageUrl, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }),
    ]);

    const media = {
      videos: videosResponse.data.results,
      backdrops: imagesResponse.data.backdrops,
      posters: imagesResponse.data.posters,
    };

    res.json({ description: 'Movie Media (Videos, Posters, Backdrops)', data: media });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movie media:', message: error.message });
  }
});

export default router;
