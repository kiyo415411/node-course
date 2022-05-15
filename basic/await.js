let dt = new Date();
console.log(`起床了 at ${dt.toISOString()}`);

let doWork = function (job, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();
      let result = `完成工作: ${job} at ${dt.toISOString()}`;
      //   resolve(result);
      reject("故意失敗");
    }, timer);
  });
};

// await 可暫停(範圍) --> 要掛 async function
async function main() {
  //   let doBrushPromise = doWork("刷牙", 3000);
  //   let result = await doBrushPromise;

  try {
    let resultBrush = await doWork("刷牙", 3000);
    console.log(resultBrush);

    let resultEat = await doWork("早餐", 5000);
    console.log(resultEat);

    let resultBHW = await doWork("功課", 3000);
    console.log(resultBHW);
  } catch (e) {
    console.error("caaaatch!", e);
  }
}

main();
