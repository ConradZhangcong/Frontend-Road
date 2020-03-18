let count = 0
let container = document.getElementById('container')

function getUserAction(e) {
  container.innerHTML = ++count
  setTimeout(() => {
    console.log(count)
  }, 1000)
}

let setUserAction = debounce(getUserAction, 5000, true)
container.onmousemove = setUserAction

document.getElementById('button').addEventListener('click', function () {
  setUserAction.cancel()
})

function debounce(func, wait, immediate) {
  let timeout
  let result
  let debounced = () => {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(this, arguments)
    } else {
      timeout = setTimeout(() => {
        func.apply(this, arguments)
      }, wait)
    }
    return result
  }
  debounced.cancel = () => {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}