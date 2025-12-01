import React, { useState, useEffect, useCallback } from 'react';

// A simple whack-a-mole style game
const YetiSmashGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [yetiIndex, setYetiIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const gridSize = 9; // 3x3 grid

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameOver(false);
  };

  const handleSmash = (index: number) => {
    if (index === yetiIndex) {
      setScore(s => s + 10);
      setYetiIndex(null); // Hide immediately
    } else {
      setScore(s => Math.max(0, s - 5));
    }
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, gameOver]);

  // Yeti Movement
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveYeti = () => {
      const newIndex = Math.floor(Math.random() * gridSize);
      setYetiIndex(newIndex);
    };

    const intervalTime = Math.max(400, 1000 - (score * 5)); // Gets faster
    const moveTimer = setInterval(moveYeti, intervalTime);

    return () => clearInterval(moveTimer);
  }, [isPlaying, gameOver, score]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-900 rounded-xl border-4 border-slate-700 relative overflow-hidden">
      
      {/* HUD */}
      <div className="absolute top-0 w-full bg-slate-800 p-4 flex justify-between items-center z-10 border-b border-slate-600">
        <button onClick={onExit} className="text-slate-400 hover:text-white flex items-center gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Exit
        </button>
        <div className="font-mono text-xl text-yellow-400">SCORE: {score}</div>
        <div className={`font-mono text-xl ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
          TIME: {timeLeft}s
        </div>
      </div>

      {!isPlaying && !gameOver && (
        <div className="text-center z-20">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">YETI SMASH</h2>
          <p className="text-slate-300 mb-8">Click the Yetis before they disappear!</p>
          <button 
            onClick={startGame}
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105"
          >
            START GAME
          </button>
        </div>
      )}

      {gameOver && (
         <div className="text-center z-20 bg-black/80 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
         <h2 className="text-3xl font-bold text-white mb-2">GAME OVER</h2>
         <p className="text-xl text-yellow-400 mb-6">Final Score: {score}</p>
         <div className="flex gap-4">
            <button 
              onClick={startGame}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded transition-colors"
            >
              PLAY AGAIN
            </button>
            <button 
              onClick={onExit}
              className="px-6 py-2 bg-slate-600 hover:bg-slate-500 text-white font-bold rounded transition-colors"
            >
              EXIT
            </button>
         </div>
       </div>
      )}

      {(isPlaying || gameOver) && (
        <div className="grid grid-cols-3 gap-4 p-8 mt-12">
          {Array.from({ length: gridSize }).map((_, i) => (
            <div 
              key={i} 
              className="w-24 h-24 md:w-32 md:h-32 bg-slate-800 rounded-full border-4 border-slate-600 relative flex items-center justify-center overflow-hidden cursor-crosshair shadow-inner"
              onClick={() => isPlaying && handleSmash(i)}
            >
              {/* Hole visual */}
              <div className="absolute top-1/2 w-full h-1/2 bg-black/30 rounded-full"></div>

              {yetiIndex === i && (
                <div className="absolute bottom-0 w-20 h-24 animate-[bounce_0.3s_infinite]">
                  {/* Simple Yeti CSS drawing */}
                  <div className="w-full h-full bg-white rounded-t-full relative">
                    <div className="absolute top-8 left-4 w-3 h-3 bg-black rounded-full"></div>
                    <div className="absolute top-8 right-4 w-3 h-3 bg-black rounded-full"></div>
                    <div className="absolute top-12 left-6 w-8 h-4 bg-red-900 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YetiSmashGame;