# Javascript 的执行上下文

执行上下文是当前 Javascript 代码被解析和执行时所在环境的抽象概念.

## 执行上下文的类型

执行上下文一共有三种类型

- **全局执行上下文** 只有一个, 浏览器中的全局对象就是`window`对象, `this`指向这个全局对象
- **函数执行上下文** 只有在函数被调用的时候才会被创建, 每次调用都会创建一个新的执行上下文
- **eval 函数执行上下文**

## 执行栈

执行栈 也叫调用栈, 具有`LIFO`(后进先出)结构, 用于存储代码执行期间创建的所有执行上下文.

首次运行 js 代码时, 会创建一个全局执行上下文并 push 到当前的执行栈中, 每次发生函数调用, 都会为该函数创建一个新的函数执行上下文并且 push 到当前执行栈的栈顶.

根据执行栈 LIFO 的规则, 当栈顶函数执行完成后, 其对应的函数执行上下文会从执行栈中 pop 出去, 上下文控制权将转移到当前执行栈的下一个执行上下文.

## 执行上下文

执行上下文分为两个阶段: 1. 创建阶段 2.执行阶段

## 执行上下文的创建阶段

1. `LexicalEnvironment`(词法环境)组件被创建
2. `VariableEnvironment`(变量环境)组件被创建

伪代码:

```js
ExecutionContext = {
  LexicalEnvironment: { ... },
  VariableEnvironment: { ... },
}
```

### **LexicalEnvironment(词法环境)**

词法环境是一个标识符和变量映射的结构(标识符指变量/函数名称, 变量指实际的对象: 对象的引用或者原始值).

举个例子, 如下代码:

```js
var a = 20;
var b = 40;
function foo() {
  console.log("bar");
}
```

所以他的词法环境是类似这样的:

```js
lexicalEnvironment = {
  a: 20,
  b: 40,
  foo: <ref. to foo function>
}
```

词法环境有三个部分组成:

1. 环境记录: 存储变量和函数声明的实际位置
2. 对外部环境的引用: 可以访问其外部词法环境
3. 确定 this, 也被成为`This Binding`

词法环境有两种类型:

1. 全局环境: 没有外部环境的词法环境, 外部环境引用为`null`. 拥有一个全局对象及其相关联的方法和属性 以及任何用户自定义的全局变量
2. 函数环境: 用户在函数中定义的变量被存储在**环境记录**中, 包含了`arguments`对象. 对外部环境的引用可以是全局对象, 也可以是包含内部函数的外部函数环境.

This Binding:

- 全局执行上下文中, `this`的值指向全局对象, 在浏览器中`this`的值指向`window`对象, 而在`nodejs`中指向这个文件的`module`对象.
- 函数执行上下文中, `this`的值取决于函数的调用方式, 具体有: 默认绑定,隐式绑定,显式绑定,new 绑定,箭头函数.

伪代码:

```js
GlobalExectionContext = {  // 全局执行上下文
  LexicalEnvironment: {    	  // 词法环境
    EnvironmentRecord: {   		// 环境记录
      Type: "Object",      		   // 全局环境
      // 标识符绑定在这里
  },
  outer: <null>,  	   		   // 对外部环境的引用
  this: <global object>,
}

FunctionExectionContext = { // 函数执行上下文
  LexicalEnvironment: {  	  // 词法环境
    EnvironmentRecord: {  		// 环境记录
      Type: "Declarative",  	   // 函数环境
      // 标识符绑定在这里 			  // 对外部环境的引用
  },
  outer: <Global or outer function environment reference>
  this: <depends on how function is called>,
}
```

### **VariableEnvironment(变量环境)**

变量环境也是一个词法环境, 因此它具有上面定义的词法环境的所有属性.

在 ES6 中, 词法环境和变量环境的区别在于: 前者存储函数声明和变量(`let`和`const`)绑定, 后者仅用于存储变量(`var`)绑定

## 执行上下文的执行阶段

下面是一个例子:

```js
let a = 20;
const b = 30;
var c;

function multiply(e, f) {
  var g = 20;
  return e * f * g;
}

c = multiply(20, 30);
```

在创建阶段, 全局执行上下文如下所示:

```js
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符绑定在这里
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>,
    this: <Global Object>,
  },

  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符绑定在这里
      c: undefined,
    }
    outer: <null>,
    this: <Global Object>,
  }
}
```

在执行阶段, 变量的赋值已经完成, 所以全局执行上下文在执行阶段是这样的:

```js
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      a: 20,
      b: 30,
      multiply: < func >
    }
    outer: <null>,
    ThisBinding: <Global Object>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}
```

当执行到`multiply(20, 30)`时, 会创建一个新的函数执行上下文来执行函数代码, 所以函数执行上下文在创建时如下所示:

```js
FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}
```

执行上下文进入执行阶段, 函数内部的变量已经赋值完成, 这时候的函数执行上下文如下所示:

```js
FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      g: 20
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}
```

在函数完成后, 返回值被存储在`c`中, 全局词法环境被更新, 全局代码执行完成, 程序结束.

## 变量提升和暂时性死区

在执行上下文中我们可以看到. 在执行上下文的创建阶段, 通过`let`和`const`声明的变量没有与它们关联的任何值, 而通过`var`声明的变量会被设置为`undefined`.

这是因为在创建阶段, 代码扫描变量和函数声明, 同时函数声明完全存储在环境中, 变量被设置为`undefined`(`var`)或者保持未初始化(`let`和`const`).

这就是为什么通过`var`声明的变量可以在声明前访问(变量提升), 而通过`let`和`const`声明的变量在声明前访问会报错(暂时性死区).

变量和函数都可以会发生变量提升, 并且函数声明的优先级高于变量声明, 下面看几个示例体会一下变量提升的规则.

示例 1, 变量提升:

```js
foo; // undefined
var foo = function () {
  console.log("foo1");
};

foo(); // foo1，foo赋值

var foo = function () {
  console.log("foo2");
};

foo(); // foo2，foo重新赋值
```

示例 2, 函数提升:

```js
foo(); // foo2
function foo() {
  console.log("foo1");
}

foo(); // foo2

function foo() {
  console.log("foo2");
}

foo(); // foo2
```

示例 3, 函数声明优先级大于变量声明

```js
foo(); // foo2
var foo = function () {
  console.log("foo1");
};

foo(); // foo1，foo重新赋值

function foo() {
  console.log("foo2");
}

foo(); // foo1
```

## 参考

> [木易杨前端进阶 - 理解JavaScript 中的执行上下文和执行栈](https://muyiy.cn/blog/1/1.1.html)
>
> [Sukhjinder Arora - Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)

```
本人才疏学浅 欢迎交流与指正
```
