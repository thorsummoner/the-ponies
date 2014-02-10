debugClock = function () {
	id = 'debug-clock'
	var node = document.createElementNS(canvas.xmlns, 'text')
	node.id = id
	node.textContent = Date()
	node.setAttribute('font-family', 'snas-serif')
	node.setAttribute('font-size', '14pt')
	node.setAttribute('x', 0)
	node.setAttribute('y', '14pt')

	canvas.appendChild(node)

	window[id] = setInterval(function(){
		var node = canvas.querySelector('#debug-clock')

		equestria.time.now += equestria.time.tickrate
			* equestria.time.multiplier
			* equestria.time.fastforward

		var date = new Date();
		date.setTime(equestria.time.now)

		node.textContent = Date() + ' :: ' + date
	}, equestria.time.tickrate)
	// TODO introduce variable tickrate based on stock tickrate / fastforward multiplier
}

debugSpeed = function () {
	id = 'tick-multiplier'
	var group = document.createElementNS(canvas.xmlns, 'g')
	group.setAttributeNS(canvas.xmlns, 'transform', 'translate(10, 30)')

	var node = document.createElementNS(canvas.xmlns, 'path')
	node.id = uuid()
	node.setAttributeNS(canvas.xmlns, 'd',      "M 0 15 L 15 7.5 L 0 0 z")
	node.setAttributeNS(canvas.xmlns, 'fill',   "orange")
	node.setAttributeNS(canvas.xmlns, 'stroke', "black")
	node.setAttributeNS(canvas.xmlns, 'stroke-width', "3")
	node.onclick = function () {equestria.time['fastforward'] = 1}
	group.appendChild(node)

	var node = document.createElementNS(canvas.xmlns, 'path')
	node.id = uuid()
	node.setAttributeNS(canvas.xmlns, 'transform', 'translate(20, 0)')
	node.setAttributeNS(canvas.xmlns, 'd',      "M 0 15 L 15 7.5 L 0 0 z")
	node.setAttributeNS(canvas.xmlns, 'fill',   "orange")
	node.setAttributeNS(canvas.xmlns, 'stroke', "black")
	node.setAttributeNS(canvas.xmlns, 'stroke-width', "3")
	node.onclick = function () {equestria.time['fastforward'] = 5}
	group.appendChild(node)

	var node = document.createElementNS(canvas.xmlns, 'path')
	node.id = uuid()
	node.setAttributeNS(canvas.xmlns, 'transform', 'translate(40, 0)')
	node.setAttributeNS(canvas.xmlns, 'd',      "M 0 15 L 15 7.5 L 0 0 z")
	node.setAttributeNS(canvas.xmlns, 'fill',   "orange")
	node.setAttributeNS(canvas.xmlns, 'stroke', "black")
	node.setAttributeNS(canvas.xmlns, 'stroke-width', "3")
	node.onclick = function () {equestria.time['fastforward'] = 30}
	group.appendChild(node)

	canvas.appendChild(group)


}

equestria = {
	init: function () {
	},
	time: {
		multiplier:  48, // Time passes 49 times as fast in game
		fastforward: 1,
		tickrate:    1250,
		epoch:       new Date().getTime(),
		now:         new Date().getTime(),
	},
	lifespan: {
		'short': 25,
		'medium': 50,
		'normal': 90,
		'long': 190,
		'epic': 960,
	},
	sky: [
		{stop: '0',   name: "midnight", 	color: "#0d001f"},
		{stop: '10',  name: "midnight", 	color: "#0d001f"},
		{stop: '32',  name: "late",     	color: "#5a19b3"},
		{stop: '35',  name: "bubblegum",	color: "#c281ef"},
		{stop: '37',  name: "dawn",     	color: "#fffbc8"},
		{stop: '43',  name: "early",    	color: "#aad0de"},
		{stop: '90',  name: "midday",   	color: "#4fadda"},
		{stop: '100', name: "midday",   	color: "#4fadda"},
	],
}
