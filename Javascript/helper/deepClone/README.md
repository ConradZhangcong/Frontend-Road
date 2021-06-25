# deepClone

深拷贝

参考: [掘金-如何写出一个惊艳面试官的深拷贝?](https://juejin.im/post/5d6aa4f96fb9a06b112ad5b1)

## [JSON.parse(JSON.stringify(obj))](./clone_0.js)

日常使用中大部分需求可以满足,但是有很多缺陷:

- 如果 obj 中有`Date`对象,会将时间转成字符串的形式
- 如果 obj 中有`RegExp` `Error`对象,会得到一个空对象
- 如果 obj 中有`Function`对象 `undefined`,会丢失函数和 undefined
- 如果 obj 中有`NaN` `Infinity` `-Infinity`,会得到`null`
- 只能序列化对象的可枚举的自由属性,例如:如果 obj 中有对象是有构造函数生成的,会丢弃对象的 `constructor`
- 如果对象中存在循环引用的情况也无法正确实现深拷贝

## [基础版本](./clone_1.js)

## [兼容数组](./clone_2.js)

## [解决循环引用](./clone_3.js)

## [性能优化](./clone_4.js)

## [可继续遍历的数据类型](./clone_5.js)

## [不可继续遍历的数据类型](./clone_6.js)
