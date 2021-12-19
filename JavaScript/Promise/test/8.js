/**
 * 时then中的参数变为可选
 */

const MyPromise = require("../index");

const p1 = new MyPromise((resolve, reject) => {
  resolve(100);
});

p1.then()
  .then()
  .then()
  .then((value) => console.log(value));

// 100

const p2 = new MyPromise((resolve, reject) => {
  reject("err");
});

p2.then()
  .then()
  .then(
    (value) => console.log(value),
    (reason) => console.log(reason)
  );
// err
