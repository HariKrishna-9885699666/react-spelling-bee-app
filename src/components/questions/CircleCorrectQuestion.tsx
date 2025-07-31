import React, { useState } from 'react';
import { Question } from '../../data/words';

interface CircleCorrectQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  showResult?: boolean;
}

export default function CircleCorrectQuestion({ question, onAnswer, showResult }: CircleCorrectQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handleSelect = (option: string) => {
    if (!showResult) {
      setSelectedAnswer(option);
      onAnswer(option);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Circle the Correctly Spelled Word</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === option || question.userAnswer === option;
          const isCorrect = showResult && option === question.correctAnswer;
          const isIncorrect = showResult && isSelected && option !== question.correctAnswer;
          
          return (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              disabled={showResult}
              className={`p-4 text-lg font-medium rounded-xl border-2 transition-all duration-200 ${
                isCorrect
                  ? 'border-green-500 bg-green-100 text-green-800'
                  : isIncorrect
                  ? 'border-red-500 bg-red-100 text-red-800'
                  : isSelected
                  ? 'border-pink-500 bg-pink-100 text-pink-800'
                  : 'border-gray-200 bg-gray-50 hover:border-pink-300 hover:bg-pink-50 text-gray-700'
              } ${!showResult ? 'hover:shadow-md cursor-pointer' : 'cursor-default'}`}
            >
              <div className="flex items-center justify-center">
                {showResult && isCorrect && <span className="mr-2">✅</span>}
                {showResult && isIncorrect && <span className="mr-2">❌</span>}
                {option}
              </div>
            </button>
          );
        })}
      </div>
      
      {showResult && (
        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <div className="text-sm text-blue-800">
            <strong>Correct answer:</strong> {question.correctAnswer}
          </div>
        </div>
      )}
    </div>
  );
}