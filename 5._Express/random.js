const _ = require('lodash');

let interval = setInterval(() => {
    let count = _.random(1, 10)
    console.log(count);
    if(count == 10) {
        clearInterval(interval);
        // process.exit(0)
    }
}, 200);
