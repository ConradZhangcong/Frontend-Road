# Class

Class 的基本语法

## 1.简介

### 类的由来

js 语言中,生成实例对象的传统方法是通过构造函数:

```javascript
function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.toString = function() {
  return '(' + this.x + ', ' + this.y + ')'
}

var p = new Point(1, 2)
```

es6 提供了更接近传统面向对象语言(c++ java 等)的写法,引入了`Class(类)`这个概念,作为对象的模板.通过`class`关键字,可以定义类.

基本上,es6 的`class`可以看做只是一个语法糖,它的绝大部分功能,es5 都可以做到,新的`class`写法只是让对象原型的写法更加清晰,更像面向对象变成的语法而已.上面的代码用 es6 的 class 改写,就是下面这样:

```javascript
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}
```

上面的代码定义了一个类,`constructor`方法就是构造方法,而`this`关键字代表实例对象.就是说 es5 的构造函数`Point`,对应 es6 的`Point`类的构造方法.`Point`类还定义了一个`toString`方法,前面不需要加上`function`关键字.**方法之间不需要逗号分隔**,否则会报错.

es6 的类,完全可以看错构造函数的另外一种写法.

```javascript
class Point {
  // ...
}

typeof Ponit // 'function'
Point === Point.prototype.constructor // true
```

构造函数的`prototype`属性,在 es6 的类上面继续存在.实际上,类的所有方法都定义在`prototype`属性上面.

```javascript
class Point {
  constructor() {}
  toString() {}
  toValue() {}
}
// 等同于
Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {}
}
```

在类的实例上面调用方法,其实就是调用原型上的方法:

```javascript
class B {}
let b = new B()

b.constructor === B.prototype.constructor // true
```

由于类的方法都定义在`prototype`对象上,所以类的新方法可以添加在`prototype`对象上面.`Object.assign`方法可以很方便地一次性向类添加多个方法.

```javascript
class Point {
  constructor() {}
}

Object.assign(Point.propotype, {
  toString() {},
  toValue() {}
})
```

类的内部所有定义的方法,都是不可枚举的(non-enumerable).

```javascript
class Point {
  constructor(x, y) {}
  toString() {}
}

console.log(Object.keys(Point.prototype)) // []

console.log(Object.getOwnPropertyNames(Point.prototype)) // ['constructor', 'toString']
```

上面代码中`toString`是`Point`类内部定义的方法,不可枚举,这一点与 es5 的行为**不一致**.

```javascript
var Point = function(x, y) {}
Point.prototype.toString = function() {}

console.log(Object.keys(Point.prototype)) // ['toString']

console.log(Object.getOwnPropertyNames(Point.prototype)) // ['constructor', 'toString']
```

### constructor 方法

`constructor`方法是类的默认方法,通过`new`命令生成对象实例时自动调用该方法.一个类必须有`constructor`方法,如果没有现实的定义,一个空的`constructor`方法会被默认添加:

```javascript
class Point {}
// 等同于
class Point {
  constructor() {}
}
```

`constructor`方法默认返回实例对象(即`this`),完全可以指定返回另外一个对象.

```javascript
class Foo {
  constructor() {
    return Object.create(null)
  }
}

console.log(new Foo() instanceof Foo) // false
```

上面代码中,`constructor`函数返回一个全新的对象,结果导致实例对象不是`Foo`类的实例.

类必须使用`new`调用,否则会报错,这是它跟普通构造函数的一个主要区别,后者不用`new`也可以执行.

```javascript
class Foo {
  constructor() {
    return Object.create(null)
  }
}

Foo() // TypeError: Class constructor Foo cannot be invoked without 'new'
```

### 类的实例

生成类的实例的写法,与 es5 一样,使用`new`命令.但是如果忘记使用`new`,像函数那样调用`Class`会报错.

与 es5 一样,实例的属性除非显示定义在其本身(即`this`对象上),否则都是定义在原型上(即定义在`class`上).

```javascript
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return `(${this.x}, ${this.y})`
  }
}

var point = new Point(1, 2)

console.log(point.toString()) // (1, 2)

console.log(point.hasOwnProperty('x')) // true
console.log(point.hasOwnProperty('y')) // true
console.log(point.hasOwnProperty('toString')) // false
console.log(point.__proto__.hasOwnProperty('toString')) // true
```

上面代码中,`x`和`y`都是实例对象`point`自身的属性(因为定义在`this`变量上),所以`hasOwnProperty`方法返回`true`,而`toString`是原型对象的属性(定义在`Point`类上),所以`hasOwnProperty`方法返回 false.这些都与 es5 的行为保持一致.

与 es5 一样,类的所有实例共享一个原型对象.

```javascript
var p1 = new Point(1, 2)
var p2 = new Point(2, 3)
p1.__proto__ === p2.__proto___ // true

p1.__proto__.printName = function() {
  return 'Opps'
}

p1.printName() // 'Opps'
p2.printName() // 'Opps'

var p3 = new Point(4, 2)
p3.printName() // 'Opps'
```

上面`p1`和`p2`都是`Point`的实例,他们的原型都是`Point.prototype`,所以`__proto__`属性都是相等的.也就是可以通过`__proto__`属性为类添加属性,但是这样会影响类的原始定义,影响到所有实例.

注: `__proto__`并不是语言本身的特性,是各大厂商具体实现时添加的私有属性,虽然很多现代浏览器的 js 引擎中都提供了这个私有属性,但不建议在生产中使用该属性,避免对环境产生依赖.生产环境中,我们可以使用`Object.getPrototypeOf`方法来获取实例对象的原型,然后再来为原型添加方法/属性.

### 取值函数(getter)和存值函数(setter)

与 es5 一样,在类的内部可以使用`get`和`set`关键字,对某个属性设置存值函数和取值函数,拦截该属性的存取行为.

```javascript
class MyClass {
  constructor() {}
  get prop() {
    return 'getter'
  }
  set prop(value) {
    console.log('setter:' + value)
  }
}

let inst = new MyClass()

inst.prop = 123 // setter:123

console.log(inst.prop) // getter
```

存值函数和取值函数都是设置在属性的`Descriptor`对象上的:

```javascript
class CustomHTMLElement {
  constructor(element) {
    this.element = element
  }
  get html() {
    return this.element.innerHTML
  }
  set html(value) {
    this.element.innerHTML = value
  }
}

var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, 'html')

'get' in descriptor // true
'set' in descriptor // true
```

上面代码中,存值函数和取值函数是定义在`html`属性的描述对象上面,这与 es5 完全一致.

### 属性表达式

类的属性名,可以采用表达式:

```javascript
let methodName = 'getArea'

class Square {
  constructor(length) {}
  [methodName]() {}
}
// 方法名getArea是从表达式得到的
```

### Class 表达式

与函数一样,类也可以使用表达式的形式定义.

```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name
  }
}
```

上面代码使用表达式定义了一个类.需要注意的是,这个类的名字是`Me`,但是`Me`只在 Class 内部可以使用,指代当前类.在 Class 外部,这个类只能用`MyClass`引用.

```javascript
let inst = new MyClass()
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```

如果类的内部没有用到的话,可以省略`Me`:

```javascript
const MyClass = class {
  /* ... */
}
```

使用 Class 表达式,可以写出立即执行的 Class:

```javascript
let person = new (class {
  constructor(name) {
    this.name = name
  }
  sayName() {
    console.log(this.name)
  }
})('张三')

person.sayName() // '张三'
```

### 注意点

#### 严格模式

在类和模块的内部,默认就是严格模式,所以不需要`use strict`指定运行模式.

#### 不存在提升

类不存在变量提升(hoist),这一点与 es5 完全不同.

```javascript
new Foo() // ReferenceError
class Foo {}
```

```javascript
{
  let Foo = class {}
  class Bar extends Foo {}
}
```

#### name 属性

由于本质上,es6 的类只是 es5 的构造函数的一层包装,所以函数的许多特性都被`class`继承,包括`name`属性.

```javascript
class Point {}
Point.name // 'Point'
```

`name`属性总是返回紧跟在`class`关键字后面的类名.

#### Generator 方法

如果在某个方法之前加上星号(`*`),就表示该方法是一个`Generator`函数

```javascript
class Foo {
  constructor(...args) {
    this.args = args
  }
  *[Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x)
}
// 'hello'
// 'world'
```

#### this 的指向

类的方法内部如果含有`this`,它默认指向类的实例.但是,必须非常小心,一旦单独使用该方法,很可能报错.

```javascript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`)
  }
  print(text) {
    console.log(text)
  }
}

const logger = new Logger()
const { printName } = logger
printName()
```

上面代码中,`printName`方法中的`this`,默认指向`Logger`类的实例.但是,如果将这个方法提取出来单独使用,`this`会指向该方法运行时所在的环境(`undefined`),从而导致找不到`print`方法而报错.

一个比较简单的解决方法是在构造函数方法内绑定`this`,这样就不会找不到`print`方法了.

```javascript
class Logger {
  constructor() {
    this.printName = this.printName.bind(this)
  }
  // ...
}
```

另一个解决方式是使用箭头函数

```javascript
class Obj {
  constructor() {
    this.getThis = () => this
  }
}
const myObj = new Obj()
myObj.getThis() === myObj // true
```

箭头函数内部的`this`总是指向定义时所在的对象.上面代码中,箭头函数位于构造函数内部,它的定义生效的时候,是在构造函数执行的时候.这时,箭头函数所在的运行环境,肯定是实例对象,所以`this`会总是指向实例对象.

还有一种解决方法是使用`Proxy`,获取方法的时候,自动绑定`this`.

```javascript
function selfish(target) {
  const cache = new WeakMap()
  const handler = {
    get(target, key) {
      const value = Reflect.get(target, key)
      if (typeof value !== 'function') {
        return value
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target))
      }
      return cache.get(value)
    }
  }
  const proxy = new Proxy(target, handler)
  return proxy
}

const logger = selfish(new Logger())
```

## 2.静态方法

类是实例的原型,所有在类中定义的方法,都会被实例继承.如果在一个方法前加上`static`关键字,就表示该方法不会被实例继承,而是直接通过类来调用,这就被成为**静态方法**.

```javascript
class Foo {
  static classMethod() {
    return 'hello'
  }
}
console.log(Foo.classMethod()) // 'hello'

let foo = new Foo()
foo.classMethod() // TypeError: foo.classMethod is not a function
```

注意: 如果静态方法包含`this`关键字,这个`this`指向的是类,而不是实例.

```javascript
class Foo {
  static bar() {
    this.baz()
  }
  static baz() {
    console.log('hello')
  }
  baz() {
    console.log('world')
  }
}

Foo.bar() // 'hello'
```

父类的静态方法,可以被子类继承.

```javascript
class Foo {
  static classMethod() {
    return 'hello'
  }
}
class Bar extends Foo {}
Bar.classMethod() // 'hello'
```

静态方法也是可以从`super`对象上调用的.

```javascript
class Foo {
  static classMethod() {
    return 'hello'
  }
}
class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ',too'
  }
}
Bar.classMathod() // 'hello,too'
```

## 3.实例属性的新写法

实例属性除了定义在`constructor()`方法里面的`this`上面,也可以定义在类的最顶层.

```javascript
class IncreasingCounter {
  constructor() {
    this._count = 0
  }
  get value() {
    console.log('getting the cuurent value!')
    return this._count
  }
  increment() {
    this._count++
  }
}
```

上面代码中,实例属性`this._count`定义在`constructor()`方法里面.另一种写法是,这个属性也可以定义在类的最顶层,其他都不变.

```javascript
class IncreasingCounter {
  _count = 0
  get value() {
    console.log('getting the cuurent value!')
    return this._count
  }
  increment() {
    this._count++
  }
}
```

上面代码中,实例属性`_count`与取值函数`value()`和`increment()`方法,处于同一个层级.这时,不需要在实例属性前面加上`this`.

这种新写法的好处就是,所有实例对象自身的属性都定在类的头部,看上去比较整齐,一眼就能看出来这个类有哪些实例属性.

```javascript
class Foo {
  bar = 'hello'
  baz = 'world'
  constructor() {}
}
```

## 4.静态属性

静态属性指的是 Class 本身的属性,即`Class.propName`,而不是定义在实例对象(`this`)上的属性.

```javascript
class Foo {}
Foo.prop = 1
Foo.prop // 1
```

上面的写法为`Foo`类定义了一个静态属性 prop.

目前只有这种写法可行,因为 es6 明确规定,class 内部只有静态方法,没有静态属性.现在有一个提案提供了类的静态属性,写法是在实例属性的前面,加上`static`关键字.

```javascript
class MyClass {
  static myStaticProp = 42
  constructor() {
    console.log(MyClass.myStaticProp) // 42
  }
}
```

## 5.私有方法和私有属性

### 现有的解决方案

私有方法和私有属性,是只能在类的内部访问的方法和属性,外部不能访问.这是常见需求,有利于代码的封装,但是 es6 不提供,只能通过变通方法模拟实现.

一种做法是在命名上加以区别:

```javascript
class Widge {
  // 公有方法
  foo(baz) {
    this._baz(baz)
  }
  // 私有方法
  _baz(baz) {
    return (this.snaf = baz)
  }
}
```

上面的代码中,`_bar`方法前面的下划线,表示这是一个只限于内部使用的私有方法.但是这种命名是不保险的,在类的外部,还是可以调用这个方法.

另一种方法就是索性将私有方法移出模块,因为模块内部的所有方法都是对外可见的.

```javascript
class Widget {
  foo(baz) {
    bar.call(this, baz)
  }
  // ...
}
function bar(baz) {
  return (this.snaf = baz)
}
```

上面代码中,`foo`是公开方法,内部调用了`bar.call(this, baz)`.这使得`bar`实际上成为了当前模块的私有方法.

还有一种方法是利用`Symbol`值的唯一性,将私有方法的名字命名为一个`Symbol`值.

```javascript
const bar = Symbol('bar')
const snaf = Symbol('snaf')

export default class myClass {
  // 共有方法
  foo(baz) {
    this[baz](baz)
  }
  [baz](baz) {
    return (this[snaf] = baz)
  }
}
```

`bar`和`snaf`都是`Symbol`值,一般情况下无法获取到它们,因此达到了私有方法和私有属性的效果.但是也不是绝对不行,`Reflect.ownKeys()`任然可以拿到它们.

```javascript
const inst = new MyClass()

Reflect.ownKeys(myClass.prototype) // [ 'constructor', 'foo', Symbol(bar) ]
```

### 私有属性的提案

目前有个提案是为`class`加了私有属性.方法是在属性名之前,用`#`表示.

```javascript
class IncreasingCounter {
  #count = 0
  get value() {
    console.log('Getting the current value')
    return this.#count
  }
  increment() {
    this.#count++
  }
}
```

`#count`就是私有属性,只能在类的内部使用`this.#count`,如果在类的外部使用就会报错.

```javascript
const counter = new IncreasingCounter()
counter.#count // Uncaught SyntaxError: Private field '#count' must be declared in an enclosing class
```

下面是另外一个例子:

```javascript
class Point {
  #x
  constructor(x = 0) {
    this.#x = +x
  }
  get x() {
    return this.#x
  }
  set x(value) {
    this.#x = +value
  }
}
```

这种写法不仅可以写私有属性,还可以用来写私有方法.

```javascript
class Foo {
  #a
  #b
  constructor(a, b) {
    this.#a = a
    this.#b = b
  }
  #sum () {
    return #a + #b
  }
  printSum () {
    console.log(this.#sum())
  }
}
```

私有属性也可以设置`getter`和`setter`方法

```javascript
class Counter {
  #xValue = 0
  constructor() {
    super()
  }

  get #x () { return #xValue }
  set #x (value) {
    this.#xValue = value
  }
}
```

`#x`是一个私有属性,它的读写都通过`get #x()`和`set #x()`来完成.

私有属性不限于从`this`引用,只要是在类的内部,实例也可以引用私有属性.

```javascript
class Foo {
  #privateValue = 42
  static getPrivateValue(foo) {
    return foo.#privateValue
  }
}
Foo.getgetPrivateValue(new Foo())
```

私有属性和私有方法前面,也可以加上`static`关键字,表示这是个静态的私有属性或方法.

```javascript
class FakeMath{
  static PI = 22/7
  static #totallyRandomNumber = 4

  static #computeRandomNumber (){
    return FakeMath.#totallyRandomNumber
  }
  static random(){
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber // 报错
FakeMath.#computeRandomNumber() // 报错
```

## 6.new.target 属性

`new`是从构造函数生成实例对象地命令.es6 为`new`命令引入了一个`new.target`属性,该属性一般用在构造函数之中,返回`new`命令作用于的那个构造函数.

如果构造函数不是通过`new`或者`Reflect.construct()`调用的,`new.target`会返回`undefined`,因此这个属性可以用来确定构造函数是怎么调用的.

```javascript
function Person(name) {
  if (new.target !== undefined) {
    this.name = name
  } else {
    throw new Error('必须使用new命令生成实例')
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name
  } else {
    throw new Error('必须使用new命令生成实例')
  }
}

var person = new Person('张三') // 成功
var notAPerson = Person.call(person, '张三') // Error: 必须使用new命令生成实例
```

Class 内部调用`new.target`返回当前 class.

```javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle)
    this.length = length
    this.width = width
  }
}

let obj = new Rectangle(3, 4) // true
```

需要注意的是,**子类继承父类时,`new target`会返回子类.**

```javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle)
    // ...
  }
}

class Square extends Rectangle {
  constructor(length, width) {
    super(length, width)
  }
}

let obj = new Square(3) // false
```

利用这个特点,可以写出不能独立使用,必须继承后才能使用的类.

```javascript
class Shape {
  constructor(length, width) {
    if (new.target === Shape) {
      throw new Error('本类不能实例化')
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super(length, width)
  }
}

let x = new Shape() // 报错
let y = new Rectangle(3, 4) // 正确
```

注意, 在函数外部,使用`new.target`会报错.
