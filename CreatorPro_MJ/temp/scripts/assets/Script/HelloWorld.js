"use strict";
cc._RFpush(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script/HelloWorld.js

cc.Class({
    'extends': cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        var root = this;

        if (cc.isNative) {
            window.io = SocketIO;
        } else {
            require('socket.io');
        }
        var socket = io('ws://localhost:3000');
        socket.on('消息', function (msg) {
            console.log(msg);
        });

        socket.emit('登录', 'message');
        socket.emit('消息', '123161616516');

        //http get

        // var xhr = cc.loader.getXMLHttpRequest();
        // xhr.open('GET','http://httpbin.org/get?show_env=1',true);

        // xhr.onreadystatechange = function () {

        //     if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
        //         var httpStatus = xhr.statusText;
        //         var response = xhr.responseText.substring(0, 100) + "...";
        //         root.label.string = response;
        //     }
        // };

        // xhr.send();

        //http post
        // xhr.open("POST", "http://httpbin.org/post");
        // //set Content-type "text/plain;charset=UTF-8" to post plain text
        // xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
        //         var httpStatus = xhr.statusText;
        //         var response = xhr.responseText.substring(0, 100) + "...";
        //         root.label.string = response;
        //     }
        // };
        // xhr.send("plain text message");

        // socket
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();