const fs = require("fs");
function RFS() {
  fs.readFile("test.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

async function main() {
  try {
    let result = await RFS();
    console.log(result);
  } catch (e) {
    console.error("caaaatch!", e);
  }
}();
