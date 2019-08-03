# FileReader

> FileReader是H5中的WebAPI，它允许Web应用应用程序异步读取存储在用户计算机中的文件（或原始数据缓冲区）的内容，使用`File`或`Blob`对象指定要读取的文件或数据。

## 构造函数

`FileReader()`返回一个新构造的FileReader

## 属性

`FileReader.error` 表示在读取文件过程中发生的错误

`FileReader.readyState`表示`FileReader`状态的数字

| 常量名    | 值   | 描述                 |
| --------- | ---- | -------------------- |
| `EMPTY`   | `0`  | 还没有加载任何数据   |
| `LOADING` | `1`  | 数据正在被加载       |
| `DONE`    | `2`  | 已完成全部的读取请求 |

`FileReader.result`文件的内容，该属性只有在读取操作完成后才生效，数据格式取决于启动读取操作的方式。

## 事件

`FileReader.onabort`处理`abort`事件。该事件在读取操作被中断时触发。

`FileReader.onerror`处理`error`事件。该事件在读取操作发生错误时触发。

`FileReader.onload`处理`onload`事件。该事件在读取操作完成时触发。

`FileReader.onloadstart`处理`loadstart`事件。该事件在读取操作开始时触发。

`FileReader.onloadend`处理`loadend`事件。该事件在读取操作结束时触发。（无论成功或失败）

`FileReader.onprogress`处理`progress`事件。该事件在读取`Blob`时触发。（在读取操作过程中持续触发）

注：由于`FileReader`继承自`EventTarget`,所以所有这些事件也可以通过`addEventListener`方法使用。

## 方法

`FileReader.abort()`

中止读取操作。在返回时，`readyState`属性为`DONE`。

`FileReader.readAsArrayBuffer()`

开始读取指定的`Blob`内容，一旦完成，result属性中保存的将是被读取文件的`ArrayBuffer`数据对象。

`FileReader.readAsBinaryString()`

开始读取指定的`Blob`内容，一旦完成，`result`属性中将包含所读取文件的原始二进制数据。

`FileReader.readAsDataURL()`

开始读取指定的`Blob`内容，一旦完成，`result`属性中将包含一个`data:`URL格式的字符串以表示所读取文件的内容。

`FileReader.readAsText()`

开始读取指定的`Blob`内容，一旦完成，`result`属性中将包含一个字符串以表示所读取的文件内容。

## 代码示例

> 当我们想实现一个上传文件即时预览图片的功能时，就可利用FileReader函数

```js
let oFile = document.querySelector('#my_file') // 文件dom
let oImg = document.querySelector('#my_img') // 图片dom
oFile.onchange = function(){
    let fr = new FileReader()
    // 文件可以上传多个，利用 multiple，所以files是个类数组
    fr.readAsDataURL(oFile.files[0]) 
    fr.onload = function(){
        oImg.src = fr.result
    }
}
```

