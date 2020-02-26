# Symbol

## 概述

ES6 引入了一种新的`原始数据类型` `Symbol`,表示独一无二的值.是 js 的第七种数据类型,前六种是:`undefined`,`null`,布尔值(Boolean),字符串(String),数值(Number),对象(Object).

Symbol 值通过`Symbol函数`生成.对象的属性名现在可以有两种类型,一种是原来的字符串,一种是新增的 Symbol 类型.凡是属性名属于 Symbol 类型,就都是独一无二的,可以保证不会与其他属性名产生冲突.

```javascript
let s = Symbol()
console.log(typeof s) // symbol
```

注意`Symbol函数`前面不能使用`new`命令,否则会报错.因为生成的 Symbol 是一个`原始类型`的值,不是对象.

`Symbol函数`可以接受一个字符串作为参数,表示对 Symbol 实例的描述,主要是为了在控制台显示,或者转化为字符串时容易区分.参数表示对 Symbol 值的描述,因此相同参数的 Symbol 函数的返回值也是不相等的.

```javascript
let s1 = Symbol('foo')
let s11 = Symbol('foo')
let s2 = Symbol('bar')
let s22 = Symbol('bar')

console.log(s1) // Symbol(foo)
console.log(s11) // Symbol(foo)
console.log(s2) // Symbol(bar)
console.log(s22) // Symbol(bar)

console.log(s1.toString()) // 'Symbol(foo)'
console.log(s2.toString()) // 'Symbol(bar)'

conosle.log(s1 === s11) // false
conosle.log(s2 === s22) // false
```

如果 Symbol 的参数是一个对象,就会调用对象的`toString`方法,将其转为字符串,然后才生成一个 Symbol.

```javascript
const obj = {
  toString() {
    return 'abc'
  }
}

const sym = Symbol(obj)

console.log(sym) // Symbol(abc)
```

Symbol 值不可以与其他类型的值进行计算,会报错;但是可以显示转为字符串,可以转为布尔值,但是不能转为数值:

```javascript
let sym = Symbol('sym')

console.log('symbol' + sym) // TypeError: Cannot convert a Symbol value to a string

// 转为字符串
console.log(String(sym)) // 'Symbol(sym)'
console.log(sym.toString()) // 'Symbol(sym)'

// 转为布尔值
console.log(Boolean(sym)) // true
console.log(!sym) // false

if (sym) {
  console.log('true')
}
```

## Symbol.prototype.description

创建 Symbol 时可以添加一个描述,读取时需要将 Symbol 显示转为字符串:

```javascript
const sym = Symbol('foo')

String(sym) // 'Symbol(sym)'
sym.toSrting // 'Symbol(sym)'
```

上面的用法不是很方便,ES2019 提供了一个实例属性`description`,直接返回 Symbol 的描述:

```javascript
let sym = Symbol('sym')
console.log(sym.description) // 'sym'
```

## 作为属性名的 Symbol

由于每个 Symbol 值都是不相等的,这意味着 Symbol 值可以作为标识符,用于对象的属性名,保证不会出现同名的属性.

```javascript
let sym = Symbol()

// 第一种写法
let a = {}
a[sym] = 'hello'

// 第二种写法
let a = {
  [sym]: 'hello'
}

let a = {}
Object.defineProperty(a, sym, { value: 'hello' })

// 以上写法都得到同样的结果
console.log(a[sym]) // 'hello'
```

当 Symbol 值作为对象属性名时,不能用点运算符,点运算符表示的属性名实际上是个字符串,而不是一个 Symbol 值.

```javascript
const sym = Symbol()
const a = {}
a.sym = 'Hello'
a[sym] = 'World'

console.log(a[sym])
console.log(a['sym'])

let s = Symbol()
let obj = {
  [s](arg) {
    console.log(arg)
  }
}

obj[s](123)
```

Symbol 类型可以用于定义一组常量,保证这组常量的值都是不相等的.常量使用 Symbol 的最大好处就是其他任何值都不可能有相同的值了,可以保证 switch 语句按照设计的方式工作.需要注意的是,Symbol 的值作为属性名时,该属性还是公开属性,不是私有属性.

```javascript
const log = {}

log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
}

console.log(log.levels.DEBUG) // Symbol(debug)
console.log(log.levels.INFO) // Symbol(info)
```

下面是另外一个例子:

```javascript
const COLOR_RED = Symbol()
const COLOR_GREEN = Symbol()

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN
    case COLOR_GREEN:
      return COLOR_RED
    default:
      throw new Error('Undefined color')
  }
}
```

## 实例:消除魔术字符串

魔术字符串指的是,在代码中多次出现,与代码形成强耦合的某一个具体的字符串或者数值.良好的代码风格应该尽量消除魔术字符串,改用含义清晰的变量代替.

```javascript
function getArea(shape, options) {
  let area = 0

  switch (shape) {
    case 'Triangle':
      area = 0.5 * options.width * options.height
      break
    /* .... */
  }

  return area
}

getArea('Triangle', { width: 100, height: 100 })
```

上面代码中,字符串`Triangle`就是一个魔术字符串,与代码形成强耦合,不利于将来的维护和修改.

常用的消除魔术字符串的方法,就是把它写成一个变量:

```javascript
const shapeType = {
  triangle: 'Triangle'
}

function getArea(shape, options) {
  let area = 0

  switch (shape) {
    case shapeType.triangle:
      area = 0.5 * options.width * options.height
      break
    /* .... */
  }

  return area
}

getArea(shapeType.triangle, { width: 100, height: 100 })
```

可以使用 Symbol 代替上述代码中`shapeType对象`的`triangle属性`,`shapeType.triangle`代表的值不重要,只要保证不会与其他`shapeType`的属性冲突即可

```javascript
const shapeType = {
  triangle: Symbol()
}
```

## 属性名的遍历

Symbol 作为属性名,遍历对象的时候,该属性不会出现在`for...in`,`for...of`循环中,也不会被`Object.getOwnPropertyNames()`,`JSON.stringify()`返回.

但是它也不是私有属性,有一个`Object,getOwnPropertySymbols()`方法,可以获取指定对象的所有 Symbol 属性名.该方法返回一个数组,成员是当前对象的所有用作属性名的 Symbol 值.

```javascript
const obj = {}

let a = Symbol('a')
let b = Symbol('b')

obj[a] = 'Hello'
obj[b] = 'World'

console.log(obj) // { [Symbol(a)]: 'Hello', [Symbol(b)]: 'World' }

console.log(Object.getOwnPropertySymbols(obj)) // [ Symbol(a), Symbol(b) ]

for (let i in obj) {
  console.log(i) // 无输出
}

console.log(Object.getOwnPropertyNames(obj)) // []
```

另一个新的 API,`Reflect.ownKeys()`方法可以返回所有类型的键名,包括常规键名和 Symbol 键名.

```javascript
let obj = {
  [Symbol('sym')]: 1,
  enum: 2,
  nonEnum: 3
}

console.log(Reflect.ownKeys(obj)) // [ 'enum', 'nonEnum', Symbol(sym) ]
```

由于以 Symbol 值作为键名不会被常规方法遍历得到.我们可以利用这个特性,为对象定义一些非私有的,但是又只用于内部的方法.

```javascript
let size = Symbol('size')

class Collection {
  constructor() {
    this[size] = 0
  }

  add(item) {
    this[this[size]] = item
    this[size]++
  }

  static sizeOf(instance) {
    return instance[size]
  }
}

let x = new Collection()
console.log(Collection.sizeOf(x)) // 0

x.add('foo')
console.log(Collection.sizeOf(x)) // 1

console.log(Object.keys(x)) // [ '0' ]
console.log(Object.getOwnPropertyNames(x)) // [ '0' ]
console.log(Object.getOwnPropertySymbols(x)) // [ Symbol(size) ]
```

## Symbol.for(), Symbol.keyFor()

`Symbol.for()`会在全局注册一个 Symbol 值,并且可以重复使用,它接受一个字符串作为参数,然后搜索有没有以该参数作为名称的 Symbol 值.如果有就返回这个 Symbol 值,没有就新建一个以该字符串为名称的 Symbol 值,并将其注册到全局.

```javascript
let s1 = Symbol.for('foo')
let s2 = Symbol.for('foo')
let s3 = Symbol('foo')

console.log(s1 === s2) // true
console.log(s1 === s3) // false
console.log(s2 === s3) // false
```

`Symbol.keyFor()`方法返回一个已登记的 Symbol 类型值的`key`.

```javascript
let s1 = Symbol.for('foo')
let s2 = Symbol('foo')

console.log(Symbol.keyFor(s1)) // 'foo'
console.log(Symbol.keyFor(s2)) // undefined
```

**注意**: `Symbol.for()`为 Symbol 值登记的名字,是全局环境的,不管是否在全局环境运行.

```javascript
function foo() {
  return Symbol.for('bar')
}

const x = foo()
const y = Symbol.for('bar')

console.log(x === y) // true
```

## 实例: 模块的 Singleton 模式

Singleton 模式指的是调用一个类,任何时候返回的都是同一个实例.

在 Node 中可以将实例对象放在顶层对象 global 中.保证每次执行某个模块文件时,返回的都是同一个实例.

```javascript
// mod.js
function A() {
  this.foo = 'hello'
}

if (!global._foo) {
  global._foo = new A()
}

module.exports = global._foo

// index.js
const a = require('./mod.js')

console.log(a.foo) // hello
```

但是在这里`global._foo`是可写的,任何文件都可以修改.

```javascript
// index.js
global._foo = { foo: 'world' }

const a = require('./mod.js')

console.log(a.foo) // world
```

为了防止这种情况出现,我们就可以使用 Symbol:

```javascript
// mod.js
const FOO_KEY = Symbol.for('foo')

function A() {
  this.foo = 'hello'
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A()
}

module.exports = global[_foo]
```

上面的代码中,可以保证`global[FOO_KEY]`不会被无意间覆盖,但是还是可以被改写.

```javascript
global[Symbol.for('foo')] = { foo: 'world' }
```

如果键名使用 Symbol 方法生成,那么外部将无法引用这个值,当然也就无法改写.但是如果多次执行这个脚本,每次得到的`FOO_KEY`都是不一样的.

```javascript
const FOO_KEY = Symbol('foo')
```

## 内置的 Symbol 值

ES6 提供了 11 个内置的 Symbol 值,指向语言内部使用的方法.

### Symbol.hasInstance

对象的 Symbol.hasInstance 属性,指向一个内部方法.当其他对象使用 instanceof 运算符时会调用这个方法.比如,`foo instanceof Foo`在语言内部,实际上调用的是`Foo[Symbol.hasInstance](foo)`

```javascript
class MyClass {
  [Symbol.hasInstance](foo) {
    console.log('调用方法')
    return foo instanceof Array
  }
}

;[1, 2, 3] instanceof new MyClass() // true
// 调用方法
```

### Symbol.isConcatSpreadable

对象的`Symbol.isConcatSpreadable`属性等于一个布尔值,表示该对象用于 Array.prototype.concat()时,是否可以展开.数组的默认行为是可以展开,该值默认为`undefined`,当值为`true`时也有展开的效果.

```javascript
let arr1 = ['c', 'd'][('a', 'b')].concat(arr1, 'e') // [ 'a', 'b', 'c', 'd', 'e' ]
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd']
arr2[Symbol.isConcatSpreadable] = false[('a', 'b')].concat(arr2, 'e') // [ 'a', 'b', [ 'c', 'd', [Symbol(Symbol.isConcatSpreadable)]: false ], 'e' ]
```

类似数组的对象正好相反,默认不展开,当值为`true`时才可以展开.

```javascript
let obj = { length: 2, 0: 'c', 1: 'd' }[('a', 'b')].concat(obj, 'e') // [ 'a', 'b', { '0': 'c', '1': 'd', length: 2 }, 'e' ]

obj[Symbol.isConcatSpreadable] = true[('a', 'b')].concat(obj, 'e') // [ 'a', 'b', 'c', 'd', 'e' ]
```

`Symbol.isConcatSpreadable`属性也可以定义在类里面.

```javascript
class A1 extends Array {
  constructor(args) {
    super(args)
    this[Symbol.isConcatSpreadable] = true
  }
}

class A2 extends Array {
  constructor(args) {
    super(args)
  }
  get [Symbol.isConcatSpreadable]() {
    return false
  }
}

let a1 = new A1()
a1[0] = 3
a1[1] = 4
let a2 = new A2()
a2[0] = 5
a2[1] = (6)[(1, 2)].concat(a1).concat(a2) // [ 1, 2, 3, 4, A2 [ 5, 6 ] ]
```

### Symbol.species

对象的`Symbol.species`属性,指向一个构造函数.创建衍生对象时会使用该属性.

```javascript
class MyArray extends Array {}

const a = new MyArray(1, 2, 3)
const b = a.map(x => x)
const c = a.filter(x => x > 1)

console.log(a instanceof MyArray) // ture
console.log(b instanceof MyArray) // ture
console.log(c instanceof MyArray) // ture
```

上面代码中,子类`MyArray`继承了父类`Array`,`a`是`Array`的实例,`b`和`c`是`a`的衍生对象,也是`MyArray`的实例.

定义`Symbol.species`属性,创建衍生对象时会使用这个属性返回的函数作为构造函数.

```javascript
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array
  }
}

const a = new MyArray()
const b = a.map(x => x)

console.log(a instanceof MyArray) // true
console.log(b instanceof MyArray) // false
console.log(b instanceof Array) // true
```

### Symbol.match

对象的`Symbol.match`属性,指向一个函数.当执行`str.match(myObject)`时,如果该属性存在,会调用它,返回该方法的返回值.

```javascript
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)
```

下面是一个例子:

```javascript
class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string)
  }
}

'e'.match(new MyMatcher())
```

### Symbol.replace

对象的`Symbol.replace`属性,指向一个方法.当该对象被`String.prototype.replace`方法调用时,会返回该方法的返回值.

```javascript
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)
```

下面是一个例子:

```javascript
const x = {}
x[Symbol.replace] = (...s) => console.log(s)

'Hello'.replace(x, 'World') // [ 'Hello', 'World' ]
```

`Symbol.replace`方法会接受两个参数,第一个参数是`replace`方法正在作用的对象,第二个参数是替换后的值.

### Symbol.search

对象的`Symbol.search`属性,指向一个方法,当对象被`String.prototype.search`方法调用时,会返回该方法的返回值.

```javascript
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)
```

下面是一个例子:

```javascript
class MySearch {
  constructor(value) {
    this.value = value
  }
  [Symbol.search](string) {
    return string.indexOf(this.value) + 1
  }
}

console.log('foobar'.search(new MySearch('foo'))) // 1
```

### Symbol.split

对象的`Symbol.split`属性,指向一个方法,当该对象被`String.prototype.split`方法调用时,会返回该方法的返回值

```javascript
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)
```

下面是一个例子:

```javascript
class MySplitter {
  constructor(value) {
    this.value = value
  }
  [Symbol.split](string) {
    let index = string.indexOf(this.value)
    if (index === -1) {
      return string
    }
    return [string.substr(0, index), string.substr(index + this.value.length)]
  }
}

console.log('foobar'.split(new MySplitter('foo'))) // ['', 'bar']
console.log('foobar'.split(new MySplitter('bar'))) // ['foo', '']
console.log('foobar'.split(new MySplitter('baz'))) // 'foobar'
```

### Symbol.iterator

对象的`Symbol.iterator`属性,指向该对象的默认遍历器方法.

```javascript
const myIterator = {}
myIterator[Symbol.iterator] = function*() {
  yield 1
  yield 2
  yield 3
}

console.log([...myIterator]) // [ 1, 2, 3 ]
```

对象进行`for...of`循环时,会调用`Symbol.iterator`方法,返回该对象的默认遍历器.

```javascript
class Collection {
  *[Symbol.iterator]() {
    let i = 0
    while (this[i] !== undefined) {
      yield this[i]
      ++i
    }
  }
}

let myCollection = new Collection()
myCollection[0] = 1
myCollection[1] = 2

for (let value of myCollection) {
  console.log(value)
}
// 1
// 2
```

### Symbol.toPrimitive

对象的`Symbol.toPrimitive`属性,指向一个方法.该对象被转为原始类型的值时,会调用这个方法,返回该对象对应的原始类型值.

`Symbol.toPrimitive`被调用时,会接受一个字符串参数,表示当前运算的模式,一共有三种模式.

- Number: 转为数值
- String: 转为字符串
- Default: 可以转为数值,也可转为字符串

```javascript
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123
      case 'string':
        return 'str'
      case 'default':
        return 'default'
      default:
        throw new Error()
    }
  }
}

console.log(2 * obj) // 246
console.log(3 + obj) // '3default'
console.log(obj == 'default') // true
console.log(String(obj)) // str
```

### Symbol.toStringTag

对象的`Symbol.toStringTag`属性,指向一个方法,在该对象上面对用`Object.prototype.toString`方法时,如果这个属性存在,它的返回值会出现在`toString`方法返回的字符串之中,表示对象的类型.就是说可以用来定制`[object Object]`或者`[object Array]`中 object 后面的那个字符串.

```javascript
;({ [Symbol.toStringTag]: 'Foo' }.toString()) // '[object Foo]'

class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx'
  }
}

let x = new Collection()
Object.prototype.toString.call(x) // [object xxx]
```

ES6 新增内置对象的`Symbol.toStringTag`属性值如下:

- `JSON[Symbol.toStringTag]`: 'JSON'
- `Math[Symbol.toStringTag]`: 'Math'
- Module 对象`M[Symbol.toStringTag]`: 'Module'
- `ArrayBuffer.prototype[Symbol.toStringTag]`: 'ArrayBuffer'
- `DataView.prototype[Symbol.toStringTag]`: 'DataView'
- `Map.prototype[Symbol.toStringTag]`: 'Map'
- `Promise.prototype[Symbol.toStringTag]`: 'Promise'
- `Set.prototype[Symbol.toStringTag]`: 'Set'
- `%TypedArray%.prototype[Symbol.toStringTag]`: 'Uint8Array'等
- `WeakMap.prototype[Symbol.toStringTag]`: 'WeakMap'
- `WeakSet.prototype[Symbol.toStringTag]`: 'WeakSet'
- `%MapIteratorPrototype%[Symbol.toStringTag]`: 'Map Iterator'
- `%SetIteratorPrototype%[Symbol.toStringTag]`: 'Set Iterator'
- `%StringIteratorPrototype%[Symbol.toStringTag]`: 'String Iterator'
- `Symbol.prototype[Symbol.toStringTag]`: 'Symbol'
- `Generator.prototype[Symbol.toStringTag]`: 'Generator'
- `GeneratorFunction.prototype[Symbol.toStringTag]`: 'GeneratorFunction'

### Symbol.unscopables

对象的`Symbol.unscopables`属性,指向一个对象.该对象指定了使用`with`关键字时,那些属性会被`with`环境排除.

```javascript
console.log(Array.prototype[Symbol.unscopables])
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   flat: true,
//   flatMap: true,
//   includes: true,
//   keys: true,
//   values: true
// }

console.log(Object.keys(Array.prototype[Symbol.unscopables]))
// [
//   'copyWithin', 'entries',
//   'fill',       'find',
//   'findIndex',  'flat',
//   'flatMap',    'includes',
//   'keys',       'values'
// ]
```

通过指定`Symbol.unscopables`属性,使得`with`语法快不会再当前作用域寻找属性,会指向外层作用域的变量.

```javascript
// 没有 unscopables 时
class MyClass {
  foo() {
    return 1
  }
}

var foo = function() {
  return 2
}

with (MyClass.prototype) {
  foo() // 1
}

// 有 unscopables 时
class MyClass {
  foo() {
    return 1
  }
  get [Symbol.unscopables]() {
    return { foo: true }
  }
}

var foo = function() {
  return 2
}

with (MyClass.prototype) {
  foo() // 2
}
```
