# 事件循环机制

[微信公众号 - 面试题：说说事件循环机制(满分答案来了)](https://mp.weixin.qq.com/s/QgfE5Km1xiEkQqADMLmj-Q)

[nodejs 官网 - Node.js 事件循环，定时器和 process.nextTick()](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#node-js-process-nexttick)

## 大纲

1. 宏任务(`macro-task`),微任务(`micro-task`)
2. 事件循环机制过程
3. async/await 执行顺序注意
4. node 的事件循环

## 浏览器中的事件循环

macro-task 包括:

- script
- setTimeout
- setInterval
- setImmediate
- I/O
- UI render

micro-task 包括:

- process.nextTick
- promise
- async/await 实际上就是 promise
- mutationObserver h5 新特性

整体执行的流程:

先执行宏任务,然后再执行该宏任务产生的微任务(如果微任务在执行过程中产生了新的微任务,则继续执行微任务),微任务执行完毕后,再回到宏任务中进行下一轮循环

完整的事件循环机制

1. 一开始整段脚本作为第一个宏任务执行
2. 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
3. 当前宏任务执行完出队，检查微任务队列，如果有则依次执行，直到微任务队列为空
4. 执行浏览器 UI 线程的渲染工作
5. 检查是否有 Web worker 任务，有则执行
6. 执行队首新的宏任务，回到 2，依此循环，直到宏任务和微任务队列都为空

### chrome 优化了 await

## nodejs 中的事件循环

宏任务的执行顺序是这样的:

- timers 定时器：本阶段执行已经安排的 setTimeout() 和 setInterval() 的回调函数。
- pending callbacks 待定回调：执行延迟到下一个循环迭代的 I/O 回调。
- idle, prepare：仅系统内部使用。
- poll 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 setImmediate() 排定的之外），其余情况 node 将在此处阻塞。
- check 检测：setImmediate() 回调函数在这里执行。
- close callbacks 关闭的回调函数：一些准备关闭的回调函数，如：socket.on('close', ...)。

### 微任务和宏任务在 Node 的执行顺序

Node 10 以前：

- 执行完一个阶段的所有任务
- 执行完 nextTick 队列里面的内容
- 然后执行完微任务队列的内容

Node 11 以后： 和浏览器的行为统一了，都是每执行一个宏任务就执行完微任务队列。
