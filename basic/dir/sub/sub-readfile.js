const fs = require('fs/promises');
const path = require('path');

(async () => {
  console.log('__dirname', __dirname);
  // /Users/azole/Sites/MFEE25/node-course/basic/dir/sub/../test.txt
  // let result = await fs.readFile(__dirname + '/../' + 'test.txt', 'utf-8');
  // console.log(result);
  let result = await fs.readFile(path.join(__dirname, '..', 'test.txt'), 'utf-8');
  console.log(result);
})();
