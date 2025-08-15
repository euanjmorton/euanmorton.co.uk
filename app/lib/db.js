import mysql from "mysql2/promise";

//const pool = mysql.createPool({

const connection = await mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password
});

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: 'PinterPi',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export default pool;

//export default connection;
