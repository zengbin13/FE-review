## node基础入门

> https://juejin.cn/post/6901093313756332040#heading-18

> **Question:**
>
> 1. 浏览器的事件循环和node的事件循环有什么不同？
> 2. `common.js`的`require`实现原理？
> 3. ES6的 `import`和 `Common.js`的 `require`有什么不同？
> 4. 手写一个 `EventEmmit`类 ？



### Node介绍

Node.js是一个**基于 chrome V8 引擎**的 Javascript 运行环境，使用了一个**事件驱动**和**非阻塞式IO**的模型，使其轻便又高效

**安装Node**

```shell
node --version
```

- windows电脑安装时修改安装路径，需**配置环境变量**

**运行node程序**

```js
//app.js
console.log('hello node');
```

- 运行 `node app.js`

> 每次修改js文件需要重新执行才会生效,安装nodemon 可以监视文件改动,自动重启

```shell
npm i -g nodemon
nodemon app.js
```



### 回调函数

Node.js 异步编程的直接体现就是回调，回调函数在完成任务后就会被调用

例如：读取文件时，执行其他命令，在文件读取完成后，将文件内容作为回调函数参数返回