# n - 管理 node 版本

github地址(https://github.com/tj/n)

## 安装使用

### 全局安装

```shell
npm install n -g
```

### 使用 n 安装某个 node 版本

```shell
# 最新稳定版本
n stable
# 最新版本
n latest
# 安装某个具体的node版本
n 11.15.0
# 删除某个版本
n rm 11.15.0
```

## 切换版本

```shell
# 查看已经安装的版本
n ls
# 查看服务器上可用的版本
n ls-remote --all
n ls-remote 11
# 切换版本
n 11.15.0
```

## 以指定版本来执行脚本

```shell
n use 11.15.0 test.js
```
