window.theponies = {
	camera:           new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 ),
	container:        document.querySelector('#canvas'),
	cube:             undefined,
	cubeGeo:          new THREE.BoxGeometry( 50, 50, 50 ),
	cubeMaterial:     new THREE.MeshLambertMaterial({
		color: 0xfeb74c, ambient: 0x00ff80, shading: THREE.FlatShading,
		map: THREE.ImageUtils.loadTexture( "textures/square-outline-textured.png" ) ,
	}),
	i:                undefined,
	intersector:      undefined,
	isCtrlDown:       false,
	isShiftDown:      false,
	mouse2D:          new THREE.Vector3( 0, 10000, 0.5 ),
	mouse3D:          undefined,
	normalMatrix:     new THREE.Matrix3(),
	objects:          [],
	plane:            new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000 ), new THREE.MeshBasicMaterial() ),
	projector:        new THREE.Projector(),
	raycaster:        undefined,
	renderer:         new THREE.WebGLRenderer( { antialias: true } ),
	rollOveredFace:   undefined,
	rollOverGeo:      new THREE.BoxGeometry( 50, 50, 50 ),
	rollOverMaterial: new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),
	rollOverMesh:     new THREE.Mesh( rollOverGeo, rollOverMaterial ),
	scene:            new THREE.Scene(),
	stats:            new Stats(),
	theta:            45 * 0.5,
	tmpVec:           new THREE.Vector3(),
	voxelPosition:    new THREE.Vector3(),

	init: function () {

		this.scene.add( this.rollOverMesh );

		this.grid();
		this.lights();

		this.renderer.setClearColor( 0xf0f0f0 );
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.container.appendChild( this.renderer.domElement );

		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.top = '0px';
		this.container.appendChild( this.stats.domElement );

		window.addEventListener( 'resize', this.onWindowResize, false );
		this.container.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
		this.container.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
		this.container.addEventListener( 'keydown', this.onDocumentKeyDown, false );
		this.container.addEventListener( 'keyup', this.onDocumentKeyUp, false );
	},

	function animate() {

		requestAnimationFrame( animate );

		render();
		this.stats.update();

	},

	function render() {

		if ( this.isCtrlDown ) {

			this.theta += this.mouse2D.x * 1.5;

		}

		this.raycaster = this.projector.pickingRay( this.mouse2D.clone(), this.camera );

		var this.intersects = this.raycaster.intersectObjects( this.objects );

		if ( this.intersects.length > 0 ) {

			this.intersector = this.getRealIntersector( this.intersects );

			if ( this.intersector ) {

				this.setVoxelPosition( this.intersector );
				this.rollOverMesh.position = this.voxelPosition;

			}

		}

		this.camera.position.x = 1400 * Math.sin( THREE.Math.degToRad( theta ) );
		this.camera.position.z = 1400 * Math.cos( THREE.Math.degToRad( theta ) );

		this.camera.lookAt( this.scene.position );

		this.renderer.render( this.scene, this.camera );

	},

	grid: function () {
		var size = 500, step = 50;

		var geometry = new THREE.Geometry();

		for ( var i = - size; i <= size; i += step ) {

			geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
			geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

			geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
			geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

		}

		var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );

		var line = new THREE.Line( geometry, material );
		line.type = THREE.LinePieces;
		this.scene.add( line );

		this.plane.rotation.x = - Math.PI / 2;
		this.plane.visible = false;
		this.scene.add( this.plane );

		this.objects.push( this.plane );

	},

	lights: function () {
		var ambientLight = new THREE.AmbientLight( 0x606060 );
		this.scene.add( ambientLight );

		var directionalLight = new THREE.DirectionalLight( 0xffffff );
		directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
		this.scene.add( directionalLight );
	},


	onWindowResize: function() {
		self = window.theponies;

		self.camera.aspect = window.innerWidth / window.innerHeight;
		self.camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	},

	getRealIntersector: function( intersects ) {

		for( i = 0; i < intersects.length; i++ ) {

			intersector = intersects[ i ];

			if ( intersector.object != rollOverMesh ) {

				return intersector;

			}

		}

		return null;

	},

	setVoxelPosition: function( intersector ) {
		self = window.theponies;

		if ( intersector.face === null ) {

			console.log( intersector )

		}

		self.normalMatrix.getNormalMatrix( intersector.object.matrixWorld );

		self.tmpVec.copy( intersector.face.normal );
		self.tmpVec.applyMatrix3( self.normalMatrix ).normalize();

		self.voxelPosition.addVectors( intersector.point, self.tmpVec );
		self.voxelPosition.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

	},

	onDocumentMouseMove: function( event ) {
		self = window.theponies;

		event.preventDefault();

		self.mouse2D.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		self.mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	},

	onDocumentMouseDown: function( event ) {
		self = window.theponies;

		event.preventDefault();

		var intersects = self.raycaster.intersectObjects( self.objects );

		if ( intersects.length > 0 ) {

			intersector = self.getRealIntersector( intersects );

			// delete cube

			if ( self.isShiftDown ) {

				if ( intersector.object != plane ) {

					self.scene.remove( intersector.object );

					self.objects.splice( self.objects.indexOf( intersector.object ), 1 );

				}

			// create cube

			} else {

				intersector = getRealIntersector( intersects );
				setVoxelPosition( intersector );

				var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
				voxel.position.copy( voxelPosition );
				voxel.matrixAutoUpdate = false;
				voxel.updateMatrix();
				self.scene.add( voxel );

				self.objects.push( voxel );

			}

		}
	},

	onDocumentKeyDown: function( event ) {
		self = window.theponies;

		switch( event.keyCode ) {

			case 16: self.isShiftDown = true; break;
			case 17: self.isCtrlDown = true; break;

		}

	},

	onDocumentKeyUp: function( event ) {
		self = window.theponies;

		switch ( event.keyCode ) {

			case 16: self.isShiftDown = false; break;
			case 17: self.isCtrlDown = false; break;

		}

	},

}

document.addEventListener('DOMContentLoaded', window.theponies.init);
