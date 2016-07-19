function waterfall(promises) {
	return new Promise((outerResolve, reject) => {
		let pIndex = 0;
		let resolvedPromises = 0;
		let pendingPromises = 0;
		let result = 0;
		let results = [];

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

// let promises = [generatePromise.bind(null, 1, 50), generatePromise.bind(null, 2, 55), generatePromise.bind(null, 3, 60)];

// function generatePromise(resolveValue = 1, timeout = 100) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve(resolveValue);
// 		}, timeout);
// 	});
// }

// return waterfall(promises).then(result => {
// 	console.log('final result: ' + result);
// });

module.exports = waterfall;
