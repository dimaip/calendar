const path = require('path');
const request = require('request');
const FS = require('q-io/fs');

module.exports = (dateString) => {
	const url = 'http://www.patriarchia.ru/rpc/date=' + dateString + '/kld.xml';
	console.log(dateString);
	request({
		uri: url
	}, function (error, response, body) {
		const filePath = path.join('raw', dateString);
		FS.exists(filePath).then(value => value ? console.log('file exists') : FS.write(filePath, body)).catch(error => console.log(error));
	});
};
