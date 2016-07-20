function waterfall(promises) {
	if (typeof promises === "undefined" || promises.constructor !== Array) {
		return Promise.reject(new Error('promises parameter must be an array'));
	}
	promises.reverse();
	
	return new Promise((outerResolve, reject) => {
		function handlePromise(pRes) {
			return promises.pop()(pRes).then(res => {		

				if (promises.length === 0) {
					outerResolve(res);
				} else {
					handlePromise(res);		
				}			
				
				return res;				
			});
		}
		
		return handlePromise();
	});
}

module.exports = waterfall;
