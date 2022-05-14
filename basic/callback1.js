// 刷牙 3000ms -> 早餐 5000ms -> 功課 3000ms
let dt = new Date();
console.log(`起床了 at ${dt.toISOString()}`);

// cb=>callback
// setTimeout (外包)
let doWork = function (job, timer, cb) {
  // setTimeout 不會說要做多久
  setTimeout(() => {
    let dt = new Date();
    let result = `完成工作: ${job} at ${dt.toISOString()}`;
    cb(result);
  }, timer);
  //return
  console.log(`在 setTimeout 之後 ${job}`);
};

// ***不好管理與維護
// callback 很容易不小心寫出 callback hell 的程式 -> 用 promise 解決
doWork("刷牙", 3000, function (result) {
  console.log(result); //刷牙結束
  doWork("早餐", 5000, function (result) {
    console.log(result); //早餐結束
    doWork("寫功課", 3000, function (result) {
      console.log(result); //寫功課結束
    });
  });
});
