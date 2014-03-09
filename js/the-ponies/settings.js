
window.settings = {
	fov: 90,
	clipNear: 0.1,
	clipFar:  20000,
	renderResolutionWidth: window.innerWidth,
	renderResolutionHeight: window.innerHeight,

	chunk: {
		// Size of wolrd-chunks in units
		world:  new THREE.Vector3( 16, 16, 16 ),
		// Size of camera-chumks in units
		camera: new THREE.Vector3( 16, 16, 16 ),
	},
}
