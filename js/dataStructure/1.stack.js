/**
 * stack(栈)
 * 特点是后进先出,比如浏览器的访问历史等
 * stack一般具有以下方法:
 * 1.push:将一个元素堆入栈顶
 * 2.pop:移除栈顶元素,并放回被移除的元素
 * 3.peek:返回栈顶元素
 * 4.length:返回栈中元素的个数
 * 
 * js的Array天生具备了stack的特性,但是也可以从头实现一个stack类
 */

class Stack {
  count = 0
  storage = {}

  push(val) {
    this.storage[this.count] = val
    this.count++
  }

  pop() {
    if (this.count === 0) return undefined
    this.count--
    let result = this.storage[this.count]
    delete this.storage[this.count]
    return result
  }

  peek() {
    return this.storage[this.count - 1]
  }

  size() {
    return this.count
  }
}

module.exports = Stack