const pool = require('../configs/authDB');

const getAll = async () => {
    const [rows] = await pool.query('select id, name, email, created_at from users');

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
    const [rows] = await pool.query('select id, name, email, created_at from users where id = ?', [id]);

    return rows;
}

const findByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

module.exports = { getAll, register, getSingleUser, findByEmail }