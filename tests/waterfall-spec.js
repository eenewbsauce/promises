var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var waterfall = require('../waterfall');

describe('waterfall', function() {
	it ('should return a promise', function() {
		let wfOutput = waterfall();

		expect(wfOutput).to.be.a('Promise');
		expect(wfOutput.then).to.be.a('function');
	}); 
});
