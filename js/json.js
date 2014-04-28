json = {
	encode: function(mixed) {
		return JSON.stringify(mixed)
	},
	decode: function (string) {
		return JSON.parse(string)
	}
}
