/**
 * Set(集合)是数学中的一个基本概念,表示具有某种特性的对象汇总成的集合
 * es6中引入了集合Set
 * set与array也有一定类似,不同的是set中不允许出现重复的元素并且是无序的
 */

/**
 * 一个Set应该具有以下方法:
 * 1.values：返回集合中的所有元素
 * 2.size：返回集合中元素的个数
 * 3.has：判断集合中是否存在某个元素
 * 4.add：向集合中添加元素
 * 5.remove：从集合中移除某个元素
 * 6.union：返回两个集合的并集
 * 7.intersection：返回两个集合的交集
 * 8.difference：返回两个集合的差集
 * 9.subset：判断一个集合是否为另一个集合的子集
 */

class MySet {
  collection = []

  has(element) {
    return (this.collection.indexOf(element) !== -1)
  }

  values() {
    return this.collection
  }

  size() {
    return this.collection.length
  }

  add(element) {
    if (!this.has(element)) {
      this.collection.push(element)
      return true
    }
    return false
  }

  remove(element) {
    if (this.has(element)) {
      index = this.collection.indexOf(element)
      this.collection.splice(index, 1)
      return true
    }
    return false
  }

  union(set) {
    let unionSet = new MySet()
    let firstSet = this.values()
    let secondSet = set.values()
    firstSet.forEach(e => unionSet.add(e))
    secondSet.forEach(e => unionSet.add(e))
    return unionSet
  }

  intersection(set) {
    let intersectionSet = new MySet()
    let firstSet = this.values()
    firstSet.forEach(e => {
      if (set.has(e)) {
        intersectionSet.add(e)
      }
    })
    return intersectionSet
  }

  difference(set) {
    let difference = new MySet()
    let firstSet = this.values()
    firstSet.forEach(e => {
      if (!set.has(e)) {
        difference.add(e)
      }
    })
    return difference
  }

  subset(set) {
    let firstSet = this.values()
    return firstSet.every(e => set.has(e))
  }
}

module.exports = MySet