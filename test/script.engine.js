engine.start({
	path: '/test/resources',
	scenes: [
		{
			entities: [
				{
					renderable: {
						texture: {
							resources: [0]
						}
					}
				}
			]
		}
	],
	resources: [
		'Kal16.png',
		'Kal256.png'
	]	
});