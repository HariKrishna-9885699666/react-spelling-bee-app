import React, { useState } from 'react';
import { Question } from '../../data/words';

interface RewriteMissingQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  showResult?: boolean;
}

export default function RewriteMissingQuestion({ question, onAnswer, showResult }: RewriteMissingQuestionProps) {
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
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Rewrite with Missing Letters</h3>
        <div className="text-2xl font-mono font-bold text-blue-600 bg-blue-50 p-4 rounded-xl text-center tracking-wider">
          {question.question.replace('Spot the missing letter and rewrite: ', '')}
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Find the missing letter and write the complete word
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rewrite-answer" className="block text-sm font-medium text-gray-700 mb-2">
            Rewrite the complete word:
          </label>
          <input
            type="text"
            id="rewrite-answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={`w-full px-4 py-3 text-lg font-medium border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
              isCorrect 
                ? 'border-green-500 bg-green-50 text-green-800' 
                : isIncorrect 
                ? 'border-red-500 bg-red-50 text-red-800'
                : 'border-blue-200 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Type the complete word..."
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
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            Submit Answer
          </button>
        )}
      </form>
    </div>
  );
}