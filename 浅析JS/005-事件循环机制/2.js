new Promise((resolve) => {
  console.log("Promise");
  resolve();
})
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

async function async1() {
  await async2();
  console.log("async1");
}

async function async2() {
  console.log("async2");
}

async1();

// Promise -> async2 -> promise1 -> async1 -> promise2