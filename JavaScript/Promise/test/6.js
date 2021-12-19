/**
 * 捕获执行其中的代码, 如果执行器中代码有错误, Promise的状态要变为失败
 */

const MyPromise = require("../index");

const promise = new MyPromise((resolve, reject) => {
  resolve("success");
  // throw new Error("执行器错误");
});

promise
  .then(
    (value) => {
      console.log(1);
      console.log("resolve", value);
      throw new Error("then error");
    },
    (reason) => {
      console.log(2);
      console.log(reason.message);
    }
  )
  .then(
    () => {},
    (err) => {
      console.log(err);
    }
  );
