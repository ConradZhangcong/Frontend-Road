/**
 * 浅拷贝
 * 1.创建一个新对象
 * 2.遍历对象,将需要克隆对象的属性依次添加到新对象上面
 * 3.返回
 * @param {*} target
 */
function clone (target) {
  const result = {}
  for (let key in target) {
    result[key] = target[key]
  }
  return result
}

/**
 * 深拷贝 递归浅拷贝
 * 1.如果是原始类型,无需拷贝直接返回
 * 2.如果是引用类型,递归进行浅拷贝
 * @param {*} target 
 */
function deepClone (target) {
  if (typeof target === 'object') {
    const cloneTarget = {}
    for (let key in target) {
      cloneTarget[key] = deepClone(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}

module.exports = deepClone
