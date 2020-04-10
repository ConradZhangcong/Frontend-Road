// let a = {
//   i: 1,
//   valueOf: function () {
//     console.log('valueOf')
//     return a.i++
//   },
//   toString: function () {
//     console.log('toString')
//     return a.i++
//   }
// }

// if (a == 1 && a == 2 && a == 3) {
//   console.log('success')
// } else {
//   console.log('fail')
// }

let val = 0

Object.defineProperty(window, 'a', {
  get: function () {
    return ++val
  }
})

if (a == 1 && a == 2 && a == 3) {
  console.log('hello world')
}