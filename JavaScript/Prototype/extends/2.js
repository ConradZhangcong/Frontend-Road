/**
 * 盗用构造函数: 也叫"对象伪装"或者"经典继承", 通过子类中调用父类构造函数实现上下文绑定
 *
 * 缺点:
 * 必须在构造函数中定义方法, 通过盗用构造函数继承的方法本质上变成了实例自己的方法, 不是公共的方法, 失去了复用性
 * 子类不能访问父类原型上定义的方法, 所有类型只能用构造函数模式.
 */
function Person(eyes) {
  this.eyes = eyes;
  this.getEyes = function () {
    return this.eyes;
  };
  this.colors = ["white", "yellow", "black"];
}

Person.prototype.ReturnEyes = function () {
  return this.eyes;
};

function YellowReace() {
  Person.call(this, "black");
}

const p1 = new YellowReace();
const p2 = new YellowReace();
p1.colors.push("green");

console.log(p1.colors);
console.log(p1.eyes);

console.log(p2.colors);
console.log(p2.eyes);

console.log(p1.getEyes()); // black
console.log(p1.ReturnEyes); // undefined
