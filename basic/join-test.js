// let ary = ['a', 'b', 'c'];

// let result = ary.join('#');
// console.log(result); // a#b#c

// /public/images/uploads/member
let dirs = ['public', 'images', 'uploads', 'member'];
let aryJoin = dirs.join('/');
console.log(aryJoin);

// nodejs 內建的 path 模組
const path = require('path');
let realPath = path.join('public', 'images', 'uploads', 'member');
console.log(realPath);
