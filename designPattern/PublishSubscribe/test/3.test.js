// {'失恋',  [findboy, drink]}
// 监听的目的 就是为了构造这样一个对象 一对多的关系    on

// 发布的时候 会让数组的函数依次执行    emit
// [findboy, drink]

// let EventEmitter = require('events');
// 这里用接下来我们写的
let EventEmitter = require('./events');
let util = require('util');

function Girl() {
}
// Girl继承EventEmitter上的方法
util.inherits(Girl, EventEmitter);  // 相当于Girl.prototype.__proto__ = EventEmitter.prototype
let girl = new Girl();
let drink = function (data) {
    console.log(data);
    console.log('喝酒');
};
let findboy = function () {
    console.log('交友');
};

girl.on('newListener', function (eventName) {
    // console.log('名称： ' + eventName);
});
girl.on('结婚', function () { });
girl.setMaxListeners(3);
console.log(girl.getMaxListeners());
girl.once('失恋', drink);       // {'失恋': [drink]}
girl.once('失恋', drink);       // {'失恋': [drink]}
girl.prependListener('失恋', function () {
    console.log('before');
});
girl.once('失恋', drink);       // {'失恋': [drink]}
girl.emit('失恋', '1');
