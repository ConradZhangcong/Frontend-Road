const MyPromise = require("../index");

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

const other = () => {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("other");
    }, 1000);
  });
};

promise
  .then((value) => {
    console.log(1);
    console.log("resolve", value);
    return other();
  })
  .then((value) => {
    console.log(2);
    console.log("resolve", value);
  });

// 1000ms后
// 1
// resolve success
// 2
// resolve other
