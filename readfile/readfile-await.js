const fs = require("fs/promises");

(async () => {
  try {
    let p = await fs.readFile("test1.txt", "utf-8");
    console.log(p);
  } catch {
    console.log("error");
  }
})();
