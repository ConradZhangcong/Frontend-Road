const fs = require('fs')
const myPromise = require('../1.js')
// const myPromise = require('../2.js')

let promise1 = new myPromise((resolve, reject) => {
  fs.readFile('./1.txt', (err, data) => {
    if (err) {
      reject(err)
    }
    resolve(data)
  })
})

let r1 = promise1.then(res => {
  console.log('1: ')
  console.log(res.toString() + 1)
})

let r2 = promise1.then(res => {
  console.log('2: ')
  console.log(res.toString() + 2)
})
