/**
 * 解决链式调用时.then函数中返回值的问题
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function myPromise(executor) {
  let self = this
  self.value = null
  self.error = null
  self.status = PENDING
  self.onFulfilledCallbacks = []
  self.onRekectedCallbacks = []

  const resolve = (value) => {
    if (self.status !== PENDING) return
    setTimeout(() => {
      self.status = FULFILLED
      self.value = value
      self.onFulfilledCallbacks.forEach(cb => cb(self.value))
    })
  }

  const reject = (error) => {
    if (self.status !== PENDING) return
    setTimeout(() => {
      self.status = REJECTED
      self.error = error
      self.onRekectedCallbacks.forEach(cb => cb(self.error))
    })
  }

  executor(resolve, reject)
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  let bridgePromise
  let self = this
  if (self.status === PENDING) {
    return bridgePromise = new myPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
      self.onRekectedCallbacks.push((err) => {
        try {
          let x = onRejected(err)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
    })
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value)
  } else {
    onRejected(this.error)
  }
  return this
}

module.exports = myPromise
