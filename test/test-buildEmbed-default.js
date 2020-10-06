const test = require("ava");
const {pluginDefaults} = require("../lib/pluginDefaults.js");
const buildEmbed = require("../lib/buildEmbed.js");
const extractMatches = require("../lib/extractMatches.js");
const validStrings = require("./inc/validStrings.js");

const expectedOutputs = [
	{
		name: 'default options',
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
		options: buildOptions(pluginDefaults),
	},
	{
		name: 'custom allow attributes',
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="custom allows" allowfullscreen></iframe></div>',
		options: buildOptions({ allowAttrs: "custom allows"}),
	},
	{
		name: 'custom aspect ratio',
		output: '<div id="hIs5StN8J-0" class="eleventy-plugin-youtube-embed" style="position: relative; width: 100%; padding-top: 75%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
		options: buildOptions({ aspectRatio: "4:3"}),
	},
	{
		name: 'custom class',
		output: '<div id="hIs5StN8J-0" class="custom" style="position: relative; width: 100%; padding-top: 56.25%;"><iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;" frameborder="0" title="Embedded YouTube video" src="https://www.youtube-nocookie.com/embed/hIs5StN8J-0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>',
		options: buildOptions({ embedClass: "custom"}),
	},
]

/**
 * Test valid input strings with default output settings
 */

for ( const valid of validStrings ) {
	for ( const expected of expectedOutputs ) {
		test(
			`${valid.type} ideal case, ${expected.name}`,
			(t) => {
				let idealCase = `<p>${valid.str}</p>`;
				t.is(
					buildEmbed(extractMatches(idealCase), expected.options),
					expected.output
				);
			},
		);
		test(
			`${valid.type} with links, ${expected.name}`,
			(t) => {
				let withLinks = `<p><a href="">${valid.str}</a></p>`;
				t.is(
					buildEmbed(extractMatches(withLinks), expected.options),
					expected.output
				);
			},
		);
		test(
			`${valid.type} with whitespace, ${expected.name}`,
			(t) => {
				let withWhitespace = `<p>
				${valid.str}
			</p>`;
				t.is(
					buildEmbed(extractMatches(withWhitespace), expected.options),
					expected.output
				);
			},
		);
		test(
			`${valid.type} with links and whitespace, ${expected.name}`,
			(t) => {
				let withLinksAndWhitespace = `<p>
				<a href="">
					${valid.str}
				</a>
			</p>`;
				t.is(
					buildEmbed(extractMatches(withLinksAndWhitespace), expected.options),
					expected.output
				);
			},
		);
	}
}


/**
 * Helper function: easier way to set options for testing
 * @param {Object} obj 
 */
function buildOptions(obj) {
	return Object.assign({}, pluginDefaults, obj);
}