const http = require('http');
const fs = require('fs');

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    let url = req.url;
    let path = './doc/data.txt';

    switch (url) {
        case '/': {
            path;
            break;
        }
        case '/local-data': {
            path;
            break;
        }
        default: {
            res.write('<h1>404 - Page Not Found</h1>');
            res.end();
            return;
        }
    }

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) console.log(err);

        const parsed = JSON.parse(data);

        let listItems = '';
        parsed.forEach(item => {
            listItems += `<li>${item.id} - ${item.name} - ${item.username} - ${item.email} - ${item.address.city}</li>`;
        });

        console.log(listItems);
        

        const datas = `<ul>${listItems}</ul>`;

        res.write(datas);
        res.end();
    });
});

server.listen(3000, () => console.log('server running on port 3000'));