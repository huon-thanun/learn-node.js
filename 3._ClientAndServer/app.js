// const http = require('http');

// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'text/html');
//     // res.setHeader('Content-Type', 'text/plain');
//     // res.setHeader('Content-Type', 'application/json');
//     // res.write('<h1>Hello node.js</h1>');
//     // res.end();

//     fs.readFile('./index.html', (err, data) => {
//         if (err) console.log(err);
//         res.write('<h4>hello js with node.js</h4>')
//         res.end(data)
//     })

//     // console.log(req.url, req.method);
//     // console.log('Welcome to node.js');

// })

// server.listen(3000, () => console.log('Server runing on port 3000'))

//router ===============================//
const http = require('http');

const fs = require('fs')

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    let url = req.url;
    let path = '';
    switch (url) {
        case '/': path = './index.html'
            // res.statusCode = 200;
            break;

        case '/contact': path = './contact.html'
            // res.statusCode = 200;
            break;

        default: path = './404.html'
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) console.log(err);
        res.end(data)
    })

})

server.listen(3000, () => console.log('Server runing on port 3000'))