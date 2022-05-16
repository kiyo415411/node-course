//

const axios = require("axios").default;

// npm i axios

axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: "20220301",
      stockNo: "2330",
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((e) => {
    console.error(e);
  });
