const parseInlineOptions = require("./parseInlineOptions.js");
const pattern = /<p>(?:\s*)(?:<a(?:.*)>)?(?:\s*)(?:https?:\/\/)?(?:w{3}\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([A-Za-z0-9\-_]{11})(?:\S*)(?:\s*)(?:<\/a>)?(?:\s*)([\S\s]*)(?:\s*)<\/p>/i;

module.exports = function(str) {
	let [, id, inlineOptions] = pattern.exec(str);
	return {
		id,
		options: parseInlineOptions(inlineOptions),
	};
};
