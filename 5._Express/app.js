const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    // console.log('welcome to express');
    // res.send('welcome to express');
    // res.send('<h1>welcome to express</h1>');
    // res.sendFile(__dirname + '/index.html');

    // res.json({
    //     name: 'welcome to API'
    // })

    res.json({
        result: true,
        msg: 'Fetch successfully',
        data: [
            { id: 1, name: 'Tommy' },
            { id: 2, name: 'Jerry' }
        ]
    })
})

app.get('/contact', (req, res) => {
    console.log('welcome to contact');
})

app.listen(3000, () => {
    console.log('sever running on port 3000');
})
