setTimeout(() => {
  console.log(1);
}, 0);

process.nextTick(() => {
  console.log(2);
});

// 2 -> 1
