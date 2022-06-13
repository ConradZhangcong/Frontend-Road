/**
 * 原型链继承: 让构造函数的prototype指向另一个构造函数的实例
 *
 * 缺点:
 * 创建实例不能传参
 * 当原型上的属性是引用数据类型时, 所有实例会共享这个属性.
 */
function Person() {
  this.head = 1;
  this.hand = 2;
  this.colors = ["white", "yellow", "black"];
}

function YellowRace() {}
YellowRace.prototype = new Person();

const p1 = new YellowRace();
const p2 = new YellowRace();
p1.colors.push("green");

console.log(p1.head);
console.log(p1.hand);
console.log(p1.colors);
console.log(p2.colors);
