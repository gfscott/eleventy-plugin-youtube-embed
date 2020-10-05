const test = require("ava");
const patternPresent = require("../lib/spotPattern.js");
const validStrings = require("./inc/validStrings.js");
const invalidStrings = require("./inc/invalidStrings.js");

/**
 * =================================
 * STANDARD TESTS: Valid URL strings
 * ---------------------------------
 */
validStrings.forEach(function(obj) {
	/**
   * TEST: Recognizes valid strings wrapped in paragraph tags
   */
	test(
		`${obj.type} ideal case`,
		(t) => {
			let idealCase = `<p>${obj.str}</p>`;
			t.truthy(patternPresent(idealCase));
		},
	);

	/**
   * TEST: Recognizes valid strings wrapped in paragraph tags, with
   * additional whitespace
   */
	test(
		`${obj.type} with whitespace`,
		(t) => {
			let withWhitespace = `<p>
        ${obj.str}
      </p>`;
			t.truthy(patternPresent(withWhitespace));
		},
	);

	/**
   * TEST: Recognizes valid strings wrapped in paragraph and anchor tags
   */
	test(
		`${obj.type} with links`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			t.truthy(patternPresent(withLinks));
		},
	);

	/**
   * TEST: Recognizes valid strings wrapped in paragraph and anchor tags,
   * with additional whitespace
   */
	test(
		`${obj.type} with links and whitespace`,
		(t) => {
			let withLinksAndWhitespace = `<p>
        <a href="">
          ${obj.str}
        </a>
      </p>`;
			t.truthy(patternPresent(withLinksAndWhitespace));
		},
	);

	/**
   * =====================================================
   * APPENDED TEXT TESTS: Valid strings with appended text
   * -----------------------------------------------------
   */

	/**
   * TEST: Recognizes valid strings with appended option text
   */
	test(
		`${obj.type} ideal case, appended option text`,
		(t) => {
			let idealCase = `<p>${obj.str} 4:3 cc autoplay</p>`;
			t.truthy(patternPresent(idealCase));
		},
	);

	/**
   * TEST: Recognizes valid strings wrapped in paragraph tags, with
   * additional whitespace and appended option text
   */
	test(
		`${obj.type} with whitespace, appended option text`,
		(t) => {
			let withWhitespace = `<p>
      ${obj.str} 4:3 cc 
      autoplay
    </p>`;
			t.truthy(patternPresent(withWhitespace));
		},
	);

	/**
   * TEST: Recognizes valid strings wrapped in paragraph and anchor tags,
   * with appended option text
   */
	test(
		`${obj.type} with links, with appended option text`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a> 4:3 cc auto</p>`;
			t.truthy(patternPresent(withLinks));
		},
	);

	/**
   * TEST: Recognizes valid strings wrapped in paragraph and anchor tags,
   * with additional whitespace, with appended text
   */
	test(
		`${obj.type} with links and whitespace, with appended text`,
		(t) => {
			let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a> cc auto
      16:9
    </p>`;
			t.truthy(patternPresent(withLinksAndWhitespace));
		},
	);
}); // end forEach

/**
 * ===============================
 * NEGATIVE TESTS: Invalid strings
 * -------------------------------
 */

/**
 * TEST: Fails invalid URL patterns
 */
invalidStrings.forEach(function(obj) {
	test(
		`${obj.type} ideal case with prepended text`,
		(t) => {
			let idealCase = `<p>${obj.str}</p>`;
			t.falsy(patternPresent(idealCase));
		},
	);
});

/**
 * TEST: Fails valid URL patterns, but with prepended text
 */
validStrings.forEach(function(obj) {
	test(
		`${obj.type} ideal case with prepended text`,
		(t) => {
			let idealCase = `<p>Foo bar baz ${obj.str}</p>`;
			t.falsy(patternPresent(idealCase));
		},
	);
});
