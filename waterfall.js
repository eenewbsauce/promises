module.exports = function waterfall(promises) {
	return new Promise((resolve, reject) => {
		let pIndex = 0;
		let resolvedPromises = 0;
		let result = 0;
		let results = [];
		let interval;

		function waterfallInside() {	
			if (pIndex < promises.length) {
				promises[pIndex].then(res => {
					results.push(res);
					++resolvedPromises;
					result += res;	

					if (resolvedPromises === promises.length) {
						console.log(results);
						clearInterval(interval);
						resolve(result);
					}				
				});
			}				
			
			++pIndex;	
		}

		interval = setInterval(
			waterfallInside
		, 0);
	});
}