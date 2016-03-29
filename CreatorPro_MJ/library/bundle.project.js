require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"GameData":[function(require,module,exports){
cc._RFpush(module, '3561135iQFOEIfoLTO8G85P', 'GameData');
// Script\GameData.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"GameListCell":[function(require,module,exports){
cc._RFpush(module, '11761fP9y1DRqkMQyB/dQ1C', 'GameListCell');
// Script\GameListCell.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        GameId: 0,
        CoinNum: 0,
        Label: {
            "default": null,
            type: cc.Label
        },
        spriteList: {
            "default": [],
            type: [cc.SpriteFrame]
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // var img = 'Resource/UI/roomBg'+this.GameId.toString()+'.png';
        // console.log(img);
        // var frame = new cc.SpriteFrame(cc.url.raw(img));

        var com = this.getComponent(cc.Sprite);
        //com.spriteFrame = frame;

        com.spriteFrame = this.spriteList[this.GameId];

        this.Label.string = this.CoinNum.toString();
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"GameList":[function(require,module,exports){
cc._RFpush(module, '72723WvUhFK8rF7P/HeINQl', 'GameList');
// Script\GameList.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        ListLayout: {
            'default': null,
            type: cc.Layout
        },
        Cell_prefab: {
            'default': null,
            type: cc.Prefab
        }
    },

    self: null,

    // use this for initialization
    onLoad: function onLoad() {
        self = this;

        for (i = 0; i < 4; ++i) {
            var newCell = cc.instantiate(this.Cell_prefab);

            newCell.getComponent('GameListCell').GameId = i;
            newCell.getComponent('GameListCell').CoinNum = 100 * i;

            this.ListLayout.node.addChild(newCell);

            console.log(this.ListLayout);
        }
    },

    onGameSelected: function onGameSelected(sender, value) {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"HelloWorld":[function(require,module,exports){
cc._RFpush(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script\HelloWorld.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        label: {
            'default': null,
            type: cc.Label
        },
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.label.string = this.text;
        var root = this;

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
},{}],"Login":[function(require,module,exports){
cc._RFpush(module, 'bf269SHOdVBvLyamtHjegxg', 'Login');
// Script\Login.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {

        registerLayer: {
            "default": null,
            type: cc.Node
        }

    },

    // foo: {
    //    default: null,
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    // use this for initialization
    onLoad: function onLoad() {},

    onLogIn: function onLogIn() {
        console.log("logIn");
    },

    onQuickLogIn: function onQuickLogIn() {
        console.log("QUicklogIn");
        cc.director.loadScene('GameList');
    },

    onRegister: function onRegister() {
        this.registerLayer.active = true;
    },

    onRegisterClose: function onRegisterClose() {
        this.registerLayer.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"SigleImgBtn":[function(require,module,exports){
cc._RFpush(module, 'a310beKkwZApa5rKUMTDiY/', 'SigleImgBtn');
// Script\tool\SigleImgBtn.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function onTouchBegan(touch, event) {

                self.node.setScale(2);
                console.log("adafd");

                return true;
            },
            onTouchEnd: function onTouchEnd(touch, event) {

                self.node.setScale(1);
            }
        }, self.node);
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}]},{},["GameListCell","HelloWorld","GameData","GameList","SigleImgBtn","Login"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9TY3JpcHQvR2FtZURhdGEuanMiLCJhc3NldHMvU2NyaXB0L0dhbWVMaXN0Q2VsbC5qcyIsImFzc2V0cy9TY3JpcHQvR2FtZUxpc3QuanMiLCJhc3NldHMvU2NyaXB0L0hlbGxvV29ybGQuanMiLCJhc3NldHMvU2NyaXB0L0xvZ2luLmpzIiwiYXNzZXRzL1NjcmlwdC90b29sL1NpZ2xlSW1nQnRuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2MuX1JGcHVzaChtb2R1bGUsICczNTYxMTM1aVFGT0VJZm9MVE84Rzg1UCcsICdHYW1lRGF0YScpO1xuLy8gU2NyaXB0XFxHYW1lRGF0YS5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnMTE3NjFmUDl5MURScWtNUXlCL2RRMUMnLCAnR2FtZUxpc3RDZWxsJyk7XG4vLyBTY3JpcHRcXEdhbWVMaXN0Q2VsbC5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIEdhbWVJZDogMCxcbiAgICAgICAgQ29pbk51bTogMCxcbiAgICAgICAgTGFiZWw6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgc3ByaXRlTGlzdDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvLyB2YXIgaW1nID0gJ1Jlc291cmNlL1VJL3Jvb21CZycrdGhpcy5HYW1lSWQudG9TdHJpbmcoKSsnLnBuZyc7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGltZyk7XG4gICAgICAgIC8vIHZhciBmcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShjYy51cmwucmF3KGltZykpO1xuXG4gICAgICAgIHZhciBjb20gPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAvL2NvbS5zcHJpdGVGcmFtZSA9IGZyYW1lO1xuXG4gICAgICAgIGNvbS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlTGlzdFt0aGlzLkdhbWVJZF07XG5cbiAgICAgICAgdGhpcy5MYWJlbC5zdHJpbmcgPSB0aGlzLkNvaW5OdW0udG9TdHJpbmcoKTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnNzI3MjNXdlVoRks4ckY3UC9IZUlOUWwnLCAnR2FtZUxpc3QnKTtcbi8vIFNjcmlwdFxcR2FtZUxpc3QuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIExpc3RMYXlvdXQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxheW91dFxuICAgICAgICB9LFxuICAgICAgICBDZWxsX3ByZWZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2VsZjogbnVsbCxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgbmV3Q2VsbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuQ2VsbF9wcmVmYWIpO1xuXG4gICAgICAgICAgICBuZXdDZWxsLmdldENvbXBvbmVudCgnR2FtZUxpc3RDZWxsJykuR2FtZUlkID0gaTtcbiAgICAgICAgICAgIG5ld0NlbGwuZ2V0Q29tcG9uZW50KCdHYW1lTGlzdENlbGwnKS5Db2luTnVtID0gMTAwICogaTtcblxuICAgICAgICAgICAgdGhpcy5MaXN0TGF5b3V0Lm5vZGUuYWRkQ2hpbGQobmV3Q2VsbCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTGlzdExheW91dCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25HYW1lU2VsZWN0ZWQ6IGZ1bmN0aW9uIG9uR2FtZVNlbGVjdGVkKHNlbmRlciwgdmFsdWUpIHt9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnMjgwYzNyc1pKSktuWjlScWJBTFZ3dEsnLCAnSGVsbG9Xb3JsZCcpO1xuLy8gU2NyaXB0XFxIZWxsb1dvcmxkLmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dDogJ0hlbGxvLCBXb3JsZCEnXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IHRoaXMudGV4dDtcbiAgICAgICAgdmFyIHJvb3QgPSB0aGlzO1xuXG4gICAgICAgIC8vaHR0cCBnZXRcblxuICAgICAgICAvLyB2YXIgeGhyID0gY2MubG9hZGVyLmdldFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIC8vIHhoci5vcGVuKCdHRVQnLCdodHRwOi8vaHR0cGJpbi5vcmcvZ2V0P3Nob3dfZW52PTEnLHRydWUpO1xuXG4gICAgICAgIC8vIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy8gICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDw9IDIwNykpIHtcbiAgICAgICAgLy8gICAgICAgICB2YXIgaHR0cFN0YXR1cyA9IHhoci5zdGF0dXNUZXh0O1xuICAgICAgICAvLyAgICAgICAgIHZhciByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQuc3Vic3RyaW5nKDAsIDEwMCkgKyBcIi4uLlwiO1xuICAgICAgICAvLyAgICAgICAgIHJvb3QubGFiZWwuc3RyaW5nID0gcmVzcG9uc2U7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8geGhyLnNlbmQoKTtcblxuICAgICAgICAvL2h0dHAgcG9zdFxuICAgICAgICAvLyB4aHIub3BlbihcIlBPU1RcIiwgXCJodHRwOi8vaHR0cGJpbi5vcmcvcG9zdFwiKTtcbiAgICAgICAgLy8gLy9zZXQgQ29udGVudC10eXBlIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIgdG8gcG9zdCBwbGFpbiB0ZXh0XG4gICAgICAgIC8vIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik7XG4gICAgICAgIC8vIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8PSAyMDcpKSB7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGh0dHBTdGF0dXMgPSB4aHIuc3RhdHVzVGV4dDtcbiAgICAgICAgLy8gICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0LnN1YnN0cmluZygwLCAxMDApICsgXCIuLi5cIjtcbiAgICAgICAgLy8gICAgICAgICByb290LmxhYmVsLnN0cmluZyA9IHJlc3BvbnNlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9O1xuICAgICAgICAvLyB4aHIuc2VuZChcInBsYWluIHRleHQgbWVzc2FnZVwiKTtcblxuICAgICAgICAvLyBzb2NrZXRcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHt9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICdiZjI2OVNIT2RWQnZMeWFtdEhqZWd4ZycsICdMb2dpbicpO1xuLy8gU2NyaXB0XFxMb2dpbi5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgcmVnaXN0ZXJMYXllcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBmb286IHtcbiAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgIC8vIH0sXG4gICAgLy8gLi4uXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIG9uTG9nSW46IGZ1bmN0aW9uIG9uTG9nSW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9nSW5cIik7XG4gICAgfSxcblxuICAgIG9uUXVpY2tMb2dJbjogZnVuY3Rpb24gb25RdWlja0xvZ0luKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlFVaWNrbG9nSW5cIik7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZUxpc3QnKTtcbiAgICB9LFxuXG4gICAgb25SZWdpc3RlcjogZnVuY3Rpb24gb25SZWdpc3RlcigpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckxheWVyLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uUmVnaXN0ZXJDbG9zZTogZnVuY3Rpb24gb25SZWdpc3RlckNsb3NlKCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyTGF5ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2EzMTBiZUtrd1pBcGE1cktVTVREaVkvJywgJ1NpZ2xlSW1nQnRuJyk7XG4vLyBTY3JpcHRcXHRvb2xcXFNpZ2xlSW1nQnRuLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLlRPVUNIX09ORV9CWV9PTkUsXG4gICAgICAgICAgICBzd2FsbG93VG91Y2hlczogdHJ1ZSxcbiAgICAgICAgICAgIG9uVG91Y2hCZWdhbjogZnVuY3Rpb24gb25Ub3VjaEJlZ2FuKHRvdWNoLCBldmVudCkge1xuXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLnNldFNjYWxlKDIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRhZmRcIik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRvdWNoRW5kOiBmdW5jdGlvbiBvblRvdWNoRW5kKHRvdWNoLCBldmVudCkge1xuXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLnNldFNjYWxlKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzZWxmLm5vZGUpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7Il19
