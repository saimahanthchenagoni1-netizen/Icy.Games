import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html>
  <head>
    <base href="https://rawcdn.githack.com/genizy/subway-surfers/829234f4d9f0bc46347e67b0a8d3b033dc70a589/">
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Subway Surfers</title>
    <link rel="icon" href="img/FirstAvatar.png">

    <style>
      body { margin: 0; padding: 0; background-color: black; overflow: hidden; width: 100vw; height: 100vh; }
      canvas { width: 100% !important; height: 100% !important; }
    </style>

    <script type="text/javascript" src="4399.z.js"></script>
    <script>
      window.config = {
        loader: "unity",
        debug: false,
        maxRatio: 16 / 9,
        minRatio: 9 / 16,

        title: "Subway Surfers: San Francisco",

        unityVersion: "2019.4.18f1",
        unityWebglBuildUrl: "Build/SanFrancisco.json",

        fileSize: 35,
        cachedDecompressedFileSizes: {
          "SanFrancisco.asm.code.unityweb": 9077143,
          "SanFrancisco.asm.framework.unityweb": 86369,
          "SanFrancisco.asm.memory.unityweb": 951447,
          "SanFrancisco.data.unityweb": 18323917,
          "SanFrancisco.wasm.code.unityweb": 7279617,
          "SanFrancisco.wasm.framework.unityweb": 90693,
        },
      };
    </script>
  </head>

  <body>
    <script src="master-loader.js"></script>
  </body>
</html>
`;

const SubwaySurfersGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Subway Surfers"
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

export default SubwaySurfersGame;