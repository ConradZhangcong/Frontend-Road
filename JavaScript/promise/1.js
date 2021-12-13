const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function myPromise(executor) {
  let self = this
  self.value = null
  self.error = null
  self.status = PENDING
  self.onFulfilled = null
  self.onRejected = null

  const resolve = (value) => {
    if (self.status !== PENDING) return
    setTimeout(() => {
      self.status = FULFILLED
      self.value = value
      self.onFulfilled(self.value)
    })
  }

  const reject = (error) => {
    if (self.status !== PENDING) return
    setTimeout(() => {
      self.status = REJECTED
      self.error = error
      self.onRejected(self.error)
    })
  }

  executor(resolve, reject)
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === PENDING) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value)
  } else {
    onRejected(this.error)
  }
  return this
}

module.exports = myPromise
