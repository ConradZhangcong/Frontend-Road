let event = {
  // 存放回调函数
  list: {},
  // 订阅事件
  on (key, fn) {
    if (!this.list[key]) {
      this.list[key] = []
    }
    this.list[key].push(fn)
  },
  // 发布事件
  emit () {
    let key = [].shift.call(arguments)
    let fns = this.list[key]
    if (!fns || fns.length === 0) {
      return false
    }
    fns.forEach(fn => {
      fn.apply(this, arguments)
    })
  },
  // 根据key值取消订阅
  remove (key, fn) {
    let fns = this.list[key]
    if (!fns) return false
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      fns.forEach((cb, i) => {
        if (cb === fn) {
          fns.splice(i, 1)
        }
      })
    }
  }
}

module.exports = event
