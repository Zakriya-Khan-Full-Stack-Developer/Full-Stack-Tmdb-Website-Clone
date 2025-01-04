import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js'; // Adjust the path as per your project structure

const authMiddleware = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: 'Authorization token is missing.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    // Fetch the user from the database
    const user = await User.findById(decoded.id).select('-password'); // Exclude password for security
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized access.', details: error.message });
  }
};

export default authMiddleware;
