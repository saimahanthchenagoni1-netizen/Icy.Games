import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <title>1v1 Battle</title>
    <style>
      body { margin: 0; padding: 0; background-color: black; overflow: hidden; width: 100vw; height: 100vh; }
      .webgl-content { width: 100%; height: 100%; position: absolute; top: 0; left: 0; }
      #gameContainer { width: 100% !important; height: 100% !important; }
      canvas { width: 100% !important; height: 100% !important; }
    </style>
    <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/UnityProgress.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.js"></script>
    <script type="text/javascript">
      var gameInstance;
      window.onload = function () {
        gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.json", {
          onProgress: UnityProgress,
          Module: {
            onRuntimeInitialized: function () {
              UnityProgress(gameInstance, "complete");
            },
          },
        });
      };
    </script>
  </head>
  <body>
    <div class="webgl-content">
      <div id="gameContainer"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1firebase-app.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1firebase-auth.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1firebase-firestore.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1firebase.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1login.js?v=2"></script>
    <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/1firestore.js"></script>
    <script>
      initializeFireBase();
      function showAds() { console.log("show ads"); }
      function requestNewAd() { unityAdFinishedCallback(); }
      function unityAdFinishedCallback() {
        try { if (gameInstance) gameInstance.SendMessage("AdsManager", "OnWebCallback"); } 
        catch (error) { console.log(error); }
      }
    </script>
  </body>
</html>
`;

const OneVOneGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="1v1 Battle"
        srcDoc={GAME_SOURCE}
        className="w-full h-full border-0"
        allowFullScreen
        allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope; microphone"
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

export default OneVOneGame;