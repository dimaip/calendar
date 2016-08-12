const chai = require('chai');
const expect = chai.expect;
const zachala = require('./zachala.js');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('zachala matcher', () => {
	it('handles standard zachala', function (done) {
		const s = 'Мф., 34 зач. (от полу́), X, 1-8**.';
		return zachala.then(i => {
			return expect(i(s)).to.equal('Mt34b');
		}).then(() => done(), e => done(e));
	});
});
