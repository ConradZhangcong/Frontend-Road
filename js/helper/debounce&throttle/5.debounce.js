/**
 * 取消功能
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
  let debounded = function () {
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
  debounded.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return debounded
}