import React from 'react';
import { Timer, Move, RotateCcw } from 'lucide-react';

interface StatsBoardProps {
  moves: number;
  timer: number;
  onReset: () => void;
}

const StatsBoard: React.FC<StatsBoardProps> = ({ moves, timer, onReset }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8 w-full max-w-2xl">
      
      {/* Moves Counter */}
      <div className="flex items-center gap-3 bg-slate-800/50 px-6 py-3 rounded-2xl border border-slate-700 backdrop-blur-sm">
        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
          <Move size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Moves</span>
          <span className="text-xl font-bold text-white leading-none">{moves}</span>
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-3 bg-slate-800/50 px-6 py-3 rounded-2xl border border-slate-700 backdrop-blur-sm">
        <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
          <Timer size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Time</span>
          <span className="text-xl font-bold text-white leading-none">{formatTime(timer)}</span>
        </div>
      </div>

      {/* Reset Button */}
      <button 
        onClick={onReset}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-indigo-500/30 ml-auto sm:ml-0"
      >
        <RotateCcw size={20} />
        <span className="hidden sm:inline">Restart</span>
      </button>
    </div>
  );
};

export default StatsBoard;