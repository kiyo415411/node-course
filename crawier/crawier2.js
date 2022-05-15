const axios = require("axios").default;
// npm i axios
const fs = require("fs");

fs.readFile("stock.txt", "utf-8", (err, stockNo) => {
  if (err) {
    console.error("read file error", err);
  } else {
    console.log("read stock no from file", stockNo);
    axios
      .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
          response: "json",
          date: "20220301",
          stockNo: stockNo,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }
});
