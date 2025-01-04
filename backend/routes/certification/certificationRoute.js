// Import necessary modules
import express from 'express';
import axios from 'axios';

const router = express.Router();

// TMDB API Base URL and Authorization Header
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_AUTH_HEADER = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzczMzM4NGIxMDQ1MGZiYjBjM2NhMWRjMjVkYTc1ZCIsIm5iZiI6MTczNDQyMTcyNC40ODYsInN1YiI6IjY3NjEyY2RjNWM3YTFlZGIxYmI0ZmMxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WLkcD24atXkUGMcMmWhuvy2T_6CcIChiSnP9LWcr2w4',
    accept: 'application/json'
};

// Route to fetch movie certifications
router.get('/certifications/movies', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/certification/movie/list`, {
            headers: TMDB_AUTH_HEADER
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching movie certifications:', error);
        res.status(500).json({ error: 'Failed to fetch movie certifications' });
    }
});

// Route to fetch TV certifications
router.get('/certifications/tv', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/certification/tv/list`, {
            headers: TMDB_AUTH_HEADER
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching TV certifications:', error);
        res.status(500).json({ error: 'Failed to fetch TV certifications' });
    }
});

export default router;
