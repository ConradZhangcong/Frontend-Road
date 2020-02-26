// 没有 unscopables 时
class MyClass {
  foo () { return 1 }
}

var foo = function () { return 2 }

with (MyClass.prototype) {
  foo() // 1
}

// 有 unscopables 时
class MyClass {
  foo () { return 1 }
  get [Symbol.unscopables] () {
    return { foo: true }
  }
}

var foo = function () { return 2 }

with (MyClass.prototype) {
  foo() // 2
}
