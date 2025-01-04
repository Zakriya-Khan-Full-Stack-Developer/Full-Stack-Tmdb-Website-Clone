import React, { useState, useEffect, useCallback } from "react";
import apiClient from "../apiInstance/apiInstance";

const QuizUi = () => {
  const [time, setTime] = useState(15);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState(null);

  const fetchQuizQuestions = useCallback(async () => {
    try {
      const response = await apiClient.get("/movie-quiz");
      const quizQuestions = response.data;

      if (quizQuestions.length > 0) {
        setQuestions(quizQuestions);
        setAnswers(new Array(quizQuestions.length).fill("")); 
        setTime(15);
        setQuestionIndex(0);
        setIsQuizComplete(false);
        setScore(0);
        setQuizSubmitted(false);
      } else {
        setErrorMessage("No questions available. Please try again later.");
      }
    } catch (error) {
      setErrorMessage("Failed to load quiz questions. Please try again later.");
      console.error("Error fetching quiz questions:", error);
    }
  }, []);

  const fetchUsername = useCallback(async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setErrorMessage("Please log in to access the quiz.");
      return;
    }
    try {
      const response = await apiClient.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.user.username);
    } catch (error) {
      setErrorMessage("Failed to fetch user profile. Please try again later.");
      console.error("Error fetching username:", error);
    }
  }, []);

  useEffect(() => {
    fetchQuizQuestions();
    fetchUsername();
  }, [fetchQuizQuestions, fetchUsername]);

  const handleAnswerSelect = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = option;
    setAnswers(updatedAnswers);
  };

  useEffect(() => {
    if (time === 0) {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prevIndex) => prevIndex + 1);
        setTime(15);
      } else {
        setIsQuizComplete(true);
      }
    }
    const timer = setInterval(() => setTime((prev) => Math.max(prev - 1, 0)), 1000);
    return () => clearInterval(timer);
  }, [time, questionIndex, questions.length]);

  const submitQuiz = async () => {
    if (!username) {
      setErrorMessage("Please log in to submit your quiz.");
      return;
    }

    const calculatedScore = answers.reduce((acc, answer, index) => {
      return answer === questions[index]?.options[questions[index]?.correctOptionIndex]
        ? acc + 1
        : acc;
    }, 0);

    setScore(calculatedScore);
    setIsQuizComplete(true);
    setQuizSubmitted(true);

    // Save score to localStorage
    try {
      localStorage.setItem("score", calculatedScore);
      console.log("Score saved to localStorage:", calculatedScore);
    } catch (error) {
      setErrorMessage("Failed to save your score. Please try again.");
      console.error("Error saving score:", error);
    }

    try {
      await apiClient.post("/submit-quiz", {
        username,
        answers,
      });
    } catch (error) {
      setErrorMessage("Failed to submit the quiz. Please try again.");
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
      <div className="w-96 p-6 bg-purple-100 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-700">Quiz</h2>
          <div className="bg-purple-700 text-white px-3 py-1 rounded-full">
            <span>Time:</span>
            <span className="ml-1 font-bold">{time}</span>
          </div>
        </div>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        {!isQuizComplete ? (
          <>
            <p className="text-lg font-medium text-gray-800 mb-4">
              {questions[questionIndex]?.text || "Loading question..."}
            </p>
            <div className="space-y-3">
              {questions[questionIndex]?.options.map((option, i) => (
                <button
                  key={i}
                  className={`w-full py-2 px-4 rounded-lg font-medium ${
                    answers[questionIndex] === option
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">
                {questionIndex + 1} of {questions.length} Questions
              </span>
              <button
                onClick={
                  questionIndex === questions.length - 1 ? submitQuiz : () => setQuestionIndex((prev) => prev + 1)
                }
                className="bg-purple-700 text-white px-4 py-2 rounded-lg"
              >
                {questionIndex === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-purple-700">Quiz Complete!</h3>
            <p className="text-lg">Your Score: {score}</p>
            <button onClick={fetchQuizQuestions} className="bg-purple-700 text-white px-4 py-2 rounded-lg mt-4">
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizUi;
