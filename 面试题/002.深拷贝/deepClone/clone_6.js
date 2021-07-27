/**
 * 其他数据类型
 * @param {*} target 
 */
// 数据类型映射
// 可继续遍历数据类型
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'
const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

// 不可继续遍历数据类型
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const numberTag = '[object Number]'
const regexpTag = '[object RegExp]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const funcTag = '[object Function]'

// 是否为对象
function isObject (target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

// 获取数据类型
function getType (target) {
  return Object.prototype.toString.call(target)
}

// 初始化数据
function getInit (target) {
  const Ctor = target.constructor
  return new Ctor()
}

function cloneFunction (func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  if (func.prototype) {
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      if (param) {
        const paramArr = param[0].split(',')
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}

function cloneOtherType (target, type) {
  const Ctor = target.constructor
  switch (type) {
    case boolTag:
    case dateTag:
    case errorTag:
    case numberTag:
    case stringTag:
      return new Ctor(target)
    case regexpTag:
      const reFlags = /\w*$/
      const result = new target.constructor(target.source, reFlags.exec(target))
      result.lastIndex = target.lastIndex
      return result
    case symbolTag:
      return Object(Symbol.prototype.valueOf.call(target))
    case funcTag:
      return cloneFunction(target)
    default:
      return null
  }
}

function deepClone (target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target
  }

  // 初始化
  const type = getType(target)
  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type)
  } else {
    return cloneOtherType(target, type)
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 克隆set
  if (type === setTag) {
    cloneTarget.forEach(value => {
      cloneTarget.add(clone(value, map))
    })
    return cloneTarget
  }

  // 克隆map
  if (type === mapTag) {
    cloneTarget.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map))
    })
    return cloneTarget
  }

  for (let key in target) {
    cloneTarget[key] = deepClone(target[key], map)
  }
  return cloneTarget
}



module.exports = deepClone
