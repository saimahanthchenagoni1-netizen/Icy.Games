import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  onSearch: (query: string) => void;
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, currentView, onChangeView }) => {
  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onChangeView(AppView.HOME)}
        >
          <div className="bg-cyan-500 p-2 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            ICY
          </h1>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search unblocked games..."
            className="w-full bg-slate-800/50 border border-slate-600 rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white placeholder-slate-400"
            onChange={(e) => onSearch(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Links */}
        <div className="flex gap-4 text-sm font-semibold">
          <button 
            onClick={() => onChangeView(AppView.HOME)}
            className={`${currentView === AppView.HOME ? 'text-cyan-400' : 'text-slate-300 hover:text-white'} transition-colors`}
          >
            ALL GAMES
          </button>
          <button 
             onClick={() => onChangeView(AppView.FAVORITES)}
             className={`${currentView === AppView.FAVORITES ? 'text-cyan-400' : 'text-slate-300 hover:text-white'} transition-colors`}
          >
            FAVORITES
          </button>
          <button 
             onClick={() => onChangeView(AppView.CHAT)}
             className={`${currentView === AppView.CHAT ? 'text-cyan-400' : 'text-slate-300 hover:text-white'} flex items-center gap-1 transition-colors`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            ICY AI
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;