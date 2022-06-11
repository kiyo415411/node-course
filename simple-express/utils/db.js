require("dotenv").config(); // mysql2 依賴 dotenv
const mysql = require("mysql2");
// 做資料庫離線的工具
// 請一堆工人 connection pool
let pool = mysql
    .createPool({
        host: process.env.DB_HOST,
        port: process.env.DP_POST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // 為了 pool 新增的參數
        connectionLimit: 10,
    })
    .promise();

module.exports = pool;
