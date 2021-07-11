const eventEmit = require('../index')

function cat () {
  console.log('喵喵喵')
}

function dog () {
  console.log('汪汪汪')
}

eventEmit.on('pet', data => {
  console.log('接收数据')
  console.log(data)
})
eventEmit.on('pet', cat)
eventEmit.on('pet', dog)

eventEmit.remove('pet', dog)

eventEmit.emit('pet', ['二哈', '波斯猫'])
