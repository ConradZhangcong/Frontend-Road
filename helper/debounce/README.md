# debounce(防抖)

参考: [github - JavaScript 专题之跟着 underscore 学防抖 #22](https://github.com/mqyqingfeng/Blog/issues/22)
[木易杨前端进阶 - 什么是防抖和节流？有什么区别？如何实现？](https://muyiy.cn/question/js/3.html)

## 简介

在前端开发中会遇到一些频繁的事件触发,如:

- window 的 resize scroll
- mousedown mousemove
- keyup keydown
- ...

为了解决这种问题,一般有两种解决方案:

1. debounce 防抖
2. throttle 节流

## 应用场景

按钮点击事件/input 事件,防止用户多次提交

## 原理

当触发事件时,一定时间按段内没有再次触发事件,事件处理函数才会执行一次,如果设定的事件内又触发了事件,那么重新开始计时.
