imp4 = {
	y: 6,
	r: 1.516129032,
	xMin: -this.y*this.r,
	xMax:  this.y*this.r,
	xScl:  this.y/5,
	yMin: -this.y,
	yMax:  this.y,
	yScl:  this.y/5,

	mi: [[0,0,1],[4,0,1],[4,2,1],[2,4,1],[0,2,1]],
	mj: [[1,2],[2,3],[3,4],[4,5],[5,1],[1,3]]

	ma: [[-1,0,0],[0,1,0],[0,0,1]],
	mb: [[1,0,0],[0,-1,0],[0,0,1]],

	draw: function() {
		var l1 = [this.mj.length, this.mj[0].length]
		var n = l1[0]

		for (var k = 1; k < n; k++) {
			console.log(k)
			var a = this.mi[this.mj[k][0]][0]
			var b = this.mi[this.mj[k][0]][1]
			var c = this.mi[this.mj[k][1]][0]
			var d = this.mi[this.mj[k][1]][1]
			this.line(a, b, c, d)
		};

	},
	line: function(x1, y1, x2, y2, group, canvas, xmlns) {
		var xmlns = xmlns ? xmlns : "http://www.w3.org/2000/svg";
		var canvas = canvas ? canvas : '#canvas';
		var svg = document.querySelector(canvas);

		var path = "M " + x1 + ', ' + y1 + 'l ' + x2 ', ' + y2;

		var node = document.createElementNS(xmlns, "svg");
		node.setAttributeNS (null, 'stroke', "#000000");
		node.setAttributeNS (null, 'stroke-width', 10);
		node.setAttributeNS (null, 'stroke-linejoin', "round");
		node.setAttributeNS (null, 'd', path);
		node.setAttributeNS (null, 'fill', "url(#gradient)");
		node.setAttributeNS (null, 'opacity', 1.0);

		if (group && group = svg.querySelector(group)) {
			group.appendChild(node)
		} else {
			group = document.createElementNS (xmlns, "g")
			group.id = this.uuid()
			group.appendChild(node)
		}
	},
	uuid = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},
}
