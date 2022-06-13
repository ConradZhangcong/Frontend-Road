/**
 * 原型式继承: Object.create将原型式继承规范化, 只传第一个参数时与object方法相同
 * 
 * 缺点:
 * 1. object不能传参, Object.create()可以传参
 * 2. 原型对象中引用类型的参数会被新对象共享
 */
const object = function (o) {
  function F() {}
  F.prototype = o;
  return new F();
};

const p1 = {
  eyes: "black",
  colors: ["white", "yellow", "black"],
};

const p2 = object(p1);

console.log(p1.eyes);
console.log(p1.colors);

const laowang = Object.create(p1, {
  name: {
    value: "老王",
    writable: false,
    enumerable: true,
    configurable: true,
  },
  age: {
    value: "32",
    writable: true,
    enumerable: true,
    configurable: false,
  },
});

console.log(laowang.eyes); // black
console.log(laowang.colors); // ['white', 'yellow', 'black']
console.log(laowang.name); // 老王
console.log(laowang.age); // 32
