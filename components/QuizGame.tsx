
import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../constants';

const QuizGame: React.FC<{ onQuizComplete: (score: number, name: string) => void }> = ({ onQuizComplete }) => {
  const [gameState, setGameState] = useState<'name_input' | 'playing' | 'finished'>('name_input');
  const [userName, setUserName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleStartQuiz = () => {
    if (userName.trim()) {
      setGameState('playing');
    }
  };

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setGameState('finished');
    }
  };

  useEffect(() => {
    if (gameState === 'finished') {
      onQuizComplete(score, userName);
    }
  }, [gameState, onQuizComplete, score, userName]);

  if (gameState === 'name_input') {
    return (
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-bold font-orbitron text-purple-400 mb-4">AI Prompt Engineering Quiz</h1>
        <p className="text-lg text-gray-300 mb-8">Test your knowledge of prompt engineering. First, please enter your name to be displayed on the certificate.</p>
        <div className="flex flex-col gap-4 items-center">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full max-w-md p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            aria-label="Enter your name"
          />
          <button 
            onClick={handleStartQuiz} 
            disabled={!userName.trim()}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-gray-700 hover:bg-gray-600';
    }
    if (option === currentQuestion.correctAnswer) {
      return 'bg-green-600';
    }
    if (option === selectedAnswer) {
      return 'bg-red-600';
    }
    return 'bg-gray-700 opacity-50';
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-3xl mx-auto">
        <div className="w-full bg-gray-800 p-8 rounded-xl shadow-2xl text-center">
            <div className="flex justify-between items-center w-full mb-6">
                <p className="text-lg font-semibold">Score: <span className="text-green-400">{score}</span></p>
                <p className="text-lg font-semibold">Question {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-8 h-24 flex items-center justify-center">{currentQuestion.question}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-lg text-white font-semibold transition-colors duration-300 text-left ${getButtonClass(option)}`}
                >
                  {option}
                </button>
              ))}
            </div>

            {isAnswered && (
                <button
                    onClick={handleNextQuestion}
                    className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                    {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            )}
        </div>
    </div>
  );
};

export default QuizGame;
