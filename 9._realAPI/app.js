const express = require('express');
const mysql2 = require('mysql2/promise');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json())

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce',
    port: 3307
})

// app.get('/', (req, res) => {
//     const rows = pool.query('select *from producs' (err, data) => )
// });

//=============products==============//
app.get('/products', async (req, res) => {
    try {
        const [rows] = await pool.query('select *from products');
        // console.log(rows);

        return res.json({
            result: true,
            msg: 'Get All Products Successfully',
            data: rows
        })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }

});

app.post('/product', async (req, res) => {
    console.log(req.body);
    try {
        let sql = 'insert into products (name, category, description) values (?, ?, ?)';
        let body = req.body;
        let data = [body.name, body.category, body.description];
        let [result] = await pool.query(sql, data)
        let [row] = await pool.query('select *from products where id = ?', [result.insertId])

        console.log(result);

        return res.json({
            result: true,
            msg: 'Create Product Successfully',
            data: row[0]
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }

})

app.put('/product/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        let sql = 'update products set name = ?, category = ?, description = ? where id = ?';
        let body = req.body;
        let data = [body.name, body.category, body.description, req.params.id];
        let [result] = await pool.query(sql, data);
        let [row] = await pool.query('select *from products where id = ?', [req.params.id]);
        console.log(result);
        console.log(row);

        return res.json({
            result: true,
            msg: 'Upate Product Successfully',
            data: row[0]
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }
})

app.delete('/product/:id', async (req, res) => {
    try {

        let [row] = await pool.query('select *from products where id = ?', [req.params.id])
        if (row.length == 0) {
            return res.status(404).json({
                result: false,
                msg: 'Product Not Found'
            })
        }

        // console.log(req.params.id);
        let sql = 'delete from products where id = ?';
        let [result] = await pool.query(sql, [req.params.id]);

        return res.json({
            result: true,
            msg: 'Delete Product Successfully'
        })

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }
})

app.get('/product/:id', async (req, res) => {
    try {
        const [row] = await pool.query('select *from products where id = ?', [req.params.id]);
        // console.log(row);

        if (row.length == 0) {
            return res.status(404).json({
                result: false,
                msg: 'Product Not Found'
            })
        }

        return res.json({
            result: true,
            msg: 'Get A Product Successfully',
            data: row[0]
        })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }

});

// ============================//

//==============categories=================//
app.get('/categories', async (req, res) => {
    try {
        const [rows] = await pool.query('select *from categories');
        // console.log(rows);

        return res.json({
            result: true,
            msg: 'Get All Categories Successfully',
            date: rows
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error',
            date: rows
        })
    }
})

app.post('/category', async (req, res) => {
    console.log(req.body);

    try {
        let [result] = await pool.query('insert into categories (name) values (?)', [req.body.name]);
        let [row] = await pool.query('select *from categories where id = ?', [result.insertId])
        // console.log(result);
        // console.log(row);

        return res.json({
            result: true,
            msg: 'Create Category Successfully',
            data: row[0]
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error',
            date: rows
        })
    }
})

app.put('/category/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        let [row] = await pool.query('select *from categories where id = ?', [req.params.id]);
        if (row.length == 0) {
            return res.status(404).json({
                result: false,
                msg: 'Category Not Found'
            })
        }

        let sql = 'update categories set name = ? where id = ?';
        let data = [req.body.name, req.params.id]
        let [result] = await pool.query(sql, data);

        return res.json({
            result: true,
            msg: 'Upate Category Successfully',
            data: row[0]
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }
})

app.delete('/category/:id', async (req, res) => {
    try {
        let [row] = await pool.query('select *from categories where id = ?', [req.params.id]);
        if (row.length == 0) {
            return res.status(404).json({
                return: false,
                msg: 'Category Not Found'
            })
        }

        let sql = 'delete from categories where id = ?';
        let [result] = await pool.query(sql, [req.params.id])

        return res.json({
            result: true,
            msg: 'Delete Category Successfully'
        })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }
})

app.get('/category/:id', async (req, res) => {
    try {
        const [row] = await pool.query('select *from categories where id = ?', [req.params.id]);
        // console.log(row);

        if (row.length == 0) {
            return res.status(404).json({
                result: false,
                msg: 'Category Not Found'
            })
        }

        return res.json({
            result: true,
            msg: 'Get A Category Successfully',
            data: row[0]
        })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }

});

app.listen(3000, () => console.log('Server running on port 3000'))