/**
 * Hash Table(哈希表/散列表)
 * Hash Table是一种用域存储键值对的数据结构,因为Hash Table根据key查询value的速度很快,所以常用于实现Map,Dictinary,Object等数据结构
 */

/**
 * 一个Hash Table通常具有下列方法:
 * 1.add：增加一组键值对
 * 2.remove：删除一组键值对
 * 3.lookup：查找一个键对应的值
 */

function hash(string, max) {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i)
  }
  return hash % max
}

function HashTable() {
  let storage = []
  const storageLimit = 4

  this.add = function (key, value) {
    let index = hash(key, storageLimit)
    if (storage[index] === undefined) {
      storage[index] = [
        [key, value]
      ]
    } else {
      let inserted = false
      for (let i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          storage[index][i][1] = value
          inserted = true
        }
      }
      if (!inserted) {
        storage[index].push([key, value])
      }
    }
  }

  this.remove = function (key) {
    let index = hash(key, storageLimit)
    if (storage[index].length === 1 && storage[index][0][0] === key) {
      delete storage[index]
    } else {
      for (let i = 0; i < storage[index]; i++) {
        if (storage[index][i][0] === key) {
          delete storage[index][i]
        }
      }
    }
  }

  this.lookup = function (key) {
    let index = hash(key, storageLimit)
    if (storage[index].length === undefined) {
      return undefined
    } else {
      for (let i = 0; i < storage[index]; i++) {
        if (storage[index][i][0] === key) {
          return storage[index][i]
        }
      }
    }
  }
}

module.exports = HashTable