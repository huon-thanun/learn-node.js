



let {
    i,
    name,
    arr,
    testModle
} = require('./app')

console.log(i);
console.log(name);
testModle();

// for (let i = 1; i <= arr.length; i++) {
//     console.log(i);
// }

arr.forEach(element => {
    console.log(element);
});

//=============================//
// const app = require('./app');
// console.log(app.i);
// console.log(app.name);
// app.testModle();
