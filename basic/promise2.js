const fs = require("fs/promises");
async function test() {
    console.log(2);
    let r = await fs.readFile("stock.txt", "utf-8");
    console.log(r);
    return r;
}

(async () => {
    console.log(1);
    let result = await test();
    console.log(3, result);
})();
