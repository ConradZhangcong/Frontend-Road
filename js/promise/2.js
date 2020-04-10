/**
 * 解决有多个.then时只调用最后一个的问题
 * 将成功/失败后的回调改为数组,成功/失败后循环调用数组内的方法
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
  if (this.status === PENDING) {
    this.onFulfilledCallbacks.push(onFulfilled)
    this.onRekectedCallbacks.push(onRejected)
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value)
  } else {
    onRejected(this.error)
  }
  return this
}

module.exports = myPromise
