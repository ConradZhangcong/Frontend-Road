/**
 * 解决循环引用 克隆循环引用的对象 递归会进入死循环导致栈内存溢出
 * 额外开辟一个存储空间,当拷贝当前对象时,先去存储空间中找,使用Map这种数据结构
 * 使用WeakMap代替Map,WeakMap对象是一组键值对的集合,其中的键是弱引用的.其键必须是对象,值可以是任意的
 * @param {*} target 
 */
function deepClone (target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (let key in target) {
      cloneTarget[key] = deepClone(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}

module.exports = deepClone
