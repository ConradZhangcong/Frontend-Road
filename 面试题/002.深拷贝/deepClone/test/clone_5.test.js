const clone = require('../clone_5')

const map = new Map();
map.set('key', 'value');
map.set('name', 'conrad');

const set = new Set();
set.add('name');
set.add('conrad');

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
}

const result = clone(target)

console.log(result)
console.log(result.map === target.map)
