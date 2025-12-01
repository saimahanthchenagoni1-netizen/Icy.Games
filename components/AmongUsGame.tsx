import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html> 
<html> 
<head> 
<meta charset="UTF-8" /> 
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" /> 
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mamayaya1/game@f3a882424a8f28d07bdf456b251d889725c4c1e4/projects/among-us/style.css" /> 
<style>
  body { margin: 0; padding: 0; background-color: black; overflow: hidden; width: 100vw; height: 100vh; }
  canvas { width: 100% !important; height: 100% !important; display: block; }
</style>
</head> 
<body> 
<script> 
window.addEventListener("keydown", function(e) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) { e.preventDefault(); } }, false); 
</script> 
<script src="https://cdn.jsdelivr.net/gh/mamayaya1/game@f3a882424a8f28d07bdf456b251d889725c4c1e4/projects/among-us/scripts/supportcheck.js"></script> 
<script src="https://cdn.jsdelivr.net/gh/mamayaya1/game@f3a882424a8f28d07bdf456b251d889725c4c1e4/projects/among-us/scripts/offlineclient.js" type="module"></script> 
<script src="https://cdn.jsdelivr.net/gh/gahaden/ags@4f1a2b8755bcbf67ba043a7eca6c2e05d0b5bfe5/main.js" type="module"></script> 
<script src="https://cdn.jsdelivr.net/gh/mamayaya1/game@f3a882424a8f28d07bdf456b251d889725c4c1e4/projects/among-us/scripts/register-sw.js" type="module"></script> 
</body> 
</html>
`;

const AmongUsGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Among Us"
        srcDoc={GAME_SOURCE}
        className="w-full h-full border-0"
        allowFullScreen
        allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
      />
      <button 
        onClick={onExit}
        className="absolute top-4 left-4 z-50 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 text-white rounded-lg backdrop-blur-sm border border-white/10 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        EXIT GAME
      </button>
    </div>
  );
};

export default AmongUsGame;
