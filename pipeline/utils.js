// @ts-check

const fs = require('fs');
const prettier = require('prettier');
const path = require('path');
const cheerio = require('cheerio');

/**
 * @param {string} file
 * @param {string} siteDir
 */
function pageFromFile(file, siteDir) {
	return (
		file
			.replace(siteDir, '')
			.replace(/\\/g, '/')
			.replace(/\/index.html$/, '') || '/'
	);
}

/**
 * @param {string} contents
 * @returns {string}
 */
const trimLines = (contents) => {
	return contents
		.split('\n')
		.filter((line) => line.trim().length > 0)
		.map((line) => line.trim())
		.join('\n');
};

/**
 * @param {string} contents
 * @returns {string}
 */
const removeBlankLines = (contents) => {
	return contents
		.split('\n')
		.filter((line) => line.trim().length > 0)
		.join('\n');
};

/**
 * @param {string} contents
 * @returns {string}
 */
const getFirstLine = (contents) => {
	return contents.split('.')[0];
};

/**
 * @param {string} html
 * @param {string[]} tags
 * @returns {string}
 */
const extractText = (html, tags) => {
	const $ = cheerio.load(html);
	let selectors = tags.length ? tags : ['body'];
	const textRaw = selectors.map((tag) => $(tag).text()).join('\n');
	const text = trimLines(textRaw);
	return text;
};

/**
 * @param {string} html
 * @param {string[]} tags
 * @returns {string}
 */
const extractHtml = (html, tags) => {
	const $ = cheerio.load(html);
	let selectors = tags.length ? tags : ['body'];
	return selectors.map((tag) => $(tag).html()).join('\n');
};

/**
 * @param {string} html
 * @returns {string[]}
 */
const extractLinks = (html) => {
	const $ = cheerio.load(html);
	let selector = 'a';
	const links = $(selector)
		.map((i, el) => {
			return $(el).attr('href');
		})
		.get();

	return links;
};

/**
 * @param {string} html
 * @param {string} selector
 * @param {string} newText
 * @returns {string}
 */
function updateHtmlText(html, selector, newText) {
	const $ = cheerio.load(html);

	// Find the element using the provided selector
	const element = $(selector);

	if (element.length) {
		// Check if the element is a meta tag and update the content attribute
		if (element.is('meta')) {
			element.attr('content', newText);
		} else {
			// For other elements, update the text or html content
			element.html(newText);
		}

		return $.html(); // Return the modified HTML
	} else {
		// Element not found, return the original HTML
		console.warn(`Element with selector '${selector}' not found.`);
		return html;
	}
}

/**
 * @param {string} html
 * @param {string} selector
 * @returns {string}
 */
function removeElement(html, selector) {
	const $ = cheerio.load(html);

	// Find the element using the provided selector
	const element = $(selector);

	if (element.length) {
		// Remove the element from the HTML
		element.remove();

		return $.html(); // Return the modified HTML
	} else {
		// Element not found, return the original HTML
		console.warn(`Element with selector '${selector}' not found.`);
		return html;
	}
}

/**
 * @param {string} html
 * @param {string[]} selectors
 * @returns {string}
 */
function removeElements(html, selectors) {
	selectors.forEach((selector) => {
		html = removeElement(html, selector);
	});
	return html;
}

/**
 * @param {string} dirPath
 */
function emptyDir(dirPath) {
	const files = fs.readdirSync(dirPath);
	for (const file of files) {
		const filePath = path.join(dirPath, file);
		const stat = fs.lstatSync(filePath);
		if (stat.isDirectory()) {
			emptyDir(filePath);
			fs.rmdirSync(filePath);
		} else {
			fs.unlinkSync(filePath);
		}
	}
}

/**
 * @param {string} html
 * @param {string} pagePath
 * @returns {string}
 */
// update links in htmlPlain to add 'plain.htm' to the end
function updateLinksEnd(html, pagePath) {
	const $ = cheerio.load(html);
	$('a').each((i, el) => {
		const href = $(el).attr('href');
		if (href?.startsWith('/')) {
			const newHref = `${href}/${pagePath}`;
			$(el).attr('href', newHref.replace(/\/\//g, '/'));
		}
	});

	return $.html();
}

/**
 * @param {string} html
 * @param {string} domain
 * @returns {string}
 */
function updateLinksStart(html, domain) {
	const $ = cheerio.load(html);
	$('a').each((i, el) => {
		const href = $(el).attr('href');
		if (href?.startsWith('/')) {
			const newHref = `${domain}${href}`;
			$(el).attr('href', newHref);
		}
	});

	return $.html();
}

/**
 * @param {string} md
 * @returns {Promise<string>}
 */
async function prettifyMd(md) {
	const pretty = await prettier.format(md, {
		parser: 'markdown',
		proseWrap: 'never', // This will remove soft line breaks
		printWidth: 160, // Ignored if proseWrap is "never"
		tabWidth: 2,
		useTabs: false,
		endOfLine: 'lf', // Ensures consistent line endings
	});
	return pretty;
}

/**
 * @param {string} html
 * @param {string} fileName
 * @param {string} siteDir
 * @returns {Promise<string>}
 */
async function prettifyHtml(html, fileName, siteDir) {
	try {
		html = await prettier.format(html, {
			parser: 'html',
			htmlWhitespaceSensitivity: 'strict',
			printWidth: 160,
		});
	} catch (err) {
		const error = err instanceof Error ? err : new Error(String(err));
		const pagePath = pageFromFile(fileName, siteDir);
		// first line, + line number
		const errMessage = error.message;
		const errLine = /** @type {Error & { loc?: { start?: { line?: number } } }} */ (error).loc?.start?.line || 0;
		const msg = getFirstLine(errMessage);
		console.error('Prettier error:', pagePath + ':' + errLine, msg);
	}

	// update self-closing tags
	html = html.replace(/<([^>]+)\/>/g, '<$1>');
	// update end bracket at the start of a line to move it up to the end of previouis line
	html = html.replace(/\n\s*>/g, '>');

	return html;
}

module.exports = {
	emptyDir,
	extractHtml,
	extractLinks,
	extractText,
	getFirstLine,
	prettifyMd,
	prettifyHtml,
	removeBlankLines,
	removeElement,
	removeElements,
	trimLines,
	updateHtmlText,
	updateLinksEnd,
	updateLinksStart,
	pageFromFile,
};
