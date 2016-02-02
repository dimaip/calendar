const path = require('path');
const request = require('request');
const FS = require('q-io/fs');

module.exports = (dateString) => {
	const url = 'http://www.patriarchia.ru/rpc/date=' + dateString + '/kld.xml';
	console.log(dateString);
	request({
		uri: url
	}, function (error, response, body) {
		FS.write(path.join('raw', dateString), body).then(() => console.log('OK'), error => console.log(error));
	});
};
