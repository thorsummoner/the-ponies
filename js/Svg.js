var Svg = function(id, parent, xmlns) {
	var xmlns  = xmlns ? xmlns : "http://www.w3.org/2000/svg"
	var parent = parent ? document.querySelector(parent) : document.body

	node = document.createElementNS(xmlns, 'svg')
	node.xmlns = xmlns
	node.id = id ? id : uuid()
	node.style.display = "block";

	parent.appendChild(node)

	node.maximize = function () {
		this.setAttributeNS (null, "viewBox", "0 0 " + this.parentNode.scrollWidth + " " + this.parentNode.scrollHeight);
		this.setAttributeNS(null, "width", this.parentNode.scrollWidth);
		this.setAttributeNS(null, "height", this.parentNode.scrollHeight);
	}

	return node
}
