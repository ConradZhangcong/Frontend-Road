/**
 * 兼容数组
 * @param {*} target 
 */
function deepClone (target) {
  if (typeof target === 'object') {
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (let key in target) {
      cloneTarget[key] = deepClone(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}

module.exports = deepClone
