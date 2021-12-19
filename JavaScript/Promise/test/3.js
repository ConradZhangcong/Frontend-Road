const MyPromise = require("../index");

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

promise.then((value) => {
  console.log(1);
  console.log("resolve", value);
});

promise.then((value) => {
  console.log(2);
  console.log("resolve", value);
});

promise.then((value) => {
  console.log(3);
  console.log("resolve", value);
});

// 1000ms后
// 1
// resolve success
// 2
// resolve success
// 3
// resolve success