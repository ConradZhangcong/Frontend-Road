# 基础 DOM 事件兼容性处理

## event 事件

```js
const getEvent = function (e) {
  return e || window.event
}
```

## target

```js
const getTarget = function (e) {
  return e.target || e.srcelem
}
```

## 添加事件句柄

```js
addHandler = function (el, type, callback) {
  if (el.addEventListener) {
    el.addEventListener(type, callback, false)
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, callback)
  } else {
    el['on' + type] = callback
  }
}
```

## 移除事件句柄

```js
removeHandler = function (el, type, callback) {
  if (el.removeEventListener) {
    el.removeEventListener(type, callback, false)
  } else if (el.detachEvent) {
    el.detachEvent('on' + type, callback)
  } else {
    el['on' + type] = null
  }
}
```

## 取消默认行为

```js
const preventDefault = function (e) {
  if (e.preventDefault) {
    e.preventDefault()
  } else {
    e.returnValue = false
  }
}
```

## 阻止事件冒泡

```js
const stopPropagation = function (e) {
  if (e.stopPropagation) {
    e.stopPropagation()
  } else {
    e.cancelBubble = true
  }
}
```
