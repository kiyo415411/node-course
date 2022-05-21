// 從資料庫讀取股票代碼

// mysql2 是一個第三方套件
// npm i mysql2
// 引用進來

const mysql = require("mysql2/promise");
(async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "admin",
        password: "123456",
        database: "stocks",
    });
    let [data, fields] = await connection.execute("SELECT * FROM stocks");
    console.log(data);

    connection.end();
})();
