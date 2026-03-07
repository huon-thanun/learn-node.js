const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let url = req.url;
    let data = '';
    switch (url) {
        case '/': {
            data = { 'flag': 'home' }
            res.statusCode = 200
            break
        }

        case '/home': {
            data = { 'flag': 'home' }
            res.statusCode = 200
            break
        }

        case '/labs': {
            data = { 'flag': 'labs' }
            res.statusCode = 200
            break
        }

        default: {
            data = { 'flag': '404' }
            res.statusCode = 404;
            break
        }
    }

    res.write(JSON.stringify(data,null,2), () => {})
    res.end
})

server.listen(3000, () => console.log('sever running on path 3000'))