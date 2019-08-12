# [译]五步理解JSON Web Token(JWT)

![](./images/jwt/16c75a2347188cfc.jpg)

在这篇文章中我们将会讲到：JSON Web Token(JWT) 的基本原理是什么，以及我们为什么要使用它？JWT 是确保我们应用程序可信和安全的重要一环。JWT 允许我们以安全的方式去表示像用户数据之类的声明。

为了解释 JWT 如何工作，我们从一个抽象的定义开始。

> JSON Web Token 是一个 JSON 对象。在 REC 7519 中这么定义：它表示双方的一组安全的信息方式。它由 头部（header），负载（payload）和签名（signature）组成。

简单来说，JWT 是一个具有下面形式的字符串：

```json
header.payload.signature
```

我们应该注意的是，带有双引号（""）的字符才被人为是一个有效的 JSON 对象。

为了展示我们如何以及为什么使用它，我将使用三个简单的实体实例，如下：

三个实例分别为用户，应用服务器，以及授权认证服务器。授权认证服务器将会向用户提供 JWT，有了 JWT 用户可以安全地与应用程序服务器通信。

![](./images/jwt/16c75a96efe00178.jpg)

在上面的例子中，用户首先使用认证服务器的登陆系统登陆认证服务器。（比如：用户名，密码，Facebook，Google 账号登陆）。然后授权认证服务器创建 JWT，并将其发送给用户。当用户与应用程序之间有 API 调用的时候，在此过程中用户会传递 JWT。在这一步中，应用程序服务器将会验证传过来的 JWT，检查是否为认证服务器所创建（更详细的过程后面会介绍）。因为，当用户与应用程序之间使用携带的 JWT 进行 API 调用的时候，应用程序可以使用 JWT 来验证 API 调用是否来自经过身份验证的用户。

接下来，我们将更深入的研究 JWT 的构造以及验证方式。

## 创建 Header（头部）

JWT 的头部包含有关如何计算 JWT 签名的信息。头部类似于如下格式的 JSON 对象：

```json
{
    "typ":"JWT",
    "alg":"HS256"
}
```

在这个 JSON 对象中。`typ`键的值表示对象是`JWT`,`alg`的值表示用于创建 JWT 签名的哈希算法。在示例中，我们用 HMAC-SHA256 算法，（一种使用密钥的哈希算法）来生成签名。（这个我们会在第三部中进行更详细的讨论）

## 创建 PAYLOAD（负载）

负载也是 JWT 的一部分，用来存放 JWT 里面的数据（该数据也被称为 JWT 的 ‘声明’）。在我们的例子中，身份认证服务器会创建一个 JWT，并把用户的信息储存在里面，尤其是用户 ID。

```json
{
    "userID":"b08f86af-35da-48f2-8fab-cef3904660bd "
}
```

在我们的例子中，我们只放了一个字段在 payload 中。其实你可以根据你的需要添加的任何数量的字段。

JWT 有几个标准的官方字段像：

> "iss(issure)"：签发人,
>
> "sub(subject)"：主题,
>
> "exp(expiration time)"：过期时间

这些字段在创建 JWT 的时候很有用，但是他们是可选的。

我们要记住，数据的大小将影响 JWT 的整体大小，这通常都不是问题，但是过大的 JWT 可能会产生负面影响，并导致延迟。

## 创建 SINATURE（签名）

签名用下面的伪代码实现：

```js
// 签名算法
data = base64urlEncode(header)+'.'+base64urlEncode(payload)
hashedData = hash(data,secret)
signature = base64urlEncode(hashedData)
```

该算法所做的是，用在第一步和第二步中创建的`header`和`payload`进行`base64url`编码。然后将该算法得到的编码字符串在他们之间用`.`链接起来。在我们的伪代码中，链接起来的字符串会放在数据中。这个字符串用于 JWT 头部中指定哈希算法的密钥。生成的三列数据将会分配给 hashData。然后对 hashData 数据进行 `base64url`编码以产生 JWT 签名。

在示例中，头部和负载都是像下面这样经过`base64url`编码的格式：

```json
// header
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 
// payload
eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYZOTA0NjYwYmQifQ
```

然后，对周期性编码的`header`和`payload`应用带有指定密钥的签名算法。在我们的例子中，这表示在数据上使用 Header 里面指定的 HS256 算法，并将密钥设置为字符串`secret`以获取 hashData 字符串。在 hashData 经过 `base64url`编码后我们得到以下 JWT 签名:

```js
// // signature
-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
```

## 将 JWT 的三个部分组合在一起

至此我们已经生成了二 JWT 的三个组成部分。记住 JWT 的结构**header.payload.signature**

我们只需要简单的把这三个部分用`.`连接起来就行。我们使用上面的经过`base64url`编码得到的`header`，`payload`以及第三步得到的`signature(签名)`组成下面的 JWT 。

```js
// JWT Token 
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
```

你可以尝试在浏览器上通过 jwt.io 来创建自己的 JWT

回到我们的例子，现在授权服务器就可以把 JWT 发送给用户了。

**JWT 是如何保证我们的数据安全的。**

我们重要的是要理解我们使用 JWT 的目的不是为了以任何方式隐藏数据。使用它的目的是为了验证我们接收到的数据来自真实的数据源。

正如我们前面步骤所示，JWT 里面的数据是经过编码和签名的，而不是加密的。编码数据的目的是为了转化数据结构。签名数据允许数据接收者验证数源的真实性。因此，编码和签名数据不会保护数据。另一方面，加密的目的主要是为了保护数据以防止未授权的访问。

> **由于 JWT 只是被编码以及签名，并且未加密，因此 JWT 并不能保证敏感数据的安全性。**

## 验证 JWT 

在上述简单的三个实体案例中，我们使用的是由 HS256 算法签名的 JWT，其中只有认证服务器和应用服务器知道密钥。当应用程序设置认证过程的时候，它接收到来自授权服务器的密钥。因为应用程序服务器知道密钥，当用户对应用程序进行有 JWT 的 API 调用的时候，应用程序可以使用与步骤3中相同的签名算法。然后应用程序服务器可以验证从其自己的哈希操作中获得的签名是否与 JWT 本身的签名匹配。（即：它是否与身份验证服务器创建的 JWT 签名匹配）。如果签名匹配，则表示收到的 JWT 有效，表示 API 调用来自可信源。除此之外，如果签名不匹配，则表示收到的 JWT 无效，这可能表示应用程序可能受到了潜在的攻击。因此，通过验证 JWT，应用程序在自身和用户之间添加了一层信任。

## 总结

我们了解了什么是 JWT ，以及如何创建和验证它们，如何使用它们来确保应用程序与其用户之间的信任。这是理解 JWT 基础知识以及它有用的开始。JWT 只是确保了在你的应用程序中的信任和安全性难题之一。

应该注意的是，本文所描述的JWT 认证设置所使用的是对称密钥算法（HS256）。你也可以以类似的方式设置JWT 身份验证， 除非你使用非对称算法（RS256）,并且应用程序服务器具有公钥。请看这个 在[Stack OverFlow](https://link.juejin.im?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F39239051%2Frs256-vs-hs256-whats-the-difference)中的问题，了解使用对称和非对称算法之间的差异。

还应该注意的是， JWT 应该是HTTPS连接(而不是 HTTP)。HTTPS连接有助于防止未授权的用户通过使用它来窃取发送的JWT,从而别人无法拦截服务器和用户之前的通信。

此外，JWT 中的 payoad(负载)设置过期时间,特别是过期时间短的payload(负载)。这样如果旧的JWT 受到攻击，它们将被是为无效，并且不能再被使用。

## 原文链接

[5 Easy Steps to Understanding JSON Web Tokens (JWT)](https://link.juejin.im/?target=https%3A%2F%2Fmedium.com%2Fvandium-software%2F5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec)

