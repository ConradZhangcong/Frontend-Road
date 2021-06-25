/**
 * String.prototype.trim()
 * `trim()` 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR 等）。
 * 返回值是一个代表调用字符串两端去掉空白的`新字符串`。
 * 参考: [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
 */
const str1 = '  hello world    '

const str2 = str1.trim()

console.log(str1) // '  hello world    '
console.log(str2) // 'hello world'
