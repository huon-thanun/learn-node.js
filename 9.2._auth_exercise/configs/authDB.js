const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '$12112005',
    database: 'auth_exercise',
    port: 3306
});

module.exports = pool;