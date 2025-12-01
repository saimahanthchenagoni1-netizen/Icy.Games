import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/pixel%20combat%202/">
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Pixel Combat 2</title>
    <style>
      body { margin: 0; padding: 0; background-color: #0f172a; overflow: hidden; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; }
      .webgl-content { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
      #gameContainer { width: 100% !important; height: 100% !important; }
      canvas { width: 100% !important; height: 100% !important; }
      .footer { position: absolute; bottom: 10px; right: 10px; display: flex; gap: 10px; opacity: 0.5; transition: opacity 0.3s; z-index: 100; }
      .footer:hover { opacity: 1; }
      .fullscreen { width: 30px; height: 30px; background: url('TemplateData/fullscreen.png') no-repeat center; background-size: contain; cursor: pointer; filter: invert(1); }
      .title { color: white; font-family: sans-serif; font-weight: bold; display: none; }
    </style>
    <script src="UnityLoader.js"></script>
    <script src="UnityProgress.js"></script>
    <script>
      window.mergedBlobUrls = {};
      window.assetsReady = false;

      async function mergeSplitFile(fileUrlBase, numParts = 2) {
        const partUrls = Array.from({ length: numParts }, (_, i) => 
          \`\${fileUrlBase}.part\${i + 1}\`
        );

        try {
          const responses = await Promise.all(
            partUrls.map(url => fetch(url))
          );

          if (responses.some(r => !r.ok)) {
            return null;
          }

          const parts = await Promise.all(
            responses.map(r => r.arrayBuffer())
          );

          const combinedBlob = new Blob(parts, {
            type: 'application/octet-stream'
          });

          return URL.createObjectURL(combinedBlob);
        } catch (error) {
          return null;
        }
      }

      function setupXHRInterceptor() {
        if (window.xhrInterceptorInstalled) {
          return;
        }
        
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function(method, url, ...args) {
          this._url = url;
          this._method = method;
          this._args = args;
          
          let finalUrl = url;
          const decodedUrl = decodeURIComponent(url);
          
          for (const [filename, blobUrl] of Object.entries(window.mergedBlobUrls)) {
            if (url.includes(encodeURIComponent(filename)) || 
                decodedUrl.includes(filename) || 
                url.includes(filename)) {
              finalUrl = blobUrl;
              break;
            }
          }
          
          return originalOpen.call(this, method, finalUrl, ...args);
        };

        XMLHttpRequest.prototype.send = function(...args) {
          const xhr = this;
          
          if (!window.assetsReady) {
            const checkReady = setInterval(() => {
              if (window.assetsReady) {
                clearInterval(checkReady);
                originalSend.apply(xhr, args);
              }
            }, 50);
            return;
          }
          
          return originalSend.apply(this, args);
        };
        
        window.xhrInterceptorInstalled = true;
      }

      function setupFetchInterceptor() {
        if (window.fetchInterceptorInstalled) {
          return;
        }

        const originalFetch = window.fetch;
        window.fetch = function(url, ...args) {
          let finalUrl = url;
          const decodedUrl = typeof url === 'string' ? decodeURIComponent(url) : '';
          
          for (const [filename, blobUrl] of Object.entries(window.mergedBlobUrls)) {
            if ((typeof url === 'string' && 
                (url.includes(encodeURIComponent(filename)) || 
                 decodedUrl.includes(filename) || 
                 url.includes(filename)))) {
              finalUrl = blobUrl;
              break;
            }
          }
          
          return originalFetch.call(this, finalUrl, ...args);
        };

        window.fetchInterceptorInstalled = true;
      }

      async function prepareGameAssets() {
        try {
          window.assetsReady = false;
          delete window.xhrInterceptorInstalled;
          delete window.fetchInterceptorInstalled;
          window.mergedBlobUrls = {};
          
          setupXHRInterceptor();
          setupFetchInterceptor();
          
          const response = await fetch('build.json');
          const buildConfig = await response.json();
          
          const dataUrl = buildConfig.dataUrl;
          if (dataUrl) {
            const blobUrl = await mergeSplitFile(dataUrl, 2);
            if (blobUrl) {
              window.mergedBlobUrls[dataUrl] = blobUrl;
            }
          }
          
          window.assetsPrepared = true;
          window.assetsReady = true;
          
        } catch (error) {
          window.assetsPrepared = false;
          window.assetsReady = true;
        }
      }

      prepareGameAssets().then(() => {
        var gameInstance = UnityLoader.instantiate("gameContainer", "build.json", {onProgress: UnityProgress,Module:{onRuntimeInitialized: function() {UnityProgress(gameInstance, "complete")}}});
        window.gameInstance = gameInstance;
      });
    </script>
  </head>
  <body>
    <div class="webgl-content">
      <div id="gameContainer"></div>
      <div class="footer">
          <div class="fullscreen" onclick="window.gameInstance.SetFullscreen(1)"></div>
          <div class="title">Pixel Combat 2</div>
      </div>
    </div>
  </body>
</html>
`;

const PixelCombatGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Pixel Combat 2"
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

export default PixelCombatGame;
