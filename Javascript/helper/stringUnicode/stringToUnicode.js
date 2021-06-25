function stringToUnicode (str) {
  if (!str) return '请输入汉字'
  const length = str.length
  let result = ''
  for (let i = 0; i < length; i++) {
    result += '\\u' + str.charCodeAt(i).toString(16)
  }
  return result
}

// 汉字转unicode编码
function stringToUnicode2 (str) {
  return str.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, (newStr) => {
    return '\\u' + newStr.charCodeAt(0).toString(16);
  })
}

let str = 'hello world'
console.log(stringToUnicode(str))
console.log(stringToUnicode2(str))

// module.exports = stringToUnicode
