# path

`__dirname`: 当前文件所在的绝对路径

`process.cwd()`: 当前工作目录所在的绝对路径

## path.join & path.resolve

- `path.join`: 将所有给定的参数连接在一起，然后规范化生成的路径
- `path.resolve`: 将路径或路径片段的序列解析为绝对路径

这两个方法都会从右到左处理, 将后续的路径追加, 生成绝对路径.

区别在于`path.resolve`在处理完所有给定`path`片段后, 如果没有生成绝对路径(是否以`/`开头?)会使用当前工作目录(`process.cwd()`)来生成绝对路径.

```js
const path = require("path");

console.log(path.resolve("a", "b")); // /Users/conrad/Desktop/Frontend-Road/a/b
console.log(path.join("a", "b")); // a/b

console.log(path.resolve("/a", "/b")); // /b
console.log(path.join("/a", "/b")); // /a/b

console.log(path.resolve("/a", "./b")); // /a/b
console.log(path.join("/a", "./b")); // /a/b
```
