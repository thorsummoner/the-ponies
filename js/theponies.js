
window.theponies = {
	container:        document.querySelector('#canvas'),
	camera:           undefined,
	cameraWidth:      undefined,
	cameraHeight:     undefined,
	cube:             undefined,
	cubeGeo:          new THREE.BoxGeometry( 50, 50, 50 ),
	cubeMaterial:     new THREE.MeshLambertMaterial({
		color: 0xfeb74c, ambient: 0x00ff80, shading: THREE.FlatShading,
		// map: THREE.ImageUtils.loadTexture( "textures/square-outline-textured.png" ) ,
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
	rollOverMesh:     new THREE.Mesh(
		new THREE.BoxGeometry( 50, 50, 50 ),
		new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } )
	),
	scene:            new THREE.Scene(),
	stats:            new Stats(),
	theta:            45 * 0.5,
	tmpVec:           new THREE.Vector3(),
	voxelPosition:    new THREE.Vector3(),

	init: function () {
		this.cameraWidth = this.container.clientWidth;
		this.cameraHeight = this.container.clientHeight
			- parseInt(window.getComputedStyle(this.container).paddingBottom.replace(/\..+/, '')) + 1
		;

		this.camera = new THREE.PerspectiveCamera( 45, this.cameraWidth / this.cameraHeight, 1, 10000 )

		this.scene.add( this.rollOverMesh );
		this.camera.position.y = 800;

		this.grid();
		this.lights();

		this.renderer.setClearColor( 0xf0f0f0 );
		this.renderer.setSize(this.cameraWidth, this.cameraHeight);

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

	animate: function() {
		self = window.theponies;

		requestAnimationFrame( self.animate );

		self.render();
		self.stats.update();

	},

	render: function() {

		if ( this.isCtrlDown ) {

			this.theta += this.mouse2D.x * 1.5;

		}

		this.raycaster = this.projector.pickingRay( this.mouse2D.clone(), this.camera );

		this.intersects = this.raycaster.intersectObjects( this.objects );

		if ( this.intersects.length > 0 ) {

			this.intersector = this.getRealIntersector( this.intersects );

			if ( this.intersector ) {

				this.setVoxelPosition( this.intersector );
				this.rollOverMesh.position = this.voxelPosition;

			}

		}

		this.camera.position.x = 1400 * Math.sin( THREE.Math.degToRad( this.theta ) );
		this.camera.position.z = 1400 * Math.cos( THREE.Math.degToRad( this.theta ) );

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


		self.cameraWidth = self.container.clientWidth;
		self.cameraHeight = self.container.clientHeight
			- parseInt(window.getComputedStyle(self.container).paddingBottom.replace(/\..+/, '')) + 1
		;

		self.camera.aspect = self.cameraWidth / self.cameraHeight;
		self.camera.updateProjectionMatrix();

		self.renderer.setSize( self.cameraWidth, self.cameraHeight );
	},

	getRealIntersector: function( intersects ) {
		self = window.theponies;

		for( i = 0; i < intersects.length; i++ ) {

			intersector = intersects[ i ];

			if ( intersector.object != self.rollOverMesh ) {

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

		self.mouse2D.x = ( event.clientX / (self.cameraWidth) ) * 2 - 1;
		self.mouse2D.y = - ( event.clientY / (self.cameraHeight) ) * 2 + 1;

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

				intersector = self.getRealIntersector( intersects );
				self.setVoxelPosition( intersector );

				var voxel = new THREE.Mesh( self.cubeGeo, self.cubeMaterial );
				voxel.position.copy( self.voxelPosition );
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

window.addEventListener("load", function(){
	window.theponies.init();
	window.theponies.animate();
}, false);
