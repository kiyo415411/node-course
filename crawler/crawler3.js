// npm i axios
const axios = require("axios").default;
// fs (filesystem) 內建的模組不用安裝，可以直接使用
const fs = require("fs/promises"); // 使用 promise 版本

(async () => {
    try {
        let stockNo = await fs.readFile("stock.txt", "utf-8");
        console.log("read stockNo from file", stockNo);
        // try {
        const response = await axios.get(
            "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
            {
                params: {
                    // 設定 query string
                    response: "json",
                    date: "20220301",
                    stockNo: stockNo,
                },
            }
        );
        console.log(response.data);
        // } catch {
        //   console.log("get data error");
        // }
    } catch (error) {
        // console.log("read file error");
        console.log(error);
    }
})();
