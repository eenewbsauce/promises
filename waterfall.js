function waterfall(promises) {
	if (typeof promises === "undefined" || promises.constructor !== Array || promises.length < 1) {
		return Promise.reject(new Error('promises parameter must be an array'));
	}
	
	return new Promise((outerResolve, reject) => {
		promises.reverse();
				
		function handlePromise(pRes) {
			return promises.pop()(pRes).then(res => {		

				if (promises.length === 0) {
					outerResolve(res);
				} else {
					handlePromise(res);		
				}			
				
				return res;				
			})
			.catch(err => {
				reject(err);
			});
		}
		
		return handlePromise();
	});
}

module.exports = waterfall;
