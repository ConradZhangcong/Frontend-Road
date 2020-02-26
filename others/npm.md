# npm

## 版本号

项目对模块的依赖可以用下面 3 种方式来表示(假设当前版本号是 1.1.0):

- 兼容模块新发布的补丁版本: ~1.1.0, 1.1.x, 1.1
- 兼容模块新发布的小版本,补丁版本: ^1.1.0, 1.x, 1
- 兼容模块新发布的大版本,小版本,补丁版本: \*, x

## 基本语句

- 安装 -- `npm install`,简写 `npm i`
- 卸载 -- `npm uninstall`
- 更新 -- `npm update`
- 检查模块是否已经过时 -- `npm outdated`
- 测试 -- `npm test`,简写 `npm t`
- 帮助 -- `npm --help`,简写 `npm -h`
- 初始化 -- 常规 `npm init`, `npm init --force`或`npm init --force`,简写`npm init -y`或者`npm init -f`

参数:

- 全局标志 -- 常规 `--global`,简写 `-g`
- 保存为开发依赖 -- 常规 `--save-dev`,简写 `-D`
- 保存为依赖 -- 常规 `--save`,简写 `-S`

我们用`--save`或者`-S`来保存包,但是现在这已经是默认值了,要安装一个包并且不保存它,可以使用`--no-save`.

还有一些不常见的快捷方式,如下:

- 安装包信息将加入到 optionalDependencies(可选阶段的依赖) -- 常规 `--save-optional`, 简写 `-O`
- 精确安装制模块版本 -- 常规 `--save-exact`, 简写 `-E`

如果需要在本地保存一个 npm 包,或者通过单个文件下载选择一组可用的包,可以使用`--save-bundle`或者`-B`将他们捆绑在一起,并且使用`npm pack`或者捆绑包.

## 自定义`npm init`脚本

我们可以通过重定向到主目录的`.npm-init.js`文件来编辑`npm init`初始化 npm 时的脚本.(在 Windows 上,通常是`C:/User/<用户名>`,Mac 上是`/Users/<用户名>`)

首先在我们的主目录中创建一个`.npm-init.js`文件.确保`npm init`被指向正确的文件,可以运行:

```shell
npm config set init-module ~\.npm-init.js
```

```javascript
// .npm-init.js

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
