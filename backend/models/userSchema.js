import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /.+@.+\..+/.test(v),
      message: 'Please enter a valid email address',
    },
  },
  totalScore: { type: Number, default: 0 },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstName: { type: String, match: /^[A-Za-z\s]+$/ },
  lastName: { type: String, match: /^[A-Za-z\s]+$/ },
  avatar: { type: String },
  dateJoined: { type: Date, default: Date.now },
});

// Middleware: Hash password before saving user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method: Validate password
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create User model
const User = mongoose.model('User', userSchema);

export default User;
