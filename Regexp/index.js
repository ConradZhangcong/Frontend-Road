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
