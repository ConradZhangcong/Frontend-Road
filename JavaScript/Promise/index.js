// 一个简单的封装
function want() {
  console.log("这是你想要执行的代码");
}

function fn(want) {
  console.log("这里表示执行了一大堆各种代码");

  return new Promise(function (resolve, reject) {
    if (typeof want == "function") {
      resolve(want);
    } else {
      reject("TypeError: " + want + "不是一个函数");
    }
  });
}

fn(want);
