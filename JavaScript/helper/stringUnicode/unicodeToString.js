function unicodeToString (str) {
  if (!str) return '请输入十六进制unicode'
  const strList = str.split('\\u')
  const length = strList.length
  let result = ''
  for (let i = 0; i < length; i++) {
    if (strList[i] !== '')
      result += String.fromCharCode(parseInt(strList[i], 16).toString(10))
  }
  return result
}

let str = '\\u68\\u65\\u6c\\u6c\\u6f\\u20\\u77\\u6f\\u72\\u6c\\u64'
console.log(unicodeToString(str))
