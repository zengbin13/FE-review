# 常用方法

## 字符串常用方法

——调用方法时，自动将基本字符串转换为字符串对象

| 方法              | 描述                                                         | 使用                                                         |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **charAt()**      | 从一个字符串中返回指定的字符                                 | str.charAt(index)                                            |
| **toString()**    | 返回指定对象的字符串形式                                     | str.toString()                                               |
| **endsWith()**    | 判断当前字符串是否是以给定的子字符串**结尾**的，返回布尔值   | str.endsWith(searchString[, length])                         |
| **startsWith()**  | 同上，**开始**                                               | str.startsWith(searchString[, position])                     |
| **padEnd**        | 用指定字符串**填充**当前字符串，返回填充后字符串             | str.padEnd(targetLength [, padString])                       |
| **padStart()**    | 同上，**左侧填充**指定字符串                                 | str.padStart(targetLength [, padString])                     |
| **toLowerCase()** | 将字符串值转为**小写**形式，并返回                           | str.toLowerCase()                                            |
| **toUpperCase()** | 将字符串值转为**大写**形式，并返回                           | str.toUpperCase()                                            |
|                   |                                                              |                                                              |
| **concat()**      | 将一个或多个字符串与原字符串连接**合并**，形成一个新的字符串并返回 | str.concat(str2, [, ...strN])                                |
| **includes()**    | 用于判断一个字符串**是否包含**在另一个字符串中，返回布尔值   | str.includes(searchString[, position])                       |
| **indexOf()**     | 返回给定字符在当前字符串的**索引值**，未找到返回-1           | str.indexOf(searchValue [, fromIndex])                       |
| **lastIndexOf()** | 返回给定字符在当前字符串**最后一次出现的索引值**，未找到返回-1 | str.lastIndexOf(searchValue[, fromIndex])                    |
| **match()**       | 检索返回一个字符串**匹配正则表达式**的结果                   | str.match(regexp)                                            |
| **matchAll()**    |                                                              |                                                              |
| **repeat()**      | 构造并返回一个**指定次数重复**的新字符串，                   | str.repeat(count)                                            |
| **replace()**     | 返回一个由替换值（`replacement`）**替换**部分或所有的模式（`pattern`）匹配项后的新字符串 | str.replace(regexp\|substr, newSubStr\|function)             |
| **repacleAll()**  | 同上，字符串**全局替换**                                     | const newStr = str.replaceAll(regexp\|substr, newSubstr\|function) |
| **search()**      | 执行正则表达式和 String 对象之间的一个**搜索匹配**，返回索引值 | str.search(regexp)                                           |
| **slice()**       | **提取**某个字符串的一部分，并返回新字符串                   | str.slice(beginIndex[, endIndex])                            |
| **split()**       | 使用指定分割字符，将字符串**分割为数组**                     | str.split([separator[, limit]])                              |
| **substring()**   | 返回一个字符串在开始索引到结束索引之间的一个**子集**         | str.substring(indexStart[, indexEnd])                        |
| **trim()**        | 将字符串两端**空白字符删除**，并返回                         | str.trim()                                                   |

```js
//charAt()
'hello'.charAt(1) //e

//concat()
'hello'.concat('-', 'world', '-', '!')  //"hello-world-!"

//endsWith()
'hello world'.endsWith('r', 9) //true

//startsWith()
'hello world'.startsWith('e', 1) //true

//includes()
'hello world'.includes('world', 0) //true

//indexOf()
'hello world'.indexOf('o', 4) // 7

//lastIndexOf()
'hello world'.lastIndexOf() // 7

//match()
'Hello World'.match(/[A-Z]/g) //["H", "W"]

//matchAll()

//padEnd()
'hello world'.padEnd(15, '!') // "hello world!!!!"

//padStart()
'hello world'.padStart(15, '<') //"<<<<hello world"

//repeat()
'hello world'.repeat(2) // "hello worldhello world"

//replace()
'hello world'.replace('o', 'O') // "hellO world"
'hello world'.replace(/o/g, 'O') // "hellO wOrld"

//replaceAll()
'hello world'.replaceAll('o', 'O') //"hellO wOrld"

//search()
'hello world'.search(/o/g) // 4

//slice()
'hello world'.slice(-5) // "world"

//split()
'hello world'.split('l') // ["he", "", "o wor", "d"]

//substring()
'hello world'.subString(2,8) // llo wo"

//trim()
'  hello world  '.trim() // "hello world"


//toLowerCase()
'HELLO WORLD'.toLowerCase() // "hello world"

//toUpperCase()
'hello world'.toUpperCase() // "HELLO WORLD"
```



# ES6 新特性

## let 和 const 命令

|                        | var                  | let              | const          |
| ---------------------- | -------------------- | ---------------- | -------------- |
| 作用域                 | 函数级作用域         | 块级作用域       | 块级作用域     |
| 变量提升               | 变量提升 / undefiend | ReferenceError   | ReferenceError |
| 存放位置（执行上下文） | 变量环境             | 词法环境         | 词法环境       |
| 重复声明               | 可以                 | 同作用域下不可以 | 同上           |
| 可变性                 | 可变                 | 同上             | 只读常量       |

- for循环使用 `let` 保证计数器仅在循环体内有效，`var`将计数器 `i`泄露为全局变量

- `let / const`声明的变量不存在变量提升，只能在变量声明后使用，否则报错 `referenceError`

- **暂时性死区**——只要 `let / const`声明变量，声明的变量绑定在该块级区域，不受外部影响

  > 如果区块中存在let和const命令，该区块对 let / const 命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错

  ```js
  var tmp = 123;
  if (true) {
     tmp = 'abc' // ReferenceError
     let tmp;
  }
  ```

- `const`一旦声明变量，需立即初始化，指向内存地址保存值不可变
  
- 复杂数据类型，内存地址不可变，数据可变
  
- let / const 声明的变量为非全局变量，`window.a //undefined`



### 块级作用域

```js
//IIFE 立即执行函数
（function () {
    var tmp = ...;
    ...
}())

// 块级作用域
{
    let tmp = ...;
    ...
}
```

- ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用



## 变量的解构赋值

ES6 允许按照一定模式，**从数组和对象中提取值，对变量进行赋值**

### 数组——解构赋值 

- **解构模式**：数组中提取值，按照对应位置，对变量赋值

  ```js
  let [a, b, c] = [1, 2, 3]
  let [head, ...tail] = [1, 2, 3, 4];
  ```

- 解构不成功，变量的值就等于`undefined`

- 解构赋值指定默认值，默认值生效条件，变量值为 `undefined`

  ```js
  let [foo = true] = [];
  let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
  ```

### 对象——解构赋值

- **解构模式**：对象的属性没有次序，变量必须与属性同名，才能取到正确的值

  ```js
  let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
  ```

- 解构失败，变量的值等于`undefined`

  ```js
  let { baz } = { foo: 'aaa', bar: 'bbb' };
  baz // undefined
  ```

- 内部机制——前面变量名匹配，后面变量名赋值

  ```js
  let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
  ```

- 对象解构指定默认值，生效条件属性值严格等于 `undefined`

  ```js
  let {x : 3} = {x : undefined}
  ```

  

### 字符串、数值、布尔值——解构赋值

- 字符串转换为一个类似数组的对象

  ```js
  const [a, b, c, d, e] = 'hello'
  let {length : len} = 'hello'
  ```

- **解构赋值规则**——**只要等号右边的值不是对象或数组，就先将其转为对象**

  - 如果等号右边是数值和布尔值，则会先转为对象

    ```js
    let {toString: s} = 123;
    s === Number.prototype.toString // true
    ```

  - `undefined`和`null`无法转为对象，无法解构赋值报错

    ```js
    let { prop: x } = undefined; // TypeError
    ```

  

### 函数参数——解构赋值

```js
// 函数传入数组
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);  // [ 3, 7 ]

// 函数传入对象
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
```



### 解构赋值用途

1. 交换变量的值

   ```
   [x, y] = [y, x];
   ```

2. 从函数返回多个值

   ```js
   function example() {
     return [1, 2, 3];
   }
   let [a, b, c] = example();
   ```

3. 函数参数的定义

   ```js
   // 参数是一组有次序的值
   function f([x, y, z]) { ... }
   f([1, 2, 3]);
   
   // 参数是一组无次序的值
   function f({x, y, z}) { ... }
   f({z: 3, y: 2, x: 1});
   ```

4. 提取 JSON 数据

   ```js
   let { id, status, data: number } = jsonData;
   ```

5. 函数参数的默认值

   ```js
   jQuery.ajax = function (url, {
     async = true,
     beforeSend = function () {},
     cache = true,
     complete = function () {},
     crossDomain = false,
     global = true,
     // ... more config
   } = {}) {
     // ... do stuff
   };
   ```

   

## 模板字符串

- 使用反引号（`）标识
- 作用：普通字符串、多行字符串、在字符串中嵌入变量
  - 多行字符串：所有的空格和缩进都会被保留
  - 嵌入变量：将变量名写在`${}`
  
  

## for...of / for...in

- `for ... of`：允许遍历一个含有iterator接口的数据结构并**返回各项值**
  - 遍历数组、Set、Map、类数组结构等

```js
const arr = ['red', 'green', 'blue']

for(let v of arr) {
    console.log(v); //red green blue
}
```



-  `for...in`：允许遍历获得键值
  - for ... in遍历对象的整个原型链,性能较差

```js
var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
  console.log(a); // 0 1 2 3
}
```



## 箭头函数

- ES6 允许使用**箭头**（=>）定义函数

- 箭头函数返回对象使用括号

  ```js
  let getTempItem = id => ({ id: id, name: "Temp" });
  ```

- 不存在`arguments`属性保存参数，使用剩余运算符代替

  ```js
  const headAndTail = (head, ...tail) => [head, tail];
  headAndTail(1, 2, 3, 4, 5)  // [1,[2,3,4,5]]
  ```

- 箭头函数不具备this，当前this是词法的，引用的上下文的this
  
  - 由于箭头函数没有`this`，不能使用`call()`、`apply()`、`bind()`改变`this`的指向
- 不可以当作构造函数，使用 `new` 命令——**没有prototype属性**
- 不可以使用`arguments`对象，使用rest参数代替
- 不可以使用 `yield`命令，箭头函数不能用作 Generator 函数



## 剩余/扩展运算符

## 正则表达式

