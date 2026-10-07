function escapePluginWorkflowTokens(_data, content) {
	const inputPath = this.inputPath.replace(/\\/g, '/');
	if (!/(?:^|\/)_input\/plugins\//.test(inputPath)) {
		return;
	}

	return content.replace(/\{\{/g, '{% raw %}{{').replace(/\}\}/g, '}}{% endraw %}');
}

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

	eleventyConfig.amendLibrary('md', (markdown) => {
		markdown.renderer.rules.heading_open = (tokens, index, options, env, renderer) => {
			const heading = tokens[index + 1]?.content ?? '';
			const id = heading
				.toLowerCase()
				.replace(/[^\w\s-]/g, '')
				.trim()
				.replace(/\s+/g, '-');

			if (id) {
				tokens[index].attrSet('id', id);
			}

			return renderer.renderToken(tokens, index, options);
		};
	});

	eleventyConfig.addGlobalData('layout', 'base.njk');
	eleventyConfig.addPassthroughCopy('src/assets');
	eleventyConfig.addPassthroughCopy({ '_input/css': 'css' });
	eleventyConfig.addPassthroughCopy('src/js');

	eleventyConfig.addPreprocessor('escapePluginWorkflowTokens', 'md', escapePluginWorkflowTokens);
	eleventyConfig.addTransform('html', removeMarkdownFromInternalLinks);

	return {
		dir: {
			input: '_input',
			output: 'docs',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data',
		},
		templateFormats: ['html', 'njk', 'md'],
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		pathPrefix: '/chrome-workflows-extension/',
	};
}
