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
	"Spot autoplay, short form",
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
