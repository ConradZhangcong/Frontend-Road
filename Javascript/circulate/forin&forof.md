# for...in 与 for...of 比较

`for...in`循环遍历索引,`for...of`循环遍历元素值

`for...of`循环是`es6`新增的一种循环方式.
`for...of`循环可以使用的范围包括:

- 数组
- Set 和 Map 结构
- 类数组的对象(比如 arguments 对象,DOM NodeList 对象)
- Generator 对象
- 文字字符串

> 一个数据结构只要部署了`Symbol.iterator`属性,就被视为具有`iterator`接口,就可以用`for...of`循环便利它的成员.也就是说,`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法.

## 遍历对象

`for...in`可以对对象进行遍历,`for...of`无法对普通对象进行遍历.

```javascript
Object.prototype.method = function() {
  console.log(this)
}

let obj = {
  a: 1,
  b: [],
  c: function() {}
}

for (let i in obj) {
  console.log(i, obj[i])
}
// a 1
// b []
// c [Function: c]
// method [Function]

for (let i of obj) {
  console.log(i)
}
// 报错: TypeError: obj is not iterable
```

`for...in`循环可以遍历到对象的原型方法,可以在循环内部进行判断,使用`hasOwnProperty`方法来判断某属性是否为该对象的实例属性.

```javascript
for (let i in obj) {
  if (obj.hasOwnProperty(i)) {
    console.log(i, obj[i])
  }
}
// a 1
// b []
// c [Function: c]
```

`for...of`循环不能对普通对象进行循环,可以使用`es5`的`Object.keys()`先获取到对象的实例属性组成的数组再进行循环,不包括原型方法和属性.或者给对象部署一个`Symbol.iterator`属性.

```javascript
console.log(Object.keys(obj)) // [ 'a', 'b', 'c' ]

for (let i of Object.keys(obj)) {
  console.log(i, obj[i])
}
// a 1
// b []
// c [Function: c]
```

## 遍历数组

`for...in`循环的问题:

- index 索引为字符串型数组,不能直接进行几何运算
- 遍历顺序有可能不是按照实际数组的内部顺序
- 遍历数组所有的可枚举属性,包括原型.

```javascript
Array.prototype.method = function() {
  console.log(this)
}

let arr = [2, 4, 6, 8]

arr.name = '数组'

for (let i in arr) {
  console.log(i, typeof i, arr[i])
}
// 0 string 2
// 1 string 4
// 2 string 6
// 3 string 8
// name string 数组
// method string [Function]
```

通常情况下我们不需要数组的其他属性,那么可以使用`forEach`来对数组进行遍历,但是`forEach`不能使用`break`终端循环,也不能使用`retrun`返回外层函数.`es5`具有遍历数组功能的还有`map` `filter` `some` `every` `reduce` `reduceRight`等,要注意他们的返回结果不一样.

```javascript
arr.forEach(i => {
  console.log(i)
})
// 2
// 4
// 6
// 8
```

使用`for...of`对数组进行遍历:

```javascript
for (let i of arr) {
  console.log(i)
}
// 2
// 4
// 6
// 8
```

## 总结

- `for...in`遍历索引(key);`for...of`遍历元素值(value).
- `for...in`比较适合遍历对象;`for...of`可以遍历数组,Set 和 Map 结构,类数组的对象(比如 arguments 对象,DOM NodeList 对象),Generator 对象,文字字符串等.但是不能遍历对象.可以使用`Object.keys()`先获取到对象的实例属性组成的数组再进行循环,不包括原型方法和属性.或者给对象部署一个`Symbol.iterator`属性.
- `for...in`和`for...of`可以与`break` `return` `continue`进行配合跳出循环.
