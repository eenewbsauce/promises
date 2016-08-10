function Es6Promise(cb) {
  var _thenCb = function(res) {
    resolveObj.isResolved = true;
    resolveObj.data = res;
    thenFn();
  }
  
  var _catchCb = function(err) {
    rejectObj.isRejected = true;
    rejectObj.err = err;
    catchFn();
  }
  
  var resolveObj = {
    isResolved: false,
    data: {},
    cbs: []
  };
  
  var rejectObj = {
    isRejected: false,
    err: {},
    cbs: []
  }
    
  function thenFn(thenCb, catchCb) {
    if (resolveObj.isResolved) {
      resolveObj.cbs.map(function(cb){
        cb(resolveObj.data)
      });
    } else if (rejectObj.isRejected) {
      rejectObj.cbs.map(function(cb){
        cb(rejectObj.err);
      });      
    } else {
        if (thenCb) {
          resolveObj.cbs.push(thenCb);                
        }
        if (catchCb) {
          rejectObj.cbs.push(catchCb);                    
        }
      return this;          
    }
  } 
  
  function catchFn(catchCb) {
    if (rejectObj.isRejected) {
      rejectObj.cbs.map(function(cb){
        cb(rejectObj.err)
      });
    } else {
      rejectObj.cbs.push(catchCb);  
      return this;          
    }
  }  
  
  cb.bind(this, _thenCb, _catchCb)();
  
  return {
    then: thenFn,
    catch: catchFn
  };
}

module.exports = Es6Promise;
