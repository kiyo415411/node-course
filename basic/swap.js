let a = 1;
let b = 2;
console.log("before", a, b); //1,2

temp = a;
a = b;
b = temp;
console.log("after", a, b); //2,1
