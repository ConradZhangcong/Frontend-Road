/**
 * 实现Promise.resole和Promise.reject
 */
const MyPromise = require("../index");

MyPromise.resolve()
  .then(() => {
    console.log(0);
    return MyPromise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });
