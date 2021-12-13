var a = 10
function test() {
  console.log(a) // a 是 window.a
  a = 100  // window.a = 100
  console.log(a)
}
test()


var b = 10
function test1() {
  console.log(b)
  var b = 20
  console.log(b)
}
test1()
