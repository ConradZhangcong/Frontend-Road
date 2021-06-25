# debounce&throttle(防抖和节流)

参考:

[github - JavaScript 专题之跟着 underscore 学防抖 #22](https://github.com/mqyqingfeng/Blog/issues/22)

[JavaScript 专题之跟着 underscore 学节流 #26](https://github.com/mqyqingfeng/Blog/issues/26)

[木易杨前端进阶 - 什么是防抖和节流？有什么区别？如何实现？](https://muyiy.cn/question/js/3.html)

## 介绍

在前端开发中会遇到一些频繁的事件触发,如:

- window 的 resize scroll
- mousedown mousemove
- keyup keydown
- click
- input
- ...

为了解决这种问题,一般有两种解决方案:

1. debounce 防抖(一个高频事件在触发后一定时间会执行一次,如果在这段时间内再次被触发,那么会重新计算时间.)
2. throttle 节流(一个高频事件在一定时间内只会执行一次,如果在这段时间内再次被触发,那么不会执行这个事件.)
