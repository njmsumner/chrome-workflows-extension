function escapePluginWorkflowTokens(_data, content) {
	const inputPath = this.inputPath.replace(/\\/g, '/');
	if (!/(?:^|\/)_input\/plugins\//.test(inputPath)) {
		return;
	}

	return content.replace(/\{\{/g, '{% raw %}{{').replace(/\}\}/g, '}}{% endraw %}');
}

/**
 * Removes `.md` extensions from internal links, except for links to plain Markdown files.
 * External, protocol-relative, and fragment-only links are left unchanged.
 *
 * @param {string} content HTML content containing links to transform.
 * @returns {string} HTML content with extensions removed from eligible internal links.
 */
function removeMarkdownFromInternalLinks(content) {
	return content.replace(/(\bhref=["'])([^"']+)(["'])/gi, (match, prefix, url, suffix) => {
		if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url) || /(?:^|\/)plain\/.*\.md(?:[?#]|$)/i.test(url)) {
			return match;
		}

		return `${prefix}${url.replace(/\.md(?=([?#]|$))/i, '')}${suffix}`;
	});
}

export default async function eleventy(eleventyConfig) {
	// Configure Eleventy

	eleventyConfig.amendLibrary('md', (markdown) => {
		/**
		 * Adds URL-friendly IDs to Markdown headings based on their text.
		 * Punctuation is removed, text is lowercased, and whitespace becomes hyphens.
		 * Headings with no resulting text are left without an ID.
		 */
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

	// data
	eleventyConfig.addGlobalData('layout', 'base.njk');
	eleventyConfig.addGlobalData('now', () => {
		const date = new Date();
		return { date, year: date.getFullYear() };
	});

	// files
	// eleventyConfig.addPassthroughCopy({ '_input/**/*.md': 'plain' });
	eleventyConfig.addPassthroughCopy({ '_input/css': 'css' });
	eleventyConfig.addPassthroughCopy({ '_input/img': 'img' });
	eleventyConfig.addPassthroughCopy('src/js');

	// transforms
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
