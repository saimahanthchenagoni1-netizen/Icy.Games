import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html>
<head>
  <base href="https://cdn.jsdelivr.net/gh/genizy/google-class@latest/btd6/">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Bloons TD6</title>
  <style>
    body { margin: 0; padding: 0; background-color: #000; overflow: hidden; width: 100vw; height: 100vh; }
    #app { width: 100%; height: 100%; }
    canvas { display: block; width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="app"></div>
  <script src="script.js"></script>
  <script>
    // Simplified loader for the react wrapper context
    const appElement = document.getElementById('app');
    
    // We need to shim the environment for the game script if running in iframe
    // This is a simplified version of the game's index logic
    const run = async () => {
       // In a real scenario, we load the project json
       // Here we rely on the script.js to handle scaffolding if present, 
       // or we just iframe the remote URL directly if the script is complex.
       // Given the complexity of the BTD6 scratch port, iframing the original index is safer.
    };
  </script>
</body>
</html>
`;

// Direct URL approach is more reliable for complex Scratch/TurboWarp exports like BTD6
const DIRECT_URL = "https://cdn.jsdelivr.net/gh/genizy/google-class@latest/btd6/index.html";

const BloonsTd6Game: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Bloons TD6"
        src={DIRECT_URL}
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

export default BloonsTd6Game;