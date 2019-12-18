/**
 * String.prototype.trimStart()
 * trimStart() 方法从字符串的开头删除空格。trimLeft() 是此方法的别名。
 * 返回值是一个新字符串，表示从其开头（左端）除去空格的调用字符串。
 * 参考: [MDN-trimStart](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/TrimLeft)
 * 
 * String.prototype.trimEnd() 别名 trimRight()
 * trimEnd() 方法从一个字符串的末端移除空白字符。trimRight() 是这个方法的别名。
 * 返回值是一个新字符串，表示从调用字串的末（右）端除去空白。
 * 参考: [MDN-trimEnd](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/TrimRight)
 */
const str1 = '  hello world    '

const str2 = str1.trimStart()
const str3 = str1.trimEnd()

console.log(str1) // '  hello world    '
console.log(str2) // 'hello world    '
console.log(str3) // '  hello world'
