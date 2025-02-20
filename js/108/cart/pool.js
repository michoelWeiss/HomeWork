const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
  host: 'localhost',
  user: 'root',
 // password: process.env.MYSQL_PASSWORD,
  database: 'nodeuser1',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
