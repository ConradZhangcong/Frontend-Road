# Element 和 Node 的区别

首先通过一个简单的页面获取其中的`childNodes`:

```html
<body>
  <div id="root">
    <p>hello world</p>
  </div>
  <!-- TODO: node vs element -->
  <span>123;&</span>
  <script>
    console.log(document.body.childNodes)
    // NodeList(8) [text, div#root, text, comment, text, span, text, script]
  </script>
</body>
```

上面的例子中,包括`div`,`span`等常见的 h5 标签,在这里就是 Node 中的一种`Element_Node`节点;还有一些`#text`,`comment`等不同的节点类型.

## Node

看下 Node 在 MDN 中的定义:

> `Node` 是一个接口，许多 DOM API 对象的类型会从这个接口继承。它允许我们使用相似的方式对待这些不同类型的对象；比如, 继承同一组方法，或者用同样的方式测试。

`Node.nodeType` 属性可用来区分不同类型的节点,比如元素,文本和注释等.其中有 12 种不同类型的常量:

- 节点类型常量

| 常量                             | 值  | 描述                                                                              |
| :------------------------------- | --- | --------------------------------------------------------------------------------- |
| Node.Element_Node                | 1   | 一个元素节点,例如`<p>`或`<div>`                                                   |
| Node.TEXT_NODE                   | 3   | Element 或者 Attr 中实际的文字                                                    |
| Node.CDATA_SECTION_NODE          | 4   | 一个 CDATASection，例如 <!CDATA[[ … ]]>。                                         |
| Node.PROCESSING_INSTRUCTION_NODE | 7   | 一个用于 XML 文档的 ProcessingInstruction ，例如 `<?xml-stylesheet ... ?>` 声明。 |
| Node.COMMENT_NODE                | 8   | 一个 Comment 节点。                                                               |
| Node.DOCUMENT_NODE               | 9   | 一个 Document 节点。                                                              |
| Node.DOCUMENT_TYPE_NODE          | 10  | 描述文档类型的 DocumentType 节点。例如 `<!DOCTYPE html>` 就是用于 HTML5 的。      |
| Node.DOCUMENT_FRAGMENT_NODE      | 11  | 一个 DocumentFragment 节点                                                        |

- 已弃用的节点类型常量

| 常量                       | 值  | 描述                                                               |
| :------------------------- | --- | ------------------------------------------------------------------ |
| Node.ATTRIBUTE_NODE        | 2   | 元素 的耦合属性 。在 DOM4 规范里 Node 接口将不再实现这个元素属性。 |
| Node.ENTITY_REFERENCE_NODE | 5   | 一个 XML 实体引用节点。 在 DOM4 规范里被移除。                     |
| Node.ENTITY_NODE           | 6   | 一个 XML `<!ENTITY ...>` 节点。 在 DOM4 规范中被移除。             |
| Node.NOTATION_NODE         | 12  | 一个 XML `<!NOTATION ...>` 节点。 在 DOM4 规范里被移除.            |

## NodeList & HTMLCollection

我们日常开发中会用到`document.getElementsByXXX`,这个方法返回的就是一个`HTMLCollection`,只不过它的真实名字是`ElementCollection`.

上面的一个例子中用的`childNodes`以及`querySelectorAll`的返回值是`NodeList`,相当于是`Node`的集合.

需要注意的是,这两者都是**伪数组**.

```html
<body>
  <div id="root">
    <div class="child">1</div>
    <div class="child">2</div>
    <div class="child">3</div>
  </div>
  <script>
    document.getElementById('root') // <div id="root">...</div>
    document.getElementsByClassName('child') // HTMLCollection(3)
    document.getElementsByTagName('div') // HTMLCollection(4)
    document.querySelector('#root') // <div id="root">...</div>
    document.querySelector('.child') // <div class="child">1</div>
    document.querySelectorAll('#root') // NodeList [div#root]
    document.querySelectorAll('.child') // NodeList(3) [div.child, div.child, div.child]
  </script>
</body>
```
