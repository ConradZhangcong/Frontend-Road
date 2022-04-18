# npm 依赖发布

首先需要在 npm 创建账号

## 权限相关

发布包需要验证你的账号权限，第一次执行`npm adduser`,后面就只需要`npm login`了。有时候我们遇到说你用户名密码错误，但实际并没错，可能是因为你的 registry 设置成了淘宝镜像的 url，npm 配置可以前往`~/.npmrc`查看，可以通过`npm config delete registry`删除掉。如果你需要一个人帮你一起发包，可以使用`npm owner add <user> [<@scope>/]<pkg>`去添加一个用户，不过最好还是把发布权限收紧，其他人提 MR，包的 owner 进行 code review，然后发包。

## 发布,更新,删除

`npm publish`

发布于更新的命令都是`publish`, 包的名称和版本就是根据项目里面的`package.json`的`name`和`version`, 更新时需要修改 version.

如果配置了淘宝镜像，需要把配置修改为 npmjs 的: `npm config set registry=http://registry.npmjs.org`

删除依赖: `npm unpublish [依赖包名称] --force`

## 限制发布时的文件

第一种方式是在 `package.json` 里 `files` `字段来控制，files` 字段的值是一个数组，你可以写具体文件名，也可以写目录，还支持 `glob` 模式。

第二种就是使用 `.npmignore` 配置文件，他类似于 `.gitignore` 文件，其实如果没有 `.npmignore`，会使用`.gitignore`来取代他的功能。在包的根目录下，`.npmignore`不会覆盖 `files` 字段，但在子目录中会覆盖。

有些文件不能无法通过配置排除或者包含：

- package.json
- README
- CHANGES / CHANGELOG / HISTORY
- LICENSE / LICENCE
- NOTICE
- main 字段中的文件

以上文件无法忽略。

- .git
- CVS
- .svn
- .DS\*Store
- .\*\*
- 等等

以上文件无法发布到 npm。

## version

npm 的版本号需要遵循语义化版本, 一个版本号包含三个部分: `MAJOR.MINOR.PATCH`

- `MAJOR`表示主版本号, 当你做了不兼容的 API 修改
- `MINOR`表示次版本号, 当你做了向下兼容的功能性新增
- `PATCH`表示修订号, 当你做了向下兼容的问题修正

可以使用`npm version`命令来自动修改版本号:

```js
// current version = v1.0.0
npm version patch
// v1.0.1
npm version prepatch
// v1.0.2-0
npm version minor
// v1.1.0
npm version major
// v2.0.0
npm version prerelease --preid=alpha
// v2.0.0
```

一般来说还有先行版本，测试版本等，他们这样命名

3.1.0-beta.0
3.1.0-alpha.0

## package.json

`files`

`main`代表入口文件, 其他人下载依赖后引用的入口文件

`peerDependency`代表着当前 npm 包依赖下面这几种环境

## 参考

[npm 发包者必读](https://juejin.cn/post/6844903870678695943)
