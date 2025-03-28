import axios from 'axios';

// Set the baseURL to point directly to the external API URL
const apiClient = axios.create({
  baseURL: "https://full-stack-tmdb-website-clone.vercel.app/api/v3/tmdb",  // Direct URL to your external API
  headers: {
    'Content-Type': 'application/json',
    // Add any custom headers if needed, such as authorization tokens
  },
  timeout: 10000, // Optional timeout for requests
});

// Add interceptors if needed for logging, error handling, or attaching tokens
apiClient.interceptors.request.use(
  (config) => {
    // Modify request config if needed, e.g., attach tokens
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
