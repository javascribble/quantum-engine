engine.loaderOptions.path = '/test/resources';
engine.enableEngineDefaults();
engine.start();

async function initialize() {	
	await engine.registerVideoSystem();
	await engine.load('game.json');
}

initialize();