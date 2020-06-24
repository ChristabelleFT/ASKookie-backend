const { createPool } = require("mysql");

const pool = createPool ({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b42af6808ff8de',
    password: '77f4f5a1',
    database: 'heroku_9202346d5b0ea9b',
    connectionLimit: 50
});

module.exports = pool;