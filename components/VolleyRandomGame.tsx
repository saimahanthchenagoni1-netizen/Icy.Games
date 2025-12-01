import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<base href="https://274105583-163826330694719375.preview.editmysite.com/uploads/b/139890129-613310438668365288/files/">
<title>Volley Random</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">

<meta name="generator" content="Scirra Construct">

<style>
  body { margin: 0; padding: 0; background-color: black; overflow: hidden; width: 100vw; height: 100vh; }
  canvas { width: 100% !important; height: 100% !important; display: block; }
</style>

<link rel="stylesheet" href="style.css" type="text/css">
<script type="text/javascript">
        // Mock SDK to prevent errors if missing
        window.sdk = window.sdk || { showBanner: function(){} };
        function analytics() {sdk.showBanner();};
        function analytics_ID() {sdk.showBanner();};
        setTimeout(function() {analytics();}, 1000);
        setInterval(function() {analytics_ID();}, 675000);
</script>
</head>
<body>

<script>
if (location.protocol.substr(0, 4) ==="file")
{
	alert("Web exports won't work until you upload them. (When running on the file: protocol, browsers block many features from working for security reasons.)");
}
</script>
	<script src="box2d.wasm.js"></script>
	<noscript>
		<div id="notSupportedWrap">
			<h2 id="notSupportedTitle">This content requires JavaScript</h2>
			<p class="notSupportedMessage">JavaScript appears to be disabled. Please enable it to view this content.</p>
		</div>
	</noscript>
	<script src="scripts/supportcheck.js"></script>
	<script src="scripts/offlineclient.js" type="module"></script>
	<script src="scripts/main.js" type="module"></script>
	<script src="scripts/register-sw.js" type="module"></script>
	
</body>
</html>
`;

const VolleyRandomGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Volley Random"
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

export default VolleyRandomGame;