module.exports = [
	{type: "Standard", str: "https://www.youtube.com/watch?v=hIs5StN8J-0"},
	{type: "With http", str: "http://www.youtube.com/watch?v=hIs5StN8J-0"},
	{type: "Without protocol", str: "www.youtube.com/watch?v=hIs5StN8J-0"},
	{
		type: "With https, without www",
		str: "https://youtube.com/watch?v=hIs5StN8J-0",
	},
	{
		type: "With http, without www",
		str: "http://youtube.com/watch?v=hIs5StN8J-0",
	},
	// note this isn’t actually a valid YouTube URL, but works with the plugin
	{type: "Without \u201cv\u201d param", str: "youtube.com/hIs5StN8J-0"},
	{type: "With youtu.be", str: "youtu.be/hIs5StN8J-0"},
	{
		type: "With youtu.be, with \u201cv\u201d param",
		str: "youtu.be/watch?v=hIs5StN8J-0",
	},
	{
		type: "With arbitrary params",
		str: "https://www.youtube.com/watch?v=hIs5StN8J-0&foo=bar&baz",
	},
];
