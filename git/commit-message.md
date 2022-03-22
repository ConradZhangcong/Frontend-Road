# 提交说明

在使用 git 提交代码的时候, 需要编写 commit message, 否则不允许提交.

```shell
git commit -m "commit message"
```

具体的规范其实每个团队自行制定, 但是大体上需要遵循一个规则

## 规范

每次提交时, commit message 需要包括三个部分: Header, Body 和 Footer

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中, Header 是必需的, Body 和 Footer 都可以省略.

不管哪一部分, 任何一行都不得超过 72 字符(或者 100 字符), 这是为了避免自动换行影响美观.

### Header

Header 部分只有一行, 包括: `type`(必需), `scope`(可选), `subject`(必需)

#### type

`type`用于说明 commit 的类别, 只允许使用下面 7 个标识

- feat: 新功能(feature)
- fix: 修复 bug
- docs: 文档
- style: 格式(不影响代码运行的变动)
- refactor: 重构(既不是新功能, 也不是修改 bug 的改动)
- test: 增加测试
- chore: 构建过程或辅助工具的变动

如果`type`是`feat`和`fix`, 则 commit 将出现在 change log 中. 其他的自行决定, 建议不要.

#### scope

`scope`用于说明 commit 影响的范围, 比如数据层/控制层/视图层等等, 视不同项目而不同.

#### subject

`subject`是 commit 目的的剪短描述, 不超过 50 字符.

- 以动词开头, 使用第一人称现在时, 比如 change, 而不是 changed 或者 changes.
- 第一个字母小写
- 结尾不加句号(.)

### Body

Body 是对本次 commit 的详细描述, 可以分为多行. 有两个注意点:

1. 使用第一人称现在时, 不如使用`change`而不是`changed`或`changes`
2. 应该说明代码变动的动机, 以及与以前行为的对比

下面是一个范例:

```txt
More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

### Footer

Footer 部分只用于两种情况

#### 1.不兼容变动

如果当前代码与上一版本不兼容, 则 Footer 部分以`BREAKING CHANGE`开头, 后面是对变动的描述, 以及变动理由和迁移方法.

```txt
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
    }

    After:

    scope: {
      myAttr: '@',
    }

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

#### 2.关闭 issue

如果当前 commit 针对某个 issue, 那么可以在 Footer 部分关闭这个 issue.

```txt
Closes #234
# 也可以一次关闭对个
Closes #123, #245, #992
```

### Revert

还有一种特殊情况, 如果当前 commit 用于撤销以前的 commit, 必须以`revert:`开头, 后面跟着被撤销的 Commit 的 Header.

```txt
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

Body 部分的格式是固定的, 必须写成`This reverts commit &lt;hash>.`, 其中的`hash`是被撤销的 commit 的 SHA 标识符.

如果当前 commit 与被撤销的 commit, 在同一个发布里面, 那么它们都不会出现在 Change log 里面. 如果两者在不同的发布, 那么当前的 commit 会出现在 Change log 的`Reverts`小标题下面.

## 参考

[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
