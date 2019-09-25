### DOM Tree 是如何构建的？

1. **转码** 浏览器将接受到的二进制数据按照指定的编码规则进行解析，将其转化成 HTML 字符串
2. **生成 Tokens** 之后开始 parser，浏览器会将 HTML 字符串解析成 Tokens
3. **构建Nodes** 对 Node 添加特定的属性，通过指针确定 Node 的父、子、兄弟关系和所属 treeScope
4. **生成DOM Tree** 通过 node 包含的指针确定的关系构建出 DOM Tree

![](E:\code\web_blog\docs\question\面试相关\解释问题\网络面试题\images\16d61012055a05d7.jpg)

