import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24d' });
};

// User Registration
export const registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName, avatar } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password, // Will be hashed by pre-save middleware in schema
      firstName,
      lastName,
      avatar,
    });

    // Save user to DB
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Registration error:', error.message); // Log the error message
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await user.isValidPassword(password);
    console.log("Entered Email:", email);
    console.log("Entered Password:", password);
    console.log("Stored User Object:", user);
    console.log("Stored Password in DB:", user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error.message); // Log the error message
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Middleware to protect routes
export const protectRoute = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Add decoded user data to request
    next();
  } catch (error) {
    console.error('Token verification error:', error.message); // Log the error message
    return res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // This comes from the 'protectRoute' middleware

    // Fetch user data from the database
    const user = await User.findById(userId).select('-password'); // Exclude the password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profile retrieval error:', error.message); // Log the error message
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    // Fetch the top 10 users based on totalScore
    const leaderboard = await User.find()
      .sort({ totalScore: -1 }) // Sort by totalScore in descending order
      .limit(10)                // Limit to top 10
      .select('username totalScore'); // Select only username and totalScore fields
 console.log(leaderboard,"leaderboard")
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error.message);
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
};
