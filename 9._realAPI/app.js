const express = require('express');
const mysql2 = require('mysql2/promise');

const app = express();
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
    try{
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
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            result: false,
            msg: 'Internal Server Error'
        })
    }
})

app.delete('/product/:id', async (req, res) => {
    try{
        console.log(req.params.id);
        let sql = 'delete from products where id = ?';
        let [result] = await pool.query(sql, [req.params.id]);

        return res.json({
            result: true,
            msg: 'Delete Product Successfully'
        })
        
    }catch(err){
        console.log(err);

        return res.json({
            result: false,
            msg: 'Internal Server Error'
        })
    }
})

app.listen(3000, () => console.log('Server running on port 3000'))