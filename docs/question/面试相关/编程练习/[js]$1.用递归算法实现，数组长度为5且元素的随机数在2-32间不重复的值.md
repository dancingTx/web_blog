### 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值

 - 描述：

    这是一道大题目，把考点拆成了4个小项;需要侯选人用递归算法实现（限制15行代码以内实现；限制时间10分钟内完成）:

      - 生成一个长度为5的空数组arr。
    
  - 生成一个（2－32）之间的随机整数rand。
    
      - 把随机数rand插入到数组arr内，如果数组arr内已存在与rand相同的数字，则重新生成随机数rand并插入到arr内（需要使用递归实现 ，不能使用for/while等循环）
      
  - 最终输出一个长度为5，且内容不重复的数组arr。
    
- 示例：

    ```js
    input: insertArr(arr,generateRandom())
    
    output: [7,12,8,3,1]
    ```

- 实现：

    ```js
    // 生成一个长度为5的空数组arr
    let arr = new Array(5)
    // 生成一个（2~32）之间的随机整数rand
    function generateRandom(){
        return Math.floor(Math.random()*31 +2)
    }
    // 
    let i = 0
    function insertArr(arr,num) {
        if(arr.indexOf(num) !== -1) { // 数字存在
            num = generateRandom() // 重新生成数字
        } else {
            arr[i] = num
            i++
        }
        if (i>=arr.length) { // 当i大于5时，将arr打印输出
            console.log(arr)
            return 
        }else { // 小于5时，递归调用
            insertArr(arr,num) 
        }
    }
    
    ```

- 点评：
  知识点：递归、随机数
  难点：1颗星
  这道题主要是想考递归的用法，同时顺带考了生成指定范围的随机数方法。