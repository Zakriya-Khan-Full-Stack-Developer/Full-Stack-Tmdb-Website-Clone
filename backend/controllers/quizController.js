import Quiz from '../models/quizSchema.js';
import User from '../models/userSchema.js';
import { Score } from '../models/schema.js';

// Fetch movie trivia questions from the database
export const getMovieQuiz = async (req, res) => {
  try {
    // Fetch 10 random questions using MongoDB's aggregation framework
    const questions = await Quiz.aggregate([{ $sample: { size: 10 } }]);

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "No trivia questions available" });
    }

    const formattedQuestions = questions.map((question) => ({
      text: question.question,
      options: question.options,
      correctOptionIndex: question.correctOptionIndex,
    }));

    res.json(formattedQuestions);
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    res.status(500).json({ message: "Error fetching quiz questions." });
  }
};

// Submit quiz answers and calculate the score
export const submitQuiz = async (req, res) => {
  const { answers, username } = req.body;

  if (!answers || !username) {
    return res.status(400).json({ message: 'Answers and username are required' });
  }

  let score = 0;
  try {
    // Calculate score by multiplying each correct answer by 3
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].correct_answer === answers[i].selected_answer) {
        score += 3; // Multiply each correct answer by 3
      }
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the score to the user's total score
    const totalScore = user.totalScore + score;
    
    user.totalScore = totalScore;
    await user.save();

    res.json({ username, score, totalScore });
  } catch (error) {
    console.error('Error saving score:', error.message);
    res.status(500).json({ message: 'Error saving score', error: error.message });
  }
};

// Get the leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      { $lookup: { from: 'users', localField: 'user_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $sort: { totalScore: -1 } },
      { $limit: 10 },
      { $project: { username: '$user.username', totalScore: 1 } },
    ]);
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error.message);
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
};

// Insert quiz questions into the database
export const insertQuizQuestions = async (req, res) => {
  const questions = req.body;

  const invalidQuestions = questions.filter((question) => !Array.isArray(question.options) || question.options.length !== 4);

  if (invalidQuestions.length > 0) {
    return res.status(400).json({
      message: 'Each question must have exactly 4 options',
      invalidQuestions,
    });
  }

  try {
    const result = await Quiz.insertMany(questions);
    res.status(200).json({ message: `${result.length} quiz questions added successfully!` });
  } catch (error) {
    console.error('Error inserting quiz questions:', error.message);
    res.status(500).json({ message: 'Error inserting quiz questions', error: error.message });
  }
};
