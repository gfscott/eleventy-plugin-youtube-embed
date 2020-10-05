const test = require("ava");
const patternPresent = require("../lib/spotPattern.js");
const extractMatches = require("../lib/extractMatches.js");
const validStrings = require("./inc/validStrings.js");

/**
 * ===========================================
 * STANDARD TESTS: No inline options specified
 * -------------------------------------------
 */

let expectInlineOptionsTrue = {
	id: "hIs5StN8J-0",
	options: {
		aspectRatio: "4:3",
		autoplay: true,
		closedCaptions: true,
	},
};
let expectInlineOptionsFalse = {
	id: "hIs5StN8J-0",
	options: {},
};

validStrings.forEach(function(obj) {
	/**
   * TEST: Recognizes valid strings wrapped in paragraph tags
   */
	test(
		`${obj.type} ideal case`,
		(t) => {
			let idealCase = `<p>${obj.str}</p>`;
			t.deepEqual(
				extractMatches(patternPresent(idealCase)),
				expectInlineOptionsFalse,
			);
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
			t.deepEqual(
				extractMatches(patternPresent(withWhitespace)),
				expectInlineOptionsFalse,
			);
		},
	);

	/**
   * TEST: Recognizes valid strings wrapped in paragraph and anchor tags
   */
	test(
		`${obj.type} with links`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a></p>`;
			t.deepEqual(
				extractMatches(patternPresent(withLinks)),
				expectInlineOptionsFalse,
			);
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
			t.deepEqual(
				extractMatches(patternPresent(withLinksAndWhitespace)),
				expectInlineOptionsFalse,
			);
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
			t.deepEqual(
				extractMatches(patternPresent(idealCase)),
				expectInlineOptionsTrue,
			);
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
			t.deepEqual(
				extractMatches(patternPresent(withWhitespace)),
				expectInlineOptionsTrue,
			);
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
			t.deepEqual(
				extractMatches(patternPresent(withLinks)),
				expectInlineOptionsTrue,
			);
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
      4:3
    </p>`;
			t.deepEqual(
				extractMatches(patternPresent(withLinksAndWhitespace)),
				expectInlineOptionsTrue,
			);
		},
	);

	/**
   * =====================================================================
   * INVALID APPENDED TEXT TESTS: Valid strings with invalid appended text
   * ---------------------------------------------------------------------
   */

	/**
   * TEST: Recognizes valid strings with appended option text
   */
	test(
		`${obj.type} ideal case, appended invalid option text`,
		(t) => {
			let idealCase = `<p>${obj.str} foo bar (654 &&9)</p>`;
			t.deepEqual(
				extractMatches(patternPresent(idealCase)),
				expectInlineOptionsFalse,
			);
		},
	);

	/**
   * TEST: Recognizes valid strings wrapped in paragraph tags, with
   * additional whitespace and appended option text
   */
	test(
		`${obj.type} with whitespace, appended invalid option text`,
		(t) => {
			let withWhitespace = `<p>
			${obj.str}  foo bar
			(654 &&9)
    </p>`;
			t.deepEqual(
				extractMatches(patternPresent(withWhitespace)),
				expectInlineOptionsFalse,
			);
		},
	);

	/**
   * TEST: Recognizes valid strings wrapped in paragraph and anchor tags,
   * with appended option text
   */
	test(
		`${obj.type} with links, with appended invalid option text`,
		(t) => {
			let withLinks = `<p><a href="">${obj.str}</a>  foo bar (654 &&9)</p>`;
			t.deepEqual(
				extractMatches(patternPresent(withLinks)),
				expectInlineOptionsFalse,
			);
		},
	);

	/**
   * TEST: Recognizes valid strings wrapped in paragraph and anchor tags,
   * with additional whitespace, with appended text
   */
	test(
		`${obj.type} with links and whitespace, with appended invalid text`,
		(t) => {
			let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
			</a>  foo bar
			(654 &&9)
    </p>`;
			t.deepEqual(
				extractMatches(patternPresent(withLinksAndWhitespace)),
				expectInlineOptionsFalse,
			);
		},
	);
}); // end forEach
