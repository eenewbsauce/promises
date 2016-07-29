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
        resolve("resolved");
      }, 5);  
    });

    p
      .then(res => {
        expect(res).to.equal("resolved");
        done();
      })
      .catch(err => {
      });
  });  
  
  it('should have have a catch method and reject() should route to it', (done) => {
    var p = new P((resolve, reject) => {
      setTimeout(() => {
        reject("rejected");
      }, 5);  
    });

    p
      .then(res => {
      })
      .catch(err => {
        expect(err).to.equal("rejected");
        done();
      });
  });  
  
  it('should have have a then method that takes resolve/reject callbacks and routes correctly', (done) => {
    var pRes = new P((resolve, reject) => {
      setTimeout(() => {
        resolve("resolved");
      }, 5);  
    });
    
    var pRej = new P((resolve, reject) => {
      setTimeout(() => {
        reject("rejected");
      }, 5);  
    });

    pRes
      .then(res => {
        expect(res).to.equal("resolved");
      }, err => {
      }) 
      
    pRej
      .then(res => {
      }, err => {
        expect(err).to.equal("rejected");
      }) 
      
    setTimeout(() => {
      done();
    }, 10)
  });  
});

