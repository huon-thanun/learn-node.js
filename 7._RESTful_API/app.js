//===============11-03-2026=================//

const express = require('express');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

// let products = [];
let products = [
    { id: 1, name: 'cola', category: 'drinks', description: 'testing' },
    { id: 2, name: 'ize', category: 'drinks', description: 'testing' },
    { id: 3, name: 'ize', category: 'drinks', description: 'testing' },
    { id: 4, name: 'ize', category: 'drinks', description: 'testing' },
];
let id = products.reduce((maxId, product) => Math.max(maxId, product.id), 0);

app.get("/products", (req, res) => {
    res.json({
        result: true,
        msg: 'Get all products successfully!',
        data: products
    })
});

app.post('/products', (req, res) => {
    console.log(req.body);
    id++;
    let newProduct = {
        id: id,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
    }

    products.push(newProduct);
    res.json({
        result: true,
        msg: 'Create product successfully!',
        data: newProduct
    })

});

app.put('/products/:id', (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);

    for (const product of products) {
        // products.forEach(product => { //use forEach cannot use return for stop loop
        // console.log("id from array : ", product.id);
        // console.log("id from reques: ", req.params.id);
        // console.log(element);

        if (Number(req.params.id) === product.id) {
            // console.log(element);
            product.name = req.body.name,
                product.category = req.body.category,
                product.description = req.body.description;

            return res.json({
                result: true,
                msg: 'Update product successfully!',
                data: product
            })
        }
    }

    res.json({
        result: false,
        msg: 'Product not found!',
    })
})

app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.json({
            result: false,
            msg: "Product not found",
        });
    }

    products.splice(index, 1);

    res.json({
        result: true,
        msg: "Delete product successfully!",
    });
});

app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);
    console.log(product);

    if (!product) {
        return res.json({
            result: false,
            msg: "Product not found"
        });
    }

    res.json({
        result: true,
        msg: "Get product detail successfully!",
        data: product
    });
});


app.listen(3000, () => console.log('Server running on port 3000'));


//===========================================//

//===============10-03-2026================//
// const express = require('express');
// const axios = require('axios');

// const app = express();

// app.use(express.json());

// let products = [
//     { id: 1, name: 'cola', category: 'drinks', description: 'Testing' },
//     { id: 2, name: 'cola', category: 'drinks', description: 'Testing' },
//     { id: 3, name: 'cola', category: 'drinks', description: 'Testing' },
//     { id: 4, name: 'cola', category: 'drinks', description: 'Testing' },
// ]

// app.get("/products", (req, res) => {
//     // res.json([
//     //     {
//     //         "id": 1,
//     //         "title": "Tech News"
//     //     },
//     //     {
//     //         "id": 2,
//     //         "title": "don't know"
//     //     }
//     // ]);

//     res.json({
//         result: true,
//         msg: 'Get all products successfully!',
//         data: products
//     })
// });

// app.post('/products', (req, res) => {
//     // console.log(req.body);

//     products.push(req.body)
//     res.json({
//         result: true,
//         msg: 'Create product successfully!',
//     })

// });

// app.delete('/products/:id', (req, res) => {
//     res.json({
//         result: true,
//         msg: 'Delete product successfully!'
//     });
// });

// app.listen(3000, () => console.log('Server running on port 3000'));