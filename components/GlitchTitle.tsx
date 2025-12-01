import React from 'react';

const GlitchTitle: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-center items-center py-12 md:py-20 select-none overflow-hidden">
      <div className="relative group">
        <h1 className="glitch-title text-6xl md:text-9xl font-black tracking-tighter text-white relative z-10" data-text="ICY GAMES">
          <span className="text-cyan-400">ICY</span> GAMES
        </h1>
        <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full opacity-20 animate-pulse z-0"></div>
      </div>
      
      <p className="mt-6 text-cyan-300 font-mono tracking-[0.3em] text-sm md:text-lg animate-[pulse_3s_ease-in-out_infinite] border-b border-cyan-500/30 pb-2">
        MORE GAMES COMING SOON..
      </p>
      
      <style>{`
        .glitch-title {
          position: relative;
        }
        /* Create two copies of the text for the glitch effect */
        .glitch-title::before,
        .glitch-title::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        
        /* The cyan glitch layer */
        .glitch-title::before {
          left: 2px;
          text-shadow: -2px 0 #22d3ee;
          clip-path: inset(0 0 0 0);
          animation: glitch-anim-1 3s infinite linear alternate-reverse;
          z-index: -1;
          opacity: 0.7;
        }
        
        /* The blue/magenta glitch layer */
        .glitch-title::after {
          left: -2px;
          text-shadow: 2px 0 #3b82f6;
          clip-path: inset(0 0 0 0);
          animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
          z-index: -2;
          opacity: 0.7;
        }

        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 2px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 2px); }
          100% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -2px); }
        }

        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -2px); }
          20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(2px, -2px); }
          100% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, 2px); }
        }
      `}</style>
    </div>
  );
};

export default GlitchTitle;