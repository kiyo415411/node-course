// export = module.exports = {}; // 每個模組的第一行都會有 | 看不到

let speed = 100;

exports.brand = "Ford";

exports.color = "red";

export.run=function(){
  console.log('I am running');
};

// return module.exports; // 最後一行會有 | 看不到
