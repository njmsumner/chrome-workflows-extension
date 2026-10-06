function removeMarkdownFromInternalLinks(content) {
	return content.replace(/(\bhref=["'])([^"']+)(["'])/gi, (match, prefix, url, suffix) => {
		if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) {
			return match;
		}

		return `${prefix}${url.replace(/\.md(?=([?#]|$))/i, '')}${suffix}`;
	});
}

export default async function eleventy(eleventyConfig) {
	// Configure Eleventy

	eleventyConfig.addGlobalData('layout', 'base.njk');
	eleventyConfig.addPassthroughCopy('src/assets');
	eleventyConfig.addPassthroughCopy({ '_input/css': 'css' });
	eleventyConfig.addPassthroughCopy('src/js');

	eleventyConfig.addTransform('html', removeMarkdownFromInternalLinks);

	return {
		dir: {
			input: '_input',
			output: '_site',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data',
		},
		templateFormats: ['html', 'njk', 'md'],
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
	};
}
