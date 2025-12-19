export interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  moves: number;
  timer: number;
  matches: number;
  isGameActive: boolean;
  isWon: boolean;
}

export enum Difficulty {
  EASY = 4,   // 4x4
  HARD = 6,   // 6x6 (Optional for future expansion, sticking to 4x4 for now)
}