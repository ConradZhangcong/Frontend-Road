var name = 'Tom'
;(function() {
  if (typeof name == 'undefined') {
    var name = 'Jack'
    console.log('Goodbye ' + name)
  } else {
    console.log('Hello ' + name)
  }
})()

var name = 'Tom'
;(function() {
  if (typeof name == 'undefined') {
    name = 'Jack'
    console.log('Goodbye ' + name)
  } else {
    console.log('Hello ' + name)
  }
})()
