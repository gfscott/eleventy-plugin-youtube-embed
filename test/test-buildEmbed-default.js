const test = require("ava");
const {pluginDefaults} = require("../lib/pluginDefaults.js");
const buildEmbed = require("../lib/buildEmbed.js");
const extractMatches = require("../lib/extractMatches.js");
const validStrings = require("./inc/validStrings.js");
const expectedOutputs = require("./inc/expectedOutputs.js");

/**
 * Test valid input strings with default output settings
 */

for (const valid of validStrings) {
	for (const expected of expectedOutputs) {
		test(
			`${valid.type} ideal case, ${expected.name}`,
			(t) => {
				let idealCase = `<p>${valid.str}</p>`;
				t.is(
					buildEmbed(extractMatches(idealCase), buildOptions(expected.options)),
					expected.output,
				);
			},
		);
		test(
			`${valid.type} with links, ${expected.name}`,
			(t) => {
				let withLinks = `<p><a href="">${valid.str}</a></p>`;
				t.is(
					buildEmbed(extractMatches(withLinks), buildOptions(expected.options)),
					expected.output,
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
					buildEmbed(
						extractMatches(withWhitespace),
						buildOptions(expected.options),
					),
					expected.output,
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
					buildEmbed(
						extractMatches(withLinksAndWhitespace),
						buildOptions(expected.options),
					),
					expected.output,
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
