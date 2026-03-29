const pool = require('../config/db')

const getAllC = async function name() {
    const [rows] = await pool.query('select *from categories');

    return rows;
}

const getSingleC = async function name(id) {
    const [row] = await pool.query('select *from categories where id = ?', [id]);

    return row;
}

const createC = async function name(body) {
    let [result] = await pool.query('insert into categories (name) values (?)', [body.name]);

    return result.insertId;
}

const updateC = async function name(body, id) {
    let sql = 'update categories set name = ? where id = ?';
    let data = [body.name, id];
    let [result] = await pool.query(sql, data);
}

const deleteC = async function name(id) {
    let sql = 'delete from categories where id = ?';
    let [result] = await pool.query(sql, [id]);
}

module.exports = { getAllC, getSingleC, createC, updateC, deleteC}

