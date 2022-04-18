function add(a, b, c) {
  return a + b + c;
}

function curry(fn, length = fn.length) {
  return _curry.call(this, fn, length);
}

function _curry(fn, length, ...args) {
  return function (...params) {
    let _args = [...args, ...params];
    if (_args.length >= length) {
      return fn.apply(this, _args);
    } else {
      return _curry.call(this, fn, length, ..._args);
    }
  };
}

const currentAdd = curry(add);

console.log(currentAdd(1)(2)(3));
