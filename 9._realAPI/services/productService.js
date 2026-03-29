const pool = require('../config/db');

const getAllP = async function name() {
    const [rows] = await pool.query('select *from products');
    console.log(rows);

    return rows;
}

const createP = async function name(body) {
    let sql = 'insert into products (name, category, description) values (?, ?, ?)';
    let data = [body.name, body.category, body.description];
    let [result] = await pool.query(sql, data)
    let [row] = await pool.query('select *from products where id = ?', [result.insertId])

    return row;
}

const updateP = async function name(body, params) {
    let sql = 'update products set name = ?, category = ?, description = ? where id = ?';
    let data = [body.name, body.category, body.description, params.id];
    let [result] = await pool.query(sql, data);
    let [row] = await pool.query('select *from products where id = ?', [params.id]);

    return row
}

const deleteP = async function name(params) {
    let [row] = await pool.query('select *from products where id = ?', [params.id]);
    let sql = 'delete from products where id = ?';
    let [result] = await pool.query(sql, [params.id]);

    return row
}

const getSingleP = async function name(params) {
    const [row] = await pool.query('select *from products where id = ?', [params.id]);

    return row;
}

module.exports = { getAllP, createP, updateP, deleteP, getSingleP };