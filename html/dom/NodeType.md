# NodeType

body 元素的节点类型

Node Types 存在 12 中不同的节点类型

节点类型常量

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

已弃用的节点类型常量

| 常量                       | 值  | 描述                                                               |
| :------------------------- | --- | ------------------------------------------------------------------ |
| Node.ATTRIBUTE_NODE        | 2   | 元素 的耦合属性 。在 DOM4 规范里 Node 接口将不再实现这个元素属性。 |
| Node.ENTITY_REFERENCE_NODE | 5   | 一个 XML 实体引用节点。 在 DOM4 规范里被移除。                     |
| Node.ENTITY_NODE           | 6   | 一个 XML `<!ENTITY ...>` 节点。 在 DOM4 规范中被移除。             |
| Node.NOTATION_NODE         | 12  | 一个 XML `<!NOTATION ...>` 节点。 在 DOM4 规范里被移除.            |
