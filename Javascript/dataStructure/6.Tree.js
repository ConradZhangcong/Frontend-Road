/**
 * Tree(树)是一种多层数据结构,非线性的数据结构,在进行插入和搜索时很高效
 * 以二叉查找树为例,每个节点最多只有2个子节点,左侧节点小于当前节点,右侧节点大于当前节点
 * 一个二叉查找树具有一下常用方法:
 * 1.add：向树中插入一个节点
 * 2.findMin：查找树中最小的节点
 * 3.findMax：查找树中最大的节点
 * 4.find：查找树中的某个节点
 * 5.isPresent：判断某个节点在树中是否存在
 * 6.remove：移除树中的某个节点
 */

class Node {
  constructor(data, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}

class BST {
  constructor() {
    this.root = null
  }

  add(data) {
    const node = this.root
    if (node === null) {
      this.root = new Node(data)
      return
    } else {
      const searchTree = function (node) {
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data)
            return
          } else if (node.left !== null) {
            return searchTree(node.left)
          }
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data)
          } else if (node.right !== null) {
            return searchTree(node.right)
          }
        } else {
          return null
        }
      }
      return searchTree(node)
    }
  }

  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  findMax() {
    let current = this.root
    while (current.right !== null) {
      current = current.right
    }
    return current.data
  }

  find(data) {
    let current = this.root
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left
      } else {
        current = current.right
      }
      if (current === null) {
        return null
      }
    }
    return current
  }

  isParent(data) {
    let current = this.root
    while (current) {
      if (data === current.data) {
        return true
      }
      if (data < current.data) {
        current = current.left
      } else {
        current = current.right
      }
    }
    return false
  }

  remove(data) {
    const removeNode = function (node, data) {
      if (node === null) {
        return null
      }
      if (data === node.data) {
        // node没有子节点
        if (node.left === null && node.right === null) {
          return null
        }
        // node没有左侧子节点
        if (node.left === null) {
          return node.right
        }
        // node没有右侧子节点
        if (node.right === null) {
          return node.left
        }
        // node有两个子节点
        let tempNode = node.right
        while (tempNode.left !== null) {
          tempNode = tempNode.left
        }
        node.data = tempNode.data
        node.right = removeNode(node.right, tempNode.data)
      } else if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      } else {
        node.right = removeNode(node.right, data)
        return node
      }
    }
    this.root = removeNode(this.root, data)
  }
}

module.exports = BST