console.log('script start') // 1

async function async1() {
  await async2()
  console.log('async1 end') // 5
}

async function async2() {
  console.log('async2 end') // 2
}

setTimeout(function () {
  console.log('setTimeout') // 9
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise') // 3
  resolve()
}).then(function () {
  console.log('Promise1') // 6
}).then(function () {
  console.log('Promise2') // 7
})

console.log('script end') // 4