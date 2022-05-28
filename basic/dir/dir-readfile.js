const fs = require('fs/promises');
const path = require('path')(async () => {
  console.log('__dirname', __dirname);
  // /Users/azole/Sites/MFEE25/node-course/basic/dir/test.txt
  // let result = await fs.readFile(__dirname + '/' + 'test.txt', 'utf-8');
  // console.log(result);
  let result = await fs.readFile(path.join(__dirname, 'test.txt'), 'utf-8');
  console.log(result);
})();

// 本來 readfile 裡的那個檔案，會根據你「人」在哪裡去決定的
// 更好的做法: 用程式碼檔案自己的位置 ==> __dirname
