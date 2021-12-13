/**
 * 常规未作任何处理
 */
let count = 0
let container = document.getElementById('container')

function getUserAction(e) {
  container.innerHTML = ++count
}

container.onmousemove = getUserAction