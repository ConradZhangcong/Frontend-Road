# HTTP 状态码(HTTP Status Code)

## 对于前端来说一些常见的状态码

### 2xx

- `200 OK` 请求成功
- `204 No Content` 含义与 200 相同,但响应头后没有 body 数据
- `206 Partial Content` 客户端请求一部分资源

### 3xx

- `301 Moved Permanently` 永久重定向,浏览器会做缓存优化
- `302` 临时重定向,浏览器不会做缓存优化
- `304 Not Modified` 文件未修改,可以直接使用缓存文件

> 附带条件的请求是指采用 GET 方法的请求报文中包含 `If-Match`，`If-Modified-Since`，`If-None-Match`，`If-Range`，`If-Unmodified-Since` 中任一首部

### 4xx

- `400 Bad Request` 请求报文中存在语法错误
- `401 Unauthorized` 未授权
- `403 Forbidden` 拒绝访问
- `404 Not Found` 资源没找到,没有在服务器上找到相应资源
- `405 Method Not Allowed` 请求的方法不允许
- `413 Payload Too Large` 请求主体的过大
- `414 URI Too Long` 请求路径过长
- `416 Range Not Satisfiable`
- `431 Request Header Fields Too Large` 请求中的首部字段的值过大

### 5xx

- `500 Internal Server Error` 服务器内部错误
- `502 Bad Gateway` 网关错误
- `503 Service Unavailable` 服务器没找到，常见原因是服务器因维护或重载而停机
- `504 Gateway Timeout` 网关超时

## HTTP 状态码分类

| 分类 | 描述                                           |
| :--- | ---------------------------------------------- |
| 1xx  | 信息，服务器收到请求，需要请求者继续执行操作   |
| 2xx  | 成功，操作被成功接收并处理                     |
| 3xx  | 重定向，需要进一步的操作以完成请求             |
| 4xx  | 客户端错误，请求包含语法错误或无法完成请求     |
| 5xx  | 服务器错误，服务器在处理请求的过程中发生了错误 |

## 详细的状态码

详细的 HTTP 状态码参考: [MDN-HTTP 相应代码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
