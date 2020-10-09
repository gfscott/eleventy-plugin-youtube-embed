module.exports = [
	{
		name: "default options",
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
		options: {},
	},
	{
		name: "nocookie false",
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
		options: {noCookie: false},
	},
	{
		name: "lazy loading",
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>',
		options: {lazy: true},
	},
	{
		name: "allowfullscreen false",
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe></div>',
		options: {allowFullscreen: false},
	},
	{
		name: "autoplay",
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?autoplay=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
		options: {autoplay: true},
	},
	{
		name: "closed captions",
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?cc_load_policy=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
		options: {closedCaptions: true},
	},
	{
		name: "autoplay AND closed captions",
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0?autoplay=1&amp;cc_load_policy=1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
		options: {closedCaptions: true, autoplay: true},
	},
	{
		name: "custom allow attributes",
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="custom allows" allowfullscreen></iframe></div>',
		options: {allowAttrs: "custom allows"},
	},
	{
		name: "custom aspect ratio",
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 75%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
		options: {aspectRatio: "4:3"},
	},
	{
		name: "custom class",
		output: '<div id="hIs5StN8J-0" class="custom" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
		options: {embedClass: "custom"},
	},
];
