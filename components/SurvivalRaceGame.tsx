
import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/survival%20race%20v2/">
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Survival Race</title>
    <style>
      html,
      body {
        background: #000;
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 0;
        margin: 0;
      }

      div#gameContainer {
        background: transparent !important;
        position: absolute;
        width: 100% !important;
        height: 100% !important;
      }

      div#gameContainer canvas {
        position: absolute;
        width: 100% !important;
        height: 100% !important;
      }

      div#gameContainer canvas[data-pixel-art="true"] {
        position: absolute;
        image-rendering: optimizeSpeed;
        image-rendering: -webkit-crisp-edges;
        image-rendering: -moz-crisp-edges;
        image-rendering: -o-crisp-edges;
        image-rendering: crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: optimize-contrast;
        image-rendering: pixelated;
        -ms-interpolation-mode: nearest-neighbor;
      }
    </style>
    <script>
      try {
        localStorage.setItem("savesData", JSON.stringify({}));
      } catch(e) { console.log("Storage access error handled"); }
    </script>
  </head>

  <body>
    <div id="gameContainer">
      <canvas id="unity-canvas" data-pixel-art="" style="background: linear-gradient(to right, white, white 100%, transparent 100%, transparent) center center / 100% 1rem no-repeat; cursor: default;"></canvas>
      <script>
        window.fileMergerConfig = {
          files: [
            { name: 'yandexBrotli.wasm.unityweb', parts: 2 },
          ],
          basePath: 'Build/',
          debug: true
        };
      </script>
      <script src="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/merge.js"></script>
      <script src="Build/yandexBrotli.loader.js"></script>
      <script>
        var canvas = document.querySelector("#unity-canvas");
        var config = {
          dataUrl: "Build/yandexBrotli.data.unityweb",
          frameworkUrl: "Build/yandexBrotli.framework.js.unityweb",
          codeUrl: "Build/yandexBrotli.wasm.unityweb",
          streamingAssetsUrl: "StreamingAssets",
          companyName: "Survival",
          productName: "Survival Race",
          productVersion: "0.0.15",
        };
        var scaleToFit;
        try {
          scaleToFit = !!JSON.parse("true");
        } catch (e) {
          scaleToFit = true;
        }

        function progressHandler(progress) {
          var percent = progress * 100 + '%';
          canvas.style.background = 'linear-gradient(to right, white, white ' + percent + ', transparent ' + percent + ', transparent) no-repeat center';
          canvas.style.backgroundSize = '100% 1rem';
        }

        function onResize() {
          var container = canvas.parentElement;
          var w;
          var h;
          if (scaleToFit) {
            w = window.innerWidth;
            h = window.innerHeight;
            var r = 540 / 960;
            if (w * r > window.innerHeight) {
              w = Math.min(w, Math.ceil(h / r));
            }
            h = Math.floor(w * r);
          } else {
            w = 960;
            h = 540;
          }
          container.style.width = canvas.style.width = w + "px";
          container.style.height = canvas.style.height = h + "px";
          // Center it
          // container.style.top = Math.floor((window.innerHeight - h) / 2) + "px";
          // container.style.left = Math.floor((window.innerWidth - w) / 2) + "px";
        }
        var gameInstance;
        createUnityInstance(canvas, config, progressHandler).then(function(instance) {
          canvas = instance.Module.canvas;
          onResize();
          gameInstance = instance;
        });
        window.addEventListener('resize', onResize);
        onResize();
      </script>
    </div>
  </body>
</html>
`;

const SurvivalRaceGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Survival Race"
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

export default SurvivalRaceGame;
