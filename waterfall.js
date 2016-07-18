let p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('p1 resolved');
		resolve(1);
	}, 300);
});

let p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('p2 resolved');
		resolve(2);
	}, 600);
});

let p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('p3 resolved');
		resolve(3);
	}, 900);
});

let promiseArr = [p1, p2, p3];

module.exports = function waterfall(promises) {
	return new Promise((resolve, reject) => {
		let pIndex = 0;
		let resolvedPromises = 0;
		let result = 0;
		let interval;

		function waterfallInside() {	
			if (pIndex < promises.length) {
				promises[pIndex].then(res => {
					++resolvedPromises;
					result += res;	

					if (resolvedPromises === promises.length) {
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

setTimeout(() => {
	console.log('priority 1')
}, 0);

setTimeout(() => {
	console.log('priority 2')
}, 298);


setTimeout(() => {
	console.log('priority 3')
}, 301);

// waterfall(promiseArr).then(result => {
// 	console.log(result);
// }).catch(err => {
// 	console.log(err);
// });

