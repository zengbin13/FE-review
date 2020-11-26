/*chat.js*/
$(function(){
    /*建立socket连接，使用websocket协议，端口号是服务器端监听端口号*/
    var socket = io('ws://127.0.0.1:8888');
    /*定义用户名*/
    var uname = null;

    /*登录*/
    $('.login-btn').click(function(){
        uname = $.trim($('#loginName').val());
        if(uname){
            /*向服务端发送登录事件*/
            socket.emit('login',{username:uname})
        }else{
            alert('请输入昵称')
        }
    })

})