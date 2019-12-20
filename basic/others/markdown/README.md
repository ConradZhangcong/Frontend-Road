# Markdown 语法

## 标题

- # Hedaer1
- ## Hedaer2
- ### Hedaer3
- #### Hedaer4
- ##### Hedaer5
- ###### Hedaer6

```markdown
- # Hedaer1
- ## Hedaer2
- ### Hedaer3
- #### Hedaer4
- ##### Hedaer5
- ###### Hedaer6
```

## 字体

- 用*表示
  - *Italic*
  - **Blod**
  - ***Italic and Blod***
- 用_表示
  - _Italic_
  - __Blod__
  - ___Italic and Blod___

```markdown
- 用*表示
  - *Italic*
  - **Blod**
  - ***Italic and Blod***
- 用_表示
  - _Italic_
  - __Blod__
  - ___Italic and Blod___
```

## 删除线

开头结尾使用~~表示

~~删除~~

```markdown
~~删除~~
```

## 列表

### 无序列表 用 * + - 都可以表示

* 列表
  + 次级
  - 次级
* 列表

### 有序列表 用数字.表示

1. 列表
    1. 次级
    2. 次级
2. 列表

## 区块引用

用>表示引用,多层引用就用多个>

> 一级引用
>> 二级引用
>>> 三级引用
>>>> 四级引用

```markdown
> 一级引用
>> 二级引用
>>> 三级引用
>>>> 四级引用
```

## 分割线

用三个 * 或者 - 或者 _ 表示

***
---
___

```markdown
***
---
___
```

## 链接

- 链接文字放到中括号[]里，链接地址放到小括号里

例如: `[Conrad](https://github.com/ConradZhangcong/)` => [Conrad](https://github.com/ConradZhangcong/)

- 链接地址放在<>里

例如: `<https://github.com/ConradZhangcong/>` => <https://github.com/ConradZhangcong/>

- 引用,通常用于注解

`[谷歌][1]`

`[1]: http://google.com/`

=>

[谷歌][1]

[1]: http://google.com/

## 图片

`![图片文字](url)` => ![Conrad](./favicon.ico)

## 表格

用:的不同位置来改变对齐方式,默认左对齐(`:-`),右对齐(`-:`),居中对齐(`:-:`)

|  head  | head |  head | head    |
| :----: | :--- | ----: | ------- |
| canter | left | right | default |
| canter | left | right | default |
| canter | left | right | default |

## 代码块

开头结尾使用\`,单行用一个\`,多行用三个\`\`\`

`console.log(123)`

```javascript
for(let i = 0; i < 3; i++){
  console.log(i)
}
```

```text
    `console.log(123)`

    ```javascript
    for(let i = 0; i < 3; i++){
      console.log(i)
    }
    ```
```

## 待办项

使用带有`[ ]`或者`[x]`(未完成或者已完成)来表示待办项

- [ ] Markdown 语法
  - [x] 基础功能
  - [ ] 进阶功能
