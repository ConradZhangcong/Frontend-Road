# 配置 git 环境

## 安装 git

安装 git 过程省略, 可以根据自身系统安装.

## 配置用户

```shell
git config --global user.name "Your name"
git config --global user.email "email@example.com"
```

注意: --global 是在全局配置, 如果不加的话可以在某个文件夹下配置特定的用户名和邮箱.

查看用户名和邮箱, 去除最后设置的字符串即可查看:

```shell
# global config
git config --global user.name
git config --global user.email
# current config
git config user.name
git config user.email
```

## 生成秘钥

秘钥默认生成位置, mac 系统: `~/.ssh`, windows 系统: `C:/Users/当前用户/.ssh`

```bash
ssh-keygen -t rsa -C "邮箱"
```

## 配置远程仓库

将`.ssh/id_rsa.pub`(公钥)文件中的内容复制到远程仓库(`github`/`gitee`/`gitlab`)的`配置-ssh秘钥`中.
