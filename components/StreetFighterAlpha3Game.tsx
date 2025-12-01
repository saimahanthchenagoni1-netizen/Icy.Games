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
		}
		#startButton {
			display: block;
			width: 200px;
			height: 60px;
			background-color: #ef4444;
			color: white;
			text-align: center;
			font-size: 20px;
			border: none;
			border-radius: 4px;
			cursor: pointer;
            text-transform: uppercase;
            font-weight: bold;
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
		}
        #startButton:hover {
            background-color: #dc2626;
        }
        #game {
            width: 100%;
            height: 100%;
        }
	</style>
</head>
<body>
	<div id="gameContainer" style="width: 100%; height: 100%;">
		<div id="game" style="display: none;"></div>
		<button id="startButton">START GAME</button>
	</div>
	<script>
		document.getElementById("game").style.display = "none";
        
        function startGame() {
            document.getElementById("game").style.display = "block";
            document.getElementById("startButton").style.display = "none";
            
            window.EJS_player = "#game";
            window.EJS_core = "gba"; // SFA3 for GBA is smooth
            window.EJS_color = "#000000";
            window.EJS_startOnLoaded = true;
            window.EJS_pathtodata = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data";
            window.EJS_gameUrl = "https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@a3b0ea52357b0aa94b7acf145c52494035722022/Street%20Fighter%20Alpha%203%20(USA).zip";
            
            var script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data/loader.js";
            document.body.appendChild(script);
        }
        
        document.getElementById("startButton").addEventListener("click", startGame);
	</script>
</body>
</html>
`;

const StreetFighterAlpha3Game: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Street Fighter Alpha 3"
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

export default StreetFighterAlpha3Game;