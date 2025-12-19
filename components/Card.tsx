import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div 
      className={`relative w-full aspect-square cursor-pointer perspective-1000 group ${card.isMatched ? 'opacity-0 scale-95 pointer-events-none transition-all duration-700' : 'opacity-100'}`}
      onClick={handleClick}
    >
      <div 
        className={`w-full h-full relative transform-style-3d transition-transform duration-500 shadow-xl rounded-xl ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}
      >
        {/* Front Face (Hidden initially, shows when flipped) */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl bg-white border-4 border-indigo-400 flex items-center justify-center text-4xl sm:text-5xl select-none"
        >
          {card.content}
        </div>

        {/* Back Face (Visible initially) */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-indigo-300 flex items-center justify-center hover:brightness-110 transition-all"
        >
          <span className="text-3xl opacity-20">?</span>
        </div>
      </div>
    </div>
  );
};

export default Card;