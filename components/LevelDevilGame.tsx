import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html lang="en">
<base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@2ac7e5b354322a207bd059768f928ece8c9471c1/level%20devil/">
<head>
  <meta charset="utf-8">
  <title>Level Devil</title>
  <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <script src="./poki-sdk.js"></script>
  <script src="./Level Devil.js"></script>

  <script>
    window.addEventListener("touchmove", function(event) {
      event.preventDefault();
    }, {
      capture: false,
      passive: false
    });
    if (typeof window.devicePixelRatio != 'undefined' && window.devicePixelRatio > 2) {
      var meta = document.getElementById("viewport");
      meta.setAttribute('content', 'width=device-width, initial-scale=' + (2 / window.devicePixelRatio) + ', user-scalable=no');
    }
  </script>

  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
      background: #000;
    }

    #openfl-content {
      background: #000000;
      width: 100%;
      height: 100%;
    }
  </style>

</head>

<body>
  <div id="openfl-content"></div>

  <script>
    lime.embed("Level Devil", "openfl-content", 854, 480, {
      parameters: {}
    });
  </script>
</body>
</html>
`;

const LevelDevilGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Level Devil"
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

export default LevelDevilGame;
