const clone = require('../clone_1')

const target = {
  field1: 1,
  field2: undefined,
  field3: 'Conard',
  field4: {
    child: 'child',
    child2: {
      child2: 'child2'
    }
  },
  dield5: [2, 3, 4]
}

const result = clone(target)

target.field1 = 2
target.field4.child = 'child1'
target.field4.child2.child3 = 'child3'

console.log('target:', target)
console.log('result:', result)
