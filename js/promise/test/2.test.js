const fs = require('fs')
const myPromise = require('../2.js')
// const myPromise = require('../3.js')

let readFilePromise = (filename) => {
  return new myPromise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

readFilePromise('./1.txt').then(res => {
  console.log('1: ')
  console.log(res.toString() + 1)
  return readFilePromise('./2.txt')
}).then(res => {
  console.log('2: ')
  console.log(res.toString() + 2)
})

