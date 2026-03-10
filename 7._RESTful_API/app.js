const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

let products = [
    { id: 1, name: 'cola', category: 'drinks', description: 'Testing' },
    { id: 2, name: 'cola', category: 'drinks', description: 'Testing' },
    { id: 3, name: 'cola', category: 'drinks', description: 'Testing' },
    { id: 4, name: 'cola', category: 'drinks', description: 'Testing' },
]

app.get("/products", (req, res) => {
    // res.json([
    //     {
    //         "id": 1,
    //         "title": "Tech News"
    //     },
    //     {
    //         "id": 2,
    //         "title": "don't know"
    //     }
    // ]);

    res.json({
        result: true,
        msg: 'Get all products successfully!',
        data: products
    })
});

app.post('/products', (req, res) => {
    // console.log(req.body);

    products.push(req.body)
    res.json({
        result: true,
        msg: 'Create product successfully!',
    })

});

app.delete('/products/:id', (req, res) => {
    res.json({
        result: true,
        msg: 'Delete product successfully!'
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));