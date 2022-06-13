# 作用域

## 作用域

作用域指源代码定义变量的区域, 规定了如何查找变量, 确定当前执行代码对变量的访问权限.

js 采用词法作用域(Lexical scoping), 也就是静态作用域.

## 静态作用域与动态作用域

js 采用词法作用域, 函数的作用域在函数定义的时候就确定了; 而动态作用域是在函数调用的时候才确定的.

```js
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar();
```

## 参考文章

[JavaScript 深入之词法作用域和动态作用域](https://github.com/mqyqingfeng/Blog/blob/master/articles/%E6%B7%B1%E5%85%A5%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0/JavaScript%E6%B7%B1%E5%85%A5%E4%B9%8B%E8%AF%8D%E6%B3%95%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%92%8C%E5%8A%A8%E6%80%81%E4%BD%9C%E7%94%A8%E5%9F%9F.md)
