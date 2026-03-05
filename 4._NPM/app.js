const _ = require('lodash');

let arr = [1, 1, 2, 2, 2, 3, 3, 4, 5, 6];

// console.log(_.reverse(arr));
// console.log(_.uniq(arr).reverse(arr));
// console.log(_.chunk(arr, 3));
console.log(_.random(1, 10));
console.log(_.random(arr, 10));
console.log(_.random(arr[0], arr[9]));

