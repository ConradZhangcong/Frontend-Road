const clone = require('../clone_2')

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
}

const result = clone(target)

target.field1 = 2
target.field3.child = 'child1'

console.log('target:', target)
console.log('result:', result)
