var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var waterfall = require('../waterfall');

before

describe('waterfall', function() {
	it ('should return a promise', () => {
		let wfOutput = waterfall();

		expect(wfOutput).to.be.a('Promise');
		expect(wfOutput.then).to.be.a('function');
	}); 

	it ('should return the sum of all resolves', (done) => {
		waterfall(getPromises()).then(sum => {
			expect(sum).to.equal(6);
			done();
		});
	});

	it('should not be blocking', (done) => {
		let promises = getPromises();
		let resolvedPromise = false;

		promises.unshift(generatePromise().then(() => {
			resolvedPromise = true;
		}));

		setTimeout(() => {
			expect(resolvedPromise).to.be.false;
			done();
		}, 98);

		waterfall(promises).then(sum => {
			expect(sum).to.equal(6);
			done();
		});		
	});
});

function getPromises() {
	return [{res: 1, to: 100}, {res: 2,  to: 50}, {res: 3, to: 150}].map(item => {
		return generatePromise(item.res, item.to);
	});
}

function generatePromise(resolveValue = 1, timeout = 100) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(resolveValue)
		}, timeout);
	});
}
