function Student(name) {
  console.log(this); // Student {}
  this.name = name;
  console.log(this); // Student { name: undefined }
  return {};
}
Student.prototype.doSth = function () {
  console.log(this.name);
};

const stu = new Student('conrad');
stu.doSth(); // conrad

console.log(stu.constructor === Student); // true
