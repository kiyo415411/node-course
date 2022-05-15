let dt = new Date();
console.log(`起床了 at ${dt.toISOString()}`);

let doWork = function (job) {
  let timer = Math.floor(Math.random() * 5000);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();
      let result = `完成工作: ${job} at ${dt.toISOString()}`;
      resolve(result);
    }, timer);
  });
};
let doBrushPromise = doWork("刷牙");
let doEatPromise = doWork("早餐");
let doHWPromise = doWork("功課");
// let p = Promise.all([doBrushPromise, doEatPromise, doHWPromise]).then(
//   (values) => {
//     console.log(values);
//   }
// );

// console.log("p:", p);

(async () => {
  let values = await Promise.all([doBrushPromise, doEatPromise, doHWPromise]);
  console.log(values);
})();
