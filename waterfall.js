function waterfall(promises) {
	return new Promise((outerResolve, reject) => {
		let pIndex = 0;

		function handlePromise(pIndex, pRes) {
			return promises[pIndex].call(null, pRes).then(res => {		
				pIndex++;
						
				if (pIndex === promises.length) {
					outerResolve(res);
				} else {
					handlePromise(pIndex, res);		
				}			
				
				return res;				
			});
		}
		
		return handlePromise(pIndex);
	});
}

module.exports = waterfall;
