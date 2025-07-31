import React, { useState } from 'react';
import { Question } from '../../data/words';

interface FillMissingQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  showResult?: boolean;
}

export default function FillMissingQuestion({ question, onAnswer, showResult }: FillMissingQuestionProps) {
  const [answer, setAnswer] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onAnswer(answer.trim().toLowerCase());
    }
  };

  const isCorrect = showResult && question.isCorrect;
  const isIncorrect = showResult && question.isCorrect === false;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Fill in the Missing Letters</h3>
        <div className="text-2xl font-mono font-bold text-purple-600 bg-purple-50 p-4 rounded-xl text-center tracking-wider">
          {question.question.replace('Fill in the missing letters: ', '')}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
            Your answer:
          </label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={`w-full px-4 py-3 text-lg font-medium border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
              isCorrect 
                ? 'border-green-500 bg-green-50 text-green-800' 
                : isIncorrect 
                ? 'border-red-500 bg-red-50 text-red-800'
                : 'border-purple-200 focus:border-purple-500 focus:ring-purple-200'
            }`}
            placeholder="Type the complete word here..."
            disabled={showResult}
          />
        </div>
        
        {showResult && (
          <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
            <div className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </div>
            {isIncorrect && (
              <div className="text-sm text-gray-600 mt-1">
                Correct answer: <span className="font-bold text-green-600">{question.correctAnswer}</span>
              </div>
            )}
          </div>
        )}
        
        {!showResult && (
          <button
            type="submit"
            disabled={!answer.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            Submit Answer
          </button>
        )}
      </form>
    </div>
  );
}