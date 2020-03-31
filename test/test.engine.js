engine.resourceOptions.path = '/test/resources';
engine.enableEngineDefaults();
engine.start();

const entities = new Set();
engine.systems.add({
	components: [engine.transformComponent],
	add: entities.add,
	delete: entities.delete
});

engine.updates.push((deltaTime) => {
	if (deltaTime > 17) {
		console.log(deltaTime);
	}

	for (const entity of entities) {
		const transform = entity.transform;
		const translation = transform.translation;
		translation.x = Math.random() * 200 - 100;
		translation.y = Math.random() * 200 - 100;

		const rotation = transform.rotation;
		rotation.z = (rotation.z + 0.01) % 6.28319;

		transform.changed = true;
	}
});

async function initialize() {	
	await engine.registerVideoSystem();
	const sceneResource = await engine.loadScene('webgpuScene.json');
	const scene = engine.createScene(sceneResource.scenes[0]);
}

initialize();