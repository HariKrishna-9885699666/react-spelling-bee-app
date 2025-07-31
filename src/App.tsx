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