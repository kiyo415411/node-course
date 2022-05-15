const fs = require("fs");

let result = fs.readFile("test.txt", "utf-8", function (err, data) {
  if (err) {
    return err;
  }
  console.log(data);
});
console.log(result);
