import React, { useState, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import Snowfall from './components/Snowfall';
import GameCard from './components/GameCard';
import IcyChat from './components/IcyChat';
import PixelCombatGame from './components/PixelCombatGame';
import OneVOneGame from './components/OneVOneGame';
import RooftopSnipersGame from './components/RooftopSnipersGame';
import BasketRandomGame from './components/BasketRandomGame';
import VolleyRandomGame from './components/VolleyRandomGame';
import SubwaySurfersGame from './components/SubwaySurfersGame';
import PolytrackGame from './components/PolytrackGame';
import GeometryDashGame from './components/GeometryDashGame';
import CrossyRoadGame from './components/CrossyRoadGame';
import LevelDevilGame from './components/LevelDevilGame';
import AmongUsGame from './components/AmongUsGame';
import BaseballBrosGame from './components/BaseballBrosGame';
import StreetFighterAlpha3Game from './components/StreetFighterAlpha3Game';
import Ben10AlienForceGame from './components/Ben10AlienForceGame';
import PokemonEmeraldGame from './components/PokemonEmeraldGame';
import GtaGame from './components/GtaGame';
import SurvivalRaceGame from './components/SurvivalRaceGame';
import GlitchTitle from './components/GlitchTitle';
import IcyAiPage from './components/IcyAiPage';
import { MOCK_GAMES } from './constants';
import { Game, AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Filter logic
  const filteredGames = useMemo(() => {
    let games = MOCK_GAMES;

    if (currentView === AppView.FAVORITES) {
      games = games.filter(g => favorites.includes(g.id));
    }

    if (activeCategory !== 'ALL') {
      games = games.filter(g => g.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      games = games.filter(g => 
        g.title.toLowerCase().includes(q) || 
        g.description.toLowerCase().includes(q)
      );
    }

    return games;
  }, [searchQuery, activeCategory, currentView, favorites]);

  // Handlers
  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setCurrentView(AppView.GAME);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (e: React.MouseEvent, gameId: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };

  const handleBackHome = () => {
    setCurrentView(AppView.HOME);
    setSelectedGame(null);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error);
    }
  };

  const toggleFullscreen = () => {
    if (!gameContainerRef.current) return;

    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const renderGameComponent = () => {
    if (!selectedGame) return null;

    switch (selectedGame.id) {
      case 'pixel-combat-2':
        return <PixelCombatGame onExit={handleBackHome} />;
      case '1v1-battle':
        return <OneVOneGame onExit={handleBackHome} />;
      case 'rooftop-snipers':
        return <RooftopSnipersGame onExit={handleBackHome} />;
      case 'basket-random':
        return <BasketRandomGame onExit={handleBackHome} />;
      case 'volley-random':
        return <VolleyRandomGame onExit={handleBackHome} />;
      case 'baseball-bros':
        return <BaseballBrosGame onExit={handleBackHome} />;
      case 'subway-surfers':
        return <SubwaySurfersGame onExit={handleBackHome} />;
      case 'polytrack':
        return <PolytrackGame onExit={handleBackHome} />;
      case 'geometry-dash':
        return <GeometryDashGame onExit={handleBackHome} />;
      case 'crossy-road':
        return <CrossyRoadGame onExit={handleBackHome} />;
      case 'level-devil':
        return <LevelDevilGame onExit={handleBackHome} />;
      case 'among-us':
        return <AmongUsGame onExit={handleBackHome} />;
      case 'sf-alpha-3':
        return <StreetFighterAlpha3Game onExit={handleBackHome} />;
      case 'ben-10-alien-force':
        return <Ben10AlienForceGame onExit={handleBackHome} />;
      case 'pokemon-emerald':
        return <PokemonEmeraldGame onExit={handleBackHome} />;
      case 'gta':
        return <GtaGame onExit={handleBackHome} />;
      case 'survival-race':
        return <SurvivalRaceGame onExit={handleBackHome} />;
      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 text-white">
            <h2 className="text-xl">Game not found</h2>
            <button onClick={handleBackHome} className="mt-4 px-4 py-2 bg-slate-700 rounded">Back</button>
          </div>
        );
    }
  };

  const renderContent = () => {
    if (currentView === AppView.CHAT) {
      return <IcyAiPage />;
    }

    if (currentView === AppView.GAME && selectedGame) {
      return (
        <div className="max-w-6xl mx-auto px-4 animate-[fadeIn_0.5s_ease-out]">
          {/* Game Player Area */}
          <div className="relative mb-8">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-2 px-1">
               <div className="flex items-center gap-2">
                  <button 
                    onClick={handleBackHome}
                    className="text-slate-400 hover:text-white flex items-center gap-1 text-sm font-semibold transition-colors"
                  >
                    ← Back to Games
                  </button>
               </div>
               <button 
                 onClick={toggleFullscreen}
                 className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white rounded-lg transition-colors text-sm font-bold border border-white/10"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                 </svg>
                 FULLSCREEN
               </button>
            </div>

            {/* Game Container */}
            <div 
              ref={gameContainerRef}
              className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl aspect-video relative group"
            >
              {renderGameComponent()}
            </div>
          </div>

          {/* Game Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-white">{selectedGame.title}</h1>
                <button 
                  onClick={(e) => toggleFavorite(e, selectedGame.id)}
                  className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${favorites.includes(selectedGame.id) ? 'fill-red-500 text-red-500' : 'text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">{selectedGame.description}</p>
              <div className="flex gap-4">
                <span className="bg-slate-800 px-3 py-1 rounded text-sm text-cyan-400 border border-cyan-900/50">{selectedGame.category}</span>
                <span className="bg-slate-800 px-3 py-1 rounded text-sm text-yellow-400 border border-yellow-900/50">★ {selectedGame.rating}/5.0</span>
              </div>
            </div>

            {/* Sidebar: Recommended */}
            <div className="glass-panel p-6 rounded-xl">
               <h3 className="text-xl font-bold mb-4 text-cyan-100">More Games</h3>
               <div className="space-y-3">
                 {MOCK_GAMES.filter(g => g.id !== selectedGame.id).slice(0, 5).map(g => (
                   <div 
                      key={g.id}
                      onClick={() => handleGameClick(g)}
                      className="flex gap-3 items-center cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-colors border border-transparent hover:border-white/10"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white group-hover:text-cyan-400">{g.title}</div>
                        <div className="text-xs text-slate-400">{g.category}</div>
                      </div>
                      <div className="bg-slate-800 p-1.5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      );
    }

    // HOME or FAVORITES view
    return (
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Glitch Hero Title (Only show on Home) */}
        {currentView === AppView.HOME && <GlitchTitle />}

        {/* Hero / Categories */}
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max justify-center md:justify-start">
            <button 
              onClick={() => { setActiveCategory('ALL'); setCurrentView(AppView.HOME); }}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${activeCategory === 'ALL' && currentView === AppView.HOME ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              All Ice
            </button>
            {['Action', 'Puzzle', 'Racing', 'Strategy', 'Sports', 'Winter Specials'].map(cat => (
              <button 
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentView(AppView.HOME); }}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${activeCategory === cat && currentView === AppView.HOME ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={handleGameClick}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-slate-500">No frozen games found...</p>
              <button onClick={() => {setSearchQuery(''); setActiveCategory('ALL');}} className="mt-4 text-cyan-400 underline">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative pb-20">
      <Snowfall />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar 
          onSearch={setSearchQuery} 
          currentView={currentView}
          onChangeView={setCurrentView}
        />

        {renderContent()}
      </div>

      {/* Only show floating chat if NOT on the chat page */}
      {currentView !== AppView.CHAT && <IcyChat />}
    </div>
  );
};

export default App;