import React, { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import StatsBoard from './components/StatsBoard';
import WinModal from './components/WinModal';
import { Card as CardType } from './types';
import { EMOJIS, GRID_SIZE, MATCH_DELAY } from './constants';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);

  // Initialize Game
  const initializeGame = useCallback(() => {
    // Select needed emojis (half of grid size)
    const gameEmojis = [...EMOJIS].sort(() => 0.5 - Math.random()).slice(0, GRID_SIZE / 2);
    
    // Create pairs
    const pairs = [...gameEmojis, ...gameEmojis];
    
    // Shuffle pairs
    const shuffledPairs = pairs.sort(() => 0.5 - Math.random());
    
    // Create card objects
    const newCards: CardType[] = shuffledPairs.map((emoji, index) => ({
      id: index,
      content: emoji,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedIds([]);
    setMatchedPairs(0);
    setMoves(0);
    setTimer(0);
    setIsGameActive(true);
    setIsWon(false);
    setIsProcessing(false);
  }, []);

  // Initial load
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isGameActive && !isWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isGameActive, isWon]);

  // Check for Win
  useEffect(() => {
    if (matchedPairs === GRID_SIZE / 2 && matchedPairs > 0) {
      setIsWon(true);
      setIsGameActive(false);
    }
  }, [matchedPairs]);

  // Handle Card Click
  const handleCardClick = (clickedCard: CardType) => {
    // Ignore if processing (waiting for match check), card already flipped/matched
    if (isProcessing || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip the clicked card
    const newCards = cards.map(card => 
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    
    const newFlippedIds = [...flippedIds, clickedCard.id];
    setFlippedIds(newFlippedIds);

    // If 2 cards are flipped, check for match
    if (newFlippedIds.length === 2) {
      setIsProcessing(true);
      setMoves(prev => prev + 1);
      
      const firstCardId = newFlippedIds[0];
      const secondCardId = newFlippedIds[1];
      const firstCard = newCards.find(c => c.id === firstCardId);
      const secondCard = newCards.find(c => c.id === secondCardId);

      if (firstCard && secondCard && firstCard.content === secondCard.content) {
        // Match found
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(card => 
              card.id === firstCardId || card.id === secondCardId 
                ? { ...card, isMatched: true, isFlipped: true } 
                : card
            )
          );
          setMatchedPairs(prev => prev + 1);
          setFlippedIds([]);
          setIsProcessing(false);
        }, 300); // Short delay to see the second card flip animation complete
      } else {
        // No Match
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(card => 
              card.id === firstCardId || card.id === secondCardId 
                ? { ...card, isFlipped: false } 
                : card
            )
          );
          setFlippedIds([]);
          setIsProcessing(false);
        }, MATCH_DELAY);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black flex flex-col items-center p-4 sm:p-8">
      
      {/* Header */}
      <header className="mb-8 text-center animate-in slide-in-from-top duration-500">
        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500 flex items-center justify-center gap-3 mb-2 drop-shadow-sm">
          <Sparkles className="text-yellow-400" />
          Memory Match
        </h1>
        <p className="text-slate-400">Find all the matching pairs!</p>
      </header>

      {/* Stats Board */}
      <StatsBoard moves={moves} timer={timer} onReset={initializeGame} />

      {/* Game Grid */}
      <div className="w-full max-w-lg grid grid-cols-4 gap-3 sm:gap-4 mx-auto mb-8">
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            onClick={handleCardClick} 
            disabled={isProcessing}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-auto text-slate-600 text-sm py-4">
        Simple. Clean. Fun.
      </footer>

      {/* Win Modal */}
      <WinModal 
        isOpen={isWon} 
        moves={moves} 
        timer={timer} 
        onRestart={initializeGame} 
      />
    </div>
  );
};

export default App;