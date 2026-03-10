const express = require('express');
const morgan = require('morgan')

const app = express();

// app.use((req, res, next) => {
//     console.log('===================');
//     console.log('====New Request====');
//     console.log('===================');
//     console.log('URL    :', req.url);
//     console.log('host   :', req.hostname);
//     console.log('path   :', req.path);
//     console.log('method :', req.method);
//     next();
// }); 

// app.use(morgan('tiny'));

// app.use((req, res, next) => {
//     let isAuth = true;

//     if (isAuth) {
//         next()
//     } else {
//         res.json({
//             msg: 'You need to login!'
//         })
//     }
// });

// function isAuth(req, res, next){
//     let isAuth = false;

//     if (isAuth){
//         next();
//     }else{
//         res.json({
//             msg: 'You need to login!'
//         })
//     }
// }

//practice======================================//
let count = 0;

app.use((req, res, next) => {

    count++;
    if (count <= 3) {
        next();
    } else {
        res.json({
            msg: 'your ip is blocked!'
        })
    }
});

//============================================//

app.get('/', (req, res) => {
    res.json({
        name: 'This is homepage'
    })
});

app.get('/home', (req, res) => {
    res.json({
        name: 'This is homepage'
    })
});

app.get('/contact', (req, res) => {
    res.json({
        name: 'This is contactpage'
    })
});

app.listen(3000, () => console.log('Server running on port 3000'));