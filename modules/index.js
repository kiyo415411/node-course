// 方法1: 引用整個物件
// let car = require('./car');

// console.log(car);

// // { brand: 'Ford', color: 'RED', run: [Function (anonymous)] }

// console.log(car.brand);
// car.run();

// 方法2: 只引用需要的
// let { brand } = require('./car');
// console.log(brand);

// 測試順序
const first = require('./first');
const second = require('./second');
