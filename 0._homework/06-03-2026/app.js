const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    let url = req.url;
    let path = '';
    switch (url) {
        case '/': path = './index.html'
            res.statusCode = 200
            break;

        case '/home': path = './index.html'
            res.statusCode = 200
            break;

        case '/patient-file': path = './patientFile.html'
            res.statusCode = 200
            break;

        default: path = './404.html'
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) console.log(err);
        res.end(data);
    })
})

server.listen(3000, () => console.log('sever running on path 3000'))