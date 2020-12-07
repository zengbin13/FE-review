// 引入express,并获得express的实例
const express = require('express')
const app = express()
// 导入http模块，并根据express的实例创建node服务
const http = require('http')
const server = http.createServer(app)

server.listen(8000, () => {
    console.log('启动服务器并监听8000端口');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 引入socket.io并立即实例化，把server挂载上去
let io = require('socket.io')(server)
io.on('connection', (socket) => {
    console.log('a user connected');  
    socket.on('test', data => {
        console.log(data);
    })  
});

