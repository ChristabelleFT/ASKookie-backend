const { createPool } = require("mysql");

const pool = createPool ({
    // port: process.env.DB_PORT,
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.MYSQL_DB,
    // connectionLimit: 50
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b42af6808ff8de',
    password: '77f4f5a1',
    database: 'heroku_9202346d5b0ea9b',
    connectionLimit: 50
});

module.exports = pool;