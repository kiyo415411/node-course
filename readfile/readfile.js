const fs = require("fs");

let p = new Promise((resolve, reject) => {
  fs.readFile("test1111.txt", "utf-8", (err, data) => {
    if (err) {
      // 錯誤了
      reject(err);
    } else {
      // 因為沒有 err，所以是正確的
      resolve(data);
    }
  });
});

p.then((data) => {
  console.log("讀取成功");
  console.log("data");
}).catch((err) => {
  console.log("喔喔喔，發生錯誤了");
  console.log("err");
});
