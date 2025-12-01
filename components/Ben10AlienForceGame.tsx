import React from 'react';

const GAME_SOURCE = `
<html>
<head>
	<style>
		body {
			overflow: hidden;
			background: #000000;
			margin: 0;
			padding: 0;
			color: #ffffff;
            font-family: monospace;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
		}
		#startButton {
			display: block;
			width: 200px;
			height: 60px;
			background-color: #22c55e;
			color: white;
			text-align: center;
			font-size: 20px;
			border: none;
			border-radius: 4px;
			cursor: pointer;
            text-transform: uppercase;
            font-weight: bold;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
            font-family: 'Courier New', Courier, monospace;
		}
        #startButton:hover {
            background-color: #16a34a;
        }
        #game {
            width: 100%;
            height: 100%;
        }
        .container {
            width: 100%; 
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
	</style>
</head>
<body>
	<div class="container">
		<div id="game" style="display: none;"></div>
		<button id="startButton">PLAY</button>
	</div>
	<script>
		document.getElementById("game").style.display = "none";
            function startGame() {
                document.getElementById("game").style.display = "block";
                document.getElementById("startButton").style.display = "none";
                window.EJS_player = "#game";
                window.EJS_core = "nds";
                window.EJS_color = "#000000";
                window.EJS_startOnLoaded = true;
                window.EJS_pathtodata = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data";
                window.EJS_gameUrl = "https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@8fc7a6b563016b58afa6678a97ce42af6e8bdb9d/Ben%2010%20-%20Alien%20Force%20(USA)%20(En%2CFr%2CDe%2CEs%2CIt).zip";
                loadGame(); 
            }
            document.getElementById("startButton").addEventListener("click", startGame);
            function loadGame() {
                var script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data/loader.js";
                document.body.appendChild(script);
                
                // Optional cloak script from original source
                // var script2 = document.createElement("script");
                // script2.src = "https://cdn.jsdelivr.net/gh/a456pur/seraph@ae2fcc6d6a9cd051654fcc0519080db1f79cf2a7/storage/js/cloak.js";
                // document.body.appendChild(script2);
            }
	</script>
</body>
</html>
`;

const Ben10AlienForceGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Ben 10 Alien Force"
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

export default Ben10AlienForceGame;