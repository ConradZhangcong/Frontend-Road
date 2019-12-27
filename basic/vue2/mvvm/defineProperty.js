let obj = {}
let song = '发如雪'
obj.singer = '周杰伦'

Object.defineProperty(obj, 'music', {
  configurable: true, // 可以对obj里的属性进行删除
  enumerable: true, // 可以进行枚举
  // value: '七里香',
  // writable: true, // 可以修改对象的属性
  get () {
    return song
  },
  set (val) {
    song = val
  }
})

obj.music = '听妈妈的话'
console.log(obj)
