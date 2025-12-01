import React from 'react';

const GAME_SOURCE = `
<!DOCTYPE html>
<html>
<head>
	<base href="https://cdn.jsdelivr.net/gh/genizy/polytrack@main/">
	<script>
		window.jkdfgnjkndfg = document.querySelector('base').href;
		fetch("simulation_worker.bundle.js").then(res => res.text()).then(text => {
			const blob = new Blob([text.replaceAll("replacethisplease", window.jkdfgnjkndfg)], { type: 'application/javascript' });
			window.simulationworker = URL.createObjectURL(blob);
		});
		const ogworker = window.Worker;
		window.Worker = function (scripturl, options) {
			if (typeof scripturl === 'string' && scripturl.toLowerCase() === "simulation_worker.bundle.js") {
				scripturl = window.simulationworker;
			}
			return new ogworker(scripturl, options);
		};
		window.Worker.prototype = ogworker.prototype;

		const ogfetch = window.fetch;
		window.fetch = async function (input, init) {
			if (typeof input === "string") {
				input = input.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
			} else if (input instanceof Request) {
				const newUrl = input.url.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
				input = new Request(newUrl, input);
			}
			return ogfetch(input, init);
		};

		const ogxml = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function (method, url, ...rest) {
			if (typeof url === "string") {
				url = url.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
			}
			return ogxml.call(this, method, url, ...rest);
		};
	</script>
	<link rel="manifest" href="manifest.json" />
	<meta name="viewport"
		content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <style>
        body { margin: 0; padding: 0; background-color: black; overflow: hidden; width: 100vw; height: 100vh; }
        canvas { width: 100% !important; height: 100% !important; display: block; }
    </style>
</head>

<body>
	<canvas id="screen"></canvas>
	<div id="ui"></div>
	<div id="transition-layer"></div>

	<script type="module" src="main.bundle.js" defer></script>
</body>

</html>
`;

const PolytrackGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="w-full h-full relative bg-black">
      <iframe
        title="Polytrack"
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

export default PolytrackGame;