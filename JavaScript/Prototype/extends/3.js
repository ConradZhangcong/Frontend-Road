/**
 * 组合继承
 * 
 * 缺点:
 * 调用两次Person的构造函数, 有一定程度的性能浪费
 */

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
YellowRace.prototype = new Person();

const p1 = new YellowRace();
p1.colors.push("green");

const p2 = new YellowRace();

console.log(p1.colors);
console.log(p2.colors);
console.log(p1.getEyes());
