
import React, { useState } from 'react';
import Header from './components/Header';
import ImageEditor from './components/ImageEditor';
import QuizGame from './components/QuizGame';
import Certificate from './components/Certificate';
import { AppView } from './types';
import { QUIZ_QUESTIONS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [quizScore, setQuizScore] = useState(0);
  const [userName, setUserName] = useState('');

  const handleQuizComplete = (score: number, name: string) => {
    setQuizScore(score);
    setUserName(name);
    setCurrentView(AppView.CERTIFICATE);
  };

  const handleRestartQuiz = () => {
    setQuizScore(0);
    setUserName('');
    setCurrentView(AppView.QUIZ);
  }

  const renderView = () => {
    switch (currentView) {
      case AppView.IMAGE_EDITOR:
        return <ImageEditor />;
      case AppView.QUIZ:
        return <QuizGame onQuizComplete={handleQuizComplete} />;
      case AppView.CERTIFICATE:
        return <Certificate score={quizScore} totalQuestions={QUIZ_QUESTIONS.length} onRestart={handleRestartQuiz} userName={userName} />;
      case AppView.HOME:
      default:
        return <Home onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat">
      <Header onNavigate={setCurrentView} />
      <main className="p-4 md:p-8">
        {renderView()}
      </main>
    </div>
  );
};

interface HomeProps {
  onViewChange: (view: AppView) => void;
}

const Home: React.FC<HomeProps> = ({ onViewChange }) => (
  <div className="text-center flex flex-col items-center justify-center pt-16">
    <img src="https://storage.googleapis.com/gemini-ui-params/f049090b39567a54_original_image.jpg" alt="Team 21 Academy Logo" className="w-64 h-64 md:w-80 md:h-80 object-contain mb-8 rounded-full shadow-lg shadow-cyan-500/20" />
    <h1 className="text-4xl md:text-6xl font-bold font-orbitron mb-4 text-shadow">
      Welcome to the <span className="text-cyan-400">Team 21 AI Suite</span>
    </h1>
    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
      Explore the future of artificial intelligence with our cutting-edge tools. Edit images with text prompts or test your knowledge with our AI quiz on prompt engineering.
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={() => onViewChange(AppView.IMAGE_EDITOR)}
        className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
      >
        Launch Image Editor
      </button>
      <button
        onClick={() => onViewChange(AppView.QUIZ)}
        className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
      >
        Start AI Quiz
      </button>
    </div>
  </div>
);

export default App;