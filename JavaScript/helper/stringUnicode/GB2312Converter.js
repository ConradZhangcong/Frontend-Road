function stringToUnicode (str) {
  return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u')
}

function unicodeToString (str) {
  return unescape(str.replace(/\\u/gi, '%u'))
}

let str1 = '中国'
let str2 = '%7B%22PageIndex%22%3A1%2C%22PageSize%22%3A10%2C%22Predicate%22%3A%221%3D1%26%26Date%3E%3D%400%26%26Date%3C%3D%401%22%2C%22PredicateValues%22%3A%5B%222019-12-17%22%2C%222019-12-25%22%5D%2C%22Ordering%22%3A%22Date%20desc%22%7D'

console.log(stringToUnicode(str1))
console.log(unicodeToString(str2))
