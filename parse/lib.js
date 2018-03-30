'use strict';

module.exports.generateDatesArray = (dateStart, dateEnd) => {
	let dates = [];
	for (var date = dateStart; date.getTime() < dateEnd.getTime(); date = new Date(date.getTime() + (24 * 60 * 60 * 1000))) {
		dates.push(date);
	}
	return dates;
};