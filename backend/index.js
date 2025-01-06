import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes imports
import connectDB from './db/db.js';
import trendingRoute from './routes/trending/trendingRoute.js';
import popularRoute from './routes/popular/popularRoute.js';
import popularDetail from './routes/popular/poularDetailRoute.js';
import movieList from './routes/Movies/MovielistRoute.js';
import MovieDetails from './routes/Movies/MovieDetails.js';
import tvList from './routes/TV/tvList.js';
import tvDetail from './routes/TV/tvDetail.js';
import tvEpisode from './routes/TV/tvEpisode.js';
import tvSeasonDetail from './routes/TV/tvSeasonsDetail.js';
import watchProvider from './routes/WatchProvider/watchprovider.js';
import searchBar from './routes/searchbar/Searchbarroute.js';
import userRoutes from './routes/userRoute.js';
import mediaRoute from './routes/mediaRoute.js';
import certification from './routes/certification/certificationRoute.js';
import configuration from './routes/configuration/conigurationRoute.js';
import quizRoute from './routes/Quiz/quizRoute.js';
import crediDetail from './routes/creditDetail.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Constants
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1'; // Default API version if not set

// Database connection
connectDB();

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: "https://movie-app-netlify.vercel.app" || 'https://full-stack-tmdb-website-clone.vercel.app', // Adjust as per production or development environment
};
app.use(cors(corsOptions));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to `true` if using HTTPS
  })
);

// Custom middleware: Logger for incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// TMDB API Routes (direct routes to backend, no proxy)
app.use(`/api/v3/tmdb`, trendingRoute);
app.use(`/api/v3/tmdb`, popularRoute);
app.use(`/api/v3/tmdb`, popularDetail);
app.use(`/api/v3/tmdb`, tvList);
app.use(`/api/v3/tmdb`, movieList);
app.use(`/api/v3/tmdb`, tvDetail);
app.use(`/api/v3/tmdb`, MovieDetails);

// Routes for API Version (e.g. v1, v2, etc.)
app.use(`/api/${API_VERSION}/tmdb`, searchBar);
app.use(`/api/${API_VERSION}/tmdb`, tvEpisode);
app.use(`/api/${API_VERSION}/tmdb`, tvSeasonDetail);
app.use(`/api/${API_VERSION}/tmdb`, watchProvider);
app.use(`/api/${API_VERSION}/tmdb`, certification);
app.use(`/api/${API_VERSION}/tmdb`, configuration);
app.use(`/api/${API_VERSION}/tmdb`, quizRoute);
app.use(`/api/${API_VERSION}/tmdb`, userRoutes);
app.use(`/api/${API_VERSION}/tmdb`, mediaRoute);
app.use(`/api/${API_VERSION}/tmdb`, crediDetail);

// Root Route & Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the TMDB API Backend!',
    docs: `http://localhost:${PORT}/api/${API_VERSION}/tmdb/trending`,
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Service is healthy',
    docs: `http://localhost:${PORT}/api/${API_VERSION}/tmdb/trending`,
  });
});

// 404 Error Handling
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource could not be found.',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server.',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
