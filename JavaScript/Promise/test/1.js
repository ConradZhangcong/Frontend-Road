const MyPromise = require("../index");

const promise = new MyPromise((resolve, reject) => {
  resolve("success");
  reject("error");
});

const promise2 = new MyPromise((resolve, reject) => {
  reject("error");
  resolve("success");
});

promise.then(
  (res) => {
    console.log("resolve: ", res);
  },
  (err) => {
    console.log("reject: ", err);
  }
);
// resolve:  success

promise2.then(
  (res) => {
    console.log("resolve: ", res);
  },
  (err) => {
    console.log("reject: ", err);
  }
);
// reject:  error
