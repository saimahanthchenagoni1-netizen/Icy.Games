
import React from 'react';

const GAME_SOURCE = `
<html>
<head>
	<script src="//www.google.com/jsapi"></script>
	<script>
		window.parent.maeExportApis_();
	</script>

	<style>
		body {
			overflow: hidden;
			background: #000000;
			margin-top: 0;
			margin-left: 0;
			color: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
		}

		#startButton {
			display: block;
			width: 160px;
			height: 40px;
			background-color: #4CAF50;
			color: white;
			text-align: center;
			text-decoration: none;
			font-size: 16px;
			margin: 20px auto;
			padding: 10px 20px;
			border: none;
			border-radius: 8px;
			cursor: pointer;
			font-family: 'Courier New', Courier, monospace;
			box-shadow: 0px 0px 10px 2px #000000;
            font-weight: bold;
            text-transform: uppercase;
		}
        #startButton:hover {
            background-color: #45a049;
        }
	</style>
	<style type="text/css">
		#button {
			display: none;
		}

		.imgb_vis {
			animation: imgb-animation 7s linear;
		}

		@keyframes imgb-animation {
			10% {
				transform: translateX(0);
			}

			20% {
				transform: translateX(100px);
			}

			90% {
				transform: translateX(100px);
			}

			100% {
				transform: translateX(0);
			}
		}
	</style>
</head>

<body>
	<div style="width: 100vw; height: 100vh;max-width:100%">
		<div id="game" style="display: none;"></div>
		<button id="startButton">PLAY GTA</button>
	</div>
	<script>
		document.getElementById("game").style.display = "none";
            function startGame() {
                document.getElementById("game").style.display = "block";
                document.getElementById("startButton").style.display = "none";
                window.EJS_player = "#game";
                window.EJS_core = "psx";
                window.EJS_color = "#000000";
                window.EJS_startOnLoaded = true;
                window.EJS_pathtodata = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data";
                window.EJS_gameUrl = "https://bbcdn.githack.com/helloitadmin/smart/raw/main/Grand%20Theft%20Auto%20(USA).zip";
                loadGame();  
            }
            document.getElementById("startButton").addEventListener("click", startGame);
            function loadGame() {
                var script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data/loader.js";
                document.body.appendChild(script);
		var script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/gh/a456pur/seraph@ae2fcc6d6a9cd051654fcc0519080db1f79cf2a7/storage/js/cloak.js";
                document.body.appendChild(script);
            }
	</script>
</body>
</html>
`;

const GtaGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Grand Theft Auto"
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

export default GtaGame;
