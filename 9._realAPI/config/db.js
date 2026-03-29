const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '$12112005',
    database: 'ecommerce',
    port: 3306
})

module.exports = pool;