require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AudioManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, '63f2f1ufHNIJJemeWUUhfm5', 'AudioManager');
// Script/tool/AudioManager.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        winAudio: {
            "default": null,
            url: cc.AudioClip
        },

        loseAudio: {
            "default": null,
            url: cc.AudioClip
        },

        cardAudio: {
            "default": null,
            url: cc.AudioClip
        },

        buttonAudio: {
            "default": null,
            url: cc.AudioClip
        },

        chipsAudio: {
            "default": null,
            url: cc.AudioClip
        },

        bgm: {
            "default": null,
            url: cc.AudioClip
        }
    },

    playMusic: function playMusic() {
        cc.audioEngine.playMusic(this.bgm, true);
    },

    pauseMusic: function pauseMusic() {
        cc.audioEngine.pauseMusic();
    },

    resumeMusic: function resumeMusic() {
        cc.audioEngine.resumeMusic();
    },

    _playSFX: function _playSFX(clip) {
        cc.audioEngine.playEffect(clip, false);
    },

    playWin: function playWin() {
        this._playSFX(this.winAudio);
    },

    playLose: function playLose() {
        this._playSFX(this.loseAudio);
    },

    playCard: function playCard() {
        this._playSFX(this.cardAudio);
    },

    playChips: function playChips() {
        this._playSFX(this.chipsAudio);
    },

    playButton: function playButton() {
        this._playSFX(this.buttonAudio);
    }
});

cc._RFpop();
},{}],"Card":[function(require,module,exports){
"use strict";
cc._RFpush(module, '98d48Z0qrVEv6aaRh6QNNZa', 'Card');
// Script/Game/Card.js

"use strict";

var CARD_TYPE = cc.Enum({
    OWN: 1,
    LEFT: 2,
    RIGHT: 3,
    UP: 4
});

cc.Class({
    "extends": cc.Component,

    properties: {
        CardId: 1,
        CardType: {
            "default": CARD_TYPE.OWN,
            type: CARD_TYPE
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        switch (this.CardType) {
            case CARD_TYPE.OWN:
                // var img = 'own_down_'+this.GameId.toString()+'.png';
                // console.log(img);
                // var frame = new cc.SpriteFrame(cc.url.raw(img));
                // var com = this.getComponent(cc.Sprite);
                // com.spriteFrame = frame;
                break;

            default:

        }
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"GameData":[function(require,module,exports){
"use strict";
cc._RFpush(module, '3561135iQFOEIfoLTO8G85P', 'GameData');
// Script/Data/GameData.js

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
"use strict";
cc._RFpush(module, '11761fP9y1DRqkMQyB/dQ1C', 'GameListCell');
// Script/GameList/GameListCell.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        MainScriptNode: {
            'default': null,
            type: cc.Node
        },
        GameId: 0,
        CoinNum: 0,
        Label: {
            'default': null,
            type: cc.Label
        },
        SpriteList: {
            'default': [],
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

        com.spriteFrame = this.SpriteList[this.GameId];

        this.Label.string = this.CoinNum.toString();
    },
    onCellClicked: function onCellClicked() {
        this.MainScriptNode.getComponent('GameList').onGameSelected(this.GameId);
    }
});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"GameList":[function(require,module,exports){
"use strict";
cc._RFpush(module, '72723WvUhFK8rF7P/HeINQl', 'GameList');
// Script/GameList/GameList.js

cc.Class({
    'extends': cc.Component,

    properties: {
        audioManager: {
            'default': null,
            type: cc.Node
        },
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

        this.audioManager = this.audioManager.getComponent('AudioManager');
        this.audioManager.playMusic();

        for (var i = 0; i < 4; ++i) {
            var newCell = cc.instantiate(this.Cell_prefab);

            newCell.getComponent('GameListCell').GameId = i;
            newCell.getComponent('GameListCell').CoinNum = 100 * i;
            newCell.getComponent('GameListCell').MainScriptNode = this;

            this.ListLayout.node.addChild(newCell);

            console.log(this.ListLayout);
        }
    },

    onGameSelected: function onGameSelected(gameid) {
        console.log(gameid + '被选择');
        cc.director.loadScene('Game');
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"Game":[function(require,module,exports){
"use strict";
cc._RFpush(module, '270cfZBcSFGtbROuX4xZks7', 'Game');
// Script/Game/Game.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        audioManager: {
            'default': null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.audioManager = this.audioManager.getComponent('AudioManager');
        this.audioManager.playMusic();
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"HelloWorld":[function(require,module,exports){
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
},{"socket.io":"socket.io"}],"Login":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'bf269SHOdVBvLyamtHjegxg', 'Login');
// Script/Login/Login.js


var UserAccount;
var UserPassword;

cc.Class({
    "extends": cc.Component,
    properties: {

        registerLayer: {
            "default": null,
            type: cc.Node
        },
        audioManager: {
            "default": null,
            type: cc.Node
        }

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
    onLoad: function onLoad() {
        this.audioManager = this.audioManager.getComponent('AudioManager');
        this.audioManager.playMusic();
    },

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
    },

    onUserAccountChanged: function onUserAccountChanged(text) {
        UserAccount = text;
        cc.log("UserAccount: " + UserAccount);
    },
    onUserPasswordChanged: function onUserPasswordChanged(text) {
        UserPassword = text;
        cc.log("UserPassword: " + UserPassword);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"SigleImgBtn":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a310beKkwZApa5rKUMTDiY/', 'SigleImgBtn');
// Script/control/SigleImgBtn.js

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
},{}],"Tools":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a0f76uMHghGwr6/VfnCowWW', 'Tools');
// Script/tool/Tools.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {},
    GetRandomNum: function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return Min + Math.round(Rand * Range);
    }
});

// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },
module.exports = {
    GetRandomNum: function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return Min + Math.round(Rand * Range);
    }
};

cc._RFpop();
},{}],"UserIcon":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9a0496Cgv9AiKruT5YbLnJV', 'UserIcon');
// Script/control/UserIcon.js

'use strict';

cc.Class({
    'extends': cc.Component,
    properties: {
        IconIndex: 0,
        SpriteList: {
            'default': [],
            type: [cc.SpriteFrame]
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var com = this.getComponent(cc.Sprite);
        if (this.IconIndex == -1) {
            var tools = require('Tools');
            this.IconIndex = tools.GetRandomNum(0, this.SpriteList.length - 1);
        }
        com.spriteFrame = this.SpriteList[this.IconIndex];
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"Tools":"Tools"}],"socket.io":[function(require,module,exports){
(function (global){
"use strict";
cc._RFpush(module, '7bc51a5FzNEnJVTYyIvT38D', 'socket.io');
// Script/tool/socket.io.js

"use strict";if(!cc.sys.isNative){(function(f){if(typeof exports === "object" && typeof module !== "undefined"){module.exports = f();}else if(typeof define === "function" && define.amd){define([],f);}else {var g;if(typeof window !== "undefined"){g = window;}else if(typeof global !== "undefined"){g = global;}else if(typeof self !== "undefined"){g = self;}else {g = this;}g.io = f();}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require == "function" && require;if(!u && a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND",f);}var l=n[o] = {exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require == "function" && require;for(var o=0;o < r.length;o++) s(r[o]);return s;})({1:[function(_dereq_,module,exports){module.exports = _dereq_('./lib/');},{"./lib/":2}],2:[function(_dereq_,module,exports){module.exports = _dereq_('./socket'); /**
 * Exports parser
 *
 * @api public
 *
 */module.exports.parser = _dereq_('engine.io-parser');},{"./socket":3,"engine.io-parser":19}],3:[function(_dereq_,module,exports){(function(global){ /**
 * Module dependencies.
 */var transports=_dereq_('./transports');var Emitter=_dereq_('component-emitter');var debug=_dereq_('debug')('engine.io-client:socket');var index=_dereq_('indexof');var parser=_dereq_('engine.io-parser');var parseuri=_dereq_('parseuri');var parsejson=_dereq_('parsejson');var parseqs=_dereq_('parseqs'); /**
 * Module exports.
 */module.exports = Socket; /**
 * Noop function.
 *
 * @api private
 */function noop(){} /**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */function Socket(uri,opts){if(!(this instanceof Socket))return new Socket(uri,opts);opts = opts || {};if(uri && 'object' == typeof uri){opts = uri;uri = null;}if(uri){uri = parseuri(uri);opts.hostname = uri.host;opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';opts.port = uri.port;if(uri.query)opts.query = uri.query;}else if(opts.host){opts.hostname = parseuri(opts.host).host;}this.secure = null != opts.secure?opts.secure:global.location && 'https:' == location.protocol;if(opts.hostname && !opts.port){ // if no port is specified manually, use the protocol default
opts.port = this.secure?'443':'80';}this.agent = opts.agent || false;this.hostname = opts.hostname || (global.location?location.hostname:'localhost');this.port = opts.port || (global.location && location.port?location.port:this.secure?443:80);this.query = opts.query || {};if('string' == typeof this.query)this.query = parseqs.decode(this.query);this.upgrade = false !== opts.upgrade;this.path = (opts.path || '/engine.io').replace(/\/$/,'') + '/';this.forceJSONP = !!opts.forceJSONP;this.jsonp = false !== opts.jsonp;this.forceBase64 = !!opts.forceBase64;this.enablesXDR = !!opts.enablesXDR;this.timestampParam = opts.timestampParam || 't';this.timestampRequests = opts.timestampRequests;this.transports = opts.transports || ['polling','websocket'];this.readyState = '';this.writeBuffer = [];this.policyPort = opts.policyPort || 843;this.rememberUpgrade = opts.rememberUpgrade || false;this.binaryType = null;this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;this.perMessageDeflate = false !== opts.perMessageDeflate?opts.perMessageDeflate || {}:false;if(true === this.perMessageDeflate)this.perMessageDeflate = {};if(this.perMessageDeflate && null == this.perMessageDeflate.threshold){this.perMessageDeflate.threshold = 1024;} // SSL options for Node.js client
this.pfx = opts.pfx || null;this.key = opts.key || null;this.passphrase = opts.passphrase || null;this.cert = opts.cert || null;this.ca = opts.ca || null;this.ciphers = opts.ciphers || null;this.rejectUnauthorized = opts.rejectUnauthorized === undefined?null:opts.rejectUnauthorized; // other options for Node.js client
var freeGlobal=typeof global == 'object' && global;if(freeGlobal.global === freeGlobal){if(opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0){this.extraHeaders = opts.extraHeaders;}}this.open();}Socket.priorWebsocketSuccess = false; /**
 * Mix in `Emitter`.
 */Emitter(Socket.prototype); /**
 * Protocol version.
 *
 * @api public
 */Socket.protocol = parser.protocol; // this is an int
/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */Socket.Socket = Socket;Socket.Transport = _dereq_('./transport');Socket.transports = _dereq_('./transports');Socket.parser = _dereq_('engine.io-parser'); /**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */Socket.prototype.createTransport = function(name){debug('creating transport "%s"',name);var query=clone(this.query); // append engine.io protocol identifier
query.EIO = parser.protocol; // transport name
query.transport = name; // session id if we already have one
if(this.id)query.sid = this.id;var transport=new transports[name]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:query,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized,perMessageDeflate:this.perMessageDeflate,extraHeaders:this.extraHeaders});return transport;};function clone(obj){var o={};for(var i in obj) {if(obj.hasOwnProperty(i)){o[i] = obj[i];}}return o;} /**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */Socket.prototype.open = function(){var transport;if(this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1){transport = 'websocket';}else if(0 === this.transports.length){ // Emit error on next tick so it can be listened to
var self=this;setTimeout(function(){self.emit('error','No transports available');},0);return;}else {transport = this.transports[0];}this.readyState = 'opening'; // Retry with the next transport if the transport is disabled (jsonp: false)
try{transport = this.createTransport(transport);}catch(e) {this.transports.shift();this.open();return;}transport.open();this.setTransport(transport);}; /**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */Socket.prototype.setTransport = function(transport){debug('setting transport %s',transport.name);var self=this;if(this.transport){debug('clearing existing transport %s',this.transport.name);this.transport.removeAllListeners();} // set up transport
this.transport = transport; // set up transport listeners
transport.on('drain',function(){self.onDrain();}).on('packet',function(packet){self.onPacket(packet);}).on('error',function(e){self.onError(e);}).on('close',function(){self.onClose('transport close');});}; /**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */Socket.prototype.probe = function(name){debug('probing transport "%s"',name);var transport=this.createTransport(name,{probe:1}),failed=false,self=this;Socket.priorWebsocketSuccess = false;function onTransportOpen(){if(self.onlyBinaryUpgrades){var upgradeLosesBinary=!this.supportsBinary && self.transport.supportsBinary;failed = failed || upgradeLosesBinary;}if(failed)return;debug('probe transport "%s" opened',name);transport.send([{type:'ping',data:'probe'}]);transport.once('packet',function(msg){if(failed)return;if('pong' == msg.type && 'probe' == msg.data){debug('probe transport "%s" pong',name);self.upgrading = true;self.emit('upgrading',transport);if(!transport)return;Socket.priorWebsocketSuccess = 'websocket' == transport.name;debug('pausing current transport "%s"',self.transport.name);self.transport.pause(function(){if(failed)return;if('closed' == self.readyState)return;debug('changing transport and sending upgrade packet');cleanup();self.setTransport(transport);transport.send([{type:'upgrade'}]);self.emit('upgrade',transport);transport = null;self.upgrading = false;self.flush();});}else {debug('probe transport "%s" failed',name);var err=new Error('probe error');err.transport = transport.name;self.emit('upgradeError',err);}});}function freezeTransport(){if(failed)return; // Any callback called by transport should be ignored since now
failed = true;cleanup();transport.close();transport = null;} //Handle any error that happens while probing
function onerror(err){var error=new Error('probe error: ' + err);error.transport = transport.name;freezeTransport();debug('probe transport "%s" failed because of error: %s',name,err);self.emit('upgradeError',error);}function onTransportClose(){onerror("transport closed");} //When the socket is closed while we're probing
function onclose(){onerror("socket closed");} //When the socket is upgraded while we're probing
function onupgrade(to){if(transport && to.name != transport.name){debug('"%s" works - aborting "%s"',to.name,transport.name);freezeTransport();}} //Remove all listeners on the transport and on self
function cleanup(){transport.removeListener('open',onTransportOpen);transport.removeListener('error',onerror);transport.removeListener('close',onTransportClose);self.removeListener('close',onclose);self.removeListener('upgrading',onupgrade);}transport.once('open',onTransportOpen);transport.once('error',onerror);transport.once('close',onTransportClose);this.once('close',onclose);this.once('upgrading',onupgrade);transport.open();}; /**
 * Called when connection is deemed open.
 *
 * @api public
 */Socket.prototype.onOpen = function(){debug('socket open');this.readyState = 'open';Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;this.emit('open');this.flush(); // we check for `readyState` in case an `open`
// listener already closed the socket
if('open' == this.readyState && this.upgrade && this.transport.pause){debug('starting upgrade probes');for(var i=0,l=this.upgrades.length;i < l;i++) {this.probe(this.upgrades[i]);}}}; /**
 * Handles a packet.
 *
 * @api private
 */Socket.prototype.onPacket = function(packet){if('opening' == this.readyState || 'open' == this.readyState){debug('socket receive: type "%s", data "%s"',packet.type,packet.data);this.emit('packet',packet); // Socket is live - any packet counts
this.emit('heartbeat');switch(packet.type){case 'open':this.onHandshake(parsejson(packet.data));break;case 'pong':this.setPing();this.emit('pong');break;case 'error':var err=new Error('server error');err.code = packet.data;this.onError(err);break;case 'message':this.emit('data',packet.data);this.emit('message',packet.data);break;}}else {debug('packet received with socket readyState "%s"',this.readyState);}}; /**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */Socket.prototype.onHandshake = function(data){this.emit('handshake',data);this.id = data.sid;this.transport.query.sid = data.sid;this.upgrades = this.filterUpgrades(data.upgrades);this.pingInterval = data.pingInterval;this.pingTimeout = data.pingTimeout;this.onOpen(); // In case open handler closes socket
if('closed' == this.readyState)return;this.setPing(); // Prolong liveness of socket on heartbeat
this.removeListener('heartbeat',this.onHeartbeat);this.on('heartbeat',this.onHeartbeat);}; /**
 * Resets ping timeout.
 *
 * @api private
 */Socket.prototype.onHeartbeat = function(timeout){clearTimeout(this.pingTimeoutTimer);var self=this;self.pingTimeoutTimer = setTimeout(function(){if('closed' == self.readyState)return;self.onClose('ping timeout');},timeout || self.pingInterval + self.pingTimeout);}; /**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */Socket.prototype.setPing = function(){var self=this;clearTimeout(self.pingIntervalTimer);self.pingIntervalTimer = setTimeout(function(){debug('writing ping packet - expecting pong within %sms',self.pingTimeout);self.ping();self.onHeartbeat(self.pingTimeout);},self.pingInterval);}; /**
* Sends a ping packet.
*
* @api private
*/Socket.prototype.ping = function(){var self=this;this.sendPacket('ping',function(){self.emit('ping');});}; /**
 * Called on `drain` event
 *
 * @api private
 */Socket.prototype.onDrain = function(){this.writeBuffer.splice(0,this.prevBufferLen); // setting prevBufferLen = 0 is very important
// for example, when upgrading, upgrade packet is sent over,
// and a nonzero prevBufferLen could cause problems on `drain`
this.prevBufferLen = 0;if(0 === this.writeBuffer.length){this.emit('drain');}else {this.flush();}}; /**
 * Flush write buffers.
 *
 * @api private
 */Socket.prototype.flush = function(){if('closed' != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length){debug('flushing %d packets in socket',this.writeBuffer.length);this.transport.send(this.writeBuffer); // keep track of current length of writeBuffer
// splice writeBuffer and callbackBuffer on `drain`
this.prevBufferLen = this.writeBuffer.length;this.emit('flush');}}; /**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */Socket.prototype.write = Socket.prototype.send = function(msg,options,fn){this.sendPacket('message',msg,options,fn);return this;}; /**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */Socket.prototype.sendPacket = function(type,data,options,fn){if('function' == typeof data){fn = data;data = undefined;}if('function' == typeof options){fn = options;options = null;}if('closing' == this.readyState || 'closed' == this.readyState){return;}options = options || {};options.compress = false !== options.compress;var packet={type:type,data:data,options:options};this.emit('packetCreate',packet);this.writeBuffer.push(packet);if(fn)this.once('flush',fn);this.flush();}; /**
 * Closes the connection.
 *
 * @api private
 */Socket.prototype.close = function(){if('opening' == this.readyState || 'open' == this.readyState){this.readyState = 'closing';var self=this;if(this.writeBuffer.length){this.once('drain',function(){if(this.upgrading){waitForUpgrade();}else {close();}});}else if(this.upgrading){waitForUpgrade();}else {close();}}function close(){self.onClose('forced close');debug('socket closing - telling transport to close');self.transport.close();}function cleanupAndClose(){self.removeListener('upgrade',cleanupAndClose);self.removeListener('upgradeError',cleanupAndClose);close();}function waitForUpgrade(){ // wait for upgrade to finish since we can't send packets while pausing a transport
self.once('upgrade',cleanupAndClose);self.once('upgradeError',cleanupAndClose);}return this;}; /**
 * Called upon transport error
 *
 * @api private
 */Socket.prototype.onError = function(err){debug('socket error %j',err);Socket.priorWebsocketSuccess = false;this.emit('error',err);this.onClose('transport error',err);}; /**
 * Called upon transport close.
 *
 * @api private
 */Socket.prototype.onClose = function(reason,desc){if('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState){debug('socket close with reason: "%s"',reason);var self=this; // clear timers
clearTimeout(this.pingIntervalTimer);clearTimeout(this.pingTimeoutTimer); // stop event from firing again for transport
this.transport.removeAllListeners('close'); // ensure transport won't stay open
this.transport.close(); // ignore further transport communication
this.transport.removeAllListeners(); // set ready state
this.readyState = 'closed'; // clear session id
this.id = null; // emit close event
this.emit('close',reason,desc); // clean buffers after, so users can still
// grab the buffers on `close` event
self.writeBuffer = [];self.prevBufferLen = 0;}}; /**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */Socket.prototype.filterUpgrades = function(upgrades){var filteredUpgrades=[];for(var i=0,j=upgrades.length;i < j;i++) {if(~index(this.transports,upgrades[i]))filteredUpgrades.push(upgrades[i]);}return filteredUpgrades;};}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{"./transport":4,"./transports":5,"component-emitter":15,"debug":17,"engine.io-parser":19,"indexof":23,"parsejson":26,"parseqs":27,"parseuri":28}],4:[function(_dereq_,module,exports){ /**
 * Module dependencies.
 */var parser=_dereq_('engine.io-parser');var Emitter=_dereq_('component-emitter'); /**
 * Module exports.
 */module.exports = Transport; /**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */function Transport(opts){this.path = opts.path;this.hostname = opts.hostname;this.port = opts.port;this.secure = opts.secure;this.query = opts.query;this.timestampParam = opts.timestampParam;this.timestampRequests = opts.timestampRequests;this.readyState = '';this.agent = opts.agent || false;this.socket = opts.socket;this.enablesXDR = opts.enablesXDR; // SSL options for Node.js client
this.pfx = opts.pfx;this.key = opts.key;this.passphrase = opts.passphrase;this.cert = opts.cert;this.ca = opts.ca;this.ciphers = opts.ciphers;this.rejectUnauthorized = opts.rejectUnauthorized; // other options for Node.js client
this.extraHeaders = opts.extraHeaders;} /**
 * Mix in `Emitter`.
 */Emitter(Transport.prototype); /**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */Transport.prototype.onError = function(msg,desc){var err=new Error(msg);err.type = 'TransportError';err.description = desc;this.emit('error',err);return this;}; /**
 * Opens the transport.
 *
 * @api public
 */Transport.prototype.open = function(){if('closed' == this.readyState || '' == this.readyState){this.readyState = 'opening';this.doOpen();}return this;}; /**
 * Closes the transport.
 *
 * @api private
 */Transport.prototype.close = function(){if('opening' == this.readyState || 'open' == this.readyState){this.doClose();this.onClose();}return this;}; /**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */Transport.prototype.send = function(packets){if('open' == this.readyState){this.write(packets);}else {throw new Error('Transport not open');}}; /**
 * Called upon open
 *
 * @api private
 */Transport.prototype.onOpen = function(){this.readyState = 'open';this.writable = true;this.emit('open');}; /**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */Transport.prototype.onData = function(data){var packet=parser.decodePacket(data,this.socket.binaryType);this.onPacket(packet);}; /**
 * Called with a decoded packet.
 */Transport.prototype.onPacket = function(packet){this.emit('packet',packet);}; /**
 * Called upon close.
 *
 * @api private
 */Transport.prototype.onClose = function(){this.readyState = 'closed';this.emit('close');};},{"component-emitter":15,"engine.io-parser":19}],5:[function(_dereq_,module,exports){(function(global){ /**
 * Module dependencies
 */var XMLHttpRequest=_dereq_('xmlhttprequest-ssl');var XHR=_dereq_('./polling-xhr');var JSONP=_dereq_('./polling-jsonp');var websocket=_dereq_('./websocket'); /**
 * Export transports.
 */exports.polling = polling;exports.websocket = websocket; /**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */function polling(opts){var xhr;var xd=false;var xs=false;var jsonp=false !== opts.jsonp;if(global.location){var isSSL='https:' == location.protocol;var port=location.port; // some user agents have empty `location.port`
if(!port){port = isSSL?443:80;}xd = opts.hostname != location.hostname || port != opts.port;xs = opts.secure != isSSL;}opts.xdomain = xd;opts.xscheme = xs;xhr = new XMLHttpRequest(opts);if('open' in xhr && !opts.forceJSONP){return new XHR(opts);}else {if(!jsonp)throw new Error('JSONP disabled');return new JSONP(opts);}}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{"./polling-jsonp":6,"./polling-xhr":7,"./websocket":9,"xmlhttprequest-ssl":10}],6:[function(_dereq_,module,exports){(function(global){ /**
 * Module requirements.
 */var Polling=_dereq_('./polling');var inherit=_dereq_('component-inherit'); /**
 * Module exports.
 */module.exports = JSONPPolling; /**
 * Cached regular expressions.
 */var rNewline=/\n/g;var rEscapedNewline=/\\n/g; /**
 * Global JSONP callbacks.
 */var callbacks; /**
 * Callbacks count.
 */var index=0; /**
 * Noop.
 */function empty(){} /**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */function JSONPPolling(opts){Polling.call(this,opts);this.query = this.query || {}; // define global callbacks array if not present
// we do this here (lazily) to avoid unneeded global pollution
if(!callbacks){ // we need to consider multiple engines in the same page
if(!global.___eio)global.___eio = [];callbacks = global.___eio;} // callback identifier
this.index = callbacks.length; // add callback to jsonp global
var self=this;callbacks.push(function(msg){self.onData(msg);}); // append to query string
this.query.j = this.index; // prevent spurious errors from being emitted when the window is unloaded
if(global.document && global.addEventListener){global.addEventListener('beforeunload',function(){if(self.script)self.script.onerror = empty;},false);}} /**
 * Inherits from Polling.
 */inherit(JSONPPolling,Polling); /*
 * JSONP only supports binary as base64 encoded strings
 */JSONPPolling.prototype.supportsBinary = false; /**
 * Closes the socket.
 *
 * @api private
 */JSONPPolling.prototype.doClose = function(){if(this.script){this.script.parentNode.removeChild(this.script);this.script = null;}if(this.form){this.form.parentNode.removeChild(this.form);this.form = null;this.iframe = null;}Polling.prototype.doClose.call(this);}; /**
 * Starts a poll cycle.
 *
 * @api private
 */JSONPPolling.prototype.doPoll = function(){var self=this;var script=document.createElement('script');if(this.script){this.script.parentNode.removeChild(this.script);this.script = null;}script.async = true;script.src = this.uri();script.onerror = function(e){self.onError('jsonp poll error',e);};var insertAt=document.getElementsByTagName('script')[0];if(insertAt){insertAt.parentNode.insertBefore(script,insertAt);}else {(document.head || document.body).appendChild(script);}this.script = script;var isUAgecko='undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);if(isUAgecko){setTimeout(function(){var iframe=document.createElement('iframe');document.body.appendChild(iframe);document.body.removeChild(iframe);},100);}}; /**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */JSONPPolling.prototype.doWrite = function(data,fn){var self=this;if(!this.form){var form=document.createElement('form');var area=document.createElement('textarea');var id=this.iframeId = 'eio_iframe_' + this.index;var iframe;form.className = 'socketio';form.style.position = 'absolute';form.style.top = '-1000px';form.style.left = '-1000px';form.target = id;form.method = 'POST';form.setAttribute('accept-charset','utf-8');area.name = 'd';form.appendChild(area);document.body.appendChild(form);this.form = form;this.area = area;}this.form.action = this.uri();function complete(){initIframe();fn();}function initIframe(){if(self.iframe){try{self.form.removeChild(self.iframe);}catch(e) {self.onError('jsonp polling iframe removal error',e);}}try{ // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
var html='<iframe src="javascript:0" name="' + self.iframeId + '">';iframe = document.createElement(html);}catch(e) {iframe = document.createElement('iframe');iframe.name = self.iframeId;iframe.src = 'javascript:0';}iframe.id = self.iframeId;self.form.appendChild(iframe);self.iframe = iframe;}initIframe(); // escape \n to prevent it from being converted into \r\n by some UAs
// double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
data = data.replace(rEscapedNewline,'\\\n');this.area.value = data.replace(rNewline,'\\n');try{this.form.submit();}catch(e) {}if(this.iframe.attachEvent){this.iframe.onreadystatechange = function(){if(self.iframe.readyState == 'complete'){complete();}};}else {this.iframe.onload = complete;}};}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{"./polling":8,"component-inherit":16}],7:[function(_dereq_,module,exports){(function(global){ /**
 * Module requirements.
 */var XMLHttpRequest=_dereq_('xmlhttprequest-ssl');var Polling=_dereq_('./polling');var Emitter=_dereq_('component-emitter');var inherit=_dereq_('component-inherit');var debug=_dereq_('debug')('engine.io-client:polling-xhr'); /**
 * Module exports.
 */module.exports = XHR;module.exports.Request = Request; /**
 * Empty function
 */function empty(){} /**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */function XHR(opts){Polling.call(this,opts);if(global.location){var isSSL='https:' == location.protocol;var port=location.port; // some user agents have empty `location.port`
if(!port){port = isSSL?443:80;}this.xd = opts.hostname != global.location.hostname || port != opts.port;this.xs = opts.secure != isSSL;}else {this.extraHeaders = opts.extraHeaders;}} /**
 * Inherits from Polling.
 */inherit(XHR,Polling); /**
 * XHR supports binary
 */XHR.prototype.supportsBinary = true; /**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */XHR.prototype.request = function(opts){opts = opts || {};opts.uri = this.uri();opts.xd = this.xd;opts.xs = this.xs;opts.agent = this.agent || false;opts.supportsBinary = this.supportsBinary;opts.enablesXDR = this.enablesXDR; // SSL options for Node.js client
opts.pfx = this.pfx;opts.key = this.key;opts.passphrase = this.passphrase;opts.cert = this.cert;opts.ca = this.ca;opts.ciphers = this.ciphers;opts.rejectUnauthorized = this.rejectUnauthorized; // other options for Node.js client
opts.extraHeaders = this.extraHeaders;return new Request(opts);}; /**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */XHR.prototype.doWrite = function(data,fn){var isBinary=typeof data !== 'string' && data !== undefined;var req=this.request({method:'POST',data:data,isBinary:isBinary});var self=this;req.on('success',fn);req.on('error',function(err){self.onError('xhr post error',err);});this.sendXhr = req;}; /**
 * Starts a poll cycle.
 *
 * @api private
 */XHR.prototype.doPoll = function(){debug('xhr poll');var req=this.request();var self=this;req.on('data',function(data){self.onData(data);});req.on('error',function(err){self.onError('xhr poll error',err);});this.pollXhr = req;}; /**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */function Request(opts){this.method = opts.method || 'GET';this.uri = opts.uri;this.xd = !!opts.xd;this.xs = !!opts.xs;this.async = false !== opts.async;this.data = undefined != opts.data?opts.data:null;this.agent = opts.agent;this.isBinary = opts.isBinary;this.supportsBinary = opts.supportsBinary;this.enablesXDR = opts.enablesXDR; // SSL options for Node.js client
this.pfx = opts.pfx;this.key = opts.key;this.passphrase = opts.passphrase;this.cert = opts.cert;this.ca = opts.ca;this.ciphers = opts.ciphers;this.rejectUnauthorized = opts.rejectUnauthorized; // other options for Node.js client
this.extraHeaders = opts.extraHeaders;this.create();} /**
 * Mix in `Emitter`.
 */Emitter(Request.prototype); /**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */Request.prototype.create = function(){var opts={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR}; // SSL options for Node.js client
opts.pfx = this.pfx;opts.key = this.key;opts.passphrase = this.passphrase;opts.cert = this.cert;opts.ca = this.ca;opts.ciphers = this.ciphers;opts.rejectUnauthorized = this.rejectUnauthorized;var xhr=this.xhr = new XMLHttpRequest(opts);var self=this;try{debug('xhr open %s: %s',this.method,this.uri);xhr.open(this.method,this.uri,this.async);try{if(this.extraHeaders){xhr.setDisableHeaderCheck(true);for(var i in this.extraHeaders) {if(this.extraHeaders.hasOwnProperty(i)){xhr.setRequestHeader(i,this.extraHeaders[i]);}}}}catch(e) {}if(this.supportsBinary){ // This has to be done after open because Firefox is stupid
// http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
xhr.responseType = 'arraybuffer';}if('POST' == this.method){try{if(this.isBinary){xhr.setRequestHeader('Content-type','application/octet-stream');}else {xhr.setRequestHeader('Content-type','text/plain;charset=UTF-8');}}catch(e) {}} // ie6 check
if('withCredentials' in xhr){xhr.withCredentials = true;}if(this.hasXDR()){xhr.onload = function(){self.onLoad();};xhr.onerror = function(){self.onError(xhr.responseText);};}else {xhr.onreadystatechange = function(){if(4 != xhr.readyState)return;if(200 == xhr.status || 1223 == xhr.status){self.onLoad();}else { // make sure the `error` event handler that's user-set
// does not throw in the same tick and gets caught here
setTimeout(function(){self.onError(xhr.status);},0);}};}debug('xhr data %s',this.data);xhr.send(this.data);}catch(e) { // Need to defer since .create() is called directly fhrom the constructor
// and thus the 'error' event can only be only bound *after* this exception
// occurs.  Therefore, also, we cannot throw here at all.
setTimeout(function(){self.onError(e);},0);return;}if(global.document){this.index = Request.requestsCount++;Request.requests[this.index] = this;}}; /**
 * Called upon successful response.
 *
 * @api private
 */Request.prototype.onSuccess = function(){this.emit('success');this.cleanup();}; /**
 * Called if we have data.
 *
 * @api private
 */Request.prototype.onData = function(data){this.emit('data',data);this.onSuccess();}; /**
 * Called upon error.
 *
 * @api private
 */Request.prototype.onError = function(err){this.emit('error',err);this.cleanup(true);}; /**
 * Cleans up house.
 *
 * @api private
 */Request.prototype.cleanup = function(fromError){if('undefined' == typeof this.xhr || null === this.xhr){return;} // xmlhttprequest
if(this.hasXDR()){this.xhr.onload = this.xhr.onerror = empty;}else {this.xhr.onreadystatechange = empty;}if(fromError){try{this.xhr.abort();}catch(e) {}}if(global.document){delete Request.requests[this.index];}this.xhr = null;}; /**
 * Called upon load.
 *
 * @api private
 */Request.prototype.onLoad = function(){var data;try{var contentType;try{contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];}catch(e) {}if(contentType === 'application/octet-stream'){data = this.xhr.response;}else {if(!this.supportsBinary){data = this.xhr.responseText;}else {try{data = String.fromCharCode.apply(null,new Uint8Array(this.xhr.response));}catch(e) {var ui8Arr=new Uint8Array(this.xhr.response);var dataArray=[];for(var idx=0,length=ui8Arr.length;idx < length;idx++) {dataArray.push(ui8Arr[idx]);}data = String.fromCharCode.apply(null,dataArray);}}}}catch(e) {this.onError(e);}if(null != data){this.onData(data);}}; /**
 * Check if it has XDomainRequest.
 *
 * @api private
 */Request.prototype.hasXDR = function(){return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;}; /**
 * Aborts the request.
 *
 * @api public
 */Request.prototype.abort = function(){this.cleanup();}; /**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */if(global.document){Request.requestsCount = 0;Request.requests = {};if(global.attachEvent){global.attachEvent('onunload',unloadHandler);}else if(global.addEventListener){global.addEventListener('beforeunload',unloadHandler,false);}}function unloadHandler(){for(var i in Request.requests) {if(Request.requests.hasOwnProperty(i)){Request.requests[i].abort();}}}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{"./polling":8,"component-emitter":15,"component-inherit":16,"debug":17,"xmlhttprequest-ssl":10}],8:[function(_dereq_,module,exports){ /**
 * Module dependencies.
 */var Transport=_dereq_('../transport');var parseqs=_dereq_('parseqs');var parser=_dereq_('engine.io-parser');var inherit=_dereq_('component-inherit');var yeast=_dereq_('yeast');var debug=_dereq_('debug')('engine.io-client:polling'); /**
 * Module exports.
 */module.exports = Polling; /**
 * Is XHR2 supported?
 */var hasXHR2=(function(){var XMLHttpRequest=_dereq_('xmlhttprequest-ssl');var xhr=new XMLHttpRequest({xdomain:false});return null != xhr.responseType;})(); /**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */function Polling(opts){var forceBase64=opts && opts.forceBase64;if(!hasXHR2 || forceBase64){this.supportsBinary = false;}Transport.call(this,opts);} /**
 * Inherits from Transport.
 */inherit(Polling,Transport); /**
 * Transport name.
 */Polling.prototype.name = 'polling'; /**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */Polling.prototype.doOpen = function(){this.poll();}; /**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */Polling.prototype.pause = function(onPause){var pending=0;var self=this;this.readyState = 'pausing';function pause(){debug('paused');self.readyState = 'paused';onPause();}if(this.polling || !this.writable){var total=0;if(this.polling){debug('we are currently polling - waiting to pause');total++;this.once('pollComplete',function(){debug('pre-pause polling complete');--total || pause();});}if(!this.writable){debug('we are currently writing - waiting to pause');total++;this.once('drain',function(){debug('pre-pause writing complete');--total || pause();});}}else {pause();}}; /**
 * Starts polling cycle.
 *
 * @api public
 */Polling.prototype.poll = function(){debug('polling');this.polling = true;this.doPoll();this.emit('poll');}; /**
 * Overloads onData to detect payloads.
 *
 * @api private
 */Polling.prototype.onData = function(data){var self=this;debug('polling got data %s',data);var callback=function callback(packet,index,total){ // if its the first message we consider the transport open
if('opening' == self.readyState){self.onOpen();} // if its a close packet, we close the ongoing requests
if('close' == packet.type){self.onClose();return false;} // otherwise bypass onData and handle the message
self.onPacket(packet);}; // decode payload
parser.decodePayload(data,this.socket.binaryType,callback); // if an event did not trigger closing
if('closed' != this.readyState){ // if we got data we're not polling
this.polling = false;this.emit('pollComplete');if('open' == this.readyState){this.poll();}else {debug('ignoring poll - transport state "%s"',this.readyState);}}}; /**
 * For polling, send a close packet.
 *
 * @api private
 */Polling.prototype.doClose = function(){var self=this;function close(){debug('writing close packet');self.write([{type:'close'}]);}if('open' == this.readyState){debug('transport open - closing');close();}else { // in case we're trying to close while
// handshaking is in progress (GH-164)
debug('transport not open - deferring close');this.once('open',close);}}; /**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */Polling.prototype.write = function(packets){var self=this;this.writable = false;var callbackfn=function callbackfn(){self.writable = true;self.emit('drain');};var self=this;parser.encodePayload(packets,this.supportsBinary,function(data){self.doWrite(data,callbackfn);});}; /**
 * Generates uri for connection.
 *
 * @api private
 */Polling.prototype.uri = function(){var query=this.query || {};var schema=this.secure?'https':'http';var port=''; // cache busting is forced
if(false !== this.timestampRequests){query[this.timestampParam] = yeast();}if(!this.supportsBinary && !query.sid){query.b64 = 1;}query = parseqs.encode(query); // avoid port if default for schema
if(this.port && ('https' == schema && this.port != 443 || 'http' == schema && this.port != 80)){port = ':' + this.port;} // prepend ? to query
if(query.length){query = '?' + query;}var ipv6=this.hostname.indexOf(':') !== -1;return schema + '://' + (ipv6?'[' + this.hostname + ']':this.hostname) + port + this.path + query;};},{"../transport":4,"component-inherit":16,"debug":17,"engine.io-parser":19,"parseqs":27,"xmlhttprequest-ssl":10,"yeast":30}],9:[function(_dereq_,module,exports){(function(global){ /**
 * Module dependencies.
 */var Transport=_dereq_('../transport');var parser=_dereq_('engine.io-parser');var parseqs=_dereq_('parseqs');var inherit=_dereq_('component-inherit');var yeast=_dereq_('yeast');var debug=_dereq_('debug')('engine.io-client:websocket');var BrowserWebSocket=global.WebSocket || global.MozWebSocket; /**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or the WebSocket-compatible interface
 * exposed by `ws` for Node environment.
 */var WebSocket=BrowserWebSocket || (typeof window !== 'undefined'?null:_dereq_('ws')); /**
 * Module exports.
 */module.exports = WS; /**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */function WS(opts){var forceBase64=opts && opts.forceBase64;if(forceBase64){this.supportsBinary = false;}this.perMessageDeflate = opts.perMessageDeflate;Transport.call(this,opts);} /**
 * Inherits from Transport.
 */inherit(WS,Transport); /**
 * Transport name.
 *
 * @api public
 */WS.prototype.name = 'websocket'; /*
 * WebSockets support binary
 */WS.prototype.supportsBinary = true; /**
 * Opens socket.
 *
 * @api private
 */WS.prototype.doOpen = function(){if(!this.check()){ // let probe timeout
return;}var self=this;var uri=this.uri();var protocols=void 0;var opts={agent:this.agent,perMessageDeflate:this.perMessageDeflate}; // SSL options for Node.js client
opts.pfx = this.pfx;opts.key = this.key;opts.passphrase = this.passphrase;opts.cert = this.cert;opts.ca = this.ca;opts.ciphers = this.ciphers;opts.rejectUnauthorized = this.rejectUnauthorized;if(this.extraHeaders){opts.headers = this.extraHeaders;}this.ws = BrowserWebSocket?new WebSocket(uri):new WebSocket(uri,protocols,opts);if(this.ws.binaryType === undefined){this.supportsBinary = false;}if(this.ws.supports && this.ws.supports.binary){this.supportsBinary = true;this.ws.binaryType = 'buffer';}else {this.ws.binaryType = 'arraybuffer';}this.addEventListeners();}; /**
 * Adds event listeners to the socket
 *
 * @api private
 */WS.prototype.addEventListeners = function(){var self=this;this.ws.onopen = function(){self.onOpen();};this.ws.onclose = function(){self.onClose();};this.ws.onmessage = function(ev){self.onData(ev.data);};this.ws.onerror = function(e){self.onError('websocket error',e);};}; /**
 * Override `onData` to use a timer on iOS.
 * See: https://gist.github.com/mloughran/2052006
 *
 * @api private
 */if('undefined' != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)){WS.prototype.onData = function(data){var self=this;setTimeout(function(){Transport.prototype.onData.call(self,data);},0);};} /**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */WS.prototype.write = function(packets){var self=this;this.writable = false; // encodePacket efficient as it uses WS framing
// no need for encodePayload
var total=packets.length;for(var i=0,l=total;i < l;i++) {(function(packet){parser.encodePacket(packet,self.supportsBinary,function(data){if(!BrowserWebSocket){ // always create a new object (GH-437)
var opts={};if(packet.options){opts.compress = packet.options.compress;}if(self.perMessageDeflate){var len='string' == typeof data?global.Buffer.byteLength(data):data.length;if(len < self.perMessageDeflate.threshold){opts.compress = false;}}} //Sometimes the websocket has already been closed but the browser didn't
//have a chance of informing us about it yet, in that case send will
//throw an error
try{if(BrowserWebSocket){ // TypeError is thrown when passing the second argument on Safari
self.ws.send(data);}else {self.ws.send(data,opts);}}catch(e) {debug('websocket closed before onclose event');}--total || done();});})(packets[i]);}function done(){self.emit('flush'); // fake drain
// defer to next tick to allow Socket to clear writeBuffer
setTimeout(function(){self.writable = true;self.emit('drain');},0);}}; /**
 * Called upon close
 *
 * @api private
 */WS.prototype.onClose = function(){Transport.prototype.onClose.call(this);}; /**
 * Closes socket.
 *
 * @api private
 */WS.prototype.doClose = function(){if(typeof this.ws !== 'undefined'){this.ws.close();}}; /**
 * Generates uri for connection.
 *
 * @api private
 */WS.prototype.uri = function(){var query=this.query || {};var schema=this.secure?'wss':'ws';var port=''; // avoid port if default for schema
if(this.port && ('wss' == schema && this.port != 443 || 'ws' == schema && this.port != 80)){port = ':' + this.port;} // append timestamp to URI
if(this.timestampRequests){query[this.timestampParam] = yeast();} // communicate binary support capabilities
if(!this.supportsBinary){query.b64 = 1;}query = parseqs.encode(query); // prepend ? to query
if(query.length){query = '?' + query;}var ipv6=this.hostname.indexOf(':') !== -1;return schema + '://' + (ipv6?'[' + this.hostname + ']':this.hostname) + port + this.path + query;}; /**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */WS.prototype.check = function(){return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);};}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{"../transport":4,"component-inherit":16,"debug":17,"engine.io-parser":19,"parseqs":27,"ws":undefined,"yeast":30}],10:[function(_dereq_,module,exports){ // browser shim for xmlhttprequest module
var hasCORS=_dereq_('has-cors');module.exports = function(opts){var xdomain=opts.xdomain; // scheme must be same when usign XDomainRequest
// http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
var xscheme=opts.xscheme; // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
// https://github.com/Automattic/engine.io-client/pull/217
var enablesXDR=opts.enablesXDR; // XMLHttpRequest can be disabled on IE
try{if('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)){return new XMLHttpRequest();}}catch(e) {} // Use XDomainRequest for IE8 if enablesXDR is true
// because loading bar keeps flashing when using jsonp-polling
// https://github.com/yujiosaka/socke.io-ie8-loading-example
try{if('undefined' != typeof XDomainRequest && !xscheme && enablesXDR){return new XDomainRequest();}}catch(e) {}if(!xdomain){try{return new ActiveXObject('Microsoft.XMLHTTP');}catch(e) {}}};},{"has-cors":22}],11:[function(_dereq_,module,exports){module.exports = after;function after(count,callback,err_cb){var bail=false;err_cb = err_cb || noop;proxy.count = count;return count === 0?callback():proxy;function proxy(err,result){if(proxy.count <= 0){throw new Error('after called too many times');}--proxy.count; // after first error, rest are passed to err_cb
if(err){bail = true;callback(err); // future error callbacks will go to error handler
callback = err_cb;}else if(proxy.count === 0 && !bail){callback(null,result);}}}function noop(){}},{}],12:[function(_dereq_,module,exports){ /**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */module.exports = function(arraybuffer,start,end){var bytes=arraybuffer.byteLength;start = start || 0;end = end || bytes;if(arraybuffer.slice){return arraybuffer.slice(start,end);}if(start < 0){start += bytes;}if(end < 0){end += bytes;}if(end > bytes){end = bytes;}if(start >= bytes || start >= end || bytes === 0){return new ArrayBuffer(0);}var abv=new Uint8Array(arraybuffer);var result=new Uint8Array(end - start);for(var i=start,ii=0;i < end;i++,ii++) {result[ii] = abv[i];}return result.buffer;};},{}],13:[function(_dereq_,module,exports){ /*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */(function(chars){"use strict";exports.encode = function(arraybuffer){var bytes=new Uint8Array(arraybuffer),i,len=bytes.length,base64="";for(i = 0;i < len;i += 3) {base64 += chars[bytes[i] >> 2];base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];base64 += chars[bytes[i + 2] & 63];}if(len % 3 === 2){base64 = base64.substring(0,base64.length - 1) + "=";}else if(len % 3 === 1){base64 = base64.substring(0,base64.length - 2) + "==";}return base64;};exports.decode = function(base64){var bufferLength=base64.length * 0.75,len=base64.length,i,p=0,encoded1,encoded2,encoded3,encoded4;if(base64[base64.length - 1] === "="){bufferLength--;if(base64[base64.length - 2] === "="){bufferLength--;}}var arraybuffer=new ArrayBuffer(bufferLength),bytes=new Uint8Array(arraybuffer);for(i = 0;i < len;i += 4) {encoded1 = chars.indexOf(base64[i]);encoded2 = chars.indexOf(base64[i + 1]);encoded3 = chars.indexOf(base64[i + 2]);encoded4 = chars.indexOf(base64[i + 3]);bytes[p++] = encoded1 << 2 | encoded2 >> 4;bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;}return arraybuffer;};})("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");},{}],14:[function(_dereq_,module,exports){(function(global){ /**
 * Create a blob builder even when vendor prefixes exist
 */var BlobBuilder=global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder; /**
 * Check if Blob constructor is supported
 */var blobSupported=(function(){try{var a=new Blob(['hi']);return a.size === 2;}catch(e) {return false;}})(); /**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */var blobSupportsArrayBufferView=blobSupported && (function(){try{var b=new Blob([new Uint8Array([1,2])]);return b.size === 2;}catch(e) {return false;}})(); /**
 * Check if BlobBuilder is supported
 */var blobBuilderSupported=BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob; /**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */function mapArrayBufferViews(ary){for(var i=0;i < ary.length;i++) {var chunk=ary[i];if(chunk.buffer instanceof ArrayBuffer){var buf=chunk.buffer; // if this is a subarray, make a copy so we only
// include the subarray region from the underlying buffer
if(chunk.byteLength !== buf.byteLength){var copy=new Uint8Array(chunk.byteLength);copy.set(new Uint8Array(buf,chunk.byteOffset,chunk.byteLength));buf = copy.buffer;}ary[i] = buf;}}}function BlobBuilderConstructor(ary,options){options = options || {};var bb=new BlobBuilder();mapArrayBufferViews(ary);for(var i=0;i < ary.length;i++) {bb.append(ary[i]);}return options.type?bb.getBlob(options.type):bb.getBlob();};function BlobConstructor(ary,options){mapArrayBufferViews(ary);return new Blob(ary,options || {});};module.exports = (function(){if(blobSupported){return blobSupportsArrayBufferView?global.Blob:BlobConstructor;}else if(blobBuilderSupported){return BlobBuilderConstructor;}else {return undefined;}})();}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{}],15:[function(_dereq_,module,exports){ /**
 * Expose `Emitter`.
 */module.exports = Emitter; /**
 * Initialize a new `Emitter`.
 *
 * @api public
 */function Emitter(obj){if(obj)return mixin(obj);}; /**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */function mixin(obj){for(var key in Emitter.prototype) {obj[key] = Emitter.prototype[key];}return obj;} /**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.on = Emitter.prototype.addEventListener = function(event,fn){this._callbacks = this._callbacks || {};(this._callbacks[event] = this._callbacks[event] || []).push(fn);return this;}; /**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.once = function(event,fn){var self=this;this._callbacks = this._callbacks || {};function on(){self.off(event,on);fn.apply(this,arguments);}on.fn = fn;this.on(event,on);return this;}; /**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event,fn){this._callbacks = this._callbacks || {}; // all
if(0 == arguments.length){this._callbacks = {};return this;} // specific event
var callbacks=this._callbacks[event];if(!callbacks)return this; // remove all handlers
if(1 == arguments.length){delete this._callbacks[event];return this;} // remove specific handler
var cb;for(var i=0;i < callbacks.length;i++) {cb = callbacks[i];if(cb === fn || cb.fn === fn){callbacks.splice(i,1);break;}}return this;}; /**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */Emitter.prototype.emit = function(event){this._callbacks = this._callbacks || {};var args=[].slice.call(arguments,1),callbacks=this._callbacks[event];if(callbacks){callbacks = callbacks.slice(0);for(var i=0,len=callbacks.length;i < len;++i) {callbacks[i].apply(this,args);}}return this;}; /**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */Emitter.prototype.listeners = function(event){this._callbacks = this._callbacks || {};return this._callbacks[event] || [];}; /**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */Emitter.prototype.hasListeners = function(event){return !!this.listeners(event).length;};},{}],16:[function(_dereq_,module,exports){module.exports = function(a,b){var fn=function fn(){};fn.prototype = b.prototype;a.prototype = new fn();a.prototype.constructor = a;};},{}],17:[function(_dereq_,module,exports){ /**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */exports = module.exports = _dereq_('./debug');exports.log = log;exports.formatArgs = formatArgs;exports.save = save;exports.load = load;exports.useColors = useColors;exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage?chrome.storage.local:localstorage(); /**
 * Colors.
 */exports.colors = ['lightseagreen','forestgreen','goldenrod','dodgerblue','darkorchid','crimson']; /**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */function useColors(){ // is webkit? http://stackoverflow.com/a/16459606/376773
return 'WebkitAppearance' in document.documentElement.style ||  // is firebug? http://stackoverflow.com/a/398120/376773
window.console && (console.firebug || console.exception && console.table) ||  // is firefox >= v31?
// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1,10) >= 31;} /**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */exports.formatters.j = function(v){return JSON.stringify(v);}; /**
 * Colorize log arguments if enabled.
 *
 * @api public
 */function formatArgs(){var args=arguments;var useColors=this.useColors;args[0] = (useColors?'%c':'') + this.namespace + (useColors?' %c':' ') + args[0] + (useColors?'%c ':' ') + '+' + exports.humanize(this.diff);if(!useColors)return args;var c='color: ' + this.color;args = [args[0],c,'color: inherit'].concat(Array.prototype.slice.call(args,1)); // the final "%c" is somewhat tricky, because there could be other
// arguments passed either before or after the %c, so we need to
// figure out the correct index to insert the CSS into
var index=0;var lastC=0;args[0].replace(/%[a-z%]/g,function(match){if('%%' === match)return;index++;if('%c' === match){ // we only are interested in the *last* %c
// (the user may have provided their own)
lastC = index;}});args.splice(lastC,0,c);return args;} /**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */function log(){ // this hackery is required for IE8/9, where
// the `console.log` function doesn't have 'apply'
return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log,console,arguments);} /**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */function save(namespaces){try{if(null == namespaces){exports.storage.removeItem('debug');}else {exports.storage.debug = namespaces;}}catch(e) {}} /**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */function load(){var r;try{r = exports.storage.debug;}catch(e) {}return r;} /**
 * Enable namespaces listed in `localStorage.debug` initially.
 */exports.enable(load()); /**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */function localstorage(){try{return window.localStorage;}catch(e) {}}},{"./debug":18}],18:[function(_dereq_,module,exports){ /**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */exports = module.exports = debug;exports.coerce = coerce;exports.disable = disable;exports.enable = enable;exports.enabled = enabled;exports.humanize = _dereq_('ms'); /**
 * The currently active debug mode names, and names to skip.
 */exports.names = [];exports.skips = []; /**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */exports.formatters = {}; /**
 * Previously assigned color.
 */var prevColor=0; /**
 * Previous log timestamp.
 */var prevTime; /**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */function selectColor(){return exports.colors[prevColor++ % exports.colors.length];} /**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */function debug(namespace){ // define the `disabled` version
function disabled(){}disabled.enabled = false; // define the `enabled` version
function enabled(){var self=enabled; // set `diff` timestamp
var curr=+new Date();var ms=curr - (prevTime || curr);self.diff = ms;self.prev = prevTime;self.curr = curr;prevTime = curr; // add the `color` if not set
if(null == self.useColors)self.useColors = exports.useColors();if(null == self.color && self.useColors)self.color = selectColor();var args=Array.prototype.slice.call(arguments);args[0] = exports.coerce(args[0]);if('string' !== typeof args[0]){ // anything else let's inspect with %o
args = ['%o'].concat(args);} // apply any `formatters` transformations
var index=0;args[0] = args[0].replace(/%([a-z%])/g,function(match,format){ // if we encounter an escaped % then don't increase the array index
if(match === '%%')return match;index++;var formatter=exports.formatters[format];if('function' === typeof formatter){var val=args[index];match = formatter.call(self,val); // now we need to remove `args[index]` since it's inlined in the `format`
args.splice(index,1);index--;}return match;});if('function' === typeof exports.formatArgs){args = exports.formatArgs.apply(self,args);}var logFn=enabled.log || exports.log || console.log.bind(console);logFn.apply(self,args);}enabled.enabled = true;var fn=exports.enabled(namespace)?enabled:disabled;fn.namespace = namespace;return fn;} /**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */function enable(namespaces){exports.save(namespaces);var split=(namespaces || '').split(/[\s,]+/);var len=split.length;for(var i=0;i < len;i++) {if(!split[i])continue; // ignore empty strings
namespaces = split[i].replace(/\*/g,'.*?');if(namespaces[0] === '-'){exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));}else {exports.names.push(new RegExp('^' + namespaces + '$'));}}} /**
 * Disable debug output.
 *
 * @api public
 */function disable(){exports.enable('');} /**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */function enabled(name){var i,len;for(i = 0,len = exports.skips.length;i < len;i++) {if(exports.skips[i].test(name)){return false;}}for(i = 0,len = exports.names.length;i < len;i++) {if(exports.names[i].test(name)){return true;}}return false;} /**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */function coerce(val){if(val instanceof Error)return val.stack || val.message;return val;}},{"ms":25}],19:[function(_dereq_,module,exports){(function(global){ /**
 * Module dependencies.
 */var keys=_dereq_('./keys');var hasBinary=_dereq_('has-binary');var sliceBuffer=_dereq_('arraybuffer.slice');var base64encoder=_dereq_('base64-arraybuffer');var after=_dereq_('after');var utf8=_dereq_('utf8'); /**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */var isAndroid=navigator.userAgent.match(/Android/i); /**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */var isPhantomJS=/PhantomJS/i.test(navigator.userAgent); /**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */var dontSendBlobs=isAndroid || isPhantomJS; /**
 * Current protocol version.
 */exports.protocol = 3; /**
 * Packet types.
 */var packets=exports.packets = {open:0, // non-ws
close:1, // non-ws
ping:2,pong:3,message:4,upgrade:5,noop:6};var packetslist=keys(packets); /**
 * Premade error packet.
 */var err={type:'error',data:'parser error'}; /**
 * Create a blob api even for blob builder when vendor prefixes exist
 */var Blob=_dereq_('blob'); /**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */exports.encodePacket = function(packet,supportsBinary,utf8encode,callback){if('function' == typeof supportsBinary){callback = supportsBinary;supportsBinary = false;}if('function' == typeof utf8encode){callback = utf8encode;utf8encode = null;}var data=packet.data === undefined?undefined:packet.data.buffer || packet.data;if(global.ArrayBuffer && data instanceof ArrayBuffer){return encodeArrayBuffer(packet,supportsBinary,callback);}else if(Blob && data instanceof global.Blob){return encodeBlob(packet,supportsBinary,callback);} // might be an object with { base64: true, data: dataAsBase64String }
if(data && data.base64){return encodeBase64Object(packet,callback);} // Sending data as a utf-8 string
var encoded=packets[packet.type]; // data fragment is optional
if(undefined !== packet.data){encoded += utf8encode?utf8.encode(String(packet.data)):String(packet.data);}return callback('' + encoded);};function encodeBase64Object(packet,callback){ // packet data is an object { base64: true, data: dataAsBase64String }
var message='b' + exports.packets[packet.type] + packet.data.data;return callback(message);} /**
 * Encode packet helpers for binary types
 */function encodeArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}var data=packet.data;var contentArray=new Uint8Array(data);var resultBuffer=new Uint8Array(1 + data.byteLength);resultBuffer[0] = packets[packet.type];for(var i=0;i < contentArray.length;i++) {resultBuffer[i + 1] = contentArray[i];}return callback(resultBuffer.buffer);}function encodeBlobAsArrayBuffer(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}var fr=new FileReader();fr.onload = function(){packet.data = fr.result;exports.encodePacket(packet,supportsBinary,true,callback);};return fr.readAsArrayBuffer(packet.data);}function encodeBlob(packet,supportsBinary,callback){if(!supportsBinary){return exports.encodeBase64Packet(packet,callback);}if(dontSendBlobs){return encodeBlobAsArrayBuffer(packet,supportsBinary,callback);}var length=new Uint8Array(1);length[0] = packets[packet.type];var blob=new Blob([length.buffer,packet.data]);return callback(blob);} /**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */exports.encodeBase64Packet = function(packet,callback){var message='b' + exports.packets[packet.type];if(Blob && packet.data instanceof global.Blob){var fr=new FileReader();fr.onload = function(){var b64=fr.result.split(',')[1];callback(message + b64);};return fr.readAsDataURL(packet.data);}var b64data;try{b64data = String.fromCharCode.apply(null,new Uint8Array(packet.data));}catch(e) { // iPhone Safari doesn't let you apply with typed arrays
var typed=new Uint8Array(packet.data);var basic=new Array(typed.length);for(var i=0;i < typed.length;i++) {basic[i] = typed[i];}b64data = String.fromCharCode.apply(null,basic);}message += global.btoa(b64data);return callback(message);}; /**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */exports.decodePacket = function(data,binaryType,utf8decode){ // String data
if(typeof data == 'string' || data === undefined){if(data.charAt(0) == 'b'){return exports.decodeBase64Packet(data.substr(1),binaryType);}if(utf8decode){try{data = utf8.decode(data);}catch(e) {return err;}}var type=data.charAt(0);if(Number(type) != type || !packetslist[type]){return err;}if(data.length > 1){return {type:packetslist[type],data:data.substring(1)};}else {return {type:packetslist[type]};}}var asArray=new Uint8Array(data);var type=asArray[0];var rest=sliceBuffer(data,1);if(Blob && binaryType === 'blob'){rest = new Blob([rest]);}return {type:packetslist[type],data:rest};}; /**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */exports.decodeBase64Packet = function(msg,binaryType){var type=packetslist[msg.charAt(0)];if(!global.ArrayBuffer){return {type:type,data:{base64:true,data:msg.substr(1)}};}var data=base64encoder.decode(msg.substr(1));if(binaryType === 'blob' && Blob){data = new Blob([data]);}return {type:type,data:data};}; /**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */exports.encodePayload = function(packets,supportsBinary,callback){if(typeof supportsBinary == 'function'){callback = supportsBinary;supportsBinary = null;}var isBinary=hasBinary(packets);if(supportsBinary && isBinary){if(Blob && !dontSendBlobs){return exports.encodePayloadAsBlob(packets,callback);}return exports.encodePayloadAsArrayBuffer(packets,callback);}if(!packets.length){return callback('0:');}function setLengthHeader(message){return message.length + ':' + message;}function encodeOne(packet,doneCallback){exports.encodePacket(packet,!isBinary?false:supportsBinary,true,function(message){doneCallback(null,setLengthHeader(message));});}map(packets,encodeOne,function(err,results){return callback(results.join(''));});}; /**
 * Async array map using after
 */function map(ary,each,done){var result=new Array(ary.length);var next=after(ary.length,done);var eachWithIndex=function eachWithIndex(i,el,cb){each(el,function(error,msg){result[i] = msg;cb(error,result);});};for(var i=0;i < ary.length;i++) {eachWithIndex(i,ary[i],next);}} /*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */exports.decodePayload = function(data,binaryType,callback){if(typeof data != 'string'){return exports.decodePayloadAsBinary(data,binaryType,callback);}if(typeof binaryType === 'function'){callback = binaryType;binaryType = null;}var packet;if(data == ''){ // parser error - ignoring payload
return callback(err,0,1);}var length='',n,msg;for(var i=0,l=data.length;i < l;i++) {var chr=data.charAt(i);if(':' != chr){length += chr;}else {if('' == length || length != (n = Number(length))){ // parser error - ignoring payload
return callback(err,0,1);}msg = data.substr(i + 1,n);if(length != msg.length){ // parser error - ignoring payload
return callback(err,0,1);}if(msg.length){packet = exports.decodePacket(msg,binaryType,true);if(err.type == packet.type && err.data == packet.data){ // parser error in individual packet - ignoring payload
return callback(err,0,1);}var ret=callback(packet,i + n,l);if(false === ret)return;} // advance cursor
i += n;length = '';}}if(length != ''){ // parser error - ignoring payload
return callback(err,0,1);}}; /**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */exports.encodePayloadAsArrayBuffer = function(packets,callback){if(!packets.length){return callback(new ArrayBuffer(0));}function encodeOne(packet,doneCallback){exports.encodePacket(packet,true,true,function(data){return doneCallback(null,data);});}map(packets,encodeOne,function(err,encodedPackets){var totalLength=encodedPackets.reduce(function(acc,p){var len;if(typeof p === 'string'){len = p.length;}else {len = p.byteLength;}return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
},0);var resultArray=new Uint8Array(totalLength);var bufferIndex=0;encodedPackets.forEach(function(p){var isString=typeof p === 'string';var ab=p;if(isString){var view=new Uint8Array(p.length);for(var i=0;i < p.length;i++) {view[i] = p.charCodeAt(i);}ab = view.buffer;}if(isString){ // not true binary
resultArray[bufferIndex++] = 0;}else { // true binary
resultArray[bufferIndex++] = 1;}var lenStr=ab.byteLength.toString();for(var i=0;i < lenStr.length;i++) {resultArray[bufferIndex++] = parseInt(lenStr[i]);}resultArray[bufferIndex++] = 255;var view=new Uint8Array(ab);for(var i=0;i < view.length;i++) {resultArray[bufferIndex++] = view[i];}});return callback(resultArray.buffer);});}; /**
 * Encode as Blob
 */exports.encodePayloadAsBlob = function(packets,callback){function encodeOne(packet,doneCallback){exports.encodePacket(packet,true,true,function(encoded){var binaryIdentifier=new Uint8Array(1);binaryIdentifier[0] = 1;if(typeof encoded === 'string'){var view=new Uint8Array(encoded.length);for(var i=0;i < encoded.length;i++) {view[i] = encoded.charCodeAt(i);}encoded = view.buffer;binaryIdentifier[0] = 0;}var len=encoded instanceof ArrayBuffer?encoded.byteLength:encoded.size;var lenStr=len.toString();var lengthAry=new Uint8Array(lenStr.length + 1);for(var i=0;i < lenStr.length;i++) {lengthAry[i] = parseInt(lenStr[i]);}lengthAry[lenStr.length] = 255;if(Blob){var blob=new Blob([binaryIdentifier.buffer,lengthAry.buffer,encoded]);doneCallback(null,blob);}});}map(packets,encodeOne,function(err,results){return callback(new Blob(results));});}; /*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */exports.decodePayloadAsBinary = function(data,binaryType,callback){if(typeof binaryType === 'function'){callback = binaryType;binaryType = null;}var bufferTail=data;var buffers=[];var numberTooLong=false;while(bufferTail.byteLength > 0) {var tailArray=new Uint8Array(bufferTail);var isString=tailArray[0] === 0;var msgLength='';for(var i=1;;i++) {if(tailArray[i] == 255)break;if(msgLength.length > 310){numberTooLong = true;break;}msgLength += tailArray[i];}if(numberTooLong)return callback(err,0,1);bufferTail = sliceBuffer(bufferTail,2 + msgLength.length);msgLength = parseInt(msgLength);var msg=sliceBuffer(bufferTail,0,msgLength);if(isString){try{msg = String.fromCharCode.apply(null,new Uint8Array(msg));}catch(e) { // iPhone Safari doesn't let you apply to typed arrays
var typed=new Uint8Array(msg);msg = '';for(var i=0;i < typed.length;i++) {msg += String.fromCharCode(typed[i]);}}}buffers.push(msg);bufferTail = sliceBuffer(bufferTail,msgLength);}var total=buffers.length;buffers.forEach(function(buffer,i){callback(exports.decodePacket(buffer,binaryType,true),i,total);});};}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{"./keys":20,"after":11,"arraybuffer.slice":12,"base64-arraybuffer":13,"blob":14,"has-binary":21,"utf8":29}],20:[function(_dereq_,module,exports){ /**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */module.exports = Object.keys || function keys(obj){var arr=[];var has=Object.prototype.hasOwnProperty;for(var i in obj) {if(has.call(obj,i)){arr.push(i);}}return arr;};},{}],21:[function(_dereq_,module,exports){(function(global){ /*
 * Module requirements.
 */var isArray=_dereq_('isarray'); /**
 * Module exports.
 */module.exports = hasBinary; /**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */function hasBinary(data){function _hasBinary(obj){if(!obj)return false;if(global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File){return true;}if(isArray(obj)){for(var i=0;i < obj.length;i++) {if(_hasBinary(obj[i])){return true;}}}else if(obj && 'object' == typeof obj){if(obj.toJSON){obj = obj.toJSON();}for(var key in obj) {if(Object.prototype.hasOwnProperty.call(obj,key) && _hasBinary(obj[key])){return true;}}}return false;}return _hasBinary(data);}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{"isarray":24}],22:[function(_dereq_,module,exports){ /**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */try{module.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();}catch(err) { // if XMLHttp support is disabled in IE then it will throw
// when trying to create
module.exports = false;}},{}],23:[function(_dereq_,module,exports){var indexOf=[].indexOf;module.exports = function(arr,obj){if(indexOf)return arr.indexOf(obj);for(var i=0;i < arr.length;++i) {if(arr[i] === obj)return i;}return -1;};},{}],24:[function(_dereq_,module,exports){module.exports = Array.isArray || function(arr){return Object.prototype.toString.call(arr) == '[object Array]';};},{}],25:[function(_dereq_,module,exports){ /**
 * Helpers.
 */var s=1000;var m=s * 60;var h=m * 60;var d=h * 24;var y=d * 365.25; /**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */module.exports = function(val,options){options = options || {};if('string' == typeof val)return parse(val);return options.long?long(val):short(val);}; /**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */function parse(str){str = '' + str;if(str.length > 10000)return;var match=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);if(!match)return;var n=parseFloat(match[1]);var type=(match[2] || 'ms').toLowerCase();switch(type){case 'years':case 'year':case 'yrs':case 'yr':case 'y':return n * y;case 'days':case 'day':case 'd':return n * d;case 'hours':case 'hour':case 'hrs':case 'hr':case 'h':return n * h;case 'minutes':case 'minute':case 'mins':case 'min':case 'm':return n * m;case 'seconds':case 'second':case 'secs':case 'sec':case 's':return n * s;case 'milliseconds':case 'millisecond':case 'msecs':case 'msec':case 'ms':return n;}} /**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */function short(ms){if(ms >= d)return Math.round(ms / d) + 'd';if(ms >= h)return Math.round(ms / h) + 'h';if(ms >= m)return Math.round(ms / m) + 'm';if(ms >= s)return Math.round(ms / s) + 's';return ms + 'ms';} /**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */function long(ms){return plural(ms,d,'day') || plural(ms,h,'hour') || plural(ms,m,'minute') || plural(ms,s,'second') || ms + ' ms';} /**
 * Pluralization helper.
 */function plural(ms,n,name){if(ms < n)return;if(ms < n * 1.5)return Math.floor(ms / n) + ' ' + name;return Math.ceil(ms / n) + ' ' + name + 's';}},{}],26:[function(_dereq_,module,exports){(function(global){ /**
 * JSON parse.
 *
 * @see Based on jQuery#parseJSON (MIT) and JSON2
 * @api private
 */var rvalidchars=/^[\],:{}\s]*$/;var rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;var rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;var rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g;var rtrimLeft=/^\s+/;var rtrimRight=/\s+$/;module.exports = function parsejson(data){if('string' != typeof data || !data){return null;}data = data.replace(rtrimLeft,'').replace(rtrimRight,''); // Attempt to parse using the native JSON parser first
if(global.JSON && JSON.parse){return JSON.parse(data);}if(rvalidchars.test(data.replace(rvalidescape,'@').replace(rvalidtokens,']').replace(rvalidbraces,''))){return new Function('return ' + data)();}};}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{}],27:[function(_dereq_,module,exports){ /**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */exports.encode = function(obj){var str='';for(var i in obj) {if(obj.hasOwnProperty(i)){if(str.length)str += '&';str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);}}return str;}; /**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */exports.decode = function(qs){var qry={};var pairs=qs.split('&');for(var i=0,l=pairs.length;i < l;i++) {var pair=pairs[i].split('=');qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);}return qry;};},{}],28:[function(_dereq_,module,exports){ /**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */var re=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;var parts=['source','protocol','authority','userInfo','user','password','host','port','relative','path','directory','file','query','anchor'];module.exports = function parseuri(str){var src=str,b=str.indexOf('['),e=str.indexOf(']');if(b != -1 && e != -1){str = str.substring(0,b) + str.substring(b,e).replace(/:/g,';') + str.substring(e,str.length);}var m=re.exec(str || ''),uri={},i=14;while(i--) {uri[parts[i]] = m[i] || '';}if(b != -1 && e != -1){uri.source = src;uri.host = uri.host.substring(1,uri.host.length - 1).replace(/;/g,':');uri.authority = uri.authority.replace('[','').replace(']','').replace(/;/g,':');uri.ipv6uri = true;}return uri;};},{}],29:[function(_dereq_,module,exports){(function(global){ /*! https://mths.be/utf8js v2.0.0 by @mathias */;(function(root){ // Detect free variables `exports`
var freeExports=typeof exports == 'object' && exports; // Detect free variable `module`
var freeModule=typeof module == 'object' && module && module.exports == freeExports && module; // Detect free variable `global`, from Node.js or Browserified code,
// and use it as `root`
var freeGlobal=typeof global == 'object' && global;if(freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal){root = freeGlobal;} /*--------------------------------------------------------------------------*/var stringFromCharCode=String.fromCharCode; // Taken from https://mths.be/punycode
function ucs2decode(string){var output=[];var counter=0;var length=string.length;var value;var extra;while(counter < length) {value = string.charCodeAt(counter++);if(value >= 0xD800 && value <= 0xDBFF && counter < length){ // high surrogate, and there is a next character
extra = string.charCodeAt(counter++);if((extra & 0xFC00) == 0xDC00){ // low surrogate
output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);}else { // unmatched surrogate; only append this code unit, in case the next
// code unit is the high surrogate of a surrogate pair
output.push(value);counter--;}}else {output.push(value);}}return output;} // Taken from https://mths.be/punycode
function ucs2encode(array){var length=array.length;var index=-1;var value;var output='';while(++index < length) {value = array[index];if(value > 0xFFFF){value -= 0x10000;output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);value = 0xDC00 | value & 0x3FF;}output += stringFromCharCode(value);}return output;}function checkScalarValue(codePoint){if(codePoint >= 0xD800 && codePoint <= 0xDFFF){throw Error('Lone surrogate U+' + codePoint.toString(16).toUpperCase() + ' is not a scalar value');}} /*--------------------------------------------------------------------------*/function createByte(codePoint,shift){return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);}function encodeCodePoint(codePoint){if((codePoint & 0xFFFFFF80) == 0){ // 1-byte sequence
return stringFromCharCode(codePoint);}var symbol='';if((codePoint & 0xFFFFF800) == 0){ // 2-byte sequence
symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);}else if((codePoint & 0xFFFF0000) == 0){ // 3-byte sequence
checkScalarValue(codePoint);symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);symbol += createByte(codePoint,6);}else if((codePoint & 0xFFE00000) == 0){ // 4-byte sequence
symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);symbol += createByte(codePoint,12);symbol += createByte(codePoint,6);}symbol += stringFromCharCode(codePoint & 0x3F | 0x80);return symbol;}function utf8encode(string){var codePoints=ucs2decode(string);var length=codePoints.length;var index=-1;var codePoint;var byteString='';while(++index < length) {codePoint = codePoints[index];byteString += encodeCodePoint(codePoint);}return byteString;} /*--------------------------------------------------------------------------*/function readContinuationByte(){if(byteIndex >= byteCount){throw Error('Invalid byte index');}var continuationByte=byteArray[byteIndex] & 0xFF;byteIndex++;if((continuationByte & 0xC0) == 0x80){return continuationByte & 0x3F;} // If we end up here, it’s not a continuation byte
throw Error('Invalid continuation byte');}function decodeSymbol(){var byte1;var byte2;var byte3;var byte4;var codePoint;if(byteIndex > byteCount){throw Error('Invalid byte index');}if(byteIndex == byteCount){return false;} // Read first byte
byte1 = byteArray[byteIndex] & 0xFF;byteIndex++; // 1-byte sequence (no continuation bytes)
if((byte1 & 0x80) == 0){return byte1;} // 2-byte sequence
if((byte1 & 0xE0) == 0xC0){var byte2=readContinuationByte();codePoint = (byte1 & 0x1F) << 6 | byte2;if(codePoint >= 0x80){return codePoint;}else {throw Error('Invalid continuation byte');}} // 3-byte sequence (may include unpaired surrogates)
if((byte1 & 0xF0) == 0xE0){byte2 = readContinuationByte();byte3 = readContinuationByte();codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;if(codePoint >= 0x0800){checkScalarValue(codePoint);return codePoint;}else {throw Error('Invalid continuation byte');}} // 4-byte sequence
if((byte1 & 0xF8) == 0xF0){byte2 = readContinuationByte();byte3 = readContinuationByte();byte4 = readContinuationByte();codePoint = (byte1 & 0x0F) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;if(codePoint >= 0x010000 && codePoint <= 0x10FFFF){return codePoint;}}throw Error('Invalid UTF-8 detected');}var byteArray;var byteCount;var byteIndex;function utf8decode(byteString){byteArray = ucs2decode(byteString);byteCount = byteArray.length;byteIndex = 0;var codePoints=[];var tmp;while((tmp = decodeSymbol()) !== false) {codePoints.push(tmp);}return ucs2encode(codePoints);} /*--------------------------------------------------------------------------*/var utf8={'version':'2.0.0','encode':utf8encode,'decode':utf8decode}; // Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
if(typeof define == 'function' && typeof define.amd == 'object' && define.amd){define(function(){return utf8;});}else if(freeExports && !freeExports.nodeType){if(freeModule){ // in Node.js or RingoJS v0.8.0+
freeModule.exports = utf8;}else { // in Narwhal or RingoJS v0.7.0-
var object={};var hasOwnProperty=object.hasOwnProperty;for(var key in utf8) {hasOwnProperty.call(utf8,key) && (freeExports[key] = utf8[key]);}}}else { // in Rhino or a web browser
root.utf8 = utf8;}})(this);}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{}],30:[function(_dereq_,module,exports){'use strict';var alphabet='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),length=64,map={},seed=0,i=0,prev; /**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */function encode(num){var encoded='';do {encoded = alphabet[num % length] + encoded;num = Math.floor(num / length);}while(num > 0);return encoded;} /**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */function decode(str){var decoded=0;for(i = 0;i < str.length;i++) {decoded = decoded * length + map[str.charAt(i)];}return decoded;} /**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */function yeast(){var now=encode(+new Date());if(now !== prev)return seed = 0,prev = now;return now + '.' + encode(seed++);} //
// Map each character to its index.
//
for(;i < length;i++) map[alphabet[i]] = i; //
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;yeast.decode = decode;module.exports = yeast;},{}],31:[function(_dereq_,module,exports){ /**
 * Module dependencies.
 */var url=_dereq_('./url');var parser=_dereq_('socket.io-parser');var Manager=_dereq_('./manager');var debug=_dereq_('debug')('socket.io-client'); /**
 * Module exports.
 */module.exports = exports = lookup; /**
 * Managers cache.
 */var cache=exports.managers = {}; /**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */function lookup(uri,opts){if(typeof uri == 'object'){opts = uri;uri = undefined;}opts = opts || {};var parsed=url(uri);var source=parsed.source;var id=parsed.id;var path=parsed.path;var sameNamespace=cache[id] && path in cache[id].nsps;var newConnection=opts.forceNew || opts['force new connection'] || false === opts.multiplex || sameNamespace;var io;if(newConnection){debug('ignoring socket cache for %s',source);io = Manager(source,opts);}else {if(!cache[id]){debug('new io instance for %s',source);cache[id] = Manager(source,opts);}io = cache[id];}return io.socket(parsed.path);} /**
 * Protocol version.
 *
 * @api public
 */exports.protocol = parser.protocol; /**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */exports.connect = lookup; /**
 * Expose constructors for standalone build.
 *
 * @api public
 */exports.Manager = _dereq_('./manager');exports.Socket = _dereq_('./socket');},{"./manager":32,"./socket":34,"./url":35,"debug":39,"socket.io-parser":47}],32:[function(_dereq_,module,exports){ /**
 * Module dependencies.
 */var eio=_dereq_('engine.io-client');var Socket=_dereq_('./socket');var Emitter=_dereq_('component-emitter');var parser=_dereq_('socket.io-parser');var on=_dereq_('./on');var bind=_dereq_('component-bind');var debug=_dereq_('debug')('socket.io-client:manager');var indexOf=_dereq_('indexof');var Backoff=_dereq_('backo2'); /**
 * IE6+ hasOwnProperty
 */var has=Object.prototype.hasOwnProperty; /**
 * Module exports
 */module.exports = Manager; /**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */function Manager(uri,opts){if(!(this instanceof Manager))return new Manager(uri,opts);if(uri && 'object' == typeof uri){opts = uri;uri = undefined;}opts = opts || {};opts.path = opts.path || '/socket.io';this.nsps = {};this.subs = [];this.opts = opts;this.reconnection(opts.reconnection !== false);this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);this.reconnectionDelay(opts.reconnectionDelay || 1000);this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);this.randomizationFactor(opts.randomizationFactor || 0.5);this.backoff = new Backoff({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()});this.timeout(null == opts.timeout?20000:opts.timeout);this.readyState = 'closed';this.uri = uri;this.connecting = [];this.lastPing = null;this.encoding = false;this.packetBuffer = [];this.encoder = new parser.Encoder();this.decoder = new parser.Decoder();this.autoConnect = opts.autoConnect !== false;if(this.autoConnect)this.open();} /**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */Manager.prototype.emitAll = function(){this.emit.apply(this,arguments);for(var nsp in this.nsps) {if(has.call(this.nsps,nsp)){this.nsps[nsp].emit.apply(this.nsps[nsp],arguments);}}}; /**
 * Update `socket.id` of all sockets
 *
 * @api private
 */Manager.prototype.updateSocketIds = function(){for(var nsp in this.nsps) {if(has.call(this.nsps,nsp)){this.nsps[nsp].id = this.engine.id;}}}; /**
 * Mix in `Emitter`.
 */Emitter(Manager.prototype); /**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */Manager.prototype.reconnection = function(v){if(!arguments.length)return this._reconnection;this._reconnection = !!v;return this;}; /**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */Manager.prototype.reconnectionAttempts = function(v){if(!arguments.length)return this._reconnectionAttempts;this._reconnectionAttempts = v;return this;}; /**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */Manager.prototype.reconnectionDelay = function(v){if(!arguments.length)return this._reconnectionDelay;this._reconnectionDelay = v;this.backoff && this.backoff.setMin(v);return this;};Manager.prototype.randomizationFactor = function(v){if(!arguments.length)return this._randomizationFactor;this._randomizationFactor = v;this.backoff && this.backoff.setJitter(v);return this;}; /**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */Manager.prototype.reconnectionDelayMax = function(v){if(!arguments.length)return this._reconnectionDelayMax;this._reconnectionDelayMax = v;this.backoff && this.backoff.setMax(v);return this;}; /**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */Manager.prototype.timeout = function(v){if(!arguments.length)return this._timeout;this._timeout = v;return this;}; /**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */Manager.prototype.maybeReconnectOnOpen = function(){ // Only try to reconnect if it's the first time we're connecting
if(!this.reconnecting && this._reconnection && this.backoff.attempts === 0){ // keeps reconnection from firing twice for the same reconnection loop
this.reconnect();}}; /**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */Manager.prototype.open = Manager.prototype.connect = function(fn){debug('readyState %s',this.readyState);if(~this.readyState.indexOf('open'))return this;debug('opening %s',this.uri);this.engine = eio(this.uri,this.opts);var socket=this.engine;var self=this;this.readyState = 'opening';this.skipReconnect = false; // emit `open`
var openSub=on(socket,'open',function(){self.onopen();fn && fn();}); // emit `connect_error`
var errorSub=on(socket,'error',function(data){debug('connect_error');self.cleanup();self.readyState = 'closed';self.emitAll('connect_error',data);if(fn){var err=new Error('Connection error');err.data = data;fn(err);}else { // Only do this if there is no fn to handle the error
self.maybeReconnectOnOpen();}}); // emit `connect_timeout`
if(false !== this._timeout){var timeout=this._timeout;debug('connect attempt will timeout after %d',timeout); // set timer
var timer=setTimeout(function(){debug('connect attempt timed out after %d',timeout);openSub.destroy();socket.close();socket.emit('error','timeout');self.emitAll('connect_timeout',timeout);},timeout);this.subs.push({destroy:function destroy(){clearTimeout(timer);}});}this.subs.push(openSub);this.subs.push(errorSub);return this;}; /**
 * Called upon transport open.
 *
 * @api private
 */Manager.prototype.onopen = function(){debug('open'); // clear old subs
this.cleanup(); // mark as open
this.readyState = 'open';this.emit('open'); // add new subs
var socket=this.engine;this.subs.push(on(socket,'data',bind(this,'ondata')));this.subs.push(on(socket,'ping',bind(this,'onping')));this.subs.push(on(socket,'pong',bind(this,'onpong')));this.subs.push(on(socket,'error',bind(this,'onerror')));this.subs.push(on(socket,'close',bind(this,'onclose')));this.subs.push(on(this.decoder,'decoded',bind(this,'ondecoded')));}; /**
 * Called upon a ping.
 *
 * @api private
 */Manager.prototype.onping = function(){this.lastPing = new Date();this.emitAll('ping');}; /**
 * Called upon a packet.
 *
 * @api private
 */Manager.prototype.onpong = function(){this.emitAll('pong',new Date() - this.lastPing);}; /**
 * Called with data.
 *
 * @api private
 */Manager.prototype.ondata = function(data){this.decoder.add(data);}; /**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */Manager.prototype.ondecoded = function(packet){this.emit('packet',packet);}; /**
 * Called upon socket error.
 *
 * @api private
 */Manager.prototype.onerror = function(err){debug('error',err);this.emitAll('error',err);}; /**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */Manager.prototype.socket = function(nsp){var socket=this.nsps[nsp];if(!socket){socket = new Socket(this,nsp);this.nsps[nsp] = socket;var self=this;socket.on('connecting',onConnecting);socket.on('connect',function(){socket.id = self.engine.id;});if(this.autoConnect){ // manually call here since connecting evnet is fired before listening
onConnecting();}}function onConnecting(){if(! ~indexOf(self.connecting,socket)){self.connecting.push(socket);}}return socket;}; /**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */Manager.prototype.destroy = function(socket){var index=indexOf(this.connecting,socket);if(~index)this.connecting.splice(index,1);if(this.connecting.length)return;this.close();}; /**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */Manager.prototype.packet = function(packet){debug('writing packet %j',packet);var self=this;if(!self.encoding){ // encode, then write to engine with result
self.encoding = true;this.encoder.encode(packet,function(encodedPackets){for(var i=0;i < encodedPackets.length;i++) {self.engine.write(encodedPackets[i],packet.options);}self.encoding = false;self.processPacketQueue();});}else { // add packet to the queue
self.packetBuffer.push(packet);}}; /**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */Manager.prototype.processPacketQueue = function(){if(this.packetBuffer.length > 0 && !this.encoding){var pack=this.packetBuffer.shift();this.packet(pack);}}; /**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */Manager.prototype.cleanup = function(){debug('cleanup');var sub;while(sub = this.subs.shift()) sub.destroy();this.packetBuffer = [];this.encoding = false;this.lastPing = null;this.decoder.destroy();}; /**
 * Close the current socket.
 *
 * @api private
 */Manager.prototype.close = Manager.prototype.disconnect = function(){debug('disconnect');this.skipReconnect = true;this.reconnecting = false;if('opening' == this.readyState){ // `onclose` will not fire because
// an open event never happened
this.cleanup();}this.backoff.reset();this.readyState = 'closed';if(this.engine)this.engine.close();}; /**
 * Called upon engine close.
 *
 * @api private
 */Manager.prototype.onclose = function(reason){debug('onclose');this.cleanup();this.backoff.reset();this.readyState = 'closed';this.emit('close',reason);if(this._reconnection && !this.skipReconnect){this.reconnect();}}; /**
 * Attempt a reconnection.
 *
 * @api private
 */Manager.prototype.reconnect = function(){if(this.reconnecting || this.skipReconnect)return this;var self=this;if(this.backoff.attempts >= this._reconnectionAttempts){debug('reconnect failed');this.backoff.reset();this.emitAll('reconnect_failed');this.reconnecting = false;}else {var delay=this.backoff.duration();debug('will wait %dms before reconnect attempt',delay);this.reconnecting = true;var timer=setTimeout(function(){if(self.skipReconnect)return;debug('attempting reconnect');self.emitAll('reconnect_attempt',self.backoff.attempts);self.emitAll('reconnecting',self.backoff.attempts); // check again for the case socket closed in above events
if(self.skipReconnect)return;self.open(function(err){if(err){debug('reconnect attempt error');self.reconnecting = false;self.reconnect();self.emitAll('reconnect_error',err.data);}else {debug('reconnect success');self.onreconnect();}});},delay);this.subs.push({destroy:function destroy(){clearTimeout(timer);}});}}; /**
 * Called upon successful reconnect.
 *
 * @api private
 */Manager.prototype.onreconnect = function(){var attempt=this.backoff.attempts;this.reconnecting = false;this.backoff.reset();this.updateSocketIds();this.emitAll('reconnect',attempt);};},{"./on":33,"./socket":34,"backo2":36,"component-bind":37,"component-emitter":38,"debug":39,"engine.io-client":1,"indexof":42,"socket.io-parser":47}],33:[function(_dereq_,module,exports){ /**
 * Module exports.
 */module.exports = on; /**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */function on(obj,ev,fn){obj.on(ev,fn);return {destroy:function destroy(){obj.removeListener(ev,fn);}};}},{}],34:[function(_dereq_,module,exports){ /**
 * Module dependencies.
 */var parser=_dereq_('socket.io-parser');var Emitter=_dereq_('component-emitter');var toArray=_dereq_('to-array');var on=_dereq_('./on');var bind=_dereq_('component-bind');var debug=_dereq_('debug')('socket.io-client:socket');var hasBin=_dereq_('has-binary'); /**
 * Module exports.
 */module.exports = exports = Socket; /**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */var events={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1}; /**
 * Shortcut to `Emitter#emit`.
 */var emit=Emitter.prototype.emit; /**
 * `Socket` constructor.
 *
 * @api public
 */function Socket(io,nsp){this.io = io;this.nsp = nsp;this.json = this; // compat
this.ids = 0;this.acks = {};this.receiveBuffer = [];this.sendBuffer = [];this.connected = false;this.disconnected = true;if(this.io.autoConnect)this.open();} /**
 * Mix in `Emitter`.
 */Emitter(Socket.prototype); /**
 * Subscribe to open, close and packet events
 *
 * @api private
 */Socket.prototype.subEvents = function(){if(this.subs)return;var io=this.io;this.subs = [on(io,'open',bind(this,'onopen')),on(io,'packet',bind(this,'onpacket')),on(io,'close',bind(this,'onclose'))];}; /**
 * "Opens" the socket.
 *
 * @api public
 */Socket.prototype.open = Socket.prototype.connect = function(){if(this.connected)return this;this.subEvents();this.io.open(); // ensure open
if('open' == this.io.readyState)this.onopen();this.emit('connecting');return this;}; /**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */Socket.prototype.send = function(){var args=toArray(arguments);args.unshift('message');this.emit.apply(this,args);return this;}; /**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */Socket.prototype.emit = function(ev){if(events.hasOwnProperty(ev)){emit.apply(this,arguments);return this;}var args=toArray(arguments);var parserType=parser.EVENT; // default
if(hasBin(args)){parserType = parser.BINARY_EVENT;} // binary
var packet={type:parserType,data:args};packet.options = {};packet.options.compress = !this.flags || false !== this.flags.compress; // event ack callback
if('function' == typeof args[args.length - 1]){debug('emitting packet with ack id %d',this.ids);this.acks[this.ids] = args.pop();packet.id = this.ids++;}if(this.connected){this.packet(packet);}else {this.sendBuffer.push(packet);}delete this.flags;return this;}; /**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */Socket.prototype.packet = function(packet){packet.nsp = this.nsp;this.io.packet(packet);}; /**
 * Called upon engine `open`.
 *
 * @api private
 */Socket.prototype.onopen = function(){debug('transport is open - connecting'); // write connect packet if necessary
if('/' != this.nsp){this.packet({type:parser.CONNECT});}}; /**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */Socket.prototype.onclose = function(reason){debug('close (%s)',reason);this.connected = false;this.disconnected = true;delete this.id;this.emit('disconnect',reason);}; /**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */Socket.prototype.onpacket = function(packet){if(packet.nsp != this.nsp)return;switch(packet.type){case parser.CONNECT:this.onconnect();break;case parser.EVENT:this.onevent(packet);break;case parser.BINARY_EVENT:this.onevent(packet);break;case parser.ACK:this.onack(packet);break;case parser.BINARY_ACK:this.onack(packet);break;case parser.DISCONNECT:this.ondisconnect();break;case parser.ERROR:this.emit('error',packet.data);break;}}; /**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */Socket.prototype.onevent = function(packet){var args=packet.data || [];debug('emitting event %j',args);if(null != packet.id){debug('attaching ack callback to event');args.push(this.ack(packet.id));}if(this.connected){emit.apply(this,args);}else {this.receiveBuffer.push(args);}}; /**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */Socket.prototype.ack = function(id){var self=this;var sent=false;return function(){ // prevent double callbacks
if(sent)return;sent = true;var args=toArray(arguments);debug('sending ack %j',args);var type=hasBin(args)?parser.BINARY_ACK:parser.ACK;self.packet({type:type,id:id,data:args});};}; /**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */Socket.prototype.onack = function(packet){var ack=this.acks[packet.id];if('function' == typeof ack){debug('calling ack %s with %j',packet.id,packet.data);ack.apply(this,packet.data);delete this.acks[packet.id];}else {debug('bad ack %s',packet.id);}}; /**
 * Called upon server connect.
 *
 * @api private
 */Socket.prototype.onconnect = function(){this.connected = true;this.disconnected = false;this.emit('connect');this.emitBuffered();}; /**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */Socket.prototype.emitBuffered = function(){var i;for(i = 0;i < this.receiveBuffer.length;i++) {emit.apply(this,this.receiveBuffer[i]);}this.receiveBuffer = [];for(i = 0;i < this.sendBuffer.length;i++) {this.packet(this.sendBuffer[i]);}this.sendBuffer = [];}; /**
 * Called upon server disconnect.
 *
 * @api private
 */Socket.prototype.ondisconnect = function(){debug('server disconnect (%s)',this.nsp);this.destroy();this.onclose('io server disconnect');}; /**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */Socket.prototype.destroy = function(){if(this.subs){ // clean subscriptions to avoid reconnections
for(var i=0;i < this.subs.length;i++) {this.subs[i].destroy();}this.subs = null;}this.io.destroy(this);}; /**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */Socket.prototype.close = Socket.prototype.disconnect = function(){if(this.connected){debug('performing disconnect (%s)',this.nsp);this.packet({type:parser.DISCONNECT});} // remove socket from pool
this.destroy();if(this.connected){ // fire events
this.onclose('io client disconnect');}return this;}; /**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */Socket.prototype.compress = function(compress){this.flags = this.flags || {};this.flags.compress = compress;return this;};},{"./on":33,"component-bind":37,"component-emitter":38,"debug":39,"has-binary":41,"socket.io-parser":47,"to-array":51}],35:[function(_dereq_,module,exports){(function(global){ /**
 * Module dependencies.
 */var parseuri=_dereq_('parseuri');var debug=_dereq_('debug')('socket.io-client:url'); /**
 * Module exports.
 */module.exports = url; /**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */function url(uri,loc){var obj=uri; // default to window.location
var loc=loc || global.location;if(null == uri)uri = loc.protocol + '//' + loc.host; // relative path support
if('string' == typeof uri){if('/' == uri.charAt(0)){if('/' == uri.charAt(1)){uri = loc.protocol + uri;}else {uri = loc.host + uri;}}if(!/^(https?|wss?):\/\//.test(uri)){debug('protocol-less url %s',uri);if('undefined' != typeof loc){uri = loc.protocol + '//' + uri;}else {uri = 'https://' + uri;}} // parse
debug('parse %s',uri);obj = parseuri(uri);} // make sure we treat `localhost:80` and `localhost` equally
if(!obj.port){if(/^(http|ws)$/.test(obj.protocol)){obj.port = '80';}else if(/^(http|ws)s$/.test(obj.protocol)){obj.port = '443';}}obj.path = obj.path || '/';var ipv6=obj.host.indexOf(':') !== -1;var host=ipv6?'[' + obj.host + ']':obj.host; // define unique id
obj.id = obj.protocol + '://' + host + ':' + obj.port; // define href
obj.href = obj.protocol + '://' + host + (loc && loc.port == obj.port?'':':' + obj.port);return obj;}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{"debug":39,"parseuri":45}],36:[function(_dereq_,module,exports){ /**
 * Expose `Backoff`.
 */module.exports = Backoff; /**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */function Backoff(opts){opts = opts || {};this.ms = opts.min || 100;this.max = opts.max || 10000;this.factor = opts.factor || 2;this.jitter = opts.jitter > 0 && opts.jitter <= 1?opts.jitter:0;this.attempts = 0;} /**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */Backoff.prototype.duration = function(){var ms=this.ms * Math.pow(this.factor,this.attempts++);if(this.jitter){var rand=Math.random();var deviation=Math.floor(rand * this.jitter * ms);ms = (Math.floor(rand * 10) & 1) == 0?ms - deviation:ms + deviation;}return Math.min(ms,this.max) | 0;}; /**
 * Reset the number of attempts.
 *
 * @api public
 */Backoff.prototype.reset = function(){this.attempts = 0;}; /**
 * Set the minimum duration
 *
 * @api public
 */Backoff.prototype.setMin = function(min){this.ms = min;}; /**
 * Set the maximum duration
 *
 * @api public
 */Backoff.prototype.setMax = function(max){this.max = max;}; /**
 * Set the jitter
 *
 * @api public
 */Backoff.prototype.setJitter = function(jitter){this.jitter = jitter;};},{}],37:[function(_dereq_,module,exports){ /**
 * Slice reference.
 */var slice=[].slice; /**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */module.exports = function(obj,fn){if('string' == typeof fn)fn = obj[fn];if('function' != typeof fn)throw new Error('bind() requires a function');var args=slice.call(arguments,2);return function(){return fn.apply(obj,args.concat(slice.call(arguments)));};};},{}],38:[function(_dereq_,module,exports){ /**
 * Expose `Emitter`.
 */module.exports = Emitter; /**
 * Initialize a new `Emitter`.
 *
 * @api public
 */function Emitter(obj){if(obj)return mixin(obj);}; /**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */function mixin(obj){for(var key in Emitter.prototype) {obj[key] = Emitter.prototype[key];}return obj;} /**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.on = Emitter.prototype.addEventListener = function(event,fn){this._callbacks = this._callbacks || {};(this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);return this;}; /**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.once = function(event,fn){function on(){this.off(event,on);fn.apply(this,arguments);}on.fn = fn;this.on(event,on);return this;}; /**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event,fn){this._callbacks = this._callbacks || {}; // all
if(0 == arguments.length){this._callbacks = {};return this;} // specific event
var callbacks=this._callbacks['$' + event];if(!callbacks)return this; // remove all handlers
if(1 == arguments.length){delete this._callbacks['$' + event];return this;} // remove specific handler
var cb;for(var i=0;i < callbacks.length;i++) {cb = callbacks[i];if(cb === fn || cb.fn === fn){callbacks.splice(i,1);break;}}return this;}; /**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */Emitter.prototype.emit = function(event){this._callbacks = this._callbacks || {};var args=[].slice.call(arguments,1),callbacks=this._callbacks['$' + event];if(callbacks){callbacks = callbacks.slice(0);for(var i=0,len=callbacks.length;i < len;++i) {callbacks[i].apply(this,args);}}return this;}; /**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */Emitter.prototype.listeners = function(event){this._callbacks = this._callbacks || {};return this._callbacks['$' + event] || [];}; /**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */Emitter.prototype.hasListeners = function(event){return !!this.listeners(event).length;};},{}],39:[function(_dereq_,module,exports){arguments[4][17][0].apply(exports,arguments);},{"./debug":40,"dup":17}],40:[function(_dereq_,module,exports){arguments[4][18][0].apply(exports,arguments);},{"dup":18,"ms":44}],41:[function(_dereq_,module,exports){(function(global){ /*
 * Module requirements.
 */var isArray=_dereq_('isarray'); /**
 * Module exports.
 */module.exports = hasBinary; /**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */function hasBinary(data){function _hasBinary(obj){if(!obj)return false;if(global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File){return true;}if(isArray(obj)){for(var i=0;i < obj.length;i++) {if(_hasBinary(obj[i])){return true;}}}else if(obj && 'object' == typeof obj){ // see: https://github.com/Automattic/has-binary/pull/4
if(obj.toJSON && 'function' == typeof obj.toJSON){obj = obj.toJSON();}for(var key in obj) {if(Object.prototype.hasOwnProperty.call(obj,key) && _hasBinary(obj[key])){return true;}}}return false;}return _hasBinary(data);}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{"isarray":43}],42:[function(_dereq_,module,exports){arguments[4][23][0].apply(exports,arguments);},{"dup":23}],43:[function(_dereq_,module,exports){arguments[4][24][0].apply(exports,arguments);},{"dup":24}],44:[function(_dereq_,module,exports){arguments[4][25][0].apply(exports,arguments);},{"dup":25}],45:[function(_dereq_,module,exports){arguments[4][28][0].apply(exports,arguments);},{"dup":28}],46:[function(_dereq_,module,exports){(function(global){ /*global Blob,File*/ /**
 * Module requirements
 */var isArray=_dereq_('isarray');var isBuf=_dereq_('./is-buffer'); /**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */exports.deconstructPacket = function(packet){var buffers=[];var packetData=packet.data;function _deconstructPacket(data){if(!data)return data;if(isBuf(data)){var placeholder={_placeholder:true,num:buffers.length};buffers.push(data);return placeholder;}else if(isArray(data)){var newData=new Array(data.length);for(var i=0;i < data.length;i++) {newData[i] = _deconstructPacket(data[i]);}return newData;}else if('object' == typeof data && !(data instanceof Date)){var newData={};for(var key in data) {newData[key] = _deconstructPacket(data[key]);}return newData;}return data;}var pack=packet;pack.data = _deconstructPacket(packetData);pack.attachments = buffers.length; // number of binary 'attachments'
return {packet:pack,buffers:buffers};}; /**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */exports.reconstructPacket = function(packet,buffers){var curPlaceHolder=0;function _reconstructPacket(data){if(data && data._placeholder){var buf=buffers[data.num]; // appropriate buffer (should be natural order anyway)
return buf;}else if(isArray(data)){for(var i=0;i < data.length;i++) {data[i] = _reconstructPacket(data[i]);}return data;}else if(data && 'object' == typeof data){for(var key in data) {data[key] = _reconstructPacket(data[key]);}return data;}return data;}packet.data = _reconstructPacket(packet.data);packet.attachments = undefined; // no longer useful
return packet;}; /**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */exports.removeBlobs = function(data,callback){function _removeBlobs(obj,curKey,containingObject){if(!obj)return obj; // convert any blob
if(global.Blob && obj instanceof Blob || global.File && obj instanceof File){pendingBlobs++; // async filereader
var fileReader=new FileReader();fileReader.onload = function(){ // this.result == arraybuffer
if(containingObject){containingObject[curKey] = this.result;}else {bloblessData = this.result;} // if nothing pending its callback time
if(! --pendingBlobs){callback(bloblessData);}};fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
}else if(isArray(obj)){ // handle array
for(var i=0;i < obj.length;i++) {_removeBlobs(obj[i],i,obj);}}else if(obj && 'object' == typeof obj && !isBuf(obj)){ // and object
for(var key in obj) {_removeBlobs(obj[key],key,obj);}}}var pendingBlobs=0;var bloblessData=data;_removeBlobs(bloblessData);if(!pendingBlobs){callback(bloblessData);}};}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{"./is-buffer":48,"isarray":43}],47:[function(_dereq_,module,exports){ /**
 * Module dependencies.
 */var debug=_dereq_('debug')('socket.io-parser');var json=_dereq_('json3');var isArray=_dereq_('isarray');var Emitter=_dereq_('component-emitter');var binary=_dereq_('./binary');var isBuf=_dereq_('./is-buffer'); /**
 * Protocol version.
 *
 * @api public
 */exports.protocol = 4; /**
 * Packet types.
 *
 * @api public
 */exports.types = ['CONNECT','DISCONNECT','EVENT','BINARY_EVENT','ACK','BINARY_ACK','ERROR']; /**
 * Packet type `connect`.
 *
 * @api public
 */exports.CONNECT = 0; /**
 * Packet type `disconnect`.
 *
 * @api public
 */exports.DISCONNECT = 1; /**
 * Packet type `event`.
 *
 * @api public
 */exports.EVENT = 2; /**
 * Packet type `ack`.
 *
 * @api public
 */exports.ACK = 3; /**
 * Packet type `error`.
 *
 * @api public
 */exports.ERROR = 4; /**
 * Packet type 'binary event'
 *
 * @api public
 */exports.BINARY_EVENT = 5; /**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */exports.BINARY_ACK = 6; /**
 * Encoder constructor.
 *
 * @api public
 */exports.Encoder = Encoder; /**
 * Decoder constructor.
 *
 * @api public
 */exports.Decoder = Decoder; /**
 * A socket.io Encoder instance
 *
 * @api public
 */function Encoder(){} /**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */Encoder.prototype.encode = function(obj,callback){debug('encoding packet %j',obj);if(exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type){encodeAsBinary(obj,callback);}else {var encoding=encodeAsString(obj);callback([encoding]);}}; /**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */function encodeAsString(obj){var str='';var nsp=false; // first is type
str += obj.type; // attachments if we have them
if(exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type){str += obj.attachments;str += '-';} // if we have a namespace other than `/`
// we append it followed by a comma `,`
if(obj.nsp && '/' != obj.nsp){nsp = true;str += obj.nsp;} // immediately followed by the id
if(null != obj.id){if(nsp){str += ',';nsp = false;}str += obj.id;} // json data
if(null != obj.data){if(nsp)str += ',';str += json.stringify(obj.data);}debug('encoded %j as %s',obj,str);return str;} /**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */function encodeAsBinary(obj,callback){function writeEncoding(bloblessData){var deconstruction=binary.deconstructPacket(bloblessData);var pack=encodeAsString(deconstruction.packet);var buffers=deconstruction.buffers;buffers.unshift(pack); // add packet info to beginning of data list
callback(buffers); // write all the buffers
}binary.removeBlobs(obj,writeEncoding);} /**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */function Decoder(){this.reconstructor = null;} /**
 * Mix in `Emitter` with Decoder.
 */Emitter(Decoder.prototype); /**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */Decoder.prototype.add = function(obj){var packet;if('string' == typeof obj){packet = decodeString(obj);if(exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type){ // binary packet's json
this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow
if(this.reconstructor.reconPack.attachments === 0){this.emit('decoded',packet);}}else { // non-binary full packet
this.emit('decoded',packet);}}else if(isBuf(obj) || obj.base64){ // raw binary data
if(!this.reconstructor){throw new Error('got binary data when not reconstructing a packet');}else {packet = this.reconstructor.takeBinaryData(obj);if(packet){ // received final buffer
this.reconstructor = null;this.emit('decoded',packet);}}}else {throw new Error('Unknown type: ' + obj);}}; /**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */function decodeString(str){var p={};var i=0; // look up type
p.type = Number(str.charAt(0));if(null == exports.types[p.type])return error(); // look up attachments if type binary
if(exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type){var buf='';while(str.charAt(++i) != '-') {buf += str.charAt(i);if(i == str.length)break;}if(buf != Number(buf) || str.charAt(i) != '-'){throw new Error('Illegal attachments');}p.attachments = Number(buf);} // look up namespace (if any)
if('/' == str.charAt(i + 1)){p.nsp = '';while(++i) {var c=str.charAt(i);if(',' == c)break;p.nsp += c;if(i == str.length)break;}}else {p.nsp = '/';} // look up id
var next=str.charAt(i + 1);if('' !== next && Number(next) == next){p.id = '';while(++i) {var c=str.charAt(i);if(null == c || Number(c) != c){--i;break;}p.id += str.charAt(i);if(i == str.length)break;}p.id = Number(p.id);} // look up json data
if(str.charAt(++i)){try{p.data = json.parse(str.substr(i));}catch(e) {return error();}}debug('decoded %s as %j',str,p);return p;} /**
 * Deallocates a parser's resources
 *
 * @api public
 */Decoder.prototype.destroy = function(){if(this.reconstructor){this.reconstructor.finishedReconstruction();}}; /**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */function BinaryReconstructor(packet){this.reconPack = packet;this.buffers = [];} /**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */BinaryReconstructor.prototype.takeBinaryData = function(binData){this.buffers.push(binData);if(this.buffers.length == this.reconPack.attachments){ // done with buffer list
var packet=binary.reconstructPacket(this.reconPack,this.buffers);this.finishedReconstruction();return packet;}return null;}; /**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */BinaryReconstructor.prototype.finishedReconstruction = function(){this.reconPack = null;this.buffers = [];};function error(data){return {type:exports.ERROR,data:'parser error'};}},{"./binary":46,"./is-buffer":48,"component-emitter":49,"debug":39,"isarray":43,"json3":50}],48:[function(_dereq_,module,exports){(function(global){module.exports = isBuf; /**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */function isBuf(obj){return global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer;}}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{}],49:[function(_dereq_,module,exports){arguments[4][15][0].apply(exports,arguments);},{"dup":15}],50:[function(_dereq_,module,exports){(function(global){ /*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */;(function(){ // Detect the `define` function exposed by asynchronous module loaders. The
// strict `define` check is necessary for compatibility with `r.js`.
var isLoader=typeof define === "function" && define.amd; // A set of types used to distinguish objects from primitives.
var objectTypes={"function":true,"object":true}; // Detect the `exports` object exposed by CommonJS implementations.
var freeExports=objectTypes[typeof exports] && exports && !exports.nodeType && exports; // Use the `global` object exposed by Node (including Browserify via
// `insert-module-globals`), Narwhal, and Ringo as the default context,
// and the `window` object in browsers. Rhino exports a `global` function
// instead.
var root=objectTypes[typeof window] && window || this,freeGlobal=freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;if(freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)){root = freeGlobal;} // Public: Initializes JSON 3 using the given `context` object, attaching the
// `stringify` and `parse` functions to the specified `exports` object.
function runInContext(context,exports){context || (context = root["Object"]());exports || (exports = root["Object"]()); // Native constructor aliases.
var Number=context["Number"] || root["Number"],String=context["String"] || root["String"],Object=context["Object"] || root["Object"],Date=context["Date"] || root["Date"],SyntaxError=context["SyntaxError"] || root["SyntaxError"],TypeError=context["TypeError"] || root["TypeError"],Math=context["Math"] || root["Math"],nativeJSON=context["JSON"] || root["JSON"]; // Delegate to the native `stringify` and `parse` implementations.
if(typeof nativeJSON == "object" && nativeJSON){exports.stringify = nativeJSON.stringify;exports.parse = nativeJSON.parse;} // Convenience aliases.
var objectProto=Object.prototype,getClass=objectProto.toString,isProperty,forEach,undef; // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
var isExtended=new Date(-3509827334573292);try{ // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
// results for certain dates in Opera >= 10.53.
isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&  // Safari < 2.0.2 stores the internal millisecond time value correctly,
// but clips the values returned by the date methods to the range of
// signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;}catch(exception) {} // Internal: Determines whether the native `JSON.stringify` and `parse`
// implementations are spec-compliant. Based on work by Ken Snyder.
function has(name){if(has[name] !== undef){ // Return cached feature test result.
return has[name];}var isSupported;if(name == "bug-string-char-index"){ // IE <= 7 doesn't support accessing string characters using square
// bracket notation. IE 8 only supports this for primitives.
isSupported = "a"[0] != "a";}else if(name == "json"){ // Indicates whether both `JSON.stringify` and `JSON.parse` are
// supported.
isSupported = has("json-stringify") && has("json-parse");}else {var value,serialized="{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}"; // Test `JSON.stringify`.
if(name == "json-stringify"){var stringify=exports.stringify,stringifySupported=typeof stringify == "function" && isExtended;if(stringifySupported){ // A test function object with a custom `toJSON` method.
(value = function(){return 1;}).toJSON = value;try{stringifySupported =  // Firefox 3.1b1 and b2 serialize string, number, and boolean
// primitives as object literals.
stringify(0) === "0" &&  // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
// literals.
stringify(new Number()) === "0" && stringify(new String()) == '""' &&  // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
// does not define a canonical JSON representation (this applies to
// objects with `toJSON` properties as well, *unless* they are nested
// within an object or array).
stringify(getClass) === undef &&  // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
// FF 3.1b3 pass this test.
stringify(undef) === undef &&  // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
// respectively, if the value is omitted entirely.
stringify() === undef &&  // FF 3.1b1, 2 throw an error if the given value is not a number,
// string, array, object, Boolean, or `null` literal. This applies to
// objects with custom `toJSON` methods as well, unless they are nested
// inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
// methods entirely.
stringify(value) === "1" && stringify([value]) == "[1]" &&  // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
// `"[null]"`.
stringify([undef]) == "[null]" &&  // YUI 3.0.0b1 fails to serialize `null` literals.
stringify(null) == "null" &&  // FF 3.1b1, 2 halts serialization if an array contains a function:
// `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
// elides non-JSON values from objects and arrays, unless they
// define custom `toJSON` methods.
stringify([undef,getClass,null]) == "[null,null,null]" &&  // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
// where character escape codes are expected (e.g., `\b` => `\u0008`).
stringify({"a":[value,true,false,null,"\x00\b\n\f\r\t"]}) == serialized &&  // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
stringify(null,value) === "1" && stringify([1,2],null,1) == "[\n 1,\n 2\n]" &&  // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
// serialize extended years.
stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&  // The milliseconds are optional in ES 5, but required in 5.1.
stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&  // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
// four-digit years instead of six-digit years. Credits: @Yaffle.
stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&  // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
// values less than 1000. Credits: @Yaffle.
stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';}catch(exception) {stringifySupported = false;}}isSupported = stringifySupported;} // Test `JSON.parse`.
if(name == "json-parse"){var parse=exports.parse;if(typeof parse == "function"){try{ // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
// Conforming implementations should also coerce the initial argument to
// a string prior to parsing.
if(parse("0") === 0 && !parse(false)){ // Simple parsing test.
value = parse(serialized);var parseSupported=value["a"].length == 5 && value["a"][0] === 1;if(parseSupported){try{ // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
parseSupported = !parse('"\t"');}catch(exception) {}if(parseSupported){try{ // FF 4.0 and 4.0.1 allow leading `+` signs and leading
// decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
// certain octal literals.
parseSupported = parse("01") !== 1;}catch(exception) {}}if(parseSupported){try{ // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
// points. These environments, along with FF 3.1b1 and 2,
// also allow trailing commas in JSON objects and arrays.
parseSupported = parse("1.") !== 1;}catch(exception) {}}}}}catch(exception) {parseSupported = false;}}isSupported = parseSupported;}}return has[name] = !!isSupported;}if(!has("json")){ // Common `[[Class]]` name aliases.
var functionClass="[object Function]",dateClass="[object Date]",numberClass="[object Number]",stringClass="[object String]",arrayClass="[object Array]",booleanClass="[object Boolean]"; // Detect incomplete support for accessing string characters by index.
var charIndexBuggy=has("bug-string-char-index"); // Define additional utility methods if the `Date` methods are buggy.
if(!isExtended){var floor=Math.floor; // A mapping between the months of the year and the number of days between
// January 1st and the first of the respective month.
var Months=[0,31,59,90,120,151,181,212,243,273,304,334]; // Internal: Calculates the number of days between the Unix epoch and the
// first day of the given month.
var getDay=function getDay(year,month){return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);};} // Internal: Determines if a property is a direct property of the given
// object. Delegates to the native `Object#hasOwnProperty` method.
if(!(isProperty = objectProto.hasOwnProperty)){isProperty = function(property){var members={},constructor;if((members.__proto__ = null,members.__proto__ = { // The *proto* property cannot be set multiple times in recent
// versions of Firefox and SeaMonkey.
"toString":1},members).toString != getClass){ // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
// supports the mutable *proto* property.
isProperty = function(property){ // Capture and break the object's prototype chain (see section 8.6.2
// of the ES 5.1 spec). The parenthesized expression prevents an
// unsafe transformation by the Closure Compiler.
var original=this.__proto__,result=(property in (this.__proto__ = null,this)); // Restore the original prototype chain.
this.__proto__ = original;return result;};}else { // Capture a reference to the top-level `Object` constructor.
constructor = members.constructor; // Use the `constructor` property to simulate `Object#hasOwnProperty` in
// other environments.
isProperty = function(property){var parent=(this.constructor || constructor).prototype;return property in this && !(property in parent && this[property] === parent[property]);};}members = null;return isProperty.call(this,property);};} // Internal: Normalizes the `for...in` iteration algorithm across
// environments. Each enumerated key is yielded to a `callback` function.
forEach = function(object,callback){var size=0,Properties,members,property; // Tests for bugs in the current environment's `for...in` algorithm. The
// `valueOf` property inherits the non-enumerable flag from
// `Object.prototype` in older versions of IE, Netscape, and Mozilla.
(Properties = function(){this.valueOf = 0;}).prototype.valueOf = 0; // Iterate over a new instance of the `Properties` class.
members = new Properties();for(property in members) { // Ignore all properties inherited from `Object.prototype`.
if(isProperty.call(members,property)){size++;}}Properties = members = null; // Normalize the iteration algorithm.
if(!size){ // A list of non-enumerable properties inherited from `Object.prototype`.
members = ["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"]; // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
// properties.
forEach = function(object,callback){var isFunction=getClass.call(object) == functionClass,property,length;var hasProperty=!isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;for(property in object) { // Gecko <= 1.0 enumerates the `prototype` property of functions under
// certain conditions; IE does not.
if(!(isFunction && property == "prototype") && hasProperty.call(object,property)){callback(property);}} // Manually invoke the callback for each non-enumerable property.
for(length = members.length;property = members[--length];hasProperty.call(object,property) && callback(property));};}else if(size == 2){ // Safari <= 2.0.4 enumerates shadowed properties twice.
forEach = function(object,callback){ // Create a set of iterated properties.
var members={},isFunction=getClass.call(object) == functionClass,property;for(property in object) { // Store each property name to prevent double enumeration. The
// `prototype` property of functions is not enumerated due to cross-
// environment inconsistencies.
if(!(isFunction && property == "prototype") && !isProperty.call(members,property) && (members[property] = 1) && isProperty.call(object,property)){callback(property);}}};}else { // No bugs detected; use the standard `for...in` algorithm.
forEach = function(object,callback){var isFunction=getClass.call(object) == functionClass,property,isConstructor;for(property in object) {if(!(isFunction && property == "prototype") && isProperty.call(object,property) && !(isConstructor = property === "constructor")){callback(property);}} // Manually invoke the callback for the `constructor` property due to
// cross-environment inconsistencies.
if(isConstructor || isProperty.call(object,property = "constructor")){callback(property);}};}return forEach(object,callback);}; // Public: Serializes a JavaScript `value` as a JSON string. The optional
// `filter` argument may specify either a function that alters how object and
// array members are serialized, or an array of strings and numbers that
// indicates which properties should be serialized. The optional `width`
// argument may be either a string or number that specifies the indentation
// level of the output.
if(!has("json-stringify")){ // Internal: A map of control characters and their escaped equivalents.
var Escapes={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"}; // Internal: Converts `value` into a zero-padded string such that its
// length is at least equal to `width`. The `width` must be <= 6.
var leadingZeroes="000000";var toPaddedString=function toPaddedString(width,value){ // The `|| 0` expression is necessary to work around a bug in
// Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
return (leadingZeroes + (value || 0)).slice(-width);}; // Internal: Double-quotes a string `value`, replacing all ASCII control
// characters (characters with code unit values between 0 and 31) with
// their escaped equivalents. This is an implementation of the
// `Quote(value)` operation defined in ES 5.1 section 15.12.3.
var unicodePrefix="\\u00";var quote=function quote(value){var result='"',index=0,length=value.length,useCharIndex=!charIndexBuggy || length > 10;var symbols=useCharIndex && (charIndexBuggy?value.split(""):value);for(;index < length;index++) {var charCode=value.charCodeAt(index); // If the character is a control character, append its Unicode or
// shorthand escape sequence; otherwise, append the character as-is.
switch(charCode){case 8:case 9:case 10:case 12:case 13:case 34:case 92:result += Escapes[charCode];break;default:if(charCode < 32){result += unicodePrefix + toPaddedString(2,charCode.toString(16));break;}result += useCharIndex?symbols[index]:value.charAt(index);}}return result + '"';}; // Internal: Recursively serializes an object. Implements the
// `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
var serialize=function serialize(property,object,callback,properties,whitespace,indentation,stack){var value,className,year,month,date,time,hours,minutes,seconds,milliseconds,results,element,index,length,prefix,result;try{ // Necessary for host object support.
value = object[property];}catch(exception) {}if(typeof value == "object" && value){className = getClass.call(value);if(className == dateClass && !isProperty.call(value,"toJSON")){if(value > -1 / 0 && value < 1 / 0){ // Dates are serialized according to the `Date#toJSON` method
// specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
// for the ISO 8601 date time string format.
if(getDay){ // Manually compute the year, month, date, hours, minutes,
// seconds, and milliseconds if the `getUTC*` methods are
// buggy. Adapted from @Yaffle's `date-shim` project.
date = floor(value / 864e5);for(year = floor(date / 365.2425) + 1970 - 1;getDay(year + 1,0) <= date;year++);for(month = floor((date - getDay(year,0)) / 30.42);getDay(year,month + 1) <= date;month++);date = 1 + date - getDay(year,month); // The `time` value specifies the time within the day (see ES
// 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
// to compute `A modulo B`, as the `%` operator does not
// correspond to the `modulo` operation for negative numbers.
time = (value % 864e5 + 864e5) % 864e5; // The hours, minutes, seconds, and milliseconds are obtained by
// decomposing the time within the day. See section 15.9.1.10.
hours = floor(time / 36e5) % 24;minutes = floor(time / 6e4) % 60;seconds = floor(time / 1e3) % 60;milliseconds = time % 1e3;}else {year = value.getUTCFullYear();month = value.getUTCMonth();date = value.getUTCDate();hours = value.getUTCHours();minutes = value.getUTCMinutes();seconds = value.getUTCSeconds();milliseconds = value.getUTCMilliseconds();} // Serialize extended years correctly.
value = (year <= 0 || year >= 1e4?(year < 0?"-":"+") + toPaddedString(6,year < 0?-year:year):toPaddedString(4,year)) + "-" + toPaddedString(2,month + 1) + "-" + toPaddedString(2,date) +  // Months, dates, hours, minutes, and seconds should have two
// digits; milliseconds should have three.
"T" + toPaddedString(2,hours) + ":" + toPaddedString(2,minutes) + ":" + toPaddedString(2,seconds) +  // Milliseconds are optional in ES 5.0, but required in 5.1.
"." + toPaddedString(3,milliseconds) + "Z";}else {value = null;}}else if(typeof value.toJSON == "function" && (className != numberClass && className != stringClass && className != arrayClass || isProperty.call(value,"toJSON"))){ // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
// `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
// ignores all `toJSON` methods on these objects unless they are
// defined directly on an instance.
value = value.toJSON(property);}}if(callback){ // If a replacement function was provided, call it to obtain the value
// for serialization.
value = callback.call(object,property,value);}if(value === null){return "null";}className = getClass.call(value);if(className == booleanClass){ // Booleans are represented literally.
return "" + value;}else if(className == numberClass){ // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
// `"null"`.
return value > -1 / 0 && value < 1 / 0?"" + value:"null";}else if(className == stringClass){ // Strings are double-quoted and escaped.
return quote("" + value);} // Recursively serialize objects and arrays.
if(typeof value == "object"){ // Check for cyclic structures. This is a linear search; performance
// is inversely proportional to the number of unique nested objects.
for(length = stack.length;length--;) {if(stack[length] === value){ // Cyclic structures cannot be serialized by `JSON.stringify`.
throw TypeError();}} // Add the object to the stack of traversed objects.
stack.push(value);results = []; // Save the current indentation level and indent one additional level.
prefix = indentation;indentation += whitespace;if(className == arrayClass){ // Recursively serialize array elements.
for(index = 0,length = value.length;index < length;index++) {element = serialize(index,value,callback,properties,whitespace,indentation,stack);results.push(element === undef?"null":element);}result = results.length?whitespace?"[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]":"[" + results.join(",") + "]":"[]";}else { // Recursively serialize object members. Members are selected from
// either a user-specified list of property names, or the object
// itself.
forEach(properties || value,function(property){var element=serialize(property,value,callback,properties,whitespace,indentation,stack);if(element !== undef){ // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
// is not the empty string, let `member` {quote(property) + ":"}
// be the concatenation of `member` and the `space` character."
// The "`space` character" refers to the literal space
// character, not the `space` {width} argument provided to
// `JSON.stringify`.
results.push(quote(property) + ":" + (whitespace?" ":"") + element);}});result = results.length?whitespace?"{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}":"{" + results.join(",") + "}":"{}";} // Remove the object from the traversed object stack.
stack.pop();return result;}}; // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
exports.stringify = function(source,filter,width){var whitespace,callback,properties,className;if(objectTypes[typeof filter] && filter){if((className = getClass.call(filter)) == functionClass){callback = filter;}else if(className == arrayClass){ // Convert the property names array into a makeshift set.
properties = {};for(var index=0,length=filter.length,value;index < length;value = filter[index++],(className = getClass.call(value),className == stringClass || className == numberClass) && (properties[value] = 1));}}if(width){if((className = getClass.call(width)) == numberClass){ // Convert the `width` to an integer and create a string containing
// `width` number of space characters.
if((width -= width % 1) > 0){for(whitespace = "",width > 10 && (width = 10);whitespace.length < width;whitespace += " ");}}else if(className == stringClass){whitespace = width.length <= 10?width:width.slice(0,10);}} // Opera <= 7.54u2 discards the values associated with empty string keys
// (`""`) only if they are used directly within an object member list
// (e.g., `!("" in { "": 1})`).
return serialize("",(value = {},value[""] = source,value),callback,properties,whitespace,"",[]);};} // Public: Parses a JSON source string.
if(!has("json-parse")){var fromCharCode=String.fromCharCode; // Internal: A map of escaped control characters and their unescaped
// equivalents.
var Unescapes={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"}; // Internal: Stores the parser state.
var Index,Source; // Internal: Resets the parser state and throws a `SyntaxError`.
var abort=function abort(){Index = Source = null;throw SyntaxError();}; // Internal: Returns the next token, or `"$"` if the parser has reached
// the end of the source string. A token may be a string, number, `null`
// literal, or Boolean literal.
var lex=function lex(){var source=Source,length=source.length,value,begin,position,isSigned,charCode;while(Index < length) {charCode = source.charCodeAt(Index);switch(charCode){case 9:case 10:case 13:case 32: // Skip whitespace tokens, including tabs, carriage returns, line
// feeds, and space characters.
Index++;break;case 123:case 125:case 91:case 93:case 58:case 44: // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
// the current position.
value = charIndexBuggy?source.charAt(Index):source[Index];Index++;return value;case 34: // `"` delimits a JSON string; advance to the next character and
// begin parsing the string. String tokens are prefixed with the
// sentinel `@` character to distinguish them from punctuators and
// end-of-string tokens.
for(value = "@",Index++;Index < length;) {charCode = source.charCodeAt(Index);if(charCode < 32){ // Unescaped ASCII control characters (those with a code unit
// less than the space character) are not permitted.
abort();}else if(charCode == 92){ // A reverse solidus (`\`) marks the beginning of an escaped
// control character (including `"`, `\`, and `/`) or Unicode
// escape sequence.
charCode = source.charCodeAt(++Index);switch(charCode){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114: // Revive escaped control characters.
value += Unescapes[charCode];Index++;break;case 117: // `\u` marks the beginning of a Unicode escape sequence.
// Advance to the first character and validate the
// four-digit code point.
begin = ++Index;for(position = Index + 4;Index < position;Index++) {charCode = source.charCodeAt(Index); // A valid sequence comprises four hexdigits (case-
// insensitive) that form a single hexadecimal value.
if(!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)){ // Invalid Unicode escape sequence.
abort();}} // Revive the escaped character.
value += fromCharCode("0x" + source.slice(begin,Index));break;default: // Invalid escape sequence.
abort();}}else {if(charCode == 34){ // An unescaped double-quote character marks the end of the
// string.
break;}charCode = source.charCodeAt(Index);begin = Index; // Optimize for the common case where a string is valid.
while(charCode >= 32 && charCode != 92 && charCode != 34) {charCode = source.charCodeAt(++Index);} // Append the string as-is.
value += source.slice(begin,Index);}}if(source.charCodeAt(Index) == 34){ // Advance to the next character and return the revived string.
Index++;return value;} // Unterminated string.
abort();default: // Parse numbers and literals.
begin = Index; // Advance past the negative sign, if one is specified.
if(charCode == 45){isSigned = true;charCode = source.charCodeAt(++Index);} // Parse an integer or floating-point value.
if(charCode >= 48 && charCode <= 57){ // Leading zeroes are interpreted as octal literals.
if(charCode == 48 && (charCode = source.charCodeAt(Index + 1),charCode >= 48 && charCode <= 57)){ // Illegal octal literal.
abort();}isSigned = false; // Parse the integer component.
for(;Index < length && (charCode = source.charCodeAt(Index),charCode >= 48 && charCode <= 57);Index++); // Floats cannot contain a leading decimal point; however, this
// case is already accounted for by the parser.
if(source.charCodeAt(Index) == 46){position = ++Index; // Parse the decimal component.
for(;position < length && (charCode = source.charCodeAt(position),charCode >= 48 && charCode <= 57);position++);if(position == Index){ // Illegal trailing decimal.
abort();}Index = position;} // Parse exponents. The `e` denoting the exponent is
// case-insensitive.
charCode = source.charCodeAt(Index);if(charCode == 101 || charCode == 69){charCode = source.charCodeAt(++Index); // Skip past the sign following the exponent, if one is
// specified.
if(charCode == 43 || charCode == 45){Index++;} // Parse the exponential component.
for(position = Index;position < length && (charCode = source.charCodeAt(position),charCode >= 48 && charCode <= 57);position++);if(position == Index){ // Illegal empty exponent.
abort();}Index = position;} // Coerce the parsed value to a JavaScript number.
return +source.slice(begin,Index);} // A negative sign may only precede numbers.
if(isSigned){abort();} // `true`, `false`, and `null` literals.
if(source.slice(Index,Index + 4) == "true"){Index += 4;return true;}else if(source.slice(Index,Index + 5) == "false"){Index += 5;return false;}else if(source.slice(Index,Index + 4) == "null"){Index += 4;return null;} // Unrecognized token.
abort();}} // Return the sentinel `$` character if the parser has reached the end
// of the source string.
return "$";}; // Internal: Parses a JSON `value` token.
var get=function get(value){var results,hasMembers;if(value == "$"){ // Unexpected end of input.
abort();}if(typeof value == "string"){if((charIndexBuggy?value.charAt(0):value[0]) == "@"){ // Remove the sentinel `@` character.
return value.slice(1);} // Parse object and array literals.
if(value == "["){ // Parses a JSON array, returning a new JavaScript array.
results = [];for(;;hasMembers || (hasMembers = true)) {value = lex(); // A closing square bracket marks the end of the array literal.
if(value == "]"){break;} // If the array literal contains elements, the current token
// should be a comma separating the previous element from the
// next.
if(hasMembers){if(value == ","){value = lex();if(value == "]"){ // Unexpected trailing `,` in array literal.
abort();}}else { // A `,` must separate each array element.
abort();}} // Elisions and leading commas are not permitted.
if(value == ","){abort();}results.push(get(value));}return results;}else if(value == "{"){ // Parses a JSON object, returning a new JavaScript object.
results = {};for(;;hasMembers || (hasMembers = true)) {value = lex(); // A closing curly brace marks the end of the object literal.
if(value == "}"){break;} // If the object literal contains members, the current token
// should be a comma separator.
if(hasMembers){if(value == ","){value = lex();if(value == "}"){ // Unexpected trailing `,` in object literal.
abort();}}else { // A `,` must separate each object member.
abort();}} // Leading commas are not permitted, object property names must be
// double-quoted strings, and a `:` must separate each property
// name and value.
if(value == "," || typeof value != "string" || (charIndexBuggy?value.charAt(0):value[0]) != "@" || lex() != ":"){abort();}results[value.slice(1)] = get(lex());}return results;} // Unexpected token encountered.
abort();}return value;}; // Internal: Updates a traversed object member.
var update=function update(source,property,callback){var element=walk(source,property,callback);if(element === undef){delete source[property];}else {source[property] = element;}}; // Internal: Recursively traverses a parsed JSON object, invoking the
// `callback` function for each value. This is an implementation of the
// `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
var walk=function walk(source,property,callback){var value=source[property],length;if(typeof value == "object" && value){ // `forEach` can't be used to traverse an array in Opera <= 8.54
// because its `Object#hasOwnProperty` implementation returns `false`
// for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
if(getClass.call(value) == arrayClass){for(length = value.length;length--;) {update(value,length,callback);}}else {forEach(value,function(property){update(value,property,callback);});}}return callback.call(source,property,value);}; // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
exports.parse = function(source,callback){var result,value;Index = 0;Source = "" + source;result = get(lex()); // If a JSON string contains multiple tokens, it is invalid.
if(lex() != "$"){abort();} // Reset the parser state.
Index = Source = null;return callback && getClass.call(callback) == functionClass?walk((value = {},value[""] = result,value),"",callback):result;};}}exports["runInContext"] = runInContext;return exports;}if(freeExports && !isLoader){ // Export for CommonJS environments.
runInContext(root,freeExports);}else { // Export for web browsers and JavaScript engines.
var nativeJSON=root.JSON,previousJSON=root["JSON3"],isRestored=false;var JSON3=runInContext(root,root["JSON3"] = { // Public: Restores the original value of the global `JSON` object and
// returns a reference to the `JSON3` object.
"noConflict":function noConflict(){if(!isRestored){isRestored = true;root.JSON = nativeJSON;root["JSON3"] = previousJSON;nativeJSON = previousJSON = null;}return JSON3;}});root.JSON = {"parse":JSON3.parse,"stringify":JSON3.stringify};} // Export for asynchronous module loaders.
if(isLoader){define(function(){return JSON3;});}}).call(this);}).call(this,typeof self !== "undefined"?self:typeof window !== "undefined"?window:typeof global !== "undefined"?global:{});},{}],51:[function(_dereq_,module,exports){module.exports = toArray;function toArray(list,index){var array=[];index = index || 0;for(var i=index || 0;i < list.length;i++) {array[i - index] = list[i];}return array;}},{}]},{},[31])(31);});}

cc._RFpop();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},["GameListCell","Game","HelloWorld","GameData","AudioManager","GameList","socket.io","Card","UserIcon","Tools","SigleImgBtn","Login"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL1NjcmlwdC90b29sL0F1ZGlvTWFuYWdlci5qcyIsImFzc2V0cy9TY3JpcHQvR2FtZS9DYXJkLmpzIiwiYXNzZXRzL1NjcmlwdC9EYXRhL0dhbWVEYXRhLmpzIiwiYXNzZXRzL1NjcmlwdC9HYW1lTGlzdC9HYW1lTGlzdENlbGwuanMiLCJhc3NldHMvU2NyaXB0L0dhbWVMaXN0L0dhbWVMaXN0LmpzIiwiYXNzZXRzL1NjcmlwdC9HYW1lL0dhbWUuanMiLCJhc3NldHMvU2NyaXB0L0hlbGxvV29ybGQuanMiLCJhc3NldHMvU2NyaXB0L0xvZ2luL0xvZ2luLmpzIiwiYXNzZXRzL1NjcmlwdC9jb250cm9sL1NpZ2xlSW1nQnRuLmpzIiwiYXNzZXRzL1NjcmlwdC90b29sL1Rvb2xzLmpzIiwiYXNzZXRzL1NjcmlwdC9jb250cm9sL1VzZXJJY29uLmpzIiwiYXNzZXRzL1NjcmlwdC90b29sL3NvY2tldC5pby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc2M2YyZjF1ZkhOSUpKZW1lV1VVaGZtNScsICdBdWRpb01hbmFnZXInKTtcbi8vIFNjcmlwdC90b29sL0F1ZGlvTWFuYWdlci5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHdpbkF1ZGlvOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9zZUF1ZGlvOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2FyZEF1ZGlvOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG5cbiAgICAgICAgYnV0dG9uQXVkaW86IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcblxuICAgICAgICBjaGlwc0F1ZGlvOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG5cbiAgICAgICAgYmdtOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGxheU11c2ljOiBmdW5jdGlvbiBwbGF5TXVzaWMoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmJnbSwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIHBhdXNlTXVzaWM6IGZ1bmN0aW9uIHBhdXNlTXVzaWMoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlTXVzaWMoKTtcbiAgICB9LFxuXG4gICAgcmVzdW1lTXVzaWM6IGZ1bmN0aW9uIHJlc3VtZU11c2ljKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpO1xuICAgIH0sXG5cbiAgICBfcGxheVNGWDogZnVuY3Rpb24gX3BsYXlTRlgoY2xpcCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGNsaXAsIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgcGxheVdpbjogZnVuY3Rpb24gcGxheVdpbigpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLndpbkF1ZGlvKTtcbiAgICB9LFxuXG4gICAgcGxheUxvc2U6IGZ1bmN0aW9uIHBsYXlMb3NlKCkge1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMubG9zZUF1ZGlvKTtcbiAgICB9LFxuXG4gICAgcGxheUNhcmQ6IGZ1bmN0aW9uIHBsYXlDYXJkKCkge1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMuY2FyZEF1ZGlvKTtcbiAgICB9LFxuXG4gICAgcGxheUNoaXBzOiBmdW5jdGlvbiBwbGF5Q2hpcHMoKSB7XG4gICAgICAgIHRoaXMuX3BsYXlTRlgodGhpcy5jaGlwc0F1ZGlvKTtcbiAgICB9LFxuXG4gICAgcGxheUJ1dHRvbjogZnVuY3Rpb24gcGxheUJ1dHRvbigpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmJ1dHRvbkF1ZGlvKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzk4ZDQ4WjBxclZFdjZhYVJoNlFOTlphJywgJ0NhcmQnKTtcbi8vIFNjcmlwdC9HYW1lL0NhcmQuanNcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBDQVJEX1RZUEUgPSBjYy5FbnVtKHtcbiAgICBPV046IDEsXG4gICAgTEVGVDogMixcbiAgICBSSUdIVDogMyxcbiAgICBVUDogNFxufSk7XG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBDYXJkSWQ6IDEsXG4gICAgICAgIENhcmRUeXBlOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogQ0FSRF9UWVBFLk9XTixcbiAgICAgICAgICAgIHR5cGU6IENBUkRfVFlQRVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuQ2FyZFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQ0FSRF9UWVBFLk9XTjpcbiAgICAgICAgICAgICAgICAvLyB2YXIgaW1nID0gJ293bl9kb3duXycrdGhpcy5HYW1lSWQudG9TdHJpbmcoKSsnLnBuZyc7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW1nKTtcbiAgICAgICAgICAgICAgICAvLyB2YXIgZnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoY2MudXJsLnJhdyhpbWcpKTtcbiAgICAgICAgICAgICAgICAvLyB2YXIgY29tID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgICAgICAvLyBjb20uc3ByaXRlRnJhbWUgPSBmcmFtZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICB9XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMzU2MTEzNWlRRk9FSWZvTFRPOEc4NVAnLCAnR2FtZURhdGEnKTtcbi8vIFNjcmlwdC9EYXRhL0dhbWVEYXRhLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge31cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzExNzYxZlA5eTFEUnFrTVF5Qi9kUTFDJywgJ0dhbWVMaXN0Q2VsbCcpO1xuLy8gU2NyaXB0L0dhbWVMaXN0L0dhbWVMaXN0Q2VsbC5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgTWFpblNjcmlwdE5vZGU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgR2FtZUlkOiAwLFxuICAgICAgICBDb2luTnVtOiAwLFxuICAgICAgICBMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgU3ByaXRlTGlzdDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgLy8gdmFyIGltZyA9ICdSZXNvdXJjZS9VSS9yb29tQmcnK3RoaXMuR2FtZUlkLnRvU3RyaW5nKCkrJy5wbmcnO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbWcpO1xuICAgICAgICAvLyB2YXIgZnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoY2MudXJsLnJhdyhpbWcpKTtcblxuICAgICAgICB2YXIgY29tID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgLy9jb20uc3ByaXRlRnJhbWUgPSBmcmFtZTtcblxuICAgICAgICBjb20uc3ByaXRlRnJhbWUgPSB0aGlzLlNwcml0ZUxpc3RbdGhpcy5HYW1lSWRdO1xuXG4gICAgICAgIHRoaXMuTGFiZWwuc3RyaW5nID0gdGhpcy5Db2luTnVtLnRvU3RyaW5nKCk7XG4gICAgfSxcbiAgICBvbkNlbGxDbGlja2VkOiBmdW5jdGlvbiBvbkNlbGxDbGlja2VkKCkge1xuICAgICAgICB0aGlzLk1haW5TY3JpcHROb2RlLmdldENvbXBvbmVudCgnR2FtZUxpc3QnKS5vbkdhbWVTZWxlY3RlZCh0aGlzLkdhbWVJZCk7XG4gICAgfVxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzcyNzIzV3ZVaEZLOHJGN1AvSGVJTlFsJywgJ0dhbWVMaXN0Jyk7XG4vLyBTY3JpcHQvR2FtZUxpc3QvR2FtZUxpc3QuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBhdWRpb01hbmFnZXI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgTGlzdExheW91dDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGF5b3V0XG4gICAgICAgIH0sXG4gICAgICAgIENlbGxfcHJlZmFiOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZWxmOiBudWxsLFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuYXVkaW9NYW5hZ2VyID0gdGhpcy5hdWRpb01hbmFnZXIuZ2V0Q29tcG9uZW50KCdBdWRpb01hbmFnZXInKTtcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIucGxheU11c2ljKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICAgICAgICAgIHZhciBuZXdDZWxsID0gY2MuaW5zdGFudGlhdGUodGhpcy5DZWxsX3ByZWZhYik7XG5cbiAgICAgICAgICAgIG5ld0NlbGwuZ2V0Q29tcG9uZW50KCdHYW1lTGlzdENlbGwnKS5HYW1lSWQgPSBpO1xuICAgICAgICAgICAgbmV3Q2VsbC5nZXRDb21wb25lbnQoJ0dhbWVMaXN0Q2VsbCcpLkNvaW5OdW0gPSAxMDAgKiBpO1xuICAgICAgICAgICAgbmV3Q2VsbC5nZXRDb21wb25lbnQoJ0dhbWVMaXN0Q2VsbCcpLk1haW5TY3JpcHROb2RlID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5MaXN0TGF5b3V0Lm5vZGUuYWRkQ2hpbGQobmV3Q2VsbCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTGlzdExheW91dCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25HYW1lU2VsZWN0ZWQ6IGZ1bmN0aW9uIG9uR2FtZVNlbGVjdGVkKGdhbWVpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhnYW1laWQgKyAn6KKr6YCJ5oupJyk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZScpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzI3MGNmWkJjU0ZHdGJST3VYNHhaa3M3JywgJ0dhbWUnKTtcbi8vIFNjcmlwdC9HYW1lL0dhbWUuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1ZGlvTWFuYWdlcjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlciA9IHRoaXMuYXVkaW9NYW5hZ2VyLmdldENvbXBvbmVudCgnQXVkaW9NYW5hZ2VyJyk7XG4gICAgICAgIHRoaXMuYXVkaW9NYW5hZ2VyLnBsYXlNdXNpYygpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzI4MGMzcnNaSkpLblo5UnFiQUxWd3RLJywgJ0hlbGxvV29ybGQnKTtcbi8vIFNjcmlwdC9IZWxsb1dvcmxkLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciByb290ID0gdGhpcztcblxuICAgICAgICBpZiAoY2MuaXNOYXRpdmUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5pbyA9IFNvY2tldElPO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxdWlyZSgnc29ja2V0LmlvJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNvY2tldCA9IGlvKCd3czovL2xvY2FsaG9zdDozMDAwJyk7XG4gICAgICAgIHNvY2tldC5vbign5raI5oGvJywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc29ja2V0LmVtaXQoJ+eZu+W9lScsICdtZXNzYWdlJyk7XG4gICAgICAgIHNvY2tldC5lbWl0KCfmtojmga8nLCAnMTIzMTYxNjE2NTE2Jyk7XG5cbiAgICAgICAgLy9odHRwIGdldFxuXG4gICAgICAgIC8vIHZhciB4aHIgPSBjYy5sb2FkZXIuZ2V0WE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgLy8geGhyLm9wZW4oJ0dFVCcsJ2h0dHA6Ly9odHRwYmluLm9yZy9nZXQ/c2hvd19lbnY9MScsdHJ1ZSk7XG5cbiAgICAgICAgLy8geGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAvLyAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPD0gMjA3KSkge1xuICAgICAgICAvLyAgICAgICAgIHZhciBodHRwU3RhdHVzID0geGhyLnN0YXR1c1RleHQ7XG4gICAgICAgIC8vICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dC5zdWJzdHJpbmcoMCwgMTAwKSArIFwiLi4uXCI7XG4gICAgICAgIC8vICAgICAgICAgcm9vdC5sYWJlbC5zdHJpbmcgPSByZXNwb25zZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfTtcblxuICAgICAgICAvLyB4aHIuc2VuZCgpO1xuXG4gICAgICAgIC8vaHR0cCBwb3N0XG4gICAgICAgIC8vIHhoci5vcGVuKFwiUE9TVFwiLCBcImh0dHA6Ly9odHRwYmluLm9yZy9wb3N0XCIpO1xuICAgICAgICAvLyAvL3NldCBDb250ZW50LXR5cGUgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIiB0byBwb3N0IHBsYWluIHRleHRcbiAgICAgICAgLy8geGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIixcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTtcbiAgICAgICAgLy8geGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDw9IDIwNykpIHtcbiAgICAgICAgLy8gICAgICAgICB2YXIgaHR0cFN0YXR1cyA9IHhoci5zdGF0dXNUZXh0O1xuICAgICAgICAvLyAgICAgICAgIHZhciByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQuc3Vic3RyaW5nKDAsIDEwMCkgKyBcIi4uLlwiO1xuICAgICAgICAvLyAgICAgICAgIHJvb3QubGFiZWwuc3RyaW5nID0gcmVzcG9uc2U7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH07XG4gICAgICAgIC8vIHhoci5zZW5kKFwicGxhaW4gdGV4dCBtZXNzYWdlXCIpO1xuXG4gICAgICAgIC8vIHNvY2tldFxuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYmYyNjlTSE9kVkJ2THlhbXRIamVneGcnLCAnTG9naW4nKTtcbi8vIFNjcmlwdC9Mb2dpbi9Mb2dpbi5qc1xuXG5cbnZhciBVc2VyQWNjb3VudDtcbnZhciBVc2VyUGFzc3dvcmQ7XG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICByZWdpc3RlckxheWVyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYXVkaW9NYW5hZ2VyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIgPSB0aGlzLmF1ZGlvTWFuYWdlci5nZXRDb21wb25lbnQoJ0F1ZGlvTWFuYWdlcicpO1xuICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoKTtcbiAgICB9LFxuXG4gICAgb25Mb2dJbjogZnVuY3Rpb24gb25Mb2dJbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2dJblwiKTtcbiAgICB9LFxuXG4gICAgb25RdWlja0xvZ0luOiBmdW5jdGlvbiBvblF1aWNrTG9nSW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUVVpY2tsb2dJblwiKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdHYW1lTGlzdCcpO1xuICAgIH0sXG5cbiAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiBvblJlZ2lzdGVyKCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25SZWdpc3RlckNsb3NlOiBmdW5jdGlvbiBvblJlZ2lzdGVyQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJMYXllci5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgb25Vc2VyQWNjb3VudENoYW5nZWQ6IGZ1bmN0aW9uIG9uVXNlckFjY291bnRDaGFuZ2VkKHRleHQpIHtcbiAgICAgICAgVXNlckFjY291bnQgPSB0ZXh0O1xuICAgICAgICBjYy5sb2coXCJVc2VyQWNjb3VudDogXCIgKyBVc2VyQWNjb3VudCk7XG4gICAgfSxcbiAgICBvblVzZXJQYXNzd29yZENoYW5nZWQ6IGZ1bmN0aW9uIG9uVXNlclBhc3N3b3JkQ2hhbmdlZCh0ZXh0KSB7XG4gICAgICAgIFVzZXJQYXNzd29yZCA9IHRleHQ7XG4gICAgICAgIGNjLmxvZyhcIlVzZXJQYXNzd29yZDogXCIgKyBVc2VyUGFzc3dvcmQpO1xuICAgIH1cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2EzMTBiZUtrd1pBcGE1cktVTVREaVkvJywgJ1NpZ2xlSW1nQnRuJyk7XG4vLyBTY3JpcHQvY29udHJvbC9TaWdsZUltZ0J0bi5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5UT1VDSF9PTkVfQllfT05FLFxuICAgICAgICAgICAgc3dhbGxvd1RvdWNoZXM6IHRydWUsXG4gICAgICAgICAgICBvblRvdWNoQmVnYW46IGZ1bmN0aW9uIG9uVG91Y2hCZWdhbih0b3VjaCwgZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5zZXRTY2FsZSgyKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkYWZkXCIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Ub3VjaEVuZDogZnVuY3Rpb24gb25Ub3VjaEVuZCh0b3VjaCwgZXZlbnQpIHtcblxuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5zZXRTY2FsZSgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2VsZi5ub2RlKTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdhMGY3NnVNSGdoR3dyNi9WZm5Db3dXVycsICdUb29scycpO1xuLy8gU2NyaXB0L3Rvb2wvVG9vbHMuanNcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge30sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuICAgIEdldFJhbmRvbU51bTogZnVuY3Rpb24gR2V0UmFuZG9tTnVtKE1pbiwgTWF4KSB7XG4gICAgICAgIHZhciBSYW5nZSA9IE1heCAtIE1pbjtcbiAgICAgICAgdmFyIFJhbmQgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICByZXR1cm4gTWluICsgTWF0aC5yb3VuZChSYW5kICogUmFuZ2UpO1xuICAgIH1cbn0pO1xuXG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEdldFJhbmRvbU51bTogZnVuY3Rpb24gR2V0UmFuZG9tTnVtKE1pbiwgTWF4KSB7XG4gICAgICAgIHZhciBSYW5nZSA9IE1heCAtIE1pbjtcbiAgICAgICAgdmFyIFJhbmQgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICByZXR1cm4gTWluICsgTWF0aC5yb3VuZChSYW5kICogUmFuZ2UpO1xuICAgIH1cbn07XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc5YTA0OTZDZ3Y5QWlLcnVUNVliTG5KVicsICdVc2VySWNvbicpO1xuLy8gU2NyaXB0L2NvbnRyb2wvVXNlckljb24uanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBJY29uSW5kZXg6IDAsXG4gICAgICAgIFNwcml0ZUxpc3Q6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBjb20gPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBpZiAodGhpcy5JY29uSW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgIHZhciB0b29scyA9IHJlcXVpcmUoJ1Rvb2xzJyk7XG4gICAgICAgICAgICB0aGlzLkljb25JbmRleCA9IHRvb2xzLkdldFJhbmRvbU51bSgwLCB0aGlzLlNwcml0ZUxpc3QubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29tLnNwcml0ZUZyYW1lID0gdGhpcy5TcHJpdGVMaXN0W3RoaXMuSWNvbkluZGV4XTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc3YmM1MWE1RnpORW5KVlRZeUl2VDM4RCcsICdzb2NrZXQuaW8nKTtcbi8vIFNjcmlwdC90b29sL3NvY2tldC5pby5qc1xuXG5cInVzZSBzdHJpY3RcIjtpZighY2Muc3lzLmlzTmF0aXZlKXsoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHMgPSBmKCk7fWVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpe2RlZmluZShbXSxmKTt9ZWxzZSB7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIil7ZyA9IHdpbmRvdzt9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKXtnID0gZ2xvYmFsO31lbHNlIGlmKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtnID0gc2VsZjt9ZWxzZSB7ZyA9IHRoaXM7fWcuaW8gPSBmKCk7fX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlID09IFwiZnVuY3Rpb25cIiAmJiByZXF1aXJlO2lmKCF1ICYmIGEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbyArIFwiJ1wiKTt0aHJvdyAoZi5jb2RlID0gXCJNT0RVTEVfTk9UX0ZPVU5EXCIsZik7fXZhciBsPW5bb10gPSB7ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKTt9LGwsbC5leHBvcnRzLGUsdCxuLHIpO31yZXR1cm4gbltvXS5leHBvcnRzO312YXIgaT10eXBlb2YgcmVxdWlyZSA9PSBcImZ1bmN0aW9uXCIgJiYgcmVxdWlyZTtmb3IodmFyIG89MDtvIDwgci5sZW5ndGg7bysrKSBzKHJbb10pO3JldHVybiBzO30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXttb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oJy4vbGliLycpO30se1wiLi9saWIvXCI6Mn1dLDI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe21vZHVsZS5leHBvcnRzID0gX2RlcmVxXygnLi9zb2NrZXQnKTsgLyoqXG4gKiBFeHBvcnRzIHBhcnNlclxuICpcbiAqIEBhcGkgcHVibGljXG4gKlxuICovbW9kdWxlLmV4cG9ydHMucGFyc2VyID0gX2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpO30se1wiLi9zb2NrZXRcIjozLFwiZW5naW5lLmlvLXBhcnNlclwiOjE5fV0sMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL3ZhciB0cmFuc3BvcnRzPV9kZXJlcV8oJy4vdHJhbnNwb3J0cycpO3ZhciBFbWl0dGVyPV9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7dmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6c29ja2V0Jyk7dmFyIGluZGV4PV9kZXJlcV8oJ2luZGV4b2YnKTt2YXIgcGFyc2VyPV9kZXJlcV8oJ2VuZ2luZS5pby1wYXJzZXInKTt2YXIgcGFyc2V1cmk9X2RlcmVxXygncGFyc2V1cmknKTt2YXIgcGFyc2Vqc29uPV9kZXJlcV8oJ3BhcnNlanNvbicpO3ZhciBwYXJzZXFzPV9kZXJlcV8oJ3BhcnNlcXMnKTsgLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL21vZHVsZS5leHBvcnRzID0gU29ja2V0OyAvKipcbiAqIE5vb3AgZnVuY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9mdW5jdGlvbiBub29wKCl7fSAvKipcbiAqIFNvY2tldCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL2Z1bmN0aW9uIFNvY2tldCh1cmksb3B0cyl7aWYoISh0aGlzIGluc3RhbmNlb2YgU29ja2V0KSlyZXR1cm4gbmV3IFNvY2tldCh1cmksb3B0cyk7b3B0cyA9IG9wdHMgfHwge307aWYodXJpICYmICdvYmplY3QnID09IHR5cGVvZiB1cmkpe29wdHMgPSB1cmk7dXJpID0gbnVsbDt9aWYodXJpKXt1cmkgPSBwYXJzZXVyaSh1cmkpO29wdHMuaG9zdG5hbWUgPSB1cmkuaG9zdDtvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PSAnaHR0cHMnIHx8IHVyaS5wcm90b2NvbCA9PSAnd3NzJztvcHRzLnBvcnQgPSB1cmkucG9ydDtpZih1cmkucXVlcnkpb3B0cy5xdWVyeSA9IHVyaS5xdWVyeTt9ZWxzZSBpZihvcHRzLmhvc3Qpe29wdHMuaG9zdG5hbWUgPSBwYXJzZXVyaShvcHRzLmhvc3QpLmhvc3Q7fXRoaXMuc2VjdXJlID0gbnVsbCAhPSBvcHRzLnNlY3VyZT9vcHRzLnNlY3VyZTpnbG9iYWwubG9jYXRpb24gJiYgJ2h0dHBzOicgPT0gbG9jYXRpb24ucHJvdG9jb2w7aWYob3B0cy5ob3N0bmFtZSAmJiAhb3B0cy5wb3J0KXsgLy8gaWYgbm8gcG9ydCBpcyBzcGVjaWZpZWQgbWFudWFsbHksIHVzZSB0aGUgcHJvdG9jb2wgZGVmYXVsdFxub3B0cy5wb3J0ID0gdGhpcy5zZWN1cmU/JzQ0Myc6JzgwJzt9dGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7dGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWUgfHwgKGdsb2JhbC5sb2NhdGlvbj9sb2NhdGlvbi5ob3N0bmFtZTonbG9jYWxob3N0Jyk7dGhpcy5wb3J0ID0gb3B0cy5wb3J0IHx8IChnbG9iYWwubG9jYXRpb24gJiYgbG9jYXRpb24ucG9ydD9sb2NhdGlvbi5wb3J0OnRoaXMuc2VjdXJlPzQ0Mzo4MCk7dGhpcy5xdWVyeSA9IG9wdHMucXVlcnkgfHwge307aWYoJ3N0cmluZycgPT0gdHlwZW9mIHRoaXMucXVlcnkpdGhpcy5xdWVyeSA9IHBhcnNlcXMuZGVjb2RlKHRoaXMucXVlcnkpO3RoaXMudXBncmFkZSA9IGZhbHNlICE9PSBvcHRzLnVwZ3JhZGU7dGhpcy5wYXRoID0gKG9wdHMucGF0aCB8fCAnL2VuZ2luZS5pbycpLnJlcGxhY2UoL1xcLyQvLCcnKSArICcvJzt0aGlzLmZvcmNlSlNPTlAgPSAhIW9wdHMuZm9yY2VKU09OUDt0aGlzLmpzb25wID0gZmFsc2UgIT09IG9wdHMuanNvbnA7dGhpcy5mb3JjZUJhc2U2NCA9ICEhb3B0cy5mb3JjZUJhc2U2NDt0aGlzLmVuYWJsZXNYRFIgPSAhIW9wdHMuZW5hYmxlc1hEUjt0aGlzLnRpbWVzdGFtcFBhcmFtID0gb3B0cy50aW1lc3RhbXBQYXJhbSB8fCAndCc7dGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7dGhpcy50cmFuc3BvcnRzID0gb3B0cy50cmFuc3BvcnRzIHx8IFsncG9sbGluZycsJ3dlYnNvY2tldCddO3RoaXMucmVhZHlTdGF0ZSA9ICcnO3RoaXMud3JpdGVCdWZmZXIgPSBbXTt0aGlzLnBvbGljeVBvcnQgPSBvcHRzLnBvbGljeVBvcnQgfHwgODQzO3RoaXMucmVtZW1iZXJVcGdyYWRlID0gb3B0cy5yZW1lbWJlclVwZ3JhZGUgfHwgZmFsc2U7dGhpcy5iaW5hcnlUeXBlID0gbnVsbDt0aGlzLm9ubHlCaW5hcnlVcGdyYWRlcyA9IG9wdHMub25seUJpbmFyeVVwZ3JhZGVzO3RoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBmYWxzZSAhPT0gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZT9vcHRzLnBlck1lc3NhZ2VEZWZsYXRlIHx8IHt9OmZhbHNlO2lmKHRydWUgPT09IHRoaXMucGVyTWVzc2FnZURlZmxhdGUpdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSA9IHt9O2lmKHRoaXMucGVyTWVzc2FnZURlZmxhdGUgJiYgbnVsbCA9PSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCl7dGhpcy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQgPSAxMDI0O30gLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG50aGlzLnBmeCA9IG9wdHMucGZ4IHx8IG51bGw7dGhpcy5rZXkgPSBvcHRzLmtleSB8fCBudWxsO3RoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZSB8fCBudWxsO3RoaXMuY2VydCA9IG9wdHMuY2VydCB8fCBudWxsO3RoaXMuY2EgPSBvcHRzLmNhIHx8IG51bGw7dGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzIHx8IG51bGw7dGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9PT0gdW5kZWZpbmVkP251bGw6b3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7IC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG52YXIgZnJlZUdsb2JhbD10eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtpZihmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCl7aWYob3B0cy5leHRyYUhlYWRlcnMgJiYgT2JqZWN0LmtleXMob3B0cy5leHRyYUhlYWRlcnMpLmxlbmd0aCA+IDApe3RoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7fX10aGlzLm9wZW4oKTt9U29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlOyAvKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9FbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpOyAvKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1NvY2tldC5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDsgLy8gdGhpcyBpcyBhbiBpbnRcbi8qKlxuICogRXhwb3NlIGRlcHMgZm9yIGxlZ2FjeSBjb21wYXRpYmlsaXR5XG4gKiBhbmQgc3RhbmRhbG9uZSBicm93c2VyIGFjY2Vzcy5cbiAqL1NvY2tldC5Tb2NrZXQgPSBTb2NrZXQ7U29ja2V0LlRyYW5zcG9ydCA9IF9kZXJlcV8oJy4vdHJhbnNwb3J0Jyk7U29ja2V0LnRyYW5zcG9ydHMgPSBfZGVyZXFfKCcuL3RyYW5zcG9ydHMnKTtTb2NrZXQucGFyc2VyID0gX2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpOyAvKipcbiAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxuICogQHJldHVybiB7VHJhbnNwb3J0fVxuICogQGFwaSBwcml2YXRlXG4gKi9Tb2NrZXQucHJvdG90eXBlLmNyZWF0ZVRyYW5zcG9ydCA9IGZ1bmN0aW9uKG5hbWUpe2RlYnVnKCdjcmVhdGluZyB0cmFuc3BvcnQgXCIlc1wiJyxuYW1lKTt2YXIgcXVlcnk9Y2xvbmUodGhpcy5xdWVyeSk7IC8vIGFwcGVuZCBlbmdpbmUuaW8gcHJvdG9jb2wgaWRlbnRpZmllclxucXVlcnkuRUlPID0gcGFyc2VyLnByb3RvY29sOyAvLyB0cmFuc3BvcnQgbmFtZVxucXVlcnkudHJhbnNwb3J0ID0gbmFtZTsgLy8gc2Vzc2lvbiBpZCBpZiB3ZSBhbHJlYWR5IGhhdmUgb25lXG5pZih0aGlzLmlkKXF1ZXJ5LnNpZCA9IHRoaXMuaWQ7dmFyIHRyYW5zcG9ydD1uZXcgdHJhbnNwb3J0c1tuYW1lXSh7YWdlbnQ6dGhpcy5hZ2VudCxob3N0bmFtZTp0aGlzLmhvc3RuYW1lLHBvcnQ6dGhpcy5wb3J0LHNlY3VyZTp0aGlzLnNlY3VyZSxwYXRoOnRoaXMucGF0aCxxdWVyeTpxdWVyeSxmb3JjZUpTT05QOnRoaXMuZm9yY2VKU09OUCxqc29ucDp0aGlzLmpzb25wLGZvcmNlQmFzZTY0OnRoaXMuZm9yY2VCYXNlNjQsZW5hYmxlc1hEUjp0aGlzLmVuYWJsZXNYRFIsdGltZXN0YW1wUmVxdWVzdHM6dGhpcy50aW1lc3RhbXBSZXF1ZXN0cyx0aW1lc3RhbXBQYXJhbTp0aGlzLnRpbWVzdGFtcFBhcmFtLHBvbGljeVBvcnQ6dGhpcy5wb2xpY3lQb3J0LHNvY2tldDp0aGlzLHBmeDp0aGlzLnBmeCxrZXk6dGhpcy5rZXkscGFzc3BocmFzZTp0aGlzLnBhc3NwaHJhc2UsY2VydDp0aGlzLmNlcnQsY2E6dGhpcy5jYSxjaXBoZXJzOnRoaXMuY2lwaGVycyxyZWplY3RVbmF1dGhvcml6ZWQ6dGhpcy5yZWplY3RVbmF1dGhvcml6ZWQscGVyTWVzc2FnZURlZmxhdGU6dGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSxleHRyYUhlYWRlcnM6dGhpcy5leHRyYUhlYWRlcnN9KTtyZXR1cm4gdHJhbnNwb3J0O307ZnVuY3Rpb24gY2xvbmUob2JqKXt2YXIgbz17fTtmb3IodmFyIGkgaW4gb2JqKSB7aWYob2JqLmhhc093blByb3BlcnR5KGkpKXtvW2ldID0gb2JqW2ldO319cmV0dXJuIG87fSAvKipcbiAqIEluaXRpYWxpemVzIHRyYW5zcG9ydCB0byB1c2UgYW5kIHN0YXJ0cyBwcm9iZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1NvY2tldC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCl7dmFyIHRyYW5zcG9ydDtpZih0aGlzLnJlbWVtYmVyVXBncmFkZSAmJiBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzICYmIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKCd3ZWJzb2NrZXQnKSAhPSAtMSl7dHJhbnNwb3J0ID0gJ3dlYnNvY2tldCc7fWVsc2UgaWYoMCA9PT0gdGhpcy50cmFuc3BvcnRzLmxlbmd0aCl7IC8vIEVtaXQgZXJyb3Igb24gbmV4dCB0aWNrIHNvIGl0IGNhbiBiZSBsaXN0ZW5lZCB0b1xudmFyIHNlbGY9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7c2VsZi5lbWl0KCdlcnJvcicsJ05vIHRyYW5zcG9ydHMgYXZhaWxhYmxlJyk7fSwwKTtyZXR1cm47fWVsc2Uge3RyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTt9dGhpcy5yZWFkeVN0YXRlID0gJ29wZW5pbmcnOyAvLyBSZXRyeSB3aXRoIHRoZSBuZXh0IHRyYW5zcG9ydCBpZiB0aGUgdHJhbnNwb3J0IGlzIGRpc2FibGVkIChqc29ucDogZmFsc2UpXG50cnl7dHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTt9Y2F0Y2goZSkge3RoaXMudHJhbnNwb3J0cy5zaGlmdCgpO3RoaXMub3BlbigpO3JldHVybjt9dHJhbnNwb3J0Lm9wZW4oKTt0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO307IC8qKlxuICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQuIERpc2FibGVzIHRoZSBleGlzdGluZyBvbmUgKGlmIGFueSkuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9Tb2NrZXQucHJvdG90eXBlLnNldFRyYW5zcG9ydCA9IGZ1bmN0aW9uKHRyYW5zcG9ydCl7ZGVidWcoJ3NldHRpbmcgdHJhbnNwb3J0ICVzJyx0cmFuc3BvcnQubmFtZSk7dmFyIHNlbGY9dGhpcztpZih0aGlzLnRyYW5zcG9ydCl7ZGVidWcoJ2NsZWFyaW5nIGV4aXN0aW5nIHRyYW5zcG9ydCAlcycsdGhpcy50cmFuc3BvcnQubmFtZSk7dGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7fSAvLyBzZXQgdXAgdHJhbnNwb3J0XG50aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDsgLy8gc2V0IHVwIHRyYW5zcG9ydCBsaXN0ZW5lcnNcbnRyYW5zcG9ydC5vbignZHJhaW4nLGZ1bmN0aW9uKCl7c2VsZi5vbkRyYWluKCk7fSkub24oJ3BhY2tldCcsZnVuY3Rpb24ocGFja2V0KXtzZWxmLm9uUGFja2V0KHBhY2tldCk7fSkub24oJ2Vycm9yJyxmdW5jdGlvbihlKXtzZWxmLm9uRXJyb3IoZSk7fSkub24oJ2Nsb3NlJyxmdW5jdGlvbigpe3NlbGYub25DbG9zZSgndHJhbnNwb3J0IGNsb3NlJyk7fSk7fTsgLyoqXG4gKiBQcm9iZXMgYSB0cmFuc3BvcnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gKiBAYXBpIHByaXZhdGVcbiAqL1NvY2tldC5wcm90b3R5cGUucHJvYmUgPSBmdW5jdGlvbihuYW1lKXtkZWJ1ZygncHJvYmluZyB0cmFuc3BvcnQgXCIlc1wiJyxuYW1lKTt2YXIgdHJhbnNwb3J0PXRoaXMuY3JlYXRlVHJhbnNwb3J0KG5hbWUse3Byb2JlOjF9KSxmYWlsZWQ9ZmFsc2Usc2VsZj10aGlzO1NvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtmdW5jdGlvbiBvblRyYW5zcG9ydE9wZW4oKXtpZihzZWxmLm9ubHlCaW5hcnlVcGdyYWRlcyl7dmFyIHVwZ3JhZGVMb3Nlc0JpbmFyeT0hdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiBzZWxmLnRyYW5zcG9ydC5zdXBwb3J0c0JpbmFyeTtmYWlsZWQgPSBmYWlsZWQgfHwgdXBncmFkZUxvc2VzQmluYXJ5O31pZihmYWlsZWQpcmV0dXJuO2RlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIG9wZW5lZCcsbmFtZSk7dHJhbnNwb3J0LnNlbmQoW3t0eXBlOidwaW5nJyxkYXRhOidwcm9iZSd9XSk7dHJhbnNwb3J0Lm9uY2UoJ3BhY2tldCcsZnVuY3Rpb24obXNnKXtpZihmYWlsZWQpcmV0dXJuO2lmKCdwb25nJyA9PSBtc2cudHlwZSAmJiAncHJvYmUnID09IG1zZy5kYXRhKXtkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBwb25nJyxuYW1lKTtzZWxmLnVwZ3JhZGluZyA9IHRydWU7c2VsZi5lbWl0KCd1cGdyYWRpbmcnLHRyYW5zcG9ydCk7aWYoIXRyYW5zcG9ydClyZXR1cm47U29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09IHRyYW5zcG9ydC5uYW1lO2RlYnVnKCdwYXVzaW5nIGN1cnJlbnQgdHJhbnNwb3J0IFwiJXNcIicsc2VsZi50cmFuc3BvcnQubmFtZSk7c2VsZi50cmFuc3BvcnQucGF1c2UoZnVuY3Rpb24oKXtpZihmYWlsZWQpcmV0dXJuO2lmKCdjbG9zZWQnID09IHNlbGYucmVhZHlTdGF0ZSlyZXR1cm47ZGVidWcoJ2NoYW5naW5nIHRyYW5zcG9ydCBhbmQgc2VuZGluZyB1cGdyYWRlIHBhY2tldCcpO2NsZWFudXAoKTtzZWxmLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO3RyYW5zcG9ydC5zZW5kKFt7dHlwZTondXBncmFkZSd9XSk7c2VsZi5lbWl0KCd1cGdyYWRlJyx0cmFuc3BvcnQpO3RyYW5zcG9ydCA9IG51bGw7c2VsZi51cGdyYWRpbmcgPSBmYWxzZTtzZWxmLmZsdXNoKCk7fSk7fWVsc2Uge2RlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCcsbmFtZSk7dmFyIGVycj1uZXcgRXJyb3IoJ3Byb2JlIGVycm9yJyk7ZXJyLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO3NlbGYuZW1pdCgndXBncmFkZUVycm9yJyxlcnIpO319KTt9ZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0KCl7aWYoZmFpbGVkKXJldHVybjsgLy8gQW55IGNhbGxiYWNrIGNhbGxlZCBieSB0cmFuc3BvcnQgc2hvdWxkIGJlIGlnbm9yZWQgc2luY2Ugbm93XG5mYWlsZWQgPSB0cnVlO2NsZWFudXAoKTt0cmFuc3BvcnQuY2xvc2UoKTt0cmFuc3BvcnQgPSBudWxsO30gLy9IYW5kbGUgYW55IGVycm9yIHRoYXQgaGFwcGVucyB3aGlsZSBwcm9iaW5nXG5mdW5jdGlvbiBvbmVycm9yKGVycil7dmFyIGVycm9yPW5ldyBFcnJvcigncHJvYmUgZXJyb3I6ICcgKyBlcnIpO2Vycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO2ZyZWV6ZVRyYW5zcG9ydCgpO2RlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCBiZWNhdXNlIG9mIGVycm9yOiAlcycsbmFtZSxlcnIpO3NlbGYuZW1pdCgndXBncmFkZUVycm9yJyxlcnJvcik7fWZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UoKXtvbmVycm9yKFwidHJhbnNwb3J0IGNsb3NlZFwiKTt9IC8vV2hlbiB0aGUgc29ja2V0IGlzIGNsb3NlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG5mdW5jdGlvbiBvbmNsb3NlKCl7b25lcnJvcihcInNvY2tldCBjbG9zZWRcIik7fSAvL1doZW4gdGhlIHNvY2tldCBpcyB1cGdyYWRlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG5mdW5jdGlvbiBvbnVwZ3JhZGUodG8pe2lmKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9IHRyYW5zcG9ydC5uYW1lKXtkZWJ1ZygnXCIlc1wiIHdvcmtzIC0gYWJvcnRpbmcgXCIlc1wiJyx0by5uYW1lLHRyYW5zcG9ydC5uYW1lKTtmcmVlemVUcmFuc3BvcnQoKTt9fSAvL1JlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbmZ1bmN0aW9uIGNsZWFudXAoKXt0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ29wZW4nLG9uVHJhbnNwb3J0T3Blbik7dHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsb25lcnJvcik7dHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsb25UcmFuc3BvcnRDbG9zZSk7c2VsZi5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLG9uY2xvc2UpO3NlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGluZycsb251cGdyYWRlKTt9dHJhbnNwb3J0Lm9uY2UoJ29wZW4nLG9uVHJhbnNwb3J0T3Blbik7dHJhbnNwb3J0Lm9uY2UoJ2Vycm9yJyxvbmVycm9yKTt0cmFuc3BvcnQub25jZSgnY2xvc2UnLG9uVHJhbnNwb3J0Q2xvc2UpO3RoaXMub25jZSgnY2xvc2UnLG9uY2xvc2UpO3RoaXMub25jZSgndXBncmFkaW5nJyxvbnVwZ3JhZGUpO3RyYW5zcG9ydC5vcGVuKCk7fTsgLyoqXG4gKiBDYWxsZWQgd2hlbiBjb25uZWN0aW9uIGlzIGRlZW1lZCBvcGVuLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uKCl7ZGVidWcoJ3NvY2tldCBvcGVuJyk7dGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1NvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PSB0aGlzLnRyYW5zcG9ydC5uYW1lO3RoaXMuZW1pdCgnb3BlbicpO3RoaXMuZmx1c2goKTsgLy8gd2UgY2hlY2sgZm9yIGByZWFkeVN0YXRlYCBpbiBjYXNlIGFuIGBvcGVuYFxuLy8gbGlzdGVuZXIgYWxyZWFkeSBjbG9zZWQgdGhlIHNvY2tldFxuaWYoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLnVwZ3JhZGUgJiYgdGhpcy50cmFuc3BvcnQucGF1c2Upe2RlYnVnKCdzdGFydGluZyB1cGdyYWRlIHByb2JlcycpO2Zvcih2YXIgaT0wLGw9dGhpcy51cGdyYWRlcy5sZW5ndGg7aSA8IGw7aSsrKSB7dGhpcy5wcm9iZSh0aGlzLnVwZ3JhZGVzW2ldKTt9fX07IC8qKlxuICogSGFuZGxlcyBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1NvY2tldC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQpe2lmKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSl7ZGVidWcoJ3NvY2tldCByZWNlaXZlOiB0eXBlIFwiJXNcIiwgZGF0YSBcIiVzXCInLHBhY2tldC50eXBlLHBhY2tldC5kYXRhKTt0aGlzLmVtaXQoJ3BhY2tldCcscGFja2V0KTsgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xudGhpcy5lbWl0KCdoZWFydGJlYXQnKTtzd2l0Y2gocGFja2V0LnR5cGUpe2Nhc2UgJ29wZW4nOnRoaXMub25IYW5kc2hha2UocGFyc2Vqc29uKHBhY2tldC5kYXRhKSk7YnJlYWs7Y2FzZSAncG9uZyc6dGhpcy5zZXRQaW5nKCk7dGhpcy5lbWl0KCdwb25nJyk7YnJlYWs7Y2FzZSAnZXJyb3InOnZhciBlcnI9bmV3IEVycm9yKCdzZXJ2ZXIgZXJyb3InKTtlcnIuY29kZSA9IHBhY2tldC5kYXRhO3RoaXMub25FcnJvcihlcnIpO2JyZWFrO2Nhc2UgJ21lc3NhZ2UnOnRoaXMuZW1pdCgnZGF0YScscGFja2V0LmRhdGEpO3RoaXMuZW1pdCgnbWVzc2FnZScscGFja2V0LmRhdGEpO2JyZWFrO319ZWxzZSB7ZGVidWcoJ3BhY2tldCByZWNlaXZlZCB3aXRoIHNvY2tldCByZWFkeVN0YXRlIFwiJXNcIicsdGhpcy5yZWFkeVN0YXRlKTt9fTsgLyoqXG4gKiBDYWxsZWQgdXBvbiBoYW5kc2hha2UgY29tcGxldGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGFuZHNoYWtlIG9ialxuICogQGFwaSBwcml2YXRlXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uSGFuZHNoYWtlID0gZnVuY3Rpb24oZGF0YSl7dGhpcy5lbWl0KCdoYW5kc2hha2UnLGRhdGEpO3RoaXMuaWQgPSBkYXRhLnNpZDt0aGlzLnRyYW5zcG9ydC5xdWVyeS5zaWQgPSBkYXRhLnNpZDt0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTt0aGlzLnBpbmdJbnRlcnZhbCA9IGRhdGEucGluZ0ludGVydmFsO3RoaXMucGluZ1RpbWVvdXQgPSBkYXRhLnBpbmdUaW1lb3V0O3RoaXMub25PcGVuKCk7IC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbmlmKCdjbG9zZWQnID09IHRoaXMucmVhZHlTdGF0ZSlyZXR1cm47dGhpcy5zZXRQaW5nKCk7IC8vIFByb2xvbmcgbGl2ZW5lc3Mgb2Ygc29ja2V0IG9uIGhlYXJ0YmVhdFxudGhpcy5yZW1vdmVMaXN0ZW5lcignaGVhcnRiZWF0Jyx0aGlzLm9uSGVhcnRiZWF0KTt0aGlzLm9uKCdoZWFydGJlYXQnLHRoaXMub25IZWFydGJlYXQpO307IC8qKlxuICogUmVzZXRzIHBpbmcgdGltZW91dC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1NvY2tldC5wcm90b3R5cGUub25IZWFydGJlYXQgPSBmdW5jdGlvbih0aW1lb3V0KXtjbGVhclRpbWVvdXQodGhpcy5waW5nVGltZW91dFRpbWVyKTt2YXIgc2VsZj10aGlzO3NlbGYucGluZ1RpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZignY2xvc2VkJyA9PSBzZWxmLnJlYWR5U3RhdGUpcmV0dXJuO3NlbGYub25DbG9zZSgncGluZyB0aW1lb3V0Jyk7fSx0aW1lb3V0IHx8IHNlbGYucGluZ0ludGVydmFsICsgc2VsZi5waW5nVGltZW91dCk7fTsgLyoqXG4gKiBQaW5ncyBzZXJ2ZXIgZXZlcnkgYHRoaXMucGluZ0ludGVydmFsYCBhbmQgZXhwZWN0cyByZXNwb25zZVxuICogd2l0aGluIGB0aGlzLnBpbmdUaW1lb3V0YCBvciBjbG9zZXMgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1NvY2tldC5wcm90b3R5cGUuc2V0UGluZyA9IGZ1bmN0aW9uKCl7dmFyIHNlbGY9dGhpcztjbGVhclRpbWVvdXQoc2VsZi5waW5nSW50ZXJ2YWxUaW1lcik7c2VsZi5waW5nSW50ZXJ2YWxUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtkZWJ1Zygnd3JpdGluZyBwaW5nIHBhY2tldCAtIGV4cGVjdGluZyBwb25nIHdpdGhpbiAlc21zJyxzZWxmLnBpbmdUaW1lb3V0KTtzZWxmLnBpbmcoKTtzZWxmLm9uSGVhcnRiZWF0KHNlbGYucGluZ1RpbWVvdXQpO30sc2VsZi5waW5nSW50ZXJ2YWwpO307IC8qKlxuKiBTZW5kcyBhIHBpbmcgcGFja2V0LlxuKlxuKiBAYXBpIHByaXZhdGVcbiovU29ja2V0LnByb3RvdHlwZS5waW5nID0gZnVuY3Rpb24oKXt2YXIgc2VsZj10aGlzO3RoaXMuc2VuZFBhY2tldCgncGluZycsZnVuY3Rpb24oKXtzZWxmLmVtaXQoJ3BpbmcnKTt9KTt9OyAvKipcbiAqIENhbGxlZCBvbiBgZHJhaW5gIGV2ZW50XG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uRHJhaW4gPSBmdW5jdGlvbigpe3RoaXMud3JpdGVCdWZmZXIuc3BsaWNlKDAsdGhpcy5wcmV2QnVmZmVyTGVuKTsgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuLy8gZm9yIGV4YW1wbGUsIHdoZW4gdXBncmFkaW5nLCB1cGdyYWRlIHBhY2tldCBpcyBzZW50IG92ZXIsXG4vLyBhbmQgYSBub256ZXJvIHByZXZCdWZmZXJMZW4gY291bGQgY2F1c2UgcHJvYmxlbXMgb24gYGRyYWluYFxudGhpcy5wcmV2QnVmZmVyTGVuID0gMDtpZigwID09PSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCl7dGhpcy5lbWl0KCdkcmFpbicpO31lbHNlIHt0aGlzLmZsdXNoKCk7fX07IC8qKlxuICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1NvY2tldC5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbigpe2lmKCdjbG9zZWQnICE9IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLnRyYW5zcG9ydC53cml0YWJsZSAmJiAhdGhpcy51cGdyYWRpbmcgJiYgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpe2RlYnVnKCdmbHVzaGluZyAlZCBwYWNrZXRzIGluIHNvY2tldCcsdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpO3RoaXMudHJhbnNwb3J0LnNlbmQodGhpcy53cml0ZUJ1ZmZlcik7IC8vIGtlZXAgdHJhY2sgb2YgY3VycmVudCBsZW5ndGggb2Ygd3JpdGVCdWZmZXJcbi8vIHNwbGljZSB3cml0ZUJ1ZmZlciBhbmQgY2FsbGJhY2tCdWZmZXIgb24gYGRyYWluYFxudGhpcy5wcmV2QnVmZmVyTGVuID0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7dGhpcy5lbWl0KCdmbHVzaCcpO319OyAvKipcbiAqIFNlbmRzIGEgbWVzc2FnZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9Tb2NrZXQucHJvdG90eXBlLndyaXRlID0gU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24obXNnLG9wdGlvbnMsZm4pe3RoaXMuc2VuZFBhY2tldCgnbWVzc2FnZScsbXNnLG9wdGlvbnMsZm4pO3JldHVybiB0aGlzO307IC8qKlxuICogU2VuZHMgYSBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhY2tldCB0eXBlLlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICogQGFwaSBwcml2YXRlXG4gKi9Tb2NrZXQucHJvdG90eXBlLnNlbmRQYWNrZXQgPSBmdW5jdGlvbih0eXBlLGRhdGEsb3B0aW9ucyxmbil7aWYoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSl7Zm4gPSBkYXRhO2RhdGEgPSB1bmRlZmluZWQ7fWlmKCdmdW5jdGlvbicgPT0gdHlwZW9mIG9wdGlvbnMpe2ZuID0gb3B0aW9ucztvcHRpb25zID0gbnVsbDt9aWYoJ2Nsb3NpbmcnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2VkJyA9PSB0aGlzLnJlYWR5U3RhdGUpe3JldHVybjt9b3B0aW9ucyA9IG9wdGlvbnMgfHwge307b3B0aW9ucy5jb21wcmVzcyA9IGZhbHNlICE9PSBvcHRpb25zLmNvbXByZXNzO3ZhciBwYWNrZXQ9e3R5cGU6dHlwZSxkYXRhOmRhdGEsb3B0aW9uczpvcHRpb25zfTt0aGlzLmVtaXQoJ3BhY2tldENyZWF0ZScscGFja2V0KTt0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtpZihmbil0aGlzLm9uY2UoJ2ZsdXNoJyxmbik7dGhpcy5mbHVzaCgpO307IC8qKlxuICogQ2xvc2VzIHRoZSBjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCl7aWYoJ29wZW5pbmcnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKXt0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2luZyc7dmFyIHNlbGY9dGhpcztpZih0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCl7dGhpcy5vbmNlKCdkcmFpbicsZnVuY3Rpb24oKXtpZih0aGlzLnVwZ3JhZGluZyl7d2FpdEZvclVwZ3JhZGUoKTt9ZWxzZSB7Y2xvc2UoKTt9fSk7fWVsc2UgaWYodGhpcy51cGdyYWRpbmcpe3dhaXRGb3JVcGdyYWRlKCk7fWVsc2Uge2Nsb3NlKCk7fX1mdW5jdGlvbiBjbG9zZSgpe3NlbGYub25DbG9zZSgnZm9yY2VkIGNsb3NlJyk7ZGVidWcoJ3NvY2tldCBjbG9zaW5nIC0gdGVsbGluZyB0cmFuc3BvcnQgdG8gY2xvc2UnKTtzZWxmLnRyYW5zcG9ydC5jbG9zZSgpO31mdW5jdGlvbiBjbGVhbnVwQW5kQ2xvc2UoKXtzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlJyxjbGVhbnVwQW5kQ2xvc2UpO3NlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGVFcnJvcicsY2xlYW51cEFuZENsb3NlKTtjbG9zZSgpO31mdW5jdGlvbiB3YWl0Rm9yVXBncmFkZSgpeyAvLyB3YWl0IGZvciB1cGdyYWRlIHRvIGZpbmlzaCBzaW5jZSB3ZSBjYW4ndCBzZW5kIHBhY2tldHMgd2hpbGUgcGF1c2luZyBhIHRyYW5zcG9ydFxuc2VsZi5vbmNlKCd1cGdyYWRlJyxjbGVhbnVwQW5kQ2xvc2UpO3NlbGYub25jZSgndXBncmFkZUVycm9yJyxjbGVhbnVwQW5kQ2xvc2UpO31yZXR1cm4gdGhpczt9OyAvKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBlcnJvclxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovU29ja2V0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24oZXJyKXtkZWJ1Zygnc29ja2V0IGVycm9yICVqJyxlcnIpO1NvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTt0aGlzLmVtaXQoJ2Vycm9yJyxlcnIpO3RoaXMub25DbG9zZSgndHJhbnNwb3J0IGVycm9yJyxlcnIpO307IC8qKlxuICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovU29ja2V0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24ocmVhc29uLGRlc2Mpe2lmKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2luZycgPT0gdGhpcy5yZWFkeVN0YXRlKXtkZWJ1Zygnc29ja2V0IGNsb3NlIHdpdGggcmVhc29uOiBcIiVzXCInLHJlYXNvbik7dmFyIHNlbGY9dGhpczsgLy8gY2xlYXIgdGltZXJzXG5jbGVhclRpbWVvdXQodGhpcy5waW5nSW50ZXJ2YWxUaW1lcik7Y2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7IC8vIHN0b3AgZXZlbnQgZnJvbSBmaXJpbmcgYWdhaW4gZm9yIHRyYW5zcG9ydFxudGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCdjbG9zZScpOyAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxudGhpcy50cmFuc3BvcnQuY2xvc2UoKTsgLy8gaWdub3JlIGZ1cnRoZXIgdHJhbnNwb3J0IGNvbW11bmljYXRpb25cbnRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpOyAvLyBzZXQgcmVhZHkgc3RhdGVcbnRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnOyAvLyBjbGVhciBzZXNzaW9uIGlkXG50aGlzLmlkID0gbnVsbDsgLy8gZW1pdCBjbG9zZSBldmVudFxudGhpcy5lbWl0KCdjbG9zZScscmVhc29uLGRlc2MpOyAvLyBjbGVhbiBidWZmZXJzIGFmdGVyLCBzbyB1c2VycyBjYW4gc3RpbGxcbi8vIGdyYWIgdGhlIGJ1ZmZlcnMgb24gYGNsb3NlYCBldmVudFxuc2VsZi53cml0ZUJ1ZmZlciA9IFtdO3NlbGYucHJldkJ1ZmZlckxlbiA9IDA7fX07IC8qKlxuICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gc2VydmVyIHVwZ3JhZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqXG4gKi9Tb2NrZXQucHJvdG90eXBlLmZpbHRlclVwZ3JhZGVzID0gZnVuY3Rpb24odXBncmFkZXMpe3ZhciBmaWx0ZXJlZFVwZ3JhZGVzPVtdO2Zvcih2YXIgaT0wLGo9dXBncmFkZXMubGVuZ3RoO2kgPCBqO2krKykge2lmKH5pbmRleCh0aGlzLnRyYW5zcG9ydHMsdXBncmFkZXNbaV0pKWZpbHRlcmVkVXBncmFkZXMucHVzaCh1cGdyYWRlc1tpXSk7fXJldHVybiBmaWx0ZXJlZFVwZ3JhZGVzO307fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se1wiLi90cmFuc3BvcnRcIjo0LFwiLi90cmFuc3BvcnRzXCI6NSxcImNvbXBvbmVudC1lbWl0dGVyXCI6MTUsXCJkZWJ1Z1wiOjE3LFwiZW5naW5lLmlvLXBhcnNlclwiOjE5LFwiaW5kZXhvZlwiOjIzLFwicGFyc2Vqc29uXCI6MjYsXCJwYXJzZXFzXCI6MjcsXCJwYXJzZXVyaVwiOjI4fV0sNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL3ZhciBwYXJzZXI9X2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpO3ZhciBFbWl0dGVyPV9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7IC8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9tb2R1bGUuZXhwb3J0cyA9IFRyYW5zcG9ydDsgLyoqXG4gKiBUcmFuc3BvcnQgYWJzdHJhY3QgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAYXBpIHByaXZhdGVcbiAqL2Z1bmN0aW9uIFRyYW5zcG9ydChvcHRzKXt0aGlzLnBhdGggPSBvcHRzLnBhdGg7dGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWU7dGhpcy5wb3J0ID0gb3B0cy5wb3J0O3RoaXMuc2VjdXJlID0gb3B0cy5zZWN1cmU7dGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7dGhpcy50aW1lc3RhbXBQYXJhbSA9IG9wdHMudGltZXN0YW1wUGFyYW07dGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7dGhpcy5yZWFkeVN0YXRlID0gJyc7dGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7dGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDt0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7IC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxudGhpcy5wZnggPSBvcHRzLnBmeDt0aGlzLmtleSA9IG9wdHMua2V5O3RoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTt0aGlzLmNlcnQgPSBvcHRzLmNlcnQ7dGhpcy5jYSA9IG9wdHMuY2E7dGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO3RoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7IC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG50aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO30gLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovRW1pdHRlcihUcmFuc3BvcnQucHJvdG90eXBlKTsgLyoqXG4gKiBFbWl0cyBhbiBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtUcmFuc3BvcnR9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1RyYW5zcG9ydC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uKG1zZyxkZXNjKXt2YXIgZXJyPW5ldyBFcnJvcihtc2cpO2Vyci50eXBlID0gJ1RyYW5zcG9ydEVycm9yJztlcnIuZGVzY3JpcHRpb24gPSBkZXNjO3RoaXMuZW1pdCgnZXJyb3InLGVycik7cmV0dXJuIHRoaXM7fTsgLyoqXG4gKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9UcmFuc3BvcnQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpe2lmKCdjbG9zZWQnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnJyA9PSB0aGlzLnJlYWR5U3RhdGUpe3RoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJzt0aGlzLmRvT3BlbigpO31yZXR1cm4gdGhpczt9OyAvKipcbiAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovVHJhbnNwb3J0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCl7aWYoJ29wZW5pbmcnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKXt0aGlzLmRvQ2xvc2UoKTt0aGlzLm9uQ2xvc2UoKTt9cmV0dXJuIHRoaXM7fTsgLyoqXG4gKiBTZW5kcyBtdWx0aXBsZSBwYWNrZXRzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAqIEBhcGkgcHJpdmF0ZVxuICovVHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24ocGFja2V0cyl7aWYoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSl7dGhpcy53cml0ZShwYWNrZXRzKTt9ZWxzZSB7dGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgbm90IG9wZW4nKTt9fTsgLyoqXG4gKiBDYWxsZWQgdXBvbiBvcGVuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9UcmFuc3BvcnQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uKCl7dGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO3RoaXMud3JpdGFibGUgPSB0cnVlO3RoaXMuZW1pdCgnb3BlbicpO307IC8qKlxuICogQ2FsbGVkIHdpdGggZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICogQGFwaSBwcml2YXRlXG4gKi9UcmFuc3BvcnQucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe3ZhciBwYWNrZXQ9cGFyc2VyLmRlY29kZVBhY2tldChkYXRhLHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO3RoaXMub25QYWNrZXQocGFja2V0KTt9OyAvKipcbiAqIENhbGxlZCB3aXRoIGEgZGVjb2RlZCBwYWNrZXQuXG4gKi9UcmFuc3BvcnQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KXt0aGlzLmVtaXQoJ3BhY2tldCcscGFja2V0KTt9OyAvKipcbiAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24oKXt0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJzt0aGlzLmVtaXQoJ2Nsb3NlJyk7fTt9LHtcImNvbXBvbmVudC1lbWl0dGVyXCI6MTUsXCJlbmdpbmUuaW8tcGFyc2VyXCI6MTl9XSw1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi92YXIgWE1MSHR0cFJlcXVlc3Q9X2RlcmVxXygneG1saHR0cHJlcXVlc3Qtc3NsJyk7dmFyIFhIUj1fZGVyZXFfKCcuL3BvbGxpbmcteGhyJyk7dmFyIEpTT05QPV9kZXJlcV8oJy4vcG9sbGluZy1qc29ucCcpO3ZhciB3ZWJzb2NrZXQ9X2RlcmVxXygnLi93ZWJzb2NrZXQnKTsgLyoqXG4gKiBFeHBvcnQgdHJhbnNwb3J0cy5cbiAqL2V4cG9ydHMucG9sbGluZyA9IHBvbGxpbmc7ZXhwb3J0cy53ZWJzb2NrZXQgPSB3ZWJzb2NrZXQ7IC8qKlxuICogUG9sbGluZyB0cmFuc3BvcnQgcG9seW1vcnBoaWMgY29uc3RydWN0b3IuXG4gKiBEZWNpZGVzIG9uIHhociB2cyBqc29ucCBiYXNlZCBvbiBmZWF0dXJlIGRldGVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL2Z1bmN0aW9uIHBvbGxpbmcob3B0cyl7dmFyIHhocjt2YXIgeGQ9ZmFsc2U7dmFyIHhzPWZhbHNlO3ZhciBqc29ucD1mYWxzZSAhPT0gb3B0cy5qc29ucDtpZihnbG9iYWwubG9jYXRpb24pe3ZhciBpc1NTTD0naHR0cHM6JyA9PSBsb2NhdGlvbi5wcm90b2NvbDt2YXIgcG9ydD1sb2NhdGlvbi5wb3J0OyAvLyBzb21lIHVzZXIgYWdlbnRzIGhhdmUgZW1wdHkgYGxvY2F0aW9uLnBvcnRgXG5pZighcG9ydCl7cG9ydCA9IGlzU1NMPzQ0Mzo4MDt9eGQgPSBvcHRzLmhvc3RuYW1lICE9IGxvY2F0aW9uLmhvc3RuYW1lIHx8IHBvcnQgIT0gb3B0cy5wb3J0O3hzID0gb3B0cy5zZWN1cmUgIT0gaXNTU0w7fW9wdHMueGRvbWFpbiA9IHhkO29wdHMueHNjaGVtZSA9IHhzO3hociA9IG5ldyBYTUxIdHRwUmVxdWVzdChvcHRzKTtpZignb3BlbicgaW4geGhyICYmICFvcHRzLmZvcmNlSlNPTlApe3JldHVybiBuZXcgWEhSKG9wdHMpO31lbHNlIHtpZighanNvbnApdGhyb3cgbmV3IEVycm9yKCdKU09OUCBkaXNhYmxlZCcpO3JldHVybiBuZXcgSlNPTlAob3B0cyk7fX19KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7XCIuL3BvbGxpbmctanNvbnBcIjo2LFwiLi9wb2xsaW5nLXhoclwiOjcsXCIuL3dlYnNvY2tldFwiOjksXCJ4bWxodHRwcmVxdWVzdC1zc2xcIjoxMH1dLDY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKipcbiAqIE1vZHVsZSByZXF1aXJlbWVudHMuXG4gKi92YXIgUG9sbGluZz1fZGVyZXFfKCcuL3BvbGxpbmcnKTt2YXIgaW5oZXJpdD1fZGVyZXFfKCdjb21wb25lbnQtaW5oZXJpdCcpOyAvKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovbW9kdWxlLmV4cG9ydHMgPSBKU09OUFBvbGxpbmc7IC8qKlxuICogQ2FjaGVkIHJlZ3VsYXIgZXhwcmVzc2lvbnMuXG4gKi92YXIgck5ld2xpbmU9L1xcbi9nO3ZhciByRXNjYXBlZE5ld2xpbmU9L1xcXFxuL2c7IC8qKlxuICogR2xvYmFsIEpTT05QIGNhbGxiYWNrcy5cbiAqL3ZhciBjYWxsYmFja3M7IC8qKlxuICogQ2FsbGJhY2tzIGNvdW50LlxuICovdmFyIGluZGV4PTA7IC8qKlxuICogTm9vcC5cbiAqL2Z1bmN0aW9uIGVtcHR5KCl7fSAvKipcbiAqIEpTT05QIFBvbGxpbmcgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMuXG4gKiBAYXBpIHB1YmxpY1xuICovZnVuY3Rpb24gSlNPTlBQb2xsaW5nKG9wdHMpe1BvbGxpbmcuY2FsbCh0aGlzLG9wdHMpO3RoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9OyAvLyBkZWZpbmUgZ2xvYmFsIGNhbGxiYWNrcyBhcnJheSBpZiBub3QgcHJlc2VudFxuLy8gd2UgZG8gdGhpcyBoZXJlIChsYXppbHkpIHRvIGF2b2lkIHVubmVlZGVkIGdsb2JhbCBwb2xsdXRpb25cbmlmKCFjYWxsYmFja3MpeyAvLyB3ZSBuZWVkIHRvIGNvbnNpZGVyIG11bHRpcGxlIGVuZ2luZXMgaW4gdGhlIHNhbWUgcGFnZVxuaWYoIWdsb2JhbC5fX19laW8pZ2xvYmFsLl9fX2VpbyA9IFtdO2NhbGxiYWNrcyA9IGdsb2JhbC5fX19laW87fSAvLyBjYWxsYmFjayBpZGVudGlmaWVyXG50aGlzLmluZGV4ID0gY2FsbGJhY2tzLmxlbmd0aDsgLy8gYWRkIGNhbGxiYWNrIHRvIGpzb25wIGdsb2JhbFxudmFyIHNlbGY9dGhpcztjYWxsYmFja3MucHVzaChmdW5jdGlvbihtc2cpe3NlbGYub25EYXRhKG1zZyk7fSk7IC8vIGFwcGVuZCB0byBxdWVyeSBzdHJpbmdcbnRoaXMucXVlcnkuaiA9IHRoaXMuaW5kZXg7IC8vIHByZXZlbnQgc3B1cmlvdXMgZXJyb3JzIGZyb20gYmVpbmcgZW1pdHRlZCB3aGVuIHRoZSB3aW5kb3cgaXMgdW5sb2FkZWRcbmlmKGdsb2JhbC5kb2N1bWVudCAmJiBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcil7Z2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsZnVuY3Rpb24oKXtpZihzZWxmLnNjcmlwdClzZWxmLnNjcmlwdC5vbmVycm9yID0gZW1wdHk7fSxmYWxzZSk7fX0gLyoqXG4gKiBJbmhlcml0cyBmcm9tIFBvbGxpbmcuXG4gKi9pbmhlcml0KEpTT05QUG9sbGluZyxQb2xsaW5nKTsgLypcbiAqIEpTT05QIG9ubHkgc3VwcG9ydHMgYmluYXJ5IGFzIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcbiAqL0pTT05QUG9sbGluZy5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTsgLyoqXG4gKiBDbG9zZXMgdGhlIHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL0pTT05QUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uKCl7aWYodGhpcy5zY3JpcHQpe3RoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO3RoaXMuc2NyaXB0ID0gbnVsbDt9aWYodGhpcy5mb3JtKXt0aGlzLmZvcm0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmZvcm0pO3RoaXMuZm9ybSA9IG51bGw7dGhpcy5pZnJhbWUgPSBudWxsO31Qb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlLmNhbGwodGhpcyk7fTsgLyoqXG4gKiBTdGFydHMgYSBwb2xsIGN5Y2xlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb1BvbGwgPSBmdW5jdGlvbigpe3ZhciBzZWxmPXRoaXM7dmFyIHNjcmlwdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtpZih0aGlzLnNjcmlwdCl7dGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7dGhpcy5zY3JpcHQgPSBudWxsO31zY3JpcHQuYXN5bmMgPSB0cnVlO3NjcmlwdC5zcmMgPSB0aGlzLnVyaSgpO3NjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oZSl7c2VsZi5vbkVycm9yKCdqc29ucCBwb2xsIGVycm9yJyxlKTt9O3ZhciBpbnNlcnRBdD1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07aWYoaW5zZXJ0QXQpe2luc2VydEF0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCxpbnNlcnRBdCk7fWVsc2Ugeyhkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHNjcmlwdCk7fXRoaXMuc2NyaXB0ID0gc2NyaXB0O3ZhciBpc1VBZ2Vja289J3VuZGVmaW5lZCcgIT0gdHlwZW9mIG5hdmlnYXRvciAmJiAvZ2Vja28vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO2lmKGlzVUFnZWNrbyl7c2V0VGltZW91dChmdW5jdGlvbigpe3ZhciBpZnJhbWU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO2RvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lKTt9LDEwMCk7fX07IC8qKlxuICogV3JpdGVzIHdpdGggYSBoaWRkZW4gaWZyYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxuICogQGFwaSBwcml2YXRlXG4gKi9KU09OUFBvbGxpbmcucHJvdG90eXBlLmRvV3JpdGUgPSBmdW5jdGlvbihkYXRhLGZuKXt2YXIgc2VsZj10aGlzO2lmKCF0aGlzLmZvcm0pe3ZhciBmb3JtPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTt2YXIgYXJlYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO3ZhciBpZD10aGlzLmlmcmFtZUlkID0gJ2Vpb19pZnJhbWVfJyArIHRoaXMuaW5kZXg7dmFyIGlmcmFtZTtmb3JtLmNsYXNzTmFtZSA9ICdzb2NrZXRpbyc7Zm9ybS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7Zm9ybS5zdHlsZS50b3AgPSAnLTEwMDBweCc7Zm9ybS5zdHlsZS5sZWZ0ID0gJy0xMDAwcHgnO2Zvcm0udGFyZ2V0ID0gaWQ7Zm9ybS5tZXRob2QgPSAnUE9TVCc7Zm9ybS5zZXRBdHRyaWJ1dGUoJ2FjY2VwdC1jaGFyc2V0JywndXRmLTgnKTthcmVhLm5hbWUgPSAnZCc7Zm9ybS5hcHBlbmRDaGlsZChhcmVhKTtkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO3RoaXMuZm9ybSA9IGZvcm07dGhpcy5hcmVhID0gYXJlYTt9dGhpcy5mb3JtLmFjdGlvbiA9IHRoaXMudXJpKCk7ZnVuY3Rpb24gY29tcGxldGUoKXtpbml0SWZyYW1lKCk7Zm4oKTt9ZnVuY3Rpb24gaW5pdElmcmFtZSgpe2lmKHNlbGYuaWZyYW1lKXt0cnl7c2VsZi5mb3JtLnJlbW92ZUNoaWxkKHNlbGYuaWZyYW1lKTt9Y2F0Y2goZSkge3NlbGYub25FcnJvcignanNvbnAgcG9sbGluZyBpZnJhbWUgcmVtb3ZhbCBlcnJvcicsZSk7fX10cnl7IC8vIGllNiBkeW5hbWljIGlmcmFtZXMgd2l0aCB0YXJnZXQ9XCJcIiBzdXBwb3J0ICh0aGFua3MgQ2hyaXMgTGFtYmFjaGVyKVxudmFyIGh0bWw9JzxpZnJhbWUgc3JjPVwiamF2YXNjcmlwdDowXCIgbmFtZT1cIicgKyBzZWxmLmlmcmFtZUlkICsgJ1wiPic7aWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChodG1sKTt9Y2F0Y2goZSkge2lmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO2lmcmFtZS5uYW1lID0gc2VsZi5pZnJhbWVJZDtpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6MCc7fWlmcmFtZS5pZCA9IHNlbGYuaWZyYW1lSWQ7c2VsZi5mb3JtLmFwcGVuZENoaWxkKGlmcmFtZSk7c2VsZi5pZnJhbWUgPSBpZnJhbWU7fWluaXRJZnJhbWUoKTsgLy8gZXNjYXBlIFxcbiB0byBwcmV2ZW50IGl0IGZyb20gYmVpbmcgY29udmVydGVkIGludG8gXFxyXFxuIGJ5IHNvbWUgVUFzXG4vLyBkb3VibGUgZXNjYXBpbmcgaXMgcmVxdWlyZWQgZm9yIGVzY2FwZWQgbmV3IGxpbmVzIGJlY2F1c2UgdW5lc2NhcGluZyBvZiBuZXcgbGluZXMgY2FuIGJlIGRvbmUgc2FmZWx5IG9uIHNlcnZlci1zaWRlXG5kYXRhID0gZGF0YS5yZXBsYWNlKHJFc2NhcGVkTmV3bGluZSwnXFxcXFxcbicpO3RoaXMuYXJlYS52YWx1ZSA9IGRhdGEucmVwbGFjZShyTmV3bGluZSwnXFxcXG4nKTt0cnl7dGhpcy5mb3JtLnN1Ym1pdCgpO31jYXRjaChlKSB7fWlmKHRoaXMuaWZyYW1lLmF0dGFjaEV2ZW50KXt0aGlzLmlmcmFtZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe2lmKHNlbGYuaWZyYW1lLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJyl7Y29tcGxldGUoKTt9fTt9ZWxzZSB7dGhpcy5pZnJhbWUub25sb2FkID0gY29tcGxldGU7fX07fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se1wiLi9wb2xsaW5nXCI6OCxcImNvbXBvbmVudC1pbmhlcml0XCI6MTZ9XSw3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovdmFyIFhNTEh0dHBSZXF1ZXN0PV9kZXJlcV8oJ3htbGh0dHByZXF1ZXN0LXNzbCcpO3ZhciBQb2xsaW5nPV9kZXJlcV8oJy4vcG9sbGluZycpO3ZhciBFbWl0dGVyPV9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7dmFyIGluaGVyaXQ9X2RlcmVxXygnY29tcG9uZW50LWluaGVyaXQnKTt2YXIgZGVidWc9X2RlcmVxXygnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpwb2xsaW5nLXhocicpOyAvKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovbW9kdWxlLmV4cG9ydHMgPSBYSFI7bW9kdWxlLmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7IC8qKlxuICogRW1wdHkgZnVuY3Rpb25cbiAqL2Z1bmN0aW9uIGVtcHR5KCl7fSAvKipcbiAqIFhIUiBQb2xsaW5nIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovZnVuY3Rpb24gWEhSKG9wdHMpe1BvbGxpbmcuY2FsbCh0aGlzLG9wdHMpO2lmKGdsb2JhbC5sb2NhdGlvbil7dmFyIGlzU1NMPSdodHRwczonID09IGxvY2F0aW9uLnByb3RvY29sO3ZhciBwb3J0PWxvY2F0aW9uLnBvcnQ7IC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbmlmKCFwb3J0KXtwb3J0ID0gaXNTU0w/NDQzOjgwO310aGlzLnhkID0gb3B0cy5ob3N0bmFtZSAhPSBnbG9iYWwubG9jYXRpb24uaG9zdG5hbWUgfHwgcG9ydCAhPSBvcHRzLnBvcnQ7dGhpcy54cyA9IG9wdHMuc2VjdXJlICE9IGlzU1NMO31lbHNlIHt0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO319IC8qKlxuICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxuICovaW5oZXJpdChYSFIsUG9sbGluZyk7IC8qKlxuICogWEhSIHN1cHBvcnRzIGJpbmFyeVxuICovWEhSLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IHRydWU7IC8qKlxuICogQ3JlYXRlcyBhIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQGFwaSBwcml2YXRlXG4gKi9YSFIucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbihvcHRzKXtvcHRzID0gb3B0cyB8fCB7fTtvcHRzLnVyaSA9IHRoaXMudXJpKCk7b3B0cy54ZCA9IHRoaXMueGQ7b3B0cy54cyA9IHRoaXMueHM7b3B0cy5hZ2VudCA9IHRoaXMuYWdlbnQgfHwgZmFsc2U7b3B0cy5zdXBwb3J0c0JpbmFyeSA9IHRoaXMuc3VwcG9ydHNCaW5hcnk7b3B0cy5lbmFibGVzWERSID0gdGhpcy5lbmFibGVzWERSOyAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbm9wdHMucGZ4ID0gdGhpcy5wZng7b3B0cy5rZXkgPSB0aGlzLmtleTtvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7b3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O29wdHMuY2EgPSB0aGlzLmNhO29wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkOyAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxub3B0cy5leHRyYUhlYWRlcnMgPSB0aGlzLmV4dHJhSGVhZGVycztyZXR1cm4gbmV3IFJlcXVlc3Qob3B0cyk7fTsgLyoqXG4gKiBTZW5kcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovWEhSLnByb3RvdHlwZS5kb1dyaXRlID0gZnVuY3Rpb24oZGF0YSxmbil7dmFyIGlzQmluYXJ5PXR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJyAmJiBkYXRhICE9PSB1bmRlZmluZWQ7dmFyIHJlcT10aGlzLnJlcXVlc3Qoe21ldGhvZDonUE9TVCcsZGF0YTpkYXRhLGlzQmluYXJ5OmlzQmluYXJ5fSk7dmFyIHNlbGY9dGhpcztyZXEub24oJ3N1Y2Nlc3MnLGZuKTtyZXEub24oJ2Vycm9yJyxmdW5jdGlvbihlcnIpe3NlbGYub25FcnJvcigneGhyIHBvc3QgZXJyb3InLGVycik7fSk7dGhpcy5zZW5kWGhyID0gcmVxO307IC8qKlxuICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1hIUi5wcm90b3R5cGUuZG9Qb2xsID0gZnVuY3Rpb24oKXtkZWJ1ZygneGhyIHBvbGwnKTt2YXIgcmVxPXRoaXMucmVxdWVzdCgpO3ZhciBzZWxmPXRoaXM7cmVxLm9uKCdkYXRhJyxmdW5jdGlvbihkYXRhKXtzZWxmLm9uRGF0YShkYXRhKTt9KTtyZXEub24oJ2Vycm9yJyxmdW5jdGlvbihlcnIpe3NlbGYub25FcnJvcigneGhyIHBvbGwgZXJyb3InLGVycik7fSk7dGhpcy5wb2xsWGhyID0gcmVxO307IC8qKlxuICogUmVxdWVzdCBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovZnVuY3Rpb24gUmVxdWVzdChvcHRzKXt0aGlzLm1ldGhvZCA9IG9wdHMubWV0aG9kIHx8ICdHRVQnO3RoaXMudXJpID0gb3B0cy51cmk7dGhpcy54ZCA9ICEhb3B0cy54ZDt0aGlzLnhzID0gISFvcHRzLnhzO3RoaXMuYXN5bmMgPSBmYWxzZSAhPT0gb3B0cy5hc3luYzt0aGlzLmRhdGEgPSB1bmRlZmluZWQgIT0gb3B0cy5kYXRhP29wdHMuZGF0YTpudWxsO3RoaXMuYWdlbnQgPSBvcHRzLmFnZW50O3RoaXMuaXNCaW5hcnkgPSBvcHRzLmlzQmluYXJ5O3RoaXMuc3VwcG9ydHNCaW5hcnkgPSBvcHRzLnN1cHBvcnRzQmluYXJ5O3RoaXMuZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjsgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG50aGlzLnBmeCA9IG9wdHMucGZ4O3RoaXMua2V5ID0gb3B0cy5rZXk7dGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlO3RoaXMuY2VydCA9IG9wdHMuY2VydDt0aGlzLmNhID0gb3B0cy5jYTt0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnM7dGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDsgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbnRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7dGhpcy5jcmVhdGUoKTt9IC8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL0VtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpOyAvKipcbiAqIENyZWF0ZXMgdGhlIFhIUiBvYmplY3QgYW5kIHNlbmRzIHRoZSByZXF1ZXN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovUmVxdWVzdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXt2YXIgb3B0cz17YWdlbnQ6dGhpcy5hZ2VudCx4ZG9tYWluOnRoaXMueGQseHNjaGVtZTp0aGlzLnhzLGVuYWJsZXNYRFI6dGhpcy5lbmFibGVzWERSfTsgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG5vcHRzLnBmeCA9IHRoaXMucGZ4O29wdHMua2V5ID0gdGhpcy5rZXk7b3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO29wdHMuY2VydCA9IHRoaXMuY2VydDtvcHRzLmNhID0gdGhpcy5jYTtvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7b3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDt2YXIgeGhyPXRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpO3ZhciBzZWxmPXRoaXM7dHJ5e2RlYnVnKCd4aHIgb3BlbiAlczogJXMnLHRoaXMubWV0aG9kLHRoaXMudXJpKTt4aHIub3Blbih0aGlzLm1ldGhvZCx0aGlzLnVyaSx0aGlzLmFzeW5jKTt0cnl7aWYodGhpcy5leHRyYUhlYWRlcnMpe3hoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sodHJ1ZSk7Zm9yKHZhciBpIGluIHRoaXMuZXh0cmFIZWFkZXJzKSB7aWYodGhpcy5leHRyYUhlYWRlcnMuaGFzT3duUHJvcGVydHkoaSkpe3hoci5zZXRSZXF1ZXN0SGVhZGVyKGksdGhpcy5leHRyYUhlYWRlcnNbaV0pO319fX1jYXRjaChlKSB7fWlmKHRoaXMuc3VwcG9ydHNCaW5hcnkpeyAvLyBUaGlzIGhhcyB0byBiZSBkb25lIGFmdGVyIG9wZW4gYmVjYXVzZSBGaXJlZm94IGlzIHN0dXBpZFxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMzIxNjkwMy9nZXQtYmluYXJ5LWRhdGEtd2l0aC14bWxodHRwcmVxdWVzdC1pbi1hLWZpcmVmb3gtZXh0ZW5zaW9uXG54aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJzt9aWYoJ1BPU1QnID09IHRoaXMubWV0aG9kKXt0cnl7aWYodGhpcy5pc0JpbmFyeSl7eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpO31lbHNlIHt4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jyk7fX1jYXRjaChlKSB7fX0gLy8gaWU2IGNoZWNrXG5pZignd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpe3hoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO31pZih0aGlzLmhhc1hEUigpKXt4aHIub25sb2FkID0gZnVuY3Rpb24oKXtzZWxmLm9uTG9hZCgpO307eGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpe3NlbGYub25FcnJvcih4aHIucmVzcG9uc2VUZXh0KTt9O31lbHNlIHt4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtpZig0ICE9IHhoci5yZWFkeVN0YXRlKXJldHVybjtpZigyMDAgPT0geGhyLnN0YXR1cyB8fCAxMjIzID09IHhoci5zdGF0dXMpe3NlbGYub25Mb2FkKCk7fWVsc2UgeyAvLyBtYWtlIHN1cmUgdGhlIGBlcnJvcmAgZXZlbnQgaGFuZGxlciB0aGF0J3MgdXNlci1zZXRcbi8vIGRvZXMgbm90IHRocm93IGluIHRoZSBzYW1lIHRpY2sgYW5kIGdldHMgY2F1Z2h0IGhlcmVcbnNldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLm9uRXJyb3IoeGhyLnN0YXR1cyk7fSwwKTt9fTt9ZGVidWcoJ3hociBkYXRhICVzJyx0aGlzLmRhdGEpO3hoci5zZW5kKHRoaXMuZGF0YSk7fWNhdGNoKGUpIHsgLy8gTmVlZCB0byBkZWZlciBzaW5jZSAuY3JlYXRlKCkgaXMgY2FsbGVkIGRpcmVjdGx5IGZocm9tIHRoZSBjb25zdHJ1Y3RvclxuLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4vLyBvY2N1cnMuICBUaGVyZWZvcmUsIGFsc28sIHdlIGNhbm5vdCB0aHJvdyBoZXJlIGF0IGFsbC5cbnNldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLm9uRXJyb3IoZSk7fSwwKTtyZXR1cm47fWlmKGdsb2JhbC5kb2N1bWVudCl7dGhpcy5pbmRleCA9IFJlcXVlc3QucmVxdWVzdHNDb3VudCsrO1JlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF0gPSB0aGlzO319OyAvKipcbiAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVzcG9uc2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9SZXF1ZXN0LnByb3RvdHlwZS5vblN1Y2Nlc3MgPSBmdW5jdGlvbigpe3RoaXMuZW1pdCgnc3VjY2VzcycpO3RoaXMuY2xlYW51cCgpO307IC8qKlxuICogQ2FsbGVkIGlmIHdlIGhhdmUgZGF0YS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1JlcXVlc3QucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe3RoaXMuZW1pdCgnZGF0YScsZGF0YSk7dGhpcy5vblN1Y2Nlc3MoKTt9OyAvKipcbiAqIENhbGxlZCB1cG9uIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovUmVxdWVzdC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uKGVycil7dGhpcy5lbWl0KCdlcnJvcicsZXJyKTt0aGlzLmNsZWFudXAodHJ1ZSk7fTsgLyoqXG4gKiBDbGVhbnMgdXAgaG91c2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9SZXF1ZXN0LnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24oZnJvbUVycm9yKXtpZigndW5kZWZpbmVkJyA9PSB0eXBlb2YgdGhpcy54aHIgfHwgbnVsbCA9PT0gdGhpcy54aHIpe3JldHVybjt9IC8vIHhtbGh0dHByZXF1ZXN0XG5pZih0aGlzLmhhc1hEUigpKXt0aGlzLnhoci5vbmxvYWQgPSB0aGlzLnhoci5vbmVycm9yID0gZW1wdHk7fWVsc2Uge3RoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O31pZihmcm9tRXJyb3Ipe3RyeXt0aGlzLnhoci5hYm9ydCgpO31jYXRjaChlKSB7fX1pZihnbG9iYWwuZG9jdW1lbnQpe2RlbGV0ZSBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdO310aGlzLnhociA9IG51bGw7fTsgLyoqXG4gKiBDYWxsZWQgdXBvbiBsb2FkLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovUmVxdWVzdC5wcm90b3R5cGUub25Mb2FkID0gZnVuY3Rpb24oKXt2YXIgZGF0YTt0cnl7dmFyIGNvbnRlbnRUeXBlO3RyeXtjb250ZW50VHlwZSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKS5zcGxpdCgnOycpWzBdO31jYXRjaChlKSB7fWlmKGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyl7ZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlO31lbHNlIHtpZighdGhpcy5zdXBwb3J0c0JpbmFyeSl7ZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlVGV4dDt9ZWxzZSB7dHJ5e2RhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsbmV3IFVpbnQ4QXJyYXkodGhpcy54aHIucmVzcG9uc2UpKTt9Y2F0Y2goZSkge3ZhciB1aThBcnI9bmV3IFVpbnQ4QXJyYXkodGhpcy54aHIucmVzcG9uc2UpO3ZhciBkYXRhQXJyYXk9W107Zm9yKHZhciBpZHg9MCxsZW5ndGg9dWk4QXJyLmxlbmd0aDtpZHggPCBsZW5ndGg7aWR4KyspIHtkYXRhQXJyYXkucHVzaCh1aThBcnJbaWR4XSk7fWRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsZGF0YUFycmF5KTt9fX19Y2F0Y2goZSkge3RoaXMub25FcnJvcihlKTt9aWYobnVsbCAhPSBkYXRhKXt0aGlzLm9uRGF0YShkYXRhKTt9fTsgLyoqXG4gKiBDaGVjayBpZiBpdCBoYXMgWERvbWFpblJlcXVlc3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9SZXF1ZXN0LnByb3RvdHlwZS5oYXNYRFIgPSBmdW5jdGlvbigpe3JldHVybiAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGdsb2JhbC5YRG9tYWluUmVxdWVzdCAmJiAhdGhpcy54cyAmJiB0aGlzLmVuYWJsZXNYRFI7fTsgLyoqXG4gKiBBYm9ydHMgdGhlIHJlcXVlc3QuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1JlcXVlc3QucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKXt0aGlzLmNsZWFudXAoKTt9OyAvKipcbiAqIEFib3J0cyBwZW5kaW5nIHJlcXVlc3RzIHdoZW4gdW5sb2FkaW5nIHRoZSB3aW5kb3cuIFRoaXMgaXMgbmVlZGVkIHRvIHByZXZlbnRcbiAqIG1lbW9yeSBsZWFrcyAoZS5nLiB3aGVuIHVzaW5nIElFKSBhbmQgdG8gZW5zdXJlIHRoYXQgbm8gc3B1cmlvdXMgZXJyb3IgaXNcbiAqIGVtaXR0ZWQuXG4gKi9pZihnbG9iYWwuZG9jdW1lbnQpe1JlcXVlc3QucmVxdWVzdHNDb3VudCA9IDA7UmVxdWVzdC5yZXF1ZXN0cyA9IHt9O2lmKGdsb2JhbC5hdHRhY2hFdmVudCl7Z2xvYmFsLmF0dGFjaEV2ZW50KCdvbnVubG9hZCcsdW5sb2FkSGFuZGxlcik7fWVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpe2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLHVubG9hZEhhbmRsZXIsZmFsc2UpO319ZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpe2Zvcih2YXIgaSBpbiBSZXF1ZXN0LnJlcXVlc3RzKSB7aWYoUmVxdWVzdC5yZXF1ZXN0cy5oYXNPd25Qcm9wZXJ0eShpKSl7UmVxdWVzdC5yZXF1ZXN0c1tpXS5hYm9ydCgpO319fX0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHtcIi4vcG9sbGluZ1wiOjgsXCJjb21wb25lbnQtZW1pdHRlclwiOjE1LFwiY29tcG9uZW50LWluaGVyaXRcIjoxNixcImRlYnVnXCI6MTcsXCJ4bWxodHRwcmVxdWVzdC1zc2xcIjoxMH1dLDg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi92YXIgVHJhbnNwb3J0PV9kZXJlcV8oJy4uL3RyYW5zcG9ydCcpO3ZhciBwYXJzZXFzPV9kZXJlcV8oJ3BhcnNlcXMnKTt2YXIgcGFyc2VyPV9kZXJlcV8oJ2VuZ2luZS5pby1wYXJzZXInKTt2YXIgaW5oZXJpdD1fZGVyZXFfKCdjb21wb25lbnQtaW5oZXJpdCcpO3ZhciB5ZWFzdD1fZGVyZXFfKCd5ZWFzdCcpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnBvbGxpbmcnKTsgLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL21vZHVsZS5leHBvcnRzID0gUG9sbGluZzsgLyoqXG4gKiBJcyBYSFIyIHN1cHBvcnRlZD9cbiAqL3ZhciBoYXNYSFIyPShmdW5jdGlvbigpe3ZhciBYTUxIdHRwUmVxdWVzdD1fZGVyZXFfKCd4bWxodHRwcmVxdWVzdC1zc2wnKTt2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdCh7eGRvbWFpbjpmYWxzZX0pO3JldHVybiBudWxsICE9IHhoci5yZXNwb25zZVR5cGU7fSkoKTsgLyoqXG4gKiBQb2xsaW5nIGludGVyZmFjZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQGFwaSBwcml2YXRlXG4gKi9mdW5jdGlvbiBQb2xsaW5nKG9wdHMpe3ZhciBmb3JjZUJhc2U2ND1vcHRzICYmIG9wdHMuZm9yY2VCYXNlNjQ7aWYoIWhhc1hIUjIgfHwgZm9yY2VCYXNlNjQpe3RoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTt9VHJhbnNwb3J0LmNhbGwodGhpcyxvcHRzKTt9IC8qKlxuICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gKi9pbmhlcml0KFBvbGxpbmcsVHJhbnNwb3J0KTsgLyoqXG4gKiBUcmFuc3BvcnQgbmFtZS5cbiAqL1BvbGxpbmcucHJvdG90eXBlLm5hbWUgPSAncG9sbGluZyc7IC8qKlxuICogT3BlbnMgdGhlIHNvY2tldCAodHJpZ2dlcnMgcG9sbGluZykuIFdlIHdyaXRlIGEgUElORyBtZXNzYWdlIHRvIGRldGVybWluZVxuICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9Qb2xsaW5nLnByb3RvdHlwZS5kb09wZW4gPSBmdW5jdGlvbigpe3RoaXMucG9sbCgpO307IC8qKlxuICogUGF1c2VzIHBvbGxpbmcuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdXBvbiBidWZmZXJzIGFyZSBmbHVzaGVkIGFuZCB0cmFuc3BvcnQgaXMgcGF1c2VkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1BvbGxpbmcucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24ob25QYXVzZSl7dmFyIHBlbmRpbmc9MDt2YXIgc2VsZj10aGlzO3RoaXMucmVhZHlTdGF0ZSA9ICdwYXVzaW5nJztmdW5jdGlvbiBwYXVzZSgpe2RlYnVnKCdwYXVzZWQnKTtzZWxmLnJlYWR5U3RhdGUgPSAncGF1c2VkJztvblBhdXNlKCk7fWlmKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSl7dmFyIHRvdGFsPTA7aWYodGhpcy5wb2xsaW5nKXtkZWJ1Zygnd2UgYXJlIGN1cnJlbnRseSBwb2xsaW5nIC0gd2FpdGluZyB0byBwYXVzZScpO3RvdGFsKys7dGhpcy5vbmNlKCdwb2xsQ29tcGxldGUnLGZ1bmN0aW9uKCl7ZGVidWcoJ3ByZS1wYXVzZSBwb2xsaW5nIGNvbXBsZXRlJyk7LS10b3RhbCB8fCBwYXVzZSgpO30pO31pZighdGhpcy53cml0YWJsZSl7ZGVidWcoJ3dlIGFyZSBjdXJyZW50bHkgd3JpdGluZyAtIHdhaXRpbmcgdG8gcGF1c2UnKTt0b3RhbCsrO3RoaXMub25jZSgnZHJhaW4nLGZ1bmN0aW9uKCl7ZGVidWcoJ3ByZS1wYXVzZSB3cml0aW5nIGNvbXBsZXRlJyk7LS10b3RhbCB8fCBwYXVzZSgpO30pO319ZWxzZSB7cGF1c2UoKTt9fTsgLyoqXG4gKiBTdGFydHMgcG9sbGluZyBjeWNsZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovUG9sbGluZy5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uKCl7ZGVidWcoJ3BvbGxpbmcnKTt0aGlzLnBvbGxpbmcgPSB0cnVlO3RoaXMuZG9Qb2xsKCk7dGhpcy5lbWl0KCdwb2xsJyk7fTsgLyoqXG4gKiBPdmVybG9hZHMgb25EYXRhIHRvIGRldGVjdCBwYXlsb2Fkcy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1BvbGxpbmcucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe3ZhciBzZWxmPXRoaXM7ZGVidWcoJ3BvbGxpbmcgZ290IGRhdGEgJXMnLGRhdGEpO3ZhciBjYWxsYmFjaz1mdW5jdGlvbiBjYWxsYmFjayhwYWNrZXQsaW5kZXgsdG90YWwpeyAvLyBpZiBpdHMgdGhlIGZpcnN0IG1lc3NhZ2Ugd2UgY29uc2lkZXIgdGhlIHRyYW5zcG9ydCBvcGVuXG5pZignb3BlbmluZycgPT0gc2VsZi5yZWFkeVN0YXRlKXtzZWxmLm9uT3BlbigpO30gLy8gaWYgaXRzIGEgY2xvc2UgcGFja2V0LCB3ZSBjbG9zZSB0aGUgb25nb2luZyByZXF1ZXN0c1xuaWYoJ2Nsb3NlJyA9PSBwYWNrZXQudHlwZSl7c2VsZi5vbkNsb3NlKCk7cmV0dXJuIGZhbHNlO30gLy8gb3RoZXJ3aXNlIGJ5cGFzcyBvbkRhdGEgYW5kIGhhbmRsZSB0aGUgbWVzc2FnZVxuc2VsZi5vblBhY2tldChwYWNrZXQpO307IC8vIGRlY29kZSBwYXlsb2FkXG5wYXJzZXIuZGVjb2RlUGF5bG9hZChkYXRhLHRoaXMuc29ja2V0LmJpbmFyeVR5cGUsY2FsbGJhY2spOyAvLyBpZiBhbiBldmVudCBkaWQgbm90IHRyaWdnZXIgY2xvc2luZ1xuaWYoJ2Nsb3NlZCcgIT0gdGhpcy5yZWFkeVN0YXRlKXsgLy8gaWYgd2UgZ290IGRhdGEgd2UncmUgbm90IHBvbGxpbmdcbnRoaXMucG9sbGluZyA9IGZhbHNlO3RoaXMuZW1pdCgncG9sbENvbXBsZXRlJyk7aWYoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSl7dGhpcy5wb2xsKCk7fWVsc2Uge2RlYnVnKCdpZ25vcmluZyBwb2xsIC0gdHJhbnNwb3J0IHN0YXRlIFwiJXNcIicsdGhpcy5yZWFkeVN0YXRlKTt9fX07IC8qKlxuICogRm9yIHBvbGxpbmcsIHNlbmQgYSBjbG9zZSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9Qb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24oKXt2YXIgc2VsZj10aGlzO2Z1bmN0aW9uIGNsb3NlKCl7ZGVidWcoJ3dyaXRpbmcgY2xvc2UgcGFja2V0Jyk7c2VsZi53cml0ZShbe3R5cGU6J2Nsb3NlJ31dKTt9aWYoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSl7ZGVidWcoJ3RyYW5zcG9ydCBvcGVuIC0gY2xvc2luZycpO2Nsb3NlKCk7fWVsc2UgeyAvLyBpbiBjYXNlIHdlJ3JlIHRyeWluZyB0byBjbG9zZSB3aGlsZVxuLy8gaGFuZHNoYWtpbmcgaXMgaW4gcHJvZ3Jlc3MgKEdILTE2NClcbmRlYnVnKCd0cmFuc3BvcnQgbm90IG9wZW4gLSBkZWZlcnJpbmcgY2xvc2UnKTt0aGlzLm9uY2UoJ29wZW4nLGNsb3NlKTt9fTsgLyoqXG4gKiBXcml0ZXMgYSBwYWNrZXRzIHBheWxvYWQuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gZGF0YSBwYWNrZXRzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkcmFpbiBjYWxsYmFja1xuICogQGFwaSBwcml2YXRlXG4gKi9Qb2xsaW5nLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uKHBhY2tldHMpe3ZhciBzZWxmPXRoaXM7dGhpcy53cml0YWJsZSA9IGZhbHNlO3ZhciBjYWxsYmFja2ZuPWZ1bmN0aW9uIGNhbGxiYWNrZm4oKXtzZWxmLndyaXRhYmxlID0gdHJ1ZTtzZWxmLmVtaXQoJ2RyYWluJyk7fTt2YXIgc2VsZj10aGlzO3BhcnNlci5lbmNvZGVQYXlsb2FkKHBhY2tldHMsdGhpcy5zdXBwb3J0c0JpbmFyeSxmdW5jdGlvbihkYXRhKXtzZWxmLmRvV3JpdGUoZGF0YSxjYWxsYmFja2ZuKTt9KTt9OyAvKipcbiAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9Qb2xsaW5nLnByb3RvdHlwZS51cmkgPSBmdW5jdGlvbigpe3ZhciBxdWVyeT10aGlzLnF1ZXJ5IHx8IHt9O3ZhciBzY2hlbWE9dGhpcy5zZWN1cmU/J2h0dHBzJzonaHR0cCc7dmFyIHBvcnQ9Jyc7IC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG5pZihmYWxzZSAhPT0gdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyl7cXVlcnlbdGhpcy50aW1lc3RhbXBQYXJhbV0gPSB5ZWFzdCgpO31pZighdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiAhcXVlcnkuc2lkKXtxdWVyeS5iNjQgPSAxO31xdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTsgLy8gYXZvaWQgcG9ydCBpZiBkZWZhdWx0IGZvciBzY2hlbWFcbmlmKHRoaXMucG9ydCAmJiAoJ2h0dHBzJyA9PSBzY2hlbWEgJiYgdGhpcy5wb3J0ICE9IDQ0MyB8fCAnaHR0cCcgPT0gc2NoZW1hICYmIHRoaXMucG9ydCAhPSA4MCkpe3BvcnQgPSAnOicgKyB0aGlzLnBvcnQ7fSAvLyBwcmVwZW5kID8gdG8gcXVlcnlcbmlmKHF1ZXJ5Lmxlbmd0aCl7cXVlcnkgPSAnPycgKyBxdWVyeTt9dmFyIGlwdjY9dGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgIT09IC0xO3JldHVybiBzY2hlbWEgKyAnOi8vJyArIChpcHY2PydbJyArIHRoaXMuaG9zdG5hbWUgKyAnXSc6dGhpcy5ob3N0bmFtZSkgKyBwb3J0ICsgdGhpcy5wYXRoICsgcXVlcnk7fTt9LHtcIi4uL3RyYW5zcG9ydFwiOjQsXCJjb21wb25lbnQtaW5oZXJpdFwiOjE2LFwiZGVidWdcIjoxNyxcImVuZ2luZS5pby1wYXJzZXJcIjoxOSxcInBhcnNlcXNcIjoyNyxcInhtbGh0dHByZXF1ZXN0LXNzbFwiOjEwLFwieWVhc3RcIjozMH1dLDk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi92YXIgVHJhbnNwb3J0PV9kZXJlcV8oJy4uL3RyYW5zcG9ydCcpO3ZhciBwYXJzZXI9X2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpO3ZhciBwYXJzZXFzPV9kZXJlcV8oJ3BhcnNlcXMnKTt2YXIgaW5oZXJpdD1fZGVyZXFfKCdjb21wb25lbnQtaW5oZXJpdCcpO3ZhciB5ZWFzdD1fZGVyZXFfKCd5ZWFzdCcpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OndlYnNvY2tldCcpO3ZhciBCcm93c2VyV2ViU29ja2V0PWdsb2JhbC5XZWJTb2NrZXQgfHwgZ2xvYmFsLk1veldlYlNvY2tldDsgLyoqXG4gKiBHZXQgZWl0aGVyIHRoZSBgV2ViU29ja2V0YCBvciBgTW96V2ViU29ja2V0YCBnbG9iYWxzXG4gKiBpbiB0aGUgYnJvd3NlciBvciB0aGUgV2ViU29ja2V0LWNvbXBhdGlibGUgaW50ZXJmYWNlXG4gKiBleHBvc2VkIGJ5IGB3c2AgZm9yIE5vZGUgZW52aXJvbm1lbnQuXG4gKi92YXIgV2ViU29ja2V0PUJyb3dzZXJXZWJTb2NrZXQgfHwgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnP251bGw6X2RlcmVxXygnd3MnKSk7IC8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9tb2R1bGUuZXhwb3J0cyA9IFdTOyAvKipcbiAqIFdlYlNvY2tldCB0cmFuc3BvcnQgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSB7T2JqZWN0fSBjb25uZWN0aW9uIG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9mdW5jdGlvbiBXUyhvcHRzKXt2YXIgZm9yY2VCYXNlNjQ9b3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0O2lmKGZvcmNlQmFzZTY0KXt0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7fXRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlO1RyYW5zcG9ydC5jYWxsKHRoaXMsb3B0cyk7fSAvKipcbiAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxuICovaW5oZXJpdChXUyxUcmFuc3BvcnQpOyAvKipcbiAqIFRyYW5zcG9ydCBuYW1lLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9XUy5wcm90b3R5cGUubmFtZSA9ICd3ZWJzb2NrZXQnOyAvKlxuICogV2ViU29ja2V0cyBzdXBwb3J0IGJpbmFyeVxuICovV1MucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTsgLyoqXG4gKiBPcGVucyBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9XUy5wcm90b3R5cGUuZG9PcGVuID0gZnVuY3Rpb24oKXtpZighdGhpcy5jaGVjaygpKXsgLy8gbGV0IHByb2JlIHRpbWVvdXRcbnJldHVybjt9dmFyIHNlbGY9dGhpczt2YXIgdXJpPXRoaXMudXJpKCk7dmFyIHByb3RvY29scz12b2lkIDA7dmFyIG9wdHM9e2FnZW50OnRoaXMuYWdlbnQscGVyTWVzc2FnZURlZmxhdGU6dGhpcy5wZXJNZXNzYWdlRGVmbGF0ZX07IC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxub3B0cy5wZnggPSB0aGlzLnBmeDtvcHRzLmtleSA9IHRoaXMua2V5O29wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7b3B0cy5jYSA9IHRoaXMuY2E7b3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO29wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7aWYodGhpcy5leHRyYUhlYWRlcnMpe29wdHMuaGVhZGVycyA9IHRoaXMuZXh0cmFIZWFkZXJzO310aGlzLndzID0gQnJvd3NlcldlYlNvY2tldD9uZXcgV2ViU29ja2V0KHVyaSk6bmV3IFdlYlNvY2tldCh1cmkscHJvdG9jb2xzLG9wdHMpO2lmKHRoaXMud3MuYmluYXJ5VHlwZSA9PT0gdW5kZWZpbmVkKXt0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7fWlmKHRoaXMud3Muc3VwcG9ydHMgJiYgdGhpcy53cy5zdXBwb3J0cy5iaW5hcnkpe3RoaXMuc3VwcG9ydHNCaW5hcnkgPSB0cnVlO3RoaXMud3MuYmluYXJ5VHlwZSA9ICdidWZmZXInO31lbHNlIHt0aGlzLndzLmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInO310aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7fTsgLyoqXG4gKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgc29ja2V0XG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9XUy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe3ZhciBzZWxmPXRoaXM7dGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbigpe3NlbGYub25PcGVuKCk7fTt0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpe3NlbGYub25DbG9zZSgpO307dGhpcy53cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldil7c2VsZi5vbkRhdGEoZXYuZGF0YSk7fTt0aGlzLndzLm9uZXJyb3IgPSBmdW5jdGlvbihlKXtzZWxmLm9uRXJyb3IoJ3dlYnNvY2tldCBlcnJvcicsZSk7fTt9OyAvKipcbiAqIE92ZXJyaWRlIGBvbkRhdGFgIHRvIHVzZSBhIHRpbWVyIG9uIGlPUy5cbiAqIFNlZTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vbWxvdWdocmFuLzIwNTIwMDZcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL2lmKCd1bmRlZmluZWQnICE9IHR5cGVvZiBuYXZpZ2F0b3IgJiYgL2lQYWR8aVBob25lfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKXtXUy5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24oZGF0YSl7dmFyIHNlbGY9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7VHJhbnNwb3J0LnByb3RvdHlwZS5vbkRhdGEuY2FsbChzZWxmLGRhdGEpO30sMCk7fTt9IC8qKlxuICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IG9mIHBhY2tldHMuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1dTLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uKHBhY2tldHMpe3ZhciBzZWxmPXRoaXM7dGhpcy53cml0YWJsZSA9IGZhbHNlOyAvLyBlbmNvZGVQYWNrZXQgZWZmaWNpZW50IGFzIGl0IHVzZXMgV1MgZnJhbWluZ1xuLy8gbm8gbmVlZCBmb3IgZW5jb2RlUGF5bG9hZFxudmFyIHRvdGFsPXBhY2tldHMubGVuZ3RoO2Zvcih2YXIgaT0wLGw9dG90YWw7aSA8IGw7aSsrKSB7KGZ1bmN0aW9uKHBhY2tldCl7cGFyc2VyLmVuY29kZVBhY2tldChwYWNrZXQsc2VsZi5zdXBwb3J0c0JpbmFyeSxmdW5jdGlvbihkYXRhKXtpZighQnJvd3NlcldlYlNvY2tldCl7IC8vIGFsd2F5cyBjcmVhdGUgYSBuZXcgb2JqZWN0IChHSC00MzcpXG52YXIgb3B0cz17fTtpZihwYWNrZXQub3B0aW9ucyl7b3B0cy5jb21wcmVzcyA9IHBhY2tldC5vcHRpb25zLmNvbXByZXNzO31pZihzZWxmLnBlck1lc3NhZ2VEZWZsYXRlKXt2YXIgbGVuPSdzdHJpbmcnID09IHR5cGVvZiBkYXRhP2dsb2JhbC5CdWZmZXIuYnl0ZUxlbmd0aChkYXRhKTpkYXRhLmxlbmd0aDtpZihsZW4gPCBzZWxmLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCl7b3B0cy5jb21wcmVzcyA9IGZhbHNlO319fSAvL1NvbWV0aW1lcyB0aGUgd2Vic29ja2V0IGhhcyBhbHJlYWR5IGJlZW4gY2xvc2VkIGJ1dCB0aGUgYnJvd3NlciBkaWRuJ3Rcbi8vaGF2ZSBhIGNoYW5jZSBvZiBpbmZvcm1pbmcgdXMgYWJvdXQgaXQgeWV0LCBpbiB0aGF0IGNhc2Ugc2VuZCB3aWxsXG4vL3Rocm93IGFuIGVycm9yXG50cnl7aWYoQnJvd3NlcldlYlNvY2tldCl7IC8vIFR5cGVFcnJvciBpcyB0aHJvd24gd2hlbiBwYXNzaW5nIHRoZSBzZWNvbmQgYXJndW1lbnQgb24gU2FmYXJpXG5zZWxmLndzLnNlbmQoZGF0YSk7fWVsc2Uge3NlbGYud3Muc2VuZChkYXRhLG9wdHMpO319Y2F0Y2goZSkge2RlYnVnKCd3ZWJzb2NrZXQgY2xvc2VkIGJlZm9yZSBvbmNsb3NlIGV2ZW50Jyk7fS0tdG90YWwgfHwgZG9uZSgpO30pO30pKHBhY2tldHNbaV0pO31mdW5jdGlvbiBkb25lKCl7c2VsZi5lbWl0KCdmbHVzaCcpOyAvLyBmYWtlIGRyYWluXG4vLyBkZWZlciB0byBuZXh0IHRpY2sgdG8gYWxsb3cgU29ja2V0IHRvIGNsZWFyIHdyaXRlQnVmZmVyXG5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7c2VsZi53cml0YWJsZSA9IHRydWU7c2VsZi5lbWl0KCdkcmFpbicpO30sMCk7fX07IC8qKlxuICogQ2FsbGVkIHVwb24gY2xvc2VcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1dTLnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24oKXtUcmFuc3BvcnQucHJvdG90eXBlLm9uQ2xvc2UuY2FsbCh0aGlzKTt9OyAvKipcbiAqIENsb3NlcyBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9XUy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uKCl7aWYodHlwZW9mIHRoaXMud3MgIT09ICd1bmRlZmluZWQnKXt0aGlzLndzLmNsb3NlKCk7fX07IC8qKlxuICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1dTLnByb3RvdHlwZS51cmkgPSBmdW5jdGlvbigpe3ZhciBxdWVyeT10aGlzLnF1ZXJ5IHx8IHt9O3ZhciBzY2hlbWE9dGhpcy5zZWN1cmU/J3dzcyc6J3dzJzt2YXIgcG9ydD0nJzsgLy8gYXZvaWQgcG9ydCBpZiBkZWZhdWx0IGZvciBzY2hlbWFcbmlmKHRoaXMucG9ydCAmJiAoJ3dzcycgPT0gc2NoZW1hICYmIHRoaXMucG9ydCAhPSA0NDMgfHwgJ3dzJyA9PSBzY2hlbWEgJiYgdGhpcy5wb3J0ICE9IDgwKSl7cG9ydCA9ICc6JyArIHRoaXMucG9ydDt9IC8vIGFwcGVuZCB0aW1lc3RhbXAgdG8gVVJJXG5pZih0aGlzLnRpbWVzdGFtcFJlcXVlc3RzKXtxdWVyeVt0aGlzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7fSAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbmlmKCF0aGlzLnN1cHBvcnRzQmluYXJ5KXtxdWVyeS5iNjQgPSAxO31xdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTsgLy8gcHJlcGVuZCA/IHRvIHF1ZXJ5XG5pZihxdWVyeS5sZW5ndGgpe3F1ZXJ5ID0gJz8nICsgcXVlcnk7fXZhciBpcHY2PXRoaXMuaG9zdG5hbWUuaW5kZXhPZignOicpICE9PSAtMTtyZXR1cm4gc2NoZW1hICsgJzovLycgKyAoaXB2Nj8nWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nOnRoaXMuaG9zdG5hbWUpICsgcG9ydCArIHRoaXMucGF0aCArIHF1ZXJ5O307IC8qKlxuICogRmVhdHVyZSBkZXRlY3Rpb24gZm9yIFdlYlNvY2tldC5cbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIHRoaXMgdHJhbnNwb3J0IGlzIGF2YWlsYWJsZS5cbiAqIEBhcGkgcHVibGljXG4gKi9XUy5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbigpe3JldHVybiAhIVdlYlNvY2tldCAmJiAhKCdfX2luaXRpYWxpemUnIGluIFdlYlNvY2tldCAmJiB0aGlzLm5hbWUgPT09IFdTLnByb3RvdHlwZS5uYW1lKTt9O30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHtcIi4uL3RyYW5zcG9ydFwiOjQsXCJjb21wb25lbnQtaW5oZXJpdFwiOjE2LFwiZGVidWdcIjoxNyxcImVuZ2luZS5pby1wYXJzZXJcIjoxOSxcInBhcnNlcXNcIjoyNyxcIndzXCI6dW5kZWZpbmVkLFwieWVhc3RcIjozMH1dLDEwOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcbnZhciBoYXNDT1JTPV9kZXJlcV8oJ2hhcy1jb3JzJyk7bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHRzKXt2YXIgeGRvbWFpbj1vcHRzLnhkb21haW47IC8vIHNjaGVtZSBtdXN0IGJlIHNhbWUgd2hlbiB1c2lnbiBYRG9tYWluUmVxdWVzdFxuLy8gaHR0cDovL2Jsb2dzLm1zZG4uY29tL2IvaWVpbnRlcm5hbHMvYXJjaGl2ZS8yMDEwLzA1LzEzL3hkb21haW5yZXF1ZXN0LXJlc3RyaWN0aW9ucy1saW1pdGF0aW9ucy1hbmQtd29ya2Fyb3VuZHMuYXNweFxudmFyIHhzY2hlbWU9b3B0cy54c2NoZW1lOyAvLyBYRG9tYWluUmVxdWVzdCBoYXMgYSBmbG93IG9mIG5vdCBzZW5kaW5nIGNvb2tpZSwgdGhlcmVmb3JlIGl0IHNob3VsZCBiZSBkaXNhYmxlZCBhcyBhIGRlZmF1bHQuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9lbmdpbmUuaW8tY2xpZW50L3B1bGwvMjE3XG52YXIgZW5hYmxlc1hEUj1vcHRzLmVuYWJsZXNYRFI7IC8vIFhNTEh0dHBSZXF1ZXN0IGNhbiBiZSBkaXNhYmxlZCBvbiBJRVxudHJ5e2lmKCd1bmRlZmluZWQnICE9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAmJiAoIXhkb21haW4gfHwgaGFzQ09SUykpe3JldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTt9fWNhdGNoKGUpIHt9IC8vIFVzZSBYRG9tYWluUmVxdWVzdCBmb3IgSUU4IGlmIGVuYWJsZXNYRFIgaXMgdHJ1ZVxuLy8gYmVjYXVzZSBsb2FkaW5nIGJhciBrZWVwcyBmbGFzaGluZyB3aGVuIHVzaW5nIGpzb25wLXBvbGxpbmdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS95dWppb3Nha2Evc29ja2UuaW8taWU4LWxvYWRpbmctZXhhbXBsZVxudHJ5e2lmKCd1bmRlZmluZWQnICE9IHR5cGVvZiBYRG9tYWluUmVxdWVzdCAmJiAheHNjaGVtZSAmJiBlbmFibGVzWERSKXtyZXR1cm4gbmV3IFhEb21haW5SZXF1ZXN0KCk7fX1jYXRjaChlKSB7fWlmKCF4ZG9tYWluKXt0cnl7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO31jYXRjaChlKSB7fX19O30se1wiaGFzLWNvcnNcIjoyMn1dLDExOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXttb2R1bGUuZXhwb3J0cyA9IGFmdGVyO2Z1bmN0aW9uIGFmdGVyKGNvdW50LGNhbGxiYWNrLGVycl9jYil7dmFyIGJhaWw9ZmFsc2U7ZXJyX2NiID0gZXJyX2NiIHx8IG5vb3A7cHJveHkuY291bnQgPSBjb3VudDtyZXR1cm4gY291bnQgPT09IDA/Y2FsbGJhY2soKTpwcm94eTtmdW5jdGlvbiBwcm94eShlcnIscmVzdWx0KXtpZihwcm94eS5jb3VudCA8PSAwKXt0aHJvdyBuZXcgRXJyb3IoJ2FmdGVyIGNhbGxlZCB0b28gbWFueSB0aW1lcycpO30tLXByb3h5LmNvdW50OyAvLyBhZnRlciBmaXJzdCBlcnJvciwgcmVzdCBhcmUgcGFzc2VkIHRvIGVycl9jYlxuaWYoZXJyKXtiYWlsID0gdHJ1ZTtjYWxsYmFjayhlcnIpOyAvLyBmdXR1cmUgZXJyb3IgY2FsbGJhY2tzIHdpbGwgZ28gdG8gZXJyb3IgaGFuZGxlclxuY2FsbGJhY2sgPSBlcnJfY2I7fWVsc2UgaWYocHJveHkuY291bnQgPT09IDAgJiYgIWJhaWwpe2NhbGxiYWNrKG51bGwscmVzdWx0KTt9fX1mdW5jdGlvbiBub29wKCl7fX0se31dLDEyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gKiBBbiBhYnN0cmFjdGlvbiBmb3Igc2xpY2luZyBhbiBhcnJheWJ1ZmZlciBldmVuIHdoZW5cbiAqIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSBpcyBub3Qgc3VwcG9ydGVkXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyYXlidWZmZXIsc3RhcnQsZW5kKXt2YXIgYnl0ZXM9YXJyYXlidWZmZXIuYnl0ZUxlbmd0aDtzdGFydCA9IHN0YXJ0IHx8IDA7ZW5kID0gZW5kIHx8IGJ5dGVzO2lmKGFycmF5YnVmZmVyLnNsaWNlKXtyZXR1cm4gYXJyYXlidWZmZXIuc2xpY2Uoc3RhcnQsZW5kKTt9aWYoc3RhcnQgPCAwKXtzdGFydCArPSBieXRlczt9aWYoZW5kIDwgMCl7ZW5kICs9IGJ5dGVzO31pZihlbmQgPiBieXRlcyl7ZW5kID0gYnl0ZXM7fWlmKHN0YXJ0ID49IGJ5dGVzIHx8IHN0YXJ0ID49IGVuZCB8fCBieXRlcyA9PT0gMCl7cmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKTt9dmFyIGFidj1uZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7dmFyIHJlc3VsdD1uZXcgVWludDhBcnJheShlbmQgLSBzdGFydCk7Zm9yKHZhciBpPXN0YXJ0LGlpPTA7aSA8IGVuZDtpKyssaWkrKykge3Jlc3VsdFtpaV0gPSBhYnZbaV07fXJldHVybiByZXN1bHQuYnVmZmVyO307fSx7fV0sMTM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKlxuICogYmFzZTY0LWFycmF5YnVmZmVyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbmlrbGFzdmgvYmFzZTY0LWFycmF5YnVmZmVyXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyIE5pa2xhcyB2b24gSGVydHplblxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovKGZ1bmN0aW9uKGNoYXJzKXtcInVzZSBzdHJpY3RcIjtleHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyKXt2YXIgYnl0ZXM9bmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLGksbGVuPWJ5dGVzLmxlbmd0aCxiYXNlNjQ9XCJcIjtmb3IoaSA9IDA7aSA8IGxlbjtpICs9IDMpIHtiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07YmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpXSAmIDMpIDw8IDQgfCBieXRlc1tpICsgMV0gPj4gNF07YmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpICsgMV0gJiAxNSkgPDwgMiB8IGJ5dGVzW2kgKyAyXSA+PiA2XTtiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaSArIDJdICYgNjNdO31pZihsZW4gJSAzID09PSAyKXtiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsYmFzZTY0Lmxlbmd0aCAtIDEpICsgXCI9XCI7fWVsc2UgaWYobGVuICUgMyA9PT0gMSl7YmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLGJhc2U2NC5sZW5ndGggLSAyKSArIFwiPT1cIjt9cmV0dXJuIGJhc2U2NDt9O2V4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24oYmFzZTY0KXt2YXIgYnVmZmVyTGVuZ3RoPWJhc2U2NC5sZW5ndGggKiAwLjc1LGxlbj1iYXNlNjQubGVuZ3RoLGkscD0wLGVuY29kZWQxLGVuY29kZWQyLGVuY29kZWQzLGVuY29kZWQ0O2lmKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMV0gPT09IFwiPVwiKXtidWZmZXJMZW5ndGgtLTtpZihiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSBcIj1cIil7YnVmZmVyTGVuZ3RoLS07fX12YXIgYXJyYXlidWZmZXI9bmV3IEFycmF5QnVmZmVyKGJ1ZmZlckxlbmd0aCksYnl0ZXM9bmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO2ZvcihpID0gMDtpIDwgbGVuO2kgKz0gNCkge2VuY29kZWQxID0gY2hhcnMuaW5kZXhPZihiYXNlNjRbaV0pO2VuY29kZWQyID0gY2hhcnMuaW5kZXhPZihiYXNlNjRbaSArIDFdKTtlbmNvZGVkMyA9IGNoYXJzLmluZGV4T2YoYmFzZTY0W2kgKyAyXSk7ZW5jb2RlZDQgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpICsgM10pO2J5dGVzW3ArK10gPSBlbmNvZGVkMSA8PCAyIHwgZW5jb2RlZDIgPj4gNDtieXRlc1twKytdID0gKGVuY29kZWQyICYgMTUpIDw8IDQgfCBlbmNvZGVkMyA+PiAyO2J5dGVzW3ArK10gPSAoZW5jb2RlZDMgJiAzKSA8PCA2IHwgZW5jb2RlZDQgJiA2Mzt9cmV0dXJuIGFycmF5YnVmZmVyO307fSkoXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIpO30se31dLDE0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXG4gKiBDcmVhdGUgYSBibG9iIGJ1aWxkZXIgZXZlbiB3aGVuIHZlbmRvciBwcmVmaXhlcyBleGlzdFxuICovdmFyIEJsb2JCdWlsZGVyPWdsb2JhbC5CbG9iQnVpbGRlciB8fCBnbG9iYWwuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgZ2xvYmFsLk1TQmxvYkJ1aWxkZXIgfHwgZ2xvYmFsLk1vekJsb2JCdWlsZGVyOyAvKipcbiAqIENoZWNrIGlmIEJsb2IgY29uc3RydWN0b3IgaXMgc3VwcG9ydGVkXG4gKi92YXIgYmxvYlN1cHBvcnRlZD0oZnVuY3Rpb24oKXt0cnl7dmFyIGE9bmV3IEJsb2IoWydoaSddKTtyZXR1cm4gYS5zaXplID09PSAyO31jYXRjaChlKSB7cmV0dXJuIGZhbHNlO319KSgpOyAvKipcbiAqIENoZWNrIGlmIEJsb2IgY29uc3RydWN0b3Igc3VwcG9ydHMgQXJyYXlCdWZmZXJWaWV3c1xuICogRmFpbHMgaW4gU2FmYXJpIDYsIHNvIHdlIG5lZWQgdG8gbWFwIHRvIEFycmF5QnVmZmVycyB0aGVyZS5cbiAqL3ZhciBibG9iU3VwcG9ydHNBcnJheUJ1ZmZlclZpZXc9YmxvYlN1cHBvcnRlZCAmJiAoZnVuY3Rpb24oKXt0cnl7dmFyIGI9bmV3IEJsb2IoW25ldyBVaW50OEFycmF5KFsxLDJdKV0pO3JldHVybiBiLnNpemUgPT09IDI7fWNhdGNoKGUpIHtyZXR1cm4gZmFsc2U7fX0pKCk7IC8qKlxuICogQ2hlY2sgaWYgQmxvYkJ1aWxkZXIgaXMgc3VwcG9ydGVkXG4gKi92YXIgYmxvYkJ1aWxkZXJTdXBwb3J0ZWQ9QmxvYkJ1aWxkZXIgJiYgQmxvYkJ1aWxkZXIucHJvdG90eXBlLmFwcGVuZCAmJiBCbG9iQnVpbGRlci5wcm90b3R5cGUuZ2V0QmxvYjsgLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBtYXBzIEFycmF5QnVmZmVyVmlld3MgdG8gQXJyYXlCdWZmZXJzXG4gKiBVc2VkIGJ5IEJsb2JCdWlsZGVyIGNvbnN0cnVjdG9yIGFuZCBvbGQgYnJvd3NlcnMgdGhhdCBkaWRuJ3RcbiAqIHN1cHBvcnQgaXQgaW4gdGhlIEJsb2IgY29uc3RydWN0b3IuXG4gKi9mdW5jdGlvbiBtYXBBcnJheUJ1ZmZlclZpZXdzKGFyeSl7Zm9yKHZhciBpPTA7aSA8IGFyeS5sZW5ndGg7aSsrKSB7dmFyIGNodW5rPWFyeVtpXTtpZihjaHVuay5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcil7dmFyIGJ1Zj1jaHVuay5idWZmZXI7IC8vIGlmIHRoaXMgaXMgYSBzdWJhcnJheSwgbWFrZSBhIGNvcHkgc28gd2Ugb25seVxuLy8gaW5jbHVkZSB0aGUgc3ViYXJyYXkgcmVnaW9uIGZyb20gdGhlIHVuZGVybHlpbmcgYnVmZmVyXG5pZihjaHVuay5ieXRlTGVuZ3RoICE9PSBidWYuYnl0ZUxlbmd0aCl7dmFyIGNvcHk9bmV3IFVpbnQ4QXJyYXkoY2h1bmsuYnl0ZUxlbmd0aCk7Y29weS5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmLGNodW5rLmJ5dGVPZmZzZXQsY2h1bmsuYnl0ZUxlbmd0aCkpO2J1ZiA9IGNvcHkuYnVmZmVyO31hcnlbaV0gPSBidWY7fX19ZnVuY3Rpb24gQmxvYkJ1aWxkZXJDb25zdHJ1Y3Rvcihhcnksb3B0aW9ucyl7b3B0aW9ucyA9IG9wdGlvbnMgfHwge307dmFyIGJiPW5ldyBCbG9iQnVpbGRlcigpO21hcEFycmF5QnVmZmVyVmlld3MoYXJ5KTtmb3IodmFyIGk9MDtpIDwgYXJ5Lmxlbmd0aDtpKyspIHtiYi5hcHBlbmQoYXJ5W2ldKTt9cmV0dXJuIG9wdGlvbnMudHlwZT9iYi5nZXRCbG9iKG9wdGlvbnMudHlwZSk6YmIuZ2V0QmxvYigpO307ZnVuY3Rpb24gQmxvYkNvbnN0cnVjdG9yKGFyeSxvcHRpb25zKXttYXBBcnJheUJ1ZmZlclZpZXdzKGFyeSk7cmV0dXJuIG5ldyBCbG9iKGFyeSxvcHRpb25zIHx8IHt9KTt9O21vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7aWYoYmxvYlN1cHBvcnRlZCl7cmV0dXJuIGJsb2JTdXBwb3J0c0FycmF5QnVmZmVyVmlldz9nbG9iYWwuQmxvYjpCbG9iQ29uc3RydWN0b3I7fWVsc2UgaWYoYmxvYkJ1aWxkZXJTdXBwb3J0ZWQpe3JldHVybiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yO31lbHNlIHtyZXR1cm4gdW5kZWZpbmVkO319KSgpO30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHt9XSwxNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL21vZHVsZS5leHBvcnRzID0gRW1pdHRlcjsgLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovZnVuY3Rpb24gRW1pdHRlcihvYmope2lmKG9iailyZXR1cm4gbWl4aW4ob2JqKTt9OyAvKipcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9mdW5jdGlvbiBtaXhpbihvYmope2Zvcih2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7b2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO31yZXR1cm4gb2JqO30gLyoqXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovRW1pdHRlci5wcm90b3R5cGUub24gPSBFbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsZm4pe3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTsodGhpcy5fY2FsbGJhY2tzW2V2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW10pLnB1c2goZm4pO3JldHVybiB0aGlzO307IC8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LGZuKXt2YXIgc2VsZj10aGlzO3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtmdW5jdGlvbiBvbigpe3NlbGYub2ZmKGV2ZW50LG9uKTtmbi5hcHBseSh0aGlzLGFyZ3VtZW50cyk7fW9uLmZuID0gZm47dGhpcy5vbihldmVudCxvbik7cmV0dXJuIHRoaXM7fTsgLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9FbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCxmbil7dGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9OyAvLyBhbGxcbmlmKDAgPT0gYXJndW1lbnRzLmxlbmd0aCl7dGhpcy5fY2FsbGJhY2tzID0ge307cmV0dXJuIHRoaXM7fSAvLyBzcGVjaWZpYyBldmVudFxudmFyIGNhbGxiYWNrcz10aGlzLl9jYWxsYmFja3NbZXZlbnRdO2lmKCFjYWxsYmFja3MpcmV0dXJuIHRoaXM7IC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbmlmKDEgPT0gYXJndW1lbnRzLmxlbmd0aCl7ZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tldmVudF07cmV0dXJuIHRoaXM7fSAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxudmFyIGNiO2Zvcih2YXIgaT0wO2kgPCBjYWxsYmFja3MubGVuZ3RoO2krKykge2NiID0gY2FsbGJhY2tzW2ldO2lmKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pe2NhbGxiYWNrcy5zcGxpY2UoaSwxKTticmVhazt9fXJldHVybiB0aGlzO307IC8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTt2YXIgYXJncz1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSxjYWxsYmFja3M9dGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtpZihjYWxsYmFja3Mpe2NhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtmb3IodmFyIGk9MCxsZW49Y2FsbGJhY2tzLmxlbmd0aDtpIDwgbGVuOysraSkge2NhbGxiYWNrc1tpXS5hcHBseSh0aGlzLGFyZ3MpO319cmV0dXJuIHRoaXM7fTsgLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtyZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTt9OyAvKipcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe3JldHVybiAhIXRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7fTt9LHt9XSwxNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhLGIpe3ZhciBmbj1mdW5jdGlvbiBmbigpe307Zm4ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7YS5wcm90b3R5cGUgPSBuZXcgZm4oKTthLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGE7fTt9LHt9XSwxNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL2V4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oJy4vZGVidWcnKTtleHBvcnRzLmxvZyA9IGxvZztleHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO2V4cG9ydHMuc2F2ZSA9IHNhdmU7ZXhwb3J0cy5sb2FkID0gbG9hZDtleHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztleHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZT9jaHJvbWUuc3RvcmFnZS5sb2NhbDpsb2NhbHN0b3JhZ2UoKTsgLyoqXG4gKiBDb2xvcnMuXG4gKi9leHBvcnRzLmNvbG9ycyA9IFsnbGlnaHRzZWFncmVlbicsJ2ZvcmVzdGdyZWVuJywnZ29sZGVucm9kJywnZG9kZ2VyYmx1ZScsJ2RhcmtvcmNoaWQnLCdjcmltc29uJ107IC8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9mdW5jdGlvbiB1c2VDb2xvcnMoKXsgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbnJldHVybiAnV2Via2l0QXBwZWFyYW5jZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlIHx8ICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG53aW5kb3cuY29uc29sZSAmJiAoY29uc29sZS5maXJlYnVnIHx8IGNvbnNvbGUuZXhjZXB0aW9uICYmIGNvbnNvbGUudGFibGUpIHx8ICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLDEwKSA+PSAzMTt9IC8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KXtyZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7fTsgLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL2Z1bmN0aW9uIGZvcm1hdEFyZ3MoKXt2YXIgYXJncz1hcmd1bWVudHM7dmFyIHVzZUNvbG9ycz10aGlzLnVzZUNvbG9yczthcmdzWzBdID0gKHVzZUNvbG9ycz8nJWMnOicnKSArIHRoaXMubmFtZXNwYWNlICsgKHVzZUNvbG9ycz8nICVjJzonICcpICsgYXJnc1swXSArICh1c2VDb2xvcnM/JyVjICc6JyAnKSArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtpZighdXNlQ29sb3JzKXJldHVybiBhcmdzO3ZhciBjPSdjb2xvcjogJyArIHRoaXMuY29sb3I7YXJncyA9IFthcmdzWzBdLGMsJ2NvbG9yOiBpbmhlcml0J10uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsMSkpOyAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG52YXIgaW5kZXg9MDt2YXIgbGFzdEM9MDthcmdzWzBdLnJlcGxhY2UoLyVbYS16JV0vZyxmdW5jdGlvbihtYXRjaCl7aWYoJyUlJyA9PT0gbWF0Y2gpcmV0dXJuO2luZGV4Kys7aWYoJyVjJyA9PT0gbWF0Y2gpeyAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbi8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG5sYXN0QyA9IGluZGV4O319KTthcmdzLnNwbGljZShsYXN0QywwLGMpO3JldHVybiBhcmdzO30gLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL2Z1bmN0aW9uIGxvZygpeyAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbnJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGUgJiYgY29uc29sZS5sb2cgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csY29uc29sZSxhcmd1bWVudHMpO30gLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpe3RyeXtpZihudWxsID09IG5hbWVzcGFjZXMpe2V4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO31lbHNlIHtleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO319Y2F0Y2goZSkge319IC8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9mdW5jdGlvbiBsb2FkKCl7dmFyIHI7dHJ5e3IgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7fWNhdGNoKGUpIHt9cmV0dXJuIHI7fSAvKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9leHBvcnRzLmVuYWJsZShsb2FkKCkpOyAvKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCl7dHJ5e3JldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO31jYXRjaChlKSB7fX19LHtcIi4vZGVidWdcIjoxOH1dLDE4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL2V4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGRlYnVnO2V4cG9ydHMuY29lcmNlID0gY29lcmNlO2V4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7ZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7ZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtleHBvcnRzLmh1bWFuaXplID0gX2RlcmVxXygnbXMnKTsgLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL2V4cG9ydHMubmFtZXMgPSBbXTtleHBvcnRzLnNraXBzID0gW107IC8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyY2FzZWQgbGV0dGVyLCBpLmUuIFwiblwiLlxuICovZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307IC8qKlxuICogUHJldmlvdXNseSBhc3NpZ25lZCBjb2xvci5cbiAqL3ZhciBwcmV2Q29sb3I9MDsgLyoqXG4gKiBQcmV2aW91cyBsb2cgdGltZXN0YW1wLlxuICovdmFyIHByZXZUaW1lOyAvKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICpcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovZnVuY3Rpb24gc2VsZWN0Q29sb3IoKXtyZXR1cm4gZXhwb3J0cy5jb2xvcnNbcHJldkNvbG9yKysgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO30gLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9mdW5jdGlvbiBkZWJ1ZyhuYW1lc3BhY2UpeyAvLyBkZWZpbmUgdGhlIGBkaXNhYmxlZGAgdmVyc2lvblxuZnVuY3Rpb24gZGlzYWJsZWQoKXt9ZGlzYWJsZWQuZW5hYmxlZCA9IGZhbHNlOyAvLyBkZWZpbmUgdGhlIGBlbmFibGVkYCB2ZXJzaW9uXG5mdW5jdGlvbiBlbmFibGVkKCl7dmFyIHNlbGY9ZW5hYmxlZDsgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbnZhciBjdXJyPStuZXcgRGF0ZSgpO3ZhciBtcz1jdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO3NlbGYuZGlmZiA9IG1zO3NlbGYucHJldiA9IHByZXZUaW1lO3NlbGYuY3VyciA9IGN1cnI7cHJldlRpbWUgPSBjdXJyOyAvLyBhZGQgdGhlIGBjb2xvcmAgaWYgbm90IHNldFxuaWYobnVsbCA9PSBzZWxmLnVzZUNvbG9ycylzZWxmLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7aWYobnVsbCA9PSBzZWxmLmNvbG9yICYmIHNlbGYudXNlQ29sb3JzKXNlbGYuY29sb3IgPSBzZWxlY3RDb2xvcigpO3ZhciBhcmdzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7YXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO2lmKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSl7IC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVvXG5hcmdzID0gWyclbyddLmNvbmNhdChhcmdzKTt9IC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG52YXIgaW5kZXg9MDthcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXolXSkvZyxmdW5jdGlvbihtYXRjaCxmb3JtYXQpeyAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG5pZihtYXRjaCA9PT0gJyUlJylyZXR1cm4gbWF0Y2g7aW5kZXgrKzt2YXIgZm9ybWF0dGVyPWV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO2lmKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpe3ZhciB2YWw9YXJnc1tpbmRleF07bWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLHZhbCk7IC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbmFyZ3Muc3BsaWNlKGluZGV4LDEpO2luZGV4LS07fXJldHVybiBtYXRjaDt9KTtpZignZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5mb3JtYXRBcmdzKXthcmdzID0gZXhwb3J0cy5mb3JtYXRBcmdzLmFwcGx5KHNlbGYsYXJncyk7fXZhciBsb2dGbj1lbmFibGVkLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO2xvZ0ZuLmFwcGx5KHNlbGYsYXJncyk7fWVuYWJsZWQuZW5hYmxlZCA9IHRydWU7dmFyIGZuPWV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpP2VuYWJsZWQ6ZGlzYWJsZWQ7Zm4ubmFtZXNwYWNlID0gbmFtZXNwYWNlO3JldHVybiBmbjt9IC8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL2Z1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKXtleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7dmFyIHNwbGl0PShuYW1lc3BhY2VzIHx8ICcnKS5zcGxpdCgvW1xccyxdKy8pO3ZhciBsZW49c3BsaXQubGVuZ3RoO2Zvcih2YXIgaT0wO2kgPCBsZW47aSsrKSB7aWYoIXNwbGl0W2ldKWNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xubmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCcuKj8nKTtpZihuYW1lc3BhY2VzWzBdID09PSAnLScpe2V4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7fWVsc2Uge2V4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTt9fX0gLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovZnVuY3Rpb24gZGlzYWJsZSgpe2V4cG9ydHMuZW5hYmxlKCcnKTt9IC8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL2Z1bmN0aW9uIGVuYWJsZWQobmFtZSl7dmFyIGksbGVuO2ZvcihpID0gMCxsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDtpIDwgbGVuO2krKykge2lmKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSl7cmV0dXJuIGZhbHNlO319Zm9yKGkgPSAwLGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoO2kgPCBsZW47aSsrKSB7aWYoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKXtyZXR1cm4gdHJ1ZTt9fXJldHVybiBmYWxzZTt9IC8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL2Z1bmN0aW9uIGNvZXJjZSh2YWwpe2lmKHZhbCBpbnN0YW5jZW9mIEVycm9yKXJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7cmV0dXJuIHZhbDt9fSx7XCJtc1wiOjI1fV0sMTk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi92YXIga2V5cz1fZGVyZXFfKCcuL2tleXMnKTt2YXIgaGFzQmluYXJ5PV9kZXJlcV8oJ2hhcy1iaW5hcnknKTt2YXIgc2xpY2VCdWZmZXI9X2RlcmVxXygnYXJyYXlidWZmZXIuc2xpY2UnKTt2YXIgYmFzZTY0ZW5jb2Rlcj1fZGVyZXFfKCdiYXNlNjQtYXJyYXlidWZmZXInKTt2YXIgYWZ0ZXI9X2RlcmVxXygnYWZ0ZXInKTt2YXIgdXRmOD1fZGVyZXFfKCd1dGY4Jyk7IC8qKlxuICogQ2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgYW4gYW5kcm9pZCBicm93c2VyLiBUaGF0IHJlcXVpcmVzIHVzIHRvIHVzZVxuICogQXJyYXlCdWZmZXIgd2l0aCBwb2xsaW5nIHRyYW5zcG9ydHMuLi5cbiAqXG4gKiBodHRwOi8vZ2hpbmRhLm5ldC9qcGVnLWJsb2ItYWpheC1hbmRyb2lkL1xuICovdmFyIGlzQW5kcm9pZD1uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpOyAvKipcbiAqIENoZWNrIGlmIHdlIGFyZSBydW5uaW5nIGluIFBoYW50b21KUy5cbiAqIFVwbG9hZGluZyBhIEJsb2Igd2l0aCBQaGFudG9tSlMgZG9lcyBub3Qgd29yayBjb3JyZWN0bHksIGFzIHJlcG9ydGVkIGhlcmU6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXJpeWEvcGhhbnRvbWpzL2lzc3Vlcy8xMTM5NVxuICogQHR5cGUgYm9vbGVhblxuICovdmFyIGlzUGhhbnRvbUpTPS9QaGFudG9tSlMvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpOyAvKipcbiAqIFdoZW4gdHJ1ZSwgYXZvaWRzIHVzaW5nIEJsb2JzIHRvIGVuY29kZSBwYXlsb2Fkcy5cbiAqIEB0eXBlIGJvb2xlYW5cbiAqL3ZhciBkb250U2VuZEJsb2JzPWlzQW5kcm9pZCB8fCBpc1BoYW50b21KUzsgLyoqXG4gKiBDdXJyZW50IHByb3RvY29sIHZlcnNpb24uXG4gKi9leHBvcnRzLnByb3RvY29sID0gMzsgLyoqXG4gKiBQYWNrZXQgdHlwZXMuXG4gKi92YXIgcGFja2V0cz1leHBvcnRzLnBhY2tldHMgPSB7b3BlbjowLCAvLyBub24td3NcbmNsb3NlOjEsIC8vIG5vbi13c1xucGluZzoyLHBvbmc6MyxtZXNzYWdlOjQsdXBncmFkZTo1LG5vb3A6Nn07dmFyIHBhY2tldHNsaXN0PWtleXMocGFja2V0cyk7IC8qKlxuICogUHJlbWFkZSBlcnJvciBwYWNrZXQuXG4gKi92YXIgZXJyPXt0eXBlOidlcnJvcicsZGF0YToncGFyc2VyIGVycm9yJ307IC8qKlxuICogQ3JlYXRlIGEgYmxvYiBhcGkgZXZlbiBmb3IgYmxvYiBidWlsZGVyIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XG4gKi92YXIgQmxvYj1fZGVyZXFfKCdibG9iJyk7IC8qKlxuICogRW5jb2RlcyBhIHBhY2tldC5cbiAqXG4gKiAgICAgPHBhY2tldCB0eXBlIGlkPiBbIDxkYXRhPiBdXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgNWhlbGxvIHdvcmxkXG4gKiAgICAgM1xuICogICAgIDRcbiAqXG4gKiBCaW5hcnkgaXMgZW5jb2RlZCBpbiBhbiBpZGVudGljYWwgcHJpbmNpcGxlXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9leHBvcnRzLmVuY29kZVBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCxzdXBwb3J0c0JpbmFyeSx1dGY4ZW5jb2RlLGNhbGxiYWNrKXtpZignZnVuY3Rpb24nID09IHR5cGVvZiBzdXBwb3J0c0JpbmFyeSl7Y2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtzdXBwb3J0c0JpbmFyeSA9IGZhbHNlO31pZignZnVuY3Rpb24nID09IHR5cGVvZiB1dGY4ZW5jb2RlKXtjYWxsYmFjayA9IHV0ZjhlbmNvZGU7dXRmOGVuY29kZSA9IG51bGw7fXZhciBkYXRhPXBhY2tldC5kYXRhID09PSB1bmRlZmluZWQ/dW5kZWZpbmVkOnBhY2tldC5kYXRhLmJ1ZmZlciB8fCBwYWNrZXQuZGF0YTtpZihnbG9iYWwuQXJyYXlCdWZmZXIgJiYgZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKXtyZXR1cm4gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKTt9ZWxzZSBpZihCbG9iICYmIGRhdGEgaW5zdGFuY2VvZiBnbG9iYWwuQmxvYil7cmV0dXJuIGVuY29kZUJsb2IocGFja2V0LHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKTt9IC8vIG1pZ2h0IGJlIGFuIG9iamVjdCB3aXRoIHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBkYXRhQXNCYXNlNjRTdHJpbmcgfVxuaWYoZGF0YSAmJiBkYXRhLmJhc2U2NCl7cmV0dXJuIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsY2FsbGJhY2spO30gLy8gU2VuZGluZyBkYXRhIGFzIGEgdXRmLTggc3RyaW5nXG52YXIgZW5jb2RlZD1wYWNrZXRzW3BhY2tldC50eXBlXTsgLy8gZGF0YSBmcmFnbWVudCBpcyBvcHRpb25hbFxuaWYodW5kZWZpbmVkICE9PSBwYWNrZXQuZGF0YSl7ZW5jb2RlZCArPSB1dGY4ZW5jb2RlP3V0ZjguZW5jb2RlKFN0cmluZyhwYWNrZXQuZGF0YSkpOlN0cmluZyhwYWNrZXQuZGF0YSk7fXJldHVybiBjYWxsYmFjaygnJyArIGVuY29kZWQpO307ZnVuY3Rpb24gZW5jb2RlQmFzZTY0T2JqZWN0KHBhY2tldCxjYWxsYmFjayl7IC8vIHBhY2tldCBkYXRhIGlzIGFuIG9iamVjdCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbnZhciBtZXNzYWdlPSdiJyArIGV4cG9ydHMucGFja2V0c1twYWNrZXQudHlwZV0gKyBwYWNrZXQuZGF0YS5kYXRhO3JldHVybiBjYWxsYmFjayhtZXNzYWdlKTt9IC8qKlxuICogRW5jb2RlIHBhY2tldCBoZWxwZXJzIGZvciBiaW5hcnkgdHlwZXNcbiAqL2Z1bmN0aW9uIGVuY29kZUFycmF5QnVmZmVyKHBhY2tldCxzdXBwb3J0c0JpbmFyeSxjYWxsYmFjayl7aWYoIXN1cHBvcnRzQmluYXJ5KXtyZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LGNhbGxiYWNrKTt9dmFyIGRhdGE9cGFja2V0LmRhdGE7dmFyIGNvbnRlbnRBcnJheT1uZXcgVWludDhBcnJheShkYXRhKTt2YXIgcmVzdWx0QnVmZmVyPW5ldyBVaW50OEFycmF5KDEgKyBkYXRhLmJ5dGVMZW5ndGgpO3Jlc3VsdEJ1ZmZlclswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO2Zvcih2YXIgaT0wO2kgPCBjb250ZW50QXJyYXkubGVuZ3RoO2krKykge3Jlc3VsdEJ1ZmZlcltpICsgMV0gPSBjb250ZW50QXJyYXlbaV07fXJldHVybiBjYWxsYmFjayhyZXN1bHRCdWZmZXIuYnVmZmVyKTt9ZnVuY3Rpb24gZW5jb2RlQmxvYkFzQXJyYXlCdWZmZXIocGFja2V0LHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKXtpZighc3VwcG9ydHNCaW5hcnkpe3JldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsY2FsbGJhY2spO312YXIgZnI9bmV3IEZpbGVSZWFkZXIoKTtmci5vbmxvYWQgPSBmdW5jdGlvbigpe3BhY2tldC5kYXRhID0gZnIucmVzdWx0O2V4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCxzdXBwb3J0c0JpbmFyeSx0cnVlLGNhbGxiYWNrKTt9O3JldHVybiBmci5yZWFkQXNBcnJheUJ1ZmZlcihwYWNrZXQuZGF0YSk7fWZ1bmN0aW9uIGVuY29kZUJsb2IocGFja2V0LHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKXtpZighc3VwcG9ydHNCaW5hcnkpe3JldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsY2FsbGJhY2spO31pZihkb250U2VuZEJsb2JzKXtyZXR1cm4gZW5jb2RlQmxvYkFzQXJyYXlCdWZmZXIocGFja2V0LHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKTt9dmFyIGxlbmd0aD1uZXcgVWludDhBcnJheSgxKTtsZW5ndGhbMF0gPSBwYWNrZXRzW3BhY2tldC50eXBlXTt2YXIgYmxvYj1uZXcgQmxvYihbbGVuZ3RoLmJ1ZmZlcixwYWNrZXQuZGF0YV0pO3JldHVybiBjYWxsYmFjayhibG9iKTt9IC8qKlxuICogRW5jb2RlcyBhIHBhY2tldCB3aXRoIGJpbmFyeSBkYXRhIGluIGEgYmFzZTY0IHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQsIGhhcyBgdHlwZWAgYW5kIGBkYXRhYFxuICogQHJldHVybiB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXG4gKi9leHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCxjYWxsYmFjayl7dmFyIG1lc3NhZ2U9J2InICsgZXhwb3J0cy5wYWNrZXRzW3BhY2tldC50eXBlXTtpZihCbG9iICYmIHBhY2tldC5kYXRhIGluc3RhbmNlb2YgZ2xvYmFsLkJsb2Ipe3ZhciBmcj1uZXcgRmlsZVJlYWRlcigpO2ZyLm9ubG9hZCA9IGZ1bmN0aW9uKCl7dmFyIGI2ND1mci5yZXN1bHQuc3BsaXQoJywnKVsxXTtjYWxsYmFjayhtZXNzYWdlICsgYjY0KTt9O3JldHVybiBmci5yZWFkQXNEYXRhVVJMKHBhY2tldC5kYXRhKTt9dmFyIGI2NGRhdGE7dHJ5e2I2NGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsbmV3IFVpbnQ4QXJyYXkocGFja2V0LmRhdGEpKTt9Y2F0Y2goZSkgeyAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB3aXRoIHR5cGVkIGFycmF5c1xudmFyIHR5cGVkPW5ldyBVaW50OEFycmF5KHBhY2tldC5kYXRhKTt2YXIgYmFzaWM9bmV3IEFycmF5KHR5cGVkLmxlbmd0aCk7Zm9yKHZhciBpPTA7aSA8IHR5cGVkLmxlbmd0aDtpKyspIHtiYXNpY1tpXSA9IHR5cGVkW2ldO31iNjRkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGJhc2ljKTt9bWVzc2FnZSArPSBnbG9iYWwuYnRvYShiNjRkYXRhKTtyZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7fTsgLyoqXG4gKiBEZWNvZGVzIGEgcGFja2V0LiBDaGFuZ2VzIGZvcm1hdCB0byBCbG9iIGlmIHJlcXVlc3RlZC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYHR5cGVgIGFuZCBgZGF0YWAgKGlmIGFueSlcbiAqIEBhcGkgcHJpdmF0ZVxuICovZXhwb3J0cy5kZWNvZGVQYWNrZXQgPSBmdW5jdGlvbihkYXRhLGJpbmFyeVR5cGUsdXRmOGRlY29kZSl7IC8vIFN0cmluZyBkYXRhXG5pZih0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJyB8fCBkYXRhID09PSB1bmRlZmluZWQpe2lmKGRhdGEuY2hhckF0KDApID09ICdiJyl7cmV0dXJuIGV4cG9ydHMuZGVjb2RlQmFzZTY0UGFja2V0KGRhdGEuc3Vic3RyKDEpLGJpbmFyeVR5cGUpO31pZih1dGY4ZGVjb2RlKXt0cnl7ZGF0YSA9IHV0ZjguZGVjb2RlKGRhdGEpO31jYXRjaChlKSB7cmV0dXJuIGVycjt9fXZhciB0eXBlPWRhdGEuY2hhckF0KDApO2lmKE51bWJlcih0eXBlKSAhPSB0eXBlIHx8ICFwYWNrZXRzbGlzdFt0eXBlXSl7cmV0dXJuIGVycjt9aWYoZGF0YS5sZW5ndGggPiAxKXtyZXR1cm4ge3R5cGU6cGFja2V0c2xpc3RbdHlwZV0sZGF0YTpkYXRhLnN1YnN0cmluZygxKX07fWVsc2Uge3JldHVybiB7dHlwZTpwYWNrZXRzbGlzdFt0eXBlXX07fX12YXIgYXNBcnJheT1uZXcgVWludDhBcnJheShkYXRhKTt2YXIgdHlwZT1hc0FycmF5WzBdO3ZhciByZXN0PXNsaWNlQnVmZmVyKGRhdGEsMSk7aWYoQmxvYiAmJiBiaW5hcnlUeXBlID09PSAnYmxvYicpe3Jlc3QgPSBuZXcgQmxvYihbcmVzdF0pO31yZXR1cm4ge3R5cGU6cGFja2V0c2xpc3RbdHlwZV0sZGF0YTpyZXN0fTt9OyAvKipcbiAqIERlY29kZXMgYSBwYWNrZXQgZW5jb2RlZCBpbiBhIGJhc2U2NCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYmFzZTY0IGVuY29kZWQgbWVzc2FnZVxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGB0eXBlYCBhbmQgYGRhdGFgIChpZiBhbnkpXG4gKi9leHBvcnRzLmRlY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uKG1zZyxiaW5hcnlUeXBlKXt2YXIgdHlwZT1wYWNrZXRzbGlzdFttc2cuY2hhckF0KDApXTtpZighZ2xvYmFsLkFycmF5QnVmZmVyKXtyZXR1cm4ge3R5cGU6dHlwZSxkYXRhOntiYXNlNjQ6dHJ1ZSxkYXRhOm1zZy5zdWJzdHIoMSl9fTt9dmFyIGRhdGE9YmFzZTY0ZW5jb2Rlci5kZWNvZGUobXNnLnN1YnN0cigxKSk7aWYoYmluYXJ5VHlwZSA9PT0gJ2Jsb2InICYmIEJsb2Ipe2RhdGEgPSBuZXcgQmxvYihbZGF0YV0pO31yZXR1cm4ge3R5cGU6dHlwZSxkYXRhOmRhdGF9O307IC8qKlxuICogRW5jb2RlcyBtdWx0aXBsZSBtZXNzYWdlcyAocGF5bG9hZCkuXG4gKlxuICogICAgIDxsZW5ndGg+OmRhdGFcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAxMTpoZWxsbyB3b3JsZDI6aGlcbiAqXG4gKiBJZiBhbnkgY29udGVudHMgYXJlIGJpbmFyeSwgdGhleSB3aWxsIGJlIGVuY29kZWQgYXMgYmFzZTY0IHN0cmluZ3MuIEJhc2U2NFxuICogZW5jb2RlZCBzdHJpbmdzIGFyZSBtYXJrZWQgd2l0aCBhIGIgYmVmb3JlIHRoZSBsZW5ndGggc3BlY2lmaWVyXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQGFwaSBwcml2YXRlXG4gKi9leHBvcnRzLmVuY29kZVBheWxvYWQgPSBmdW5jdGlvbihwYWNrZXRzLHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKXtpZih0eXBlb2Ygc3VwcG9ydHNCaW5hcnkgPT0gJ2Z1bmN0aW9uJyl7Y2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtzdXBwb3J0c0JpbmFyeSA9IG51bGw7fXZhciBpc0JpbmFyeT1oYXNCaW5hcnkocGFja2V0cyk7aWYoc3VwcG9ydHNCaW5hcnkgJiYgaXNCaW5hcnkpe2lmKEJsb2IgJiYgIWRvbnRTZW5kQmxvYnMpe3JldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IocGFja2V0cyxjYWxsYmFjayk7fXJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyKHBhY2tldHMsY2FsbGJhY2spO31pZighcGFja2V0cy5sZW5ndGgpe3JldHVybiBjYWxsYmFjaygnMDonKTt9ZnVuY3Rpb24gc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2Upe3JldHVybiBtZXNzYWdlLmxlbmd0aCArICc6JyArIG1lc3NhZ2U7fWZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsZG9uZUNhbGxiYWNrKXtleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIWlzQmluYXJ5P2ZhbHNlOnN1cHBvcnRzQmluYXJ5LHRydWUsZnVuY3Rpb24obWVzc2FnZSl7ZG9uZUNhbGxiYWNrKG51bGwsc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2UpKTt9KTt9bWFwKHBhY2tldHMsZW5jb2RlT25lLGZ1bmN0aW9uKGVycixyZXN1bHRzKXtyZXR1cm4gY2FsbGJhY2socmVzdWx0cy5qb2luKCcnKSk7fSk7fTsgLyoqXG4gKiBBc3luYyBhcnJheSBtYXAgdXNpbmcgYWZ0ZXJcbiAqL2Z1bmN0aW9uIG1hcChhcnksZWFjaCxkb25lKXt2YXIgcmVzdWx0PW5ldyBBcnJheShhcnkubGVuZ3RoKTt2YXIgbmV4dD1hZnRlcihhcnkubGVuZ3RoLGRvbmUpO3ZhciBlYWNoV2l0aEluZGV4PWZ1bmN0aW9uIGVhY2hXaXRoSW5kZXgoaSxlbCxjYil7ZWFjaChlbCxmdW5jdGlvbihlcnJvcixtc2cpe3Jlc3VsdFtpXSA9IG1zZztjYihlcnJvcixyZXN1bHQpO30pO307Zm9yKHZhciBpPTA7aSA8IGFyeS5sZW5ndGg7aSsrKSB7ZWFjaFdpdGhJbmRleChpLGFyeVtpXSxuZXh0KTt9fSAvKlxuICogRGVjb2RlcyBkYXRhIHdoZW4gYSBwYXlsb2FkIGlzIG1heWJlIGV4cGVjdGVkLiBQb3NzaWJsZSBiaW5hcnkgY29udGVudHMgYXJlXG4gKiBkZWNvZGVkIGZyb20gdGhlaXIgYmFzZTY0IHJlcHJlc2VudGF0aW9uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL2V4cG9ydHMuZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGRhdGEsYmluYXJ5VHlwZSxjYWxsYmFjayl7aWYodHlwZW9mIGRhdGEgIT0gJ3N0cmluZycpe3JldHVybiBleHBvcnRzLmRlY29kZVBheWxvYWRBc0JpbmFyeShkYXRhLGJpbmFyeVR5cGUsY2FsbGJhY2spO31pZih0eXBlb2YgYmluYXJ5VHlwZSA9PT0gJ2Z1bmN0aW9uJyl7Y2FsbGJhY2sgPSBiaW5hcnlUeXBlO2JpbmFyeVR5cGUgPSBudWxsO312YXIgcGFja2V0O2lmKGRhdGEgPT0gJycpeyAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG5yZXR1cm4gY2FsbGJhY2soZXJyLDAsMSk7fXZhciBsZW5ndGg9Jycsbixtc2c7Zm9yKHZhciBpPTAsbD1kYXRhLmxlbmd0aDtpIDwgbDtpKyspIHt2YXIgY2hyPWRhdGEuY2hhckF0KGkpO2lmKCc6JyAhPSBjaHIpe2xlbmd0aCArPSBjaHI7fWVsc2Uge2lmKCcnID09IGxlbmd0aCB8fCBsZW5ndGggIT0gKG4gPSBOdW1iZXIobGVuZ3RoKSkpeyAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG5yZXR1cm4gY2FsbGJhY2soZXJyLDAsMSk7fW1zZyA9IGRhdGEuc3Vic3RyKGkgKyAxLG4pO2lmKGxlbmd0aCAhPSBtc2cubGVuZ3RoKXsgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxucmV0dXJuIGNhbGxiYWNrKGVyciwwLDEpO31pZihtc2cubGVuZ3RoKXtwYWNrZXQgPSBleHBvcnRzLmRlY29kZVBhY2tldChtc2csYmluYXJ5VHlwZSx0cnVlKTtpZihlcnIudHlwZSA9PSBwYWNrZXQudHlwZSAmJiBlcnIuZGF0YSA9PSBwYWNrZXQuZGF0YSl7IC8vIHBhcnNlciBlcnJvciBpbiBpbmRpdmlkdWFsIHBhY2tldCAtIGlnbm9yaW5nIHBheWxvYWRcbnJldHVybiBjYWxsYmFjayhlcnIsMCwxKTt9dmFyIHJldD1jYWxsYmFjayhwYWNrZXQsaSArIG4sbCk7aWYoZmFsc2UgPT09IHJldClyZXR1cm47fSAvLyBhZHZhbmNlIGN1cnNvclxuaSArPSBuO2xlbmd0aCA9ICcnO319aWYobGVuZ3RoICE9ICcnKXsgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxucmV0dXJuIGNhbGxiYWNrKGVyciwwLDEpO319OyAvKipcbiAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpIGFzIGJpbmFyeS5cbiAqXG4gKiA8MSA9IGJpbmFyeSwgMCA9IHN0cmluZz48bnVtYmVyIGZyb20gMC05PjxudW1iZXIgZnJvbSAwLTk+Wy4uLl08bnVtYmVyXG4gKiAyNTU+PGRhdGE+XG4gKlxuICogRXhhbXBsZTpcbiAqIDEgMyAyNTUgMSAyIDMsIGlmIHRoZSBiaW5hcnkgY29udGVudHMgYXJlIGludGVycHJldGVkIGFzIDggYml0IGludGVnZXJzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQHJldHVybiB7QXJyYXlCdWZmZXJ9IGVuY29kZWQgcGF5bG9hZFxuICogQGFwaSBwcml2YXRlXG4gKi9leHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyID0gZnVuY3Rpb24ocGFja2V0cyxjYWxsYmFjayl7aWYoIXBhY2tldHMubGVuZ3RoKXtyZXR1cm4gY2FsbGJhY2sobmV3IEFycmF5QnVmZmVyKDApKTt9ZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCxkb25lQ2FsbGJhY2spe2V4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCx0cnVlLHRydWUsZnVuY3Rpb24oZGF0YSl7cmV0dXJuIGRvbmVDYWxsYmFjayhudWxsLGRhdGEpO30pO31tYXAocGFja2V0cyxlbmNvZGVPbmUsZnVuY3Rpb24oZXJyLGVuY29kZWRQYWNrZXRzKXt2YXIgdG90YWxMZW5ndGg9ZW5jb2RlZFBhY2tldHMucmVkdWNlKGZ1bmN0aW9uKGFjYyxwKXt2YXIgbGVuO2lmKHR5cGVvZiBwID09PSAnc3RyaW5nJyl7bGVuID0gcC5sZW5ndGg7fWVsc2Uge2xlbiA9IHAuYnl0ZUxlbmd0aDt9cmV0dXJuIGFjYyArIGxlbi50b1N0cmluZygpLmxlbmd0aCArIGxlbiArIDI7IC8vIHN0cmluZy9iaW5hcnkgaWRlbnRpZmllciArIHNlcGFyYXRvciA9IDJcbn0sMCk7dmFyIHJlc3VsdEFycmF5PW5ldyBVaW50OEFycmF5KHRvdGFsTGVuZ3RoKTt2YXIgYnVmZmVySW5kZXg9MDtlbmNvZGVkUGFja2V0cy5mb3JFYWNoKGZ1bmN0aW9uKHApe3ZhciBpc1N0cmluZz10eXBlb2YgcCA9PT0gJ3N0cmluZyc7dmFyIGFiPXA7aWYoaXNTdHJpbmcpe3ZhciB2aWV3PW5ldyBVaW50OEFycmF5KHAubGVuZ3RoKTtmb3IodmFyIGk9MDtpIDwgcC5sZW5ndGg7aSsrKSB7dmlld1tpXSA9IHAuY2hhckNvZGVBdChpKTt9YWIgPSB2aWV3LmJ1ZmZlcjt9aWYoaXNTdHJpbmcpeyAvLyBub3QgdHJ1ZSBiaW5hcnlcbnJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMDt9ZWxzZSB7IC8vIHRydWUgYmluYXJ5XG5yZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDE7fXZhciBsZW5TdHI9YWIuYnl0ZUxlbmd0aC50b1N0cmluZygpO2Zvcih2YXIgaT0wO2kgPCBsZW5TdHIubGVuZ3RoO2krKykge3Jlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gcGFyc2VJbnQobGVuU3RyW2ldKTt9cmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAyNTU7dmFyIHZpZXc9bmV3IFVpbnQ4QXJyYXkoYWIpO2Zvcih2YXIgaT0wO2kgPCB2aWV3Lmxlbmd0aDtpKyspIHtyZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IHZpZXdbaV07fX0pO3JldHVybiBjYWxsYmFjayhyZXN1bHRBcnJheS5idWZmZXIpO30pO307IC8qKlxuICogRW5jb2RlIGFzIEJsb2JcbiAqL2V4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQmxvYiA9IGZ1bmN0aW9uKHBhY2tldHMsY2FsbGJhY2spe2Z1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsZG9uZUNhbGxiYWNrKXtleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsdHJ1ZSx0cnVlLGZ1bmN0aW9uKGVuY29kZWQpe3ZhciBiaW5hcnlJZGVudGlmaWVyPW5ldyBVaW50OEFycmF5KDEpO2JpbmFyeUlkZW50aWZpZXJbMF0gPSAxO2lmKHR5cGVvZiBlbmNvZGVkID09PSAnc3RyaW5nJyl7dmFyIHZpZXc9bmV3IFVpbnQ4QXJyYXkoZW5jb2RlZC5sZW5ndGgpO2Zvcih2YXIgaT0wO2kgPCBlbmNvZGVkLmxlbmd0aDtpKyspIHt2aWV3W2ldID0gZW5jb2RlZC5jaGFyQ29kZUF0KGkpO31lbmNvZGVkID0gdmlldy5idWZmZXI7YmluYXJ5SWRlbnRpZmllclswXSA9IDA7fXZhciBsZW49ZW5jb2RlZCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyP2VuY29kZWQuYnl0ZUxlbmd0aDplbmNvZGVkLnNpemU7dmFyIGxlblN0cj1sZW4udG9TdHJpbmcoKTt2YXIgbGVuZ3RoQXJ5PW5ldyBVaW50OEFycmF5KGxlblN0ci5sZW5ndGggKyAxKTtmb3IodmFyIGk9MDtpIDwgbGVuU3RyLmxlbmd0aDtpKyspIHtsZW5ndGhBcnlbaV0gPSBwYXJzZUludChsZW5TdHJbaV0pO31sZW5ndGhBcnlbbGVuU3RyLmxlbmd0aF0gPSAyNTU7aWYoQmxvYil7dmFyIGJsb2I9bmV3IEJsb2IoW2JpbmFyeUlkZW50aWZpZXIuYnVmZmVyLGxlbmd0aEFyeS5idWZmZXIsZW5jb2RlZF0pO2RvbmVDYWxsYmFjayhudWxsLGJsb2IpO319KTt9bWFwKHBhY2tldHMsZW5jb2RlT25lLGZ1bmN0aW9uKGVycixyZXN1bHRzKXtyZXR1cm4gY2FsbGJhY2sobmV3IEJsb2IocmVzdWx0cykpO30pO307IC8qXG4gKiBEZWNvZGVzIGRhdGEgd2hlbiBhIHBheWxvYWQgaXMgbWF5YmUgZXhwZWN0ZWQuIFN0cmluZ3MgYXJlIGRlY29kZWQgYnlcbiAqIGludGVycHJldGluZyBlYWNoIGJ5dGUgYXMgYSBrZXkgY29kZSBmb3IgZW50cmllcyBtYXJrZWQgdG8gc3RhcnQgd2l0aCAwLiBTZWVcbiAqIGRlc2NyaXB0aW9uIG9mIGVuY29kZVBheWxvYWRBc0JpbmFyeVxuICpcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL2V4cG9ydHMuZGVjb2RlUGF5bG9hZEFzQmluYXJ5ID0gZnVuY3Rpb24oZGF0YSxiaW5hcnlUeXBlLGNhbGxiYWNrKXtpZih0eXBlb2YgYmluYXJ5VHlwZSA9PT0gJ2Z1bmN0aW9uJyl7Y2FsbGJhY2sgPSBiaW5hcnlUeXBlO2JpbmFyeVR5cGUgPSBudWxsO312YXIgYnVmZmVyVGFpbD1kYXRhO3ZhciBidWZmZXJzPVtdO3ZhciBudW1iZXJUb29Mb25nPWZhbHNlO3doaWxlKGJ1ZmZlclRhaWwuYnl0ZUxlbmd0aCA+IDApIHt2YXIgdGFpbEFycmF5PW5ldyBVaW50OEFycmF5KGJ1ZmZlclRhaWwpO3ZhciBpc1N0cmluZz10YWlsQXJyYXlbMF0gPT09IDA7dmFyIG1zZ0xlbmd0aD0nJztmb3IodmFyIGk9MTs7aSsrKSB7aWYodGFpbEFycmF5W2ldID09IDI1NSlicmVhaztpZihtc2dMZW5ndGgubGVuZ3RoID4gMzEwKXtudW1iZXJUb29Mb25nID0gdHJ1ZTticmVhazt9bXNnTGVuZ3RoICs9IHRhaWxBcnJheVtpXTt9aWYobnVtYmVyVG9vTG9uZylyZXR1cm4gY2FsbGJhY2soZXJyLDAsMSk7YnVmZmVyVGFpbCA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsMiArIG1zZ0xlbmd0aC5sZW5ndGgpO21zZ0xlbmd0aCA9IHBhcnNlSW50KG1zZ0xlbmd0aCk7dmFyIG1zZz1zbGljZUJ1ZmZlcihidWZmZXJUYWlsLDAsbXNnTGVuZ3RoKTtpZihpc1N0cmluZyl7dHJ5e21zZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxuZXcgVWludDhBcnJheShtc2cpKTt9Y2F0Y2goZSkgeyAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB0byB0eXBlZCBhcnJheXNcbnZhciB0eXBlZD1uZXcgVWludDhBcnJheShtc2cpO21zZyA9ICcnO2Zvcih2YXIgaT0wO2kgPCB0eXBlZC5sZW5ndGg7aSsrKSB7bXNnICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodHlwZWRbaV0pO319fWJ1ZmZlcnMucHVzaChtc2cpO2J1ZmZlclRhaWwgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLG1zZ0xlbmd0aCk7fXZhciB0b3RhbD1idWZmZXJzLmxlbmd0aDtidWZmZXJzLmZvckVhY2goZnVuY3Rpb24oYnVmZmVyLGkpe2NhbGxiYWNrKGV4cG9ydHMuZGVjb2RlUGFja2V0KGJ1ZmZlcixiaW5hcnlUeXBlLHRydWUpLGksdG90YWwpO30pO307fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se1wiLi9rZXlzXCI6MjAsXCJhZnRlclwiOjExLFwiYXJyYXlidWZmZXIuc2xpY2VcIjoxMixcImJhc2U2NC1hcnJheWJ1ZmZlclwiOjEzLFwiYmxvYlwiOjE0LFwiaGFzLWJpbmFyeVwiOjIxLFwidXRmOFwiOjI5fV0sMjA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAqIEdldHMgdGhlIGtleXMgZm9yIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0ga2V5c1xuICogQGFwaSBwcml2YXRlXG4gKi9tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMob2JqKXt2YXIgYXJyPVtdO3ZhciBoYXM9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtmb3IodmFyIGkgaW4gb2JqKSB7aWYoaGFzLmNhbGwob2JqLGkpKXthcnIucHVzaChpKTt9fXJldHVybiBhcnI7fTt9LHt9XSwyMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovdmFyIGlzQXJyYXk9X2RlcmVxXygnaXNhcnJheScpOyAvKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovbW9kdWxlLmV4cG9ydHMgPSBoYXNCaW5hcnk7IC8qKlxuICogQ2hlY2tzIGZvciBiaW5hcnkgZGF0YS5cbiAqXG4gKiBSaWdodCBub3cgb25seSBCdWZmZXIgYW5kIEFycmF5QnVmZmVyIGFyZSBzdXBwb3J0ZWQuLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbnl0aGluZ1xuICogQGFwaSBwdWJsaWNcbiAqL2Z1bmN0aW9uIGhhc0JpbmFyeShkYXRhKXtmdW5jdGlvbiBfaGFzQmluYXJ5KG9iail7aWYoIW9iailyZXR1cm4gZmFsc2U7aWYoZ2xvYmFsLkJ1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgZ2xvYmFsLkFycmF5QnVmZmVyICYmIG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGdsb2JhbC5CbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IgfHwgZ2xvYmFsLkZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSl7cmV0dXJuIHRydWU7fWlmKGlzQXJyYXkob2JqKSl7Zm9yKHZhciBpPTA7aSA8IG9iai5sZW5ndGg7aSsrKSB7aWYoX2hhc0JpbmFyeShvYmpbaV0pKXtyZXR1cm4gdHJ1ZTt9fX1lbHNlIGlmKG9iaiAmJiAnb2JqZWN0JyA9PSB0eXBlb2Ygb2JqKXtpZihvYmoudG9KU09OKXtvYmogPSBvYmoudG9KU09OKCk7fWZvcih2YXIga2V5IGluIG9iaikge2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosa2V5KSAmJiBfaGFzQmluYXJ5KG9ialtrZXldKSl7cmV0dXJuIHRydWU7fX19cmV0dXJuIGZhbHNlO31yZXR1cm4gX2hhc0JpbmFyeShkYXRhKTt9fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se1wiaXNhcnJheVwiOjI0fV0sMjI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICpcbiAqIExvZ2ljIGJvcnJvd2VkIGZyb20gTW9kZXJuaXpyOlxuICpcbiAqICAgLSBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvY29ycy5qc1xuICovdHJ5e21vZHVsZS5leHBvcnRzID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKTt9Y2F0Y2goZXJyKSB7IC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbi8vIHdoZW4gdHJ5aW5nIHRvIGNyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmYWxzZTt9fSx7fV0sMjM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe3ZhciBpbmRleE9mPVtdLmluZGV4T2Y7bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsb2JqKXtpZihpbmRleE9mKXJldHVybiBhcnIuaW5kZXhPZihvYmopO2Zvcih2YXIgaT0wO2kgPCBhcnIubGVuZ3RoOysraSkge2lmKGFycltpXSA9PT0gb2JqKXJldHVybiBpO31yZXR1cm4gLTE7fTt9LHt9XSwyNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKGFycil7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7fTt9LHt9XSwyNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICogSGVscGVycy5cbiAqL3ZhciBzPTEwMDA7dmFyIG09cyAqIDYwO3ZhciBoPW0gKiA2MDt2YXIgZD1oICogMjQ7dmFyIHk9ZCAqIDM2NS4yNTsgLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsLG9wdGlvbnMpe29wdGlvbnMgPSBvcHRpb25zIHx8IHt9O2lmKCdzdHJpbmcnID09IHR5cGVvZiB2YWwpcmV0dXJuIHBhcnNlKHZhbCk7cmV0dXJuIG9wdGlvbnMubG9uZz9sb25nKHZhbCk6c2hvcnQodmFsKTt9OyAvKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL2Z1bmN0aW9uIHBhcnNlKHN0cil7c3RyID0gJycgKyBzdHI7aWYoc3RyLmxlbmd0aCA+IDEwMDAwKXJldHVybjt2YXIgbWF0Y2g9L14oKD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhzdHIpO2lmKCFtYXRjaClyZXR1cm47dmFyIG49cGFyc2VGbG9hdChtYXRjaFsxXSk7dmFyIHR5cGU9KG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7c3dpdGNoKHR5cGUpe2Nhc2UgJ3llYXJzJzpjYXNlICd5ZWFyJzpjYXNlICd5cnMnOmNhc2UgJ3lyJzpjYXNlICd5JzpyZXR1cm4gbiAqIHk7Y2FzZSAnZGF5cyc6Y2FzZSAnZGF5JzpjYXNlICdkJzpyZXR1cm4gbiAqIGQ7Y2FzZSAnaG91cnMnOmNhc2UgJ2hvdXInOmNhc2UgJ2hycyc6Y2FzZSAnaHInOmNhc2UgJ2gnOnJldHVybiBuICogaDtjYXNlICdtaW51dGVzJzpjYXNlICdtaW51dGUnOmNhc2UgJ21pbnMnOmNhc2UgJ21pbic6Y2FzZSAnbSc6cmV0dXJuIG4gKiBtO2Nhc2UgJ3NlY29uZHMnOmNhc2UgJ3NlY29uZCc6Y2FzZSAnc2Vjcyc6Y2FzZSAnc2VjJzpjYXNlICdzJzpyZXR1cm4gbiAqIHM7Y2FzZSAnbWlsbGlzZWNvbmRzJzpjYXNlICdtaWxsaXNlY29uZCc6Y2FzZSAnbXNlY3MnOmNhc2UgJ21zZWMnOmNhc2UgJ21zJzpyZXR1cm4gbjt9fSAvKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovZnVuY3Rpb24gc2hvcnQobXMpe2lmKG1zID49IGQpcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztpZihtcyA+PSBoKXJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7aWYobXMgPj0gbSlyZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO2lmKG1zID49IHMpcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztyZXR1cm4gbXMgKyAnbXMnO30gLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovZnVuY3Rpb24gbG9uZyhtcyl7cmV0dXJuIHBsdXJhbChtcyxkLCdkYXknKSB8fCBwbHVyYWwobXMsaCwnaG91cicpIHx8IHBsdXJhbChtcyxtLCdtaW51dGUnKSB8fCBwbHVyYWwobXMscywnc2Vjb25kJykgfHwgbXMgKyAnIG1zJzt9IC8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9mdW5jdGlvbiBwbHVyYWwobXMsbixuYW1lKXtpZihtcyA8IG4pcmV0dXJuO2lmKG1zIDwgbiAqIDEuNSlyZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZTtyZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO319LHt9XSwyNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxuICogSlNPTiBwYXJzZS5cbiAqXG4gKiBAc2VlIEJhc2VkIG9uIGpRdWVyeSNwYXJzZUpTT04gKE1JVCkgYW5kIEpTT04yXG4gKiBAYXBpIHByaXZhdGVcbiAqL3ZhciBydmFsaWRjaGFycz0vXltcXF0sOnt9XFxzXSokLzt2YXIgcnZhbGlkZXNjYXBlPS9cXFxcKD86W1wiXFxcXFxcL2JmbnJ0XXx1WzAtOWEtZkEtRl17NH0pL2c7dmFyIHJ2YWxpZHRva2Vucz0vXCJbXlwiXFxcXFxcblxccl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/XFxkKyg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/L2c7dmFyIHJ2YWxpZGJyYWNlcz0vKD86Xnw6fCwpKD86XFxzKlxcWykrL2c7dmFyIHJ0cmltTGVmdD0vXlxccysvO3ZhciBydHJpbVJpZ2h0PS9cXHMrJC87bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZWpzb24oZGF0YSl7aWYoJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgfHwgIWRhdGEpe3JldHVybiBudWxsO31kYXRhID0gZGF0YS5yZXBsYWNlKHJ0cmltTGVmdCwnJykucmVwbGFjZShydHJpbVJpZ2h0LCcnKTsgLy8gQXR0ZW1wdCB0byBwYXJzZSB1c2luZyB0aGUgbmF0aXZlIEpTT04gcGFyc2VyIGZpcnN0XG5pZihnbG9iYWwuSlNPTiAmJiBKU09OLnBhcnNlKXtyZXR1cm4gSlNPTi5wYXJzZShkYXRhKTt9aWYocnZhbGlkY2hhcnMudGVzdChkYXRhLnJlcGxhY2UocnZhbGlkZXNjYXBlLCdAJykucmVwbGFjZShydmFsaWR0b2tlbnMsJ10nKS5yZXBsYWNlKHJ2YWxpZGJyYWNlcywnJykpKXtyZXR1cm4gbmV3IEZ1bmN0aW9uKCdyZXR1cm4gJyArIGRhdGEpKCk7fX07fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se31dLDI3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gKiBDb21waWxlcyBhIHF1ZXJ5c3RyaW5nXG4gKiBSZXR1cm5zIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL2V4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24ob2JqKXt2YXIgc3RyPScnO2Zvcih2YXIgaSBpbiBvYmopIHtpZihvYmouaGFzT3duUHJvcGVydHkoaSkpe2lmKHN0ci5sZW5ndGgpc3RyICs9ICcmJztzdHIgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtpXSk7fX1yZXR1cm4gc3RyO307IC8qKlxuICogUGFyc2VzIGEgc2ltcGxlIHF1ZXJ5c3RyaW5nIGludG8gYW4gb2JqZWN0XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHFzXG4gKiBAYXBpIHByaXZhdGVcbiAqL2V4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24ocXMpe3ZhciBxcnk9e307dmFyIHBhaXJzPXFzLnNwbGl0KCcmJyk7Zm9yKHZhciBpPTAsbD1wYWlycy5sZW5ndGg7aSA8IGw7aSsrKSB7dmFyIHBhaXI9cGFpcnNbaV0uc3BsaXQoJz0nKTtxcnlbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTt9cmV0dXJuIHFyeTt9O30se31dLDI4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gKiBQYXJzZXMgYW4gVVJJXG4gKlxuICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxuICogQGFwaSBwcml2YXRlXG4gKi92YXIgcmU9L14oPzooPyFbXjpAXSs6W146QFxcL10qQCkoaHR0cHxodHRwc3x3c3x3c3MpOlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oKD86W2EtZjAtOV17MCw0fTopezIsN31bYS1mMC05XXswLDR9fFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87dmFyIHBhcnRzPVsnc291cmNlJywncHJvdG9jb2wnLCdhdXRob3JpdHknLCd1c2VySW5mbycsJ3VzZXInLCdwYXNzd29yZCcsJ2hvc3QnLCdwb3J0JywncmVsYXRpdmUnLCdwYXRoJywnZGlyZWN0b3J5JywnZmlsZScsJ3F1ZXJ5JywnYW5jaG9yJ107bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpe3ZhciBzcmM9c3RyLGI9c3RyLmluZGV4T2YoJ1snKSxlPXN0ci5pbmRleE9mKCddJyk7aWYoYiAhPSAtMSAmJiBlICE9IC0xKXtzdHIgPSBzdHIuc3Vic3RyaW5nKDAsYikgKyBzdHIuc3Vic3RyaW5nKGIsZSkucmVwbGFjZSgvOi9nLCc7JykgKyBzdHIuc3Vic3RyaW5nKGUsc3RyLmxlbmd0aCk7fXZhciBtPXJlLmV4ZWMoc3RyIHx8ICcnKSx1cmk9e30saT0xNDt3aGlsZShpLS0pIHt1cmlbcGFydHNbaV1dID0gbVtpXSB8fCAnJzt9aWYoYiAhPSAtMSAmJiBlICE9IC0xKXt1cmkuc291cmNlID0gc3JjO3VyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyaW5nKDEsdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCc6Jyk7dXJpLmF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHkucmVwbGFjZSgnWycsJycpLnJlcGxhY2UoJ10nLCcnKS5yZXBsYWNlKC87L2csJzonKTt1cmkuaXB2NnVyaSA9IHRydWU7fXJldHVybiB1cmk7fTt9LHt9XSwyOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qISBodHRwczovL210aHMuYmUvdXRmOGpzIHYyLjAuMCBieSBAbWF0aGlhcyAqLzsoZnVuY3Rpb24ocm9vdCl7IC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2BcbnZhciBmcmVlRXhwb3J0cz10eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzOyAvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYFxudmFyIGZyZWVNb2R1bGU9dHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlOyAvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLFxuLy8gYW5kIHVzZSBpdCBhcyBgcm9vdGBcbnZhciBmcmVlR2xvYmFsPXR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO2lmKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKXtyb290ID0gZnJlZUdsb2JhbDt9IC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL3ZhciBzdHJpbmdGcm9tQ2hhckNvZGU9U3RyaW5nLmZyb21DaGFyQ29kZTsgLy8gVGFrZW4gZnJvbSBodHRwczovL210aHMuYmUvcHVueWNvZGVcbmZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKXt2YXIgb3V0cHV0PVtdO3ZhciBjb3VudGVyPTA7dmFyIGxlbmd0aD1zdHJpbmcubGVuZ3RoO3ZhciB2YWx1ZTt2YXIgZXh0cmE7d2hpbGUoY291bnRlciA8IGxlbmd0aCkge3ZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtpZih2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpeyAvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcbmV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtpZigoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCl7IC8vIGxvdyBzdXJyb2dhdGVcbm91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7fWVsc2UgeyAvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuLy8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5vdXRwdXQucHVzaCh2YWx1ZSk7Y291bnRlci0tO319ZWxzZSB7b3V0cHV0LnB1c2godmFsdWUpO319cmV0dXJuIG91dHB1dDt9IC8vIFRha2VuIGZyb20gaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlXG5mdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KXt2YXIgbGVuZ3RoPWFycmF5Lmxlbmd0aDt2YXIgaW5kZXg9LTE7dmFyIHZhbHVlO3ZhciBvdXRwdXQ9Jyc7d2hpbGUoKytpbmRleCA8IGxlbmd0aCkge3ZhbHVlID0gYXJyYXlbaW5kZXhdO2lmKHZhbHVlID4gMHhGRkZGKXt2YWx1ZSAtPSAweDEwMDAwO291dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO3ZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjt9b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7fXJldHVybiBvdXRwdXQ7fWZ1bmN0aW9uIGNoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50KXtpZihjb2RlUG9pbnQgPj0gMHhEODAwICYmIGNvZGVQb2ludCA8PSAweERGRkYpe3Rocm93IEVycm9yKCdMb25lIHN1cnJvZ2F0ZSBVKycgKyBjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyAnIGlzIG5vdCBhIHNjYWxhciB2YWx1ZScpO319IC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL2Z1bmN0aW9uIGNyZWF0ZUJ5dGUoY29kZVBvaW50LHNoaWZ0KXtyZXR1cm4gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiBzaGlmdCAmIDB4M0YgfCAweDgwKTt9ZnVuY3Rpb24gZW5jb2RlQ29kZVBvaW50KGNvZGVQb2ludCl7aWYoKGNvZGVQb2ludCAmIDB4RkZGRkZGODApID09IDApeyAvLyAxLWJ5dGUgc2VxdWVuY2VcbnJldHVybiBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50KTt9dmFyIHN5bWJvbD0nJztpZigoY29kZVBvaW50ICYgMHhGRkZGRjgwMCkgPT0gMCl7IC8vIDItYnl0ZSBzZXF1ZW5jZVxuc3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiA2ICYgMHgxRiB8IDB4QzApO31lbHNlIGlmKChjb2RlUG9pbnQgJiAweEZGRkYwMDAwKSA9PSAwKXsgLy8gMy1ieXRlIHNlcXVlbmNlXG5jaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCk7c3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiAxMiAmIDB4MEYgfCAweEUwKTtzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsNik7fWVsc2UgaWYoKGNvZGVQb2ludCAmIDB4RkZFMDAwMDApID09IDApeyAvLyA0LWJ5dGUgc2VxdWVuY2VcbnN5bWJvbCA9IHN0cmluZ0Zyb21DaGFyQ29kZShjb2RlUG9pbnQgPj4gMTggJiAweDA3IHwgMHhGMCk7c3ltYm9sICs9IGNyZWF0ZUJ5dGUoY29kZVBvaW50LDEyKTtzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsNik7fXN5bWJvbCArPSBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50ICYgMHgzRiB8IDB4ODApO3JldHVybiBzeW1ib2w7fWZ1bmN0aW9uIHV0ZjhlbmNvZGUoc3RyaW5nKXt2YXIgY29kZVBvaW50cz11Y3MyZGVjb2RlKHN0cmluZyk7dmFyIGxlbmd0aD1jb2RlUG9pbnRzLmxlbmd0aDt2YXIgaW5kZXg9LTE7dmFyIGNvZGVQb2ludDt2YXIgYnl0ZVN0cmluZz0nJzt3aGlsZSgrK2luZGV4IDwgbGVuZ3RoKSB7Y29kZVBvaW50ID0gY29kZVBvaW50c1tpbmRleF07Ynl0ZVN0cmluZyArPSBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50KTt9cmV0dXJuIGJ5dGVTdHJpbmc7fSAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9mdW5jdGlvbiByZWFkQ29udGludWF0aW9uQnl0ZSgpe2lmKGJ5dGVJbmRleCA+PSBieXRlQ291bnQpe3Rocm93IEVycm9yKCdJbnZhbGlkIGJ5dGUgaW5kZXgnKTt9dmFyIGNvbnRpbnVhdGlvbkJ5dGU9Ynl0ZUFycmF5W2J5dGVJbmRleF0gJiAweEZGO2J5dGVJbmRleCsrO2lmKChjb250aW51YXRpb25CeXRlICYgMHhDMCkgPT0gMHg4MCl7cmV0dXJuIGNvbnRpbnVhdGlvbkJ5dGUgJiAweDNGO30gLy8gSWYgd2UgZW5kIHVwIGhlcmUsIGl04oCZcyBub3QgYSBjb250aW51YXRpb24gYnl0ZVxudGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTt9ZnVuY3Rpb24gZGVjb2RlU3ltYm9sKCl7dmFyIGJ5dGUxO3ZhciBieXRlMjt2YXIgYnl0ZTM7dmFyIGJ5dGU0O3ZhciBjb2RlUG9pbnQ7aWYoYnl0ZUluZGV4ID4gYnl0ZUNvdW50KXt0aHJvdyBFcnJvcignSW52YWxpZCBieXRlIGluZGV4Jyk7fWlmKGJ5dGVJbmRleCA9PSBieXRlQ291bnQpe3JldHVybiBmYWxzZTt9IC8vIFJlYWQgZmlyc3QgYnl0ZVxuYnl0ZTEgPSBieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7Ynl0ZUluZGV4Kys7IC8vIDEtYnl0ZSBzZXF1ZW5jZSAobm8gY29udGludWF0aW9uIGJ5dGVzKVxuaWYoKGJ5dGUxICYgMHg4MCkgPT0gMCl7cmV0dXJuIGJ5dGUxO30gLy8gMi1ieXRlIHNlcXVlbmNlXG5pZigoYnl0ZTEgJiAweEUwKSA9PSAweEMwKXt2YXIgYnl0ZTI9cmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtjb2RlUG9pbnQgPSAoYnl0ZTEgJiAweDFGKSA8PCA2IHwgYnl0ZTI7aWYoY29kZVBvaW50ID49IDB4ODApe3JldHVybiBjb2RlUG9pbnQ7fWVsc2Uge3Rocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7fX0gLy8gMy1ieXRlIHNlcXVlbmNlIChtYXkgaW5jbHVkZSB1bnBhaXJlZCBzdXJyb2dhdGVzKVxuaWYoKGJ5dGUxICYgMHhGMCkgPT0gMHhFMCl7Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO2J5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtjb2RlUG9pbnQgPSAoYnl0ZTEgJiAweDBGKSA8PCAxMiB8IGJ5dGUyIDw8IDYgfCBieXRlMztpZihjb2RlUG9pbnQgPj0gMHgwODAwKXtjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCk7cmV0dXJuIGNvZGVQb2ludDt9ZWxzZSB7dGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTt9fSAvLyA0LWJ5dGUgc2VxdWVuY2VcbmlmKChieXRlMSAmIDB4RjgpID09IDB4RjApe2J5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtieXRlMyA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7Ynl0ZTQgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO2NvZGVQb2ludCA9IChieXRlMSAmIDB4MEYpIDw8IDB4MTIgfCBieXRlMiA8PCAweDBDIHwgYnl0ZTMgPDwgMHgwNiB8IGJ5dGU0O2lmKGNvZGVQb2ludCA+PSAweDAxMDAwMCAmJiBjb2RlUG9pbnQgPD0gMHgxMEZGRkYpe3JldHVybiBjb2RlUG9pbnQ7fX10aHJvdyBFcnJvcignSW52YWxpZCBVVEYtOCBkZXRlY3RlZCcpO312YXIgYnl0ZUFycmF5O3ZhciBieXRlQ291bnQ7dmFyIGJ5dGVJbmRleDtmdW5jdGlvbiB1dGY4ZGVjb2RlKGJ5dGVTdHJpbmcpe2J5dGVBcnJheSA9IHVjczJkZWNvZGUoYnl0ZVN0cmluZyk7Ynl0ZUNvdW50ID0gYnl0ZUFycmF5Lmxlbmd0aDtieXRlSW5kZXggPSAwO3ZhciBjb2RlUG9pbnRzPVtdO3ZhciB0bXA7d2hpbGUoKHRtcCA9IGRlY29kZVN5bWJvbCgpKSAhPT0gZmFsc2UpIHtjb2RlUG9pbnRzLnB1c2godG1wKTt9cmV0dXJuIHVjczJlbmNvZGUoY29kZVBvaW50cyk7fSAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi92YXIgdXRmOD17J3ZlcnNpb24nOicyLjAuMCcsJ2VuY29kZSc6dXRmOGVuY29kZSwnZGVjb2RlJzp1dGY4ZGVjb2RlfTsgLy8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG4vLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5pZih0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCl7ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIHV0Zjg7fSk7fWVsc2UgaWYoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKXtpZihmcmVlTW9kdWxlKXsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcbmZyZWVNb2R1bGUuZXhwb3J0cyA9IHV0Zjg7fWVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxudmFyIG9iamVjdD17fTt2YXIgaGFzT3duUHJvcGVydHk9b2JqZWN0Lmhhc093blByb3BlcnR5O2Zvcih2YXIga2V5IGluIHV0ZjgpIHtoYXNPd25Qcm9wZXJ0eS5jYWxsKHV0Zjgsa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHV0Zjhba2V5XSk7fX19ZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcbnJvb3QudXRmOCA9IHV0Zjg7fX0pKHRoaXMpO30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHt9XSwzMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7J3VzZSBzdHJpY3QnO3ZhciBhbHBoYWJldD0nMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpLGxlbmd0aD02NCxtYXA9e30sc2VlZD0wLGk9MCxwcmV2OyAvKipcbiAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIuXG4gKiBAYXBpIHB1YmxpY1xuICovZnVuY3Rpb24gZW5jb2RlKG51bSl7dmFyIGVuY29kZWQ9Jyc7ZG8ge2VuY29kZWQgPSBhbHBoYWJldFtudW0gJSBsZW5ndGhdICsgZW5jb2RlZDtudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7fXdoaWxlKG51bSA+IDApO3JldHVybiBlbmNvZGVkO30gLyoqXG4gKiBSZXR1cm4gdGhlIGludGVnZXIgdmFsdWUgc3BlY2lmaWVkIGJ5IHRoZSBnaXZlbiBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgaW50ZWdlciB2YWx1ZSByZXByZXNlbnRlZCBieSB0aGUgc3RyaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL2Z1bmN0aW9uIGRlY29kZShzdHIpe3ZhciBkZWNvZGVkPTA7Zm9yKGkgPSAwO2kgPCBzdHIubGVuZ3RoO2krKykge2RlY29kZWQgPSBkZWNvZGVkICogbGVuZ3RoICsgbWFwW3N0ci5jaGFyQXQoaSldO31yZXR1cm4gZGVjb2RlZDt9IC8qKlxuICogWWVhc3Q6IEEgdGlueSBncm93aW5nIGlkIGdlbmVyYXRvci5cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBBIHVuaXF1ZSBpZC5cbiAqIEBhcGkgcHVibGljXG4gKi9mdW5jdGlvbiB5ZWFzdCgpe3ZhciBub3c9ZW5jb2RlKCtuZXcgRGF0ZSgpKTtpZihub3cgIT09IHByZXYpcmV0dXJuIHNlZWQgPSAwLHByZXYgPSBub3c7cmV0dXJuIG5vdyArICcuJyArIGVuY29kZShzZWVkKyspO30gLy9cbi8vIE1hcCBlYWNoIGNoYXJhY3RlciB0byBpdHMgaW5kZXguXG4vL1xuZm9yKDtpIDwgbGVuZ3RoO2krKykgbWFwW2FscGhhYmV0W2ldXSA9IGk7IC8vXG4vLyBFeHBvc2UgdGhlIGB5ZWFzdGAsIGBlbmNvZGVgIGFuZCBgZGVjb2RlYCBmdW5jdGlvbnMuXG4vL1xueWVhc3QuZW5jb2RlID0gZW5jb2RlO3llYXN0LmRlY29kZSA9IGRlY29kZTttb2R1bGUuZXhwb3J0cyA9IHllYXN0O30se31dLDMxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovdmFyIHVybD1fZGVyZXFfKCcuL3VybCcpO3ZhciBwYXJzZXI9X2RlcmVxXygnc29ja2V0LmlvLXBhcnNlcicpO3ZhciBNYW5hZ2VyPV9kZXJlcV8oJy4vbWFuYWdlcicpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50Jyk7IC8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBsb29rdXA7IC8qKlxuICogTWFuYWdlcnMgY2FjaGUuXG4gKi92YXIgY2FjaGU9ZXhwb3J0cy5tYW5hZ2VycyA9IHt9OyAvKipcbiAqIExvb2tzIHVwIGFuIGV4aXN0aW5nIGBNYW5hZ2VyYCBmb3IgbXVsdGlwbGV4aW5nLlxuICogSWYgdGhlIHVzZXIgc3VtbW9uczpcbiAqXG4gKiAgIGBpbygnaHR0cDovL2xvY2FsaG9zdC9hJyk7YFxuICogICBgaW8oJ2h0dHA6Ly9sb2NhbGhvc3QvYicpO2BcbiAqXG4gKiBXZSByZXVzZSB0aGUgZXhpc3RpbmcgaW5zdGFuY2UgYmFzZWQgb24gc2FtZSBzY2hlbWUvcG9ydC9ob3N0LFxuICogYW5kIHdlIGluaXRpYWxpemUgc29ja2V0cyBmb3IgZWFjaCBuYW1lc3BhY2UuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL2Z1bmN0aW9uIGxvb2t1cCh1cmksb3B0cyl7aWYodHlwZW9mIHVyaSA9PSAnb2JqZWN0Jyl7b3B0cyA9IHVyaTt1cmkgPSB1bmRlZmluZWQ7fW9wdHMgPSBvcHRzIHx8IHt9O3ZhciBwYXJzZWQ9dXJsKHVyaSk7dmFyIHNvdXJjZT1wYXJzZWQuc291cmNlO3ZhciBpZD1wYXJzZWQuaWQ7dmFyIHBhdGg9cGFyc2VkLnBhdGg7dmFyIHNhbWVOYW1lc3BhY2U9Y2FjaGVbaWRdICYmIHBhdGggaW4gY2FjaGVbaWRdLm5zcHM7dmFyIG5ld0Nvbm5lY3Rpb249b3B0cy5mb3JjZU5ldyB8fCBvcHRzWydmb3JjZSBuZXcgY29ubmVjdGlvbiddIHx8IGZhbHNlID09PSBvcHRzLm11bHRpcGxleCB8fCBzYW1lTmFtZXNwYWNlO3ZhciBpbztpZihuZXdDb25uZWN0aW9uKXtkZWJ1ZygnaWdub3Jpbmcgc29ja2V0IGNhY2hlIGZvciAlcycsc291cmNlKTtpbyA9IE1hbmFnZXIoc291cmNlLG9wdHMpO31lbHNlIHtpZighY2FjaGVbaWRdKXtkZWJ1ZygnbmV3IGlvIGluc3RhbmNlIGZvciAlcycsc291cmNlKTtjYWNoZVtpZF0gPSBNYW5hZ2VyKHNvdXJjZSxvcHRzKTt9aW8gPSBjYWNoZVtpZF07fXJldHVybiBpby5zb2NrZXQocGFyc2VkLnBhdGgpO30gLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9leHBvcnRzLnByb3RvY29sID0gcGFyc2VyLnByb3RvY29sOyAvKipcbiAqIGBjb25uZWN0YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJpXG4gKiBAYXBpIHB1YmxpY1xuICovZXhwb3J0cy5jb25uZWN0ID0gbG9va3VwOyAvKipcbiAqIEV4cG9zZSBjb25zdHJ1Y3RvcnMgZm9yIHN0YW5kYWxvbmUgYnVpbGQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL2V4cG9ydHMuTWFuYWdlciA9IF9kZXJlcV8oJy4vbWFuYWdlcicpO2V4cG9ydHMuU29ja2V0ID0gX2RlcmVxXygnLi9zb2NrZXQnKTt9LHtcIi4vbWFuYWdlclwiOjMyLFwiLi9zb2NrZXRcIjozNCxcIi4vdXJsXCI6MzUsXCJkZWJ1Z1wiOjM5LFwic29ja2V0LmlvLXBhcnNlclwiOjQ3fV0sMzI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi92YXIgZWlvPV9kZXJlcV8oJ2VuZ2luZS5pby1jbGllbnQnKTt2YXIgU29ja2V0PV9kZXJlcV8oJy4vc29ja2V0Jyk7dmFyIEVtaXR0ZXI9X2RlcmVxXygnY29tcG9uZW50LWVtaXR0ZXInKTt2YXIgcGFyc2VyPV9kZXJlcV8oJ3NvY2tldC5pby1wYXJzZXInKTt2YXIgb249X2RlcmVxXygnLi9vbicpO3ZhciBiaW5kPV9kZXJlcV8oJ2NvbXBvbmVudC1iaW5kJyk7dmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6bWFuYWdlcicpO3ZhciBpbmRleE9mPV9kZXJlcV8oJ2luZGV4b2YnKTt2YXIgQmFja29mZj1fZGVyZXFfKCdiYWNrbzInKTsgLyoqXG4gKiBJRTYrIGhhc093blByb3BlcnR5XG4gKi92YXIgaGFzPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7IC8qKlxuICogTW9kdWxlIGV4cG9ydHNcbiAqL21vZHVsZS5leHBvcnRzID0gTWFuYWdlcjsgLyoqXG4gKiBgTWFuYWdlcmAgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGVuZ2luZSBpbnN0YW5jZSBvciBlbmdpbmUgdXJpL29wdHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovZnVuY3Rpb24gTWFuYWdlcih1cmksb3B0cyl7aWYoISh0aGlzIGluc3RhbmNlb2YgTWFuYWdlcikpcmV0dXJuIG5ldyBNYW5hZ2VyKHVyaSxvcHRzKTtpZih1cmkgJiYgJ29iamVjdCcgPT0gdHlwZW9mIHVyaSl7b3B0cyA9IHVyaTt1cmkgPSB1bmRlZmluZWQ7fW9wdHMgPSBvcHRzIHx8IHt9O29wdHMucGF0aCA9IG9wdHMucGF0aCB8fCAnL3NvY2tldC5pbyc7dGhpcy5uc3BzID0ge307dGhpcy5zdWJzID0gW107dGhpcy5vcHRzID0gb3B0czt0aGlzLnJlY29ubmVjdGlvbihvcHRzLnJlY29ubmVjdGlvbiAhPT0gZmFsc2UpO3RoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7dGhpcy5yZWNvbm5lY3Rpb25EZWxheShvcHRzLnJlY29ubmVjdGlvbkRlbGF5IHx8IDEwMDApO3RoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgob3B0cy5yZWNvbm5lY3Rpb25EZWxheU1heCB8fCA1MDAwKTt0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3Iob3B0cy5yYW5kb21pemF0aW9uRmFjdG9yIHx8IDAuNSk7dGhpcy5iYWNrb2ZmID0gbmV3IEJhY2tvZmYoe21pbjp0aGlzLnJlY29ubmVjdGlvbkRlbGF5KCksbWF4OnRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgoKSxqaXR0ZXI6dGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKCl9KTt0aGlzLnRpbWVvdXQobnVsbCA9PSBvcHRzLnRpbWVvdXQ/MjAwMDA6b3B0cy50aW1lb3V0KTt0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJzt0aGlzLnVyaSA9IHVyaTt0aGlzLmNvbm5lY3RpbmcgPSBbXTt0aGlzLmxhc3RQaW5nID0gbnVsbDt0aGlzLmVuY29kaW5nID0gZmFsc2U7dGhpcy5wYWNrZXRCdWZmZXIgPSBbXTt0aGlzLmVuY29kZXIgPSBuZXcgcGFyc2VyLkVuY29kZXIoKTt0aGlzLmRlY29kZXIgPSBuZXcgcGFyc2VyLkRlY29kZXIoKTt0aGlzLmF1dG9Db25uZWN0ID0gb3B0cy5hdXRvQ29ubmVjdCAhPT0gZmFsc2U7aWYodGhpcy5hdXRvQ29ubmVjdCl0aGlzLm9wZW4oKTt9IC8qKlxuICogUHJvcGFnYXRlIGdpdmVuIGV2ZW50IHRvIHNvY2tldHMgYW5kIGVtaXQgb24gYHRoaXNgXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5lbWl0QWxsID0gZnVuY3Rpb24oKXt0aGlzLmVtaXQuYXBwbHkodGhpcyxhcmd1bWVudHMpO2Zvcih2YXIgbnNwIGluIHRoaXMubnNwcykge2lmKGhhcy5jYWxsKHRoaXMubnNwcyxuc3ApKXt0aGlzLm5zcHNbbnNwXS5lbWl0LmFwcGx5KHRoaXMubnNwc1tuc3BdLGFyZ3VtZW50cyk7fX19OyAvKipcbiAqIFVwZGF0ZSBgc29ja2V0LmlkYCBvZiBhbGwgc29ja2V0c1xuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovTWFuYWdlci5wcm90b3R5cGUudXBkYXRlU29ja2V0SWRzID0gZnVuY3Rpb24oKXtmb3IodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtpZihoYXMuY2FsbCh0aGlzLm5zcHMsbnNwKSl7dGhpcy5uc3BzW25zcF0uaWQgPSB0aGlzLmVuZ2luZS5pZDt9fX07IC8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL0VtaXR0ZXIoTWFuYWdlci5wcm90b3R5cGUpOyAvKipcbiAqIFNldHMgdGhlIGByZWNvbm5lY3Rpb25gIGNvbmZpZy5cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRydWUvZmFsc2UgaWYgaXQgc2hvdWxkIGF1dG9tYXRpY2FsbHkgcmVjb25uZWN0XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uID0gZnVuY3Rpb24odil7aWYoIWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbjt0aGlzLl9yZWNvbm5lY3Rpb24gPSAhIXY7cmV0dXJuIHRoaXM7fTsgLyoqXG4gKiBTZXRzIHRoZSByZWNvbm5lY3Rpb24gYXR0ZW1wdHMgY29uZmlnLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzIGJlZm9yZSBnaXZpbmcgdXBcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IGZ1bmN0aW9uKHYpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0czt0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IHY7cmV0dXJuIHRoaXM7fTsgLyoqXG4gKiBTZXRzIHRoZSBkZWxheSBiZXR3ZWVuIHJlY29ubmVjdGlvbnMuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uRGVsYXkgPSBmdW5jdGlvbih2KXtpZighYXJndW1lbnRzLmxlbmd0aClyZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXk7dGhpcy5fcmVjb25uZWN0aW9uRGVsYXkgPSB2O3RoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWluKHYpO3JldHVybiB0aGlzO307TWFuYWdlci5wcm90b3R5cGUucmFuZG9taXphdGlvbkZhY3RvciA9IGZ1bmN0aW9uKHYpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO3RoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3IgPSB2O3RoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0Sml0dGVyKHYpO3JldHVybiB0aGlzO307IC8qKlxuICogU2V0cyB0aGUgbWF4aW11bSBkZWxheSBiZXR3ZWVuIHJlY29ubmVjdGlvbnMuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uRGVsYXlNYXggPSBmdW5jdGlvbih2KXtpZighYXJndW1lbnRzLmxlbmd0aClyZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7dGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXggPSB2O3RoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWF4KHYpO3JldHVybiB0aGlzO307IC8qKlxuICogU2V0cyB0aGUgY29ubmVjdGlvbiB0aW1lb3V0LiBgZmFsc2VgIHRvIGRpc2FibGVcbiAqXG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovTWFuYWdlci5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uKHYpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLl90aW1lb3V0O3RoaXMuX3RpbWVvdXQgPSB2O3JldHVybiB0aGlzO307IC8qKlxuICogU3RhcnRzIHRyeWluZyB0byByZWNvbm5lY3QgaWYgcmVjb25uZWN0aW9uIGlzIGVuYWJsZWQgYW5kIHdlIGhhdmUgbm90XG4gKiBzdGFydGVkIHJlY29ubmVjdGluZyB5ZXRcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL01hbmFnZXIucHJvdG90eXBlLm1heWJlUmVjb25uZWN0T25PcGVuID0gZnVuY3Rpb24oKXsgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuaWYoIXRoaXMucmVjb25uZWN0aW5nICYmIHRoaXMuX3JlY29ubmVjdGlvbiAmJiB0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPT09IDApeyAvLyBrZWVwcyByZWNvbm5lY3Rpb24gZnJvbSBmaXJpbmcgdHdpY2UgZm9yIHRoZSBzYW1lIHJlY29ubmVjdGlvbiBsb29wXG50aGlzLnJlY29ubmVjdCgpO319OyAvKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0IGBzb2NrZXRgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbmFsLCBjYWxsYmFja1xuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL01hbmFnZXIucHJvdG90eXBlLm9wZW4gPSBNYW5hZ2VyLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24oZm4pe2RlYnVnKCdyZWFkeVN0YXRlICVzJyx0aGlzLnJlYWR5U3RhdGUpO2lmKH50aGlzLnJlYWR5U3RhdGUuaW5kZXhPZignb3BlbicpKXJldHVybiB0aGlzO2RlYnVnKCdvcGVuaW5nICVzJyx0aGlzLnVyaSk7dGhpcy5lbmdpbmUgPSBlaW8odGhpcy51cmksdGhpcy5vcHRzKTt2YXIgc29ja2V0PXRoaXMuZW5naW5lO3ZhciBzZWxmPXRoaXM7dGhpcy5yZWFkeVN0YXRlID0gJ29wZW5pbmcnO3RoaXMuc2tpcFJlY29ubmVjdCA9IGZhbHNlOyAvLyBlbWl0IGBvcGVuYFxudmFyIG9wZW5TdWI9b24oc29ja2V0LCdvcGVuJyxmdW5jdGlvbigpe3NlbGYub25vcGVuKCk7Zm4gJiYgZm4oKTt9KTsgLy8gZW1pdCBgY29ubmVjdF9lcnJvcmBcbnZhciBlcnJvclN1Yj1vbihzb2NrZXQsJ2Vycm9yJyxmdW5jdGlvbihkYXRhKXtkZWJ1ZygnY29ubmVjdF9lcnJvcicpO3NlbGYuY2xlYW51cCgpO3NlbGYucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO3NlbGYuZW1pdEFsbCgnY29ubmVjdF9lcnJvcicsZGF0YSk7aWYoZm4pe3ZhciBlcnI9bmV3IEVycm9yKCdDb25uZWN0aW9uIGVycm9yJyk7ZXJyLmRhdGEgPSBkYXRhO2ZuKGVycik7fWVsc2UgeyAvLyBPbmx5IGRvIHRoaXMgaWYgdGhlcmUgaXMgbm8gZm4gdG8gaGFuZGxlIHRoZSBlcnJvclxuc2VsZi5tYXliZVJlY29ubmVjdE9uT3BlbigpO319KTsgLy8gZW1pdCBgY29ubmVjdF90aW1lb3V0YFxuaWYoZmFsc2UgIT09IHRoaXMuX3RpbWVvdXQpe3ZhciB0aW1lb3V0PXRoaXMuX3RpbWVvdXQ7ZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB3aWxsIHRpbWVvdXQgYWZ0ZXIgJWQnLHRpbWVvdXQpOyAvLyBzZXQgdGltZXJcbnZhciB0aW1lcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB0aW1lZCBvdXQgYWZ0ZXIgJWQnLHRpbWVvdXQpO29wZW5TdWIuZGVzdHJveSgpO3NvY2tldC5jbG9zZSgpO3NvY2tldC5lbWl0KCdlcnJvcicsJ3RpbWVvdXQnKTtzZWxmLmVtaXRBbGwoJ2Nvbm5lY3RfdGltZW91dCcsdGltZW91dCk7fSx0aW1lb3V0KTt0aGlzLnN1YnMucHVzaCh7ZGVzdHJveTpmdW5jdGlvbiBkZXN0cm95KCl7Y2xlYXJUaW1lb3V0KHRpbWVyKTt9fSk7fXRoaXMuc3Vicy5wdXNoKG9wZW5TdWIpO3RoaXMuc3Vicy5wdXNoKGVycm9yU3ViKTtyZXR1cm4gdGhpczt9OyAvKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBvcGVuLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovTWFuYWdlci5wcm90b3R5cGUub25vcGVuID0gZnVuY3Rpb24oKXtkZWJ1Zygnb3BlbicpOyAvLyBjbGVhciBvbGQgc3Vic1xudGhpcy5jbGVhbnVwKCk7IC8vIG1hcmsgYXMgb3BlblxudGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO3RoaXMuZW1pdCgnb3BlbicpOyAvLyBhZGQgbmV3IHN1YnNcbnZhciBzb2NrZXQ9dGhpcy5lbmdpbmU7dGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCdkYXRhJyxiaW5kKHRoaXMsJ29uZGF0YScpKSk7dGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCdwaW5nJyxiaW5kKHRoaXMsJ29ucGluZycpKSk7dGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCdwb25nJyxiaW5kKHRoaXMsJ29ucG9uZycpKSk7dGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCdlcnJvcicsYmluZCh0aGlzLCdvbmVycm9yJykpKTt0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsJ2Nsb3NlJyxiaW5kKHRoaXMsJ29uY2xvc2UnKSkpO3RoaXMuc3Vicy5wdXNoKG9uKHRoaXMuZGVjb2RlciwnZGVjb2RlZCcsYmluZCh0aGlzLCdvbmRlY29kZWQnKSkpO307IC8qKlxuICogQ2FsbGVkIHVwb24gYSBwaW5nLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovTWFuYWdlci5wcm90b3R5cGUub25waW5nID0gZnVuY3Rpb24oKXt0aGlzLmxhc3RQaW5nID0gbmV3IERhdGUoKTt0aGlzLmVtaXRBbGwoJ3BpbmcnKTt9OyAvKipcbiAqIENhbGxlZCB1cG9uIGEgcGFja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovTWFuYWdlci5wcm90b3R5cGUub25wb25nID0gZnVuY3Rpb24oKXt0aGlzLmVtaXRBbGwoJ3BvbmcnLG5ldyBEYXRlKCkgLSB0aGlzLmxhc3RQaW5nKTt9OyAvKipcbiAqIENhbGxlZCB3aXRoIGRhdGEuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5vbmRhdGEgPSBmdW5jdGlvbihkYXRhKXt0aGlzLmRlY29kZXIuYWRkKGRhdGEpO307IC8qKlxuICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5vbmRlY29kZWQgPSBmdW5jdGlvbihwYWNrZXQpe3RoaXMuZW1pdCgncGFja2V0JyxwYWNrZXQpO307IC8qKlxuICogQ2FsbGVkIHVwb24gc29ja2V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovTWFuYWdlci5wcm90b3R5cGUub25lcnJvciA9IGZ1bmN0aW9uKGVycil7ZGVidWcoJ2Vycm9yJyxlcnIpO3RoaXMuZW1pdEFsbCgnZXJyb3InLGVycik7fTsgLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxuICpcbiAqIEByZXR1cm4ge1NvY2tldH1cbiAqIEBhcGkgcHVibGljXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5zb2NrZXQgPSBmdW5jdGlvbihuc3Ape3ZhciBzb2NrZXQ9dGhpcy5uc3BzW25zcF07aWYoIXNvY2tldCl7c29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLG5zcCk7dGhpcy5uc3BzW25zcF0gPSBzb2NrZXQ7dmFyIHNlbGY9dGhpcztzb2NrZXQub24oJ2Nvbm5lY3RpbmcnLG9uQ29ubmVjdGluZyk7c29ja2V0Lm9uKCdjb25uZWN0JyxmdW5jdGlvbigpe3NvY2tldC5pZCA9IHNlbGYuZW5naW5lLmlkO30pO2lmKHRoaXMuYXV0b0Nvbm5lY3QpeyAvLyBtYW51YWxseSBjYWxsIGhlcmUgc2luY2UgY29ubmVjdGluZyBldm5ldCBpcyBmaXJlZCBiZWZvcmUgbGlzdGVuaW5nXG5vbkNvbm5lY3RpbmcoKTt9fWZ1bmN0aW9uIG9uQ29ubmVjdGluZygpe2lmKCEgfmluZGV4T2Yoc2VsZi5jb25uZWN0aW5nLHNvY2tldCkpe3NlbGYuY29ubmVjdGluZy5wdXNoKHNvY2tldCk7fX1yZXR1cm4gc29ja2V0O307IC8qKlxuICogQ2FsbGVkIHVwb24gYSBzb2NrZXQgY2xvc2UuXG4gKlxuICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxuICovTWFuYWdlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKHNvY2tldCl7dmFyIGluZGV4PWluZGV4T2YodGhpcy5jb25uZWN0aW5nLHNvY2tldCk7aWYofmluZGV4KXRoaXMuY29ubmVjdGluZy5zcGxpY2UoaW5kZXgsMSk7aWYodGhpcy5jb25uZWN0aW5nLmxlbmd0aClyZXR1cm47dGhpcy5jbG9zZSgpO307IC8qKlxuICogV3JpdGVzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovTWFuYWdlci5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KXtkZWJ1Zygnd3JpdGluZyBwYWNrZXQgJWonLHBhY2tldCk7dmFyIHNlbGY9dGhpcztpZighc2VsZi5lbmNvZGluZyl7IC8vIGVuY29kZSwgdGhlbiB3cml0ZSB0byBlbmdpbmUgd2l0aCByZXN1bHRcbnNlbGYuZW5jb2RpbmcgPSB0cnVlO3RoaXMuZW5jb2Rlci5lbmNvZGUocGFja2V0LGZ1bmN0aW9uKGVuY29kZWRQYWNrZXRzKXtmb3IodmFyIGk9MDtpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoO2krKykge3NlbGYuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldLHBhY2tldC5vcHRpb25zKTt9c2VsZi5lbmNvZGluZyA9IGZhbHNlO3NlbGYucHJvY2Vzc1BhY2tldFF1ZXVlKCk7fSk7fWVsc2UgeyAvLyBhZGQgcGFja2V0IHRvIHRoZSBxdWV1ZVxuc2VsZi5wYWNrZXRCdWZmZXIucHVzaChwYWNrZXQpO319OyAvKipcbiAqIElmIHBhY2tldCBidWZmZXIgaXMgbm9uLWVtcHR5LCBiZWdpbnMgZW5jb2RpbmcgdGhlXG4gKiBuZXh0IHBhY2tldCBpbiBsaW5lLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovTWFuYWdlci5wcm90b3R5cGUucHJvY2Vzc1BhY2tldFF1ZXVlID0gZnVuY3Rpb24oKXtpZih0aGlzLnBhY2tldEJ1ZmZlci5sZW5ndGggPiAwICYmICF0aGlzLmVuY29kaW5nKXt2YXIgcGFjaz10aGlzLnBhY2tldEJ1ZmZlci5zaGlmdCgpO3RoaXMucGFja2V0KHBhY2spO319OyAvKipcbiAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovTWFuYWdlci5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uKCl7ZGVidWcoJ2NsZWFudXAnKTt2YXIgc3ViO3doaWxlKHN1YiA9IHRoaXMuc3Vicy5zaGlmdCgpKSBzdWIuZGVzdHJveSgpO3RoaXMucGFja2V0QnVmZmVyID0gW107dGhpcy5lbmNvZGluZyA9IGZhbHNlO3RoaXMubGFzdFBpbmcgPSBudWxsO3RoaXMuZGVjb2Rlci5kZXN0cm95KCk7fTsgLyoqXG4gKiBDbG9zZSB0aGUgY3VycmVudCBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5jbG9zZSA9IE1hbmFnZXIucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbigpe2RlYnVnKCdkaXNjb25uZWN0Jyk7dGhpcy5za2lwUmVjb25uZWN0ID0gdHJ1ZTt0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO2lmKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUpeyAvLyBgb25jbG9zZWAgd2lsbCBub3QgZmlyZSBiZWNhdXNlXG4vLyBhbiBvcGVuIGV2ZW50IG5ldmVyIGhhcHBlbmVkXG50aGlzLmNsZWFudXAoKTt9dGhpcy5iYWNrb2ZmLnJlc2V0KCk7dGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7aWYodGhpcy5lbmdpbmUpdGhpcy5lbmdpbmUuY2xvc2UoKTt9OyAvKipcbiAqIENhbGxlZCB1cG9uIGVuZ2luZSBjbG9zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL01hbmFnZXIucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbihyZWFzb24pe2RlYnVnKCdvbmNsb3NlJyk7dGhpcy5jbGVhbnVwKCk7dGhpcy5iYWNrb2ZmLnJlc2V0KCk7dGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7dGhpcy5lbWl0KCdjbG9zZScscmVhc29uKTtpZih0aGlzLl9yZWNvbm5lY3Rpb24gJiYgIXRoaXMuc2tpcFJlY29ubmVjdCl7dGhpcy5yZWNvbm5lY3QoKTt9fTsgLyoqXG4gKiBBdHRlbXB0IGEgcmVjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24oKXtpZih0aGlzLnJlY29ubmVjdGluZyB8fCB0aGlzLnNraXBSZWNvbm5lY3QpcmV0dXJuIHRoaXM7dmFyIHNlbGY9dGhpcztpZih0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPj0gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMpe2RlYnVnKCdyZWNvbm5lY3QgZmFpbGVkJyk7dGhpcy5iYWNrb2ZmLnJlc2V0KCk7dGhpcy5lbWl0QWxsKCdyZWNvbm5lY3RfZmFpbGVkJyk7dGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTt9ZWxzZSB7dmFyIGRlbGF5PXRoaXMuYmFja29mZi5kdXJhdGlvbigpO2RlYnVnKCd3aWxsIHdhaXQgJWRtcyBiZWZvcmUgcmVjb25uZWN0IGF0dGVtcHQnLGRlbGF5KTt0aGlzLnJlY29ubmVjdGluZyA9IHRydWU7dmFyIHRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZihzZWxmLnNraXBSZWNvbm5lY3QpcmV0dXJuO2RlYnVnKCdhdHRlbXB0aW5nIHJlY29ubmVjdCcpO3NlbGYuZW1pdEFsbCgncmVjb25uZWN0X2F0dGVtcHQnLHNlbGYuYmFja29mZi5hdHRlbXB0cyk7c2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RpbmcnLHNlbGYuYmFja29mZi5hdHRlbXB0cyk7IC8vIGNoZWNrIGFnYWluIGZvciB0aGUgY2FzZSBzb2NrZXQgY2xvc2VkIGluIGFib3ZlIGV2ZW50c1xuaWYoc2VsZi5za2lwUmVjb25uZWN0KXJldHVybjtzZWxmLm9wZW4oZnVuY3Rpb24oZXJyKXtpZihlcnIpe2RlYnVnKCdyZWNvbm5lY3QgYXR0ZW1wdCBlcnJvcicpO3NlbGYucmVjb25uZWN0aW5nID0gZmFsc2U7c2VsZi5yZWNvbm5lY3QoKTtzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdF9lcnJvcicsZXJyLmRhdGEpO31lbHNlIHtkZWJ1ZygncmVjb25uZWN0IHN1Y2Nlc3MnKTtzZWxmLm9ucmVjb25uZWN0KCk7fX0pO30sZGVsYXkpO3RoaXMuc3Vicy5wdXNoKHtkZXN0cm95OmZ1bmN0aW9uIGRlc3Ryb3koKXtjbGVhclRpbWVvdXQodGltZXIpO319KTt9fTsgLyoqXG4gKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL01hbmFnZXIucHJvdG90eXBlLm9ucmVjb25uZWN0ID0gZnVuY3Rpb24oKXt2YXIgYXR0ZW1wdD10aGlzLmJhY2tvZmYuYXR0ZW1wdHM7dGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTt0aGlzLmJhY2tvZmYucmVzZXQoKTt0aGlzLnVwZGF0ZVNvY2tldElkcygpO3RoaXMuZW1pdEFsbCgncmVjb25uZWN0JyxhdHRlbXB0KTt9O30se1wiLi9vblwiOjMzLFwiLi9zb2NrZXRcIjozNCxcImJhY2tvMlwiOjM2LFwiY29tcG9uZW50LWJpbmRcIjozNyxcImNvbXBvbmVudC1lbWl0dGVyXCI6MzgsXCJkZWJ1Z1wiOjM5LFwiZW5naW5lLmlvLWNsaWVudFwiOjEsXCJpbmRleG9mXCI6NDIsXCJzb2NrZXQuaW8tcGFyc2VyXCI6NDd9XSwzMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9tb2R1bGUuZXhwb3J0cyA9IG9uOyAvKipcbiAqIEhlbHBlciBmb3Igc3Vic2NyaXB0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxFdmVudEVtaXR0ZXJ9IG9iaiB3aXRoIGBFbWl0dGVyYCBtaXhpbiBvciBgRXZlbnRFbWl0dGVyYFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAYXBpIHB1YmxpY1xuICovZnVuY3Rpb24gb24ob2JqLGV2LGZuKXtvYmoub24oZXYsZm4pO3JldHVybiB7ZGVzdHJveTpmdW5jdGlvbiBkZXN0cm95KCl7b2JqLnJlbW92ZUxpc3RlbmVyKGV2LGZuKTt9fTt9fSx7fV0sMzQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi92YXIgcGFyc2VyPV9kZXJlcV8oJ3NvY2tldC5pby1wYXJzZXInKTt2YXIgRW1pdHRlcj1fZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpO3ZhciB0b0FycmF5PV9kZXJlcV8oJ3RvLWFycmF5Jyk7dmFyIG9uPV9kZXJlcV8oJy4vb24nKTt2YXIgYmluZD1fZGVyZXFfKCdjb21wb25lbnQtYmluZCcpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50OnNvY2tldCcpO3ZhciBoYXNCaW49X2RlcmVxXygnaGFzLWJpbmFyeScpOyAvKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gU29ja2V0OyAvKipcbiAqIEludGVybmFsIGV2ZW50cyAoYmxhY2tsaXN0ZWQpLlxuICogVGhlc2UgZXZlbnRzIGNhbid0IGJlIGVtaXR0ZWQgYnkgdGhlIHVzZXIuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi92YXIgZXZlbnRzPXtjb25uZWN0OjEsY29ubmVjdF9lcnJvcjoxLGNvbm5lY3RfdGltZW91dDoxLGNvbm5lY3Rpbmc6MSxkaXNjb25uZWN0OjEsZXJyb3I6MSxyZWNvbm5lY3Q6MSxyZWNvbm5lY3RfYXR0ZW1wdDoxLHJlY29ubmVjdF9mYWlsZWQ6MSxyZWNvbm5lY3RfZXJyb3I6MSxyZWNvbm5lY3Rpbmc6MSxwaW5nOjEscG9uZzoxfTsgLyoqXG4gKiBTaG9ydGN1dCB0byBgRW1pdHRlciNlbWl0YC5cbiAqL3ZhciBlbWl0PUVtaXR0ZXIucHJvdG90eXBlLmVtaXQ7IC8qKlxuICogYFNvY2tldGAgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL2Z1bmN0aW9uIFNvY2tldChpbyxuc3Ape3RoaXMuaW8gPSBpbzt0aGlzLm5zcCA9IG5zcDt0aGlzLmpzb24gPSB0aGlzOyAvLyBjb21wYXRcbnRoaXMuaWRzID0gMDt0aGlzLmFja3MgPSB7fTt0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTt0aGlzLnNlbmRCdWZmZXIgPSBbXTt0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO3RoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtpZih0aGlzLmlvLmF1dG9Db25uZWN0KXRoaXMub3BlbigpO30gLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovRW1pdHRlcihTb2NrZXQucHJvdG90eXBlKTsgLyoqXG4gKiBTdWJzY3JpYmUgdG8gb3BlbiwgY2xvc2UgYW5kIHBhY2tldCBldmVudHNcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1NvY2tldC5wcm90b3R5cGUuc3ViRXZlbnRzID0gZnVuY3Rpb24oKXtpZih0aGlzLnN1YnMpcmV0dXJuO3ZhciBpbz10aGlzLmlvO3RoaXMuc3VicyA9IFtvbihpbywnb3BlbicsYmluZCh0aGlzLCdvbm9wZW4nKSksb24oaW8sJ3BhY2tldCcsYmluZCh0aGlzLCdvbnBhY2tldCcpKSxvbihpbywnY2xvc2UnLGJpbmQodGhpcywnb25jbG9zZScpKV07fTsgLyoqXG4gKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovU29ja2V0LnByb3RvdHlwZS5vcGVuID0gU29ja2V0LnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24oKXtpZih0aGlzLmNvbm5lY3RlZClyZXR1cm4gdGhpczt0aGlzLnN1YkV2ZW50cygpO3RoaXMuaW8ub3BlbigpOyAvLyBlbnN1cmUgb3BlblxuaWYoJ29wZW4nID09IHRoaXMuaW8ucmVhZHlTdGF0ZSl0aGlzLm9ub3BlbigpO3RoaXMuZW1pdCgnY29ubmVjdGluZycpO3JldHVybiB0aGlzO307IC8qKlxuICogU2VuZHMgYSBgbWVzc2FnZWAgZXZlbnQuXG4gKlxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oKXt2YXIgYXJncz10b0FycmF5KGFyZ3VtZW50cyk7YXJncy51bnNoaWZ0KCdtZXNzYWdlJyk7dGhpcy5lbWl0LmFwcGx5KHRoaXMsYXJncyk7cmV0dXJuIHRoaXM7fTsgLyoqXG4gKiBPdmVycmlkZSBgZW1pdGAuXG4gKiBJZiB0aGUgZXZlbnQgaXMgaW4gYGV2ZW50c2AsIGl0J3MgZW1pdHRlZCBub3JtYWxseS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovU29ja2V0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXYpe2lmKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldikpe2VtaXQuYXBwbHkodGhpcyxhcmd1bWVudHMpO3JldHVybiB0aGlzO312YXIgYXJncz10b0FycmF5KGFyZ3VtZW50cyk7dmFyIHBhcnNlclR5cGU9cGFyc2VyLkVWRU5UOyAvLyBkZWZhdWx0XG5pZihoYXNCaW4oYXJncykpe3BhcnNlclR5cGUgPSBwYXJzZXIuQklOQVJZX0VWRU5UO30gLy8gYmluYXJ5XG52YXIgcGFja2V0PXt0eXBlOnBhcnNlclR5cGUsZGF0YTphcmdzfTtwYWNrZXQub3B0aW9ucyA9IHt9O3BhY2tldC5vcHRpb25zLmNvbXByZXNzID0gIXRoaXMuZmxhZ3MgfHwgZmFsc2UgIT09IHRoaXMuZmxhZ3MuY29tcHJlc3M7IC8vIGV2ZW50IGFjayBjYWxsYmFja1xuaWYoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdKXtkZWJ1ZygnZW1pdHRpbmcgcGFja2V0IHdpdGggYWNrIGlkICVkJyx0aGlzLmlkcyk7dGhpcy5hY2tzW3RoaXMuaWRzXSA9IGFyZ3MucG9wKCk7cGFja2V0LmlkID0gdGhpcy5pZHMrKzt9aWYodGhpcy5jb25uZWN0ZWQpe3RoaXMucGFja2V0KHBhY2tldCk7fWVsc2Uge3RoaXMuc2VuZEJ1ZmZlci5wdXNoKHBhY2tldCk7fWRlbGV0ZSB0aGlzLmZsYWdzO3JldHVybiB0aGlzO307IC8qKlxuICogU2VuZHMgYSBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9Tb2NrZXQucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCl7cGFja2V0Lm5zcCA9IHRoaXMubnNwO3RoaXMuaW8ucGFja2V0KHBhY2tldCk7fTsgLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgYG9wZW5gLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovU29ja2V0LnByb3RvdHlwZS5vbm9wZW4gPSBmdW5jdGlvbigpe2RlYnVnKCd0cmFuc3BvcnQgaXMgb3BlbiAtIGNvbm5lY3RpbmcnKTsgLy8gd3JpdGUgY29ubmVjdCBwYWNrZXQgaWYgbmVjZXNzYXJ5XG5pZignLycgIT0gdGhpcy5uc3Ape3RoaXMucGFja2V0KHt0eXBlOnBhcnNlci5DT05ORUNUfSk7fX07IC8qKlxuICogQ2FsbGVkIHVwb24gZW5naW5lIGBjbG9zZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlYXNvblxuICogQGFwaSBwcml2YXRlXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbihyZWFzb24pe2RlYnVnKCdjbG9zZSAoJXMpJyxyZWFzb24pO3RoaXMuY29ubmVjdGVkID0gZmFsc2U7dGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO2RlbGV0ZSB0aGlzLmlkO3RoaXMuZW1pdCgnZGlzY29ubmVjdCcscmVhc29uKTt9OyAvKipcbiAqIENhbGxlZCB3aXRoIHNvY2tldCBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9ucGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KXtpZihwYWNrZXQubnNwICE9IHRoaXMubnNwKXJldHVybjtzd2l0Y2gocGFja2V0LnR5cGUpe2Nhc2UgcGFyc2VyLkNPTk5FQ1Q6dGhpcy5vbmNvbm5lY3QoKTticmVhaztjYXNlIHBhcnNlci5FVkVOVDp0aGlzLm9uZXZlbnQocGFja2V0KTticmVhaztjYXNlIHBhcnNlci5CSU5BUllfRVZFTlQ6dGhpcy5vbmV2ZW50KHBhY2tldCk7YnJlYWs7Y2FzZSBwYXJzZXIuQUNLOnRoaXMub25hY2socGFja2V0KTticmVhaztjYXNlIHBhcnNlci5CSU5BUllfQUNLOnRoaXMub25hY2socGFja2V0KTticmVhaztjYXNlIHBhcnNlci5ESVNDT05ORUNUOnRoaXMub25kaXNjb25uZWN0KCk7YnJlYWs7Y2FzZSBwYXJzZXIuRVJST1I6dGhpcy5lbWl0KCdlcnJvcicscGFja2V0LmRhdGEpO2JyZWFrO319OyAvKipcbiAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovU29ja2V0LnByb3RvdHlwZS5vbmV2ZW50ID0gZnVuY3Rpb24ocGFja2V0KXt2YXIgYXJncz1wYWNrZXQuZGF0YSB8fCBbXTtkZWJ1ZygnZW1pdHRpbmcgZXZlbnQgJWonLGFyZ3MpO2lmKG51bGwgIT0gcGFja2V0LmlkKXtkZWJ1ZygnYXR0YWNoaW5nIGFjayBjYWxsYmFjayB0byBldmVudCcpO2FyZ3MucHVzaCh0aGlzLmFjayhwYWNrZXQuaWQpKTt9aWYodGhpcy5jb25uZWN0ZWQpe2VtaXQuYXBwbHkodGhpcyxhcmdzKTt9ZWxzZSB7dGhpcy5yZWNlaXZlQnVmZmVyLnB1c2goYXJncyk7fX07IC8qKlxuICogUHJvZHVjZXMgYW4gYWNrIGNhbGxiYWNrIHRvIGVtaXQgd2l0aCBhbiBldmVudC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1NvY2tldC5wcm90b3R5cGUuYWNrID0gZnVuY3Rpb24oaWQpe3ZhciBzZWxmPXRoaXM7dmFyIHNlbnQ9ZmFsc2U7cmV0dXJuIGZ1bmN0aW9uKCl7IC8vIHByZXZlbnQgZG91YmxlIGNhbGxiYWNrc1xuaWYoc2VudClyZXR1cm47c2VudCA9IHRydWU7dmFyIGFyZ3M9dG9BcnJheShhcmd1bWVudHMpO2RlYnVnKCdzZW5kaW5nIGFjayAlaicsYXJncyk7dmFyIHR5cGU9aGFzQmluKGFyZ3MpP3BhcnNlci5CSU5BUllfQUNLOnBhcnNlci5BQ0s7c2VsZi5wYWNrZXQoe3R5cGU6dHlwZSxpZDppZCxkYXRhOmFyZ3N9KTt9O307IC8qKlxuICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgYWNrbm93bGVnZW1lbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uYWNrID0gZnVuY3Rpb24ocGFja2V0KXt2YXIgYWNrPXRoaXMuYWNrc1twYWNrZXQuaWRdO2lmKCdmdW5jdGlvbicgPT0gdHlwZW9mIGFjayl7ZGVidWcoJ2NhbGxpbmcgYWNrICVzIHdpdGggJWonLHBhY2tldC5pZCxwYWNrZXQuZGF0YSk7YWNrLmFwcGx5KHRoaXMscGFja2V0LmRhdGEpO2RlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmlkXTt9ZWxzZSB7ZGVidWcoJ2JhZCBhY2sgJXMnLHBhY2tldC5pZCk7fX07IC8qKlxuICogQ2FsbGVkIHVwb24gc2VydmVyIGNvbm5lY3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uY29ubmVjdCA9IGZ1bmN0aW9uKCl7dGhpcy5jb25uZWN0ZWQgPSB0cnVlO3RoaXMuZGlzY29ubmVjdGVkID0gZmFsc2U7dGhpcy5lbWl0KCdjb25uZWN0Jyk7dGhpcy5lbWl0QnVmZmVyZWQoKTt9OyAvKipcbiAqIEVtaXQgYnVmZmVyZWQgZXZlbnRzIChyZWNlaXZlZCBhbmQgZW1pdHRlZCkuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9Tb2NrZXQucHJvdG90eXBlLmVtaXRCdWZmZXJlZCA9IGZ1bmN0aW9uKCl7dmFyIGk7Zm9yKGkgPSAwO2kgPCB0aGlzLnJlY2VpdmVCdWZmZXIubGVuZ3RoO2krKykge2VtaXQuYXBwbHkodGhpcyx0aGlzLnJlY2VpdmVCdWZmZXJbaV0pO310aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtmb3IoaSA9IDA7aSA8IHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGg7aSsrKSB7dGhpcy5wYWNrZXQodGhpcy5zZW5kQnVmZmVyW2ldKTt9dGhpcy5zZW5kQnVmZmVyID0gW107fTsgLyoqXG4gKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgZGlzY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1NvY2tldC5wcm90b3R5cGUub25kaXNjb25uZWN0ID0gZnVuY3Rpb24oKXtkZWJ1Zygnc2VydmVyIGRpc2Nvbm5lY3QgKCVzKScsdGhpcy5uc3ApO3RoaXMuZGVzdHJveSgpO3RoaXMub25jbG9zZSgnaW8gc2VydmVyIGRpc2Nvbm5lY3QnKTt9OyAvKipcbiAqIENhbGxlZCB1cG9uIGZvcmNlZCBjbGllbnQvc2VydmVyIHNpZGUgZGlzY29ubmVjdGlvbnMsXG4gKiB0aGlzIG1ldGhvZCBlbnN1cmVzIHRoZSBtYW5hZ2VyIHN0b3BzIHRyYWNraW5nIHVzIGFuZFxuICogdGhhdCByZWNvbm5lY3Rpb25zIGRvbid0IGdldCB0cmlnZ2VyZWQgZm9yIHRoaXMuXG4gKlxuICogQGFwaSBwcml2YXRlLlxuICovU29ja2V0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKXtpZih0aGlzLnN1YnMpeyAvLyBjbGVhbiBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIHJlY29ubmVjdGlvbnNcbmZvcih2YXIgaT0wO2kgPCB0aGlzLnN1YnMubGVuZ3RoO2krKykge3RoaXMuc3Vic1tpXS5kZXN0cm95KCk7fXRoaXMuc3VicyA9IG51bGw7fXRoaXMuaW8uZGVzdHJveSh0aGlzKTt9OyAvKipcbiAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgbWFudWFsbHkuXG4gKlxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IFNvY2tldC5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCl7aWYodGhpcy5jb25uZWN0ZWQpe2RlYnVnKCdwZXJmb3JtaW5nIGRpc2Nvbm5lY3QgKCVzKScsdGhpcy5uc3ApO3RoaXMucGFja2V0KHt0eXBlOnBhcnNlci5ESVNDT05ORUNUfSk7fSAvLyByZW1vdmUgc29ja2V0IGZyb20gcG9vbFxudGhpcy5kZXN0cm95KCk7aWYodGhpcy5jb25uZWN0ZWQpeyAvLyBmaXJlIGV2ZW50c1xudGhpcy5vbmNsb3NlKCdpbyBjbGllbnQgZGlzY29ubmVjdCcpO31yZXR1cm4gdGhpczt9OyAvKipcbiAqIFNldHMgdGhlIGNvbXByZXNzIGZsYWcuXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBpZiBgdHJ1ZWAsIGNvbXByZXNzZXMgdGhlIHNlbmRpbmcgZGF0YVxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovU29ja2V0LnByb3RvdHlwZS5jb21wcmVzcyA9IGZ1bmN0aW9uKGNvbXByZXNzKXt0aGlzLmZsYWdzID0gdGhpcy5mbGFncyB8fCB7fTt0aGlzLmZsYWdzLmNvbXByZXNzID0gY29tcHJlc3M7cmV0dXJuIHRoaXM7fTt9LHtcIi4vb25cIjozMyxcImNvbXBvbmVudC1iaW5kXCI6MzcsXCJjb21wb25lbnQtZW1pdHRlclwiOjM4LFwiZGVidWdcIjozOSxcImhhcy1iaW5hcnlcIjo0MSxcInNvY2tldC5pby1wYXJzZXJcIjo0NyxcInRvLWFycmF5XCI6NTF9XSwzNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL3ZhciBwYXJzZXVyaT1fZGVyZXFfKCdwYXJzZXVyaScpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50OnVybCcpOyAvKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovbW9kdWxlLmV4cG9ydHMgPSB1cmw7IC8qKlxuICogVVJMIHBhcnNlci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge09iamVjdH0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cbiAqICAgICAgICAgICAgICAgICBEZWZhdWx0cyB0byB3aW5kb3cubG9jYXRpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovZnVuY3Rpb24gdXJsKHVyaSxsb2Mpe3ZhciBvYmo9dXJpOyAvLyBkZWZhdWx0IHRvIHdpbmRvdy5sb2NhdGlvblxudmFyIGxvYz1sb2MgfHwgZ2xvYmFsLmxvY2F0aW9uO2lmKG51bGwgPT0gdXJpKXVyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyBsb2MuaG9zdDsgLy8gcmVsYXRpdmUgcGF0aCBzdXBwb3J0XG5pZignc3RyaW5nJyA9PSB0eXBlb2YgdXJpKXtpZignLycgPT0gdXJpLmNoYXJBdCgwKSl7aWYoJy8nID09IHVyaS5jaGFyQXQoMSkpe3VyaSA9IGxvYy5wcm90b2NvbCArIHVyaTt9ZWxzZSB7dXJpID0gbG9jLmhvc3QgKyB1cmk7fX1pZighL14oaHR0cHM/fHdzcz8pOlxcL1xcLy8udGVzdCh1cmkpKXtkZWJ1ZygncHJvdG9jb2wtbGVzcyB1cmwgJXMnLHVyaSk7aWYoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGxvYyl7dXJpID0gbG9jLnByb3RvY29sICsgJy8vJyArIHVyaTt9ZWxzZSB7dXJpID0gJ2h0dHBzOi8vJyArIHVyaTt9fSAvLyBwYXJzZVxuZGVidWcoJ3BhcnNlICVzJyx1cmkpO29iaiA9IHBhcnNldXJpKHVyaSk7fSAvLyBtYWtlIHN1cmUgd2UgdHJlYXQgYGxvY2FsaG9zdDo4MGAgYW5kIGBsb2NhbGhvc3RgIGVxdWFsbHlcbmlmKCFvYmoucG9ydCl7aWYoL14oaHR0cHx3cykkLy50ZXN0KG9iai5wcm90b2NvbCkpe29iai5wb3J0ID0gJzgwJzt9ZWxzZSBpZigvXihodHRwfHdzKXMkLy50ZXN0KG9iai5wcm90b2NvbCkpe29iai5wb3J0ID0gJzQ0Myc7fX1vYmoucGF0aCA9IG9iai5wYXRoIHx8ICcvJzt2YXIgaXB2Nj1vYmouaG9zdC5pbmRleE9mKCc6JykgIT09IC0xO3ZhciBob3N0PWlwdjY/J1snICsgb2JqLmhvc3QgKyAnXSc6b2JqLmhvc3Q7IC8vIGRlZmluZSB1bmlxdWUgaWRcbm9iai5pZCA9IG9iai5wcm90b2NvbCArICc6Ly8nICsgaG9zdCArICc6JyArIG9iai5wb3J0OyAvLyBkZWZpbmUgaHJlZlxub2JqLmhyZWYgPSBvYmoucHJvdG9jb2wgKyAnOi8vJyArIGhvc3QgKyAobG9jICYmIGxvYy5wb3J0ID09IG9iai5wb3J0PycnOic6JyArIG9iai5wb3J0KTtyZXR1cm4gb2JqO319KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7XCJkZWJ1Z1wiOjM5LFwicGFyc2V1cmlcIjo0NX1dLDM2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXG4gKiBFeHBvc2UgYEJhY2tvZmZgLlxuICovbW9kdWxlLmV4cG9ydHMgPSBCYWNrb2ZmOyAvKipcbiAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cbiAqXG4gKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cbiAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxuICogLSBgaml0dGVyYCBbMF1cbiAqIC0gYGZhY3RvcmAgWzJdXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9mdW5jdGlvbiBCYWNrb2ZmKG9wdHMpe29wdHMgPSBvcHRzIHx8IHt9O3RoaXMubXMgPSBvcHRzLm1pbiB8fCAxMDA7dGhpcy5tYXggPSBvcHRzLm1heCB8fCAxMDAwMDt0aGlzLmZhY3RvciA9IG9wdHMuZmFjdG9yIHx8IDI7dGhpcy5qaXR0ZXIgPSBvcHRzLmppdHRlciA+IDAgJiYgb3B0cy5qaXR0ZXIgPD0gMT9vcHRzLmppdHRlcjowO3RoaXMuYXR0ZW1wdHMgPSAwO30gLyoqXG4gKiBSZXR1cm4gdGhlIGJhY2tvZmYgZHVyYXRpb24uXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL0JhY2tvZmYucHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24oKXt2YXIgbXM9dGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLHRoaXMuYXR0ZW1wdHMrKyk7aWYodGhpcy5qaXR0ZXIpe3ZhciByYW5kPU1hdGgucmFuZG9tKCk7dmFyIGRldmlhdGlvbj1NYXRoLmZsb29yKHJhbmQgKiB0aGlzLmppdHRlciAqIG1zKTttcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwP21zIC0gZGV2aWF0aW9uOm1zICsgZGV2aWF0aW9uO31yZXR1cm4gTWF0aC5taW4obXMsdGhpcy5tYXgpIHwgMDt9OyAvKipcbiAqIFJlc2V0IHRoZSBudW1iZXIgb2YgYXR0ZW1wdHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL0JhY2tvZmYucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXt0aGlzLmF0dGVtcHRzID0gMDt9OyAvKipcbiAqIFNldCB0aGUgbWluaW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9CYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbihtaW4pe3RoaXMubXMgPSBtaW47fTsgLyoqXG4gKiBTZXQgdGhlIG1heGltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovQmFja29mZi5wcm90b3R5cGUuc2V0TWF4ID0gZnVuY3Rpb24obWF4KXt0aGlzLm1heCA9IG1heDt9OyAvKipcbiAqIFNldCB0aGUgaml0dGVyXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL0JhY2tvZmYucHJvdG90eXBlLnNldEppdHRlciA9IGZ1bmN0aW9uKGppdHRlcil7dGhpcy5qaXR0ZXIgPSBqaXR0ZXI7fTt9LHt9XSwzNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxuICogU2xpY2UgcmVmZXJlbmNlLlxuICovdmFyIHNsaWNlPVtdLnNsaWNlOyAvKipcbiAqIEJpbmQgYG9iamAgdG8gYGZuYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gZm4gb3Igc3RyaW5nXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaixmbil7aWYoJ3N0cmluZycgPT0gdHlwZW9mIGZuKWZuID0gb2JqW2ZuXTtpZignZnVuY3Rpb24nICE9IHR5cGVvZiBmbil0aHJvdyBuZXcgRXJyb3IoJ2JpbmQoKSByZXF1aXJlcyBhIGZ1bmN0aW9uJyk7dmFyIGFyZ3M9c2xpY2UuY2FsbChhcmd1bWVudHMsMik7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGZuLmFwcGx5KG9iaixhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTt9O307fSx7fV0sMzg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXG4gKi9tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7IC8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL2Z1bmN0aW9uIEVtaXR0ZXIob2JqKXtpZihvYmopcmV0dXJuIG1peGluKG9iaik7fTsgLyoqXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovZnVuY3Rpb24gbWl4aW4ob2JqKXtmb3IodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge29ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTt9cmV0dXJuIG9iajt9IC8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL0VtaXR0ZXIucHJvdG90eXBlLm9uID0gRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LGZuKXt0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307KHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKS5wdXNoKGZuKTtyZXR1cm4gdGhpczt9OyAvKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL0VtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCxmbil7ZnVuY3Rpb24gb24oKXt0aGlzLm9mZihldmVudCxvbik7Zm4uYXBwbHkodGhpcyxhcmd1bWVudHMpO31vbi5mbiA9IGZuO3RoaXMub24oZXZlbnQsb24pO3JldHVybiB0aGlzO307IC8qKlxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovRW1pdHRlci5wcm90b3R5cGUub2ZmID0gRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsZm4pe3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTsgLy8gYWxsXG5pZigwID09IGFyZ3VtZW50cy5sZW5ndGgpe3RoaXMuX2NhbGxiYWNrcyA9IHt9O3JldHVybiB0aGlzO30gLy8gc3BlY2lmaWMgZXZlbnRcbnZhciBjYWxsYmFja3M9dGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtpZighY2FsbGJhY2tzKXJldHVybiB0aGlzOyAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG5pZigxID09IGFyZ3VtZW50cy5sZW5ndGgpe2RlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO3JldHVybiB0aGlzO30gLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbnZhciBjYjtmb3IodmFyIGk9MDtpIDwgY2FsbGJhY2tzLmxlbmd0aDtpKyspIHtjYiA9IGNhbGxiYWNrc1tpXTtpZihjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKXtjYWxsYmFja3Muc3BsaWNlKGksMSk7YnJlYWs7fX1yZXR1cm4gdGhpczt9OyAvKipcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtNaXhlZH0gLi4uXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICovRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXt0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307dmFyIGFyZ3M9W10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSksY2FsbGJhY2tzPXRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07aWYoY2FsbGJhY2tzKXtjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7Zm9yKHZhciBpPTAsbGVuPWNhbGxiYWNrcy5sZW5ndGg7aSA8IGxlbjsrK2kpIHtjYWxsYmFja3NbaV0uYXBwbHkodGhpcyxhcmdzKTt9fXJldHVybiB0aGlzO307IC8qKlxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL0VtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXt0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307cmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107fTsgLyoqXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL0VtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtyZXR1cm4gISF0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO307fSx7fV0sMzk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe2FyZ3VtZW50c1s0XVsxN11bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpO30se1wiLi9kZWJ1Z1wiOjQwLFwiZHVwXCI6MTd9XSw0MDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7YXJndW1lbnRzWzRdWzE4XVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cyk7fSx7XCJkdXBcIjoxOCxcIm1zXCI6NDR9XSw0MTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovdmFyIGlzQXJyYXk9X2RlcmVxXygnaXNhcnJheScpOyAvKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovbW9kdWxlLmV4cG9ydHMgPSBoYXNCaW5hcnk7IC8qKlxuICogQ2hlY2tzIGZvciBiaW5hcnkgZGF0YS5cbiAqXG4gKiBSaWdodCBub3cgb25seSBCdWZmZXIgYW5kIEFycmF5QnVmZmVyIGFyZSBzdXBwb3J0ZWQuLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbnl0aGluZ1xuICogQGFwaSBwdWJsaWNcbiAqL2Z1bmN0aW9uIGhhc0JpbmFyeShkYXRhKXtmdW5jdGlvbiBfaGFzQmluYXJ5KG9iail7aWYoIW9iailyZXR1cm4gZmFsc2U7aWYoZ2xvYmFsLkJ1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIob2JqKSB8fCBnbG9iYWwuQXJyYXlCdWZmZXIgJiYgb2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgZ2xvYmFsLkJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYiB8fCBnbG9iYWwuRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKXtyZXR1cm4gdHJ1ZTt9aWYoaXNBcnJheShvYmopKXtmb3IodmFyIGk9MDtpIDwgb2JqLmxlbmd0aDtpKyspIHtpZihfaGFzQmluYXJ5KG9ialtpXSkpe3JldHVybiB0cnVlO319fWVsc2UgaWYob2JqICYmICdvYmplY3QnID09IHR5cGVvZiBvYmopeyAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL2hhcy1iaW5hcnkvcHVsbC80XG5pZihvYmoudG9KU09OICYmICdmdW5jdGlvbicgPT0gdHlwZW9mIG9iai50b0pTT04pe29iaiA9IG9iai50b0pTT04oKTt9Zm9yKHZhciBrZXkgaW4gb2JqKSB7aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaixrZXkpICYmIF9oYXNCaW5hcnkob2JqW2tleV0pKXtyZXR1cm4gdHJ1ZTt9fX1yZXR1cm4gZmFsc2U7fXJldHVybiBfaGFzQmluYXJ5KGRhdGEpO319KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7XCJpc2FycmF5XCI6NDN9XSw0MjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7YXJndW1lbnRzWzRdWzIzXVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cyk7fSx7XCJkdXBcIjoyM31dLDQzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXthcmd1bWVudHNbNF1bMjRdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKTt9LHtcImR1cFwiOjI0fV0sNDQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe2FyZ3VtZW50c1s0XVsyNV1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpO30se1wiZHVwXCI6MjV9XSw0NTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7YXJndW1lbnRzWzRdWzI4XVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cyk7fSx7XCJkdXBcIjoyOH1dLDQ2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLypnbG9iYWwgQmxvYixGaWxlKi8gLyoqXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzXG4gKi92YXIgaXNBcnJheT1fZGVyZXFfKCdpc2FycmF5Jyk7dmFyIGlzQnVmPV9kZXJlcV8oJy4vaXMtYnVmZmVyJyk7IC8qKlxuICogUmVwbGFjZXMgZXZlcnkgQnVmZmVyIHwgQXJyYXlCdWZmZXIgaW4gcGFja2V0IHdpdGggYSBudW1iZXJlZCBwbGFjZWhvbGRlci5cbiAqIEFueXRoaW5nIHdpdGggYmxvYnMgb3IgZmlsZXMgc2hvdWxkIGJlIGZlZCB0aHJvdWdoIHJlbW92ZUJsb2JzIGJlZm9yZSBjb21pbmdcbiAqIGhlcmUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXG4gKiBAYXBpIHB1YmxpY1xuICovZXhwb3J0cy5kZWNvbnN0cnVjdFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCl7dmFyIGJ1ZmZlcnM9W107dmFyIHBhY2tldERhdGE9cGFja2V0LmRhdGE7ZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEpe2lmKCFkYXRhKXJldHVybiBkYXRhO2lmKGlzQnVmKGRhdGEpKXt2YXIgcGxhY2Vob2xkZXI9e19wbGFjZWhvbGRlcjp0cnVlLG51bTpidWZmZXJzLmxlbmd0aH07YnVmZmVycy5wdXNoKGRhdGEpO3JldHVybiBwbGFjZWhvbGRlcjt9ZWxzZSBpZihpc0FycmF5KGRhdGEpKXt2YXIgbmV3RGF0YT1uZXcgQXJyYXkoZGF0YS5sZW5ndGgpO2Zvcih2YXIgaT0wO2kgPCBkYXRhLmxlbmd0aDtpKyspIHtuZXdEYXRhW2ldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFbaV0pO31yZXR1cm4gbmV3RGF0YTt9ZWxzZSBpZignb2JqZWN0JyA9PSB0eXBlb2YgZGF0YSAmJiAhKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSl7dmFyIG5ld0RhdGE9e307Zm9yKHZhciBrZXkgaW4gZGF0YSkge25ld0RhdGFba2V5XSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0pO31yZXR1cm4gbmV3RGF0YTt9cmV0dXJuIGRhdGE7fXZhciBwYWNrPXBhY2tldDtwYWNrLmRhdGEgPSBfZGVjb25zdHJ1Y3RQYWNrZXQocGFja2V0RGF0YSk7cGFjay5hdHRhY2htZW50cyA9IGJ1ZmZlcnMubGVuZ3RoOyAvLyBudW1iZXIgb2YgYmluYXJ5ICdhdHRhY2htZW50cydcbnJldHVybiB7cGFja2V0OnBhY2ssYnVmZmVyczpidWZmZXJzfTt9OyAvKipcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gcmVjb25zdHJ1Y3RlZCBwYWNrZXRcbiAqIEBhcGkgcHVibGljXG4gKi9leHBvcnRzLnJlY29uc3RydWN0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0LGJ1ZmZlcnMpe3ZhciBjdXJQbGFjZUhvbGRlcj0wO2Z1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhKXtpZihkYXRhICYmIGRhdGEuX3BsYWNlaG9sZGVyKXt2YXIgYnVmPWJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbnJldHVybiBidWY7fWVsc2UgaWYoaXNBcnJheShkYXRhKSl7Zm9yKHZhciBpPTA7aSA8IGRhdGEubGVuZ3RoO2krKykge2RhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSk7fXJldHVybiBkYXRhO31lbHNlIGlmKGRhdGEgJiYgJ29iamVjdCcgPT0gdHlwZW9mIGRhdGEpe2Zvcih2YXIga2V5IGluIGRhdGEpIHtkYXRhW2tleV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldKTt9cmV0dXJuIGRhdGE7fXJldHVybiBkYXRhO31wYWNrZXQuZGF0YSA9IF9yZWNvbnN0cnVjdFBhY2tldChwYWNrZXQuZGF0YSk7cGFja2V0LmF0dGFjaG1lbnRzID0gdW5kZWZpbmVkOyAvLyBubyBsb25nZXIgdXNlZnVsXG5yZXR1cm4gcGFja2V0O307IC8qKlxuICogQXN5bmNocm9ub3VzbHkgcmVtb3ZlcyBCbG9icyBvciBGaWxlcyBmcm9tIGRhdGEgdmlhXG4gKiBGaWxlUmVhZGVyJ3MgcmVhZEFzQXJyYXlCdWZmZXIgbWV0aG9kLiBVc2VkIGJlZm9yZSBlbmNvZGluZ1xuICogZGF0YSBhcyBtc2dwYWNrLiBDYWxscyBjYWxsYmFjayB3aXRoIHRoZSBibG9ibGVzcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQGFwaSBwcml2YXRlXG4gKi9leHBvcnRzLnJlbW92ZUJsb2JzID0gZnVuY3Rpb24oZGF0YSxjYWxsYmFjayl7ZnVuY3Rpb24gX3JlbW92ZUJsb2JzKG9iaixjdXJLZXksY29udGFpbmluZ09iamVjdCl7aWYoIW9iailyZXR1cm4gb2JqOyAvLyBjb252ZXJ0IGFueSBibG9iXG5pZihnbG9iYWwuQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iIHx8IGdsb2JhbC5GaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpe3BlbmRpbmdCbG9icysrOyAvLyBhc3luYyBmaWxlcmVhZGVyXG52YXIgZmlsZVJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO2ZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKXsgLy8gdGhpcy5yZXN1bHQgPT0gYXJyYXlidWZmZXJcbmlmKGNvbnRhaW5pbmdPYmplY3Qpe2NvbnRhaW5pbmdPYmplY3RbY3VyS2V5XSA9IHRoaXMucmVzdWx0O31lbHNlIHtibG9ibGVzc0RhdGEgPSB0aGlzLnJlc3VsdDt9IC8vIGlmIG5vdGhpbmcgcGVuZGluZyBpdHMgY2FsbGJhY2sgdGltZVxuaWYoISAtLXBlbmRpbmdCbG9icyl7Y2FsbGJhY2soYmxvYmxlc3NEYXRhKTt9fTtmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKG9iaik7IC8vIGJsb2IgLT4gYXJyYXlidWZmZXJcbn1lbHNlIGlmKGlzQXJyYXkob2JqKSl7IC8vIGhhbmRsZSBhcnJheVxuZm9yKHZhciBpPTA7aSA8IG9iai5sZW5ndGg7aSsrKSB7X3JlbW92ZUJsb2JzKG9ialtpXSxpLG9iaik7fX1lbHNlIGlmKG9iaiAmJiAnb2JqZWN0JyA9PSB0eXBlb2Ygb2JqICYmICFpc0J1ZihvYmopKXsgLy8gYW5kIG9iamVjdFxuZm9yKHZhciBrZXkgaW4gb2JqKSB7X3JlbW92ZUJsb2JzKG9ialtrZXldLGtleSxvYmopO319fXZhciBwZW5kaW5nQmxvYnM9MDt2YXIgYmxvYmxlc3NEYXRhPWRhdGE7X3JlbW92ZUJsb2JzKGJsb2JsZXNzRGF0YSk7aWYoIXBlbmRpbmdCbG9icyl7Y2FsbGJhY2soYmxvYmxlc3NEYXRhKTt9fTt9KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7XCIuL2lzLWJ1ZmZlclwiOjQ4LFwiaXNhcnJheVwiOjQzfV0sNDc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi92YXIgZGVidWc9X2RlcmVxXygnZGVidWcnKSgnc29ja2V0LmlvLXBhcnNlcicpO3ZhciBqc29uPV9kZXJlcV8oJ2pzb24zJyk7dmFyIGlzQXJyYXk9X2RlcmVxXygnaXNhcnJheScpO3ZhciBFbWl0dGVyPV9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7dmFyIGJpbmFyeT1fZGVyZXFfKCcuL2JpbmFyeScpO3ZhciBpc0J1Zj1fZGVyZXFfKCcuL2lzLWJ1ZmZlcicpOyAvKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL2V4cG9ydHMucHJvdG9jb2wgPSA0OyAvKipcbiAqIFBhY2tldCB0eXBlcy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovZXhwb3J0cy50eXBlcyA9IFsnQ09OTkVDVCcsJ0RJU0NPTk5FQ1QnLCdFVkVOVCcsJ0JJTkFSWV9FVkVOVCcsJ0FDSycsJ0JJTkFSWV9BQ0snLCdFUlJPUiddOyAvKipcbiAqIFBhY2tldCB0eXBlIGBjb25uZWN0YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovZXhwb3J0cy5DT05ORUNUID0gMDsgLyoqXG4gKiBQYWNrZXQgdHlwZSBgZGlzY29ubmVjdGAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL2V4cG9ydHMuRElTQ09OTkVDVCA9IDE7IC8qKlxuICogUGFja2V0IHR5cGUgYGV2ZW50YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovZXhwb3J0cy5FVkVOVCA9IDI7IC8qKlxuICogUGFja2V0IHR5cGUgYGFja2AuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL2V4cG9ydHMuQUNLID0gMzsgLyoqXG4gKiBQYWNrZXQgdHlwZSBgZXJyb3JgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9leHBvcnRzLkVSUk9SID0gNDsgLyoqXG4gKiBQYWNrZXQgdHlwZSAnYmluYXJ5IGV2ZW50J1xuICpcbiAqIEBhcGkgcHVibGljXG4gKi9leHBvcnRzLkJJTkFSWV9FVkVOVCA9IDU7IC8qKlxuICogUGFja2V0IHR5cGUgYGJpbmFyeSBhY2tgLiBGb3IgYWNrcyB3aXRoIGJpbmFyeSBhcmd1bWVudHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL2V4cG9ydHMuQklOQVJZX0FDSyA9IDY7IC8qKlxuICogRW5jb2RlciBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovZXhwb3J0cy5FbmNvZGVyID0gRW5jb2RlcjsgLyoqXG4gKiBEZWNvZGVyIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9leHBvcnRzLkRlY29kZXIgPSBEZWNvZGVyOyAvKipcbiAqIEEgc29ja2V0LmlvIEVuY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovZnVuY3Rpb24gRW5jb2Rlcigpe30gLyoqXG4gKiBFbmNvZGUgYSBwYWNrZXQgYXMgYSBzaW5nbGUgc3RyaW5nIGlmIG5vbi1iaW5hcnksIG9yIGFzIGFcbiAqIGJ1ZmZlciBzZXF1ZW5jZSwgZGVwZW5kaW5nIG9uIHBhY2tldCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBwYWNrZXQgb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGhhbmRsZSBlbmNvZGluZ3MgKGxpa2VseSBlbmdpbmUud3JpdGUpXG4gKiBAcmV0dXJuIENhbGxzIGNhbGxiYWNrIHdpdGggQXJyYXkgb2YgZW5jb2RpbmdzXG4gKiBAYXBpIHB1YmxpY1xuICovRW5jb2Rlci5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24ob2JqLGNhbGxiYWNrKXtkZWJ1ZygnZW5jb2RpbmcgcGFja2V0ICVqJyxvYmopO2lmKGV4cG9ydHMuQklOQVJZX0VWRU5UID09IG9iai50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PSBvYmoudHlwZSl7ZW5jb2RlQXNCaW5hcnkob2JqLGNhbGxiYWNrKTt9ZWxzZSB7dmFyIGVuY29kaW5nPWVuY29kZUFzU3RyaW5nKG9iaik7Y2FsbGJhY2soW2VuY29kaW5nXSk7fX07IC8qKlxuICogRW5jb2RlIHBhY2tldCBhcyBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7U3RyaW5nfSBlbmNvZGVkXG4gKiBAYXBpIHByaXZhdGVcbiAqL2Z1bmN0aW9uIGVuY29kZUFzU3RyaW5nKG9iail7dmFyIHN0cj0nJzt2YXIgbnNwPWZhbHNlOyAvLyBmaXJzdCBpcyB0eXBlXG5zdHIgKz0gb2JqLnR5cGU7IC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuaWYoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09IG9iai50eXBlKXtzdHIgKz0gb2JqLmF0dGFjaG1lbnRzO3N0ciArPSAnLSc7fSAvLyBpZiB3ZSBoYXZlIGEgbmFtZXNwYWNlIG90aGVyIHRoYW4gYC9gXG4vLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbmlmKG9iai5uc3AgJiYgJy8nICE9IG9iai5uc3Ape25zcCA9IHRydWU7c3RyICs9IG9iai5uc3A7fSAvLyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSB0aGUgaWRcbmlmKG51bGwgIT0gb2JqLmlkKXtpZihuc3Ape3N0ciArPSAnLCc7bnNwID0gZmFsc2U7fXN0ciArPSBvYmouaWQ7fSAvLyBqc29uIGRhdGFcbmlmKG51bGwgIT0gb2JqLmRhdGEpe2lmKG5zcClzdHIgKz0gJywnO3N0ciArPSBqc29uLnN0cmluZ2lmeShvYmouZGF0YSk7fWRlYnVnKCdlbmNvZGVkICVqIGFzICVzJyxvYmosc3RyKTtyZXR1cm4gc3RyO30gLyoqXG4gKiBFbmNvZGUgcGFja2V0IGFzICdidWZmZXIgc2VxdWVuY2UnIGJ5IHJlbW92aW5nIGJsb2JzLCBhbmRcbiAqIGRlY29uc3RydWN0aW5nIHBhY2tldCBpbnRvIG9iamVjdCB3aXRoIHBsYWNlaG9sZGVycyBhbmRcbiAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0J1ZmZlcn0gZW5jb2RlZFxuICogQGFwaSBwcml2YXRlXG4gKi9mdW5jdGlvbiBlbmNvZGVBc0JpbmFyeShvYmosY2FsbGJhY2spe2Z1bmN0aW9uIHdyaXRlRW5jb2RpbmcoYmxvYmxlc3NEYXRhKXt2YXIgZGVjb25zdHJ1Y3Rpb249YmluYXJ5LmRlY29uc3RydWN0UGFja2V0KGJsb2JsZXNzRGF0YSk7dmFyIHBhY2s9ZW5jb2RlQXNTdHJpbmcoZGVjb25zdHJ1Y3Rpb24ucGFja2V0KTt2YXIgYnVmZmVycz1kZWNvbnN0cnVjdGlvbi5idWZmZXJzO2J1ZmZlcnMudW5zaGlmdChwYWNrKTsgLy8gYWRkIHBhY2tldCBpbmZvIHRvIGJlZ2lubmluZyBvZiBkYXRhIGxpc3RcbmNhbGxiYWNrKGJ1ZmZlcnMpOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbn1iaW5hcnkucmVtb3ZlQmxvYnMob2JqLHdyaXRlRW5jb2RpbmcpO30gLyoqXG4gKiBBIHNvY2tldC5pbyBEZWNvZGVyIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBkZWNvZGVyXG4gKiBAYXBpIHB1YmxpY1xuICovZnVuY3Rpb24gRGVjb2Rlcigpe3RoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7fSAvKipcbiAqIE1peCBpbiBgRW1pdHRlcmAgd2l0aCBEZWNvZGVyLlxuICovRW1pdHRlcihEZWNvZGVyLnByb3RvdHlwZSk7IC8qKlxuICogRGVjb2RlcyBhbiBlY29kZWQgcGFja2V0IHN0cmluZyBpbnRvIHBhY2tldCBKU09OLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxuICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHVibGljXG4gKi9EZWNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihvYmope3ZhciBwYWNrZXQ7aWYoJ3N0cmluZycgPT0gdHlwZW9mIG9iail7cGFja2V0ID0gZGVjb2RlU3RyaW5nKG9iaik7aWYoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gcGFja2V0LnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09IHBhY2tldC50eXBlKXsgLy8gYmluYXJ5IHBhY2tldCdzIGpzb25cbnRoaXMucmVjb25zdHJ1Y3RvciA9IG5ldyBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCk7IC8vIG5vIGF0dGFjaG1lbnRzLCBsYWJlbGVkIGJpbmFyeSBidXQgbm8gYmluYXJ5IGRhdGEgdG8gZm9sbG93XG5pZih0aGlzLnJlY29uc3RydWN0b3IucmVjb25QYWNrLmF0dGFjaG1lbnRzID09PSAwKXt0aGlzLmVtaXQoJ2RlY29kZWQnLHBhY2tldCk7fX1lbHNlIHsgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxudGhpcy5lbWl0KCdkZWNvZGVkJyxwYWNrZXQpO319ZWxzZSBpZihpc0J1ZihvYmopIHx8IG9iai5iYXNlNjQpeyAvLyByYXcgYmluYXJ5IGRhdGFcbmlmKCF0aGlzLnJlY29uc3RydWN0b3Ipe3Rocm93IG5ldyBFcnJvcignZ290IGJpbmFyeSBkYXRhIHdoZW4gbm90IHJlY29uc3RydWN0aW5nIGEgcGFja2V0Jyk7fWVsc2Uge3BhY2tldCA9IHRoaXMucmVjb25zdHJ1Y3Rvci50YWtlQmluYXJ5RGF0YShvYmopO2lmKHBhY2tldCl7IC8vIHJlY2VpdmVkIGZpbmFsIGJ1ZmZlclxudGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDt0aGlzLmVtaXQoJ2RlY29kZWQnLHBhY2tldCk7fX19ZWxzZSB7dGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGU6ICcgKyBvYmopO319OyAvKipcbiAqIERlY29kZSBhIHBhY2tldCBTdHJpbmcgKEpTT04gZGF0YSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9mdW5jdGlvbiBkZWNvZGVTdHJpbmcoc3RyKXt2YXIgcD17fTt2YXIgaT0wOyAvLyBsb29rIHVwIHR5cGVcbnAudHlwZSA9IE51bWJlcihzdHIuY2hhckF0KDApKTtpZihudWxsID09IGV4cG9ydHMudHlwZXNbcC50eXBlXSlyZXR1cm4gZXJyb3IoKTsgLy8gbG9vayB1cCBhdHRhY2htZW50cyBpZiB0eXBlIGJpbmFyeVxuaWYoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gcC50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PSBwLnR5cGUpe3ZhciBidWY9Jyc7d2hpbGUoc3RyLmNoYXJBdCgrK2kpICE9ICctJykge2J1ZiArPSBzdHIuY2hhckF0KGkpO2lmKGkgPT0gc3RyLmxlbmd0aClicmVhazt9aWYoYnVmICE9IE51bWJlcihidWYpIHx8IHN0ci5jaGFyQXQoaSkgIT0gJy0nKXt0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgYXR0YWNobWVudHMnKTt9cC5hdHRhY2htZW50cyA9IE51bWJlcihidWYpO30gLy8gbG9vayB1cCBuYW1lc3BhY2UgKGlmIGFueSlcbmlmKCcvJyA9PSBzdHIuY2hhckF0KGkgKyAxKSl7cC5uc3AgPSAnJzt3aGlsZSgrK2kpIHt2YXIgYz1zdHIuY2hhckF0KGkpO2lmKCcsJyA9PSBjKWJyZWFrO3AubnNwICs9IGM7aWYoaSA9PSBzdHIubGVuZ3RoKWJyZWFrO319ZWxzZSB7cC5uc3AgPSAnLyc7fSAvLyBsb29rIHVwIGlkXG52YXIgbmV4dD1zdHIuY2hhckF0KGkgKyAxKTtpZignJyAhPT0gbmV4dCAmJiBOdW1iZXIobmV4dCkgPT0gbmV4dCl7cC5pZCA9ICcnO3doaWxlKCsraSkge3ZhciBjPXN0ci5jaGFyQXQoaSk7aWYobnVsbCA9PSBjIHx8IE51bWJlcihjKSAhPSBjKXstLWk7YnJlYWs7fXAuaWQgKz0gc3RyLmNoYXJBdChpKTtpZihpID09IHN0ci5sZW5ndGgpYnJlYWs7fXAuaWQgPSBOdW1iZXIocC5pZCk7fSAvLyBsb29rIHVwIGpzb24gZGF0YVxuaWYoc3RyLmNoYXJBdCgrK2kpKXt0cnl7cC5kYXRhID0ganNvbi5wYXJzZShzdHIuc3Vic3RyKGkpKTt9Y2F0Y2goZSkge3JldHVybiBlcnJvcigpO319ZGVidWcoJ2RlY29kZWQgJXMgYXMgJWonLHN0cixwKTtyZXR1cm4gcDt9IC8qKlxuICogRGVhbGxvY2F0ZXMgYSBwYXJzZXIncyByZXNvdXJjZXNcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovRGVjb2Rlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCl7aWYodGhpcy5yZWNvbnN0cnVjdG9yKXt0aGlzLnJlY29uc3RydWN0b3IuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO319OyAvKipcbiAqIEEgbWFuYWdlciBvZiBhIGJpbmFyeSBldmVudCdzICdidWZmZXIgc2VxdWVuY2UnLiBTaG91bGRcbiAqIGJlIGNvbnN0cnVjdGVkIHdoZW5ldmVyIGEgcGFja2V0IG9mIHR5cGUgQklOQVJZX0VWRU5UIGlzXG4gKiBkZWNvZGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0JpbmFyeVJlY29uc3RydWN0b3J9IGluaXRpYWxpemVkIHJlY29uc3RydWN0b3JcbiAqIEBhcGkgcHJpdmF0ZVxuICovZnVuY3Rpb24gQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpe3RoaXMucmVjb25QYWNrID0gcGFja2V0O3RoaXMuYnVmZmVycyA9IFtdO30gLyoqXG4gKiBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gYmluYXJ5IGRhdGEgcmVjZWl2ZWQgZnJvbSBjb25uZWN0aW9uXG4gKiBhZnRlciBhIEJJTkFSWV9FVkVOVCBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXIgfCBBcnJheUJ1ZmZlcn0gYmluRGF0YSAtIHRoZSByYXcgYmluYXJ5IGRhdGEgcmVjZWl2ZWRcbiAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IHJldHVybnMgbnVsbCBpZiBtb3JlIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkIG9yXG4gKiAgIGEgcmVjb25zdHJ1Y3RlZCBwYWNrZXQgb2JqZWN0IGlmIGFsbCBidWZmZXJzIGhhdmUgYmVlbiByZWNlaXZlZC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUudGFrZUJpbmFyeURhdGEgPSBmdW5jdGlvbihiaW5EYXRhKXt0aGlzLmJ1ZmZlcnMucHVzaChiaW5EYXRhKTtpZih0aGlzLmJ1ZmZlcnMubGVuZ3RoID09IHRoaXMucmVjb25QYWNrLmF0dGFjaG1lbnRzKXsgLy8gZG9uZSB3aXRoIGJ1ZmZlciBsaXN0XG52YXIgcGFja2V0PWJpbmFyeS5yZWNvbnN0cnVjdFBhY2tldCh0aGlzLnJlY29uUGFjayx0aGlzLmJ1ZmZlcnMpO3RoaXMuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO3JldHVybiBwYWNrZXQ7fXJldHVybiBudWxsO307IC8qKlxuICogQ2xlYW5zIHVwIGJpbmFyeSBwYWNrZXQgcmVjb25zdHJ1Y3Rpb24gdmFyaWFibGVzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZmluaXNoZWRSZWNvbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKCl7dGhpcy5yZWNvblBhY2sgPSBudWxsO3RoaXMuYnVmZmVycyA9IFtdO307ZnVuY3Rpb24gZXJyb3IoZGF0YSl7cmV0dXJuIHt0eXBlOmV4cG9ydHMuRVJST1IsZGF0YToncGFyc2VyIGVycm9yJ307fX0se1wiLi9iaW5hcnlcIjo0NixcIi4vaXMtYnVmZmVyXCI6NDgsXCJjb21wb25lbnQtZW1pdHRlclwiOjQ5LFwiZGVidWdcIjozOSxcImlzYXJyYXlcIjo0MyxcImpzb24zXCI6NTB9XSw0ODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7bW9kdWxlLmV4cG9ydHMgPSBpc0J1ZjsgLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgb2JqIGlzIGEgYnVmZmVyIG9yIGFuIGFycmF5YnVmZmVyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovZnVuY3Rpb24gaXNCdWYob2JqKXtyZXR1cm4gZ2xvYmFsLkJ1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgZ2xvYmFsLkFycmF5QnVmZmVyICYmIG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO319KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7fV0sNDk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe2FyZ3VtZW50c1s0XVsxNV1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpO30se1wiZHVwXCI6MTV9XSw1MDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qISBKU09OIHYzLjMuMiB8IGh0dHA6Ly9iZXN0aWVqcy5naXRodWIuaW8vanNvbjMgfCBDb3B5cmlnaHQgMjAxMi0yMDE0LCBLaXQgQ2FtYnJpZGdlIHwgaHR0cDovL2tpdC5taXQtbGljZW5zZS5vcmcgKi87KGZ1bmN0aW9uKCl7IC8vIERldGVjdCB0aGUgYGRlZmluZWAgZnVuY3Rpb24gZXhwb3NlZCBieSBhc3luY2hyb25vdXMgbW9kdWxlIGxvYWRlcnMuIFRoZVxuLy8gc3RyaWN0IGBkZWZpbmVgIGNoZWNrIGlzIG5lY2Vzc2FyeSBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIGByLmpzYC5cbnZhciBpc0xvYWRlcj10eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZDsgLy8gQSBzZXQgb2YgdHlwZXMgdXNlZCB0byBkaXN0aW5ndWlzaCBvYmplY3RzIGZyb20gcHJpbWl0aXZlcy5cbnZhciBvYmplY3RUeXBlcz17XCJmdW5jdGlvblwiOnRydWUsXCJvYmplY3RcIjp0cnVlfTsgLy8gRGV0ZWN0IHRoZSBgZXhwb3J0c2Agb2JqZWN0IGV4cG9zZWQgYnkgQ29tbW9uSlMgaW1wbGVtZW50YXRpb25zLlxudmFyIGZyZWVFeHBvcnRzPW9iamVjdFR5cGVzW3R5cGVvZiBleHBvcnRzXSAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7IC8vIFVzZSB0aGUgYGdsb2JhbGAgb2JqZWN0IGV4cG9zZWQgYnkgTm9kZSAoaW5jbHVkaW5nIEJyb3dzZXJpZnkgdmlhXG4vLyBgaW5zZXJ0LW1vZHVsZS1nbG9iYWxzYCksIE5hcndoYWwsIGFuZCBSaW5nbyBhcyB0aGUgZGVmYXVsdCBjb250ZXh0LFxuLy8gYW5kIHRoZSBgd2luZG93YCBvYmplY3QgaW4gYnJvd3NlcnMuIFJoaW5vIGV4cG9ydHMgYSBgZ2xvYmFsYCBmdW5jdGlvblxuLy8gaW5zdGVhZC5cbnZhciByb290PW9iamVjdFR5cGVzW3R5cGVvZiB3aW5kb3ddICYmIHdpbmRvdyB8fCB0aGlzLGZyZWVHbG9iYWw9ZnJlZUV4cG9ydHMgJiYgb2JqZWN0VHlwZXNbdHlwZW9mIG1vZHVsZV0gJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgdHlwZW9mIGdsb2JhbCA9PSBcIm9iamVjdFwiICYmIGdsb2JhbDtpZihmcmVlR2xvYmFsICYmIChmcmVlR2xvYmFsW1wiZ2xvYmFsXCJdID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWxbXCJ3aW5kb3dcIl0gPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbFtcInNlbGZcIl0gPT09IGZyZWVHbG9iYWwpKXtyb290ID0gZnJlZUdsb2JhbDt9IC8vIFB1YmxpYzogSW5pdGlhbGl6ZXMgSlNPTiAzIHVzaW5nIHRoZSBnaXZlbiBgY29udGV4dGAgb2JqZWN0LCBhdHRhY2hpbmcgdGhlXG4vLyBgc3RyaW5naWZ5YCBhbmQgYHBhcnNlYCBmdW5jdGlvbnMgdG8gdGhlIHNwZWNpZmllZCBgZXhwb3J0c2Agb2JqZWN0LlxuZnVuY3Rpb24gcnVuSW5Db250ZXh0KGNvbnRleHQsZXhwb3J0cyl7Y29udGV4dCB8fCAoY29udGV4dCA9IHJvb3RbXCJPYmplY3RcIl0oKSk7ZXhwb3J0cyB8fCAoZXhwb3J0cyA9IHJvb3RbXCJPYmplY3RcIl0oKSk7IC8vIE5hdGl2ZSBjb25zdHJ1Y3RvciBhbGlhc2VzLlxudmFyIE51bWJlcj1jb250ZXh0W1wiTnVtYmVyXCJdIHx8IHJvb3RbXCJOdW1iZXJcIl0sU3RyaW5nPWNvbnRleHRbXCJTdHJpbmdcIl0gfHwgcm9vdFtcIlN0cmluZ1wiXSxPYmplY3Q9Y29udGV4dFtcIk9iamVjdFwiXSB8fCByb290W1wiT2JqZWN0XCJdLERhdGU9Y29udGV4dFtcIkRhdGVcIl0gfHwgcm9vdFtcIkRhdGVcIl0sU3ludGF4RXJyb3I9Y29udGV4dFtcIlN5bnRheEVycm9yXCJdIHx8IHJvb3RbXCJTeW50YXhFcnJvclwiXSxUeXBlRXJyb3I9Y29udGV4dFtcIlR5cGVFcnJvclwiXSB8fCByb290W1wiVHlwZUVycm9yXCJdLE1hdGg9Y29udGV4dFtcIk1hdGhcIl0gfHwgcm9vdFtcIk1hdGhcIl0sbmF0aXZlSlNPTj1jb250ZXh0W1wiSlNPTlwiXSB8fCByb290W1wiSlNPTlwiXTsgLy8gRGVsZWdhdGUgdG8gdGhlIG5hdGl2ZSBgc3RyaW5naWZ5YCBhbmQgYHBhcnNlYCBpbXBsZW1lbnRhdGlvbnMuXG5pZih0eXBlb2YgbmF0aXZlSlNPTiA9PSBcIm9iamVjdFwiICYmIG5hdGl2ZUpTT04pe2V4cG9ydHMuc3RyaW5naWZ5ID0gbmF0aXZlSlNPTi5zdHJpbmdpZnk7ZXhwb3J0cy5wYXJzZSA9IG5hdGl2ZUpTT04ucGFyc2U7fSAvLyBDb252ZW5pZW5jZSBhbGlhc2VzLlxudmFyIG9iamVjdFByb3RvPU9iamVjdC5wcm90b3R5cGUsZ2V0Q2xhc3M9b2JqZWN0UHJvdG8udG9TdHJpbmcsaXNQcm9wZXJ0eSxmb3JFYWNoLHVuZGVmOyAvLyBUZXN0IHRoZSBgRGF0ZSNnZXRVVEMqYCBtZXRob2RzLiBCYXNlZCBvbiB3b3JrIGJ5IEBZYWZmbGUuXG52YXIgaXNFeHRlbmRlZD1uZXcgRGF0ZSgtMzUwOTgyNzMzNDU3MzI5Mik7dHJ5eyAvLyBUaGUgYGdldFVUQ0Z1bGxZZWFyYCwgYE1vbnRoYCwgYW5kIGBEYXRlYCBtZXRob2RzIHJldHVybiBub25zZW5zaWNhbFxuLy8gcmVzdWx0cyBmb3IgY2VydGFpbiBkYXRlcyBpbiBPcGVyYSA+PSAxMC41My5cbmlzRXh0ZW5kZWQgPSBpc0V4dGVuZGVkLmdldFVUQ0Z1bGxZZWFyKCkgPT0gLTEwOTI1MiAmJiBpc0V4dGVuZGVkLmdldFVUQ01vbnRoKCkgPT09IDAgJiYgaXNFeHRlbmRlZC5nZXRVVENEYXRlKCkgPT09IDEgJiYgIC8vIFNhZmFyaSA8IDIuMC4yIHN0b3JlcyB0aGUgaW50ZXJuYWwgbWlsbGlzZWNvbmQgdGltZSB2YWx1ZSBjb3JyZWN0bHksXG4vLyBidXQgY2xpcHMgdGhlIHZhbHVlcyByZXR1cm5lZCBieSB0aGUgZGF0ZSBtZXRob2RzIHRvIHRoZSByYW5nZSBvZlxuLy8gc2lnbmVkIDMyLWJpdCBpbnRlZ2VycyAoWy0yICoqIDMxLCAyICoqIDMxIC0gMV0pLlxuaXNFeHRlbmRlZC5nZXRVVENIb3VycygpID09IDEwICYmIGlzRXh0ZW5kZWQuZ2V0VVRDTWludXRlcygpID09IDM3ICYmIGlzRXh0ZW5kZWQuZ2V0VVRDU2Vjb25kcygpID09IDYgJiYgaXNFeHRlbmRlZC5nZXRVVENNaWxsaXNlY29uZHMoKSA9PSA3MDg7fWNhdGNoKGV4Y2VwdGlvbikge30gLy8gSW50ZXJuYWw6IERldGVybWluZXMgd2hldGhlciB0aGUgbmF0aXZlIGBKU09OLnN0cmluZ2lmeWAgYW5kIGBwYXJzZWBcbi8vIGltcGxlbWVudGF0aW9ucyBhcmUgc3BlYy1jb21wbGlhbnQuIEJhc2VkIG9uIHdvcmsgYnkgS2VuIFNueWRlci5cbmZ1bmN0aW9uIGhhcyhuYW1lKXtpZihoYXNbbmFtZV0gIT09IHVuZGVmKXsgLy8gUmV0dXJuIGNhY2hlZCBmZWF0dXJlIHRlc3QgcmVzdWx0LlxucmV0dXJuIGhhc1tuYW1lXTt9dmFyIGlzU3VwcG9ydGVkO2lmKG5hbWUgPT0gXCJidWctc3RyaW5nLWNoYXItaW5kZXhcIil7IC8vIElFIDw9IDcgZG9lc24ndCBzdXBwb3J0IGFjY2Vzc2luZyBzdHJpbmcgY2hhcmFjdGVycyB1c2luZyBzcXVhcmVcbi8vIGJyYWNrZXQgbm90YXRpb24uIElFIDggb25seSBzdXBwb3J0cyB0aGlzIGZvciBwcmltaXRpdmVzLlxuaXNTdXBwb3J0ZWQgPSBcImFcIlswXSAhPSBcImFcIjt9ZWxzZSBpZihuYW1lID09IFwianNvblwiKXsgLy8gSW5kaWNhdGVzIHdoZXRoZXIgYm90aCBgSlNPTi5zdHJpbmdpZnlgIGFuZCBgSlNPTi5wYXJzZWAgYXJlXG4vLyBzdXBwb3J0ZWQuXG5pc1N1cHBvcnRlZCA9IGhhcyhcImpzb24tc3RyaW5naWZ5XCIpICYmIGhhcyhcImpzb24tcGFyc2VcIik7fWVsc2Uge3ZhciB2YWx1ZSxzZXJpYWxpemVkPVwie1xcXCJhXFxcIjpbMSx0cnVlLGZhbHNlLG51bGwsXFxcIlxcXFx1MDAwMFxcXFxiXFxcXG5cXFxcZlxcXFxyXFxcXHRcXFwiXX1cIjsgLy8gVGVzdCBgSlNPTi5zdHJpbmdpZnlgLlxuaWYobmFtZSA9PSBcImpzb24tc3RyaW5naWZ5XCIpe3ZhciBzdHJpbmdpZnk9ZXhwb3J0cy5zdHJpbmdpZnksc3RyaW5naWZ5U3VwcG9ydGVkPXR5cGVvZiBzdHJpbmdpZnkgPT0gXCJmdW5jdGlvblwiICYmIGlzRXh0ZW5kZWQ7aWYoc3RyaW5naWZ5U3VwcG9ydGVkKXsgLy8gQSB0ZXN0IGZ1bmN0aW9uIG9iamVjdCB3aXRoIGEgY3VzdG9tIGB0b0pTT05gIG1ldGhvZC5cbih2YWx1ZSA9IGZ1bmN0aW9uKCl7cmV0dXJuIDE7fSkudG9KU09OID0gdmFsdWU7dHJ5e3N0cmluZ2lmeVN1cHBvcnRlZCA9ICAvLyBGaXJlZm94IDMuMWIxIGFuZCBiMiBzZXJpYWxpemUgc3RyaW5nLCBudW1iZXIsIGFuZCBib29sZWFuXG4vLyBwcmltaXRpdmVzIGFzIG9iamVjdCBsaXRlcmFscy5cbnN0cmluZ2lmeSgwKSA9PT0gXCIwXCIgJiYgIC8vIEZGIDMuMWIxLCBiMiwgYW5kIEpTT04gMiBzZXJpYWxpemUgd3JhcHBlZCBwcmltaXRpdmVzIGFzIG9iamVjdFxuLy8gbGl0ZXJhbHMuXG5zdHJpbmdpZnkobmV3IE51bWJlcigpKSA9PT0gXCIwXCIgJiYgc3RyaW5naWZ5KG5ldyBTdHJpbmcoKSkgPT0gJ1wiXCInICYmICAvLyBGRiAzLjFiMSwgMiB0aHJvdyBhbiBlcnJvciBpZiB0aGUgdmFsdWUgaXMgYG51bGxgLCBgdW5kZWZpbmVkYCwgb3Jcbi8vIGRvZXMgbm90IGRlZmluZSBhIGNhbm9uaWNhbCBKU09OIHJlcHJlc2VudGF0aW9uICh0aGlzIGFwcGxpZXMgdG9cbi8vIG9iamVjdHMgd2l0aCBgdG9KU09OYCBwcm9wZXJ0aWVzIGFzIHdlbGwsICp1bmxlc3MqIHRoZXkgYXJlIG5lc3RlZFxuLy8gd2l0aGluIGFuIG9iamVjdCBvciBhcnJheSkuXG5zdHJpbmdpZnkoZ2V0Q2xhc3MpID09PSB1bmRlZiAmJiAgLy8gSUUgOCBzZXJpYWxpemVzIGB1bmRlZmluZWRgIGFzIGBcInVuZGVmaW5lZFwiYC4gU2FmYXJpIDw9IDUuMS43IGFuZFxuLy8gRkYgMy4xYjMgcGFzcyB0aGlzIHRlc3QuXG5zdHJpbmdpZnkodW5kZWYpID09PSB1bmRlZiAmJiAgLy8gU2FmYXJpIDw9IDUuMS43IGFuZCBGRiAzLjFiMyB0aHJvdyBgRXJyb3JgcyBhbmQgYFR5cGVFcnJvcmBzLFxuLy8gcmVzcGVjdGl2ZWx5LCBpZiB0aGUgdmFsdWUgaXMgb21pdHRlZCBlbnRpcmVseS5cbnN0cmluZ2lmeSgpID09PSB1bmRlZiAmJiAgLy8gRkYgMy4xYjEsIDIgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIG5vdCBhIG51bWJlcixcbi8vIHN0cmluZywgYXJyYXksIG9iamVjdCwgQm9vbGVhbiwgb3IgYG51bGxgIGxpdGVyYWwuIFRoaXMgYXBwbGllcyB0b1xuLy8gb2JqZWN0cyB3aXRoIGN1c3RvbSBgdG9KU09OYCBtZXRob2RzIGFzIHdlbGwsIHVubGVzcyB0aGV5IGFyZSBuZXN0ZWRcbi8vIGluc2lkZSBvYmplY3Qgb3IgYXJyYXkgbGl0ZXJhbHMuIFlVSSAzLjAuMGIxIGlnbm9yZXMgY3VzdG9tIGB0b0pTT05gXG4vLyBtZXRob2RzIGVudGlyZWx5Llxuc3RyaW5naWZ5KHZhbHVlKSA9PT0gXCIxXCIgJiYgc3RyaW5naWZ5KFt2YWx1ZV0pID09IFwiWzFdXCIgJiYgIC8vIFByb3RvdHlwZSA8PSAxLjYuMSBzZXJpYWxpemVzIGBbdW5kZWZpbmVkXWAgYXMgYFwiW11cImAgaW5zdGVhZCBvZlxuLy8gYFwiW251bGxdXCJgLlxuc3RyaW5naWZ5KFt1bmRlZl0pID09IFwiW251bGxdXCIgJiYgIC8vIFlVSSAzLjAuMGIxIGZhaWxzIHRvIHNlcmlhbGl6ZSBgbnVsbGAgbGl0ZXJhbHMuXG5zdHJpbmdpZnkobnVsbCkgPT0gXCJudWxsXCIgJiYgIC8vIEZGIDMuMWIxLCAyIGhhbHRzIHNlcmlhbGl6YXRpb24gaWYgYW4gYXJyYXkgY29udGFpbnMgYSBmdW5jdGlvbjpcbi8vIGBbMSwgdHJ1ZSwgZ2V0Q2xhc3MsIDFdYCBzZXJpYWxpemVzIGFzIFwiWzEsdHJ1ZSxdLFwiLiBGRiAzLjFiM1xuLy8gZWxpZGVzIG5vbi1KU09OIHZhbHVlcyBmcm9tIG9iamVjdHMgYW5kIGFycmF5cywgdW5sZXNzIHRoZXlcbi8vIGRlZmluZSBjdXN0b20gYHRvSlNPTmAgbWV0aG9kcy5cbnN0cmluZ2lmeShbdW5kZWYsZ2V0Q2xhc3MsbnVsbF0pID09IFwiW251bGwsbnVsbCxudWxsXVwiICYmICAvLyBTaW1wbGUgc2VyaWFsaXphdGlvbiB0ZXN0LiBGRiAzLjFiMSB1c2VzIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlc1xuLy8gd2hlcmUgY2hhcmFjdGVyIGVzY2FwZSBjb2RlcyBhcmUgZXhwZWN0ZWQgKGUuZy4sIGBcXGJgID0+IGBcXHUwMDA4YCkuXG5zdHJpbmdpZnkoe1wiYVwiOlt2YWx1ZSx0cnVlLGZhbHNlLG51bGwsXCJcXHgwMFxcYlxcblxcZlxcclxcdFwiXX0pID09IHNlcmlhbGl6ZWQgJiYgIC8vIEZGIDMuMWIxIGFuZCBiMiBpZ25vcmUgdGhlIGBmaWx0ZXJgIGFuZCBgd2lkdGhgIGFyZ3VtZW50cy5cbnN0cmluZ2lmeShudWxsLHZhbHVlKSA9PT0gXCIxXCIgJiYgc3RyaW5naWZ5KFsxLDJdLG51bGwsMSkgPT0gXCJbXFxuIDEsXFxuIDJcXG5dXCIgJiYgIC8vIEpTT04gMiwgUHJvdG90eXBlIDw9IDEuNywgYW5kIG9sZGVyIFdlYktpdCBidWlsZHMgaW5jb3JyZWN0bHlcbi8vIHNlcmlhbGl6ZSBleHRlbmRlZCB5ZWFycy5cbnN0cmluZ2lmeShuZXcgRGF0ZSgtOC42NGUxNSkpID09ICdcIi0yNzE4MjEtMDQtMjBUMDA6MDA6MDAuMDAwWlwiJyAmJiAgLy8gVGhlIG1pbGxpc2Vjb25kcyBhcmUgb3B0aW9uYWwgaW4gRVMgNSwgYnV0IHJlcXVpcmVkIGluIDUuMS5cbnN0cmluZ2lmeShuZXcgRGF0ZSg4LjY0ZTE1KSkgPT0gJ1wiKzI3NTc2MC0wOS0xM1QwMDowMDowMC4wMDBaXCInICYmICAvLyBGaXJlZm94IDw9IDExLjAgaW5jb3JyZWN0bHkgc2VyaWFsaXplcyB5ZWFycyBwcmlvciB0byAwIGFzIG5lZ2F0aXZlXG4vLyBmb3VyLWRpZ2l0IHllYXJzIGluc3RlYWQgb2Ygc2l4LWRpZ2l0IHllYXJzLiBDcmVkaXRzOiBAWWFmZmxlLlxuc3RyaW5naWZ5KG5ldyBEYXRlKC02MjE5ODc1NTJlNSkpID09ICdcIi0wMDAwMDEtMDEtMDFUMDA6MDA6MDAuMDAwWlwiJyAmJiAgLy8gU2FmYXJpIDw9IDUuMS41IGFuZCBPcGVyYSA+PSAxMC41MyBpbmNvcnJlY3RseSBzZXJpYWxpemUgbWlsbGlzZWNvbmRcbi8vIHZhbHVlcyBsZXNzIHRoYW4gMTAwMC4gQ3JlZGl0czogQFlhZmZsZS5cbnN0cmluZ2lmeShuZXcgRGF0ZSgtMSkpID09ICdcIjE5NjktMTItMzFUMjM6NTk6NTkuOTk5WlwiJzt9Y2F0Y2goZXhjZXB0aW9uKSB7c3RyaW5naWZ5U3VwcG9ydGVkID0gZmFsc2U7fX1pc1N1cHBvcnRlZCA9IHN0cmluZ2lmeVN1cHBvcnRlZDt9IC8vIFRlc3QgYEpTT04ucGFyc2VgLlxuaWYobmFtZSA9PSBcImpzb24tcGFyc2VcIil7dmFyIHBhcnNlPWV4cG9ydHMucGFyc2U7aWYodHlwZW9mIHBhcnNlID09IFwiZnVuY3Rpb25cIil7dHJ5eyAvLyBGRiAzLjFiMSwgYjIgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYSBiYXJlIGxpdGVyYWwgaXMgcHJvdmlkZWQuXG4vLyBDb25mb3JtaW5nIGltcGxlbWVudGF0aW9ucyBzaG91bGQgYWxzbyBjb2VyY2UgdGhlIGluaXRpYWwgYXJndW1lbnQgdG9cbi8vIGEgc3RyaW5nIHByaW9yIHRvIHBhcnNpbmcuXG5pZihwYXJzZShcIjBcIikgPT09IDAgJiYgIXBhcnNlKGZhbHNlKSl7IC8vIFNpbXBsZSBwYXJzaW5nIHRlc3QuXG52YWx1ZSA9IHBhcnNlKHNlcmlhbGl6ZWQpO3ZhciBwYXJzZVN1cHBvcnRlZD12YWx1ZVtcImFcIl0ubGVuZ3RoID09IDUgJiYgdmFsdWVbXCJhXCJdWzBdID09PSAxO2lmKHBhcnNlU3VwcG9ydGVkKXt0cnl7IC8vIFNhZmFyaSA8PSA1LjEuMiBhbmQgRkYgMy4xYjEgYWxsb3cgdW5lc2NhcGVkIHRhYnMgaW4gc3RyaW5ncy5cbnBhcnNlU3VwcG9ydGVkID0gIXBhcnNlKCdcIlxcdFwiJyk7fWNhdGNoKGV4Y2VwdGlvbikge31pZihwYXJzZVN1cHBvcnRlZCl7dHJ5eyAvLyBGRiA0LjAgYW5kIDQuMC4xIGFsbG93IGxlYWRpbmcgYCtgIHNpZ25zIGFuZCBsZWFkaW5nXG4vLyBkZWNpbWFsIHBvaW50cy4gRkYgNC4wLCA0LjAuMSwgYW5kIElFIDktMTAgYWxzbyBhbGxvd1xuLy8gY2VydGFpbiBvY3RhbCBsaXRlcmFscy5cbnBhcnNlU3VwcG9ydGVkID0gcGFyc2UoXCIwMVwiKSAhPT0gMTt9Y2F0Y2goZXhjZXB0aW9uKSB7fX1pZihwYXJzZVN1cHBvcnRlZCl7dHJ5eyAvLyBGRiA0LjAsIDQuMC4xLCBhbmQgUmhpbm8gMS43UjMtUjQgYWxsb3cgdHJhaWxpbmcgZGVjaW1hbFxuLy8gcG9pbnRzLiBUaGVzZSBlbnZpcm9ubWVudHMsIGFsb25nIHdpdGggRkYgMy4xYjEgYW5kIDIsXG4vLyBhbHNvIGFsbG93IHRyYWlsaW5nIGNvbW1hcyBpbiBKU09OIG9iamVjdHMgYW5kIGFycmF5cy5cbnBhcnNlU3VwcG9ydGVkID0gcGFyc2UoXCIxLlwiKSAhPT0gMTt9Y2F0Y2goZXhjZXB0aW9uKSB7fX19fX1jYXRjaChleGNlcHRpb24pIHtwYXJzZVN1cHBvcnRlZCA9IGZhbHNlO319aXNTdXBwb3J0ZWQgPSBwYXJzZVN1cHBvcnRlZDt9fXJldHVybiBoYXNbbmFtZV0gPSAhIWlzU3VwcG9ydGVkO31pZighaGFzKFwianNvblwiKSl7IC8vIENvbW1vbiBgW1tDbGFzc11dYCBuYW1lIGFsaWFzZXMuXG52YXIgZnVuY3Rpb25DbGFzcz1cIltvYmplY3QgRnVuY3Rpb25dXCIsZGF0ZUNsYXNzPVwiW29iamVjdCBEYXRlXVwiLG51bWJlckNsYXNzPVwiW29iamVjdCBOdW1iZXJdXCIsc3RyaW5nQ2xhc3M9XCJbb2JqZWN0IFN0cmluZ11cIixhcnJheUNsYXNzPVwiW29iamVjdCBBcnJheV1cIixib29sZWFuQ2xhc3M9XCJbb2JqZWN0IEJvb2xlYW5dXCI7IC8vIERldGVjdCBpbmNvbXBsZXRlIHN1cHBvcnQgZm9yIGFjY2Vzc2luZyBzdHJpbmcgY2hhcmFjdGVycyBieSBpbmRleC5cbnZhciBjaGFySW5kZXhCdWdneT1oYXMoXCJidWctc3RyaW5nLWNoYXItaW5kZXhcIik7IC8vIERlZmluZSBhZGRpdGlvbmFsIHV0aWxpdHkgbWV0aG9kcyBpZiB0aGUgYERhdGVgIG1ldGhvZHMgYXJlIGJ1Z2d5LlxuaWYoIWlzRXh0ZW5kZWQpe3ZhciBmbG9vcj1NYXRoLmZsb29yOyAvLyBBIG1hcHBpbmcgYmV0d2VlbiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyIGFuZCB0aGUgbnVtYmVyIG9mIGRheXMgYmV0d2VlblxuLy8gSmFudWFyeSAxc3QgYW5kIHRoZSBmaXJzdCBvZiB0aGUgcmVzcGVjdGl2ZSBtb250aC5cbnZhciBNb250aHM9WzAsMzEsNTksOTAsMTIwLDE1MSwxODEsMjEyLDI0MywyNzMsMzA0LDMzNF07IC8vIEludGVybmFsOiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2YgZGF5cyBiZXR3ZWVuIHRoZSBVbml4IGVwb2NoIGFuZCB0aGVcbi8vIGZpcnN0IGRheSBvZiB0aGUgZ2l2ZW4gbW9udGguXG52YXIgZ2V0RGF5PWZ1bmN0aW9uIGdldERheSh5ZWFyLG1vbnRoKXtyZXR1cm4gTW9udGhzW21vbnRoXSArIDM2NSAqICh5ZWFyIC0gMTk3MCkgKyBmbG9vcigoeWVhciAtIDE5NjkgKyAobW9udGggPSArKG1vbnRoID4gMSkpKSAvIDQpIC0gZmxvb3IoKHllYXIgLSAxOTAxICsgbW9udGgpIC8gMTAwKSArIGZsb29yKCh5ZWFyIC0gMTYwMSArIG1vbnRoKSAvIDQwMCk7fTt9IC8vIEludGVybmFsOiBEZXRlcm1pbmVzIGlmIGEgcHJvcGVydHkgaXMgYSBkaXJlY3QgcHJvcGVydHkgb2YgdGhlIGdpdmVuXG4vLyBvYmplY3QuIERlbGVnYXRlcyB0byB0aGUgbmF0aXZlIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIG1ldGhvZC5cbmlmKCEoaXNQcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5KSl7aXNQcm9wZXJ0eSA9IGZ1bmN0aW9uKHByb3BlcnR5KXt2YXIgbWVtYmVycz17fSxjb25zdHJ1Y3RvcjtpZigobWVtYmVycy5fX3Byb3RvX18gPSBudWxsLG1lbWJlcnMuX19wcm90b19fID0geyAvLyBUaGUgKnByb3RvKiBwcm9wZXJ0eSBjYW5ub3QgYmUgc2V0IG11bHRpcGxlIHRpbWVzIGluIHJlY2VudFxuLy8gdmVyc2lvbnMgb2YgRmlyZWZveCBhbmQgU2VhTW9ua2V5LlxuXCJ0b1N0cmluZ1wiOjF9LG1lbWJlcnMpLnRvU3RyaW5nICE9IGdldENsYXNzKXsgLy8gU2FmYXJpIDw9IDIuMC4zIGRvZXNuJ3QgaW1wbGVtZW50IGBPYmplY3QjaGFzT3duUHJvcGVydHlgLCBidXRcbi8vIHN1cHBvcnRzIHRoZSBtdXRhYmxlICpwcm90byogcHJvcGVydHkuXG5pc1Byb3BlcnR5ID0gZnVuY3Rpb24ocHJvcGVydHkpeyAvLyBDYXB0dXJlIGFuZCBicmVhayB0aGUgb2JqZWN0J3MgcHJvdG90eXBlIGNoYWluIChzZWUgc2VjdGlvbiA4LjYuMlxuLy8gb2YgdGhlIEVTIDUuMSBzcGVjKS4gVGhlIHBhcmVudGhlc2l6ZWQgZXhwcmVzc2lvbiBwcmV2ZW50cyBhblxuLy8gdW5zYWZlIHRyYW5zZm9ybWF0aW9uIGJ5IHRoZSBDbG9zdXJlIENvbXBpbGVyLlxudmFyIG9yaWdpbmFsPXRoaXMuX19wcm90b19fLHJlc3VsdD0ocHJvcGVydHkgaW4gKHRoaXMuX19wcm90b19fID0gbnVsbCx0aGlzKSk7IC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHByb3RvdHlwZSBjaGFpbi5cbnRoaXMuX19wcm90b19fID0gb3JpZ2luYWw7cmV0dXJuIHJlc3VsdDt9O31lbHNlIHsgLy8gQ2FwdHVyZSBhIHJlZmVyZW5jZSB0byB0aGUgdG9wLWxldmVsIGBPYmplY3RgIGNvbnN0cnVjdG9yLlxuY29uc3RydWN0b3IgPSBtZW1iZXJzLmNvbnN0cnVjdG9yOyAvLyBVc2UgdGhlIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgdG8gc2ltdWxhdGUgYE9iamVjdCNoYXNPd25Qcm9wZXJ0eWAgaW5cbi8vIG90aGVyIGVudmlyb25tZW50cy5cbmlzUHJvcGVydHkgPSBmdW5jdGlvbihwcm9wZXJ0eSl7dmFyIHBhcmVudD0odGhpcy5jb25zdHJ1Y3RvciB8fCBjb25zdHJ1Y3RvcikucHJvdG90eXBlO3JldHVybiBwcm9wZXJ0eSBpbiB0aGlzICYmICEocHJvcGVydHkgaW4gcGFyZW50ICYmIHRoaXNbcHJvcGVydHldID09PSBwYXJlbnRbcHJvcGVydHldKTt9O31tZW1iZXJzID0gbnVsbDtyZXR1cm4gaXNQcm9wZXJ0eS5jYWxsKHRoaXMscHJvcGVydHkpO307fSAvLyBJbnRlcm5hbDogTm9ybWFsaXplcyB0aGUgYGZvci4uLmluYCBpdGVyYXRpb24gYWxnb3JpdGhtIGFjcm9zc1xuLy8gZW52aXJvbm1lbnRzLiBFYWNoIGVudW1lcmF0ZWQga2V5IGlzIHlpZWxkZWQgdG8gYSBgY2FsbGJhY2tgIGZ1bmN0aW9uLlxuZm9yRWFjaCA9IGZ1bmN0aW9uKG9iamVjdCxjYWxsYmFjayl7dmFyIHNpemU9MCxQcm9wZXJ0aWVzLG1lbWJlcnMscHJvcGVydHk7IC8vIFRlc3RzIGZvciBidWdzIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50J3MgYGZvci4uLmluYCBhbGdvcml0aG0uIFRoZVxuLy8gYHZhbHVlT2ZgIHByb3BlcnR5IGluaGVyaXRzIHRoZSBub24tZW51bWVyYWJsZSBmbGFnIGZyb21cbi8vIGBPYmplY3QucHJvdG90eXBlYCBpbiBvbGRlciB2ZXJzaW9ucyBvZiBJRSwgTmV0c2NhcGUsIGFuZCBNb3ppbGxhLlxuKFByb3BlcnRpZXMgPSBmdW5jdGlvbigpe3RoaXMudmFsdWVPZiA9IDA7fSkucHJvdG90eXBlLnZhbHVlT2YgPSAwOyAvLyBJdGVyYXRlIG92ZXIgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGBQcm9wZXJ0aWVzYCBjbGFzcy5cbm1lbWJlcnMgPSBuZXcgUHJvcGVydGllcygpO2Zvcihwcm9wZXJ0eSBpbiBtZW1iZXJzKSB7IC8vIElnbm9yZSBhbGwgcHJvcGVydGllcyBpbmhlcml0ZWQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuXG5pZihpc1Byb3BlcnR5LmNhbGwobWVtYmVycyxwcm9wZXJ0eSkpe3NpemUrKzt9fVByb3BlcnRpZXMgPSBtZW1iZXJzID0gbnVsbDsgLy8gTm9ybWFsaXplIHRoZSBpdGVyYXRpb24gYWxnb3JpdGhtLlxuaWYoIXNpemUpeyAvLyBBIGxpc3Qgb2Ygbm9uLWVudW1lcmFibGUgcHJvcGVydGllcyBpbmhlcml0ZWQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuXG5tZW1iZXJzID0gW1widmFsdWVPZlwiLFwidG9TdHJpbmdcIixcInRvTG9jYWxlU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaXNQcm90b3R5cGVPZlwiLFwiaGFzT3duUHJvcGVydHlcIixcImNvbnN0cnVjdG9yXCJdOyAvLyBJRSA8PSA4LCBNb3ppbGxhIDEuMCwgYW5kIE5ldHNjYXBlIDYuMiBpZ25vcmUgc2hhZG93ZWQgbm9uLWVudW1lcmFibGVcbi8vIHByb3BlcnRpZXMuXG5mb3JFYWNoID0gZnVuY3Rpb24ob2JqZWN0LGNhbGxiYWNrKXt2YXIgaXNGdW5jdGlvbj1nZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcyxwcm9wZXJ0eSxsZW5ndGg7dmFyIGhhc1Byb3BlcnR5PSFpc0Z1bmN0aW9uICYmIHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgIT0gXCJmdW5jdGlvblwiICYmIG9iamVjdFR5cGVzW3R5cGVvZiBvYmplY3QuaGFzT3duUHJvcGVydHldICYmIG9iamVjdC5oYXNPd25Qcm9wZXJ0eSB8fCBpc1Byb3BlcnR5O2Zvcihwcm9wZXJ0eSBpbiBvYmplY3QpIHsgLy8gR2Vja28gPD0gMS4wIGVudW1lcmF0ZXMgdGhlIGBwcm90b3R5cGVgIHByb3BlcnR5IG9mIGZ1bmN0aW9ucyB1bmRlclxuLy8gY2VydGFpbiBjb25kaXRpb25zOyBJRSBkb2VzIG5vdC5cbmlmKCEoaXNGdW5jdGlvbiAmJiBwcm9wZXJ0eSA9PSBcInByb3RvdHlwZVwiKSAmJiBoYXNQcm9wZXJ0eS5jYWxsKG9iamVjdCxwcm9wZXJ0eSkpe2NhbGxiYWNrKHByb3BlcnR5KTt9fSAvLyBNYW51YWxseSBpbnZva2UgdGhlIGNhbGxiYWNrIGZvciBlYWNoIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5LlxuZm9yKGxlbmd0aCA9IG1lbWJlcnMubGVuZ3RoO3Byb3BlcnR5ID0gbWVtYmVyc1stLWxlbmd0aF07aGFzUHJvcGVydHkuY2FsbChvYmplY3QscHJvcGVydHkpICYmIGNhbGxiYWNrKHByb3BlcnR5KSk7fTt9ZWxzZSBpZihzaXplID09IDIpeyAvLyBTYWZhcmkgPD0gMi4wLjQgZW51bWVyYXRlcyBzaGFkb3dlZCBwcm9wZXJ0aWVzIHR3aWNlLlxuZm9yRWFjaCA9IGZ1bmN0aW9uKG9iamVjdCxjYWxsYmFjayl7IC8vIENyZWF0ZSBhIHNldCBvZiBpdGVyYXRlZCBwcm9wZXJ0aWVzLlxudmFyIG1lbWJlcnM9e30saXNGdW5jdGlvbj1nZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcyxwcm9wZXJ0eTtmb3IocHJvcGVydHkgaW4gb2JqZWN0KSB7IC8vIFN0b3JlIGVhY2ggcHJvcGVydHkgbmFtZSB0byBwcmV2ZW50IGRvdWJsZSBlbnVtZXJhdGlvbi4gVGhlXG4vLyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgaXMgbm90IGVudW1lcmF0ZWQgZHVlIHRvIGNyb3NzLVxuLy8gZW52aXJvbm1lbnQgaW5jb25zaXN0ZW5jaWVzLlxuaWYoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmICFpc1Byb3BlcnR5LmNhbGwobWVtYmVycyxwcm9wZXJ0eSkgJiYgKG1lbWJlcnNbcHJvcGVydHldID0gMSkgJiYgaXNQcm9wZXJ0eS5jYWxsKG9iamVjdCxwcm9wZXJ0eSkpe2NhbGxiYWNrKHByb3BlcnR5KTt9fX07fWVsc2UgeyAvLyBObyBidWdzIGRldGVjdGVkOyB1c2UgdGhlIHN0YW5kYXJkIGBmb3IuLi5pbmAgYWxnb3JpdGhtLlxuZm9yRWFjaCA9IGZ1bmN0aW9uKG9iamVjdCxjYWxsYmFjayl7dmFyIGlzRnVuY3Rpb249Z2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MscHJvcGVydHksaXNDb25zdHJ1Y3Rvcjtmb3IocHJvcGVydHkgaW4gb2JqZWN0KSB7aWYoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGlzUHJvcGVydHkuY2FsbChvYmplY3QscHJvcGVydHkpICYmICEoaXNDb25zdHJ1Y3RvciA9IHByb3BlcnR5ID09PSBcImNvbnN0cnVjdG9yXCIpKXtjYWxsYmFjayhwcm9wZXJ0eSk7fX0gLy8gTWFudWFsbHkgaW52b2tlIHRoZSBjYWxsYmFjayBmb3IgdGhlIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgZHVlIHRvXG4vLyBjcm9zcy1lbnZpcm9ubWVudCBpbmNvbnNpc3RlbmNpZXMuXG5pZihpc0NvbnN0cnVjdG9yIHx8IGlzUHJvcGVydHkuY2FsbChvYmplY3QscHJvcGVydHkgPSBcImNvbnN0cnVjdG9yXCIpKXtjYWxsYmFjayhwcm9wZXJ0eSk7fX07fXJldHVybiBmb3JFYWNoKG9iamVjdCxjYWxsYmFjayk7fTsgLy8gUHVibGljOiBTZXJpYWxpemVzIGEgSmF2YVNjcmlwdCBgdmFsdWVgIGFzIGEgSlNPTiBzdHJpbmcuIFRoZSBvcHRpb25hbFxuLy8gYGZpbHRlcmAgYXJndW1lbnQgbWF5IHNwZWNpZnkgZWl0aGVyIGEgZnVuY3Rpb24gdGhhdCBhbHRlcnMgaG93IG9iamVjdCBhbmRcbi8vIGFycmF5IG1lbWJlcnMgYXJlIHNlcmlhbGl6ZWQsIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MgYW5kIG51bWJlcnMgdGhhdFxuLy8gaW5kaWNhdGVzIHdoaWNoIHByb3BlcnRpZXMgc2hvdWxkIGJlIHNlcmlhbGl6ZWQuIFRoZSBvcHRpb25hbCBgd2lkdGhgXG4vLyBhcmd1bWVudCBtYXkgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIG51bWJlciB0aGF0IHNwZWNpZmllcyB0aGUgaW5kZW50YXRpb25cbi8vIGxldmVsIG9mIHRoZSBvdXRwdXQuXG5pZighaGFzKFwianNvbi1zdHJpbmdpZnlcIikpeyAvLyBJbnRlcm5hbDogQSBtYXAgb2YgY29udHJvbCBjaGFyYWN0ZXJzIGFuZCB0aGVpciBlc2NhcGVkIGVxdWl2YWxlbnRzLlxudmFyIEVzY2FwZXM9ezkyOlwiXFxcXFxcXFxcIiwzNDonXFxcXFwiJyw4OlwiXFxcXGJcIiwxMjpcIlxcXFxmXCIsMTA6XCJcXFxcblwiLDEzOlwiXFxcXHJcIiw5OlwiXFxcXHRcIn07IC8vIEludGVybmFsOiBDb252ZXJ0cyBgdmFsdWVgIGludG8gYSB6ZXJvLXBhZGRlZCBzdHJpbmcgc3VjaCB0aGF0IGl0c1xuLy8gbGVuZ3RoIGlzIGF0IGxlYXN0IGVxdWFsIHRvIGB3aWR0aGAuIFRoZSBgd2lkdGhgIG11c3QgYmUgPD0gNi5cbnZhciBsZWFkaW5nWmVyb2VzPVwiMDAwMDAwXCI7dmFyIHRvUGFkZGVkU3RyaW5nPWZ1bmN0aW9uIHRvUGFkZGVkU3RyaW5nKHdpZHRoLHZhbHVlKXsgLy8gVGhlIGB8fCAwYCBleHByZXNzaW9uIGlzIG5lY2Vzc2FyeSB0byB3b3JrIGFyb3VuZCBhIGJ1ZyBpblxuLy8gT3BlcmEgPD0gNy41NHUyIHdoZXJlIGAwID09IC0wYCwgYnV0IGBTdHJpbmcoLTApICE9PSBcIjBcImAuXG5yZXR1cm4gKGxlYWRpbmdaZXJvZXMgKyAodmFsdWUgfHwgMCkpLnNsaWNlKC13aWR0aCk7fTsgLy8gSW50ZXJuYWw6IERvdWJsZS1xdW90ZXMgYSBzdHJpbmcgYHZhbHVlYCwgcmVwbGFjaW5nIGFsbCBBU0NJSSBjb250cm9sXG4vLyBjaGFyYWN0ZXJzIChjaGFyYWN0ZXJzIHdpdGggY29kZSB1bml0IHZhbHVlcyBiZXR3ZWVuIDAgYW5kIDMxKSB3aXRoXG4vLyB0aGVpciBlc2NhcGVkIGVxdWl2YWxlbnRzLiBUaGlzIGlzIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoZVxuLy8gYFF1b3RlKHZhbHVlKWAgb3BlcmF0aW9uIGRlZmluZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMy5cbnZhciB1bmljb2RlUHJlZml4PVwiXFxcXHUwMFwiO3ZhciBxdW90ZT1mdW5jdGlvbiBxdW90ZSh2YWx1ZSl7dmFyIHJlc3VsdD0nXCInLGluZGV4PTAsbGVuZ3RoPXZhbHVlLmxlbmd0aCx1c2VDaGFySW5kZXg9IWNoYXJJbmRleEJ1Z2d5IHx8IGxlbmd0aCA+IDEwO3ZhciBzeW1ib2xzPXVzZUNoYXJJbmRleCAmJiAoY2hhckluZGV4QnVnZ3k/dmFsdWUuc3BsaXQoXCJcIik6dmFsdWUpO2Zvcig7aW5kZXggPCBsZW5ndGg7aW5kZXgrKykge3ZhciBjaGFyQ29kZT12YWx1ZS5jaGFyQ29kZUF0KGluZGV4KTsgLy8gSWYgdGhlIGNoYXJhY3RlciBpcyBhIGNvbnRyb2wgY2hhcmFjdGVyLCBhcHBlbmQgaXRzIFVuaWNvZGUgb3Jcbi8vIHNob3J0aGFuZCBlc2NhcGUgc2VxdWVuY2U7IG90aGVyd2lzZSwgYXBwZW5kIHRoZSBjaGFyYWN0ZXIgYXMtaXMuXG5zd2l0Y2goY2hhckNvZGUpe2Nhc2UgODpjYXNlIDk6Y2FzZSAxMDpjYXNlIDEyOmNhc2UgMTM6Y2FzZSAzNDpjYXNlIDkyOnJlc3VsdCArPSBFc2NhcGVzW2NoYXJDb2RlXTticmVhaztkZWZhdWx0OmlmKGNoYXJDb2RlIDwgMzIpe3Jlc3VsdCArPSB1bmljb2RlUHJlZml4ICsgdG9QYWRkZWRTdHJpbmcoMixjaGFyQ29kZS50b1N0cmluZygxNikpO2JyZWFrO31yZXN1bHQgKz0gdXNlQ2hhckluZGV4P3N5bWJvbHNbaW5kZXhdOnZhbHVlLmNoYXJBdChpbmRleCk7fX1yZXR1cm4gcmVzdWx0ICsgJ1wiJzt9OyAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgc2VyaWFsaXplcyBhbiBvYmplY3QuIEltcGxlbWVudHMgdGhlXG4vLyBgU3RyKGtleSwgaG9sZGVyKWAsIGBKTyh2YWx1ZSlgLCBhbmQgYEpBKHZhbHVlKWAgb3BlcmF0aW9ucy5cbnZhciBzZXJpYWxpemU9ZnVuY3Rpb24gc2VyaWFsaXplKHByb3BlcnR5LG9iamVjdCxjYWxsYmFjayxwcm9wZXJ0aWVzLHdoaXRlc3BhY2UsaW5kZW50YXRpb24sc3RhY2spe3ZhciB2YWx1ZSxjbGFzc05hbWUseWVhcixtb250aCxkYXRlLHRpbWUsaG91cnMsbWludXRlcyxzZWNvbmRzLG1pbGxpc2Vjb25kcyxyZXN1bHRzLGVsZW1lbnQsaW5kZXgsbGVuZ3RoLHByZWZpeCxyZXN1bHQ7dHJ5eyAvLyBOZWNlc3NhcnkgZm9yIGhvc3Qgb2JqZWN0IHN1cHBvcnQuXG52YWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07fWNhdGNoKGV4Y2VwdGlvbikge31pZih0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIiAmJiB2YWx1ZSl7Y2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh2YWx1ZSk7aWYoY2xhc3NOYW1lID09IGRhdGVDbGFzcyAmJiAhaXNQcm9wZXJ0eS5jYWxsKHZhbHVlLFwidG9KU09OXCIpKXtpZih2YWx1ZSA+IC0xIC8gMCAmJiB2YWx1ZSA8IDEgLyAwKXsgLy8gRGF0ZXMgYXJlIHNlcmlhbGl6ZWQgYWNjb3JkaW5nIHRvIHRoZSBgRGF0ZSN0b0pTT05gIG1ldGhvZFxuLy8gc3BlY2lmaWVkIGluIEVTIDUuMSBzZWN0aW9uIDE1LjkuNS40NC4gU2VlIHNlY3Rpb24gMTUuOS4xLjE1XG4vLyBmb3IgdGhlIElTTyA4NjAxIGRhdGUgdGltZSBzdHJpbmcgZm9ybWF0LlxuaWYoZ2V0RGF5KXsgLy8gTWFudWFsbHkgY29tcHV0ZSB0aGUgeWVhciwgbW9udGgsIGRhdGUsIGhvdXJzLCBtaW51dGVzLFxuLy8gc2Vjb25kcywgYW5kIG1pbGxpc2Vjb25kcyBpZiB0aGUgYGdldFVUQypgIG1ldGhvZHMgYXJlXG4vLyBidWdneS4gQWRhcHRlZCBmcm9tIEBZYWZmbGUncyBgZGF0ZS1zaGltYCBwcm9qZWN0LlxuZGF0ZSA9IGZsb29yKHZhbHVlIC8gODY0ZTUpO2Zvcih5ZWFyID0gZmxvb3IoZGF0ZSAvIDM2NS4yNDI1KSArIDE5NzAgLSAxO2dldERheSh5ZWFyICsgMSwwKSA8PSBkYXRlO3llYXIrKyk7Zm9yKG1vbnRoID0gZmxvb3IoKGRhdGUgLSBnZXREYXkoeWVhciwwKSkgLyAzMC40Mik7Z2V0RGF5KHllYXIsbW9udGggKyAxKSA8PSBkYXRlO21vbnRoKyspO2RhdGUgPSAxICsgZGF0ZSAtIGdldERheSh5ZWFyLG1vbnRoKTsgLy8gVGhlIGB0aW1lYCB2YWx1ZSBzcGVjaWZpZXMgdGhlIHRpbWUgd2l0aGluIHRoZSBkYXkgKHNlZSBFU1xuLy8gNS4xIHNlY3Rpb24gMTUuOS4xLjIpLiBUaGUgZm9ybXVsYSBgKEEgJSBCICsgQikgJSBCYCBpcyB1c2VkXG4vLyB0byBjb21wdXRlIGBBIG1vZHVsbyBCYCwgYXMgdGhlIGAlYCBvcGVyYXRvciBkb2VzIG5vdFxuLy8gY29ycmVzcG9uZCB0byB0aGUgYG1vZHVsb2Agb3BlcmF0aW9uIGZvciBuZWdhdGl2ZSBudW1iZXJzLlxudGltZSA9ICh2YWx1ZSAlIDg2NGU1ICsgODY0ZTUpICUgODY0ZTU7IC8vIFRoZSBob3VycywgbWludXRlcywgc2Vjb25kcywgYW5kIG1pbGxpc2Vjb25kcyBhcmUgb2J0YWluZWQgYnlcbi8vIGRlY29tcG9zaW5nIHRoZSB0aW1lIHdpdGhpbiB0aGUgZGF5LiBTZWUgc2VjdGlvbiAxNS45LjEuMTAuXG5ob3VycyA9IGZsb29yKHRpbWUgLyAzNmU1KSAlIDI0O21pbnV0ZXMgPSBmbG9vcih0aW1lIC8gNmU0KSAlIDYwO3NlY29uZHMgPSBmbG9vcih0aW1lIC8gMWUzKSAlIDYwO21pbGxpc2Vjb25kcyA9IHRpbWUgJSAxZTM7fWVsc2Uge3llYXIgPSB2YWx1ZS5nZXRVVENGdWxsWWVhcigpO21vbnRoID0gdmFsdWUuZ2V0VVRDTW9udGgoKTtkYXRlID0gdmFsdWUuZ2V0VVRDRGF0ZSgpO2hvdXJzID0gdmFsdWUuZ2V0VVRDSG91cnMoKTttaW51dGVzID0gdmFsdWUuZ2V0VVRDTWludXRlcygpO3NlY29uZHMgPSB2YWx1ZS5nZXRVVENTZWNvbmRzKCk7bWlsbGlzZWNvbmRzID0gdmFsdWUuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7fSAvLyBTZXJpYWxpemUgZXh0ZW5kZWQgeWVhcnMgY29ycmVjdGx5LlxudmFsdWUgPSAoeWVhciA8PSAwIHx8IHllYXIgPj0gMWU0Pyh5ZWFyIDwgMD9cIi1cIjpcIitcIikgKyB0b1BhZGRlZFN0cmluZyg2LHllYXIgPCAwPy15ZWFyOnllYXIpOnRvUGFkZGVkU3RyaW5nKDQseWVhcikpICsgXCItXCIgKyB0b1BhZGRlZFN0cmluZygyLG1vbnRoICsgMSkgKyBcIi1cIiArIHRvUGFkZGVkU3RyaW5nKDIsZGF0ZSkgKyAgLy8gTW9udGhzLCBkYXRlcywgaG91cnMsIG1pbnV0ZXMsIGFuZCBzZWNvbmRzIHNob3VsZCBoYXZlIHR3b1xuLy8gZGlnaXRzOyBtaWxsaXNlY29uZHMgc2hvdWxkIGhhdmUgdGhyZWUuXG5cIlRcIiArIHRvUGFkZGVkU3RyaW5nKDIsaG91cnMpICsgXCI6XCIgKyB0b1BhZGRlZFN0cmluZygyLG1pbnV0ZXMpICsgXCI6XCIgKyB0b1BhZGRlZFN0cmluZygyLHNlY29uZHMpICsgIC8vIE1pbGxpc2Vjb25kcyBhcmUgb3B0aW9uYWwgaW4gRVMgNS4wLCBidXQgcmVxdWlyZWQgaW4gNS4xLlxuXCIuXCIgKyB0b1BhZGRlZFN0cmluZygzLG1pbGxpc2Vjb25kcykgKyBcIlpcIjt9ZWxzZSB7dmFsdWUgPSBudWxsO319ZWxzZSBpZih0eXBlb2YgdmFsdWUudG9KU09OID09IFwiZnVuY3Rpb25cIiAmJiAoY2xhc3NOYW1lICE9IG51bWJlckNsYXNzICYmIGNsYXNzTmFtZSAhPSBzdHJpbmdDbGFzcyAmJiBjbGFzc05hbWUgIT0gYXJyYXlDbGFzcyB8fCBpc1Byb3BlcnR5LmNhbGwodmFsdWUsXCJ0b0pTT05cIikpKXsgLy8gUHJvdG90eXBlIDw9IDEuNi4xIGFkZHMgbm9uLXN0YW5kYXJkIGB0b0pTT05gIG1ldGhvZHMgdG8gdGhlXG4vLyBgTnVtYmVyYCwgYFN0cmluZ2AsIGBEYXRlYCwgYW5kIGBBcnJheWAgcHJvdG90eXBlcy4gSlNPTiAzXG4vLyBpZ25vcmVzIGFsbCBgdG9KU09OYCBtZXRob2RzIG9uIHRoZXNlIG9iamVjdHMgdW5sZXNzIHRoZXkgYXJlXG4vLyBkZWZpbmVkIGRpcmVjdGx5IG9uIGFuIGluc3RhbmNlLlxudmFsdWUgPSB2YWx1ZS50b0pTT04ocHJvcGVydHkpO319aWYoY2FsbGJhY2speyAvLyBJZiBhIHJlcGxhY2VtZW50IGZ1bmN0aW9uIHdhcyBwcm92aWRlZCwgY2FsbCBpdCB0byBvYnRhaW4gdGhlIHZhbHVlXG4vLyBmb3Igc2VyaWFsaXphdGlvbi5cbnZhbHVlID0gY2FsbGJhY2suY2FsbChvYmplY3QscHJvcGVydHksdmFsdWUpO31pZih2YWx1ZSA9PT0gbnVsbCl7cmV0dXJuIFwibnVsbFwiO31jbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKTtpZihjbGFzc05hbWUgPT0gYm9vbGVhbkNsYXNzKXsgLy8gQm9vbGVhbnMgYXJlIHJlcHJlc2VudGVkIGxpdGVyYWxseS5cbnJldHVybiBcIlwiICsgdmFsdWU7fWVsc2UgaWYoY2xhc3NOYW1lID09IG51bWJlckNsYXNzKXsgLy8gSlNPTiBudW1iZXJzIG11c3QgYmUgZmluaXRlLiBgSW5maW5pdHlgIGFuZCBgTmFOYCBhcmUgc2VyaWFsaXplZCBhc1xuLy8gYFwibnVsbFwiYC5cbnJldHVybiB2YWx1ZSA+IC0xIC8gMCAmJiB2YWx1ZSA8IDEgLyAwP1wiXCIgKyB2YWx1ZTpcIm51bGxcIjt9ZWxzZSBpZihjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3MpeyAvLyBTdHJpbmdzIGFyZSBkb3VibGUtcXVvdGVkIGFuZCBlc2NhcGVkLlxucmV0dXJuIHF1b3RlKFwiXCIgKyB2YWx1ZSk7fSAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgb2JqZWN0cyBhbmQgYXJyYXlzLlxuaWYodHlwZW9mIHZhbHVlID09IFwib2JqZWN0XCIpeyAvLyBDaGVjayBmb3IgY3ljbGljIHN0cnVjdHVyZXMuIFRoaXMgaXMgYSBsaW5lYXIgc2VhcmNoOyBwZXJmb3JtYW5jZVxuLy8gaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mIHVuaXF1ZSBuZXN0ZWQgb2JqZWN0cy5cbmZvcihsZW5ndGggPSBzdGFjay5sZW5ndGg7bGVuZ3RoLS07KSB7aWYoc3RhY2tbbGVuZ3RoXSA9PT0gdmFsdWUpeyAvLyBDeWNsaWMgc3RydWN0dXJlcyBjYW5ub3QgYmUgc2VyaWFsaXplZCBieSBgSlNPTi5zdHJpbmdpZnlgLlxudGhyb3cgVHlwZUVycm9yKCk7fX0gLy8gQWRkIHRoZSBvYmplY3QgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuc3RhY2sucHVzaCh2YWx1ZSk7cmVzdWx0cyA9IFtdOyAvLyBTYXZlIHRoZSBjdXJyZW50IGluZGVudGF0aW9uIGxldmVsIGFuZCBpbmRlbnQgb25lIGFkZGl0aW9uYWwgbGV2ZWwuXG5wcmVmaXggPSBpbmRlbnRhdGlvbjtpbmRlbnRhdGlvbiArPSB3aGl0ZXNwYWNlO2lmKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKXsgLy8gUmVjdXJzaXZlbHkgc2VyaWFsaXplIGFycmF5IGVsZW1lbnRzLlxuZm9yKGluZGV4ID0gMCxsZW5ndGggPSB2YWx1ZS5sZW5ndGg7aW5kZXggPCBsZW5ndGg7aW5kZXgrKykge2VsZW1lbnQgPSBzZXJpYWxpemUoaW5kZXgsdmFsdWUsY2FsbGJhY2sscHJvcGVydGllcyx3aGl0ZXNwYWNlLGluZGVudGF0aW9uLHN0YWNrKTtyZXN1bHRzLnB1c2goZWxlbWVudCA9PT0gdW5kZWY/XCJudWxsXCI6ZWxlbWVudCk7fXJlc3VsdCA9IHJlc3VsdHMubGVuZ3RoP3doaXRlc3BhY2U/XCJbXFxuXCIgKyBpbmRlbnRhdGlvbiArIHJlc3VsdHMuam9pbihcIixcXG5cIiArIGluZGVudGF0aW9uKSArIFwiXFxuXCIgKyBwcmVmaXggKyBcIl1cIjpcIltcIiArIHJlc3VsdHMuam9pbihcIixcIikgKyBcIl1cIjpcIltdXCI7fWVsc2UgeyAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgb2JqZWN0IG1lbWJlcnMuIE1lbWJlcnMgYXJlIHNlbGVjdGVkIGZyb21cbi8vIGVpdGhlciBhIHVzZXItc3BlY2lmaWVkIGxpc3Qgb2YgcHJvcGVydHkgbmFtZXMsIG9yIHRoZSBvYmplY3Rcbi8vIGl0c2VsZi5cbmZvckVhY2gocHJvcGVydGllcyB8fCB2YWx1ZSxmdW5jdGlvbihwcm9wZXJ0eSl7dmFyIGVsZW1lbnQ9c2VyaWFsaXplKHByb3BlcnR5LHZhbHVlLGNhbGxiYWNrLHByb3BlcnRpZXMsd2hpdGVzcGFjZSxpbmRlbnRhdGlvbixzdGFjayk7aWYoZWxlbWVudCAhPT0gdW5kZWYpeyAvLyBBY2NvcmRpbmcgdG8gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMzogXCJJZiBgZ2FwYCB7d2hpdGVzcGFjZX1cbi8vIGlzIG5vdCB0aGUgZW1wdHkgc3RyaW5nLCBsZXQgYG1lbWJlcmAge3F1b3RlKHByb3BlcnR5KSArIFwiOlwifVxuLy8gYmUgdGhlIGNvbmNhdGVuYXRpb24gb2YgYG1lbWJlcmAgYW5kIHRoZSBgc3BhY2VgIGNoYXJhY3Rlci5cIlxuLy8gVGhlIFwiYHNwYWNlYCBjaGFyYWN0ZXJcIiByZWZlcnMgdG8gdGhlIGxpdGVyYWwgc3BhY2Vcbi8vIGNoYXJhY3Rlciwgbm90IHRoZSBgc3BhY2VgIHt3aWR0aH0gYXJndW1lbnQgcHJvdmlkZWQgdG9cbi8vIGBKU09OLnN0cmluZ2lmeWAuXG5yZXN1bHRzLnB1c2gocXVvdGUocHJvcGVydHkpICsgXCI6XCIgKyAod2hpdGVzcGFjZT9cIiBcIjpcIlwiKSArIGVsZW1lbnQpO319KTtyZXN1bHQgPSByZXN1bHRzLmxlbmd0aD93aGl0ZXNwYWNlP1wie1xcblwiICsgaW5kZW50YXRpb24gKyByZXN1bHRzLmpvaW4oXCIsXFxuXCIgKyBpbmRlbnRhdGlvbikgKyBcIlxcblwiICsgcHJlZml4ICsgXCJ9XCI6XCJ7XCIgKyByZXN1bHRzLmpvaW4oXCIsXCIpICsgXCJ9XCI6XCJ7fVwiO30gLy8gUmVtb3ZlIHRoZSBvYmplY3QgZnJvbSB0aGUgdHJhdmVyc2VkIG9iamVjdCBzdGFjay5cbnN0YWNrLnBvcCgpO3JldHVybiByZXN1bHQ7fX07IC8vIFB1YmxpYzogYEpTT04uc3RyaW5naWZ5YC4gU2VlIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMuXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uKHNvdXJjZSxmaWx0ZXIsd2lkdGgpe3ZhciB3aGl0ZXNwYWNlLGNhbGxiYWNrLHByb3BlcnRpZXMsY2xhc3NOYW1lO2lmKG9iamVjdFR5cGVzW3R5cGVvZiBmaWx0ZXJdICYmIGZpbHRlcil7aWYoKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwoZmlsdGVyKSkgPT0gZnVuY3Rpb25DbGFzcyl7Y2FsbGJhY2sgPSBmaWx0ZXI7fWVsc2UgaWYoY2xhc3NOYW1lID09IGFycmF5Q2xhc3MpeyAvLyBDb252ZXJ0IHRoZSBwcm9wZXJ0eSBuYW1lcyBhcnJheSBpbnRvIGEgbWFrZXNoaWZ0IHNldC5cbnByb3BlcnRpZXMgPSB7fTtmb3IodmFyIGluZGV4PTAsbGVuZ3RoPWZpbHRlci5sZW5ndGgsdmFsdWU7aW5kZXggPCBsZW5ndGg7dmFsdWUgPSBmaWx0ZXJbaW5kZXgrK10sKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwodmFsdWUpLGNsYXNzTmFtZSA9PSBzdHJpbmdDbGFzcyB8fCBjbGFzc05hbWUgPT0gbnVtYmVyQ2xhc3MpICYmIChwcm9wZXJ0aWVzW3ZhbHVlXSA9IDEpKTt9fWlmKHdpZHRoKXtpZigoY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh3aWR0aCkpID09IG51bWJlckNsYXNzKXsgLy8gQ29udmVydCB0aGUgYHdpZHRoYCB0byBhbiBpbnRlZ2VyIGFuZCBjcmVhdGUgYSBzdHJpbmcgY29udGFpbmluZ1xuLy8gYHdpZHRoYCBudW1iZXIgb2Ygc3BhY2UgY2hhcmFjdGVycy5cbmlmKCh3aWR0aCAtPSB3aWR0aCAlIDEpID4gMCl7Zm9yKHdoaXRlc3BhY2UgPSBcIlwiLHdpZHRoID4gMTAgJiYgKHdpZHRoID0gMTApO3doaXRlc3BhY2UubGVuZ3RoIDwgd2lkdGg7d2hpdGVzcGFjZSArPSBcIiBcIik7fX1lbHNlIGlmKGNsYXNzTmFtZSA9PSBzdHJpbmdDbGFzcyl7d2hpdGVzcGFjZSA9IHdpZHRoLmxlbmd0aCA8PSAxMD93aWR0aDp3aWR0aC5zbGljZSgwLDEwKTt9fSAvLyBPcGVyYSA8PSA3LjU0dTIgZGlzY2FyZHMgdGhlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggZW1wdHkgc3RyaW5nIGtleXNcbi8vIChgXCJcImApIG9ubHkgaWYgdGhleSBhcmUgdXNlZCBkaXJlY3RseSB3aXRoaW4gYW4gb2JqZWN0IG1lbWJlciBsaXN0XG4vLyAoZS5nLiwgYCEoXCJcIiBpbiB7IFwiXCI6IDF9KWApLlxucmV0dXJuIHNlcmlhbGl6ZShcIlwiLCh2YWx1ZSA9IHt9LHZhbHVlW1wiXCJdID0gc291cmNlLHZhbHVlKSxjYWxsYmFjayxwcm9wZXJ0aWVzLHdoaXRlc3BhY2UsXCJcIixbXSk7fTt9IC8vIFB1YmxpYzogUGFyc2VzIGEgSlNPTiBzb3VyY2Ugc3RyaW5nLlxuaWYoIWhhcyhcImpzb24tcGFyc2VcIikpe3ZhciBmcm9tQ2hhckNvZGU9U3RyaW5nLmZyb21DaGFyQ29kZTsgLy8gSW50ZXJuYWw6IEEgbWFwIG9mIGVzY2FwZWQgY29udHJvbCBjaGFyYWN0ZXJzIGFuZCB0aGVpciB1bmVzY2FwZWRcbi8vIGVxdWl2YWxlbnRzLlxudmFyIFVuZXNjYXBlcz17OTI6XCJcXFxcXCIsMzQ6J1wiJyw0NzpcIi9cIiw5ODpcIlxcYlwiLDExNjpcIlxcdFwiLDExMDpcIlxcblwiLDEwMjpcIlxcZlwiLDExNDpcIlxcclwifTsgLy8gSW50ZXJuYWw6IFN0b3JlcyB0aGUgcGFyc2VyIHN0YXRlLlxudmFyIEluZGV4LFNvdXJjZTsgLy8gSW50ZXJuYWw6IFJlc2V0cyB0aGUgcGFyc2VyIHN0YXRlIGFuZCB0aHJvd3MgYSBgU3ludGF4RXJyb3JgLlxudmFyIGFib3J0PWZ1bmN0aW9uIGFib3J0KCl7SW5kZXggPSBTb3VyY2UgPSBudWxsO3Rocm93IFN5bnRheEVycm9yKCk7fTsgLy8gSW50ZXJuYWw6IFJldHVybnMgdGhlIG5leHQgdG9rZW4sIG9yIGBcIiRcImAgaWYgdGhlIHBhcnNlciBoYXMgcmVhY2hlZFxuLy8gdGhlIGVuZCBvZiB0aGUgc291cmNlIHN0cmluZy4gQSB0b2tlbiBtYXkgYmUgYSBzdHJpbmcsIG51bWJlciwgYG51bGxgXG4vLyBsaXRlcmFsLCBvciBCb29sZWFuIGxpdGVyYWwuXG52YXIgbGV4PWZ1bmN0aW9uIGxleCgpe3ZhciBzb3VyY2U9U291cmNlLGxlbmd0aD1zb3VyY2UubGVuZ3RoLHZhbHVlLGJlZ2luLHBvc2l0aW9uLGlzU2lnbmVkLGNoYXJDb2RlO3doaWxlKEluZGV4IDwgbGVuZ3RoKSB7Y2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7c3dpdGNoKGNoYXJDb2RlKXtjYXNlIDk6Y2FzZSAxMDpjYXNlIDEzOmNhc2UgMzI6IC8vIFNraXAgd2hpdGVzcGFjZSB0b2tlbnMsIGluY2x1ZGluZyB0YWJzLCBjYXJyaWFnZSByZXR1cm5zLCBsaW5lXG4vLyBmZWVkcywgYW5kIHNwYWNlIGNoYXJhY3RlcnMuXG5JbmRleCsrO2JyZWFrO2Nhc2UgMTIzOmNhc2UgMTI1OmNhc2UgOTE6Y2FzZSA5MzpjYXNlIDU4OmNhc2UgNDQ6IC8vIFBhcnNlIGEgcHVuY3R1YXRvciB0b2tlbiAoYHtgLCBgfWAsIGBbYCwgYF1gLCBgOmAsIG9yIGAsYCkgYXRcbi8vIHRoZSBjdXJyZW50IHBvc2l0aW9uLlxudmFsdWUgPSBjaGFySW5kZXhCdWdneT9zb3VyY2UuY2hhckF0KEluZGV4KTpzb3VyY2VbSW5kZXhdO0luZGV4Kys7cmV0dXJuIHZhbHVlO2Nhc2UgMzQ6IC8vIGBcImAgZGVsaW1pdHMgYSBKU09OIHN0cmluZzsgYWR2YW5jZSB0byB0aGUgbmV4dCBjaGFyYWN0ZXIgYW5kXG4vLyBiZWdpbiBwYXJzaW5nIHRoZSBzdHJpbmcuIFN0cmluZyB0b2tlbnMgYXJlIHByZWZpeGVkIHdpdGggdGhlXG4vLyBzZW50aW5lbCBgQGAgY2hhcmFjdGVyIHRvIGRpc3Rpbmd1aXNoIHRoZW0gZnJvbSBwdW5jdHVhdG9ycyBhbmRcbi8vIGVuZC1vZi1zdHJpbmcgdG9rZW5zLlxuZm9yKHZhbHVlID0gXCJAXCIsSW5kZXgrKztJbmRleCA8IGxlbmd0aDspIHtjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtpZihjaGFyQ29kZSA8IDMyKXsgLy8gVW5lc2NhcGVkIEFTQ0lJIGNvbnRyb2wgY2hhcmFjdGVycyAodGhvc2Ugd2l0aCBhIGNvZGUgdW5pdFxuLy8gbGVzcyB0aGFuIHRoZSBzcGFjZSBjaGFyYWN0ZXIpIGFyZSBub3QgcGVybWl0dGVkLlxuYWJvcnQoKTt9ZWxzZSBpZihjaGFyQ29kZSA9PSA5Mil7IC8vIEEgcmV2ZXJzZSBzb2xpZHVzIChgXFxgKSBtYXJrcyB0aGUgYmVnaW5uaW5nIG9mIGFuIGVzY2FwZWRcbi8vIGNvbnRyb2wgY2hhcmFjdGVyIChpbmNsdWRpbmcgYFwiYCwgYFxcYCwgYW5kIGAvYCkgb3IgVW5pY29kZVxuLy8gZXNjYXBlIHNlcXVlbmNlLlxuY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtzd2l0Y2goY2hhckNvZGUpe2Nhc2UgOTI6Y2FzZSAzNDpjYXNlIDQ3OmNhc2UgOTg6Y2FzZSAxMTY6Y2FzZSAxMTA6Y2FzZSAxMDI6Y2FzZSAxMTQ6IC8vIFJldml2ZSBlc2NhcGVkIGNvbnRyb2wgY2hhcmFjdGVycy5cbnZhbHVlICs9IFVuZXNjYXBlc1tjaGFyQ29kZV07SW5kZXgrKzticmVhaztjYXNlIDExNzogLy8gYFxcdWAgbWFya3MgdGhlIGJlZ2lubmluZyBvZiBhIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlLlxuLy8gQWR2YW5jZSB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIGFuZCB2YWxpZGF0ZSB0aGVcbi8vIGZvdXItZGlnaXQgY29kZSBwb2ludC5cbmJlZ2luID0gKytJbmRleDtmb3IocG9zaXRpb24gPSBJbmRleCArIDQ7SW5kZXggPCBwb3NpdGlvbjtJbmRleCsrKSB7Y2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7IC8vIEEgdmFsaWQgc2VxdWVuY2UgY29tcHJpc2VzIGZvdXIgaGV4ZGlnaXRzIChjYXNlLVxuLy8gaW5zZW5zaXRpdmUpIHRoYXQgZm9ybSBhIHNpbmdsZSBoZXhhZGVjaW1hbCB2YWx1ZS5cbmlmKCEoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcgfHwgY2hhckNvZGUgPj0gOTcgJiYgY2hhckNvZGUgPD0gMTAyIHx8IGNoYXJDb2RlID49IDY1ICYmIGNoYXJDb2RlIDw9IDcwKSl7IC8vIEludmFsaWQgVW5pY29kZSBlc2NhcGUgc2VxdWVuY2UuXG5hYm9ydCgpO319IC8vIFJldml2ZSB0aGUgZXNjYXBlZCBjaGFyYWN0ZXIuXG52YWx1ZSArPSBmcm9tQ2hhckNvZGUoXCIweFwiICsgc291cmNlLnNsaWNlKGJlZ2luLEluZGV4KSk7YnJlYWs7ZGVmYXVsdDogLy8gSW52YWxpZCBlc2NhcGUgc2VxdWVuY2UuXG5hYm9ydCgpO319ZWxzZSB7aWYoY2hhckNvZGUgPT0gMzQpeyAvLyBBbiB1bmVzY2FwZWQgZG91YmxlLXF1b3RlIGNoYXJhY3RlciBtYXJrcyB0aGUgZW5kIG9mIHRoZVxuLy8gc3RyaW5nLlxuYnJlYWs7fWNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO2JlZ2luID0gSW5kZXg7IC8vIE9wdGltaXplIGZvciB0aGUgY29tbW9uIGNhc2Ugd2hlcmUgYSBzdHJpbmcgaXMgdmFsaWQuXG53aGlsZShjaGFyQ29kZSA+PSAzMiAmJiBjaGFyQ29kZSAhPSA5MiAmJiBjaGFyQ29kZSAhPSAzNCkge2NoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7fSAvLyBBcHBlbmQgdGhlIHN0cmluZyBhcy1pcy5cbnZhbHVlICs9IHNvdXJjZS5zbGljZShiZWdpbixJbmRleCk7fX1pZihzb3VyY2UuY2hhckNvZGVBdChJbmRleCkgPT0gMzQpeyAvLyBBZHZhbmNlIHRvIHRoZSBuZXh0IGNoYXJhY3RlciBhbmQgcmV0dXJuIHRoZSByZXZpdmVkIHN0cmluZy5cbkluZGV4Kys7cmV0dXJuIHZhbHVlO30gLy8gVW50ZXJtaW5hdGVkIHN0cmluZy5cbmFib3J0KCk7ZGVmYXVsdDogLy8gUGFyc2UgbnVtYmVycyBhbmQgbGl0ZXJhbHMuXG5iZWdpbiA9IEluZGV4OyAvLyBBZHZhbmNlIHBhc3QgdGhlIG5lZ2F0aXZlIHNpZ24sIGlmIG9uZSBpcyBzcGVjaWZpZWQuXG5pZihjaGFyQ29kZSA9PSA0NSl7aXNTaWduZWQgPSB0cnVlO2NoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7fSAvLyBQYXJzZSBhbiBpbnRlZ2VyIG9yIGZsb2F0aW5nLXBvaW50IHZhbHVlLlxuaWYoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpeyAvLyBMZWFkaW5nIHplcm9lcyBhcmUgaW50ZXJwcmV0ZWQgYXMgb2N0YWwgbGl0ZXJhbHMuXG5pZihjaGFyQ29kZSA9PSA0OCAmJiAoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCArIDEpLGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KSl7IC8vIElsbGVnYWwgb2N0YWwgbGl0ZXJhbC5cbmFib3J0KCk7fWlzU2lnbmVkID0gZmFsc2U7IC8vIFBhcnNlIHRoZSBpbnRlZ2VyIGNvbXBvbmVudC5cbmZvcig7SW5kZXggPCBsZW5ndGggJiYgKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpLGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTtJbmRleCsrKTsgLy8gRmxvYXRzIGNhbm5vdCBjb250YWluIGEgbGVhZGluZyBkZWNpbWFsIHBvaW50OyBob3dldmVyLCB0aGlzXG4vLyBjYXNlIGlzIGFscmVhZHkgYWNjb3VudGVkIGZvciBieSB0aGUgcGFyc2VyLlxuaWYoc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpID09IDQ2KXtwb3NpdGlvbiA9ICsrSW5kZXg7IC8vIFBhcnNlIHRoZSBkZWNpbWFsIGNvbXBvbmVudC5cbmZvcig7cG9zaXRpb24gPCBsZW5ndGggJiYgKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQocG9zaXRpb24pLGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTtwb3NpdGlvbisrKTtpZihwb3NpdGlvbiA9PSBJbmRleCl7IC8vIElsbGVnYWwgdHJhaWxpbmcgZGVjaW1hbC5cbmFib3J0KCk7fUluZGV4ID0gcG9zaXRpb247fSAvLyBQYXJzZSBleHBvbmVudHMuIFRoZSBgZWAgZGVub3RpbmcgdGhlIGV4cG9uZW50IGlzXG4vLyBjYXNlLWluc2Vuc2l0aXZlLlxuY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7aWYoY2hhckNvZGUgPT0gMTAxIHx8IGNoYXJDb2RlID09IDY5KXtjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpOyAvLyBTa2lwIHBhc3QgdGhlIHNpZ24gZm9sbG93aW5nIHRoZSBleHBvbmVudCwgaWYgb25lIGlzXG4vLyBzcGVjaWZpZWQuXG5pZihjaGFyQ29kZSA9PSA0MyB8fCBjaGFyQ29kZSA9PSA0NSl7SW5kZXgrKzt9IC8vIFBhcnNlIHRoZSBleHBvbmVudGlhbCBjb21wb25lbnQuXG5mb3IocG9zaXRpb24gPSBJbmRleDtwb3NpdGlvbiA8IGxlbmd0aCAmJiAoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChwb3NpdGlvbiksY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpO3Bvc2l0aW9uKyspO2lmKHBvc2l0aW9uID09IEluZGV4KXsgLy8gSWxsZWdhbCBlbXB0eSBleHBvbmVudC5cbmFib3J0KCk7fUluZGV4ID0gcG9zaXRpb247fSAvLyBDb2VyY2UgdGhlIHBhcnNlZCB2YWx1ZSB0byBhIEphdmFTY3JpcHQgbnVtYmVyLlxucmV0dXJuICtzb3VyY2Uuc2xpY2UoYmVnaW4sSW5kZXgpO30gLy8gQSBuZWdhdGl2ZSBzaWduIG1heSBvbmx5IHByZWNlZGUgbnVtYmVycy5cbmlmKGlzU2lnbmVkKXthYm9ydCgpO30gLy8gYHRydWVgLCBgZmFsc2VgLCBhbmQgYG51bGxgIGxpdGVyYWxzLlxuaWYoc291cmNlLnNsaWNlKEluZGV4LEluZGV4ICsgNCkgPT0gXCJ0cnVlXCIpe0luZGV4ICs9IDQ7cmV0dXJuIHRydWU7fWVsc2UgaWYoc291cmNlLnNsaWNlKEluZGV4LEluZGV4ICsgNSkgPT0gXCJmYWxzZVwiKXtJbmRleCArPSA1O3JldHVybiBmYWxzZTt9ZWxzZSBpZihzb3VyY2Uuc2xpY2UoSW5kZXgsSW5kZXggKyA0KSA9PSBcIm51bGxcIil7SW5kZXggKz0gNDtyZXR1cm4gbnVsbDt9IC8vIFVucmVjb2duaXplZCB0b2tlbi5cbmFib3J0KCk7fX0gLy8gUmV0dXJuIHRoZSBzZW50aW5lbCBgJGAgY2hhcmFjdGVyIGlmIHRoZSBwYXJzZXIgaGFzIHJlYWNoZWQgdGhlIGVuZFxuLy8gb2YgdGhlIHNvdXJjZSBzdHJpbmcuXG5yZXR1cm4gXCIkXCI7fTsgLy8gSW50ZXJuYWw6IFBhcnNlcyBhIEpTT04gYHZhbHVlYCB0b2tlbi5cbnZhciBnZXQ9ZnVuY3Rpb24gZ2V0KHZhbHVlKXt2YXIgcmVzdWx0cyxoYXNNZW1iZXJzO2lmKHZhbHVlID09IFwiJFwiKXsgLy8gVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQuXG5hYm9ydCgpO31pZih0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIil7aWYoKGNoYXJJbmRleEJ1Z2d5P3ZhbHVlLmNoYXJBdCgwKTp2YWx1ZVswXSkgPT0gXCJAXCIpeyAvLyBSZW1vdmUgdGhlIHNlbnRpbmVsIGBAYCBjaGFyYWN0ZXIuXG5yZXR1cm4gdmFsdWUuc2xpY2UoMSk7fSAvLyBQYXJzZSBvYmplY3QgYW5kIGFycmF5IGxpdGVyYWxzLlxuaWYodmFsdWUgPT0gXCJbXCIpeyAvLyBQYXJzZXMgYSBKU09OIGFycmF5LCByZXR1cm5pbmcgYSBuZXcgSmF2YVNjcmlwdCBhcnJheS5cbnJlc3VsdHMgPSBbXTtmb3IoOztoYXNNZW1iZXJzIHx8IChoYXNNZW1iZXJzID0gdHJ1ZSkpIHt2YWx1ZSA9IGxleCgpOyAvLyBBIGNsb3Npbmcgc3F1YXJlIGJyYWNrZXQgbWFya3MgdGhlIGVuZCBvZiB0aGUgYXJyYXkgbGl0ZXJhbC5cbmlmKHZhbHVlID09IFwiXVwiKXticmVhazt9IC8vIElmIHRoZSBhcnJheSBsaXRlcmFsIGNvbnRhaW5zIGVsZW1lbnRzLCB0aGUgY3VycmVudCB0b2tlblxuLy8gc2hvdWxkIGJlIGEgY29tbWEgc2VwYXJhdGluZyB0aGUgcHJldmlvdXMgZWxlbWVudCBmcm9tIHRoZVxuLy8gbmV4dC5cbmlmKGhhc01lbWJlcnMpe2lmKHZhbHVlID09IFwiLFwiKXt2YWx1ZSA9IGxleCgpO2lmKHZhbHVlID09IFwiXVwiKXsgLy8gVW5leHBlY3RlZCB0cmFpbGluZyBgLGAgaW4gYXJyYXkgbGl0ZXJhbC5cbmFib3J0KCk7fX1lbHNlIHsgLy8gQSBgLGAgbXVzdCBzZXBhcmF0ZSBlYWNoIGFycmF5IGVsZW1lbnQuXG5hYm9ydCgpO319IC8vIEVsaXNpb25zIGFuZCBsZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZC5cbmlmKHZhbHVlID09IFwiLFwiKXthYm9ydCgpO31yZXN1bHRzLnB1c2goZ2V0KHZhbHVlKSk7fXJldHVybiByZXN1bHRzO31lbHNlIGlmKHZhbHVlID09IFwie1wiKXsgLy8gUGFyc2VzIGEgSlNPTiBvYmplY3QsIHJldHVybmluZyBhIG5ldyBKYXZhU2NyaXB0IG9iamVjdC5cbnJlc3VsdHMgPSB7fTtmb3IoOztoYXNNZW1iZXJzIHx8IChoYXNNZW1iZXJzID0gdHJ1ZSkpIHt2YWx1ZSA9IGxleCgpOyAvLyBBIGNsb3NpbmcgY3VybHkgYnJhY2UgbWFya3MgdGhlIGVuZCBvZiB0aGUgb2JqZWN0IGxpdGVyYWwuXG5pZih2YWx1ZSA9PSBcIn1cIil7YnJlYWs7fSAvLyBJZiB0aGUgb2JqZWN0IGxpdGVyYWwgY29udGFpbnMgbWVtYmVycywgdGhlIGN1cnJlbnQgdG9rZW5cbi8vIHNob3VsZCBiZSBhIGNvbW1hIHNlcGFyYXRvci5cbmlmKGhhc01lbWJlcnMpe2lmKHZhbHVlID09IFwiLFwiKXt2YWx1ZSA9IGxleCgpO2lmKHZhbHVlID09IFwifVwiKXsgLy8gVW5leHBlY3RlZCB0cmFpbGluZyBgLGAgaW4gb2JqZWN0IGxpdGVyYWwuXG5hYm9ydCgpO319ZWxzZSB7IC8vIEEgYCxgIG11c3Qgc2VwYXJhdGUgZWFjaCBvYmplY3QgbWVtYmVyLlxuYWJvcnQoKTt9fSAvLyBMZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZCwgb2JqZWN0IHByb3BlcnR5IG5hbWVzIG11c3QgYmVcbi8vIGRvdWJsZS1xdW90ZWQgc3RyaW5ncywgYW5kIGEgYDpgIG11c3Qgc2VwYXJhdGUgZWFjaCBwcm9wZXJ0eVxuLy8gbmFtZSBhbmQgdmFsdWUuXG5pZih2YWx1ZSA9PSBcIixcIiB8fCB0eXBlb2YgdmFsdWUgIT0gXCJzdHJpbmdcIiB8fCAoY2hhckluZGV4QnVnZ3k/dmFsdWUuY2hhckF0KDApOnZhbHVlWzBdKSAhPSBcIkBcIiB8fCBsZXgoKSAhPSBcIjpcIil7YWJvcnQoKTt9cmVzdWx0c1t2YWx1ZS5zbGljZSgxKV0gPSBnZXQobGV4KCkpO31yZXR1cm4gcmVzdWx0czt9IC8vIFVuZXhwZWN0ZWQgdG9rZW4gZW5jb3VudGVyZWQuXG5hYm9ydCgpO31yZXR1cm4gdmFsdWU7fTsgLy8gSW50ZXJuYWw6IFVwZGF0ZXMgYSB0cmF2ZXJzZWQgb2JqZWN0IG1lbWJlci5cbnZhciB1cGRhdGU9ZnVuY3Rpb24gdXBkYXRlKHNvdXJjZSxwcm9wZXJ0eSxjYWxsYmFjayl7dmFyIGVsZW1lbnQ9d2Fsayhzb3VyY2UscHJvcGVydHksY2FsbGJhY2spO2lmKGVsZW1lbnQgPT09IHVuZGVmKXtkZWxldGUgc291cmNlW3Byb3BlcnR5XTt9ZWxzZSB7c291cmNlW3Byb3BlcnR5XSA9IGVsZW1lbnQ7fX07IC8vIEludGVybmFsOiBSZWN1cnNpdmVseSB0cmF2ZXJzZXMgYSBwYXJzZWQgSlNPTiBvYmplY3QsIGludm9raW5nIHRoZVxuLy8gYGNhbGxiYWNrYCBmdW5jdGlvbiBmb3IgZWFjaCB2YWx1ZS4gVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbi8vIGBXYWxrKGhvbGRlciwgbmFtZSlgIG9wZXJhdGlvbiBkZWZpbmVkIGluIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjIuXG52YXIgd2Fsaz1mdW5jdGlvbiB3YWxrKHNvdXJjZSxwcm9wZXJ0eSxjYWxsYmFjayl7dmFyIHZhbHVlPXNvdXJjZVtwcm9wZXJ0eV0sbGVuZ3RoO2lmKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiICYmIHZhbHVlKXsgLy8gYGZvckVhY2hgIGNhbid0IGJlIHVzZWQgdG8gdHJhdmVyc2UgYW4gYXJyYXkgaW4gT3BlcmEgPD0gOC41NFxuLy8gYmVjYXVzZSBpdHMgYE9iamVjdCNoYXNPd25Qcm9wZXJ0eWAgaW1wbGVtZW50YXRpb24gcmV0dXJucyBgZmFsc2VgXG4vLyBmb3IgYXJyYXkgaW5kaWNlcyAoZS5nLiwgYCFbMSwgMiwgM10uaGFzT3duUHJvcGVydHkoXCIwXCIpYCkuXG5pZihnZXRDbGFzcy5jYWxsKHZhbHVlKSA9PSBhcnJheUNsYXNzKXtmb3IobGVuZ3RoID0gdmFsdWUubGVuZ3RoO2xlbmd0aC0tOykge3VwZGF0ZSh2YWx1ZSxsZW5ndGgsY2FsbGJhY2spO319ZWxzZSB7Zm9yRWFjaCh2YWx1ZSxmdW5jdGlvbihwcm9wZXJ0eSl7dXBkYXRlKHZhbHVlLHByb3BlcnR5LGNhbGxiYWNrKTt9KTt9fXJldHVybiBjYWxsYmFjay5jYWxsKHNvdXJjZSxwcm9wZXJ0eSx2YWx1ZSk7fTsgLy8gUHVibGljOiBgSlNPTi5wYXJzZWAuIFNlZSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4yLlxuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uKHNvdXJjZSxjYWxsYmFjayl7dmFyIHJlc3VsdCx2YWx1ZTtJbmRleCA9IDA7U291cmNlID0gXCJcIiArIHNvdXJjZTtyZXN1bHQgPSBnZXQobGV4KCkpOyAvLyBJZiBhIEpTT04gc3RyaW5nIGNvbnRhaW5zIG11bHRpcGxlIHRva2VucywgaXQgaXMgaW52YWxpZC5cbmlmKGxleCgpICE9IFwiJFwiKXthYm9ydCgpO30gLy8gUmVzZXQgdGhlIHBhcnNlciBzdGF0ZS5cbkluZGV4ID0gU291cmNlID0gbnVsbDtyZXR1cm4gY2FsbGJhY2sgJiYgZ2V0Q2xhc3MuY2FsbChjYWxsYmFjaykgPT0gZnVuY3Rpb25DbGFzcz93YWxrKCh2YWx1ZSA9IHt9LHZhbHVlW1wiXCJdID0gcmVzdWx0LHZhbHVlKSxcIlwiLGNhbGxiYWNrKTpyZXN1bHQ7fTt9fWV4cG9ydHNbXCJydW5JbkNvbnRleHRcIl0gPSBydW5JbkNvbnRleHQ7cmV0dXJuIGV4cG9ydHM7fWlmKGZyZWVFeHBvcnRzICYmICFpc0xvYWRlcil7IC8vIEV4cG9ydCBmb3IgQ29tbW9uSlMgZW52aXJvbm1lbnRzLlxucnVuSW5Db250ZXh0KHJvb3QsZnJlZUV4cG9ydHMpO31lbHNlIHsgLy8gRXhwb3J0IGZvciB3ZWIgYnJvd3NlcnMgYW5kIEphdmFTY3JpcHQgZW5naW5lcy5cbnZhciBuYXRpdmVKU09OPXJvb3QuSlNPTixwcmV2aW91c0pTT049cm9vdFtcIkpTT04zXCJdLGlzUmVzdG9yZWQ9ZmFsc2U7dmFyIEpTT04zPXJ1bkluQ29udGV4dChyb290LHJvb3RbXCJKU09OM1wiXSA9IHsgLy8gUHVibGljOiBSZXN0b3JlcyB0aGUgb3JpZ2luYWwgdmFsdWUgb2YgdGhlIGdsb2JhbCBgSlNPTmAgb2JqZWN0IGFuZFxuLy8gcmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgYEpTT04zYCBvYmplY3QuXG5cIm5vQ29uZmxpY3RcIjpmdW5jdGlvbiBub0NvbmZsaWN0KCl7aWYoIWlzUmVzdG9yZWQpe2lzUmVzdG9yZWQgPSB0cnVlO3Jvb3QuSlNPTiA9IG5hdGl2ZUpTT047cm9vdFtcIkpTT04zXCJdID0gcHJldmlvdXNKU09OO25hdGl2ZUpTT04gPSBwcmV2aW91c0pTT04gPSBudWxsO31yZXR1cm4gSlNPTjM7fX0pO3Jvb3QuSlNPTiA9IHtcInBhcnNlXCI6SlNPTjMucGFyc2UsXCJzdHJpbmdpZnlcIjpKU09OMy5zdHJpbmdpZnl9O30gLy8gRXhwb3J0IGZvciBhc3luY2hyb25vdXMgbW9kdWxlIGxvYWRlcnMuXG5pZihpc0xvYWRlcil7ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIEpTT04zO30pO319KS5jYWxsKHRoaXMpO30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHt9XSw1MTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHMgPSB0b0FycmF5O2Z1bmN0aW9uIHRvQXJyYXkobGlzdCxpbmRleCl7dmFyIGFycmF5PVtdO2luZGV4ID0gaW5kZXggfHwgMDtmb3IodmFyIGk9aW5kZXggfHwgMDtpIDwgbGlzdC5sZW5ndGg7aSsrKSB7YXJyYXlbaSAtIGluZGV4XSA9IGxpc3RbaV07fXJldHVybiBhcnJheTt9fSx7fV19LHt9LFszMV0pKDMxKTt9KTt9XG5cbmNjLl9SRnBvcCgpOyJdfQ==
