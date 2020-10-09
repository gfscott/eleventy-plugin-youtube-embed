const test = require("ava");
const parseInlineOptions = require("../lib/parseInlineOptions.js");

test(
	"Return empty object if no matches found",
	(t) => {
		let str1 = "something like this";
		let str2 = " ";
		let expected = {};
		t.deepEqual(parseInlineOptions(str1), expected);
		t.deepEqual(parseInlineOptions(str2), expected);
	},
);

test(
	"Spot closed captions",
	(t) => {
		let str1 = "cc";
		let str2 = "CC";
		let expected = {
			closedCaptions: true,
		};
		t.deepEqual(parseInlineOptions(str1), expected);
		t.deepEqual(parseInlineOptions(str2), expected);
	},
);

test(
	"Spot aspect ratio",
	(t) => {
		let str = "4:3";
		let expected = {
			aspectRatio: "4:3",
		};
		t.deepEqual(parseInlineOptions(str), expected);
	},
);

test(
	"Spot aspect ratio with decimal antecedent (like Super Panavision)",
	(t) => {
		let str = "2.20:1";
		let expected = {
			aspectRatio: "2.20:1",
		};
		t.deepEqual(parseInlineOptions(str), expected);
	},
);

test(
	"Spot autoplay, full word",
	(t) => {
		let str = "autoplay";
		let expected = {
			autoplay: true,
		};
		t.deepEqual(parseInlineOptions(str), expected);
	},
);

test(
	"Spot autoplay, short form ('auto')",
	(t) => {
		let str = "auto";
		let expected = {
			autoplay: true,
		};
		t.deepEqual(parseInlineOptions(str), expected);
	},
);

/**
 * Test all possible permutations of order
 * This test is to prove compuationally that option *order* shouldn't matter
 * for parsing the string. It permutes all possible orders in which all the
 * inline options could appear and confirms they produce the same result.
 * What this test *doesn't* prove is that all possible _subsets_ will work.
 * I'm sure there's a better way to test this for 100% certainty but this
 * is what I could think of at the time ¯\_(ツ)_/¯
 */
const possibleOptions = ["4:3", "auto", "cc"];

// Function to find all possible permutations of an array of elements
// https://stackoverflow.com/a/20871714
function permutator(inputArr) {
	let result = [];
	function permute(arr, m = []) {
		if (arr.length === 0) {
			result.push(m);
		} else {
			for (let i = 0; i < arr.length; i++) {
				let curr = arr.slice();
				let next = curr.splice(i, 1);
				permute(curr.slice(), m.concat(next));
			}
		}
	}
	permute(inputArr);
	return result;
}

const allPossibleCombos = permutator(possibleOptions);
allPossibleCombos.forEach((combo, index) => {
	let str = combo.join(" ");
	test(
		`Spot combinations in every possible order, permutation ${index + 1}`,
		(t) => {
			let expected = {
				aspectRatio: "4:3",
				autoplay: true,
				closedCaptions: true,
			};
			t.deepEqual(parseInlineOptions(str), expected);
		},
	);
});
