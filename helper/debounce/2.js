/**
 * 简单的防抖函数
 */
let count = 0
let container = document.getElementById('container')

function getUserAction(e) {
  container.innerHTML = ++count
}

container.onmousemove = debound(getUserAction, 1000)

// 添加防抖函数 一定时间内不再触发事件 才执行函数
function debound(func, time) {
  let timeout
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(func, time)
  }
}