exports.pluginDefaults = {
	allowAttrs: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
	allowFullscreen: true,
	aspectRatio: "16:9",
	autoplay: false,
	closedCaptions: false,
	embedClass: "eleventy-plugin-youtube-embed",
	lazy: false,
	lite: false,
	noCookie: true,
	width: "100%"
};

exports.liteDefaults = {
	css: {
		path: "https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css",
	},
	js: {
		path: "https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js",
	},
};
