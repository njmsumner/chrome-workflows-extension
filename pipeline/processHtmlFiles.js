// @ts-check

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const { removeBlankLines, extractText, prettifyMd, prettifyHtml, pageFromFile } = require('./utils');
const { exportPlain } = require('./exportMarkdown');
const { SITE_DIR, excludeFolders } = require('../app-cfg');

const siteDir = path.join(__dirname, SITE_DIR);

/**
 * Save all markdown content to a single file.
 * Excludes content from folders listed in excludeFolders.
 * @param {Array<{page: string, markdown: string}>} allMarkdown Array of markdown content objects to be saved.
 */
const saveAllContent = async (allMarkdown) => {
	allMarkdown.sort((a, b) => {
		const aIsHome = a.page === '/';
		const bIsHome = b.page === '/';
		const aIsSitemap = a.page === '/sitemap';
		const bIsSitemap = b.page === '/sitemap';

		if (aIsHome && !bIsHome) return -1;
		if (bIsHome && !aIsHome) return 1;
		if (aIsSitemap && !bIsSitemap) return bIsHome ? 1 : -1;
		if (bIsSitemap && !aIsSitemap) return aIsHome ? -1 : 1;

		return a.page.localeCompare(b.page);
	});

	let allMarkdownStr = allMarkdown
		// filter out anything in a folder listed in excludeFolders
		.filter((m) => !excludeFolders.some((folder) => m.page.includes(folder)))
		.map((m) => m.markdown)
		.join('\n\n---\n\n\n');

	// format the markdown - move to util
	allMarkdownStr = await prettifyMd(allMarkdownStr);

	const filePath = path.join(siteDir, 'all-site-content.md');
	fs.writeFileSync(filePath, allMarkdownStr);
};

const processHtmlFiles = async () => {
	let htmlFiles = listSiteFiles('.html');

	const allMarkdown = await Promise.all(htmlFiles.map((file) => processHtmlFile(file)));

	// save the md file
	saveAllContent(allMarkdown);

	console.log('Processed', htmlFiles.length, 'HTML files:');
};

/**
 * Process a single HTML file and convert it to markdown.
 * @param {string} file The path to the HTML file.
 * @returns {Promise<{page: string, markdown: string}>} An object containing the page URL and the generated markdown.
 */
const processHtmlFile = async (file) => {
	let html = fs.readFileSync(file, 'utf8');

	const title = extractText(html, ['title']);
	html = html.replace(/<!--.*?-->/g, '');
	html = removeBlankLines(html);

	const usePrettier = true;
	if (usePrettier) {
		html = await prettifyHtml(html, file, siteDir);
	}

	let markdown;
	const pagePath = pageFromFile(file, siteDir);
	// plugins/trello_card
	const sourceFile = path.join('./_input', pagePath + '.md');
	const sourceFileExists = fs.existsSync(sourceFile);

	if (sourceFileExists && !sourceFile.includes('integrations.md')) {
		// console.log(sourceFile);
		markdown = fs.readFileSync(sourceFile, 'utf8');
		const filePath = path.join(siteDir, pagePath);
		fs.writeFileSync(filePath + '/plain.md', markdown);
	} else {
		// console.log('Source file does not exist or is in integrations folder:', sourceFile);
		markdown = await exportPlain(pagePath, file, html, title);
	}

	fs.writeFileSync(file, html);

	return {
		page: pagePath,
		markdown,
	};
};

/**
 * Function to list HTML files in the _site folder
 * @param {string} extension The file extension to look for (e.g., '.html').
 * @returns {Array<string>} Array of file paths matching the extension.
 */
function listSiteFiles(extension) {
	/**
	 * @type {string[]}
	 */
	const htmlFiles = [];

	/**
	 * @param {string} dir
	 */
	function traverseDir(dir) {
		const files = fs.readdirSync(dir);

		files.forEach((file) => {
			const filePath = path.join(dir, file);
			const stat = fs.statSync(filePath);

			if (stat.isDirectory()) {
				traverseDir(filePath); // Recursively traverse subdirectories
			} else if (file.endsWith(extension)) {
				htmlFiles.push(filePath);
			}
		});
	}

	if (fs.existsSync(siteDir)) {
		traverseDir(siteDir);
	}

	return htmlFiles;
}

module.exports = { processHtmlFiles };
