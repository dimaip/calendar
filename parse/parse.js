'use strict';

const path = require('path');
const FS = require('q-io/fs');
const cheerio = require('cheerio');
const sanitizeHtml = require('sanitize-html');
const zachala = require('./zachala.js');

const parseSaints = html => {
	return sanitizeHtml(
		html.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>'),
		{
			allowedTags: ['div', 'a', 'strong']
		}
	).replace(/<div>/g, '<p>').replace(/<\/div>/g, '</p>');
};

const createReadingLinks = (reading, zachalaResolver) => {
	return reading.replace(/<a>(.*?)<\/a>/g, (match, linkBody) => {
		return '<a href="' + zachalaResolver(linkBody) + '">' + linkBody + '</a>';
	});
};

const parseReadingsByServiceType = (i, zachalaResolver) => {
	var readingByServiceObject = {};
	i.replace(/([^>]*\:)/g, '###$1').split('###').map(item => {
		const splitItem = item.split(':');
		if (splitItem.length > 1) {
			readingByServiceObject[splitItem[0].trim()] = createReadingLinks(splitItem[1].trim(), zachalaResolver);
		} else if (splitItem.length === 1 && splitItem[0].trim() !== '') {
			readingByServiceObject['Рядовое'] = createReadingLinks(splitItem[0].trim(), zachalaResolver);
		}
	});
	return readingByServiceObject;
};

const parseReadings = (html, zachalaResolver) => {
	var readingsObject = {};
	var readings = sanitizeHtml(
		html,
		{
			allowedTags: ['div', 'a', 'strong'],
			allowedAttributes: {}
		}
	);
	readings = readings.replace(/<div>.*<\/div>/g, '');
	var splitByServiceType = readings.replace(/((?:[^\x00-\x7F]{3}.\s-\s)|(?:На \d-м часе:)|(?:На веч\.))/g, '###$1').split('###');
	if (splitByServiceType.length > 1) {
		splitByServiceType.map(item => {
			if (item !== '') {
				const matches = item.match(/((?:[^\x00-\x7F]{3})|(?:На \d-м часе)|(?:На веч\.))(?:(?:\.\s-\s)|(?:\:\s))(.*)/);
				const serviceType = matches[1].replace('Утр', 'Утреня').replace('Лит', 'Литургия');
				readingsObject[serviceType] = parseReadingsByServiceType(matches[2], zachalaResolver);
			}
		});
	} else if (splitByServiceType.length === 1) {
		readingsObject['Литургия'] = parseReadingsByServiceType(splitByServiceType[0], zachalaResolver);
	}
	return readingsObject;
};

module.exports = (dateString) => {
	return zachala.then(zachalaResolver => {
		return FS.read(path.join('raw', dateString))
			.then(value => value.match(/<\!\[CDATA\[(.*)\]\]>/)[1])
			.catch(e => console.log('no CDATA found', e, dateString))
			.then(value => cheerio.load(value, {decodeEntities: false}))
			.then($ => {
				return {
					title: $('.sedm, .nedel').text(),
					readings: parseReadings($('.read').html(), zachalaResolver),
					saints: parseSaints($('<p/>').append($('.saints')).html()),
					comments: $('.comm').text(),
					movedIn: $('.moved_in').text(),
					movedOut: $('.moved_out').text(),
					fast: $('.fast').text(),
					feast: $('.feast').text()
				};
			})
			.then(value => JSON.stringify(value, null, 2))
			.then(value => FS.write(path.join('processed', dateString), value).catch(e => console.log('can\'t write', e, dateString)))
			.catch(e => console.log('global error', e, dateString));
	});
};

// kld_font
// kld_red
// calendar_red_day
// trapeza
