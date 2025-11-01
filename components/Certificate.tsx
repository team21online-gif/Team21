
import React from 'react';
import { PROGRAM_DIRECTOR } from '../constants';

interface CertificateProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  userName: string;
}

const Certificate: React.FC<CertificateProps> = ({ score, totalQuestions, onRestart, userName }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div id="certificate" className="w-full max-w-4xl bg-slate-50 text-gray-800 p-8 md:p-12 rounded-lg shadow-2xl border-8 border-cyan-500 relative bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]">
        <div className="text-center mb-8">
          <img src="https://storage.googleapis.com/gemini-ui-params/f049090b39567a54_original_image.jpg" alt="Team 21 Logo" className="w-24 h-24 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 font-orbitron">Certificate of Completion</h1>
          <p className="text-lg text-gray-600 mt-2">This certificate is proudly presented to</p>
          <p className="text-3xl font-semibold my-4 text-purple-700">{userName || 'A Team 21 AI Enthusiast'}</p>
          <p className="text-lg text-gray-600">for successfully completing the</p>
          <h2 className="text-2xl font-bold text-gray-700 mt-2">AI Prompt Engineering Challenge</h2>
        </div>

        <div className="text-center my-8">
          <p className="text-xl">With a final score of</p>
          <p className="text-6xl font-bold text-cyan-600 my-2">{percentage}%</p>
          <p className="text-gray-500">({score} out of {totalQuestions} correct)</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12">
          <div className="text-center">
            <p className="font-dancing-script text-3xl">{PROGRAM_DIRECTOR}</p>
            <p className="border-t-2 border-gray-400 pt-2 mt-2 text-sm font-semibold">Program Director, Team 21 Academy</p>
          </div>
          <div className="text-center mt-8 md:mt-0">
            <p className="font-semibold text-lg">{new Date().toLocaleDateString()}</p>
            <p className="border-t-2 border-gray-400 pt-2 mt-2 text-sm font-semibold">Date of Completion</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4 print:hidden">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Try Again
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          Print Certificate
        </button>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
          }
          #root > header, #root > main > div > div:not(#certificate) {
            display: none;
          }
           #root > main {
            padding: 0;
          }
          #certificate {
            margin: 0;
            border: 10px solid #06b6d4;
            box-shadow: none;
            width: 100%;
            height: 100vh;
            max-width: none;
          }
        }
      `}</style>

    </div>
  );
};

export default Certificate;