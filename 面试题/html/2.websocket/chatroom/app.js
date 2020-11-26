//后端js

let app = require('http').createServer()
let io = require('socket.io')(app)
let port = 8888
app.listen(port)

/*
监听客户端连接
io为定义的服务端socket
回调函数里面的socket是本次连接的客户端socket
io与socket为一对多的关系
*/ 
io.on('connection', function(socket) {
    //所有的监听on 与发送emit都得写在连接里面 包括断开连接
    socket.on('login', function(data) {
        console.log(data);
    })
})

console.log('app listen at',port);
