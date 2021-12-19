/**
 * 使用then链式返回自身的promise实例时会发生循环调用 会报错
 */

const MyPromise = require("../index");

const promise = new MyPromise((resolve, reject) => {
  resolve(100);
});

const p1 = promise.then((value) => {
  console.log(1);
  console.log("resolve", value);
  return p1;
});

// 运行的时候会走reject
p1.then(
  (value) => {
    console.log(2);
    console.log("resolve", value);
  },
  (reason) => {
    console.log(3);
    console.log(reason.message);
  }
);
