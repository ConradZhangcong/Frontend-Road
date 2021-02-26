/**
 * 处理this和event对象
 */
let count = 0
let container = document.getElementById('container')

function getUserAction(e) {
  container.innerHTML = ++count
}

container.onmousemove = debound(getUserAction, 1000)

function debound(func, time = 1000) {
  let timeout
  return function () {
    clearTimeout(timeout)
    // 用箭头函数配合apply改变this的指向
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, time)
  }
}