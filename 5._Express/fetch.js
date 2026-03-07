const express = require('express');
const axios = require('axios')

const app = express();

app.get('/', async (req, res) => {
    let results = await axios.get('https://jsonplaceholder.typicode.com/users')
    res.json({
        result: true,
        msg: 'Fetch successfully',
        data: results.data
    })
})

app.listen(3000, () => {
    console.log('sever running on port 3000');
})