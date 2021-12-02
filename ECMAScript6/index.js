class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const a = new MyArray(1, 2, 3);
const b = a.map((x) => x);
const c = a.filter((x) => x > 1);

console.log(a instanceof MyArray);
console.log(a instanceof Array);
console.log(b instanceof MyArray);
console.log(b instanceof Array);
console.log(c instanceof MyArray);
console.log(c instanceof Array);
console.log(MyArray[Symbol.species]);
