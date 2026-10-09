// @ts-check

const fs = require('fs');
const TurndownService = require('turndown');
const { removeElements, updateLinksEnd, updateLinksStart, prettifyMd, prettifyHtml, updateHtmlText, pageFromFile } = require('./utils.js');
const path = require('path');
const { SITE_DIR } = require('../app-cfg.js');
const markdownIt = require('markdown-it')();

const siteDir = path.join(__dirname, SITE_DIR);

const webUrl = ''; // 'https://www.nicksumner.co.uk'; // The base URL for the website no trailing slash

const navMarkdown = ``;

/**
 * @param {string} page
 * @param {string} file
 * @param {string} html
 * @param {string} title
 */
async function exportPlain(page, file, html, title) {
	// remove the nav element, title, and footer
	let htmlStripped = removeElements(html, ['title', 'footer', 'nav']);

	const navMd = navMarkdown.replace(/\(\//g, `(${webUrl}/`);
	htmlStripped = updateLinksStart(htmlStripped, webUrl);

	// convert html to markdown
	let markdown = markHtmlDown(htmlStripped);

	// remove lines with images or multiline links
	markdown = markdown
		.split('\n')
		.filter((line) => !line.startsWith('[]'))
		.filter((line) => !line.startsWith('[!'))
		.filter((line) => !line.startsWith('!['))
		.join('\n')
		.trim();

	// remove multiple line breaks in markdownWithHeader
	markdown = markdown.replace(/\n{3,}/g, '\n\n') + '\n';

	// add link to page and title
	const header = `Page: [${webUrl}${page}](${webUrl}${page})  \nTitle: ${title}\n`;
	let markdownWithHeader = `${header}\n${navMd}\n${markdown}`;

	// format the markdown
	markdownWithHeader = await prettifyMd(markdownWithHeader);

	// convert markdown to html
	let htmlPlain = markdownIt.render(markdownWithHeader);

	// update the title in the htmlPlain
	htmlPlain = updateHtmlText(htmlPlain, 'head', `<title>${title}</title>`);

	// update links in htmlPlain to add 'plain.htm' to the end
	htmlPlain = updateLinksEnd(htmlPlain, 'plain.htm');

	htmlPlain = await prettifyHtml(htmlPlain, file, siteDir);

	// write the markdown and html files
	const pagePath = pageFromFile(file, siteDir);
	const filePath = path.join(siteDir, pagePath);
	fs.writeFileSync(filePath + '/plain.md', markdown);
	// fs.writeFileSync(filePath + '/plain.htm', htmlPlain);

	// remove the nav element
	return `${header}\n\n${markdown}\n`;
}

/**
 * @param {string} html
 * @returns {string}
 */
function markHtmlDown(html) {
	const turndownService = new TurndownService({
		headingStyle: 'atx', // Use ATX headings (e.g., # Heading)
		codeBlockStyle: 'fenced', // Use fenced code blocks (e.g., ```code```)
	});
	turndownService.addRule('pre', {
		filter: 'pre',
		replacement: function (content) {
			return '```\n' + content + '\n```\n';
		},
	});
	let markdown = turndownService.turndown(html);
	return markdown;
}

exports.exportPlain = exportPlain;
