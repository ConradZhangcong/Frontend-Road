function A() {
  this.foo = "hello";
}

if (!global._foo) {
  global._foo = new A();
  global._sym = Symbol.for("a");
}

module.exports = { foo: _foo, sym: _sym };
