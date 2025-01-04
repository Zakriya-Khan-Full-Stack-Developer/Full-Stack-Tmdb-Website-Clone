import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question text is required'],
  },
  options: [{
    type: String,
    required: [true, 'Each option is required'],
  }],
  correctOptionIndex: {
    type: Number,
    required: [true, 'Correct option index is required'],
    min: [0, 'Index must be at least 0'],
    max: [3, 'Index must be at most 3'],
  },
  category: {
    type: String,
    default: 'Movie',
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'hard',
  },
});

// Custom validation for the options array to ensure it has exactly 4 options
quizSchema.path('options').validate(function (value) {
  return value.length === 4;
}, 'There must be exactly 4 options for each question');

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
