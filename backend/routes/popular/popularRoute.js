import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Helper Function to Fetch Data
const fetchData = async (url, res) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`, // Use TMDB token from .env
    },
  };

  try {
    const response = await axios.get(url, options);
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
};

// Route: Fetch Popular People
router.get('/popular/people', async (req, res) => {
  // Get language, page, and perPage from query params (default to 'en-US', '1', and '10' respectively if not provided)
  const language = req.query.language || 'en-US';
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;  // Default to 10 people per page if not provided

  // Construct URL with query parameters
  const url = `https://api.themoviedb.org/3/person/popular?language=${language}&page=${page}&per_page=${perPage}`;

  // Fetch the data and return it to the client
  fetchData(url, res);
});

export default router;
