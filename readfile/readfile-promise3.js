const fs = require("fs/promises");

// 會回傳給你一個 promise 物件，很像 readfile-promise2 裡的 getReadfilePromise
fs.readFile("test.txt", "utf-8")
  .then((result) => {
    console.log("這個是內建 promise 版本的 readfile", result);
  })
  .catch((err) => {
    console.error(err);
  });
