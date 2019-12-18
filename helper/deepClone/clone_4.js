/**
 * clone_3性能优化
 * 使用while代替for...in循环
 * @param {*} target 
 */
function deepClone (target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target)
    const cloneTarget = isArray ? [] : {}

    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)

    const keys = isArray ? undefined : Object.keys(target)
    forEach(keys || target, (value, key) => {
      if (keys) {
        key = value
      }
      cloneTarget[key] = deepClone(target[key], map)
    })
    return cloneTarget
  } else {
    return target
  }
}

function forEach (array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}

module.exports = deepClone
