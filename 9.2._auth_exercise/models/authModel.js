const pool = require('../configs/authDB');

const getAll = async () => {
    const [rows] = await pool.query('select * from users');

    return rows;
}

const register = async (body) => {
    const [result] = await pool.query(
        'insert into users (name, email, password) values (?, ?, ?)',
        [body.name, body.email, body.password]
    );

    return result.insertId;
}

const getSingleUser = async (id) => {
    const [rows] = await pool.query('select * from users where id = ?', [id]);

    return rows;
}

module.exports = { getAll, register, getSingleUser }