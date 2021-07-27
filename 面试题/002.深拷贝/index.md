# 深拷贝

上一篇文章介绍到浅拷贝以及深拷贝的区别, 以及一些常见的拷贝的方法.

使用`JSON.parse(JSON.stringify(object))`会有很多局限性, 因此有很多库都实现了深拷贝, 比如`lodash`的`cloneDeep()`, 日常开发中直接使用即可. 但是作为一个优秀的前端开发者, 应该对如何实现一个深拷贝有清晰完整的思路, 下面将从零开始实现一个深拷贝的方法.

## 基础版本

考虑到我们不知道需要拷贝的对象的深度是多少, 所以可以简单地使用递归来实现. 如果是基础数据类型直接返回, 如果是引用数据类型则再次调用克隆方法, 一直递归到属性全部为原是类型为止, 这样就完成了一个最简单的深拷贝:

```js
function cloneDeep(source) {
  if (source === null) return null;
  if (source === undefined) return undefined;

  if (typeof source === "object") {
    const target = {};
    for (const key in target) {
      target[key] = cloneDeep(source[key]);
    }
    return target;
  } else {
    return source;
  }
}
```

```js
// 测试用例
const obj = {
  a: "1",
  b: 1,
  c: true,
  d: null,
  e: undefined,
  f: {
    g: {
      h: "2",
    },
    i: "3",
  },
};

cloneDeep(obj);
/* 
  {
    a: '1',
    b: 1,
    c: true,
    d: {},
    e: undefined,
    f: { g: { h: '2' }, i: '3' }
  }
*/
```

这是一个非常基础的深拷贝, 简单地使用了递归进行基础类型和最基本对象的克隆问题, 但是还有很多问题, 比如其他的数据类型: `Array`, `Date`, `Set`, `Map`, `null`等

## 考虑其他数据类型

可以看到上面的测试用例中, `null`属性没有被正确的拷贝, 因为`typeof null === 'object'`.(这与 js 的一个历史遗留问题有关, 在这边不做详细说明.) 还有其他很多数据类型需要进行特殊的克隆处理, 那么首先需要获取数据的类型.

### 获取数据的类型

我们通常会使用`Object.prototype.toString()`来获取对象的数据类型.

> 每个对象都有一个 `toString()` 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，`toString()` 方法被每个 `Object` 对象继承。如果此方法在自定义对象中未被覆盖，`toString()` 返回 "[object type]"，其中 `type` 是对象的类型。

上面提到**如果此方法在自定义对象中未被覆盖**, 实际上大部分的数据类型都自定义了`Object`原型上的`toString()`方法, 那我们可以使用`call`来改变`this`指向来调用`Object`原型上未被覆盖的`toString()`方法来获取数据的类型.

```js
/** 获取目标的数据类型 */
const getType = (target) => Object.prototype.toString.call(target);
```

以下是这个方法的调用参与和返回结果的表格:

| 调用参数           | 返回结果             |
| :----------------- | -------------------- |
| `'conrad'`         | `[object String]`    |
| `1`                | `[object Number]`    |
| `true`             | `[object Boolean]`   |
| `null`             | `[object Null]`      |
| `undefined`        | `[object Undefined]` |
| `Symbol('Conrad')` | `[object Symbol]`    |
| `1n`               | `[object BigInt]`    |
| `{}`               | `[object Object]`    |
| `[]`               | `[object Array]`     |
| `new Set()`        | `[object Set]`       |
| `new Map()`        | `[object Map]`       |
| `function fn() {}` | `[object Function]`  |
| `() => {}`         | `[object Function]`  |
| `new Date()`       | `[object Date]`      |
| `new RegExp()`     | `[object RegExp]`    |
| `new Error()`      | `[object Error]`     |
| `Math`             | `[object Math]`      |
| `JSON`             | `[object JSON]`      |
| `globalThis`       | `[object global]`    |

在这些数据类型中, 我们简单的将他们分为两种类型:

- 可以继续遍历的类型
- 不可继续遍历的类型

```js
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
```

上面的基础版本克隆方法只考虑了最基本的`object`类型以及一些不可继续遍历的基本数据类型. 下面我们将根据不同的数据类型进行不同的处理.

### 可以继续遍历的数据类型

我们在这边只考虑`Object` `Array` `Set` `Map`这四种可继续遍历的数据类型.

首先我们需要获取他们的构造函数, 通过构造函数生成新的对象, 以保证可以保留对象的原型.

```js
/** 使用对象的构造函数进行初始化 */
const getConstructor = (target) => {
  const Constructor = target.constructor;
  return new Constructor();
};
```

下一步就是改写基础版的`cloneDeep`函数, 使其支持对可继续遍历数据类型的克隆:

```js
function cloneDeep(source) {
  if (source === null) return null;
  if (source === undefined) return undefined;

  // 获取对象的数据类型
  const type = getType(source);

  // 初始化对象
  let target;
  if (iterableTags.includes(type)) {
    target = getConstructor(source);
  }

  // 克隆set
  if (type === setTag) {
    source.forEach((value) => {
      target.add(cloneDeep(value));
    });
    return target;
  }

  // 克隆map
  if (type === mapTag) {
    source.forEach((value, key) => {
      target.set(key, cloneDeep(value));
    });
    return target;
  }

  // 克隆数组
  if (type === arrayTag) {
    source.forEach((value, index) => {
      target[index] = cloneDeep(value);
    });
    return target;
  }

  // 克隆对象
  if (type === objectTag) {
    const keys = Object.keys(source);
    keys.forEach((key) => {
      target[key] = cloneDeep(source[key]);
    });
    return target;
  }

  return source;
}
```

### 不可继续遍历的数据类型

下面就是对其余不可继续遍历的类型进行处理:

对于`Boolean` `Number` `String` `Date` `Error`这几种类型我们都可以直接使用构造函数和原始数据类型来创建一个新对象:

```js
function cloneOtherType(source, type) {
  const Ctor = source.constructor;
  switch (type) {
    case stringTag:
    case numberTag:
    case booleanTag:
    case dateTag:
    case errorTag:
      return new Ctor(source);
    case bigintTag:
      return BigInt(source);
    case symbolTag:
      return cloneSymbol(source);
    case regexpTag:
      return clonseReg(source);
    case functionTag:
      return cloneFunction(source);
    case globalTag:
      return source;
    default:
      return null;
  }
}
```

- 克隆`Sybmol`类型

```js
function cloneSymbol(source) {
  return Object(Symbol.prototype.valueOf.call(source));
}
```

- 克隆`RegExp`类型

```js
function clonseReg(source) {
  const reFlags = /\w*$/;
  const result = new source.constructor(source.source, reFlags.exec(source));
  result.lastIndex = source.lastIndex;
  return result;
}
```

- 克隆函数

实际上对函数的克隆是没有什么意义的, 两个函数使用在内存中处于同一个内存地址的函数也是没有任何问题的. 但是如果真的想要对函数进行克隆也是可以的, 主要就是需要区分一下箭头函数和普通函数.

我们可以通过`prototype`来区分箭头函数和普通函数, 箭头函数是没有`prototype`的.

我们可以使用`eval`和函数字符串来重新生成一个箭头函数, 但是这个方法不适用于普通函数. 处理普通函数需要用正则取出函数体和函数参数, 然后使用`new Function(...args, functionBody)`构造函数重新构造一个新的函数.

```js
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    // 普通函数
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      // 匹配到函数体
      if (param) {
        // 匹配到参数
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    // 箭头函数
    return eval(funcString);
  }
}
```

到这边, 我们已经初步实现了一个简单的深拷贝, 并且可以处理多种数据类型.(这边大概提供一个思路, 处理不同的数据类型需要进行不同的处理, 如果需要处理更多的数据类型可以继续扩展这块内容)

## 循环引用

我们在执行这样一个测试用例的时候会抛出一个内存溢出的异常

```js
const obj = {};
obj.obj = obj;
```

上面的对象存在循环引用(即对象的属性出现了引用自身的情况), 因此导致递归进入死循环, 引发栈内存溢出.

为了解决这个问题, 我们可以多使用一个存储空间, 来存储当前对象和拷贝的对象之间的对应关系, 如果当前拷贝的对象在储存空间中存在时则直接返回, 如果不存在则继续拷贝, 就能解决循环引用的问题.

```js
function cloneDeep(source, map = new WeakMap()) {
  // ...

  // 获取对象的数据类型
  const type = getType(source);

  // 初始化对象
  let target;
  if (iterableTags.includes(type)) {
    target = getConstructor(source);
  } else {
    return cloneOtherType(source, type);
  }

  if (map.get(source)) {
    return map.get(source);
  }
  map.set(source, target);

  // ...
}
```

在这边我们使用`WeakMap`来存储已经拷贝过的数据, 它的`key`可以使用引用类型的数据, 为什么不使用`Map`而使用`WeakMap`呢?

> WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

什么是弱引用呢?

> 在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。

我们创建一个对象, 就默认创建了一个强引用的对象, 如果要清空这个对象的内存, 那么就需要手动将这个对象设置为`null`, 那它才会被垃圾回收机制进行回收, 如果是弱引用对象, 垃圾回收机制会自动帮我们回收.

```js
let obj = { name: "conrad" };
const target = new Map();
// const target = new WeakMap()
target.set(obj, "merry");
obj = null;
```

在上面的示例中, 如果是`Map`, 因为`target`对`obj`存在强引用关系, 即使手动将`obj`置为`null`, 这部分内存也无法被释放; 但是如果使用`WeakMap`, `target`和`obj`就是弱引用的关系, 当下一次垃圾回收机制执行时, 这部分内存就会被释放掉.

如果我们拷贝的对象非常庞大时, 使用`Map`会对内存造成非常大的额外消耗, 而且需要手动清除`Map`的属性才能释放这块内存, 而`WeakMap`会巧妙的帮我们解决这个问题.

## 递归爆栈

上面我们方法都是递归, 如果对象的层级过深, 那么可能会爆栈:

```js
// 生成深度为deep的对象
function createData(deep) {
  let data = {};
  let temp = data;

  for (let i = 0; i < deep; i++) {
    temp["data"] = {};
    temp = temp["data"];
  }

  return data;
}

console.log(cloneDeep(createData, 10000));
// RangeError: Maximum call stack size exceeded
```

破解递归爆栈的方法有两种, 一种是消除尾递归, 另一种是不使用递归, 使用循环.

> 什么是消除尾递归, 为什么递归会爆栈而循环不会

## 完整代码

> [github-Conrad](https://github.com/ConradZhangcong/utopia-utils/tree/main/src/clone-deep)
>
> PS:  这个工具类包中的工具会不断完整并且扩展 欢迎 star

## 参考

> [MDN-Object.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/JavaScript/Reference/Global_Objects/Object/toString)
>
> [掘金-如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141#heading-3)
>
> [github-lodash](https://github.com/lodash/lodash)

```
本人才疏学浅 欢迎交流与指正
```
