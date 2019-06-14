const config = require('config');
const _ = require('lodash');
const request = require('superagent');
const { load: cheerioLoad } = require('cheerio');
const beautify = require('js-beautify');
const StringUtils = require('../lib/stringUtils');

const serverUrl = config.get('serverUrl');
const url = config.get('apiUrl');

const htmlPrettify = uglyHtml => {
	const defaults = {
		unformatted: ['code', 'pre', 'em', 'strong', 'span'],
		indent_inner_html: true,
		indent_char: ' ',
		indent_size: 2,
		sep: '\n'
	};
	const prettyHtml = beautify.html(uglyHtml, defaults);
	return prettyHtml;
};

const doPostPlants = async plantName => {
	try {
		const result = await request
			.post(url)
			.type('form')
			.send(`plantName=${plantName}`)
			// .set('Accept-Encoding', 'gzip')
			.set('Cache-Control', 'no-cache')
			.timeout({
				response: 5000, // Wait 5 seconds for the server to start sending,
				deadline: 30000 // but allow 30sec minute for the file to finish loading.
			})
			.redirects(2);
		return result;
	} catch (err) {
		// console.log(err.message);
		throw err;
	}
};

const parseData = htmlString => {
	/* load html string as cheerio object */
	const $ = cheerioLoad(htmlString, {
		normalizeWhitespace: true,
		xmlMode: true
	});

	/*  data are under main id, and its in <a> tags */
	const data = $('#main')
		.find('a')
		.toArray();

	/* Parsing */
	const finalDataArray = data.reduce((final, element) => {
		const childElements = element.children.reduce((finalArray, actualElement) => {
			if (actualElement.type === 'text') {
				const elementText = actualElement.nodeValue.trim();
				finalArray.push(elementText);
			} else {
				const innerElementText = actualElement.children[0].nodeValue.trim();
				finalArray.push(innerElementText);
			}
			return finalArray;
		}, []);
		const jointOfElements = childElements.join(' ');
		const { href } = element.attribs;
		final.push({ name: jointOfElements, href });
		return final;
	}, []);

	/* Full URL mapping */
	const resultArray = finalDataArray.map(element => {
		let fullHref;
		if (_.endsWith(serverUrl, '/')) {
			fullHref = serverUrl + StringUtils.subStringAfter(element.href, '/');
		} else {
			fullHref = serverUrl + element.href;
		}
		return { plantName: element.name, moreDetails: fullHref };
	});

	return resultArray;
};

/**
 * This handle case like: Haworthia or Haworthia retusa
 * Does not work for: Astrophytum
 * @param {String} plantName
 */
const getPlants = async plantName => {
	try {
		const response = await Promise.resolve(doPostPlants(plantName));
		const { text: html } = response;
		const result = parseData(html);
		return result;
	} catch (e) {
		return { Error: e.message };
	}
};

module.exports = {
	getPlants
};
