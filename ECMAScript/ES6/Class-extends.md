# Class-extends

- 1.简介
- 2.`Object.getPrototypeOf()`
- 3.`super`关键字
- 4.类的`prototype`属性和`__proto__`属性
- 5.原生构造函数的继承
- 6.Mixin 模式的实现

https://es6.ruanyifeng.com/#docs/class-extends

## 1.简介

Class 可以通过`extends`关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

```javascript
class Point {}
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor
    this.color = color;
  }
  toString() {
    return this.color + " " + super.toString(); // 调用父类的toString()
  }
}
```

上面代码中，`constructor`方法和`toString`方法之中，都出现了`super`关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。
