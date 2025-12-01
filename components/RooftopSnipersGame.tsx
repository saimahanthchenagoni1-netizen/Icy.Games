import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <base href="https://cdn.jsdelivr.net/gh/NovaAppsInc/fracital-proxy@808c643ed7924cfb696a68ccdd9d2b97c12a4bee/g/rooftop-snipers/">
  <title>Rooftop Snipers</title>
  <style>
    body { margin: 0; padding: 0; background-color: black; overflow: hidden; width: 100vw; height: 100vh; }
    #gameContainer { width: 100% !important; height: 100% !important; }
    canvas { width: 100% !important; height: 100% !important; display: block; }
    .webgl-content { width: 100%; height: 100%; }
    
    #button { display:none; }
    .imgb_vis { animation: imgb-animation 7s linear; }
    @keyframes imgb-animation {
      10% { transform: translateX(0); }
      20% { transform: translateX(100px); }
      90% { transform: translateX(100px); }
      100% { transform: translateX(0); }
    }
  </style>
  <link href="https://cdn.jsdelivr.net/gh/lee2sman/everyday@d45d601d2c4d60adf809a0b677c00b7d12aba7e9/96/TemplateData/style.css" rel="stylesheet">
</head>
<body dir="ltr">
  <script src="https://cdn.jsdelivr.net/gh/lee2sman/everyday@d45d601d2c4d60adf809a0b677c00b7d12aba7e9/96/TemplateData/UnityProgress.js"></script>
  <script src="UnityLoader.js"></script>
  <script>
    var gameInstance = UnityLoader.instantiate("gameContainer", "rooftop-snipers.json", {
      onProgress: UnityProgress,
      Module: {
        onRuntimeInitialized: function() {
          UnityProgress(gameInstance, "complete")
        }
      }
    });
  </script>
  <div class="webgl-content">
    <div id="gameContainer"></div>
  </div>
</body>
</html>
`;

const RooftopSnipersGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Rooftop Snipers"
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

export default RooftopSnipersGame;