/**
 * String.prototype.replace()
 * RegExp
 */

const str1 = '  hello world    '

const str2 = str1.replace(/\s*/g, '') // 去除字符串中所有空格
const str3 = str1.replace(/^\s*|\s*$/g, '') // 去除字符串的首尾空格
const str4 = str1.replace(/^\s*/, '') // 去除字符串的首部空格
const str5 = str1.replace(/\s*$/, '') // 去除字符串的尾部空格

console.log(str1) // '  hello world    '
console.log(str2) // 'helloworld'
console.log(str3) // 'hello world'
console.log(str4) // 'hello world    '
console.log(str5) // '  hello world'
