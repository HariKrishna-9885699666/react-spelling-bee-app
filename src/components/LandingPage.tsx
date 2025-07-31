import React from 'react';
import { BookOpen, Edit3, CheckCircle, Shuffle } from 'lucide-react';
import { ActivityType } from '../data/words';

interface LandingPageProps {
  onActivitySelect: (activity: ActivityType) => void;
  onWordListSelect: (type: 'word-list-1' | 'word-list-2') => void;
}

const activities = [
  {
    type: 'fill-missing' as ActivityType,
    title: 'Fill Missing Letters',
    description: 'Complete each word by filling in the missing letters',
    icon: Edit3,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    type: 'circle-correct' as ActivityType,
    title: 'Circle Correct Word',
    description: 'Find and select the correctly spelled word',
    icon: CheckCircle,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-100',
  },
  {
    type: 'rewrite-missing' as ActivityType,
    title: 'Rewrite Missing Letters',
    description: 'Spot missing letters and rewrite the word',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    type: 'unscramble' as ActivityType,
    title: 'Unscramble Words',
    description: 'Rearrange jumbled letters to form correct words',
    icon: Shuffle,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-100',
  },
];

export default function LandingPage({ onActivitySelect, onWordListSelect }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Spelling Bee
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Practice your spelling skills with fun interactive activities!
          </p>
        </div>

        {/* Word List Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow text-sm"
            onClick={() => onWordListSelect('word-list-1')}
          >
            Word List 1
          </button>
          <button
            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow text-sm"
            onClick={() => onWordListSelect('word-list-2')}
          >
            Word List 2
          </button>
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={activity.type}
                onClick={() => onActivitySelect(activity.type)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className={`${activity.bgColor} rounded-2xl p-6 border-2 border-white shadow-lg backdrop-blur-sm`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${activity.color} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 ml-4">
                      {activity.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {activity.description}
                  </p>
                  <div className="mt-4 flex items-center text-purple-600 font-medium text-sm group-hover:text-purple-700 transition-colors">
                    Start Practice
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h3 className="text-lg font-bold text-gray-800 mb-3">How it works:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">1</div>
              Choose an activity type
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">2</div>
              Answer 20 spelling questions
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">3</div>
              See your results & try again!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}