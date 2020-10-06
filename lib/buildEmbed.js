module.exports = function(media, globalOptions, index) {
	let output;
	if (globalOptions.lite) {
		output = liteEmbed(media, globalOptions, index);
	} else {
		output = defaultEmbed(media, globalOptions);
	}
	return output;
};

function liteEmbed(media, globalOptions, index) {
	let liteOptions = liteConfig(globalOptions);
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

function defaultEmbed(media, globalOptions) {
	const options = inlineOverride(globalOptions, media.options);

	let out = `<div id="${media.id}" class="${options.embedClass}"`;
	out += ` style="position: relative; width: ${options.width}; padding-top: ${buildAspectRatio(options.aspectRatio)};">`;
	out += '<iframe style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;"';
	out += ' frameborder="0" title="Embedded YouTube video"';
	out += ' src="https://www.';
	out += options.noCookie ? "youtube-nocookie" : "youtube";
	out += ".com/embed/";
	out += media.id;

	// autoplay is _technically_ possible, but be cool, don't do this
	out += options.autoplay ? "?autoplay=1" : "";
	out += '" ';
	// configurable allow attributes
	out += `allow="${options.allowAttrs}"`;
	// configurable fullscreen capability
	out += options.allowFullscreen ? " allowfullscreen" : "";
	//configurable iframe lazy-loading
	out += options.lazy ? ' loading="lazy"' : "";
	out += "></iframe></div>";
	return out;
}

function liteConfig(options) {
	const {liteDefaults} = require("./pluginDefaults.js");
	if (options.lite && typeof options.lite === "boolean") {
		return liteDefaults;
	} else {
		return Object.assign({}, liteDefaults, options.lite);
	}
}

/**
 * inlineOverride
 * --------------
 * Override global options with inline options
 * 
 * @param {object} globalOptions -- User-defined global plugin options
 * @param {object} inlineOptions -- per-embed options returned by ./extractMatches.js
 * 
 * This function accepts two option objects: user-defined global options,
 * and user-defined inline options, parsed by extractMatches.js. `inlineOptions`
 * can be an empty object, in which case no assignment is made.
 */
function inlineOverride(globalOptions, inlineOptions) {
	return Object.assign({}, globalOptions, inlineOptions);
}

function buildAspectRatio(str) {
	let [, w, h ] = str.match(/(\d+):(\d+)/);
	return (h / w) * 100 + "%";
}

function buildIframeSrcParams(obj) {

}