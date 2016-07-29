function Es6Promise(cb) {
  var _thenCb = function(res) {
    resolveObj.isResolved = true;
    resolveObj.data = res;
    resolveObj.cb(res);
  }
  
  var _catchCb = function(err) {
    rejectObj.isRejected = true;
    rejectObj.err = err;
    rejectObj.cb(err);
  }
  
  var _catchCb;
  
  cb = cb.bind(this, _thenCb, _catchCb);
  
  var resolveObj = {
    isResolved: false,
    data: {}
  };
  
  var rejectObj = {
    isRejected: false,
    err: {}
  }
    
  function thenFn(thenCb) {
    if (resolveObj.isResolved) {
      resolveObj.cb(resolveObj.data);
    } 
    else {
      resolveObj.cb = thenCb;  
      return this;          
    }
  } 
  
  function catchFn(catchCb) {
    if (rejectObj.isRejected) {
      rejectObj.cb(rejectObj.err);
    } else {
      rejectObj.cb = catchCb;  
      return this;          
    }
  }  
  
  function finallyFn(finallyCb) {
    
  }
  
  cb();
  
  return {
    then: thenFn,
    catch: catchFn,
    finally: finallyFn
  };
}

module.exports = Es6Promise;
