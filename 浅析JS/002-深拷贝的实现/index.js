/** cloneDeep */

// 不可继续遍历的数据类型
const stringTag = "[object String]";
const numberTag = "[object Number]";
const booleanTag = "[object Boolean]";
const nullTag = "[object Null]";
const undefinedTag = "[object Undefined]";
const symbolTag = "[object Symbol]";
const bigintTag = "[object BigInt]";

const functionTag = "[object Function]";
const dateTag = "[object Date]";
const regexpTag = "[object RegExp]";
const errorTag = "[object Error]";
const mathTag = "[object Math]";
const jsonTag = "[object JSON]";
const globalTag = "[object global]";

// 可以继续遍历的数据类型
const objectTag = "[object Object]";
const arrayTag = "[object Array]";
const setTag = "[object Set]";
const mapTag = "[object Map]";
const iterableTags = [objectTag, arrayTag, setTag, mapTag];

/** 获取目标的数据类型 */
const getType = (target) => Object.prototype.toString.call(target);

/** 使用对象的构造函数进行初始化 */
const getConstructor = (target) => {
  const Constructor = target.constructor;
  return new Constructor();
};

function cloneDeep(source, map = new WeakMap()) {
  if (source === null) return null;
  if (source === undefined) return undefined;

  // 获取对象的数据类型
  const type = getType(source);

  // 初始化对象
  let target;
  if (iterableTags.includes(type)) {
    target = getConstructor(source);
  } else {
    return cloneUnIterableTypes(source, type);
  }

  // 栈
  const loopList = [{ parent: target, key: undefined, data: source, type }];

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const { parent, key, data, type } = node;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = getConstructor(data);
    }

    forEach(data, (v, k) => {
      const currentType = getType(v);
      if (iterableTags.includes(currentType)) {
        // 下一次循环
        loopList.push({
          parent: res,
          key: k,
          data: v,
          type: currentType,
        });
      } else {
        setIterableTypesValue(res, k, v);
      }
    });
  }

  return target;
}

function setIterableTypesValue(source, key, value) {
  const sourceType = getType(source);
  if (sourceType === setTag) {
    // 克隆set
    source.add(value);
  } else if (sourceType === mapTag) {
    // 克隆map
    source.set(key, value);
  } else if (sourceType === arrayTag) {
    // 克隆数组
    source[key] = value;
  } else if (sourceType === objectTag) {
    // 克隆对象
    source[key] = value;
  }

  return source;
}


function forEach(array, iteratee) {
  const type = getType(array);
  if (type === objectTag) {
    const list = Object.keys(array);
    let index = -1;
    const length = list.length;
    while (++index < length) {
      iteratee(array[list[index]], list[index]);
    }
    return list;
  } else if (type === arrayTag) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
      iteratee(array[index], index);
    }
    return list;
  } else if (type === setTag) {
    for (let index of array) {
      iteratee(index, index);
    }
    return array;
  } else if (type === mapTag) {
    array.forEach((item, index) => iteratee(item, index));
    return array;
  }
}

function createData(deep, breadth) {
  let data = {};
  let temp = data;

  for (let i = 0; i < deep; i++) {
    temp["data"] = {};
    temp = temp["data"];
  }

  return data;
}

// const obj2 = createData(1000000);

var a = {
  a1: 1,
  a2: {
    b1: 1,
    b2: {
      c1: 1,
    },
  },
  a3: new Set([1, 2]),
  a4: new Map([
    [1, 11],
    [2, 22],
  ]),
};

console.log(cloneDeep(createData(1000000)));
