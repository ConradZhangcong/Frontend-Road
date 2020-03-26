/**
 * 队列(Queue)和栈有一些类似,不同的是栈是先进后出,队列是先进先出
 * 队列一般有一下常用的方法:
 * 1.enqueue:入列,向队列尾部增加一个元素
 * 2.dequeue:出列,移除队列头部的一个元素并且返回被移除的元素
 * 3.front:  获取队列的第一个元素
 * 4.isEmpty:判断队列是否为空
 * 5.size:   获取队列中元素的个数
 * 
 * 增加功能:Priority Queue(有限队列)
 * 赋予每个元素优先级,优先级高的元素入列时排到优先级低的元素之前
 */

class Queue {
  collection = []

  print() {
    console.log(this.collection)
  }

  enqueue(ele) {
    this.collection.push(ele)
  }

  dequeue(ele) {
    return this.collection.shift()
  }

  isEmpty() {
    return this.collection.length === 0
  }

  front() {
    return this.collection[0]
  }

  size() {
    return this.collection.length
  }
}

class PriorityQueue extends Queue {
  enqueue(ele) {
    if (this.isEmpty()) {
      this.collection.push(ele)
    } else {
      let added = false
      for (let i = 0; i < this.collection.length; i++) {
        if (ele[1] < this.collection[i][1]) {
          this.collection.splice(i, 0, ele)
          added = true
          break
        }
      }
      if (!added) {
        this.collection.push(ele)
      }
    }
  }
}

module.exports = PriorityQueue