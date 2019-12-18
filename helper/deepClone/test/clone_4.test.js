const clone1 = require('../clone_3')
const clone2 = require('../clone_4')

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
}

target.target = target

console.time('clone1')
const result1 = clone1(target)
console.timeEnd('clone1')

console.time('clone2')
const result2 = clone2(target)
console.timeEnd('clone2')
