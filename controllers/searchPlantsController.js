const request = require('superagent');
const serverUrl = 'http://apps.kew.org/';
const url = 'http://wcsp.science.kew.org/qsearch.do';
const cheerio = require('cheerio');

const StringUtils = require('../lib/stringUtils');

/**
 * This handle case like: Haworthia retusa
 * Does not work for single: Astrophytum
 * @param {String} plantName 
 */
const getPlants = async plantName => {
	const response = await Promise.resolve(doPostPlants(plantName));
	const html = response.text;
	let $ = cheerio.load(html, {
		normalizeWhitespace: true,
		xmlMode: true
	});
	const dataHtml = $('.field__item').html();
	const new$ = cheerio.load(dataHtml);
	const data = new$('a');
	const dataArray = Object.keys(data).reduce((array, key, index) => {
		const value = data[key];
		if (isNaN(parseInt(key))) {
			return array;
		}
		array.push(value);
		return array;
	}, []);
	const finalDataArray = dataArray.reduce((final, p) => {
		const childElements = p.children.reduce((finalArray, actualElement) => {
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
		const href = p.attribs.href;
		final.push({ name: jointOfElements, href });
		return final;
	}, []);
	const resultArray = finalDataArray.map((element, index) => {
		const fullHref = serverUrl + StringUtils.subStringAfter(element.href, '/');
		return { plantName: element.name, moreDetails: fullHref };
	});
	return resultArray;
};

const doPostPlants = async plantName => {
	return await request
		.post(url)
		.type('form')
		.send(`plantName=${plantName}`)
		//.set('Accept-Encoding', 'gzip')
		.set('Cache-Control', 'no-cache')
		.timeout({
			response: 5000, // Wait 5 seconds for the server to start sending,
			deadline: 30000 // but allow 30sec minute for the file to finish loading.
		})
		.redirects(2);
};

module.exports = {
	getPlants
};
