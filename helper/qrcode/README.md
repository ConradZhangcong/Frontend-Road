# qrcode

二维码生成与识别

## 生成

参考:

[csdn - 二维码生成原理](https://blog.csdn.net/jason_ldh/article/details/11801355)

## 识别

参考:

[掘金 - 纯 web 端实现二维码识别](https://juejin.im/post/5cc266b36fb9a032204fdada)

[cnblogs - javascript 利用 canvas 解析图片中的二维码](https://www.cnblogs.com/linx/p/10233261.html)

要进行二维码的识别有几处难点:调用摄像头获取视频流,使用canvas进行截图,对图片进行解码识别.

## 调用摄像头

通过浏览器调用摄像头h5有个属性可以兼容大部分平台:`navigator.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia`,

## 使用canvas截图
