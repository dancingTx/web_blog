# 使用 GraphQL 的五大理由

> GraphQL 俨然成为了 API 开发中的新标准。

![](.images/useGraph/top-5-reasons-to-use-graphql.png)

仅仅用了两年多的时间，GraphQL 就已经走在了 API 开发的最前沿。在本篇文章中，我们将解释为什么研发人员喜欢 GraphQL 并揭示其快速被采用的主要原因。

## GraphQL API 有强类型 schema

对于大多数 API 而言，最大的问题就在于缺少强类型约束。许多研发人员发现他们时常处于需要使用废弃的 API 文档的处境之下，他们缺少正确的方法来了解新添加的 API 支持那些操作以及如何去使用它们。

[GraphQL schema](https://graphql.cn/learn/schema/) 是每一个 GraphQL API 的基础。它清晰的定义了 API 所支持的操作（queries、mutations 和 subscriptions），包括输入的参数以及返回的内容。

> GraphQL schema 是一个约定，用于指明 API 的功能。

GraphQL schemas 是强类型，可以用简单而又富有表现力的 GraphQL Schema Definition Language（SDL）进行编写。正是由于其强大的类型系统，研发人员可以获得许多无模式 API 无法想象的好处。例如：可以利用构建工具来验证 API 请求，并检查在编译时与 API 通信中可能发生的任何错误，甚至可以在编辑器中获得自动完成 API 操作的功能。

schema 的另一个好处就是开发人员不需要手动编写 API 文档，因为它可以根据 schema 定义的 API 自动生成文档。这改变了 API 开发的传统玩法。

## 按需获取

研发人员经常谈论的 GraphQL 的主要优势是可以从 API 数据中准确检索出他们苏需要的数据。他们不必依赖返回预定义或者固定数据结构的 Rest API，相反，客户端可以指定 API 返回的数据格式及结构。

这解决了 Rest API 经常遇到的两个问题：OverFetching 和 UnderFetching。

> 通过 GraphQL ，客户端可以指定 API 返回的数据格式及结构。

### 过度获取（OverFetching)

OverFetching 意味着客户端获取了许多实际上根本用不到的数据，因此，它消耗了浏览器的性能（需要更长时间加载以及解析数据），并且浪费使用者带宽。

举个简单的例子：个人资料页面需要显示用户的姓名及生日，但是提供用户相关信息的 API（eg：`/user/:id`) ，不仅返回了用户的姓名和生日，而且还返回了用户的年龄，性别，住址等无用信息。这些信息对于当前页面来说都是无用的，因此不需要获取它们。

### 获取欠缺（UnderFetching）

UnderFetching 和 OverFetching 正好相反，它意味着 API 响应的数据存在欠缺。简单地说，由于 API 中缺少当前页面需要展示的数据，因此需要提供额外的 API 请求以满足当前的数据需求。

最坏的情况下，UnderFetching 还会导致臭名昭著的 N+1 请求问题。客户端需要获取关于数据列表的信息，但是，没有可以满足数据要求的 API。因此，客户端不得不向每一条数据发起请求，以获得相应数据。

例如：思考开发一个用户可以发布文章的博客应用。该应用程序除了显示`user`信息外，还需要显示相应的用户发布的上一篇文章的`title`。但是，调用`/users`接口仅可以获取`user`信息，因此不得不对每个`user`调用对应的`/users/:id/articles`以获取文章信息。

> 使用 REST API，通常可以根据客户端需求来定制特殊的API 接口，以解决上述 UnderFetching 问题。在上述示例中，这将意味着`/users`接口可以返回每个用户的上一篇文章的`title`。这种方法起初看起来似乎是一个很好的解决方案，但是它阻碍了快速的产品开发和迭代周期，因为应用的任何重新设计通常都需要更改后台代码，从这点上看，更加耗时。

## GraphQL 可实现快速的产品开发

GraphQL 使前端开发人员更加轻松。感谢 GraphQL 前端库（如 Apollo，Relay 或 Urql），前端开发人员基本上免费获得缓存、实时更新 UI 等功能，如果没有 GraphQL，那么这些事情可能浪费整个团队的时间和精力。

前端开发人员提高生产力的同时，可以提高产品开发速度。使用 GraphQL，可以在无需修改后端的同时重新设计应用的 UI。

构建 GraphQL API 的过程主要围绕 GraphQL schema。因此，你经常会在 GraphQL 上下文中听到`schema-driven development`，。它仅仅指一个过程，其中功能在`schema`中定义，然后通过解析器（resolver）函数实现。

遵循此过程并且要感谢像 GraphQL Faker 等工具，一旦定义了 schema，前端开发人员就可以高效工作。GraphQL Faker 模拟了整个 GraphQL API（基于它的 schema 定义），因此前端和后端团队完全可以独立工作。

## 编写 GraphQL API

`schema stitching`是 GraphQL 技术中较新的概念之一，简言之，`schema stitching`允许组合和连接多个 GraphQL API 并将它们合并为一个。与 React 组件组成类似，Graph API 也可以由现有的多个 GraphQL API 组成。

这对于客户端应用非常有用，否则这些客户端引用需要与多个 GraphQL API 通信（这通常可以通过微服务架构或与第三方 API（如 GitHub，Yelp 或 Shopify）集成）。

得力于`schema stitching`，客户端只需要处理单个 API，而协调与各种服务通信的复杂性从客户端隐藏掉。

GraphQL bindings 通过重用和共享 GraphQL API 的简单方法，将`schema stitching`的思想提升到了新的水平。

## 丰富的开源生态系统和令人惊叹的社区

虽然 GraphQL 从正式发布到现在仅有两年多的时间，但是从其诞生之日起，它成熟的速度快的令人难以置信。

当它刚问世之初，开发人员使用 GraphQL 的唯一工具是 graphql-js 参考实现，一个 Express.js和 GraphQL 客户端 Relay（Classic）的中间件。

如今，GraphQL 规范的参考实现以各种语言相继提供，并且诞生了大量的 GraphQL 客户端。此外，许多工具（如 Prisma，GraphQL Faker，GraphQL Playground，graphql-config，...）提供了无缝的工作流程，并在构建 GraphQL API 时提供了令人惊叹的开发者体验。

GraphQL 社区日益壮大。许多小型和大型的公司开始在生产中使用它，并且越来越多的 GraphQL Meetup 正在全世界范围内建立。

![](.images/useGraph/185619-5e1d7f44ad2d9418.jpg)

## 原文链接

[**Top 5 Reasons to Use GraphQL**](https://www.prisma.io/blog/top-5-reasons-to-use-graphql-b60cfa683511)