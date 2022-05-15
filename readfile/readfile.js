const fs = require("fs");

fs.readFile("test.txt", "utf-8", (err, data) => {
  if (err) {
    // 錯誤了
    console.log("喔喔喔，發生錯誤了");
    console.error(err);
  } else {
    // 因為沒有 err，所以是正確的
    console.log(data);
  }
});
