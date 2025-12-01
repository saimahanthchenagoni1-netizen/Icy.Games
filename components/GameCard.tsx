import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      className="group relative bg-slate-800/40 rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 flex flex-col h-full min-h-[110px]"
      onClick={() => onClick(game)}
    >
      {/* Header: Badges and Favorite */}
      <div className="flex justify-between items-start p-4 pb-0">
         <div className="flex gap-2 h-6">
            {game.isHot && (
              <span className="bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center">HOT</span>
            )}
            {game.isNew && (
              <span className="bg-cyan-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center">NEW</span>
            )}
         </div>
         <button 
            className="p-1.5 rounded-full bg-slate-700/30 hover:bg-slate-600 text-white transition-colors"
            onClick={(e) => onToggleFavorite(e, game.id)}
         >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
         </button>
      </div>

      {/* Info */}
      <div className="p-4 pt-2 flex-1 flex flex-col">
        <h3 className="font-bold text-white text-xl group-hover:text-cyan-400 transition-colors mb-4 leading-tight">{game.title}</h3>
        
        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/5 pt-3 mt-auto">
           <span className="bg-slate-700/50 px-2 py-1 rounded text-cyan-400 font-medium">{game.category}</span>
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{game.rating}</span>
              </div>
              <div className="opacity-60">{game.playedCount > 1000 ? (game.playedCount / 1000).toFixed(1) + 'k' : game.playedCount} plays</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;