// read stock no from mysql database

const axios = require("axios");

// mysql2 是一個第三方套件
// npm i mysql2
// 引用進來
const mysql = require("mysql2/promise");
// const dotenv = require('dotenv');
// dotenv.config();
// 幫我們去把 .env 裡的變數讀進來
require("dotenv").config();

(async () => {
    // console.log("DB_HOST", process.env.DB_HOST);
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    let [data, fields] = await connection.execute("SELECT * FROM stocks");
    // console.log(data);
    // results [
    //     [],
    //     []
    // ]
    //let data = results[0];
    //let fields = results[1];

    /********** for 迴圈版本  ********************/
    // for (let i = 0; i < data.length; i++) {
    //   let response = await axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
    //     params: {
    //       response: 'json',
    //       date: '20220301',
    //       stockNo: data[i].id,
    //     },
    //   });
    //   console.log(response.data);
    // }
    /****************************************** */

    /************* map 版本 ************************** */
    let stockIds = data.map((stock) => {
        return stock.id;
    });

    // console.log("stockIds", stockIds);

    let mapResult = data.map(async (stock) => {
        let response = await axios.get(
            "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
            {
                params: {
                    // 設定 query string
                    response: "json",
                    date: "20220301",
                    stockNo: stock.id,
                },
            }
        );
        return response.data;
    });

    // mapResult
    // [ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ]

    // console.log(mapResult);
    let priceResults = await Promise.all(mapResult);
    console.log(priceResults);
    /****************************************** */

    connection.end();
})();
