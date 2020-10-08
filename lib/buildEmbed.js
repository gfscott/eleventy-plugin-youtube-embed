/** 
 * buildEmbed.js
 * =============
 * Build the string of HTML that will replace the URL.
 * 
 */

const {liteDefaults} = require("./pluginDefaults.js");

module.exports = function(media, globalOptions, index) {
	let output;
	if (globalOptions.lite) {
		output = liteEmbed(media, globalOptions, index);
	} else {
		output = defaultEmbed(media, globalOptions);
	}
	return output;
};

/**
 * liteEmbed
 * ---------
 * @param {Object} media 
 * @param {Object} globalOptions 
 * @param {Int} index 
 * 
 * Takes a media object with video details, a globa user-defined options
 * object, and an index integer that determines whether there are multiple
 * embeds on the page. Returns a string of HTML with the final embed code.
 */
function liteEmbed(media, globalOptions, index) {
	let liteOptions = liteConfig(globalOptions, liteDefaults);
	let out = "";
	// only include css and js once per html file
	if (index === 0) {
		out += `<link rel="stylesheet" href="${liteOptions.css.path}">`;
		out += `<script defer="defer" src="${liteOptions.js.path}"></script>`;
	}
	out += `<div id="${media.id}" class="${globalOptions.embedClass}">`;
	out += `<lite-youtube videoid="${media.id}" style="background-image: url('https://i.ytimg.com/vi/${media.id}/hqdefault.jpg');">`;
	out += `<div class="lty-playbtn"></div>`;
	out += "</lite-youtube>";
	out += "</div>";
	return out;
}

/**
 * defaultEmbed
 * ------------
 * @param {Object} media 
 * @param {Object} globalOptions 
 * 
 * Takes a media object with video details and a global user-defined options
 * object. Returns a string of HTML with the final embed code.
 */
function defaultEmbed(media, globalOptions) {
	const options = inlineOverride(globalOptions, media.options);

	let out = `<div id="${media.id}" class="${options.embedClass}"`;
	out += ` style="position: relative; width: ${options.width}; padding-top: ${buildAspectRatio(
		options.aspectRatio,
	)};">`;
	out += '<iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;"';
	out += ' frameborder="0" title="Embedded YouTube video"';
	out += ` src="https://www.${buildDomain(options)}.com/embed/${media.id}${buildIframeSrcParams(
		options,
	)}"`;
	out += ` allow="${options.allowAttrs}"`;
	out += options.allowFullscreen ? " allowfullscreen" : "";
	out += options.lazy ? ' loading="lazy"' : "";
	out += "></iframe></div>";
	return out;
}

/**
 * liteConfig 
 * ----------
 * @param {Object} globalOptions 
 * @param {Object} liteOptions 
 * 
 * Takes two options objects: user-defined global options and the lite 
 * embed default options. Returns an options object with the lite defaults
 * or any custom options the user has substituted.
 */
function liteConfig(globalOptions, liteOptions) {
	if (globalOptions.lite && typeof globalOptions.lite === "boolean") {
		return liteOptions;
	} else {
		return Object.assign({}, liteOptions, globalOptions.lite);
	}
}

/**
 * inlineOverride
 * --------------
 * 
 * @param {object} globalOptions -- User-defined global plugin options
 * @param {object} inlineOptions -- per-embed options returned by ./extractMatches.js
 * 
 * Takes two option objects: user-defined global options, and user-defined
 * inline options, parsed by extractMatches.js. `inlineOptions`can be an empty
 * object, in which case no assignment is made.
 * 
 * Returns an object with local options for the single relevant embed instance.
 */
function inlineOverride(globalOptions, inlineOptions) {
	return Object.assign({}, globalOptions, inlineOptions);
}

/**
 * buildAspectRatio
 * ----------------
 * @param {String} str 
 * 
 * Takes a string representing an aspect ratio (example: 16:9) and returns
 * a percentage value used to control the height of the embedded player.
 * 
 * NOTE: It uses the Number/toFixed trick to max out at 5 decimal places,
 * truncating any trailing zeroes: https://stackoverflow.com/a/19623253
 */
function buildAspectRatio(str) {
	let [, w, h] = str.match(/([\d.]+):(\d+)/);
	return `${Number((h / w * 100).toFixed(5))}%`;
}

/**
 * buildDomain
 * -----------
 * @param {Object} obj 
 * 
 * Takes the local options object and returns the proper domain,
 * based on the noCookie setting.
 */
function buildDomain(obj) {
	return obj.noCookie ? "youtube-nocookie" : "youtube";
}

/**
 * buildIframeSrcParams
 * --------------------
 * @param {Object} obj 
 * 
 * Takes the local options object and returns a URL param string that is 
 * appended to the embed iframe `src`.
 * 
 * NOTE: It uses the spread operator to conditionally build the array of options:
 * https://2ality.com/2017/04/conditional-literal-entries.html
 */
function buildIframeSrcParams(obj) {
	let params = [
		...(obj.autoplay ? ["autoplay=1"] : []),
		...(obj.closedCaptions ? ["cc_load_policy=1"] : []),
	];
	return params.length > 0 ? `?${params.join("&amp;")}` : "";
}
