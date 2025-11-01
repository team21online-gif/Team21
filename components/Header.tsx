
import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  onNavigate: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-cyan-500/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(AppView.HOME)}>
            <img className="h-12 w-12" src="https://storage.googleapis.com/gemini-ui-params/f049090b39567a54_original_image.jpg" alt="Team 21 Logo" />
            <span className="ml-4 text-xl font-bold font-orbitron text-white">TEAM 21 ACADEMY</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => onNavigate(AppView.HOME)} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</button>
              <button onClick={() => onNavigate(AppView.IMAGE_EDITOR)} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Image Editor</button>
              <button onClick={() => onNavigate(AppView.QUIZ)} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">AI Quiz</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
