# 执行上下文

js 的可执行代码类型有: 全局代码, 函数代码, eval 代码.

在 js 代码执行可执行代码块时, 会创建对应的执行上下文. 每个执行上下文都有三个重要的属性:

- 变量对象(Variable object)
- 作用域链(Scope chain)
- this

## 变量对象

变量对象是与执行上下文相关的数据作用域, 存储了上下文中定义的变量和函数声明. 不同执行上下文的变量对象稍有不同.



## 参考文章

[JavaScript 深入之执行上下文栈](https://github.com/mqyqingfeng/Blog/blob/master/articles/%E6%B7%B1%E5%85%A5%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0/JavaScript%E6%B7%B1%E5%85%A5%E4%B9%8B%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E6%A0%88.md)

[JavaScript 深入之变量对象](https://github.com/mqyqingfeng/Blog/blob/master/articles/%E6%B7%B1%E5%85%A5%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0/JavaScript%E6%B7%B1%E5%85%A5%E4%B9%8B%E5%8F%98%E9%87%8F%E5%AF%B9%E8%B1%A1.md)
