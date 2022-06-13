/**
 * 寄生式组合继承: 通过盗用构造函数继承属性, 使用混合式原型链继承方法.
 * 使用寄生式继承来继承父类的原型对象, 将返回的新对象赋值给子类的原型对象
 */

function inherit(Father, Son) {
  const prototype = Object.create(Father.prototype);
  prototype.constructor = Son;
  Son.prototype = prototype;
}

function Person(eyes) {
  this.eyes = eyes;
  this.colors = ["white", "yellow", "black"];
}

Person.prototype.getEyes = function () {
  return this.eyes;
};

function YellowRace() {
  Person.call(this, "black");
}

inherit(YellowRace, Person); // 寄生式继承，不用第二次调用构造函数

const p1 = new YellowRace();
p1.colors.push("green");

const p2 = new YellowRace();

console.log(p1.colors);
console.log(p2.colors);
console.log(p1.getEyes());
