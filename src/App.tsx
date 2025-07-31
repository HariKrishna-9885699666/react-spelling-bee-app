import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ActivityScreen from './components/ActivityScreen';
import ResultsScreen from './components/ResultsScreen';
import ContactModal from './components/ContactModal';
import { ActivityType, Question } from './data/words';

type AppState = 'landing' | 'activity' | 'results';

interface Results {
  questions: Question[];
  score: number;
}

function App() {
  // Home button handler
  const handleHomeClick = () => {
    setCurrentState('landing');
    setSelectedActivity(null);
    setResults(null);
  };
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [results, setResults] = useState<Results | null>(null);

  const handleActivitySelect = (activity: ActivityType) => {
    setSelectedActivity(activity);
    setCurrentState('activity');
  };

  const handleActivityComplete = (activityResults: Results) => {
    setResults(activityResults);
    setCurrentState('results');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
    setSelectedActivity(null);
    setResults(null);
  };

  const handleRetry = () => {
    if (selectedActivity) {
      setCurrentState('activity');
      setResults(null);
    }
  };

  return (
    <div className="App">
      {/* Home Icon Top Right */}
      <button
        className="fixed top-6 right-6 z-50 bg-cyan-600 hover:bg-cyan-800 text-white rounded-full p-2 shadow-lg transition-all"
        aria-label="Home"
        onClick={handleHomeClick}
      >
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#22d3ee" strokeWidth="2" fill="#22d3ee" />
          <path d="M3 12l9-9 9 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 21V12h6v9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {currentState === 'landing' && (
        <LandingPage onActivitySelect={handleActivitySelect} />
      )}
      {currentState === 'activity' && selectedActivity && (
        <ActivityScreen
          activityType={selectedActivity}
          onComplete={handleActivityComplete}
          onBack={handleBackToLanding}
        />
      )}
      {currentState === 'results' && results && (
        <ResultsScreen
          questions={results.questions}
          score={results.score}
          onRetry={handleRetry}
          onHome={handleBackToLanding}
        />
      )}
      <ContactModal />
    </div>
  );
}

export default App;