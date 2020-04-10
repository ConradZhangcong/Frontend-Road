# let 和 const 命令

- 1.`let`命令
- 2.块级作用域
- 3.`const`命令
- 4.顶层对象的属性
- 5.`globalThis`对象

## 1.let 命令

### 基本用法

es6 新增`let`命令,用来声明变量,用法类似于`var`,但是所声明的变量,只在`let`命令所在代码块内有效.

```javascript
{
  let a = 10;
  var b = 1;
}
a; // ReferenceError: a is not defined.
b; // 1
```

for 循环的计数器,很适合用`let`命令:

```javascript
for (let i = 0; i < 3; i++) {
  let i = "abc";
  console.log(i);
}
console.log(i);
// abc
// abc
// abc
// ReferenceError: i is not defined
```

for 循环设置循环变量的部分是一个父作用域,而循环体内部是一个单独的作用域.

### 不存在变量提升

var 命令会发生"变量提升"的现象,即变量可以在声明之前使用,值为`undefined`.而在`let`命令改变了这种语法行为,它所声明的变量一定要在声明后使用,否则报错:

```javascript
console.log(foo); // undefined
var foo = 2;

console.log(bar); // ReferenceError
let bar = 2;
```

### 暂时性死区

es6 明确规定,如果区块内存在`let`和`const`命令,这个区块内对这些命令声明的变量,从一开始就形成了封闭作用域.凡是在声明之前使用这些变量,就会报错.

在代码块内,使用`let`命令声明变量之前,这些变量都是不可用的.在语法上,称为暂时性死区(temporal dead zone,简称 TDZ).

```javascript
var temp = 123;
if (true) {
  // TDZ开始
  temp = "abc"; // ReferenceError
  let temp; // TDZ结束
  console.log(temp);
}
```

### 不允许重复声明

`let`不允许在相同作用域内,重复声明一个变量.

## 2.块级作用域

### 为什么需要块级作用域?

第一种场景,内部变量可能会覆盖外部变量:

```javascript
var temp = new Date();
function f() {
  console.log(temp);
  if (false) {
    var temp = "hello world";
  }
}
f(); // temp
```

第二种场景,用来计数的循环变量泄露为全局变量:

```javascript
var s = "hello";
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}
console.log(i); // 5
```

### es6 的块级作用域

let 实际上为 js 新增了块级作用域.es6 允许块级作用域的任意嵌套.

内层作用域可以定义外层作用域的同名变量:

```javascript
{
  let a = 1;
  {
    let a = 2;
  }
}
```

块级作用域的出现,实际上使得获得广泛应用的匿名函数立即执行函数表达式(IIFE)不在必要了:

```javascript
// IIFE写法
(function() {
  let temp = 1;
  // ...
})();
// 块级作用域写法
{
  let temp = 1;
  // ...
}
```

### 块级作用域与函数声明

es6 的块级作用域必须有大括号,如果没有大括号,js 引擎就认为不存在块级作用域.

## 3.const 命令

### 基本用法

### 本质

`const`实际上保证的并不是变量值的不得改动,而是变量指向的那个内存地址所保存的数据不得改动.

如果真的想将对象冻结,应该使用`Object.freeze`方法

```javascript
"use strict";
const foo = Object.freeze({});

// 常规模式时,下面一行不起作用
// 严格模式时,该行会报错
foo.prop = 123;
```

除了对象本身冻结,对象的属性也应该冻结,下面是一个将对象彻底冻结的函数:

```javascript
var constantize = obj => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === "object") {
      constantize(obj[key]);
    }
  });
};
```

### es6 声明变量的六种方法

es5 只有两种声明变量的方法: `var`命令和`function`命令.es6 除了新增了`let`和`const`命令,后面还有提到两种声明变量的方法:`import`命令和`class`命令.所以,es6 一共有 6 中变量声明的方法.

## 4.顶层对象的属性

顶层对象,在浏览器环境中指的是`window`对象,在 Node 中指的是`global`对象.es5 之中,顶层对象的属性与全局变量是等价的.

es6 中,`let`命令 `const`命令 `class`命令声明的全局变量,不属于顶层对象.也就是说,从 es6 开始,全局变量将逐步与顶层对象的属性脱钩.

```javascript
var a = 1;
window.a; // 1
let b = 2;
window.b; // undefined
```

## 5.globalThis 对象

- 浏览器里面,顶层对象是`window`,但是 Node 和 Web Worker 没有`window`
- 浏览器和 Web Worker 里面,`self`也指向顶层对象,但是 Node 没有`self`
- Node 里面,顶层对象是`global`,但是其他环境都不支持

es2020 在语言标准的层面,引入`global`作为顶层对象.也就是说,任何环境下,`globalThis`都是存在的,都可以从它拿到顶层对象,指向全局环境下的`this`.
