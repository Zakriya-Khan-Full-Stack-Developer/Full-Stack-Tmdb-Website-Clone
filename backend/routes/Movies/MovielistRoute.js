import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const TMDB_BASE_URL_MOVIES = 'https://api.themoviedb.org/3/movie';
const TMDB_BASE_URL_TV = 'https://api.themoviedb.org/3/tv';
const TMDB_TOKEN = `Bearer ${process.env.TMDB_API_TOKEN}`;

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
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
};

// Movie Routes
router.get('/movies/upcoming', (req, res) => {
  const { language = 'en', page = 1 } = req.query;
  const url = `${TMDB_BASE_URL_MOVIES}/upcoming?language=${language}&page=${page}`;
  fetchData(url, res);
});

router.get('/movies/top-rated', (req, res) => {
  const { language = 'en', page = 1 } = req.query;
  const url = `${TMDB_BASE_URL_MOVIES}/top_rated?language=${language}&page=${page}`;
  fetchData(url, res);
});

router.get('/movies/popular', (req, res) => {
  const { language = 'en', page = 1 } = req.query;
  const url = `${TMDB_BASE_URL_MOVIES}/popular?language=${language}&page=${page}`;
  fetchData(url, res);
});

router.get('/movies/now_playing', (req, res) => {
  const { language = 'en', page = 1 } = req.query;
  const url = `${TMDB_BASE_URL_MOVIES}/now_playing?language=${language}&page=${page}`;
  fetchData(url, res);
});

// TV Routes
router.get('/tv/upcoming', (req, res) => {
  const { language = 'en', page = 1 } = req.query;
  const url = `${TMDB_BASE_URL_TV}/on_the_air?language=${language}&page=${page}`;
  fetchData(url, res);
});

router.get('/tv/top-rated', (req, res) => {
  const { language = 'en', page = 1 } = req.query;
  const url = `${TMDB_BASE_URL_TV}/top_rated?language=${language}&page=${page}`;
  fetchData(url, res);
});

router.get('/tv/popular', (req, res) => {
  const { language = 'en', page = 1 } = req.query;
  const url = `${TMDB_BASE_URL_TV}/popular?language=${language}&page=${page}`;
  fetchData(url, res);
});

router.get('/tv/airing_today', (req, res) => {
  const { language = 'en', page = 1 } = req.query;
  const url = `${TMDB_BASE_URL_TV}/airing_today?language=${language}&page=${page}`;
  fetchData(url, res);
});

export default router;
