const path = require('path');
const FS = require('q-io/fs');
const HTTP = require('q-io/http');

const downloadZachala = gid => {
	const url = 'https://docs.google.com/spreadsheets/d/1Yoe2DqqBR3RMxJwhltTxDmAK9eRB6s-v_lyDTSHD0DY/pub?hl=en&hl=en&single=true&output=csv&gid=' + gid;
	return HTTP.read(url)
		.then(body => FS.write(path.join('cache', gid + '.csv'), body))
		.catch(error => console.log(error))
		.then(value => value);
};

const readZachala = gid => FS.read(path.join('cache', gid + '.csv')).catch(() => downloadZachala(gid));

var zachala = {};

const zachalaPromise = Promise.all([readZachala('3'), readZachala('18')])
	.then(value => {
		value.map(j => {
			j.split('\r\n').map(i => {
				const match = i.match(/(\w+),(.+)/);
				if (match && typeof match[2] !== 'undefined') {
					zachala[match[1]] = match[2];
				}
			});
		});
	})
	.then(() => zachala)
	.catch(e => console.log(e));

module.exports = zachalaPromise
	.then(zachala => {
		return z => {
			z = z.replace(' (от полу́)', '').replace(/\*/g, '');
			var result = null;
			Object.keys(zachala).forEach(function (key) {
				if (zachala[key].indexOf(z) !== -1) {
					result = key;
				}
			});
			return result;
		};
	})
	.catch(e => console.log(e));
