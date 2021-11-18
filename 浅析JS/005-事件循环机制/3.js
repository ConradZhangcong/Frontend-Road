setTimeout(() => {
  console.log(1);
}, 0);

process.nextTick(() => {
  console.log(2);
});


// console.log("main1");

// new Promise(function (resolve, reject) {
//   console.log("promise");
//   resolve();
// }).then(function () {
//   console.log("promise then");
// });

// process.nextTick(function () {
//   console.log("process.nextTick1");
// });

// setTimeout(function () {
//   console.log("setTimeout");
//   process.nextTick(function () {
//     console.log("process.nextTick2");
//   });
// }, 0);

// console.log("main2");
