import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <base href="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/">
	<title>Basket Random</title>
	<meta name="viewport"
		content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
	<style>
		body { margin: 0; padding: 0; background-color: black; overflow: hidden; width: 100vw; height: 100vh; }
		canvas { width: 100% !important; height: 100% !important; display: block; }
	</style>
	<link rel="stylesheet"
		href="style.css"
		type="text/css">
	<script>
		window.addEventListener("keydown", function(e) { // space and arrow keys if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) { e.preventDefault(); } }, false); 
	</script>
</head>

<body>
	<div id="fb-root"></div>
	<script src="box2d.js"></script>
	<script src="suppoortcheck.js"></script>
	<script src="offclient.js" type="module"></script>
	<script src="main.js" type="module"></script>
	<script src="registersw.js" type="module"></script>
	<script src="api.js"></script>
</body>
</html>
`;

const BasketRandomGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Basket Random"
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

export default BasketRandomGame;