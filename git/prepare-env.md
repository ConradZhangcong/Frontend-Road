# 配置 git 环境

## 安装 git

## 配置用户

```bash
git config --global user.name "用户名"
git config --global user.email "邮箱"
# 查看这两个配置
git config --global user.name
git config --global user.email
```

## 生成秘钥

秘钥默认生成位置, mac 系统: `~/.ssh`, windows 系统: `C:/Users/当前用户/.ssh`

```bash
ssh-keygen -t rsa -C "邮箱"
```

## 配置远程仓库

将`.ssh/id_rsa.pub`(公钥)文件中的内容复制到远程仓库(`github`/`gitee`/`gitlab`)的`配置-ssh秘钥`中.
