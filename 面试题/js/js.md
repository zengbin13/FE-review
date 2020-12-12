### new 操作符

**new进行步骤**

- 创建新对象
- 链接到原型，绑定this
  - 空对象的`__proto__`属性指向构造函数的原型对象
- 执行构造函数
- 返回新对象

**实现new**

```js
//es5
function _new() {
    //创建空对象
    let obj = new Object
    //获取构造函数
    let Fun = [].shift.call(argument)
    //绑定到原型
    obj.__proto__ = Fun.prototype
    //绑定this，执行构造函数
    let result = Fun.apply(obj, argument)
    //确保new为对象 
    return typeof result === 'object' ? result : obj
}
```

```js
//es6
function _new(fn, ..arg) {
    const obj = Object.create(fn.protoType)
    const ret = fn.apply(obj, arg)
    return ret instanceof Object ? ret : obj
}
```

- 对于实例对象来说，都是通过 new 产生的



###  查找英文文章中出现频率最高的单词

```js
function findMostWord(article) {
    //合法判断
    if(!article) return;
    //参数处理
    article = article.trim().toLowerCase()
    
}
```

