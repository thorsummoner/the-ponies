
texture = {
	textures: {},
	init: function () {
		this._batch(json.decode(ajax('js/the-ponies/texture/yudhaikeledai.json')));
		this._batch(json.decode(ajax('js/the-ponies/texture/BonesWolbach.json')));
	},
	_batch: function (files) {
		for (file in files) {
			var id = uuid();
			this[id] = {
				path: files[file],
				material: new THREE.MeshBasicMaterial({
					map: THREE.ImageUtils.loadTexture(files[file]),
					wrapS: THREE.RepeatWrapping,
					wrapT: THREE.RepeatWrapping
				}),
			}
			this[id].file_name = this[id].path.split('/').pop();
			this[id].name      = this[id].file_name.split(' - ').pop().replace(/\.[^/.]+$/, "");
			this[id].price     = this[id].file_name.match(/^\d+/).pop();
			this[id].catagory  = this[id].path.match(/.{15}[^/]+/).pop().split('/').pop();

			this.textures[this[id].name] = id;
		}
	},
}
