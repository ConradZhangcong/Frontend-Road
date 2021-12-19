const MyPromise = require("../index");

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

promise.then(
  (value) => {
    console.log("resolve", value);
  },
  (reason) => {
    console.log("reject: ", reason);
  }
);
// 1000ms后
// resolve success