var Svg = function(id, parent, xmlns) {
	this.xmlns = xmlns ? xmlns : "http://www.w3.org/2000/svg"
	var parent = parent ? document.querySelector(parent) : document.body

	this.node = document.createElementNS(this.xmlns, 'svg')
	this.node.id = id ? id : uuid()

	parent.appendChild(this.node)

}
Svg.prototype.maximize = function () {
	log(this.node.style.backgroundColor = 'red')
}
