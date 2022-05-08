function sum(n) {
  let i = 0;
  let sum = 0;
  for (i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
}

let sum2 = (n) => ((n + 1) * n) / 2;



console.log(sum(1));
console.log(sum(2));
console.log(sum(10));
console.log(sum(100));

console.log(sum2(1));
console.log(sum2(2));
console.log(sum2(10));
console.log(sum2(100));

