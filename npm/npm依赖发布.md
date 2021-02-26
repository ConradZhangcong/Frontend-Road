# npm依赖发布

首先需要在npm创建账号

## 登陆账号

`npm login`

需要输入账号,密码和邮箱进行登陆.

## 发布,更新

`npm publish`

发布于更新的命令都是`publish`, 包的名称和版本就是根据项目里面的`package.json`的`name`和`version`, 更新时需要修改version.

如果配置了淘宝镜像，需要把配置修改为npmjs的: `npm config set registry=http://registry.npmjs.org`

## 删除依赖

`npm unpublish [依赖包名称] --force`
