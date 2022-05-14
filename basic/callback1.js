// 刷牙 3000ms -> 早餐 5000ms -> 功課 3000ms
let dt = new Date();
console.log(`起床了 at ${dt.toISOString()}`);

// cb=>callback
// setTimeout (外包)
let doWork = function (job, timer, cb) {
  setTimeout(() => {
    let dt = new Date();
    let result = `完成工作: ${job} at ${dt.toISOString()}`;
    cb(result);
  }, timer);
  //return
  console.log(`在 setTimeout 之後 ${job}`);
};

doWork("刷牙", 3000, function (result) {
  console.log(result);
  doWork("早餐", 5000, function (result) {
    console.log(result);
    doWork("寫功課", 3000, function (result) {
      console.log(result);
    });
  });
});
