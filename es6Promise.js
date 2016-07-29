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
  
  cb = cb.bind(this, _thenCb, _catchCb);
  
  var resolveObj = {
    isResolved: false,
    data: {}
  };
  
  var rejectObj = {
    isRejected: false,
    err: {}
  }
    
  function thenFn(thenCb, catchCb) {
    if (resolveObj.isResolved) {
      resolveObj.cb(resolveObj.data);
    } else if (rejectObj.isRejected) {
      rejectObj.cb(rejectObj.err);      
    } else {
      resolveObj.cb = thenCb; 
      rejectObj.cb = catchCb; 
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
  
  cb();
  
  return {
    then: thenFn,
    catch: catchFn
  };
}

module.exports = Es6Promise;
