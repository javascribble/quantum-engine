engine.start({
	path: '/test/resources',
	resources: [
		'Kal16.png',
		'Kal256.png'
	],	
	scenes: [
		{
			entities: [
				{
					transform: {						
					},
					renderable: {
						sx: 0,
						sy: 0,
						sw: 16,
						sh: 16,
						dx: 0,
						dy: 0,
						dw: 16,
						dh: 16
					},
					resources: [0]
				}
			]
		}
	]
});