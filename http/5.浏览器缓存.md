# 浏览器缓存

缓存可以减少网络 IO 消耗，提高访问速度。浏览器缓存是一种操作简单、效果显著的前端性能优化手段
很多时候，大家倾向于将浏览器缓存简单地理解为“HTTP 缓存”。
但事实上，浏览器缓存机制有四个方面，它们按照获取资源时请求的优先级依次排列如下：

Memory Cache
Service Worker Cache
HTTP Cache
Push Cache

缓存它又分为强缓存和协商缓存。优先级较高的是强缓存，在命中强缓存失败的情况下，才会走协商缓存

实现强缓存，过去我们一直用 expires。
当服务器返回响应时，在 Response Headers 中将过期时间写入 expires 字段，现在一般使用 Cache-Control 两者同时出现使用 Cache-Control

协商缓存，Last-Modified 是一个时间戳，如果我们启用了协商缓存，它会在首次请求时随着 Response Headers 返回：每次请求去判断这个时间戳是否发生变化。
从而去决定你是 304 读取缓存还是给你返回最新的数据
