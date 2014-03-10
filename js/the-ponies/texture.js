
texture = {
	textures: {},
	init: function () {
		this._batch(json.decode(ajax('js/the-ponies/texture/yudhaikeledai.json')));
	},
	_batch: function (files) {
		for (file in files) {
			var id = uuid();
			this.textures[id] = {
				path: files[file],
				materia: new THREE.MeshBasicMaterial({
					map: THREE.ImageUtils.loadTexture(files[file]),
				}),
			}
			this.textures[id].name     = this.textures[id].path.split('/').pop();
			this.textures[id].price    = this.textures[id].name.match(/^\d+/).pop();
			this.textures[id].catagory = this.textures[id].path.match(/.{15}[^/]+/).pop().split('/').pop();

		}
	},
}
