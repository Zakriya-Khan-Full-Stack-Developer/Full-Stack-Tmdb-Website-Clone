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

// Route to fetch TMDB configuration
router.get('/configuration', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/configuration`, {
            headers: TMDB_AUTH_HEADER
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching TMDB configuration:', error);
        res.status(500).json({ error: 'Failed to fetch TMDB configuration' });
    }
});

// Route to fetch configuration countries
router.get('/configuration/countries', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/configuration/countries?language=en-US`, {
            headers: TMDB_AUTH_HEADER
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching configuration countries:', error);
        res.status(500).json({ error: 'Failed to fetch configuration countries' });
    }
});

// Route to fetch configuration jobs
router.get('/configuration/jobs', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/configuration/jobs`, {
            headers: TMDB_AUTH_HEADER
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching configuration jobs:', error);
        res.status(500).json({ error: 'Failed to fetch configuration jobs' });
    }
});

// Route to fetch configuration languages
router.get('/configuration/languages', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/configuration/languages`, {
            headers: TMDB_AUTH_HEADER
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching configuration languages:', error);
        res.status(500).json({ error: 'Failed to fetch configuration languages' });
    }
});

// Route to fetch primary translations
router.get('/configuration/primary_translations', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/configuration/primary_translations`, {
            headers: TMDB_AUTH_HEADER
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching primary translations:', error);
        res.status(500).json({ error: 'Failed to fetch primary translations' });
    }
});

// Route to fetch timezones
router.get('/configuration/timezones', async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/configuration/timezones`, {
            headers: TMDB_AUTH_HEADER
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching timezones:', error);
        res.status(500).json({ error: 'Failed to fetch timezones' });
    }
});

export default router;
