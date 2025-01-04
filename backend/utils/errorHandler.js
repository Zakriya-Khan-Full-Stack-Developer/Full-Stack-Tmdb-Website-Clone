// utils/errorHandler.js

export const handleError = (res, error, message = 'An error occurred') => {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle validation error
      return res.status(400).json({ message: 'Validation Error', details: error.errors });
    }
  
    if (error.code === 11000) {
      // Handle duplicate entry error (e.g., duplicate tmdb_id in the same collection)
      return res.status(400).json({ message: 'Duplicate entry detected', details: error.keyValue });
    }
  
    // General server error handler
    console.error(error);
    return res.status(500).json({ message, error: error.message });
  };
  