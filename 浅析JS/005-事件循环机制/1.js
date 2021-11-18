console.log("main1");

new Promise(function (resolve, reject) {
  console.log("promise");
  resolve();
})
  .then(function () {
    console.log("promise then1");
  })
  .then(function () {
    console.log("promise then2");
  });

async function async1() {
  await async2();
  console.log("async1");
}

async function async2() {
  console.log("async2");
}
async1();

setTimeout(function () {
  console.log("setTimeout");
}, 0);

console.log("main2");

// main1 -> promise -> async2 -> main2 -> promise then1 -> async1 -> promise then2 -> setTimeout
