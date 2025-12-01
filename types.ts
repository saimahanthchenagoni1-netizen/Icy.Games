export enum GameCategory {
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  RACING = 'Racing',
  STRATEGY = 'Strategy',
  SPORTS = 'Sports',
  WINTER = 'Winter Specials'
}

export interface Game {
  id: string;
  title: string;
  description: string;
  category: GameCategory;
  thumbnail: string;
  isHot?: boolean;
  isNew?: boolean;
  playedCount: number; // Approximate played count for display
  rating: number; // 0-5
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text?: string;
  image?: string; // Base64 string
  timestamp: Date;
}

export enum AppView {
  HOME = 'HOME',
  GAME = 'GAME',
  FAVORITES = 'FAVORITES',
  CHAT = 'CHAT'
}