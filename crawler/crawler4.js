const mysql = require("mysql2/promise");

(async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        post: "3306",
        user: "admin",
        password: "123456",
        database: "stocks",
    });

    let [data, fields] = await connection.execute("SELECT * FROM stocks");
    console.log(data);

    // results [
    //     [],
    //     []
    // ]

    // let data = results[0]
    // let fields = results[1]
    connection.end();
})();
