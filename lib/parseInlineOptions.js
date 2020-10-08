/**
 * Parse Inline Options
 * --------------------
 * Accept a string that may or may not contain specific substrings indicating
 * particular plugin settings.
 * Return an object containing correctly parsed settings.
 * 
 * @param {string} str 
 * 
 */

// Look for aspect ratio option: "4:3", "1:1", "16:9", etc. Any two
// numbers separated by a colon.
const aspectRatio = /\b([\d.]+):\d+\b/;

// Look for autoplay setting: "auto", "autoplay", case insensitive
const autoplay = /\bauto(play)?\b/i;

// Look for closed captioning option: "CC or "cc", case insensitive
const closedCaptions = /\bcc\b/i;

module.exports = function(str) {
	// Conditionally assign objects using spread operator
	// https://stackoverflow.com/a/51200448
	return {
		...(str.match(aspectRatio) && {aspectRatio: str.match(aspectRatio)[0]}),
		...(str.match(autoplay) && {autoplay: true}),
		...(str.match(closedCaptions) && {closedCaptions: true}),
	};
};
