/**
 * JSON.parse(JSON.stringify())
 */
function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

const obj1 = {
  a: new Date()
}

console.log(clone(obj1)) // { a: "2019-12-17T09:06:12.588Z" }

const obj2 = {
  a: new RegExp(/\s*/),
  b: new Error('test')
}

console.log(clone(obj2)) // { a: {}, b: {} }

const obj3 = {
  a: function () { console.log(this) },
  b: undefined
}

console.log(clone(obj3)) // {}

const obj4 = {
  a: NaN,
  b: Infinity,
  c: -Infinity
}

console.log(clone(obj4)) // { a: null, b: null, c: null}

function Person (name) {
  this.name = name
  console.log(name)
}

const p1 = new Person('conrad')
const obj5 = { name: 'a', person: p1 } // { name: 'a', person: Person { name: 'conrad' } }
const obj5_copyed = clone(obj5) // { name: 'a', person: Person { name: 'conrad' } }

p1.name = 'conradddd'

console.log(obj5) // { name: 'a', person: Person { name: 'conradddd' } }
console.log(obj5_copyed) // { name: 'a', person: { name: 'conrad' } }
