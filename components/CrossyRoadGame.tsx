import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <base href="https://cdn.jsdelivr.net/gh/bubbls/youtube-playables@latest/crossy-road/">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Crossy Road</title>

  <style>
    body { margin: 0; padding: 0; background-color: #6ccefe; overflow: hidden; width: 100vw; height: 100vh; }
    canvas { display: block; width: 100%; height: 100%; }
    #build-number { display: none; }
  </style>

  <!-- Load the YouTube Playables SDK as the first script -->
  <script src="https://cdn.jsdelivr.net/gh/bubbls/youtube-playables@main/ytgame.js" nonce="2KHli9LrFFijH2jCb5SkMw"></script>

  <!-- Load game's CSS file. -->
  <link rel="stylesheet" href="style.css" nonce="2KHli9LrFFijH2jCb5SkMw">

   <!-- Core libraries like Three.js -->
  <script src="scripts/three.min.js" nonce="2KHli9LrFFijH2jCb5SkMw"></script>

  <!-- Main game script -->
  <script src="scripts/game.min.js" nonce="2KHli9LrFFijH2jCb5SkMw"></script>

  <!-- Additional scripts -->
  <script src="scripts/extra.min.js" nonce="2KHli9LrFFijH2jCb5SkMw"></script>
  <script src="scripts/bootstrap.min.js" nonce="2KHli9LrFFijH2jCb5SkMw"></script>
</head>

<body>
  <canvas id="canvas"></canvas>
  <div id="build-number"></div>
</body>
</html>
`;

const CrossyRoadGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-[#6ccefe]">
      <iframe
        title="Crossy Road"
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

export default CrossyRoadGame;