# 闭包(Closure)

闭包的理解可以直接阅读阮一峰老师的文章: [学习 Javascript 闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

## 变量的作用域

JavaScript 变量的作用域有: 全局变量和局部变量.

函数内部的可以直接读取全局变量.

```js
var n = 999;

function f1() {
  console.log(n);
}

f1(); // 999
```

函数外部无法读取函数内部的变量.

```js
function f1() {
  var n = 999;
}

console.log(n); // ReferenceError: n is not defined
```

## 如何从外部获取局部变量

可以通过在函数内部在定义一个函数, 然后再内部函数使用外部函数的变量, 同时外部函数返回刚才那个内部函数.

```js
function f1() {
  var n = 999;

  function f2() {
    console.log(n);
  }

  return f2;
}

var result = f1();

result(); // 999
```

上面的代码中, 函数`f1`内部的所有局部变量对于函数`f2`来说都是可见的. 因为子对象会一级一级向上寻找父对象的变量, 这就是`链式作用域(chain scope)`. `f2`可以读取`f1`中的局部变量, 那么将`f2`作为返回值, 就可以在`f1`外部读取它的内部变量.

## 闭包的概念

上面代码中的`f2`函数其实就是闭包, 闭包可以理解为: **能够读取其他函数内部变量的函数**, 而只有函数内部的子函数才能读取局部变量, 因此可以将闭包简单理解为: **定义在一个函数内部的函数**.

本质上闭包就是将函数内部和函数外部链接起来的一座桥梁.

## 闭包的用途

闭包最大的两个作用: 1. 读取函数内部的变量 2. 让这些变量始终保持在内存中.

```js
function f1() {
  var n = 999;

  nAdd = function () {
    n += 1;
  };

  function f2() {
    console.log(n);
  }

  return f2;
}

var result = f1();

result(); // 999
nAdd();
result();
```

在上面代码中, 定义了一个全局的`nAdd`函数, 这个函数可以在函数外部改变函数内部局部变量的值. 通过调用`nAdd`可以发现, 函数`f1`中的局部变量一直保存在内存中, 并没有在`f1`调用后被自动清除. 因为`f2`在`f1`内部, `f2`被赋给一个全局变量, 导致`f2`始终在内存中, 而`f2`的存在又依赖了`f1`, 因此`f1`也不会在调用结束后被垃圾回收清除.

## 闭包的注意点

1. 内存消耗较大: 闭包会使函数中的变量被保存在内存中, 内存消耗较大.
2. 不要随便修改父函数内部的变量: 闭包可以在父函数外部改变父函数内部的值. 所以当把父函数当做对象, 闭包当做它的公共方法, 内部变量当做私有属性时, 一定要小心不要随便修改父函数内部变量的值.

## 思考题

代码一:

```js
var name = "The Window";

var object = {
  name: "My Object",

  getNameFunc: function () {
    return function () {
      return this.name;
    };
  },
};

alert(object.getNameFunc()());
```

代码二:

```js
var name = "The Window";

var object = {
  name: "My Object",

  getNameFunc: function () {
    var that = this;
    return function () {
      return that.name;
    };
  },
};

alert(object.getNameFunc()());
```

上面的运行结果是: 代码一返回'The Window', 代码二返回'My Object'

上面两段代码主要是`getNameFunc`属性内部有一些区别, 片段二是利用了闭包的特性, 将对象内部的`this`存储在`that`中, 这时在外部调用对象的`getNameFunc`方法时, 会返回对象的`name`属性.