/**
 * 寄生式继承: 在原型式继承的基础上以某种方式增强对象, 然后返回这个对象
 */

function inherit(o) {
  let clone = Object.create(o);
  clone.sayHi = function () {
    console.log("Hi");
  };
  return clone;
}

const p1 = {
  eyes: "black",
  colors: ["white", "yellow", "black"],
};

const p2 = inherit(p1);

console.log(p2.eyes);
console.log(p2.colors);
p2.sayHi();
