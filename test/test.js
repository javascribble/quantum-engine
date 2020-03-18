engine.resourceOptions.path = '/test/resources';

function registerMovementSystem() {
	const transforms = new Set();
	function updateMovementSystem(deltaTime) {
		if (deltaTime > 17) {
			console.log(deltaTime);
		}

		for (const transform of transforms) {
			const translation = transform.translation;
			translation.x = (translation.x + 0.1) % 100;
			translation.y = (translation.y + 0.1) % 100;

			const rotation = transform.rotation;
			rotation.z = (rotation.z + 0.01) % 6.28319;

			transform.changed = true;
		}
	}

	engine.registerSystem(engine.transformComponent, transforms, updateMovementSystem);
}	

async function initialize() {
	engine.initialize2dPreset();
	registerMovementSystem();
	await engine.registerVideoRenderingSystem();
	engine.start();
	
	const scene = await engine.loadScene('scene.json');
	const count = 100;
	for (let i = 0; i < count; i++) {
		const transform = engine.createTransform();
		transform.translation.x = Math.random() * 100;
		transform.translation.y = Math.random() * 100;
		transform.translation.z = Math.random() - 1;
		transform.rotation.z = engine.convertDegreesToRadians(45);
		transform.scale.x = 2;//Math.random() * 2;
		transform.scale.y = 2;//Math.random() * 2;
		transform.changed = true;

		const entity = engine.createEntity();
		entity.transform = transform;
		scene.entities.push(entity);
	}

	const root = engine.createEntity();
	root.scene = scene;
}

initialize();