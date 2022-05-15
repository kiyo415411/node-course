const axios = require("axios").default;
const fs = require("fs/promises");

(async () => {
  try {
    let stockNo = await fs.readFile("stock.txt", "utf-8");
    console.log("read stockNo from file", stockNo);

    const response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: "json",
          date: "20220301",
          stockNo: stockNo,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
})();
