# `.*` `.+`的区别

- `.`表示匹配除了换行符外的任意字符
- `*`表示零次或多次匹配
- `+`表示一次或多次匹配
- `?`表示懒惰模式, 尽可能少的匹配任意数量的重复

将这些规则组合在一起就得到了以下的匹配:

- `.*` 匹配任意字符出现零次或多次
- `.*?` 匹配任意字符出现零次或多次, 匹配成功的前提下, 尽可能匹配最小的字符
- `.+` 匹配任意字符一次以上
- `.+?` 匹配任意字符一次以上, 匹配成功的前提下, 尽可能匹配最小的字符

```js
console.log("abc".match(/a(.*)b/)); // [ 'ab', '', index: 0, input: 'abc', groups: undefined ]
console.log("abc".match(/a(.*)b/)); // [ 'ab', '', index: 0, input: 'abc', groups: undefined ]
console.log("abcabc".match(/a(.*)b/)); // [ 'abcab', 'bca', index: 0, input: 'abcabc', groups: undefined ]
console.log("abcabc".match(/a(.*?)b/)); // [ 'ab', '', index: 0, input: 'abcabc', groups: undefined ]

console.log("abc".match(/a(.+)b/)); // null
console.log("abc".match(/a(.+)b/)); // null
console.log("abcabc".match(/a(.+)b/)); // [ 'abcab', 'bca', index: 0, input: 'abcabc', groups: undefined ]
console.log("abcabc".match(/a(.+?)b/)); // [ 'abcab', 'bca', index: 0, input: 'abcabc', groups: undefined ]

console.log("abc".match(/a(.*)c/)); // [ 'abc', 'b', index: 0, input: 'abc', groups: undefined ]
console.log("abc".match(/a(.*)c/)); // [ 'abc', 'b', index: 0, input: 'abc', groups: undefined ]
console.log("abcabc".match(/a(.*)c/)); // [ 'abcabc', 'bcab', index: 0, input: 'abcabc', groups: undefined ]
console.log("abcabc".match(/a(.*?)c/)); // [ 'abc', 'b', index: 0, input: 'abcabc', groups: undefined ]

console.log("abc".match(/a(.+)c/)); // [ 'abc', 'b', index: 0, input: 'abc', groups: undefined ]
console.log("abc".match(/a(.+)c/)); // [ 'abc', 'b', index: 0, input: 'abc', groups: undefined ]
console.log("abcabc".match(/a(.+)c/)); // [ 'abcabc', 'bcab', index: 0, input: 'abcabc', groups: undefined ]
console.log("abcabc".match(/a(.+?)c/)); // [ 'abc', 'b', index: 0, input: 'abcabc', groups: undefined ]
```
