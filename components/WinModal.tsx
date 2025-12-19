import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

interface WinModalProps {
  isOpen: boolean;
  moves: number;
  timer: number;
  onRestart: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ isOpen, moves, timer, onRestart }) => {
  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300"></div>
      
      {/* Modal Content */}
      <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300 text-center">
        
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
           <div className="bg-yellow-400 rounded-full p-4 shadow-lg shadow-yellow-400/20 animate-bounce">
              <Trophy size={48} className="text-yellow-900" />
           </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-8 mb-2">You Won!</h2>
        <p className="text-slate-400 mb-8">Great memory! Here is how you did:</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-900/50 p-4 rounded-2xl">
            <span className="block text-slate-500 text-sm font-bold uppercase">Time</span>
            <span className="block text-2xl font-bold text-white">{formatTime(timer)}</span>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-2xl">
            <span className="block text-slate-500 text-sm font-bold uppercase">Moves</span>
            <span className="block text-2xl font-bold text-white">{moves}</span>
          </div>
        </div>

        <button 
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-indigo-500/25"
        >
          <RotateCcw size={20} />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinModal;