# CORS(跨域)

参考文章:

[思否 - 不要再问我跨域的问题了](https://segmentfault.com/a/1190000015597029)

## 为什么会有跨域问题

浏览器的同源策略

同源的定义:两个 url 的 protocol(协议),host(主机),port(端口号)都相同的话,这两个 url 是同源.

## 没有同源策略的两大危险场景

1. 没有同源策略限制的接口请求
2. 没有同源策略限制的 Dom 查询

## 同源策略限制下接口请求的正确方式

### 1.JSONP

利用`<script>`标签没有跨域的限制,通过标签指向一个地址并提供一个回调函数来接受数据.

### 2.空 iframe 加 form

### 3.CORS

- Access-Control-Allow-Origin
- Access-Control-Allow-Headers: 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With'
- Access-Control-Allow-Methods

### 4.nginx代理

### 5.webpack配置proxyTable

## 同源策略限制下 DOM 查询的正确方式

### 1.postMessage

### 2.document.domain

### 3.canvas 操作图片的跨域问题
