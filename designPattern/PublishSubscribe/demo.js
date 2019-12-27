let corp = {}

corp.list = {} // 缓存回调函数

// 订阅事件
corp.on = function (key, fn) {
  if (!this.list[key]) {
    this.list[key] = []
  }
  this.list[key].push(fn)
}

// 发布事件
corp.emit = function () {
  let key = [].shift.call(arguments)
  let fns = this.list[key]
  if (!fns || fns.length === 0) {
    return false
  }
  fns.forEach(fn => {
    fn.apply(this, arguments)
  })
}

// 测试用例
corp.on('join', (position, aslary) => {
  console.log('你的职位是: ' + position)
  console.log('期望薪水: ' + aslary)
})

corp.on('other', (skill, hobby) => {
  console.log('你的技能有: ' + skill)
  console.log('爱好: ' + hobby)
})

corp.emit('join', '前端', 1000)
corp.emit('join', '后端', 2000)
corp.emit('other', '端茶倒水', '足球')
