# Class-extends

- 1.简介
- 2.`Object.getPrototypeOf()`
- 3.`super`关键字
- 4.类的`prototype`属性和`__proto__`属性
- 5.原生构造函数的继承
- 6.Mixin 模式的实现

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

父类的静态方法也会被子类继承.

## 2.Object.getPrototypeOf()

用来从子类上获取父类,可以用这个方法判断一个类是否继承了另一个类.

```javascript
Object.getProtptypeOf(ColorPoint) === Point; // true
```

## 3.super 关键字

super 可以作为函数使用,也可以作为对象使用.

当 super 作为函数调用时,代表父类的构造函数.子类的构造函数必须执行一次 super 函数,并且只能在子类的构造函数之中调用,在其他地方会报错.

当 super 作为对象时,在普通方法中,指向父类的原型对象; 在静态方法中,指向父类.

## 4.类的`prototype`属性和`__proto__`属性

(1) 子类的`__proto__`属性,表示构造函数的继承,总是指向父类.
(2) 子类`prototype`属性的`__proto__`属性,表示方法的继承,总是指向父类的`prototype`属性

```javascript
class A {}
class B extends A {}

B.__proto__ === A; // true
B.prototype.__proto__ === A.prototype; // true
```
