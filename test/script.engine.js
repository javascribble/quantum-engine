engine.start({
	content: {
		path: '/test/resources',
		scenes: [{
			resources: [0]
		}],
		resources: [
			'webgpuStaticBuffers.json',
			'webgpuRenderPass.json',
			'triangle.vert.spv',
			'triangle.frag.spv',
			'webgpuLayout.json',
			'webgpuProgram.json',
			'webgpuTexture.json'
		]		
	}
});