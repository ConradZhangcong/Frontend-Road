# ECMAScript

参考:

[阮一峰 - ECMAScript6 入门](http://es6.ruanyifeng.com/)

[掘金 - ES6、ES7、ES8、ES9、ES10 新特性一览](https://juejin.im/post/5ca2e1935188254416288eb2)

[微信公众号(前端散记) - ES2016, 2017 和 2018 到底有哪些新功能？](https://mp.weixin.qq.com/s/A4Z8D3IlSsw1XnP3wFbJHg)

[掘金 - 种草 ES2020 新特性](https://juejin.im/post/5e09ca40518825499a5abff7)

[思否 - 「译」内存管理碰撞课程](https://segmentfault.com/a/1190000009878588)

[掘金 - [译] JavaScript：ES2019 的新特性](https://juejin.im/post/5d4ada17518825056144d865)

## ECMAScript 和 JavaScript 的关系

ECMAScript 和 JavaScript 的关系是,前者是后者的规格,后者是前者的一种实现.(另外的 ECMAScript 方言还有 JScript 和 ActionScript)

## ES2015(./ES2015)

## ES2016(./ES2016.md)

## ES2017(./ES2017.md)

## ES2018(./ES2018.md)

## ES2019(./ES2019.md)

## ES2020(./ES2020.md)

## es6新特性

1.ES6引入来严格模式
    变量必须声明后在使用
    函数的参数不能有同名属性, 否则报错
    不能使用with语句 (说实话我基本没用过)
    不能对只读属性赋值, 否则报错
    不能使用前缀0表示八进制数,否则报错 (说实话我基本没用过)
    不能删除不可删除的数据, 否则报错
    不能删除变量delete prop, 会报错, 只能删除属性delete global[prop]
    eval不会在它的外层作用域引入变量
    eval和arguments不能被重新赋值
    arguments不会自动反映函数参数的变化
    不能使用arguments.caller (说实话我基本没用过)
    不能使用arguments.callee (说实话我基本没用过)
    禁止this指向全局对象
    不能使用fn.caller和fn.arguments获取函数调用的堆栈 (说实话我基本没用过)
    增加了保留字（比如protected、static和interface）

2.关于let和const新增的变量声明

3.变量的解构赋值

4.字符串的扩展
    includes()：返回布尔值，表示是否找到了参数字符串。
    startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
    endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
5.数值的扩展
    Number.isFinite()用来检查一个数值是否为有限的（finite）。
    Number.isNaN()用来检查一个值是否为NaN。
6.函数的扩展
    函数参数指定默认值
7.数组的扩展
    扩展运算符
8.对象的扩展
    对象的解构
9.新增symbol数据类型

10.Set 和 Map 数据结构 
    ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。 Set 本身是一个构造函数，用来生成 Set 数据结构。
    
    Map它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
11.Proxy
    Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问
    都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
    Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
    Vue3.0使用了proxy
12.Promise
    Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
    特点是：
        对象的状态不受外界影响。
        一旦状态改变，就不会再变，任何时候都可以得到这个结果。
13.async 函数 
    async函数对 Generator 函数的区别：
    （1）内置执行器。
    Generator 函数的执行必须靠执行器，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
    （2）更好的语义。
    async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
    （3）正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
    （4）返回值是 Promise。
    async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。
14.Class 
    class跟let、const一样：不存在变量提升、不能重复声明...
    ES6 的class可以看作只是一个语法糖，它的绝大部分功能
    ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
15.Module
    ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。
    import和export命令以及export和export default的区别
