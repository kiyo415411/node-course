// 從資料庫讀取股票代碼

// mysql2 是一個第三方套件
// npm i mysql2
// 引用進來

const mysql = require("mysql2/promise");
// const dotenv = require("dotenv");
// dotenv.config();
require("dotenv").config();

(async () => {
    // console.log("DB_HOST", process.env.DB_HOST);
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_POST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    let [data, fields] = await connection.execute("SELECT * FROM stocks");
    console.log(data);

    connection.end();
})();
