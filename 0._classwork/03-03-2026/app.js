// let cola = 25;
// let qty = 6;

// let calculate = cola * qty

// let diplay = () => {
//     console.log('Products total');
//     console.log(calculate,'$');
// }

// diplay()

let {
    Sum
} = require('./sum.js')
let {
    minus
} = require('./minus.js')

console.log('sum is  : ', Sum(20, 50));

console.log('minus is:', minus(50, 10));

