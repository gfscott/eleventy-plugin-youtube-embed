const test = require("ava");
const {pluginDefaults} = require("../lib/pluginDefaults.js");
const buildEmbed = require("../lib/buildEmbed.js");
const extractMatches = require("../lib/extractMatches.js");
const validStrings = require("./inc/validStrings.js");

const pluginLiteModeOptions = Object.assign({}, pluginDefaults, {lite: true});
const pluginLiteModeOptionsAltCss = Object.assign(
	{},
	pluginDefaults,
	{
		lite: {
			css: {
				path: "https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css",
			},
		},
	},
);
const pluginLiteModeOptionsAltJs = Object.assign(
	{},
	pluginDefaults,
	{
		lite: {
			js: {
				path: "https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js",
			},
		},
	},
);
const pluginLiteModeOptionsAltBoth = Object.assign(
	{},
	pluginDefaults,
	{
		lite: {
			css: {
				path: "https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css",
			},
			js: {
				path: "https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js",
			},
		},
	},
);
validStrings.forEach(function(obj) {
	test(
		`${obj.type} ideal case, lite embed, zero-index`,
		(t) => {
			let idealCase = `<p>${obj.str}</p>`;
			t.is(
				buildEmbed(extractMatches(idealCase), pluginLiteModeOptions, 0),
				`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with links, lite embed, zero-index`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			t.is(
				buildEmbed(extractMatches(withLinks), pluginLiteModeOptions, 0),
				`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with whitespace, lite embed, zero-index`,
		(t) => {
			let withWhitespace = `<p>
      ${obj.str}
    </p>`;
			t.is(
				buildEmbed(extractMatches(withWhitespace), pluginLiteModeOptions, 0),
				`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with links and whitespace, lite embed, zero-index`,
		(t) => {
			let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
			t.is(
				buildEmbed(
					extractMatches(withLinksAndWhitespace),
					pluginLiteModeOptions,
					0,
				),
				`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} ideal case, lite embed with alt script path, zero-index`,
		(t) => {
			let idealCase = `<p>${obj.str}</p>`;
			t.is(
				buildEmbed(extractMatches(idealCase), pluginLiteModeOptionsAltJs, 0),
				`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with links, lite embed with alt script path, zero-index`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			t.is(
				buildEmbed(extractMatches(withLinks), pluginLiteModeOptionsAltJs, 0),
				`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with whitespace, lite embed with alt script path, zero-index`,
		(t) => {
			let withWhitespace = `<p>
      ${obj.str}
    </p>`;
			t.is(
				buildEmbed(
					extractMatches(withWhitespace),
					pluginLiteModeOptionsAltJs,
					0,
				),
				`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with links and whitespace, lite embed with alt script path, zero-index`,
		(t) => {
			let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
			t.is(
				buildEmbed(
					extractMatches(withLinksAndWhitespace),
					pluginLiteModeOptionsAltJs,
					0,
				),
				`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);

	test(
		`${obj.type} ideal case, lite embed with alt style path, zero-index`,
		(t) => {
			let idealCase = `<p>${obj.str}</p>`;
			t.is(
				buildEmbed(extractMatches(idealCase), pluginLiteModeOptionsAltCss, 0),
				`<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with links, lite embed with alt style path, zero-index`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			t.is(
				buildEmbed(extractMatches(withLinks), pluginLiteModeOptionsAltCss, 0),
				`<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with whitespace, lite embed with alt style path, zero-index`,
		(t) => {
			let withWhitespace = `<p>
      ${obj.str}
    </p>`;
			t.is(
				buildEmbed(
					extractMatches(withWhitespace),
					pluginLiteModeOptionsAltCss,
					0,
				),
				`<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with links and whitespace, lite embed with alt style path, zero-index`,
		(t) => {
			let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
			t.is(
				buildEmbed(
					extractMatches(withLinksAndWhitespace),
					pluginLiteModeOptionsAltCss,
					0,
				),
				`<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://cdn.jsdelivr.net/gh/paulirish/lite-youtube-embed@master/src/lite-yt-embed.min.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);

	test(
		`${obj.type} ideal case, lite embed with alt style AND script path, zero-index`,
		(t) => {
			let idealCase = `<p>${obj.str}</p>`;
			t.is(
				buildEmbed(extractMatches(idealCase), pluginLiteModeOptionsAltBoth, 0),
				`<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with links, lite embed with alt style AND script path, zero-index`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			t.is(
				buildEmbed(extractMatches(withLinks), pluginLiteModeOptionsAltBoth, 0),
				`<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with whitespace, lite embed with alt style AND script path, zero-index`,
		(t) => {
			let withWhitespace = `<p>
      ${obj.str}
    </p>`;
			t.is(
				buildEmbed(
					extractMatches(withWhitespace),
					pluginLiteModeOptionsAltBoth,
					0,
				),
				`<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with links and whitespace, lite embed with alt style AND script path, zero-index`,
		(t) => {
			let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
			t.is(
				buildEmbed(
					extractMatches(withLinksAndWhitespace),
					pluginLiteModeOptionsAltBoth,
					0,
				),
				`<link rel="stylesheet" href="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.css"><script defer="defer" src="https://unpkg.com/lite-youtube-embed@0.0.0/src/lite-yt-embed.js"></script><div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} ideal case, lite embed, one-index`,
		(t) => {
			let idealCase = `<p>${obj.str}</p>`;
			t.is(
				buildEmbed(extractMatches(idealCase), pluginLiteModeOptions, 1),
				`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with links, lite embed, one-index`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			t.is(
				buildEmbed(extractMatches(withLinks), pluginLiteModeOptions, 1),
				`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with whitespace, lite embed, one-index`,
		(t) => {
			let withWhitespace = `<p>
      ${obj.str}
    </p>`;
			t.is(
				buildEmbed(extractMatches(withWhitespace), pluginLiteModeOptions, 1),
				`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
	test(
		`${obj.type} with links and whitespace, lite embed, one-index`,
		(t) => {
			let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
			t.is(
				buildEmbed(
					extractMatches(withLinksAndWhitespace),
					pluginLiteModeOptions,
					1,
				),
				`<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"><lite-youtube videoid="hIs5StN8J-0" style="background-image: url('https://i.ytimg.com/vi/hIs5StN8J-0/hqdefault.jpg');"><div class="lty-playbtn"></div></lite-youtube></div>`,
			);
		},
	);
});
