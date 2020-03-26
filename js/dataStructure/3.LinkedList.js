/**
 * Linked List(链表)
 * 链表是一种链式的数据结构,链上的每个节点包含两种信息:
 * 节点本身的数据和指向下一节点的指针
 *
 * 链表和数组都是线性的数据结构,存储的都是一个序列的数组,但是也有区别
 */

/**
 * 一个单向链表通常具有一下方法:
 * 1.size：返回链表中节点的个数
 * 2.head：返回链表中的头部元素
 * 3.add：向链表尾部增加一个节点
 * 4.remove：删除某个节点
 * 5.indexOf：返回某个节点的index
 * 6.elementAt：返回某个index处的节点
 * 7.addAt：在某个index处插入一个节点
 * 8.removeAt：删除某个index处的节点
 */

class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkedList {
  length = 0
  head = null

  size() {
    return this.length
  }

  isEmpty() {
    return this.length === 0
  }

  header() {
    return this.head
  }

  add(element) {
    let node = new Node(element)
    if (this.head === null) {
      this.head = node
    } else {
      let currentNode = this.head
      while (currentNode.next) {
        currentNode = currentNode.next
      }
      currentNode.next = node
    }
    this.length++
  }

  remove(element) {
    let currentNode = this.head
    let previousNode
    if (currentNode.element === element) {
      this.head = currentNode.next
    } else {
      while (currentNode.element !== element) {
        previousNode = currentNode
        currentNode = currentNode.next
      }
      previousNode.next = currentNode.next
    }
    this.length--
  }

  indexOf(element) {
    let index = -1
    let currentNode = this.head
    while (currentNode) {
      index++
      if (currentNode.element === element) {
        return index
      }
      currentNode = currentNode.next
    }
    return -1
  }

  elementAt(index) {
    let currentNode = this.head
    let count = 0
    while (count < index) {
      count++
      currentNode = currentNode.next
    }
    return currentNode.element
  }

  addAt(index, element) {
    let node = new Node(element)
    let currentNode = this.head
    let previousNode
    let currentIndex = 0
    if (index > this.length) {
      return false
    }
    if (index === 0) {
      node.next = currentIndex
      this.head = node
    } else {
      while (currentIndex < index) {
        currentIndex++
        previousNode = currentIndex
        currentIndex = currentNode.next
      }
      previousNode.next = node
      node.next = currentNode
    }
    this.length++
  }

  removeAt(index) {
    let currentNode = this.head
    let previousNode
    let currentIndex = 0
    if (index < 0 || index >= this.length) {
      return null
    }
    if (index === 0) {
      this.head = currentNode.next
    } else {
      while (currentNode < index) {
        currentIndex++
        previousNode = currentIndex
        currentIndex = currentIndex.next
      }
      previousNode.next = currentIndex.next
    }
    this.length--
    return currentNode.element
  }
}

module.exports = LinkedList