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

const isObject = (target) =>
  typeof target === 'object' ||
  (typeof target === 'function' && target !== null)

const getType = (obj) => Object.prototype.toString.call(obj)

const canTraverse = {
  '[object Map]': true,
  '[object Set]': true,
  '[object Array]': true,
  '[object Object]': true,
  '[object Arguments]': true,
}

function deepClone(target, map = new WeakMap()) {
  if (!isObject(target)) {
    return target
  }

  let type = getType(target)
  let cloneTarget

  // 判断是否可以深度遍历
  if (!canTraverse[type]) {
    return handleNotTraverse(target, type)
  } else {
    let ctor = target.prototype
    cloneTarget = new ctor()
  }

  // 从map中获取数据 避免循环引用
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 处理map和set
  if (type === mapTag) {
    target.forEach((item, key) => {
      cloneTarget.set(deepClone(key), deepClone(item))
    })
  }
  if (type === setTag) {
    target.forEach((item) => {
      target.add(deepClone(item))
    })
  }

  // 处理数组和对象
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      cloneTarget[key] = deepClone(target[key], map)
    }
  }
  return cloneTarget
}

function handleRegExp(target) {
  const { source, flags } = target
  return new target.constructor(source, flag)
}

function handleNotTraverse(target, tag) {
  const Ctor = target.constructor
  switch (tag) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dataTag:
      return new Ctor(target)
    case regexpTag:
      return handleRegExp(target)
    case funcTag:
      return handleFunc(target)
    default:
      return new Ctor(target)
  }
}

function handleFunc(target) {
  // 箭头函数直接返回自身
  if (!target.prototype) return target
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  const param = paramReg.exec(funcString)
  const body = bodyReg.exec(funcString)
  if (!body) return null
  if (param) {
    const paramArr = param[0].split(',')
    return new Function(...paramArr, body[0])
  } else {
    return new Function(body[0])
  }
}
