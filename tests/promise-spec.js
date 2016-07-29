var chai = require('chai');
require('chai-as-promised');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var P = require('../es6Promise');

describe('promise', () => {  
  it('should have have a then method and resolve() should route to it', (done) => {
    var p = new P((resolve, reject) => {
      setTimeout(() => {
        resolve("ryan");
      }, 5);  
    });

    p
      .then(res => {
        expect(res).to.equal("ryan");
        done();
      })
      .catch(err => {
      });
  });  
  
  it('should have have a catch method and reject() should route to it', (done) => {
    var p = new P((resolve, reject) => {
      setTimeout(() => {
        reject("ryan");
      }, 5);  
    });

    p
      .then(res => {
      })
      .catch(err => {
        expect(err).to.equal("ryan");
        done();
      });
  });  
});

