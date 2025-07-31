import React from 'react';
import { Trophy, RotateCcw, Home, Star } from 'lucide-react';
import { Question } from '../data/words';

interface ResultsScreenProps {
  questions: Question[];
  score: number;
  onRetry: () => void;
  onHome: () => void;
}

export default function ResultsScreen({ questions, score, onRetry, onHome }: ResultsScreenProps) {
  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! You're a spelling champion! 🏆", color: "text-yellow-600" };
    if (percentage >= 80) return { message: "Excellent work! Keep it up! ⭐", color: "text-green-600" };
    if (percentage >= 70) return { message: "Good job! You're improving! 👍", color: "text-blue-600" };
    if (percentage >= 60) return { message: "Nice try! Practice makes perfect! 💪", color: "text-purple-600" };
    return { message: "Keep practicing, you'll get better! 🌟", color: "text-pink-600" };
  };

  const performance = getPerformanceMessage();
  
  const getStars = () => {
    if (percentage >= 90) return 5;
    if (percentage >= 80) return 4;
    if (percentage >= 70) return 3;
    if (percentage >= 60) return 2;
    return 1;
  };

  const stars = getStars();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Main Results Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center mb-6">
          {/* Trophy Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
            <Trophy className="w-12 h-12 text-white" />
          </div>

          {/* Score Display */}
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Test Complete!</h1>
          <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {score}/{totalQuestions}
          </div>
          <div className="text-2xl font-bold text-gray-700 mb-6">
            {percentage}% Correct
          </div>

          {/* Stars */}
          <div className="flex justify-center space-x-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i < stars 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Performance Message */}
          <p className={`text-xl font-semibold mb-8 ${performance.color}`}>
            {performance.message}
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-500 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              You got {score} questions right out of {totalQuestions}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetry}
              className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl transition-all duration-200 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </button>
            <button
              onClick={onHome}
              className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-xl transition-all duration-200 hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </button>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Question Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            {questions.map((question, index) => (
              <div 
                key={question.id}
                className={`p-3 rounded-lg border-2 ${
                  question.isCorrect 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Q{index + 1}: {question.correctAnswer}
                  </span>
                  <span className={`text-lg ${question.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {question.isCorrect ? '✅' : '❌'}
                  </span>
                </div>
                {!question.isCorrect && question.userAnswer && (
                  <div className="text-xs text-red-600 mt-1">
                    Your answer: {question.userAnswer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}