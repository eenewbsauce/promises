var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var waterfall = require('../waterfall');

before

describe('waterfall', function() {
	it ('should return a promise', () => {
		let wfOutput = waterfall([]);

		expect(wfOutput).to.be.a('Promise');
		expect(wfOutput.then).to.be.a('function');
	}); 

	it ('should return the last promise value', (done) => {
		waterfall(getPromises()).then(res => {
			expect(res).to.equal(3);
			done();
		}).catch(err => {
			done(err);
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
	
	it('should pipe the previous result to the current then()', (done) => {
		let promises = getPromises();
		promises[2] = generatePromiseAndCheckForPreviousResult.bind(done);
		
		waterfall(promises);
	});
	
	it('should handle a shit load of promises', function(done) {
		this.timeout(3000);
		let numberOfPromises = 1000;
		let promises = [];
		
		for(let i = 0; i < numberOfPromises; i++) {
			promises.push(generatePromise.bind(null, i, 2));
		}
		
		waterfall(promises).then(() => {
			done();
		});
	});
});

function getPromises() {
	return [{res: 1, to: 100}, {res: 99,  to: 50}, {res: 3, to: 150}].map(item => {
		return generatePromise.bind(null, item.res, item.to);
	});
}

function generatePromise(resolveValue = 1, timeout = 100) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(resolveValue)
		}, timeout);
	});
}

function generatePromiseAndCheckForPreviousResult(resolveValue = 1, timeout = 100) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(resolveValue)
		}, timeout);
	}).then(res => {
		expect(res).to.equal(99);
		this();
	});
}
