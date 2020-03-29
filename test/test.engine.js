engine.resourceOptions.path = '/test/resources';
engine.enableEngineDefaults();
engine.start();
initialize();

async function initialize() {
	const entities = new Set();
	function update(deltaTime) {
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
	}

	engine.updates.push(update);
	await engine.registerVideoSystem();
			
	const scene = await engine.loadScene('webgpuScene.json');
	const material = engine.createMaterial();
	const mesh = engine.createMesh();
	for (let i = 0; i < 100; i++) {
		const transform = engine.createTransform();
		transform.translation.x = Math.random() * 200 - 100;
		transform.translation.y = Math.random() * 200 - 100;
		transform.translation.z = Math.random() - 1;
		transform.rotation.z = engine.convertDegreesToRadians(45);
		transform.scale.x = 2;//Math.random() * 2;
		transform.scale.y = 2;//Math.random() * 2;
		transform.changed = true;

		const entity = engine.createEntity();
		entity.transform = transform;
		entity.material = material;
		entity.mesh = mesh;
		entities.add(entity);
	}
}