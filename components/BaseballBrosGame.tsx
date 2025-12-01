import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@ae6706e5224c55594c491edfc7f5ad541e2ea02b/baseball%20bros/">
  <meta charset="utf-8">
  <title>BASEBALL BROS! | Official Site</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  
  <script type="text/javascript" src="./BaseballBros.js?th=76"></script>

  <script>
    window.addEventListener("touchmove", function(event) {
      event.preventDefault();
    }, {
      capture: false,
      passive: false
    });
    window.addEventListener('keydown', function(e) {
      if ((e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 9) && e.target == document.body) {
        e.preventDefault();
      }
    });
  </script>

  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      background: #000000;
      color: orange;
      width: 100%;
      overflow: hidden;
    }
    #openfl-content {
      background: #000000;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div id="game2" style="width: 100%; height: 100%; ">
    <div id="openfl-content" onblur="window.focus(); window.scrollTo(0, 0);" style="width: 100%; height: 100%;">
      <script type="text/javascript">
        lime.embed("BaseballBros", "openfl-content", 0, 0, {
          parameters: {}
        });
      </script>
    </div>
  </div>
  <script>
    const element = document.getElementById('openfl-content');
    function keepFocus() {
      element.focus();
    }
    element.addEventListener('blur', keepFocus);
    element.addEventListener('focusout', keepFocus);
    window.focus();
  </script>
</body>
</html>
`;

const BaseballBrosGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Baseball Bros"
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

export default BaseballBrosGame;