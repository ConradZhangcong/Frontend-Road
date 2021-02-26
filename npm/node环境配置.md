# node环境配置

npm 安装全局模块以及缓存 cache 的文件存储在系统盘(`C:\Users\用户名\AppData\Roaming\npm`)路径中,占用系统盘空间.因此我希望将缓存文件以及全局模块文件存在其他盘中.

例如在**windows 系统**下,我希望存放在文件夹(D:\nodejs)下:

## node 配置

```shell
# 进入 D:\nodejs 文件夹下
# 首先新建两个文件夹 node_global 以及 node_cache
mkdir node_global
mkdir node_cache
# 更改 npm 全局文件以及缓存文件路径
npm config set prefix "D:\nodejs\node_global"
npm config set cache "D:\nodejs\node_cache"
```

## 系统变量配置

接下来进行环境变量配置:

右键"此电脑"-"属性"-"高级系统设置"-"高级"-"环境变量"

在"系统变量"窗口下"新建"(变量名为:`NODE_PATH`,变量值为:`D:\nodejs\node_global\node_modules`).

"编辑"在"用户变量"下的"Path","新建"(`D:\nodejs\node_global`).

## 测试

配置完成后可以使用全局安装的包的命令进行测试是否可以使用.

## npm镜像切换

1.获取当前的镜像地址

```shell
npm config get registry
> https://registry.npmjs.org/
```

2.修改镜像(这里以淘宝镜像为例)

```shell
npm config set registry http://registry.npm.taobao.org/
```

3.只有本次安装使用其他镜像

```shell
npm --registry http://registry.npm.taobao.org/ install
```

## 自定义初始化脚本

我们可以通过重定向到主目录的`.npm-init.js`文件来编辑`npm init`初始化 npm 时的脚本.(在 Windows 上,通常是`C:/User/<用户名>`,Mac 上是`/Users/<用户名>`)

首先在我们的主目录中创建一个`.npm-init.js`文件.确保`npm init`被指向正确的文件,可以运行:

```shell
npm config set init-module ~\.npm-init.js
```

```javascript
// ./.npm-init.js

module.exports = {
  name: prompt('package name', basename || package.name),
  version: prompt('version', '0.0.0'),
  decription: prompt('description', ''),
  main: prompt('entry point', 'index.js'),
  repository: prompt('git repository', ''),
  keywords: prompt(function (s) { return s.split(/\s+/) }),
  author: prompt('author', 'Conradzc <zhangcong.job@outlook.com> (conradzc.com)'),
  license: prompt('license', 'MIT')
}
```

这是一个简单的`.npm-init.js`文件,它模拟了默认的init的问题,每个问题都遵循`nameInPackage`模式:`promt('nameInPrompt', 'defaultValue')`.要在缺省情况下设置值而不带问题,只需删除`prompt方法`.

如果要返回默认设置,只需要删除`.npm-init.js`文件.
