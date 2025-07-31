import React, { useState } from 'react';
import { Question } from '../../data/words';

interface UnscrambleQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  showResult?: boolean;
}

export default function UnscrambleQuestion({ question, onAnswer, showResult }: UnscrambleQuestionProps) {
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
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Unscramble the Word</h3>
        <div className="text-2xl font-mono font-bold text-green-600 bg-green-50 p-4 rounded-xl text-center tracking-wider">
          {question.question.replace('Unscramble the letters: ', '')}
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Rearrange the letters to form the correct word
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="unscramble-answer" className="block text-sm font-medium text-gray-700 mb-2">
            Your answer:
          </label>
          <input
            type="text"
            id="unscramble-answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={`w-full px-4 py-3 text-lg font-medium border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
              isCorrect 
                ? 'border-green-500 bg-green-50 text-green-800' 
                : isIncorrect 
                ? 'border-red-500 bg-red-50 text-red-800'
                : 'border-green-200 focus:border-green-500 focus:ring-green-200'
            }`}
            placeholder="Type the unscrambled word..."
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
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            Submit Answer
          </button>
        )}
      </form>
    </div>
  );
}