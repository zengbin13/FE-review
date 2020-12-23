## node基础入门

> https://juejin.cn/post/6901093313756332040#heading-18

> **Question:**
>
> 1. 浏览器的事件循环和node的事件循环有什么不同？
> 2. `common.js`的`require`实现原理？
> 3. ES6的 `import`和 `Common.js`的 `require`有什么不同？
> 4. 手写一个 `EventEmmit`类 ？



## Node简介

Node.js是一个**基于 chrome V8 引擎**的 Javascript 运行环境，使用了一个**事件驱动**和**非阻塞式IO**的模型，使其轻便又高效



**安装Node**

```shell
node --version
```

- windows电脑安装时修改安装路径，需**配置环境变量**



**运行node程序**

```js
//app.js
const http = require('http')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.serHeader('Content-type', 'text/plain')
    res.end('你好世界/n')
})
server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})
```

- `http` 的 `createServer()` 方法会创建新的 HTTP 服务器并返回
- 服务器被设置为监听指定的端口和主机名
- 每当接收到新的请求时，[`request` 事件](http://nodejs.cn/api/http.html#http_event_request)会被调用，并提供两个对象
  - 请求对象（[`http.IncomingMessage`](http://nodejs.cn/api/http.html#http_class_http_incomingmessage) ）
  - 响应对象（[`http.ServerResponse`](http://nodejs.cn/api/http.html#http_class_http_serverresponse) ）

运行 `node app.js`

> 每次修改js文件需要重新执行才会生效,安装nodemon 可以监视文件改动,自动重启

```shell
npm i -g nodemon
nodemon app.js
```



### Node.js 与浏览器的区别

- 不具备浏览器提供的 `docment` 、`window` 等对象，但提供如文件系统等API
- 可以控制运行环境，支持高版本JavaScript
- 使用 `CommonJS`模块， `require()`



### 如何从 Node.js 程序退出

`process` 核心模块：`process.exit()`

- 向操作系统发送退出码 `process.exit(1)`
- 任务处理被立即非正常地终止

发送 `SIGTERM` 信号，并使用进程的信号处理程序进行处理

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('你好')
})

const server = app.listen(3000, () => console.log('服务器已就绪'))

process.on('SIGTERM', () => {
    serve.close(() => {
        console.log('进程已终止')
    })
})
```



### 如何从 Node.js 读取环境变量

`process` 核心模块——提供 `env` 属性，承载在启动进程时设置的所有环境变量

```js
process.env.NODE_ENV // "development"
```

