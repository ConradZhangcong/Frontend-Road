## JavaScript 内存空间详解

在之前的[浅析 JS(2): 深拷贝的实现](https://juejin.cn/post/6990384549129617444)的文章中讲到, 在递归层级过深的对象的时候, 可能会造成爆栈(内存溢出). 这是因为调用堆栈中函数调用的数量超过了调用堆栈的实际大小, 浏览器会抛出一个错误终止运行.

那么我们首先来看下一些常见数据结构:

- 栈: 一种`LIFO`(后进先出)的数据结构, 类似于乒乓球盒.
- 堆: 一种树状结构. 存取与书架相似, 只需要知道书名(`key`)就可以取出书(`value`).
- 队列: 一种`FIFO`(先进先出)的数据结构.

## 变量的存储

在[浅析 JS(1): 数据类型以及拷贝](https://juejin.cn/post/6987609789018669086)中讲过内存中有堆和栈, 基本数据类型的数据存储在占内存中; 而引用类型的数据, 值存在堆中, 内存地地址保存在栈中.

而`闭包`中的变量并不保存在占内存中, 而是保存在堆内存中, 所以函数执行之后为什么闭包还能引用到函数内部的变量.

```js
function A() {
  let a = 1;
  function B() {
    console.log(a);
  }
  return B;
}
```

函数 A 弹出调用栈后, 函数 A 的变量这时候是存储在堆上的, 所以函数 B 依旧能引用到函数 A 的变量.

## 内存空间管理

JavaScript 的内存生命周期是:

1. 内存分配: 声明变量,函数的时候, 系统会自动为它们分配内存.
2. 内存使用: 读写变量, 也就是使用变量,函数等.
3. 内存回收: 使用完毕后, 由垃圾回收机制自动回收不再使用的内存.

下面我们使用一个简单的例子来解释这个周期:

```js
var a = 20; // 在内存中给数值变量分配空间
alert(a + 100); // 使用内存
var a = null; // 使用完毕之后，释放内存空间
```

## 内存收回

Javscript 有自动垃圾回收机制, 其原理就是每隔一定时间去找到那些不再继续使用的值, 然后释放其占用的内存. JavaScript 中最常用的是通过`标记清除法`的算法来找到哪些对象是不再继续使用的.

因此在上面的例子中, 使用`a = null`其实仅仅只是做了一个释放引用的操作, 让`a`原本对应的值失去引用, 脱离执行环境, 这个值会在下一次垃圾收集器执行操作时被找到并释放. 而在适当的时候解除引用, 是为页面获得更好性能的一个重要方式.

在局部作用域中, 当函数执行完毕后, 局部变量就很容易被垃圾收集器识别并且回收. 但是全局变量什么时候需要释放内存空间则很难判断.

以 Google 的 V8 引擎为例, 对象都是通过堆来进行内存分配的. 在进行声明变量并且赋值的时候, V8 引擎会在内存中分配一部分给这个变量. 如果已申请的内存不足以存储这个变量就会继续申请内存, 直到 V8 引擎的内存上线(默认情况下, 在 64 位系统中是 1464MB, 在 32 位系统中是 732MB).

另外, V8 引擎对对内存中的 js 对象进行分代管理(新生代与老生代). 新生代指存活周期较短的对象, 如临时变量 字符串等; 老生代为经过多次垃圾回收仍然存活, 存活周期比较长的对象, 如主控制器, 服务器等.

## 垃圾回收算法

对于垃圾回收算法来说, 核心思想就是如何判断内存已经不再使用了.

### 引用计数法

引用计数法主要是看一个对象是否有指向它的喜爱那个, 如果没有对象指向它了, 说明该对象已经不再需要了. 下面看一个例子:

```js
// 创建一个对象person，他有两个指向属性age和name的引用
var person = {
  age: 12,
  name: "aaaa",
};

person.name = null; // 虽然设置为null，但因为person对象还有指向name的引用，因此name不会回收

var p = person;
person = 1; //原来的person对象被赋值为1，但因为有新引用p指向原person对象，因此它不会被回收

p = null; //原person对象已经没有引用，很快会被回收
```

标记清除法是一个简单有效的算法, 但是存在一个问题: 循环引用, 即如果两个对象相互引用, 尽管他们已经不再使用, 垃圾回收机制也不会进行回收, 导致内存泄漏. 如下:

```js
function cycle() {
  var o1 = {};
  var o2 = {};
  o1.a = o2;
  o2.a = o1;

  return "Cycle reference!";
}

cycle();
```

还有一些常见的 Dom 操作也可能会造成循环引用:

```js
var div = document.createElement("div");
div.onclick = function () {
  console.log("click");
};
```

变量 div 有事件处理函数的引用, 同时事件处理也有 div 的引用, 因为 div 变量在函数内部可以被访问, 所以就出现了循环引用.

### 标记清除法

现代浏览器已经不再使用引用计数法了, 大多是用基于标记清除法的某些改进算法.

标记清除法将"不再使用的对象"定义为"无法达到的对象". 从根部开始出发定时扫描内存中的对象, 凡是能从根部到达的对象, 就都是还需要使用的. 那些无法从根部出发获取到的对象则会进行回收.

标记清除法的垃圾回收步骤如下:

- 垃圾回收器获取根并“标记”它们。
- 然后它访问并“标记”所有来自它们的引用。
- 然后它访问标记的对象并标记它们的引用。所有被访问的对象都被记住，以便以后不再访问同一个对象两次。
- 以此类推，直到有未访问的引用(可以从根访问)为止。
- 除标记的对象外，所有对象都被删除。

### 其他

还有一些其他的垃圾回收算法比如: 标记压缩法, GC 复制法, 保守式 GC, 分代回收, 增量式 GC. 可以从下面参考中点击原文进行查看.

## 内存泄漏

程序的运行需要内存, 对于持续运行的程序进程, 必须及时释放不再使用到的内存. 否则内存占用会越来越高, 导致影响系统性能, 甚至导致程序奔溃.

不再使用到的内存没有及时被释放, 就叫做内存泄漏.

### 常见的内存泄漏

1. 意外的全局变量

```js
function foo(arg) {
  bar = "this is a hidden global variable";
  // 相当于
  // window.bar = "this is a hidden global variable";
}
```

在函数内部没有使用关键词声明变量, 实际上会把变量挂载到全局对象上, 意外创建一个全局变量

还有一个意外的全局变量可能由`this`创建:

```js
function foo() {
  this.variable = "potential accidental global";
}

// Foo 调用自己，this 指向了全局对象（window）
// 而不是 undefined
foo();
```

**解决方案**

在 js 文件头部加上`'use strict'`, 使用严格模式避免以外的全局变量, 此时上例中 this 指向 undefined. 如果必须使用全局变量存储大量数据时, 确保使用完后把它设置为`null`.

2. 被遗忘的计时器或者回调函数

常见的有计时器`setInterval`:

```js
var someResource = getData();
setInterval(function() {
    var node = document.getElementById('Node');
    if(node) {
        // 处理 node 和 someResource
        node.innerHTML = JSON.stringify(someResource));
    }
}, 1000);
```

在上面的例子中, 当`节点node`或者数据不再需要时, 定时器依旧指向这些数据. 所以当 node 节点被移除后, `setInterval`仍然存活并且垃圾回收器没办法回收, 它的依赖也没办法被回收, 除非终止定时器.

```js
var element = document.getElementById("button");
function onClick(event) {
  element.innerHTML = "text";
}

element.addEventListener("click", onClick);
```

上面的例子中, 它们不再需要或者关联的对象变成**不可达**, 需要明确的移除它们. 老版本的`IE`无法检测 DOM 节点与 js 代码之间的循环引用, 会导致内存泄漏.

在现代浏览器中使用了标记清除法的垃圾回收算法, 可以正确检测并且处理循环引用. 即回收节点内存时, 不必非要调用`removeEventListener`.

3. 脱离 DOM 的引用

如果把 DOM 存成字典或者数组, 此时同样的 DOM 元素存在两个引用: 一个在 DOM 树中, 一个在字典里. 那么将来需要把两个引用都清除掉, 比如下面的例子:

```js
var elements = {
  button: document.getElementById("button"),
  image: document.getElementById("image"),
  text: document.getElementById("text"),
};
function doStuff() {
  image.src = "http://some.url/image";
  button.click();
  console.log(text.innerHTML);
  // 更多逻辑
}
function removeButton() {
  // 按钮是 body 的后代元素
  document.body.removeChild(document.getElementById("button"));
  // 此时，仍旧存在一个全局的 #button 的引用
  // elements 字典。button 元素仍旧在内存中，不能被 GC 回收。
}
```

类似的一个例子关于表格: 如果代码中保存了表格某一个`td`的引用, 将来决定删除整个表格的时候, 因为`td`是表格的某个子节点, 子元素与父元素是引用管理, 由于代码保留了 td 的引用, 导致整个表格仍然在内存中.

4. 闭包

闭包的关键是匿名函数可以访问父级作用域的变量:

```js
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing) console.log("hi");
  };

  theThing = {
    longStr: new Array(1000000).join("*"),
    someMethod: function () {
      console.log(someMessage);
    },
  };
};

setInterval(replaceThing, 1000);
```

每次调用`replaceThing`, `theThing`得到一个包含一个大数组和一个新闭包(someMethod)的新对象. 同时, 变量`unused`是一个引用`originalThing`的闭包(先前的`replaceThing`又调用了`theThing`). `someMethod`可以通过`theThing`使用, `someMethod`与`unused`分享闭包作用域, 尽管`unused`从未使用, 它引用的`originalThing`迫使它保留在内存中(防止被回收).

**解决方案**

在`replaceThing`的最后添加`originalThing = null`.

### 内存泄漏识别的方法

1. 浏览器

以 Chrome 浏览器为例:

1. 打开开发者工具, 选择`Memory`面板
2. 在`Select profiling type`字段里面勾选`timeline`
3. 点击左上角的录制按钮
4. 在页面上进行各种操作, 模拟用户的使用情况
5. 一段时间后, 点击对话框的 stop 按钮, 面板上就会显示这段时间的内存占用情况

如果内存占用基本平稳, 接近水平则说明不存在内存泄漏, 如果一直处于一个上升的趋势, 那么就是内存泄漏了.

2. node

使用 node 提供的`process.memoryUsage`方法, 这个方法返回一个对象, 包含 node 进程的内存占用信息. 该对象包含四个属性, 单位是字节:

- rss(resident set size): 所有内存占用 包括指令区和堆栈
- heapTotal: "堆"占用的内存 包括用到的和没用到的
- heapUsed: 用到的堆的部分
- external: V8 引擎内部的 C++ 对象占用的内存

判断内存泄漏以`heapUsed`字段为准.

### Map 和 WeakMap

`WeakSet`和`WeakMap`对于值得引用是不计入垃圾回收机制的, 是弱引用. 当其他引用消失以后, 垃圾回收机制就可以释放内存.

下面以`WeakMap`为例, 看看它是怎么解决内存泄漏的.

```js
const wm = new WeakMap();

const element = document.getElementById("example");

wm.set(element, "some information");
wm.get(element); // "some information"
```

新建一个`WeakMap`实例, 将一个 DOM 节点作为键名存入该实例, 此时`WeakMap`里面对`element`的引用就是弱引用, 不会计入垃圾回收机制. 一旦消除对该节点的引用, 它占用的内存就会被垃圾回收机制释放, `WeakMap`保存的这个键值对也会自动消失.

下面我们使用`Node`的`process.memoryUsage()`方法, 通过`Node`命令行来具体看下内存使用情况:

首先打开`Node`命令行

```shell
# --expose-gc 表示允许手动执行垃圾回收机制
node --expose-gc
```

然后执行下面的代码:

```js
// 手动执行一次垃圾回收, 保证获取的内存使用状态准确
global.gc();
// undefined

// 查看内存占用的初始状态, heapUsed为4M左右
process.memoryUsage();
// {
//   rss: 24510464,
//   heapTotal: 5824512,
//   heapUsed: 4018592,
//   external: 877642,
//   arrayBuffers: 10481
// }

let wm = new WeakMap();
// undefined

let obj = new Object();
// undefined

global.gc();
// undefined

// 此时heapUsed变化不大 仍然为4M左右
process.memoryUsage();
// {
//   rss: 24829952,
//   heapTotal: 6356992,
//   heapUsed: 4295544,
//   external: 877658,
//   arrayBuffers: 10457
// }

// 在WeakMap里面添加一个键值对, 键名为obj的对象, 健值为长度5*1024*1024的数组
wm.set(obj, new Array(5 * 1024 * 1024));
// WeakMap { <items unknown> }

global.gc();
// undefined

// 此时 heapUsed为46M左右
process.memoryUsage();
// {
//   rss: 68509696,
//   heapTotal: 47783936,
//   heapUsed: 46001608,
//   external: 877635,
//   arrayBuffers: 10434
// }

// 解除对象obj的引用
obj = null;
// undefined

// 再次执行垃圾回收
global.gc();
// undefined

// 解除obj的引用后, heapUsed变回4M左右
// 说明WeakMap中那个长度为5*1024*1024的数组被销毁了
process.memoryUsage();
// {
//   rss: 26886144,
//   heapTotal: 5832704,
//   heapUsed: 4232000,
//   external: 877648,
//   arrayBuffers: 10447
// }
```

上面代码中, 只要外部的引用消失, `WeakMap`内部的引用就会自动被垃圾回收清除. 可以自己使用`Map`进行对比一下, 由此可见, 使用`WeakMap`的话, 解决内存泄漏会简单很多.

## 参考

> [JavaScript 深入之内存空间详细图解](https://muyiy.cn/blog/1/1.3.html)
>
> [JavaScript 深入之带你走进内存机制](https://muyiy.cn/blog/1/1.4.html)
>
> [几种垃圾回收算法](https://www.jianshu.com/p/a8a04fd00c3c)
>
> [浅谈 Chrome V8 引擎中的垃圾回收机制](https://www.cnblogs.com/liangdaye/p/4654734.html)
>
> [JavaScript 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)

```
本人才疏学浅 欢迎交流与指正
```
