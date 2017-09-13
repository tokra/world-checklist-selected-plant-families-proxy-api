const S = require('string');
const _s = require('underscore.string');

const messageFormat = (stringTemplate, ...replacements) =>
	replacements.reduce(
		(final, replacement, i) => final.replace(`{${i}}`, replacement),
		stringTemplate
	);

const isEmpty = string => S(string).isEmpty();
const isNotEmpty = string => !S(string).isEmpty();
const subStringAfter = (string, prefix) => S(string).chompLeft(prefix).s;
const subStringBefore = (string, sufix) => S(string).chompRight(string).s;
const map = (string, callback) => _s.map(string, callback);

module.exports = {
	messageFormat,
	isEmpty,
	isNotEmpty,
	subStringAfter,
	subStringBefore,
	map
};
