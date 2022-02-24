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

## 查看依赖列表

```shell
# 查看安装的所有依赖
npm list # 简写: npm ls

# 查看全局安装的所有依赖
npm list -g
```

## 参考

[npm Docs](https://docs.npmjs.com/)

[前端小智 - 13 个 npm 快速使用开发技巧](https://github.com/qq449245884/xiaozhi/issues/71)
