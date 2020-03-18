/**
 * 立即执行 停止触发事件后一定时间,才可以重新触发
 */
let count = 0
let container = document.getElementById('container')

function getUserAction(e) {
  container.innerHTML = ++count
}

container.onmousemove = debound(getUserAction, 1000)

// 添加immediate参数判断是否立即执行
function debound(func, time = 1000, immediate) {
  let timeout
  return function () {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过,则不再执行
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, time)
      if (callNow) func.apply(this, arguments)
    } else {
      timeout = setTimeout(() => {
        func.apply(this, arguments)
      }, time)
    }
  }
}