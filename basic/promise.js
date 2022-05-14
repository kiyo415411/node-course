// Promise 為物件所以要 new 它
// new 的時候要傳入 executor
// 承諾(promise)要有人 (executer) 來執行
// executer 也是一個函式
// new Promise(executer);

// resolve 跟 reject 也是一個函式
// function(resolve,reject){
//     非同步工作
//     做成功的時候，就呼叫 resolve
//     做失敗的時候，就呼叫 reject
// }

let dt = new Date();
console.log(`起床了 at ${dt.toISOString()}`);

// 不用 callback 了，故刪掉 cb 參數
let doWork = function (job, timer) {
  return new Promise((resolve, reject) => {
    // 做非同步工作
    setTimeout(() => {
      let dt = new Date();
      let result = `完成工作: ${job} at ${dt.toISOString()}`;
      resolve(result); // 成功，以 resolve 傳出 result
    }, timer);
  });
};

// Promise 三狀態
// 擱置（pending）：初始狀態，不是 fulfilled 與 rejected。
// 實現（fulfilled）：表示操作成功地完成。
// 拒絕（rejected）：表示操作失敗了。
// 問題：難以做條件控制

let doBrushPromise = doWork("刷牙", 3000);
// console.log(doBrushPromise); --> Promise { <pending> }
// 用 然後(then) 函式接收 結果(result)
doBrushPromise
  .then((result) => {
    console.log(result); // 接到刷牙成功的結果

    let doEatPromise = doWork("早餐", 5000);
    // console.log(doEatPromise); --> Promise { <pending> }
    return doEatPromise;
    // 可直接以 return 回傳 promise 物件
  })
  .then((result) => {
    // 接到早餐成功的結果
    console.log(result);

    let doHWPromise = doWork("寫功課", 3000);
    // console.log(doHWPromise); --> Promise { <pending> }
    return doHWPromise;
    // 可直接以 return 回傳 promise 物件
  })
  .then((result) => {
    // 接到寫功課成功的結果
    console.log(result);
  });
