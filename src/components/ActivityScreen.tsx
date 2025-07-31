import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { ActivityType, Question } from '../data/words';
import { generateQuestions } from '../utils/questionGenerator';
import FillMissingQuestion from './questions/FillMissingQuestion';
import CircleCorrectQuestion from './questions/CircleCorrectQuestion';
import RewriteMissingQuestion from './questions/RewriteMissingQuestion';
import UnscrambleQuestion from './questions/UnscrambleQuestion';

interface ActivityScreenProps {
  activityType: ActivityType;
  onComplete: (results: { questions: Question[]; score: number }) => void;
  onBack: () => void;
}

const QUESTIONS_PER_SLIDE = 1;
const TOTAL_QUESTIONS = 20;
const TOTAL_SLIDES = TOTAL_QUESTIONS / QUESTIONS_PER_SLIDE;

export default function ActivityScreen({ activityType, onComplete, onBack }: ActivityScreenProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const generatedQuestions = generateQuestions(activityType, TOTAL_QUESTIONS);
    setQuestions(generatedQuestions);
  }, [activityType]);

  const currentQuestions = questions.slice(
    currentSlide * QUESTIONS_PER_SLIDE,
    (currentSlide + 1) * QUESTIONS_PER_SLIDE
  );

  const handleAnswer = (questionId: string, answer: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        const isCorrect = answer.toLowerCase() === q.correctAnswer.toLowerCase();
        return {
          ...q,
          userAnswer: answer,
          isCorrect
        };
      }
      return q;
    }));

    setAnsweredQuestions(prev => new Set([...prev, questionId]));
  };

  const canProceed = currentQuestions.every(q => answeredQuestions.has(q.id));
  const isLastSlide = currentSlide === TOTAL_SLIDES - 1;

  const handleNext = () => {
    if (isLastSlide) {
      setShowResults(true);
      setTimeout(() => {
        const score = questions.filter(q => q.isCorrect).length;
        onComplete({ questions, score });
      }, 2000);
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const renderQuestion = (question: Question) => {
    const commonProps = {
      question,
      onAnswer: (answer: string) => handleAnswer(question.id, answer),
      showResult: answeredQuestions.has(question.id)
    };

    switch (question.type) {
      case 'fill-missing':
        return <FillMissingQuestion {...commonProps} />;
      case 'circle-correct':
        return <CircleCorrectQuestion {...commonProps} />;
      case 'rewrite-missing':
        return <RewriteMissingQuestion {...commonProps} />;
      case 'unscramble':
        return <UnscrambleQuestion {...commonProps} />;
      default:
        return null;
    }
  };

  const getActivityTitle = () => {
    switch (activityType) {
      case 'fill-missing': return 'Fill Missing Letters';
      case 'circle-correct': return 'Circle Correct Word';
      case 'rewrite-missing': return 'Rewrite Missing Letters';
      case 'unscramble': return 'Unscramble Words';
      default: return 'Spelling Practice';
    }
  };

  const progress = ((currentSlide + 1) / TOTAL_SLIDES) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Great Job!</h2>
          <p className="text-gray-600 mb-6">Processing your results...</p>
          <div className="animate-spin w-8 h-8 border-4 border-green-200 border-t-green-500 rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 pt-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800">{getActivityTitle()}</h1>
            <p className="text-sm text-gray-600">Slide {currentSlide + 1} of {TOTAL_SLIDES}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {answeredQuestions.size} of {TOTAL_QUESTIONS} questions answered
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {currentQuestions.map((question, index) => (
            <div key={question.id} className="transform transition-all duration-300">
              <div className="flex items-center mb-3">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Question {currentSlide * QUESTIONS_PER_SLIDE + index + 1}
                </span>
              </div>
              {renderQuestion(question)}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium transition-all hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium transition-all hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLastSlide ? 'Finish' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}