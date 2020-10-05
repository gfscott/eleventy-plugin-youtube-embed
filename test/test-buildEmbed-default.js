const test = require("ava");
const {pluginDefaults} = require("../lib/pluginDefaults.js");
const buildEmbed = require("../lib/buildEmbed.js");
const extractMatches = require("../lib/extractMatches.js");
const validStrings = require("./inc/validStrings.js");

validStrings.forEach(function(obj) {
	test(
		`${obj.type} ideal case`,
		(t) => {
			let idealCase = `<p>${obj.str}</p>`;
			t.is(
				buildEmbed(extractMatches(idealCase), pluginDefaults),
				'<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
			);
		},
	);
	test(
		`${obj.type} with links`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			t.is(
				buildEmbed(extractMatches(withLinks), pluginDefaults),
				'<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
			);
		},
	);
	test(
		`${obj.type} with whitespace`,
		(t) => {
			let withWhitespace = `<p>
      ${obj.str}
    </p>`;
			t.is(
				buildEmbed(extractMatches(withWhitespace), pluginDefaults),
				'<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
			);
		},
	);
	test(
		`${obj.type} with links and whitespace`,
		(t) => {
			let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
			t.is(
				buildEmbed(
					extractMatches(withLinksAndWhitespace),
					pluginDefaults,
				),
				'<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed"style="position:relative;width:100%;padding-top: 56.25%;"><iframe style="position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;" width="100%" height="100%" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
			);
		},
	);
});