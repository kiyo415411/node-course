const fs = require("fs");

function getReadfilePromise(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf-8", (err, data) => {
      if (err) {
        // 錯誤了
        reject(err);
      } else {
        // 因為沒有 err，所以是正確的
        resolve(data);
      }
    });
  });
}

getReadfilePromise("test.txt")
  .then((result) => {
    console.log(`resolved: ${result}`);
  })
  .catch((error) => {
    console.error(error);
  });

getReadfilePromise("test111.txt")
  .then((result) => {
    console.log(`resolved: ${result}`);
  })
  .catch((error) => {
    console.error(error);
  });
