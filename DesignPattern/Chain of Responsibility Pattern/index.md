一、是什么
责任链模式（Chain of Responsibility Pattern）就是某个请求需要多个对象进行处理，从而避免请求的发送者和接收之间的耦合关系

将这些对象连成一条链子，并沿着这条链子传递该请求，直到有对象处理它为止

职责链上的处理者负责处理请求，客户只需要将请求发送到职责链上即可，无须关心请求的处理细节和请求的传递

常见的流程如下：

发送者知道链中的第一个接受者，它向这个接受者发出请求
每一个接受者都对请求进行分析，要么处理它，要么往下传递
每一个接受者知道的其他对象只有一个，即它的下家对象
如果没有任何接受者处理请求，那么请求将从链上离开，不同的实现对此有不同的反应
二、使用
假设我们负责一个售卖手机的网站，需求的定义是：需经过分别缴纳 500 元定金和 200 元定金的两轮预订，才能到正式购买阶段

公司对于交了定金的用户有一定的优惠政策，规则如下：

缴纳 500 元定金的用户可以收到 100 元优惠券
纳 200 元定金的用户可以收到 50 元优惠券
而没有缴纳定金的用户进入普通购买模式，没有优惠券，而且在库存不足的情况下，不一定能保证买得到
下面开始设计几个字段，解释它们的含义：

orderType：表示订单类型，值为 1 表示 500 元定金用户，值为 2 表示 200 元定金用户，值为 3 表示普通用户。
pay：表示用户是否支付定金，值为布尔值 true 和 false，就算用户下了 500 元定金的订单，但是如果没有支付定金，那也会降级为普通用户购买模式。
stock：表示当前用户普通购买的手机库存数量，已经支付过定金的用户不受限制。
代码实现如下：

const order = function (orderType, pay, stock) {
if (orderType === 1) {
if (pay === true) {
console.log('500 元定金预购，得到 100 元优惠券')
} else {
if (stock > 0) {
console.log('普通用户购买，无优惠券')
} else {
console.log('手机库存不足')
}
} else if (orderType === 2) {
if (pay === true) {
console.log('200 元定金预购，得到 50 元优惠券')
} else {
if (stock > 0) {
console.log('普通用户购买，无优惠券')
} else {
console.log('手机库存不足')
}
}
} else if (orderType === 3) {
if (stock > 0) {
console.log('普通用户购买，无优惠券')
} else {
console.log('手机库存不足')
}
}
}

order(1, true, 500) // 输出：500 元定金预购，得到 100 元优惠券'
可以看到上述代码大量实用化 if...else，难以阅读，维护起来也很困难

如果进行优化，则可以把 500 元订单、200 元订单以及普通购买拆分成三个函数，如下：

function order500 (orderType, pay, stock) {
if (orderType === 1 && pay === true) {
console.log('500 元定金预购，得到 100 元优惠券')
} else {
order200(orderType, pay, stock)
}
}

function order200 (orderType, pay, stock) {
if (orderType === 2 && pay === true) {
console.log('200 元定金预购，得到 50 元优惠券')
} else {
order200(orderType, pay, stock)
}
}

function orderNormal (orderType, pay, stock) {
if (stock > 0) {
console.log('普通用户购买，无优惠券')
} else {
console.log('手机库存不足')
}
}

// 测试
order500(1, true, 500) // 500 元定金预购，得到 100 元优惠券
order500(1, false, 500) // 普通用户购买，无优惠券
order500(2, true, 500) // 200 元定金预购，得到 50 元优惠券
order500(3, false, 500) // 普通用户购买，无优惠券
order500(3, false, 0) // 手机库存不足
上述过程中，请求在链条中传递的顺序很僵硬，传递请求的代码跟业务代码耦合在一起，如果有一天要增加 300 元定金的预订，那么就要切断之前的链条，修改订单 500 函数的代码，重新在 500 和 200 之间加一根新的链条，这违反了开放-封闭原则

因此需要灵活更改责任链节点，如果不能处理的时候，则返回一个标识继续往后传递，如下：

function order500 (orderType, pay, stock) {
if (orderType === 1 && pay === true) {
console.log('500 元定金预购，得到 100 元优惠券')
} else {
return 'nextSuccessor'
}
}

function order200 (orderType, pay, stock) {
if (orderType === 2 && pay === true) {
console.log('200 元定金预购，得到 50 元优惠券')
} else {
return 'nextSuccessor'
}
}

function orderNormal (orderType, pay, stock) {
if (stock > 0) {
console.log('普通用户购买，无优惠券')
} else {
console.log('手机库存不足')
}
}
下面再创建一个链类，将订单优惠函数传入链类中，如下：

class Chain {
construct (fn) {
this.fn = fn
this.successor = null
}

setNextSuccessor (successor) {
return this.successor = successor
}

passRequest () {
const res = this.fn.apply(this, arguments)

    if (res === 'nextSuccessor') {
      return this.successor && this.successor.passRequest.apply(this.successor, arguments)
    }
    return res

}
}

// 包装三个订单函数
const chainOrder500 = new Chain(order500)
const chainOrder200 = new Chain(order200)
const chainOrderNormal = new Chain(orderNormal)

// 指定节点在职责链中的位置
chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

// 最后把请求传递给第一个节点
chainOrder500.passRequest(1, true, 500) // 500 元定金预购，得到 100 元优惠券
chainOrder500.passRequest(2, true, 500) // 200 元定金预购，得到 50 元优惠券
chainOrder500.passRequest(3, true, 500) // 普通用户购买，无优惠券
chainOrder500.passRequest(1, false, 0) // 手机库存不足
三、应用场景
责任链模式比较适合比如一个任务需要多个对象才能完成处理的情况或者代码存在许多 if-else 判断的情况，例如 OA 事件审批、分配开发任务等

在 JavaScript 中，无论是作用链、原型链，还是 DOM 节点中的事件冒泡，我们都能从中找到职责链的影子

使用了职责链模式之后，链中的节点对象可以灵活地拆分重组，增加、删除和修改节点在链中的位置都是很容易的事

参考文献
https://www.runoob.com/design-pattern/chain-of-responsibility-pattern.html
https://juejin.cn/post/6993948920929845279
https://juejin.cn/post/6844903855348514829

## 参考

[面试官：说说你对责任链模式的理解？应用场景？](https://mp.weixin.qq.com/s/Tg3uhStoLNcfTfLRAwqHXA)
