require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AudioManager":[function(require,module,exports){
cc._RFpush(module, '63f2f1ufHNIJJemeWUUhfm5', 'AudioManager');
// Script\tool\AudioManager.js

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
},{}],"GameData":[function(require,module,exports){
cc._RFpush(module, '3561135iQFOEIfoLTO8G85P', 'GameData');
// Script\Data\GameData.js

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
// Script\GameList\GameListCell.js

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
cc._RFpush(module, '72723WvUhFK8rF7P/HeINQl', 'GameList');
// Script\GameList\GameList.js

'use strict';

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

        for (i = 0; i < 4; ++i) {
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
cc._RFpush(module, '270cfZBcSFGtbROuX4xZks7', 'Game');
// Script\Game\Game.js

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
cc._RFpush(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script\HelloWorld.js

'use strict';

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
        var socket = io('http://localhost:3000');
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
cc._RFpush(module, 'bf269SHOdVBvLyamtHjegxg', 'Login');
// Script\Login\Login.js

"use strict";

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
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"SigleImgBtn":[function(require,module,exports){
cc._RFpush(module, 'a310beKkwZApa5rKUMTDiY/', 'SigleImgBtn');
// Script\control\SigleImgBtn.js

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
cc._RFpush(module, 'a0f76uMHghGwr6/VfnCowWW', 'Tools');
// Script\tool\Tools.js

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
cc._RFpush(module, '9a0496Cgv9AiKruT5YbLnJV', 'UserIcon');
// Script\control\UserIcon.js

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
cc._RFpush(module, '7bc51a5FzNEnJVTYyIvT38D', 'socket.io');
// Script\tool\socket.io.js

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

},{}]},{},["GameListCell","Game","HelloWorld","GameData","AudioManager","GameList","socket.io","UserIcon","Tools","SigleImgBtn","Login"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9TY3JpcHQvdG9vbC9BdWRpb01hbmFnZXIuanMiLCJhc3NldHMvU2NyaXB0L0RhdGEvR2FtZURhdGEuanMiLCJhc3NldHMvU2NyaXB0L0dhbWVMaXN0L0dhbWVMaXN0Q2VsbC5qcyIsImFzc2V0cy9TY3JpcHQvR2FtZUxpc3QvR2FtZUxpc3QuanMiLCJhc3NldHMvU2NyaXB0L0dhbWUvR2FtZS5qcyIsImFzc2V0cy9TY3JpcHQvSGVsbG9Xb3JsZC5qcyIsImFzc2V0cy9TY3JpcHQvTG9naW4vTG9naW4uanMiLCJhc3NldHMvU2NyaXB0L2NvbnRyb2wvU2lnbGVJbWdCdG4uanMiLCJhc3NldHMvU2NyaXB0L3Rvb2wvVG9vbHMuanMiLCJhc3NldHMvU2NyaXB0L2NvbnRyb2wvVXNlckljb24uanMiLCJhc3NldHMvU2NyaXB0L3Rvb2wvc29ja2V0LmlvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzYzZjJmMXVmSE5JSkplbWVXVVVoZm01JywgJ0F1ZGlvTWFuYWdlcicpO1xuLy8gU2NyaXB0XFx0b29sXFxBdWRpb01hbmFnZXIuanNcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB3aW5BdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuXG4gICAgICAgIGxvc2VBdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuXG4gICAgICAgIGNhcmRBdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuXG4gICAgICAgIGJ1dHRvbkF1ZGlvOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hpcHNBdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuXG4gICAgICAgIGJnbToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHBsYXlNdXNpYzogZnVuY3Rpb24gcGxheU11c2ljKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5iZ20sIHRydWUpO1xuICAgIH0sXG5cbiAgICBwYXVzZU11c2ljOiBmdW5jdGlvbiBwYXVzZU11c2ljKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XG4gICAgfSxcblxuICAgIHJlc3VtZU11c2ljOiBmdW5jdGlvbiByZXN1bWVNdXNpYygpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lTXVzaWMoKTtcbiAgICB9LFxuXG4gICAgX3BsYXlTRlg6IGZ1bmN0aW9uIF9wbGF5U0ZYKGNsaXApIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChjbGlwLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIHBsYXlXaW46IGZ1bmN0aW9uIHBsYXlXaW4oKSB7XG4gICAgICAgIHRoaXMuX3BsYXlTRlgodGhpcy53aW5BdWRpbyk7XG4gICAgfSxcblxuICAgIHBsYXlMb3NlOiBmdW5jdGlvbiBwbGF5TG9zZSgpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmxvc2VBdWRpbyk7XG4gICAgfSxcblxuICAgIHBsYXlDYXJkOiBmdW5jdGlvbiBwbGF5Q2FyZCgpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmNhcmRBdWRpbyk7XG4gICAgfSxcblxuICAgIHBsYXlDaGlwczogZnVuY3Rpb24gcGxheUNoaXBzKCkge1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMuY2hpcHNBdWRpbyk7XG4gICAgfSxcblxuICAgIHBsYXlCdXR0b246IGZ1bmN0aW9uIHBsYXlCdXR0b24oKSB7XG4gICAgICAgIHRoaXMuX3BsYXlTRlgodGhpcy5idXR0b25BdWRpbyk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnMzU2MTEzNWlRRk9FSWZvTFRPOEc4NVAnLCAnR2FtZURhdGEnKTtcbi8vIFNjcmlwdFxcRGF0YVxcR2FtZURhdGEuanNcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzExNzYxZlA5eTFEUnFrTVF5Qi9kUTFDJywgJ0dhbWVMaXN0Q2VsbCcpO1xuLy8gU2NyaXB0XFxHYW1lTGlzdFxcR2FtZUxpc3RDZWxsLmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBNYWluU2NyaXB0Tm9kZToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICBHYW1lSWQ6IDAsXG4gICAgICAgIENvaW5OdW06IDAsXG4gICAgICAgIExhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBTcHJpdGVMaXN0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvLyB2YXIgaW1nID0gJ1Jlc291cmNlL1VJL3Jvb21CZycrdGhpcy5HYW1lSWQudG9TdHJpbmcoKSsnLnBuZyc7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGltZyk7XG4gICAgICAgIC8vIHZhciBmcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZShjYy51cmwucmF3KGltZykpO1xuXG4gICAgICAgIHZhciBjb20gPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAvL2NvbS5zcHJpdGVGcmFtZSA9IGZyYW1lO1xuXG4gICAgICAgIGNvbS5zcHJpdGVGcmFtZSA9IHRoaXMuU3ByaXRlTGlzdFt0aGlzLkdhbWVJZF07XG5cbiAgICAgICAgdGhpcy5MYWJlbC5zdHJpbmcgPSB0aGlzLkNvaW5OdW0udG9TdHJpbmcoKTtcbiAgICB9LFxuICAgIG9uQ2VsbENsaWNrZWQ6IGZ1bmN0aW9uIG9uQ2VsbENsaWNrZWQoKSB7XG4gICAgICAgIHRoaXMuTWFpblNjcmlwdE5vZGUuZ2V0Q29tcG9uZW50KCdHYW1lTGlzdCcpLm9uR2FtZVNlbGVjdGVkKHRoaXMuR2FtZUlkKTtcbiAgICB9XG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzcyNzIzV3ZVaEZLOHJGN1AvSGVJTlFsJywgJ0dhbWVMaXN0Jyk7XG4vLyBTY3JpcHRcXEdhbWVMaXN0XFxHYW1lTGlzdC5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXVkaW9NYW5hZ2VyOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIExpc3RMYXlvdXQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxheW91dFxuICAgICAgICB9LFxuICAgICAgICBDZWxsX3ByZWZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2VsZjogbnVsbCxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlciA9IHRoaXMuYXVkaW9NYW5hZ2VyLmdldENvbXBvbmVudCgnQXVkaW9NYW5hZ2VyJyk7XG4gICAgICAgIHRoaXMuYXVkaW9NYW5hZ2VyLnBsYXlNdXNpYygpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICAgICAgICAgIHZhciBuZXdDZWxsID0gY2MuaW5zdGFudGlhdGUodGhpcy5DZWxsX3ByZWZhYik7XG5cbiAgICAgICAgICAgIG5ld0NlbGwuZ2V0Q29tcG9uZW50KCdHYW1lTGlzdENlbGwnKS5HYW1lSWQgPSBpO1xuICAgICAgICAgICAgbmV3Q2VsbC5nZXRDb21wb25lbnQoJ0dhbWVMaXN0Q2VsbCcpLkNvaW5OdW0gPSAxMDAgKiBpO1xuICAgICAgICAgICAgbmV3Q2VsbC5nZXRDb21wb25lbnQoJ0dhbWVMaXN0Q2VsbCcpLk1haW5TY3JpcHROb2RlID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5MaXN0TGF5b3V0Lm5vZGUuYWRkQ2hpbGQobmV3Q2VsbCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTGlzdExheW91dCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25HYW1lU2VsZWN0ZWQ6IGZ1bmN0aW9uIG9uR2FtZVNlbGVjdGVkKGdhbWVpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhnYW1laWQgKyAn6KKr6YCJ5oupJyk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZScpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICcyNzBjZlpCY1NGR3RiUk91WDR4WmtzNycsICdHYW1lJyk7XG4vLyBTY3JpcHRcXEdhbWVcXEdhbWUuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGF1ZGlvTWFuYWdlcjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlciA9IHRoaXMuYXVkaW9NYW5hZ2VyLmdldENvbXBvbmVudCgnQXVkaW9NYW5hZ2VyJyk7XG4gICAgICAgIHRoaXMuYXVkaW9NYW5hZ2VyLnBsYXlNdXNpYygpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICcyODBjM3JzWkpKS25aOVJxYkFMVnd0SycsICdIZWxsb1dvcmxkJyk7XG4vLyBTY3JpcHRcXEhlbGxvV29ybGQuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgcm9vdCA9IHRoaXM7XG5cbiAgICAgICAgaWYgKGNjLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICB3aW5kb3cuaW8gPSBTb2NrZXRJTztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcXVpcmUoJ3NvY2tldC5pbycpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzb2NrZXQgPSBpbygnaHR0cDovL2xvY2FsaG9zdDozMDAwJyk7XG4gICAgICAgIHNvY2tldC5vbign5raI5oGvJywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc29ja2V0LmVtaXQoJ+eZu+W9lScsICdtZXNzYWdlJyk7XG4gICAgICAgIHNvY2tldC5lbWl0KCfmtojmga8nLCAnMTIzMTYxNjE2NTE2Jyk7XG5cbiAgICAgICAgLy9odHRwIGdldFxuXG4gICAgICAgIC8vIHZhciB4aHIgPSBjYy5sb2FkZXIuZ2V0WE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgLy8geGhyLm9wZW4oJ0dFVCcsJ2h0dHA6Ly9odHRwYmluLm9yZy9nZXQ/c2hvd19lbnY9MScsdHJ1ZSk7XG5cbiAgICAgICAgLy8geGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAvLyAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPD0gMjA3KSkge1xuICAgICAgICAvLyAgICAgICAgIHZhciBodHRwU3RhdHVzID0geGhyLnN0YXR1c1RleHQ7XG4gICAgICAgIC8vICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dC5zdWJzdHJpbmcoMCwgMTAwKSArIFwiLi4uXCI7XG4gICAgICAgIC8vICAgICAgICAgcm9vdC5sYWJlbC5zdHJpbmcgPSByZXNwb25zZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfTtcblxuICAgICAgICAvLyB4aHIuc2VuZCgpO1xuXG4gICAgICAgIC8vaHR0cCBwb3N0XG4gICAgICAgIC8vIHhoci5vcGVuKFwiUE9TVFwiLCBcImh0dHA6Ly9odHRwYmluLm9yZy9wb3N0XCIpO1xuICAgICAgICAvLyAvL3NldCBDb250ZW50LXR5cGUgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIiB0byBwb3N0IHBsYWluIHRleHRcbiAgICAgICAgLy8geGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIixcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTtcbiAgICAgICAgLy8geGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDw9IDIwNykpIHtcbiAgICAgICAgLy8gICAgICAgICB2YXIgaHR0cFN0YXR1cyA9IHhoci5zdGF0dXNUZXh0O1xuICAgICAgICAvLyAgICAgICAgIHZhciByZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQuc3Vic3RyaW5nKDAsIDEwMCkgKyBcIi4uLlwiO1xuICAgICAgICAvLyAgICAgICAgIHJvb3QubGFiZWwuc3RyaW5nID0gcmVzcG9uc2U7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH07XG4gICAgICAgIC8vIHhoci5zZW5kKFwicGxhaW4gdGV4dCBtZXNzYWdlXCIpO1xuXG4gICAgICAgIC8vIHNvY2tldFxuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2JmMjY5U0hPZFZCdkx5YW10SGplZ3hnJywgJ0xvZ2luJyk7XG4vLyBTY3JpcHRcXExvZ2luXFxMb2dpbi5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgcmVnaXN0ZXJMYXllcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGF1ZGlvTWFuYWdlcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuYXVkaW9NYW5hZ2VyID0gdGhpcy5hdWRpb01hbmFnZXIuZ2V0Q29tcG9uZW50KCdBdWRpb01hbmFnZXInKTtcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIucGxheU11c2ljKCk7XG4gICAgfSxcblxuICAgIG9uTG9nSW46IGZ1bmN0aW9uIG9uTG9nSW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9nSW5cIik7XG4gICAgfSxcblxuICAgIG9uUXVpY2tMb2dJbjogZnVuY3Rpb24gb25RdWlja0xvZ0luKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlFVaWNrbG9nSW5cIik7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnR2FtZUxpc3QnKTtcbiAgICB9LFxuXG4gICAgb25SZWdpc3RlcjogZnVuY3Rpb24gb25SZWdpc3RlcigpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckxheWVyLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uUmVnaXN0ZXJDbG9zZTogZnVuY3Rpb24gb25SZWdpc3RlckNsb3NlKCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyTGF5ZXIuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2EzMTBiZUtrd1pBcGE1cktVTVREaVkvJywgJ1NpZ2xlSW1nQnRuJyk7XG4vLyBTY3JpcHRcXGNvbnRyb2xcXFNpZ2xlSW1nQnRuLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLlRPVUNIX09ORV9CWV9PTkUsXG4gICAgICAgICAgICBzd2FsbG93VG91Y2hlczogdHJ1ZSxcbiAgICAgICAgICAgIG9uVG91Y2hCZWdhbjogZnVuY3Rpb24gb25Ub3VjaEJlZ2FuKHRvdWNoLCBldmVudCkge1xuXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLnNldFNjYWxlKDIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRhZmRcIik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRvdWNoRW5kOiBmdW5jdGlvbiBvblRvdWNoRW5kKHRvdWNoLCBldmVudCkge1xuXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLnNldFNjYWxlKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzZWxmLm5vZGUpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICdhMGY3NnVNSGdoR3dyNi9WZm5Db3dXVycsICdUb29scycpO1xuLy8gU2NyaXB0XFx0b29sXFxUb29scy5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG4gICAgR2V0UmFuZG9tTnVtOiBmdW5jdGlvbiBHZXRSYW5kb21OdW0oTWluLCBNYXgpIHtcbiAgICAgICAgdmFyIFJhbmdlID0gTWF4IC0gTWluO1xuICAgICAgICB2YXIgUmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHJldHVybiBNaW4gKyBNYXRoLnJvdW5kKFJhbmQgKiBSYW5nZSk7XG4gICAgfVxufSk7XG5cbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgR2V0UmFuZG9tTnVtOiBmdW5jdGlvbiBHZXRSYW5kb21OdW0oTWluLCBNYXgpIHtcbiAgICAgICAgdmFyIFJhbmdlID0gTWF4IC0gTWluO1xuICAgICAgICB2YXIgUmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHJldHVybiBNaW4gKyBNYXRoLnJvdW5kKFJhbmQgKiBSYW5nZSk7XG4gICAgfVxufTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICc5YTA0OTZDZ3Y5QWlLcnVUNVliTG5KVicsICdVc2VySWNvbicpO1xuLy8gU2NyaXB0XFxjb250cm9sXFxVc2VySWNvbi5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIEljb25JbmRleDogMCxcbiAgICAgICAgU3ByaXRlTGlzdDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBbXSxcbiAgICAgICAgICAgIHR5cGU6IFtjYy5TcHJpdGVGcmFtZV1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIGNvbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGlmICh0aGlzLkljb25JbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgdmFyIHRvb2xzID0gcmVxdWlyZSgnVG9vbHMnKTtcbiAgICAgICAgICAgIHRoaXMuSWNvbkluZGV4ID0gdG9vbHMuR2V0UmFuZG9tTnVtKDAsIHRoaXMuU3ByaXRlTGlzdC5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBjb20uc3ByaXRlRnJhbWUgPSB0aGlzLlNwcml0ZUxpc3RbdGhpcy5JY29uSW5kZXhdO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICc3YmM1MWE1RnpORW5KVlRZeUl2VDM4RCcsICdzb2NrZXQuaW8nKTtcbi8vIFNjcmlwdFxcdG9vbFxcc29ja2V0LmlvLmpzXG5cblwidXNlIHN0cmljdFwiO2lmKCFjYy5zeXMuaXNOYXRpdmUpeyhmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cyA9IGYoKTt9ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpO31lbHNlIHt2YXIgZztpZih0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKXtnID0gd2luZG93O31lbHNlIGlmKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpe2cgPSBnbG9iYWw7fWVsc2UgaWYodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe2cgPSBzZWxmO31lbHNlIHtnID0gdGhpczt9Zy5pbyA9IGYoKTt9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmUgPT0gXCJmdW5jdGlvblwiICYmIHJlcXVpcmU7aWYoIXUgJiYgYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBvICsgXCInXCIpO3Rocm93IChmLmNvZGUgPSBcIk1PRFVMRV9OT1RfRk9VTkRcIixmKTt9dmFyIGw9bltvXSA9IHtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpO30sbCxsLmV4cG9ydHMsZSx0LG4scik7fXJldHVybiBuW29dLmV4cG9ydHM7fXZhciBpPXR5cGVvZiByZXF1aXJlID09IFwiZnVuY3Rpb25cIiAmJiByZXF1aXJlO2Zvcih2YXIgbz0wO28gPCByLmxlbmd0aDtvKyspIHMocltvXSk7cmV0dXJuIHM7fSkoezE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe21vZHVsZS5leHBvcnRzID0gX2RlcmVxXygnLi9saWIvJyk7fSx7XCIuL2xpYi9cIjoyfV0sMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHMgPSBfZGVyZXFfKCcuL3NvY2tldCcpOyAvKipcclxuICogRXhwb3J0cyBwYXJzZXJcclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICpcclxuICovbW9kdWxlLmV4cG9ydHMucGFyc2VyID0gX2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpO30se1wiLi9zb2NrZXRcIjozLFwiZW5naW5lLmlvLXBhcnNlclwiOjE5fV0sMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxyXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxyXG4gKi92YXIgdHJhbnNwb3J0cz1fZGVyZXFfKCcuL3RyYW5zcG9ydHMnKTt2YXIgRW1pdHRlcj1fZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnNvY2tldCcpO3ZhciBpbmRleD1fZGVyZXFfKCdpbmRleG9mJyk7dmFyIHBhcnNlcj1fZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7dmFyIHBhcnNldXJpPV9kZXJlcV8oJ3BhcnNldXJpJyk7dmFyIHBhcnNlanNvbj1fZGVyZXFfKCdwYXJzZWpzb24nKTt2YXIgcGFyc2Vxcz1fZGVyZXFfKCdwYXJzZXFzJyk7IC8qKlxyXG4gKiBNb2R1bGUgZXhwb3J0cy5cclxuICovbW9kdWxlLmV4cG9ydHMgPSBTb2NrZXQ7IC8qKlxyXG4gKiBOb29wIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZnVuY3Rpb24gbm9vcCgpe30gLyoqXHJcbiAqIFNvY2tldCBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSB1cmkgb3Igb3B0aW9uc1xyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBTb2NrZXQodXJpLG9wdHMpe2lmKCEodGhpcyBpbnN0YW5jZW9mIFNvY2tldCkpcmV0dXJuIG5ldyBTb2NrZXQodXJpLG9wdHMpO29wdHMgPSBvcHRzIHx8IHt9O2lmKHVyaSAmJiAnb2JqZWN0JyA9PSB0eXBlb2YgdXJpKXtvcHRzID0gdXJpO3VyaSA9IG51bGw7fWlmKHVyaSl7dXJpID0gcGFyc2V1cmkodXJpKTtvcHRzLmhvc3RuYW1lID0gdXJpLmhvc3Q7b3B0cy5zZWN1cmUgPSB1cmkucHJvdG9jb2wgPT0gJ2h0dHBzJyB8fCB1cmkucHJvdG9jb2wgPT0gJ3dzcyc7b3B0cy5wb3J0ID0gdXJpLnBvcnQ7aWYodXJpLnF1ZXJ5KW9wdHMucXVlcnkgPSB1cmkucXVlcnk7fWVsc2UgaWYob3B0cy5ob3N0KXtvcHRzLmhvc3RuYW1lID0gcGFyc2V1cmkob3B0cy5ob3N0KS5ob3N0O310aGlzLnNlY3VyZSA9IG51bGwgIT0gb3B0cy5zZWN1cmU/b3B0cy5zZWN1cmU6Z2xvYmFsLmxvY2F0aW9uICYmICdodHRwczonID09IGxvY2F0aW9uLnByb3RvY29sO2lmKG9wdHMuaG9zdG5hbWUgJiYgIW9wdHMucG9ydCl7IC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbm9wdHMucG9ydCA9IHRoaXMuc2VjdXJlPyc0NDMnOic4MCc7fXRoaXMuYWdlbnQgPSBvcHRzLmFnZW50IHx8IGZhbHNlO3RoaXMuaG9zdG5hbWUgPSBvcHRzLmhvc3RuYW1lIHx8IChnbG9iYWwubG9jYXRpb24/bG9jYXRpb24uaG9zdG5hbWU6J2xvY2FsaG9zdCcpO3RoaXMucG9ydCA9IG9wdHMucG9ydCB8fCAoZ2xvYmFsLmxvY2F0aW9uICYmIGxvY2F0aW9uLnBvcnQ/bG9jYXRpb24ucG9ydDp0aGlzLnNlY3VyZT80NDM6ODApO3RoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5IHx8IHt9O2lmKCdzdHJpbmcnID09IHR5cGVvZiB0aGlzLnF1ZXJ5KXRoaXMucXVlcnkgPSBwYXJzZXFzLmRlY29kZSh0aGlzLnF1ZXJ5KTt0aGlzLnVwZ3JhZGUgPSBmYWxzZSAhPT0gb3B0cy51cGdyYWRlO3RoaXMucGF0aCA9IChvcHRzLnBhdGggfHwgJy9lbmdpbmUuaW8nKS5yZXBsYWNlKC9cXC8kLywnJykgKyAnLyc7dGhpcy5mb3JjZUpTT05QID0gISFvcHRzLmZvcmNlSlNPTlA7dGhpcy5qc29ucCA9IGZhbHNlICE9PSBvcHRzLmpzb25wO3RoaXMuZm9yY2VCYXNlNjQgPSAhIW9wdHMuZm9yY2VCYXNlNjQ7dGhpcy5lbmFibGVzWERSID0gISFvcHRzLmVuYWJsZXNYRFI7dGhpcy50aW1lc3RhbXBQYXJhbSA9IG9wdHMudGltZXN0YW1wUGFyYW0gfHwgJ3QnO3RoaXMudGltZXN0YW1wUmVxdWVzdHMgPSBvcHRzLnRpbWVzdGFtcFJlcXVlc3RzO3RoaXMudHJhbnNwb3J0cyA9IG9wdHMudHJhbnNwb3J0cyB8fCBbJ3BvbGxpbmcnLCd3ZWJzb2NrZXQnXTt0aGlzLnJlYWR5U3RhdGUgPSAnJzt0aGlzLndyaXRlQnVmZmVyID0gW107dGhpcy5wb2xpY3lQb3J0ID0gb3B0cy5wb2xpY3lQb3J0IHx8IDg0Mzt0aGlzLnJlbWVtYmVyVXBncmFkZSA9IG9wdHMucmVtZW1iZXJVcGdyYWRlIHx8IGZhbHNlO3RoaXMuYmluYXJ5VHlwZSA9IG51bGw7dGhpcy5vbmx5QmluYXJ5VXBncmFkZXMgPSBvcHRzLm9ubHlCaW5hcnlVcGdyYWRlczt0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0gZmFsc2UgIT09IG9wdHMucGVyTWVzc2FnZURlZmxhdGU/b3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSB8fCB7fTpmYWxzZTtpZih0cnVlID09PSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlKXRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSB7fTtpZih0aGlzLnBlck1lc3NhZ2VEZWZsYXRlICYmIG51bGwgPT0gdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpe3RoaXMucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkID0gMTAyNDt9IC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxudGhpcy5wZnggPSBvcHRzLnBmeCB8fCBudWxsO3RoaXMua2V5ID0gb3B0cy5rZXkgfHwgbnVsbDt0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2UgfHwgbnVsbDt0aGlzLmNlcnQgPSBvcHRzLmNlcnQgfHwgbnVsbDt0aGlzLmNhID0gb3B0cy5jYSB8fCBudWxsO3RoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycyB8fCBudWxsO3RoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPT09IHVuZGVmaW5lZD9udWxsOm9wdHMucmVqZWN0VW5hdXRob3JpemVkOyAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxudmFyIGZyZWVHbG9iYWw9dHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7aWYoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwpe2lmKG9wdHMuZXh0cmFIZWFkZXJzICYmIE9iamVjdC5rZXlzKG9wdHMuZXh0cmFIZWFkZXJzKS5sZW5ndGggPiAwKXt0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO319dGhpcy5vcGVuKCk7fVNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTsgLyoqXHJcbiAqIE1peCBpbiBgRW1pdHRlcmAuXHJcbiAqL0VtaXR0ZXIoU29ja2V0LnByb3RvdHlwZSk7IC8qKlxyXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9Tb2NrZXQucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7IC8vIHRoaXMgaXMgYW4gaW50XG4vKipcclxuICogRXhwb3NlIGRlcHMgZm9yIGxlZ2FjeSBjb21wYXRpYmlsaXR5XHJcbiAqIGFuZCBzdGFuZGFsb25lIGJyb3dzZXIgYWNjZXNzLlxyXG4gKi9Tb2NrZXQuU29ja2V0ID0gU29ja2V0O1NvY2tldC5UcmFuc3BvcnQgPSBfZGVyZXFfKCcuL3RyYW5zcG9ydCcpO1NvY2tldC50cmFuc3BvcnRzID0gX2RlcmVxXygnLi90cmFuc3BvcnRzJyk7U29ja2V0LnBhcnNlciA9IF9kZXJlcV8oJ2VuZ2luZS5pby1wYXJzZXInKTsgLyoqXHJcbiAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcclxuICogQHJldHVybiB7VHJhbnNwb3J0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5jcmVhdGVUcmFuc3BvcnQgPSBmdW5jdGlvbihuYW1lKXtkZWJ1ZygnY3JlYXRpbmcgdHJhbnNwb3J0IFwiJXNcIicsbmFtZSk7dmFyIHF1ZXJ5PWNsb25lKHRoaXMucXVlcnkpOyAvLyBhcHBlbmQgZW5naW5lLmlvIHByb3RvY29sIGlkZW50aWZpZXJcbnF1ZXJ5LkVJTyA9IHBhcnNlci5wcm90b2NvbDsgLy8gdHJhbnNwb3J0IG5hbWVcbnF1ZXJ5LnRyYW5zcG9ydCA9IG5hbWU7IC8vIHNlc3Npb24gaWQgaWYgd2UgYWxyZWFkeSBoYXZlIG9uZVxuaWYodGhpcy5pZClxdWVyeS5zaWQgPSB0aGlzLmlkO3ZhciB0cmFuc3BvcnQ9bmV3IHRyYW5zcG9ydHNbbmFtZV0oe2FnZW50OnRoaXMuYWdlbnQsaG9zdG5hbWU6dGhpcy5ob3N0bmFtZSxwb3J0OnRoaXMucG9ydCxzZWN1cmU6dGhpcy5zZWN1cmUscGF0aDp0aGlzLnBhdGgscXVlcnk6cXVlcnksZm9yY2VKU09OUDp0aGlzLmZvcmNlSlNPTlAsanNvbnA6dGhpcy5qc29ucCxmb3JjZUJhc2U2NDp0aGlzLmZvcmNlQmFzZTY0LGVuYWJsZXNYRFI6dGhpcy5lbmFibGVzWERSLHRpbWVzdGFtcFJlcXVlc3RzOnRoaXMudGltZXN0YW1wUmVxdWVzdHMsdGltZXN0YW1wUGFyYW06dGhpcy50aW1lc3RhbXBQYXJhbSxwb2xpY3lQb3J0OnRoaXMucG9saWN5UG9ydCxzb2NrZXQ6dGhpcyxwZng6dGhpcy5wZngsa2V5OnRoaXMua2V5LHBhc3NwaHJhc2U6dGhpcy5wYXNzcGhyYXNlLGNlcnQ6dGhpcy5jZXJ0LGNhOnRoaXMuY2EsY2lwaGVyczp0aGlzLmNpcGhlcnMscmVqZWN0VW5hdXRob3JpemVkOnRoaXMucmVqZWN0VW5hdXRob3JpemVkLHBlck1lc3NhZ2VEZWZsYXRlOnRoaXMucGVyTWVzc2FnZURlZmxhdGUsZXh0cmFIZWFkZXJzOnRoaXMuZXh0cmFIZWFkZXJzfSk7cmV0dXJuIHRyYW5zcG9ydDt9O2Z1bmN0aW9uIGNsb25lKG9iail7dmFyIG89e307Zm9yKHZhciBpIGluIG9iaikge2lmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSl7b1tpXSA9IG9ialtpXTt9fXJldHVybiBvO30gLyoqXHJcbiAqIEluaXRpYWxpemVzIHRyYW5zcG9ydCB0byB1c2UgYW5kIHN0YXJ0cyBwcm9iZS5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCl7dmFyIHRyYW5zcG9ydDtpZih0aGlzLnJlbWVtYmVyVXBncmFkZSAmJiBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzICYmIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKCd3ZWJzb2NrZXQnKSAhPSAtMSl7dHJhbnNwb3J0ID0gJ3dlYnNvY2tldCc7fWVsc2UgaWYoMCA9PT0gdGhpcy50cmFuc3BvcnRzLmxlbmd0aCl7IC8vIEVtaXQgZXJyb3Igb24gbmV4dCB0aWNrIHNvIGl0IGNhbiBiZSBsaXN0ZW5lZCB0b1xudmFyIHNlbGY9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7c2VsZi5lbWl0KCdlcnJvcicsJ05vIHRyYW5zcG9ydHMgYXZhaWxhYmxlJyk7fSwwKTtyZXR1cm47fWVsc2Uge3RyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTt9dGhpcy5yZWFkeVN0YXRlID0gJ29wZW5pbmcnOyAvLyBSZXRyeSB3aXRoIHRoZSBuZXh0IHRyYW5zcG9ydCBpZiB0aGUgdHJhbnNwb3J0IGlzIGRpc2FibGVkIChqc29ucDogZmFsc2UpXG50cnl7dHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTt9Y2F0Y2goZSkge3RoaXMudHJhbnNwb3J0cy5zaGlmdCgpO3RoaXMub3BlbigpO3JldHVybjt9dHJhbnNwb3J0Lm9wZW4oKTt0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO307IC8qKlxyXG4gKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUuc2V0VHJhbnNwb3J0ID0gZnVuY3Rpb24odHJhbnNwb3J0KXtkZWJ1Zygnc2V0dGluZyB0cmFuc3BvcnQgJXMnLHRyYW5zcG9ydC5uYW1lKTt2YXIgc2VsZj10aGlzO2lmKHRoaXMudHJhbnNwb3J0KXtkZWJ1ZygnY2xlYXJpbmcgZXhpc3RpbmcgdHJhbnNwb3J0ICVzJyx0aGlzLnRyYW5zcG9ydC5uYW1lKTt0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTt9IC8vIHNldCB1cCB0cmFuc3BvcnRcbnRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0OyAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xudHJhbnNwb3J0Lm9uKCdkcmFpbicsZnVuY3Rpb24oKXtzZWxmLm9uRHJhaW4oKTt9KS5vbigncGFja2V0JyxmdW5jdGlvbihwYWNrZXQpe3NlbGYub25QYWNrZXQocGFja2V0KTt9KS5vbignZXJyb3InLGZ1bmN0aW9uKGUpe3NlbGYub25FcnJvcihlKTt9KS5vbignY2xvc2UnLGZ1bmN0aW9uKCl7c2VsZi5vbkNsb3NlKCd0cmFuc3BvcnQgY2xvc2UnKTt9KTt9OyAvKipcclxuICogUHJvYmVzIGEgdHJhbnNwb3J0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUucHJvYmUgPSBmdW5jdGlvbihuYW1lKXtkZWJ1ZygncHJvYmluZyB0cmFuc3BvcnQgXCIlc1wiJyxuYW1lKTt2YXIgdHJhbnNwb3J0PXRoaXMuY3JlYXRlVHJhbnNwb3J0KG5hbWUse3Byb2JlOjF9KSxmYWlsZWQ9ZmFsc2Usc2VsZj10aGlzO1NvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtmdW5jdGlvbiBvblRyYW5zcG9ydE9wZW4oKXtpZihzZWxmLm9ubHlCaW5hcnlVcGdyYWRlcyl7dmFyIHVwZ3JhZGVMb3Nlc0JpbmFyeT0hdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiBzZWxmLnRyYW5zcG9ydC5zdXBwb3J0c0JpbmFyeTtmYWlsZWQgPSBmYWlsZWQgfHwgdXBncmFkZUxvc2VzQmluYXJ5O31pZihmYWlsZWQpcmV0dXJuO2RlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIG9wZW5lZCcsbmFtZSk7dHJhbnNwb3J0LnNlbmQoW3t0eXBlOidwaW5nJyxkYXRhOidwcm9iZSd9XSk7dHJhbnNwb3J0Lm9uY2UoJ3BhY2tldCcsZnVuY3Rpb24obXNnKXtpZihmYWlsZWQpcmV0dXJuO2lmKCdwb25nJyA9PSBtc2cudHlwZSAmJiAncHJvYmUnID09IG1zZy5kYXRhKXtkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBwb25nJyxuYW1lKTtzZWxmLnVwZ3JhZGluZyA9IHRydWU7c2VsZi5lbWl0KCd1cGdyYWRpbmcnLHRyYW5zcG9ydCk7aWYoIXRyYW5zcG9ydClyZXR1cm47U29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09IHRyYW5zcG9ydC5uYW1lO2RlYnVnKCdwYXVzaW5nIGN1cnJlbnQgdHJhbnNwb3J0IFwiJXNcIicsc2VsZi50cmFuc3BvcnQubmFtZSk7c2VsZi50cmFuc3BvcnQucGF1c2UoZnVuY3Rpb24oKXtpZihmYWlsZWQpcmV0dXJuO2lmKCdjbG9zZWQnID09IHNlbGYucmVhZHlTdGF0ZSlyZXR1cm47ZGVidWcoJ2NoYW5naW5nIHRyYW5zcG9ydCBhbmQgc2VuZGluZyB1cGdyYWRlIHBhY2tldCcpO2NsZWFudXAoKTtzZWxmLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO3RyYW5zcG9ydC5zZW5kKFt7dHlwZTondXBncmFkZSd9XSk7c2VsZi5lbWl0KCd1cGdyYWRlJyx0cmFuc3BvcnQpO3RyYW5zcG9ydCA9IG51bGw7c2VsZi51cGdyYWRpbmcgPSBmYWxzZTtzZWxmLmZsdXNoKCk7fSk7fWVsc2Uge2RlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCcsbmFtZSk7dmFyIGVycj1uZXcgRXJyb3IoJ3Byb2JlIGVycm9yJyk7ZXJyLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO3NlbGYuZW1pdCgndXBncmFkZUVycm9yJyxlcnIpO319KTt9ZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0KCl7aWYoZmFpbGVkKXJldHVybjsgLy8gQW55IGNhbGxiYWNrIGNhbGxlZCBieSB0cmFuc3BvcnQgc2hvdWxkIGJlIGlnbm9yZWQgc2luY2Ugbm93XG5mYWlsZWQgPSB0cnVlO2NsZWFudXAoKTt0cmFuc3BvcnQuY2xvc2UoKTt0cmFuc3BvcnQgPSBudWxsO30gLy9IYW5kbGUgYW55IGVycm9yIHRoYXQgaGFwcGVucyB3aGlsZSBwcm9iaW5nXG5mdW5jdGlvbiBvbmVycm9yKGVycil7dmFyIGVycm9yPW5ldyBFcnJvcigncHJvYmUgZXJyb3I6ICcgKyBlcnIpO2Vycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO2ZyZWV6ZVRyYW5zcG9ydCgpO2RlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCBiZWNhdXNlIG9mIGVycm9yOiAlcycsbmFtZSxlcnIpO3NlbGYuZW1pdCgndXBncmFkZUVycm9yJyxlcnJvcik7fWZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UoKXtvbmVycm9yKFwidHJhbnNwb3J0IGNsb3NlZFwiKTt9IC8vV2hlbiB0aGUgc29ja2V0IGlzIGNsb3NlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG5mdW5jdGlvbiBvbmNsb3NlKCl7b25lcnJvcihcInNvY2tldCBjbG9zZWRcIik7fSAvL1doZW4gdGhlIHNvY2tldCBpcyB1cGdyYWRlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG5mdW5jdGlvbiBvbnVwZ3JhZGUodG8pe2lmKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9IHRyYW5zcG9ydC5uYW1lKXtkZWJ1ZygnXCIlc1wiIHdvcmtzIC0gYWJvcnRpbmcgXCIlc1wiJyx0by5uYW1lLHRyYW5zcG9ydC5uYW1lKTtmcmVlemVUcmFuc3BvcnQoKTt9fSAvL1JlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbmZ1bmN0aW9uIGNsZWFudXAoKXt0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ29wZW4nLG9uVHJhbnNwb3J0T3Blbik7dHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsb25lcnJvcik7dHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsb25UcmFuc3BvcnRDbG9zZSk7c2VsZi5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLG9uY2xvc2UpO3NlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGluZycsb251cGdyYWRlKTt9dHJhbnNwb3J0Lm9uY2UoJ29wZW4nLG9uVHJhbnNwb3J0T3Blbik7dHJhbnNwb3J0Lm9uY2UoJ2Vycm9yJyxvbmVycm9yKTt0cmFuc3BvcnQub25jZSgnY2xvc2UnLG9uVHJhbnNwb3J0Q2xvc2UpO3RoaXMub25jZSgnY2xvc2UnLG9uY2xvc2UpO3RoaXMub25jZSgndXBncmFkaW5nJyxvbnVwZ3JhZGUpO3RyYW5zcG9ydC5vcGVuKCk7fTsgLyoqXHJcbiAqIENhbGxlZCB3aGVuIGNvbm5lY3Rpb24gaXMgZGVlbWVkIG9wZW4uXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24oKXtkZWJ1Zygnc29ja2V0IG9wZW4nKTt0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7U29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09IHRoaXMudHJhbnNwb3J0Lm5hbWU7dGhpcy5lbWl0KCdvcGVuJyk7dGhpcy5mbHVzaCgpOyAvLyB3ZSBjaGVjayBmb3IgYHJlYWR5U3RhdGVgIGluIGNhc2UgYW4gYG9wZW5gXG4vLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG5pZignb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMudXBncmFkZSAmJiB0aGlzLnRyYW5zcG9ydC5wYXVzZSl7ZGVidWcoJ3N0YXJ0aW5nIHVwZ3JhZGUgcHJvYmVzJyk7Zm9yKHZhciBpPTAsbD10aGlzLnVwZ3JhZGVzLmxlbmd0aDtpIDwgbDtpKyspIHt0aGlzLnByb2JlKHRoaXMudXBncmFkZXNbaV0pO319fTsgLyoqXHJcbiAqIEhhbmRsZXMgYSBwYWNrZXQuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KXtpZignb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUpe2RlYnVnKCdzb2NrZXQgcmVjZWl2ZTogdHlwZSBcIiVzXCIsIGRhdGEgXCIlc1wiJyxwYWNrZXQudHlwZSxwYWNrZXQuZGF0YSk7dGhpcy5lbWl0KCdwYWNrZXQnLHBhY2tldCk7IC8vIFNvY2tldCBpcyBsaXZlIC0gYW55IHBhY2tldCBjb3VudHNcbnRoaXMuZW1pdCgnaGVhcnRiZWF0Jyk7c3dpdGNoKHBhY2tldC50eXBlKXtjYXNlICdvcGVuJzp0aGlzLm9uSGFuZHNoYWtlKHBhcnNlanNvbihwYWNrZXQuZGF0YSkpO2JyZWFrO2Nhc2UgJ3BvbmcnOnRoaXMuc2V0UGluZygpO3RoaXMuZW1pdCgncG9uZycpO2JyZWFrO2Nhc2UgJ2Vycm9yJzp2YXIgZXJyPW5ldyBFcnJvcignc2VydmVyIGVycm9yJyk7ZXJyLmNvZGUgPSBwYWNrZXQuZGF0YTt0aGlzLm9uRXJyb3IoZXJyKTticmVhaztjYXNlICdtZXNzYWdlJzp0aGlzLmVtaXQoJ2RhdGEnLHBhY2tldC5kYXRhKTt0aGlzLmVtaXQoJ21lc3NhZ2UnLHBhY2tldC5kYXRhKTticmVhazt9fWVsc2Uge2RlYnVnKCdwYWNrZXQgcmVjZWl2ZWQgd2l0aCBzb2NrZXQgcmVhZHlTdGF0ZSBcIiVzXCInLHRoaXMucmVhZHlTdGF0ZSk7fX07IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBoYW5kc2hha2UgY29tcGxldGlvbi5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGhhbmRzaGFrZSBvYmpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25IYW5kc2hha2UgPSBmdW5jdGlvbihkYXRhKXt0aGlzLmVtaXQoJ2hhbmRzaGFrZScsZGF0YSk7dGhpcy5pZCA9IGRhdGEuc2lkO3RoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO3RoaXMudXBncmFkZXMgPSB0aGlzLmZpbHRlclVwZ3JhZGVzKGRhdGEudXBncmFkZXMpO3RoaXMucGluZ0ludGVydmFsID0gZGF0YS5waW5nSW50ZXJ2YWw7dGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7dGhpcy5vbk9wZW4oKTsgLy8gSW4gY2FzZSBvcGVuIGhhbmRsZXIgY2xvc2VzIHNvY2tldFxuaWYoJ2Nsb3NlZCcgPT0gdGhpcy5yZWFkeVN0YXRlKXJldHVybjt0aGlzLnNldFBpbmcoKTsgLy8gUHJvbG9uZyBsaXZlbmVzcyBvZiBzb2NrZXQgb24gaGVhcnRiZWF0XG50aGlzLnJlbW92ZUxpc3RlbmVyKCdoZWFydGJlYXQnLHRoaXMub25IZWFydGJlYXQpO3RoaXMub24oJ2hlYXJ0YmVhdCcsdGhpcy5vbkhlYXJ0YmVhdCk7fTsgLyoqXHJcbiAqIFJlc2V0cyBwaW5nIHRpbWVvdXQuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uSGVhcnRiZWF0ID0gZnVuY3Rpb24odGltZW91dCl7Y2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7dmFyIHNlbGY9dGhpcztzZWxmLnBpbmdUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aWYoJ2Nsb3NlZCcgPT0gc2VsZi5yZWFkeVN0YXRlKXJldHVybjtzZWxmLm9uQ2xvc2UoJ3BpbmcgdGltZW91dCcpO30sdGltZW91dCB8fCBzZWxmLnBpbmdJbnRlcnZhbCArIHNlbGYucGluZ1RpbWVvdXQpO307IC8qKlxyXG4gKiBQaW5ncyBzZXJ2ZXIgZXZlcnkgYHRoaXMucGluZ0ludGVydmFsYCBhbmQgZXhwZWN0cyByZXNwb25zZVxyXG4gKiB3aXRoaW4gYHRoaXMucGluZ1RpbWVvdXRgIG9yIGNsb3NlcyBjb25uZWN0aW9uLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5zZXRQaW5nID0gZnVuY3Rpb24oKXt2YXIgc2VsZj10aGlzO2NsZWFyVGltZW91dChzZWxmLnBpbmdJbnRlcnZhbFRpbWVyKTtzZWxmLnBpbmdJbnRlcnZhbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe2RlYnVnKCd3cml0aW5nIHBpbmcgcGFja2V0IC0gZXhwZWN0aW5nIHBvbmcgd2l0aGluICVzbXMnLHNlbGYucGluZ1RpbWVvdXQpO3NlbGYucGluZygpO3NlbGYub25IZWFydGJlYXQoc2VsZi5waW5nVGltZW91dCk7fSxzZWxmLnBpbmdJbnRlcnZhbCk7fTsgLyoqXHJcbiogU2VuZHMgYSBwaW5nIHBhY2tldC5cclxuKlxyXG4qIEBhcGkgcHJpdmF0ZVxyXG4qL1NvY2tldC5wcm90b3R5cGUucGluZyA9IGZ1bmN0aW9uKCl7dmFyIHNlbGY9dGhpczt0aGlzLnNlbmRQYWNrZXQoJ3BpbmcnLGZ1bmN0aW9uKCl7c2VsZi5lbWl0KCdwaW5nJyk7fSk7fTsgLyoqXHJcbiAqIENhbGxlZCBvbiBgZHJhaW5gIGV2ZW50XHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uRHJhaW4gPSBmdW5jdGlvbigpe3RoaXMud3JpdGVCdWZmZXIuc3BsaWNlKDAsdGhpcy5wcmV2QnVmZmVyTGVuKTsgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuLy8gZm9yIGV4YW1wbGUsIHdoZW4gdXBncmFkaW5nLCB1cGdyYWRlIHBhY2tldCBpcyBzZW50IG92ZXIsXG4vLyBhbmQgYSBub256ZXJvIHByZXZCdWZmZXJMZW4gY291bGQgY2F1c2UgcHJvYmxlbXMgb24gYGRyYWluYFxudGhpcy5wcmV2QnVmZmVyTGVuID0gMDtpZigwID09PSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCl7dGhpcy5lbWl0KCdkcmFpbicpO31lbHNlIHt0aGlzLmZsdXNoKCk7fX07IC8qKlxyXG4gKiBGbHVzaCB3cml0ZSBidWZmZXJzLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uKCl7aWYoJ2Nsb3NlZCcgIT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMudHJhbnNwb3J0LndyaXRhYmxlICYmICF0aGlzLnVwZ3JhZGluZyAmJiB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCl7ZGVidWcoJ2ZsdXNoaW5nICVkIHBhY2tldHMgaW4gc29ja2V0Jyx0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCk7dGhpcy50cmFuc3BvcnQuc2VuZCh0aGlzLndyaXRlQnVmZmVyKTsgLy8ga2VlcCB0cmFjayBvZiBjdXJyZW50IGxlbmd0aCBvZiB3cml0ZUJ1ZmZlclxuLy8gc3BsaWNlIHdyaXRlQnVmZmVyIGFuZCBjYWxsYmFja0J1ZmZlciBvbiBgZHJhaW5gXG50aGlzLnByZXZCdWZmZXJMZW4gPSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aDt0aGlzLmVtaXQoJ2ZsdXNoJyk7fX07IC8qKlxyXG4gKiBTZW5kcyBhIG1lc3NhZ2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXHJcbiAqIEByZXR1cm4ge1NvY2tldH0gZm9yIGNoYWluaW5nLlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9Tb2NrZXQucHJvdG90eXBlLndyaXRlID0gU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24obXNnLG9wdGlvbnMsZm4pe3RoaXMuc2VuZFBhY2tldCgnbWVzc2FnZScsbXNnLG9wdGlvbnMsZm4pO3JldHVybiB0aGlzO307IC8qKlxyXG4gKiBTZW5kcyBhIHBhY2tldC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHBhY2tldCB0eXBlLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5cclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5zZW5kUGFja2V0ID0gZnVuY3Rpb24odHlwZSxkYXRhLG9wdGlvbnMsZm4pe2lmKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpe2ZuID0gZGF0YTtkYXRhID0gdW5kZWZpbmVkO31pZignZnVuY3Rpb24nID09IHR5cGVvZiBvcHRpb25zKXtmbiA9IG9wdGlvbnM7b3B0aW9ucyA9IG51bGw7fWlmKCdjbG9zaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ2Nsb3NlZCcgPT0gdGhpcy5yZWFkeVN0YXRlKXtyZXR1cm47fW9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O29wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzczt2YXIgcGFja2V0PXt0eXBlOnR5cGUsZGF0YTpkYXRhLG9wdGlvbnM6b3B0aW9uc307dGhpcy5lbWl0KCdwYWNrZXRDcmVhdGUnLHBhY2tldCk7dGhpcy53cml0ZUJ1ZmZlci5wdXNoKHBhY2tldCk7aWYoZm4pdGhpcy5vbmNlKCdmbHVzaCcsZm4pO3RoaXMuZmx1c2goKTt9OyAvKipcclxuICogQ2xvc2VzIHRoZSBjb25uZWN0aW9uLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCl7aWYoJ29wZW5pbmcnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKXt0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2luZyc7dmFyIHNlbGY9dGhpcztpZih0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCl7dGhpcy5vbmNlKCdkcmFpbicsZnVuY3Rpb24oKXtpZih0aGlzLnVwZ3JhZGluZyl7d2FpdEZvclVwZ3JhZGUoKTt9ZWxzZSB7Y2xvc2UoKTt9fSk7fWVsc2UgaWYodGhpcy51cGdyYWRpbmcpe3dhaXRGb3JVcGdyYWRlKCk7fWVsc2Uge2Nsb3NlKCk7fX1mdW5jdGlvbiBjbG9zZSgpe3NlbGYub25DbG9zZSgnZm9yY2VkIGNsb3NlJyk7ZGVidWcoJ3NvY2tldCBjbG9zaW5nIC0gdGVsbGluZyB0cmFuc3BvcnQgdG8gY2xvc2UnKTtzZWxmLnRyYW5zcG9ydC5jbG9zZSgpO31mdW5jdGlvbiBjbGVhbnVwQW5kQ2xvc2UoKXtzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlJyxjbGVhbnVwQW5kQ2xvc2UpO3NlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGVFcnJvcicsY2xlYW51cEFuZENsb3NlKTtjbG9zZSgpO31mdW5jdGlvbiB3YWl0Rm9yVXBncmFkZSgpeyAvLyB3YWl0IGZvciB1cGdyYWRlIHRvIGZpbmlzaCBzaW5jZSB3ZSBjYW4ndCBzZW5kIHBhY2tldHMgd2hpbGUgcGF1c2luZyBhIHRyYW5zcG9ydFxuc2VsZi5vbmNlKCd1cGdyYWRlJyxjbGVhbnVwQW5kQ2xvc2UpO3NlbGYub25jZSgndXBncmFkZUVycm9yJyxjbGVhbnVwQW5kQ2xvc2UpO31yZXR1cm4gdGhpczt9OyAvKipcclxuICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGVycm9yXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbihlcnIpe2RlYnVnKCdzb2NrZXQgZXJyb3IgJWonLGVycik7U29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO3RoaXMuZW1pdCgnZXJyb3InLGVycik7dGhpcy5vbkNsb3NlKCd0cmFuc3BvcnQgZXJyb3InLGVycik7fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBjbG9zZS5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uKHJlYXNvbixkZXNjKXtpZignb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ2Nsb3NpbmcnID09IHRoaXMucmVhZHlTdGF0ZSl7ZGVidWcoJ3NvY2tldCBjbG9zZSB3aXRoIHJlYXNvbjogXCIlc1wiJyxyZWFzb24pO3ZhciBzZWxmPXRoaXM7IC8vIGNsZWFyIHRpbWVyc1xuY2xlYXJUaW1lb3V0KHRoaXMucGluZ0ludGVydmFsVGltZXIpO2NsZWFyVGltZW91dCh0aGlzLnBpbmdUaW1lb3V0VGltZXIpOyAvLyBzdG9wIGV2ZW50IGZyb20gZmlyaW5nIGFnYWluIGZvciB0cmFuc3BvcnRcbnRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygnY2xvc2UnKTsgLy8gZW5zdXJlIHRyYW5zcG9ydCB3b24ndCBzdGF5IG9wZW5cbnRoaXMudHJhbnNwb3J0LmNsb3NlKCk7IC8vIGlnbm9yZSBmdXJ0aGVyIHRyYW5zcG9ydCBjb21tdW5pY2F0aW9uXG50aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTsgLy8gc2V0IHJlYWR5IHN0YXRlXG50aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJzsgLy8gY2xlYXIgc2Vzc2lvbiBpZFxudGhpcy5pZCA9IG51bGw7IC8vIGVtaXQgY2xvc2UgZXZlbnRcbnRoaXMuZW1pdCgnY2xvc2UnLHJlYXNvbixkZXNjKTsgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4vLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbnNlbGYud3JpdGVCdWZmZXIgPSBbXTtzZWxmLnByZXZCdWZmZXJMZW4gPSAwO319OyAvKipcclxuICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHNlcnZlciB1cGdyYWRlc1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICpcclxuICovU29ja2V0LnByb3RvdHlwZS5maWx0ZXJVcGdyYWRlcyA9IGZ1bmN0aW9uKHVwZ3JhZGVzKXt2YXIgZmlsdGVyZWRVcGdyYWRlcz1bXTtmb3IodmFyIGk9MCxqPXVwZ3JhZGVzLmxlbmd0aDtpIDwgajtpKyspIHtpZih+aW5kZXgodGhpcy50cmFuc3BvcnRzLHVwZ3JhZGVzW2ldKSlmaWx0ZXJlZFVwZ3JhZGVzLnB1c2godXBncmFkZXNbaV0pO31yZXR1cm4gZmlsdGVyZWRVcGdyYWRlczt9O30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHtcIi4vdHJhbnNwb3J0XCI6NCxcIi4vdHJhbnNwb3J0c1wiOjUsXCJjb21wb25lbnQtZW1pdHRlclwiOjE1LFwiZGVidWdcIjoxNyxcImVuZ2luZS5pby1wYXJzZXJcIjoxOSxcImluZGV4b2ZcIjoyMyxcInBhcnNlanNvblwiOjI2LFwicGFyc2Vxc1wiOjI3LFwicGFyc2V1cmlcIjoyOH1dLDQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICovdmFyIHBhcnNlcj1fZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7dmFyIEVtaXR0ZXI9X2RlcmVxXygnY29tcG9uZW50LWVtaXR0ZXInKTsgLyoqXHJcbiAqIE1vZHVsZSBleHBvcnRzLlxyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IFRyYW5zcG9ydDsgLyoqXHJcbiAqIFRyYW5zcG9ydCBhYnN0cmFjdCBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBUcmFuc3BvcnQob3B0cyl7dGhpcy5wYXRoID0gb3B0cy5wYXRoO3RoaXMuaG9zdG5hbWUgPSBvcHRzLmhvc3RuYW1lO3RoaXMucG9ydCA9IG9wdHMucG9ydDt0aGlzLnNlY3VyZSA9IG9wdHMuc2VjdXJlO3RoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O3RoaXMudGltZXN0YW1wUGFyYW0gPSBvcHRzLnRpbWVzdGFtcFBhcmFtO3RoaXMudGltZXN0YW1wUmVxdWVzdHMgPSBvcHRzLnRpbWVzdGFtcFJlcXVlc3RzO3RoaXMucmVhZHlTdGF0ZSA9ICcnO3RoaXMuYWdlbnQgPSBvcHRzLmFnZW50IHx8IGZhbHNlO3RoaXMuc29ja2V0ID0gb3B0cy5zb2NrZXQ7dGhpcy5lbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSOyAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbnRoaXMucGZ4ID0gb3B0cy5wZng7dGhpcy5rZXkgPSBvcHRzLmtleTt0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2U7dGhpcy5jZXJ0ID0gb3B0cy5jZXJ0O3RoaXMuY2EgPSBvcHRzLmNhO3RoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVyczt0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkOyAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxudGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVyczt9IC8qKlxyXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxyXG4gKi9FbWl0dGVyKFRyYW5zcG9ydC5wcm90b3R5cGUpOyAvKipcclxuICogRW1pdHMgYW4gZXJyb3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7VHJhbnNwb3J0fSBmb3IgY2hhaW5pbmdcclxuICogQGFwaSBwdWJsaWNcclxuICovVHJhbnNwb3J0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24obXNnLGRlc2Mpe3ZhciBlcnI9bmV3IEVycm9yKG1zZyk7ZXJyLnR5cGUgPSAnVHJhbnNwb3J0RXJyb3InO2Vyci5kZXNjcmlwdGlvbiA9IGRlc2M7dGhpcy5lbWl0KCdlcnJvcicsZXJyKTtyZXR1cm4gdGhpczt9OyAvKipcclxuICogT3BlbnMgdGhlIHRyYW5zcG9ydC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovVHJhbnNwb3J0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKXtpZignY2xvc2VkJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJycgPT0gdGhpcy5yZWFkeVN0YXRlKXt0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7dGhpcy5kb09wZW4oKTt9cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovVHJhbnNwb3J0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCl7aWYoJ29wZW5pbmcnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKXt0aGlzLmRvQ2xvc2UoKTt0aGlzLm9uQ2xvc2UoKTt9cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1RyYW5zcG9ydC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKHBhY2tldHMpe2lmKCdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUpe3RoaXMud3JpdGUocGFja2V0cyk7fWVsc2Uge3Rocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IG5vdCBvcGVuJyk7fX07IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBvcGVuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9UcmFuc3BvcnQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uKCl7dGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO3RoaXMud3JpdGFibGUgPSB0cnVlO3RoaXMuZW1pdCgnb3BlbicpO307IC8qKlxyXG4gKiBDYWxsZWQgd2l0aCBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovVHJhbnNwb3J0LnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbihkYXRhKXt2YXIgcGFja2V0PXBhcnNlci5kZWNvZGVQYWNrZXQoZGF0YSx0aGlzLnNvY2tldC5iaW5hcnlUeXBlKTt0aGlzLm9uUGFja2V0KHBhY2tldCk7fTsgLyoqXHJcbiAqIENhbGxlZCB3aXRoIGEgZGVjb2RlZCBwYWNrZXQuXHJcbiAqL1RyYW5zcG9ydC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQpe3RoaXMuZW1pdCgncGFja2V0JyxwYWNrZXQpO307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBjbG9zZS5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1RyYW5zcG9ydC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uKCl7dGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7dGhpcy5lbWl0KCdjbG9zZScpO307fSx7XCJjb21wb25lbnQtZW1pdHRlclwiOjE1LFwiZW5naW5lLmlvLXBhcnNlclwiOjE5fV0sNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxyXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXHJcbiAqL3ZhciBYTUxIdHRwUmVxdWVzdD1fZGVyZXFfKCd4bWxodHRwcmVxdWVzdC1zc2wnKTt2YXIgWEhSPV9kZXJlcV8oJy4vcG9sbGluZy14aHInKTt2YXIgSlNPTlA9X2RlcmVxXygnLi9wb2xsaW5nLWpzb25wJyk7dmFyIHdlYnNvY2tldD1fZGVyZXFfKCcuL3dlYnNvY2tldCcpOyAvKipcclxuICogRXhwb3J0IHRyYW5zcG9ydHMuXHJcbiAqL2V4cG9ydHMucG9sbGluZyA9IHBvbGxpbmc7ZXhwb3J0cy53ZWJzb2NrZXQgPSB3ZWJzb2NrZXQ7IC8qKlxyXG4gKiBQb2xsaW5nIHRyYW5zcG9ydCBwb2x5bW9ycGhpYyBjb25zdHJ1Y3Rvci5cclxuICogRGVjaWRlcyBvbiB4aHIgdnMganNvbnAgYmFzZWQgb24gZmVhdHVyZSBkZXRlY3Rpb24uXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBwb2xsaW5nKG9wdHMpe3ZhciB4aHI7dmFyIHhkPWZhbHNlO3ZhciB4cz1mYWxzZTt2YXIganNvbnA9ZmFsc2UgIT09IG9wdHMuanNvbnA7aWYoZ2xvYmFsLmxvY2F0aW9uKXt2YXIgaXNTU0w9J2h0dHBzOicgPT0gbG9jYXRpb24ucHJvdG9jb2w7dmFyIHBvcnQ9bG9jYXRpb24ucG9ydDsgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuaWYoIXBvcnQpe3BvcnQgPSBpc1NTTD80NDM6ODA7fXhkID0gb3B0cy5ob3N0bmFtZSAhPSBsb2NhdGlvbi5ob3N0bmFtZSB8fCBwb3J0ICE9IG9wdHMucG9ydDt4cyA9IG9wdHMuc2VjdXJlICE9IGlzU1NMO31vcHRzLnhkb21haW4gPSB4ZDtvcHRzLnhzY2hlbWUgPSB4czt4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7aWYoJ29wZW4nIGluIHhociAmJiAhb3B0cy5mb3JjZUpTT05QKXtyZXR1cm4gbmV3IFhIUihvcHRzKTt9ZWxzZSB7aWYoIWpzb25wKXRocm93IG5ldyBFcnJvcignSlNPTlAgZGlzYWJsZWQnKTtyZXR1cm4gbmV3IEpTT05QKG9wdHMpO319fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se1wiLi9wb2xsaW5nLWpzb25wXCI6NixcIi4vcG9sbGluZy14aHJcIjo3LFwiLi93ZWJzb2NrZXRcIjo5LFwieG1saHR0cHJlcXVlc3Qtc3NsXCI6MTB9XSw2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXHJcbiAqIE1vZHVsZSByZXF1aXJlbWVudHMuXHJcbiAqL3ZhciBQb2xsaW5nPV9kZXJlcV8oJy4vcG9sbGluZycpO3ZhciBpbmhlcml0PV9kZXJlcV8oJ2NvbXBvbmVudC1pbmhlcml0Jyk7IC8qKlxyXG4gKiBNb2R1bGUgZXhwb3J0cy5cclxuICovbW9kdWxlLmV4cG9ydHMgPSBKU09OUFBvbGxpbmc7IC8qKlxyXG4gKiBDYWNoZWQgcmVndWxhciBleHByZXNzaW9ucy5cclxuICovdmFyIHJOZXdsaW5lPS9cXG4vZzt2YXIgckVzY2FwZWROZXdsaW5lPS9cXFxcbi9nOyAvKipcclxuICogR2xvYmFsIEpTT05QIGNhbGxiYWNrcy5cclxuICovdmFyIGNhbGxiYWNrczsgLyoqXHJcbiAqIENhbGxiYWNrcyBjb3VudC5cclxuICovdmFyIGluZGV4PTA7IC8qKlxyXG4gKiBOb29wLlxyXG4gKi9mdW5jdGlvbiBlbXB0eSgpe30gLyoqXHJcbiAqIEpTT05QIFBvbGxpbmcgY29uc3RydWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBKU09OUFBvbGxpbmcob3B0cyl7UG9sbGluZy5jYWxsKHRoaXMsb3B0cyk7dGhpcy5xdWVyeSA9IHRoaXMucXVlcnkgfHwge307IC8vIGRlZmluZSBnbG9iYWwgY2FsbGJhY2tzIGFycmF5IGlmIG5vdCBwcmVzZW50XG4vLyB3ZSBkbyB0aGlzIGhlcmUgKGxhemlseSkgdG8gYXZvaWQgdW5uZWVkZWQgZ2xvYmFsIHBvbGx1dGlvblxuaWYoIWNhbGxiYWNrcyl7IC8vIHdlIG5lZWQgdG8gY29uc2lkZXIgbXVsdGlwbGUgZW5naW5lcyBpbiB0aGUgc2FtZSBwYWdlXG5pZighZ2xvYmFsLl9fX2VpbylnbG9iYWwuX19fZWlvID0gW107Y2FsbGJhY2tzID0gZ2xvYmFsLl9fX2Vpbzt9IC8vIGNhbGxiYWNrIGlkZW50aWZpZXJcbnRoaXMuaW5kZXggPSBjYWxsYmFja3MubGVuZ3RoOyAvLyBhZGQgY2FsbGJhY2sgdG8ganNvbnAgZ2xvYmFsXG52YXIgc2VsZj10aGlzO2NhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uKG1zZyl7c2VsZi5vbkRhdGEobXNnKTt9KTsgLy8gYXBwZW5kIHRvIHF1ZXJ5IHN0cmluZ1xudGhpcy5xdWVyeS5qID0gdGhpcy5pbmRleDsgLy8gcHJldmVudCBzcHVyaW91cyBlcnJvcnMgZnJvbSBiZWluZyBlbWl0dGVkIHdoZW4gdGhlIHdpbmRvdyBpcyB1bmxvYWRlZFxuaWYoZ2xvYmFsLmRvY3VtZW50ICYmIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKXtnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJyxmdW5jdGlvbigpe2lmKHNlbGYuc2NyaXB0KXNlbGYuc2NyaXB0Lm9uZXJyb3IgPSBlbXB0eTt9LGZhbHNlKTt9fSAvKipcclxuICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxyXG4gKi9pbmhlcml0KEpTT05QUG9sbGluZyxQb2xsaW5nKTsgLypcclxuICogSlNPTlAgb25seSBzdXBwb3J0cyBiaW5hcnkgYXMgYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xyXG4gKi9KU09OUFBvbGxpbmcucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7IC8qKlxyXG4gKiBDbG9zZXMgdGhlIHNvY2tldC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL0pTT05QUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uKCl7aWYodGhpcy5zY3JpcHQpe3RoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO3RoaXMuc2NyaXB0ID0gbnVsbDt9aWYodGhpcy5mb3JtKXt0aGlzLmZvcm0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmZvcm0pO3RoaXMuZm9ybSA9IG51bGw7dGhpcy5pZnJhbWUgPSBudWxsO31Qb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlLmNhbGwodGhpcyk7fTsgLyoqXHJcbiAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9KU09OUFBvbGxpbmcucHJvdG90eXBlLmRvUG9sbCA9IGZ1bmN0aW9uKCl7dmFyIHNlbGY9dGhpczt2YXIgc2NyaXB0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO2lmKHRoaXMuc2NyaXB0KXt0aGlzLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0KTt0aGlzLnNjcmlwdCA9IG51bGw7fXNjcmlwdC5hc3luYyA9IHRydWU7c2NyaXB0LnNyYyA9IHRoaXMudXJpKCk7c2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbihlKXtzZWxmLm9uRXJyb3IoJ2pzb25wIHBvbGwgZXJyb3InLGUpO307dmFyIGluc2VydEF0PWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtpZihpbnNlcnRBdCl7aW5zZXJ0QXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LGluc2VydEF0KTt9ZWxzZSB7KGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQoc2NyaXB0KTt9dGhpcy5zY3JpcHQgPSBzY3JpcHQ7dmFyIGlzVUFnZWNrbz0ndW5kZWZpbmVkJyAhPSB0eXBlb2YgbmF2aWdhdG9yICYmIC9nZWNrby9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7aWYoaXNVQWdlY2tvKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dmFyIGlmcmFtZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpO30sMTAwKTt9fTsgLyoqXHJcbiAqIFdyaXRlcyB3aXRoIGEgaGlkZGVuIGlmcmFtZS5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdG8gc2VuZFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL0pTT05QUG9sbGluZy5wcm90b3R5cGUuZG9Xcml0ZSA9IGZ1bmN0aW9uKGRhdGEsZm4pe3ZhciBzZWxmPXRoaXM7aWYoIXRoaXMuZm9ybSl7dmFyIGZvcm09ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO3ZhciBhcmVhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7dmFyIGlkPXRoaXMuaWZyYW1lSWQgPSAnZWlvX2lmcmFtZV8nICsgdGhpcy5pbmRleDt2YXIgaWZyYW1lO2Zvcm0uY2xhc3NOYW1lID0gJ3NvY2tldGlvJztmb3JtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztmb3JtLnN0eWxlLnRvcCA9ICctMTAwMHB4Jztmb3JtLnN0eWxlLmxlZnQgPSAnLTEwMDBweCc7Zm9ybS50YXJnZXQgPSBpZDtmb3JtLm1ldGhvZCA9ICdQT1NUJztmb3JtLnNldEF0dHJpYnV0ZSgnYWNjZXB0LWNoYXJzZXQnLCd1dGYtOCcpO2FyZWEubmFtZSA9ICdkJztmb3JtLmFwcGVuZENoaWxkKGFyZWEpO2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7dGhpcy5mb3JtID0gZm9ybTt0aGlzLmFyZWEgPSBhcmVhO310aGlzLmZvcm0uYWN0aW9uID0gdGhpcy51cmkoKTtmdW5jdGlvbiBjb21wbGV0ZSgpe2luaXRJZnJhbWUoKTtmbigpO31mdW5jdGlvbiBpbml0SWZyYW1lKCl7aWYoc2VsZi5pZnJhbWUpe3RyeXtzZWxmLmZvcm0ucmVtb3ZlQ2hpbGQoc2VsZi5pZnJhbWUpO31jYXRjaChlKSB7c2VsZi5vbkVycm9yKCdqc29ucCBwb2xsaW5nIGlmcmFtZSByZW1vdmFsIGVycm9yJyxlKTt9fXRyeXsgLy8gaWU2IGR5bmFtaWMgaWZyYW1lcyB3aXRoIHRhcmdldD1cIlwiIHN1cHBvcnQgKHRoYW5rcyBDaHJpcyBMYW1iYWNoZXIpXG52YXIgaHRtbD0nPGlmcmFtZSBzcmM9XCJqYXZhc2NyaXB0OjBcIiBuYW1lPVwiJyArIHNlbGYuaWZyYW1lSWQgKyAnXCI+JztpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGh0bWwpO31jYXRjaChlKSB7aWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7aWZyYW1lLm5hbWUgPSBzZWxmLmlmcmFtZUlkO2lmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDowJzt9aWZyYW1lLmlkID0gc2VsZi5pZnJhbWVJZDtzZWxmLmZvcm0uYXBwZW5kQ2hpbGQoaWZyYW1lKTtzZWxmLmlmcmFtZSA9IGlmcmFtZTt9aW5pdElmcmFtZSgpOyAvLyBlc2NhcGUgXFxuIHRvIHByZXZlbnQgaXQgZnJvbSBiZWluZyBjb252ZXJ0ZWQgaW50byBcXHJcXG4gYnkgc29tZSBVQXNcbi8vIGRvdWJsZSBlc2NhcGluZyBpcyByZXF1aXJlZCBmb3IgZXNjYXBlZCBuZXcgbGluZXMgYmVjYXVzZSB1bmVzY2FwaW5nIG9mIG5ldyBsaW5lcyBjYW4gYmUgZG9uZSBzYWZlbHkgb24gc2VydmVyLXNpZGVcbmRhdGEgPSBkYXRhLnJlcGxhY2UockVzY2FwZWROZXdsaW5lLCdcXFxcXFxuJyk7dGhpcy5hcmVhLnZhbHVlID0gZGF0YS5yZXBsYWNlKHJOZXdsaW5lLCdcXFxcbicpO3RyeXt0aGlzLmZvcm0uc3VibWl0KCk7fWNhdGNoKGUpIHt9aWYodGhpcy5pZnJhbWUuYXR0YWNoRXZlbnQpe3RoaXMuaWZyYW1lLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7aWYoc2VsZi5pZnJhbWUucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKXtjb21wbGV0ZSgpO319O31lbHNlIHt0aGlzLmlmcmFtZS5vbmxvYWQgPSBjb21wbGV0ZTt9fTt9KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7XCIuL3BvbGxpbmdcIjo4LFwiY29tcG9uZW50LWluaGVyaXRcIjoxNn1dLDc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKipcclxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cclxuICovdmFyIFhNTEh0dHBSZXF1ZXN0PV9kZXJlcV8oJ3htbGh0dHByZXF1ZXN0LXNzbCcpO3ZhciBQb2xsaW5nPV9kZXJlcV8oJy4vcG9sbGluZycpO3ZhciBFbWl0dGVyPV9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7dmFyIGluaGVyaXQ9X2RlcmVxXygnY29tcG9uZW50LWluaGVyaXQnKTt2YXIgZGVidWc9X2RlcmVxXygnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpwb2xsaW5nLXhocicpOyAvKipcclxuICogTW9kdWxlIGV4cG9ydHMuXHJcbiAqL21vZHVsZS5leHBvcnRzID0gWEhSO21vZHVsZS5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0OyAvKipcclxuICogRW1wdHkgZnVuY3Rpb25cclxuICovZnVuY3Rpb24gZW1wdHkoKXt9IC8qKlxyXG4gKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gWEhSKG9wdHMpe1BvbGxpbmcuY2FsbCh0aGlzLG9wdHMpO2lmKGdsb2JhbC5sb2NhdGlvbil7dmFyIGlzU1NMPSdodHRwczonID09IGxvY2F0aW9uLnByb3RvY29sO3ZhciBwb3J0PWxvY2F0aW9uLnBvcnQ7IC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbmlmKCFwb3J0KXtwb3J0ID0gaXNTU0w/NDQzOjgwO310aGlzLnhkID0gb3B0cy5ob3N0bmFtZSAhPSBnbG9iYWwubG9jYXRpb24uaG9zdG5hbWUgfHwgcG9ydCAhPSBvcHRzLnBvcnQ7dGhpcy54cyA9IG9wdHMuc2VjdXJlICE9IGlzU1NMO31lbHNlIHt0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO319IC8qKlxyXG4gKiBJbmhlcml0cyBmcm9tIFBvbGxpbmcuXHJcbiAqL2luaGVyaXQoWEhSLFBvbGxpbmcpOyAvKipcclxuICogWEhSIHN1cHBvcnRzIGJpbmFyeVxyXG4gKi9YSFIucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTsgLyoqXHJcbiAqIENyZWF0ZXMgYSByZXF1ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9YSFIucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbihvcHRzKXtvcHRzID0gb3B0cyB8fCB7fTtvcHRzLnVyaSA9IHRoaXMudXJpKCk7b3B0cy54ZCA9IHRoaXMueGQ7b3B0cy54cyA9IHRoaXMueHM7b3B0cy5hZ2VudCA9IHRoaXMuYWdlbnQgfHwgZmFsc2U7b3B0cy5zdXBwb3J0c0JpbmFyeSA9IHRoaXMuc3VwcG9ydHNCaW5hcnk7b3B0cy5lbmFibGVzWERSID0gdGhpcy5lbmFibGVzWERSOyAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbm9wdHMucGZ4ID0gdGhpcy5wZng7b3B0cy5rZXkgPSB0aGlzLmtleTtvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7b3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O29wdHMuY2EgPSB0aGlzLmNhO29wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkOyAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxub3B0cy5leHRyYUhlYWRlcnMgPSB0aGlzLmV4dHJhSGVhZGVycztyZXR1cm4gbmV3IFJlcXVlc3Qob3B0cyk7fTsgLyoqXHJcbiAqIFNlbmRzIGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmQuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovWEhSLnByb3RvdHlwZS5kb1dyaXRlID0gZnVuY3Rpb24oZGF0YSxmbil7dmFyIGlzQmluYXJ5PXR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJyAmJiBkYXRhICE9PSB1bmRlZmluZWQ7dmFyIHJlcT10aGlzLnJlcXVlc3Qoe21ldGhvZDonUE9TVCcsZGF0YTpkYXRhLGlzQmluYXJ5OmlzQmluYXJ5fSk7dmFyIHNlbGY9dGhpcztyZXEub24oJ3N1Y2Nlc3MnLGZuKTtyZXEub24oJ2Vycm9yJyxmdW5jdGlvbihlcnIpe3NlbGYub25FcnJvcigneGhyIHBvc3QgZXJyb3InLGVycik7fSk7dGhpcy5zZW5kWGhyID0gcmVxO307IC8qKlxyXG4gKiBTdGFydHMgYSBwb2xsIGN5Y2xlLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovWEhSLnByb3RvdHlwZS5kb1BvbGwgPSBmdW5jdGlvbigpe2RlYnVnKCd4aHIgcG9sbCcpO3ZhciByZXE9dGhpcy5yZXF1ZXN0KCk7dmFyIHNlbGY9dGhpcztyZXEub24oJ2RhdGEnLGZ1bmN0aW9uKGRhdGEpe3NlbGYub25EYXRhKGRhdGEpO30pO3JlcS5vbignZXJyb3InLGZ1bmN0aW9uKGVycil7c2VsZi5vbkVycm9yKCd4aHIgcG9sbCBlcnJvcicsZXJyKTt9KTt0aGlzLnBvbGxYaHIgPSByZXE7fTsgLyoqXHJcbiAqIFJlcXVlc3QgY29uc3RydWN0b3JcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gUmVxdWVzdChvcHRzKXt0aGlzLm1ldGhvZCA9IG9wdHMubWV0aG9kIHx8ICdHRVQnO3RoaXMudXJpID0gb3B0cy51cmk7dGhpcy54ZCA9ICEhb3B0cy54ZDt0aGlzLnhzID0gISFvcHRzLnhzO3RoaXMuYXN5bmMgPSBmYWxzZSAhPT0gb3B0cy5hc3luYzt0aGlzLmRhdGEgPSB1bmRlZmluZWQgIT0gb3B0cy5kYXRhP29wdHMuZGF0YTpudWxsO3RoaXMuYWdlbnQgPSBvcHRzLmFnZW50O3RoaXMuaXNCaW5hcnkgPSBvcHRzLmlzQmluYXJ5O3RoaXMuc3VwcG9ydHNCaW5hcnkgPSBvcHRzLnN1cHBvcnRzQmluYXJ5O3RoaXMuZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjsgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG50aGlzLnBmeCA9IG9wdHMucGZ4O3RoaXMua2V5ID0gb3B0cy5rZXk7dGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlO3RoaXMuY2VydCA9IG9wdHMuY2VydDt0aGlzLmNhID0gb3B0cy5jYTt0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnM7dGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDsgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbnRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7dGhpcy5jcmVhdGUoKTt9IC8qKlxyXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxyXG4gKi9FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTsgLyoqXHJcbiAqIENyZWF0ZXMgdGhlIFhIUiBvYmplY3QgYW5kIHNlbmRzIHRoZSByZXF1ZXN0LlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovUmVxdWVzdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXt2YXIgb3B0cz17YWdlbnQ6dGhpcy5hZ2VudCx4ZG9tYWluOnRoaXMueGQseHNjaGVtZTp0aGlzLnhzLGVuYWJsZXNYRFI6dGhpcy5lbmFibGVzWERSfTsgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG5vcHRzLnBmeCA9IHRoaXMucGZ4O29wdHMua2V5ID0gdGhpcy5rZXk7b3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO29wdHMuY2VydCA9IHRoaXMuY2VydDtvcHRzLmNhID0gdGhpcy5jYTtvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7b3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDt2YXIgeGhyPXRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpO3ZhciBzZWxmPXRoaXM7dHJ5e2RlYnVnKCd4aHIgb3BlbiAlczogJXMnLHRoaXMubWV0aG9kLHRoaXMudXJpKTt4aHIub3Blbih0aGlzLm1ldGhvZCx0aGlzLnVyaSx0aGlzLmFzeW5jKTt0cnl7aWYodGhpcy5leHRyYUhlYWRlcnMpe3hoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sodHJ1ZSk7Zm9yKHZhciBpIGluIHRoaXMuZXh0cmFIZWFkZXJzKSB7aWYodGhpcy5leHRyYUhlYWRlcnMuaGFzT3duUHJvcGVydHkoaSkpe3hoci5zZXRSZXF1ZXN0SGVhZGVyKGksdGhpcy5leHRyYUhlYWRlcnNbaV0pO319fX1jYXRjaChlKSB7fWlmKHRoaXMuc3VwcG9ydHNCaW5hcnkpeyAvLyBUaGlzIGhhcyB0byBiZSBkb25lIGFmdGVyIG9wZW4gYmVjYXVzZSBGaXJlZm94IGlzIHN0dXBpZFxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMzIxNjkwMy9nZXQtYmluYXJ5LWRhdGEtd2l0aC14bWxodHRwcmVxdWVzdC1pbi1hLWZpcmVmb3gtZXh0ZW5zaW9uXG54aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJzt9aWYoJ1BPU1QnID09IHRoaXMubWV0aG9kKXt0cnl7aWYodGhpcy5pc0JpbmFyeSl7eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpO31lbHNlIHt4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jyk7fX1jYXRjaChlKSB7fX0gLy8gaWU2IGNoZWNrXG5pZignd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpe3hoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO31pZih0aGlzLmhhc1hEUigpKXt4aHIub25sb2FkID0gZnVuY3Rpb24oKXtzZWxmLm9uTG9hZCgpO307eGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpe3NlbGYub25FcnJvcih4aHIucmVzcG9uc2VUZXh0KTt9O31lbHNlIHt4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtpZig0ICE9IHhoci5yZWFkeVN0YXRlKXJldHVybjtpZigyMDAgPT0geGhyLnN0YXR1cyB8fCAxMjIzID09IHhoci5zdGF0dXMpe3NlbGYub25Mb2FkKCk7fWVsc2UgeyAvLyBtYWtlIHN1cmUgdGhlIGBlcnJvcmAgZXZlbnQgaGFuZGxlciB0aGF0J3MgdXNlci1zZXRcbi8vIGRvZXMgbm90IHRocm93IGluIHRoZSBzYW1lIHRpY2sgYW5kIGdldHMgY2F1Z2h0IGhlcmVcbnNldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLm9uRXJyb3IoeGhyLnN0YXR1cyk7fSwwKTt9fTt9ZGVidWcoJ3hociBkYXRhICVzJyx0aGlzLmRhdGEpO3hoci5zZW5kKHRoaXMuZGF0YSk7fWNhdGNoKGUpIHsgLy8gTmVlZCB0byBkZWZlciBzaW5jZSAuY3JlYXRlKCkgaXMgY2FsbGVkIGRpcmVjdGx5IGZocm9tIHRoZSBjb25zdHJ1Y3RvclxuLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4vLyBvY2N1cnMuICBUaGVyZWZvcmUsIGFsc28sIHdlIGNhbm5vdCB0aHJvdyBoZXJlIGF0IGFsbC5cbnNldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLm9uRXJyb3IoZSk7fSwwKTtyZXR1cm47fWlmKGdsb2JhbC5kb2N1bWVudCl7dGhpcy5pbmRleCA9IFJlcXVlc3QucmVxdWVzdHNDb3VudCsrO1JlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF0gPSB0aGlzO319OyAvKipcclxuICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZXNwb25zZS5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1JlcXVlc3QucHJvdG90eXBlLm9uU3VjY2VzcyA9IGZ1bmN0aW9uKCl7dGhpcy5lbWl0KCdzdWNjZXNzJyk7dGhpcy5jbGVhbnVwKCk7fTsgLyoqXHJcbiAqIENhbGxlZCBpZiB3ZSBoYXZlIGRhdGEuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9SZXF1ZXN0LnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbihkYXRhKXt0aGlzLmVtaXQoJ2RhdGEnLGRhdGEpO3RoaXMub25TdWNjZXNzKCk7fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIGVycm9yLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovUmVxdWVzdC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uKGVycil7dGhpcy5lbWl0KCdlcnJvcicsZXJyKTt0aGlzLmNsZWFudXAodHJ1ZSk7fTsgLyoqXHJcbiAqIENsZWFucyB1cCBob3VzZS5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1JlcXVlc3QucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbihmcm9tRXJyb3Ipe2lmKCd1bmRlZmluZWQnID09IHR5cGVvZiB0aGlzLnhociB8fCBudWxsID09PSB0aGlzLnhocil7cmV0dXJuO30gLy8geG1saHR0cHJlcXVlc3RcbmlmKHRoaXMuaGFzWERSKCkpe3RoaXMueGhyLm9ubG9hZCA9IHRoaXMueGhyLm9uZXJyb3IgPSBlbXB0eTt9ZWxzZSB7dGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHk7fWlmKGZyb21FcnJvcil7dHJ5e3RoaXMueGhyLmFib3J0KCk7fWNhdGNoKGUpIHt9fWlmKGdsb2JhbC5kb2N1bWVudCl7ZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07fXRoaXMueGhyID0gbnVsbDt9OyAvKipcclxuICogQ2FsbGVkIHVwb24gbG9hZC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1JlcXVlc3QucHJvdG90eXBlLm9uTG9hZCA9IGZ1bmN0aW9uKCl7dmFyIGRhdGE7dHJ5e3ZhciBjb250ZW50VHlwZTt0cnl7Y29udGVudFR5cGUgPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJykuc3BsaXQoJzsnKVswXTt9Y2F0Y2goZSkge31pZihjb250ZW50VHlwZSA9PT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpe2RhdGEgPSB0aGlzLnhoci5yZXNwb25zZTt9ZWxzZSB7aWYoIXRoaXMuc3VwcG9ydHNCaW5hcnkpe2RhdGEgPSB0aGlzLnhoci5yZXNwb25zZVRleHQ7fWVsc2Uge3RyeXtkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLG5ldyBVaW50OEFycmF5KHRoaXMueGhyLnJlc3BvbnNlKSk7fWNhdGNoKGUpIHt2YXIgdWk4QXJyPW5ldyBVaW50OEFycmF5KHRoaXMueGhyLnJlc3BvbnNlKTt2YXIgZGF0YUFycmF5PVtdO2Zvcih2YXIgaWR4PTAsbGVuZ3RoPXVpOEFyci5sZW5ndGg7aWR4IDwgbGVuZ3RoO2lkeCsrKSB7ZGF0YUFycmF5LnB1c2godWk4QXJyW2lkeF0pO31kYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGRhdGFBcnJheSk7fX19fWNhdGNoKGUpIHt0aGlzLm9uRXJyb3IoZSk7fWlmKG51bGwgIT0gZGF0YSl7dGhpcy5vbkRhdGEoZGF0YSk7fX07IC8qKlxyXG4gKiBDaGVjayBpZiBpdCBoYXMgWERvbWFpblJlcXVlc3QuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9SZXF1ZXN0LnByb3RvdHlwZS5oYXNYRFIgPSBmdW5jdGlvbigpe3JldHVybiAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGdsb2JhbC5YRG9tYWluUmVxdWVzdCAmJiAhdGhpcy54cyAmJiB0aGlzLmVuYWJsZXNYRFI7fTsgLyoqXHJcbiAqIEFib3J0cyB0aGUgcmVxdWVzdC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe3RoaXMuY2xlYW51cCgpO307IC8qKlxyXG4gKiBBYm9ydHMgcGVuZGluZyByZXF1ZXN0cyB3aGVuIHVubG9hZGluZyB0aGUgd2luZG93LiBUaGlzIGlzIG5lZWRlZCB0byBwcmV2ZW50XHJcbiAqIG1lbW9yeSBsZWFrcyAoZS5nLiB3aGVuIHVzaW5nIElFKSBhbmQgdG8gZW5zdXJlIHRoYXQgbm8gc3B1cmlvdXMgZXJyb3IgaXNcclxuICogZW1pdHRlZC5cclxuICovaWYoZ2xvYmFsLmRvY3VtZW50KXtSZXF1ZXN0LnJlcXVlc3RzQ291bnQgPSAwO1JlcXVlc3QucmVxdWVzdHMgPSB7fTtpZihnbG9iYWwuYXR0YWNoRXZlbnQpe2dsb2JhbC5hdHRhY2hFdmVudCgnb251bmxvYWQnLHVubG9hZEhhbmRsZXIpO31lbHNlIGlmKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKXtnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJyx1bmxvYWRIYW5kbGVyLGZhbHNlKTt9fWZ1bmN0aW9uIHVubG9hZEhhbmRsZXIoKXtmb3IodmFyIGkgaW4gUmVxdWVzdC5yZXF1ZXN0cykge2lmKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpe1JlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTt9fX19KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7XCIuL3BvbGxpbmdcIjo4LFwiY29tcG9uZW50LWVtaXR0ZXJcIjoxNSxcImNvbXBvbmVudC1pbmhlcml0XCI6MTYsXCJkZWJ1Z1wiOjE3LFwieG1saHR0cHJlcXVlc3Qtc3NsXCI6MTB9XSw4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL3ZhciBUcmFuc3BvcnQ9X2RlcmVxXygnLi4vdHJhbnNwb3J0Jyk7dmFyIHBhcnNlcXM9X2RlcmVxXygncGFyc2VxcycpO3ZhciBwYXJzZXI9X2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpO3ZhciBpbmhlcml0PV9kZXJlcV8oJ2NvbXBvbmVudC1pbmhlcml0Jyk7dmFyIHllYXN0PV9kZXJlcV8oJ3llYXN0Jyk7dmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6cG9sbGluZycpOyAvKipcclxuICogTW9kdWxlIGV4cG9ydHMuXHJcbiAqL21vZHVsZS5leHBvcnRzID0gUG9sbGluZzsgLyoqXHJcbiAqIElzIFhIUjIgc3VwcG9ydGVkP1xyXG4gKi92YXIgaGFzWEhSMj0oZnVuY3Rpb24oKXt2YXIgWE1MSHR0cFJlcXVlc3Q9X2RlcmVxXygneG1saHR0cHJlcXVlc3Qtc3NsJyk7dmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3Qoe3hkb21haW46ZmFsc2V9KTtyZXR1cm4gbnVsbCAhPSB4aHIucmVzcG9uc2VUeXBlO30pKCk7IC8qKlxyXG4gKiBQb2xsaW5nIGludGVyZmFjZS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2Z1bmN0aW9uIFBvbGxpbmcob3B0cyl7dmFyIGZvcmNlQmFzZTY0PW9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NDtpZighaGFzWEhSMiB8fCBmb3JjZUJhc2U2NCl7dGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO31UcmFuc3BvcnQuY2FsbCh0aGlzLG9wdHMpO30gLyoqXHJcbiAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxyXG4gKi9pbmhlcml0KFBvbGxpbmcsVHJhbnNwb3J0KTsgLyoqXHJcbiAqIFRyYW5zcG9ydCBuYW1lLlxyXG4gKi9Qb2xsaW5nLnByb3RvdHlwZS5uYW1lID0gJ3BvbGxpbmcnOyAvKipcclxuICogT3BlbnMgdGhlIHNvY2tldCAodHJpZ2dlcnMgcG9sbGluZykuIFdlIHdyaXRlIGEgUElORyBtZXNzYWdlIHRvIGRldGVybWluZVxyXG4gKiB3aGVuIHRoZSB0cmFuc3BvcnQgaXMgb3Blbi5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1BvbGxpbmcucHJvdG90eXBlLmRvT3BlbiA9IGZ1bmN0aW9uKCl7dGhpcy5wb2xsKCk7fTsgLyoqXHJcbiAqIFBhdXNlcyBwb2xsaW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayB1cG9uIGJ1ZmZlcnMgYXJlIGZsdXNoZWQgYW5kIHRyYW5zcG9ydCBpcyBwYXVzZWRcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1BvbGxpbmcucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24ob25QYXVzZSl7dmFyIHBlbmRpbmc9MDt2YXIgc2VsZj10aGlzO3RoaXMucmVhZHlTdGF0ZSA9ICdwYXVzaW5nJztmdW5jdGlvbiBwYXVzZSgpe2RlYnVnKCdwYXVzZWQnKTtzZWxmLnJlYWR5U3RhdGUgPSAncGF1c2VkJztvblBhdXNlKCk7fWlmKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSl7dmFyIHRvdGFsPTA7aWYodGhpcy5wb2xsaW5nKXtkZWJ1Zygnd2UgYXJlIGN1cnJlbnRseSBwb2xsaW5nIC0gd2FpdGluZyB0byBwYXVzZScpO3RvdGFsKys7dGhpcy5vbmNlKCdwb2xsQ29tcGxldGUnLGZ1bmN0aW9uKCl7ZGVidWcoJ3ByZS1wYXVzZSBwb2xsaW5nIGNvbXBsZXRlJyk7LS10b3RhbCB8fCBwYXVzZSgpO30pO31pZighdGhpcy53cml0YWJsZSl7ZGVidWcoJ3dlIGFyZSBjdXJyZW50bHkgd3JpdGluZyAtIHdhaXRpbmcgdG8gcGF1c2UnKTt0b3RhbCsrO3RoaXMub25jZSgnZHJhaW4nLGZ1bmN0aW9uKCl7ZGVidWcoJ3ByZS1wYXVzZSB3cml0aW5nIGNvbXBsZXRlJyk7LS10b3RhbCB8fCBwYXVzZSgpO30pO319ZWxzZSB7cGF1c2UoKTt9fTsgLyoqXHJcbiAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9Qb2xsaW5nLnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24oKXtkZWJ1ZygncG9sbGluZycpO3RoaXMucG9sbGluZyA9IHRydWU7dGhpcy5kb1BvbGwoKTt0aGlzLmVtaXQoJ3BvbGwnKTt9OyAvKipcclxuICogT3ZlcmxvYWRzIG9uRGF0YSB0byBkZXRlY3QgcGF5bG9hZHMuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Qb2xsaW5nLnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbihkYXRhKXt2YXIgc2VsZj10aGlzO2RlYnVnKCdwb2xsaW5nIGdvdCBkYXRhICVzJyxkYXRhKTt2YXIgY2FsbGJhY2s9ZnVuY3Rpb24gY2FsbGJhY2socGFja2V0LGluZGV4LHRvdGFsKXsgLy8gaWYgaXRzIHRoZSBmaXJzdCBtZXNzYWdlIHdlIGNvbnNpZGVyIHRoZSB0cmFuc3BvcnQgb3BlblxuaWYoJ29wZW5pbmcnID09IHNlbGYucmVhZHlTdGF0ZSl7c2VsZi5vbk9wZW4oKTt9IC8vIGlmIGl0cyBhIGNsb3NlIHBhY2tldCwgd2UgY2xvc2UgdGhlIG9uZ29pbmcgcmVxdWVzdHNcbmlmKCdjbG9zZScgPT0gcGFja2V0LnR5cGUpe3NlbGYub25DbG9zZSgpO3JldHVybiBmYWxzZTt9IC8vIG90aGVyd2lzZSBieXBhc3Mgb25EYXRhIGFuZCBoYW5kbGUgdGhlIG1lc3NhZ2VcbnNlbGYub25QYWNrZXQocGFja2V0KTt9OyAvLyBkZWNvZGUgcGF5bG9hZFxucGFyc2VyLmRlY29kZVBheWxvYWQoZGF0YSx0aGlzLnNvY2tldC5iaW5hcnlUeXBlLGNhbGxiYWNrKTsgLy8gaWYgYW4gZXZlbnQgZGlkIG5vdCB0cmlnZ2VyIGNsb3NpbmdcbmlmKCdjbG9zZWQnICE9IHRoaXMucmVhZHlTdGF0ZSl7IC8vIGlmIHdlIGdvdCBkYXRhIHdlJ3JlIG5vdCBwb2xsaW5nXG50aGlzLnBvbGxpbmcgPSBmYWxzZTt0aGlzLmVtaXQoJ3BvbGxDb21wbGV0ZScpO2lmKCdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUpe3RoaXMucG9sbCgpO31lbHNlIHtkZWJ1ZygnaWdub3JpbmcgcG9sbCAtIHRyYW5zcG9ydCBzdGF0ZSBcIiVzXCInLHRoaXMucmVhZHlTdGF0ZSk7fX19OyAvKipcclxuICogRm9yIHBvbGxpbmcsIHNlbmQgYSBjbG9zZSBwYWNrZXQuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Qb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24oKXt2YXIgc2VsZj10aGlzO2Z1bmN0aW9uIGNsb3NlKCl7ZGVidWcoJ3dyaXRpbmcgY2xvc2UgcGFja2V0Jyk7c2VsZi53cml0ZShbe3R5cGU6J2Nsb3NlJ31dKTt9aWYoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSl7ZGVidWcoJ3RyYW5zcG9ydCBvcGVuIC0gY2xvc2luZycpO2Nsb3NlKCk7fWVsc2UgeyAvLyBpbiBjYXNlIHdlJ3JlIHRyeWluZyB0byBjbG9zZSB3aGlsZVxuLy8gaGFuZHNoYWtpbmcgaXMgaW4gcHJvZ3Jlc3MgKEdILTE2NClcbmRlYnVnKCd0cmFuc3BvcnQgbm90IG9wZW4gLSBkZWZlcnJpbmcgY2xvc2UnKTt0aGlzLm9uY2UoJ29wZW4nLGNsb3NlKTt9fTsgLyoqXHJcbiAqIFdyaXRlcyBhIHBhY2tldHMgcGF5bG9hZC5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gZGF0YSBwYWNrZXRzXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRyYWluIGNhbGxiYWNrXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Qb2xsaW5nLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uKHBhY2tldHMpe3ZhciBzZWxmPXRoaXM7dGhpcy53cml0YWJsZSA9IGZhbHNlO3ZhciBjYWxsYmFja2ZuPWZ1bmN0aW9uIGNhbGxiYWNrZm4oKXtzZWxmLndyaXRhYmxlID0gdHJ1ZTtzZWxmLmVtaXQoJ2RyYWluJyk7fTt2YXIgc2VsZj10aGlzO3BhcnNlci5lbmNvZGVQYXlsb2FkKHBhY2tldHMsdGhpcy5zdXBwb3J0c0JpbmFyeSxmdW5jdGlvbihkYXRhKXtzZWxmLmRvV3JpdGUoZGF0YSxjYWxsYmFja2ZuKTt9KTt9OyAvKipcclxuICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1BvbGxpbmcucHJvdG90eXBlLnVyaSA9IGZ1bmN0aW9uKCl7dmFyIHF1ZXJ5PXRoaXMucXVlcnkgfHwge307dmFyIHNjaGVtYT10aGlzLnNlY3VyZT8naHR0cHMnOidodHRwJzt2YXIgcG9ydD0nJzsgLy8gY2FjaGUgYnVzdGluZyBpcyBmb3JjZWRcbmlmKGZhbHNlICE9PSB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzKXtxdWVyeVt0aGlzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7fWlmKCF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmICFxdWVyeS5zaWQpe3F1ZXJ5LmI2NCA9IDE7fXF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpOyAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuaWYodGhpcy5wb3J0ICYmICgnaHR0cHMnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gNDQzIHx8ICdodHRwJyA9PSBzY2hlbWEgJiYgdGhpcy5wb3J0ICE9IDgwKSl7cG9ydCA9ICc6JyArIHRoaXMucG9ydDt9IC8vIHByZXBlbmQgPyB0byBxdWVyeVxuaWYocXVlcnkubGVuZ3RoKXtxdWVyeSA9ICc/JyArIHF1ZXJ5O312YXIgaXB2Nj10aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSAhPT0gLTE7cmV0dXJuIHNjaGVtYSArICc6Ly8nICsgKGlwdjY/J1snICsgdGhpcy5ob3N0bmFtZSArICddJzp0aGlzLmhvc3RuYW1lKSArIHBvcnQgKyB0aGlzLnBhdGggKyBxdWVyeTt9O30se1wiLi4vdHJhbnNwb3J0XCI6NCxcImNvbXBvbmVudC1pbmhlcml0XCI6MTYsXCJkZWJ1Z1wiOjE3LFwiZW5naW5lLmlvLXBhcnNlclwiOjE5LFwicGFyc2Vxc1wiOjI3LFwieG1saHR0cHJlcXVlc3Qtc3NsXCI6MTAsXCJ5ZWFzdFwiOjMwfV0sOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxyXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxyXG4gKi92YXIgVHJhbnNwb3J0PV9kZXJlcV8oJy4uL3RyYW5zcG9ydCcpO3ZhciBwYXJzZXI9X2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpO3ZhciBwYXJzZXFzPV9kZXJlcV8oJ3BhcnNlcXMnKTt2YXIgaW5oZXJpdD1fZGVyZXFfKCdjb21wb25lbnQtaW5oZXJpdCcpO3ZhciB5ZWFzdD1fZGVyZXFfKCd5ZWFzdCcpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OndlYnNvY2tldCcpO3ZhciBCcm93c2VyV2ViU29ja2V0PWdsb2JhbC5XZWJTb2NrZXQgfHwgZ2xvYmFsLk1veldlYlNvY2tldDsgLyoqXHJcbiAqIEdldCBlaXRoZXIgdGhlIGBXZWJTb2NrZXRgIG9yIGBNb3pXZWJTb2NrZXRgIGdsb2JhbHNcclxuICogaW4gdGhlIGJyb3dzZXIgb3IgdGhlIFdlYlNvY2tldC1jb21wYXRpYmxlIGludGVyZmFjZVxyXG4gKiBleHBvc2VkIGJ5IGB3c2AgZm9yIE5vZGUgZW52aXJvbm1lbnQuXHJcbiAqL3ZhciBXZWJTb2NrZXQ9QnJvd3NlcldlYlNvY2tldCB8fCAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc/bnVsbDpfZGVyZXFfKCd3cycpKTsgLyoqXHJcbiAqIE1vZHVsZSBleHBvcnRzLlxyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IFdTOyAvKipcclxuICogV2ViU29ja2V0IHRyYW5zcG9ydCBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogQGFwaSB7T2JqZWN0fSBjb25uZWN0aW9uIG9wdGlvbnNcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gV1Mob3B0cyl7dmFyIGZvcmNlQmFzZTY0PW9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NDtpZihmb3JjZUJhc2U2NCl7dGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO310aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZTtUcmFuc3BvcnQuY2FsbCh0aGlzLG9wdHMpO30gLyoqXHJcbiAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxyXG4gKi9pbmhlcml0KFdTLFRyYW5zcG9ydCk7IC8qKlxyXG4gKiBUcmFuc3BvcnQgbmFtZS5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovV1MucHJvdG90eXBlLm5hbWUgPSAnd2Vic29ja2V0JzsgLypcclxuICogV2ViU29ja2V0cyBzdXBwb3J0IGJpbmFyeVxyXG4gKi9XUy5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSB0cnVlOyAvKipcclxuICogT3BlbnMgc29ja2V0LlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovV1MucHJvdG90eXBlLmRvT3BlbiA9IGZ1bmN0aW9uKCl7aWYoIXRoaXMuY2hlY2soKSl7IC8vIGxldCBwcm9iZSB0aW1lb3V0XG5yZXR1cm47fXZhciBzZWxmPXRoaXM7dmFyIHVyaT10aGlzLnVyaSgpO3ZhciBwcm90b2NvbHM9dm9pZCAwO3ZhciBvcHRzPXthZ2VudDp0aGlzLmFnZW50LHBlck1lc3NhZ2VEZWZsYXRlOnRoaXMucGVyTWVzc2FnZURlZmxhdGV9OyAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbm9wdHMucGZ4ID0gdGhpcy5wZng7b3B0cy5rZXkgPSB0aGlzLmtleTtvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7b3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O29wdHMuY2EgPSB0aGlzLmNhO29wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO2lmKHRoaXMuZXh0cmFIZWFkZXJzKXtvcHRzLmhlYWRlcnMgPSB0aGlzLmV4dHJhSGVhZGVyczt9dGhpcy53cyA9IEJyb3dzZXJXZWJTb2NrZXQ/bmV3IFdlYlNvY2tldCh1cmkpOm5ldyBXZWJTb2NrZXQodXJpLHByb3RvY29scyxvcHRzKTtpZih0aGlzLndzLmJpbmFyeVR5cGUgPT09IHVuZGVmaW5lZCl7dGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO31pZih0aGlzLndzLnN1cHBvcnRzICYmIHRoaXMud3Muc3VwcG9ydHMuYmluYXJ5KXt0aGlzLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTt0aGlzLndzLmJpbmFyeVR5cGUgPSAnYnVmZmVyJzt9ZWxzZSB7dGhpcy53cy5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJzt9dGhpcy5hZGRFdmVudExpc3RlbmVycygpO307IC8qKlxyXG4gKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgc29ja2V0XHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9XUy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe3ZhciBzZWxmPXRoaXM7dGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbigpe3NlbGYub25PcGVuKCk7fTt0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpe3NlbGYub25DbG9zZSgpO307dGhpcy53cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldil7c2VsZi5vbkRhdGEoZXYuZGF0YSk7fTt0aGlzLndzLm9uZXJyb3IgPSBmdW5jdGlvbihlKXtzZWxmLm9uRXJyb3IoJ3dlYnNvY2tldCBlcnJvcicsZSk7fTt9OyAvKipcclxuICogT3ZlcnJpZGUgYG9uRGF0YWAgdG8gdXNlIGEgdGltZXIgb24gaU9TLlxyXG4gKiBTZWU6IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL21sb3VnaHJhbi8yMDUyMDA2XHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9pZigndW5kZWZpbmVkJyAhPSB0eXBlb2YgbmF2aWdhdG9yICYmIC9pUGFkfGlQaG9uZXxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSl7V1MucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe3ZhciBzZWxmPXRoaXM7c2V0VGltZW91dChmdW5jdGlvbigpe1RyYW5zcG9ydC5wcm90b3R5cGUub25EYXRhLmNhbGwoc2VsZixkYXRhKTt9LDApO307fSAvKipcclxuICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBvZiBwYWNrZXRzLlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovV1MucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24ocGFja2V0cyl7dmFyIHNlbGY9dGhpczt0aGlzLndyaXRhYmxlID0gZmFsc2U7IC8vIGVuY29kZVBhY2tldCBlZmZpY2llbnQgYXMgaXQgdXNlcyBXUyBmcmFtaW5nXG4vLyBubyBuZWVkIGZvciBlbmNvZGVQYXlsb2FkXG52YXIgdG90YWw9cGFja2V0cy5sZW5ndGg7Zm9yKHZhciBpPTAsbD10b3RhbDtpIDwgbDtpKyspIHsoZnVuY3Rpb24ocGFja2V0KXtwYXJzZXIuZW5jb2RlUGFja2V0KHBhY2tldCxzZWxmLnN1cHBvcnRzQmluYXJ5LGZ1bmN0aW9uKGRhdGEpe2lmKCFCcm93c2VyV2ViU29ja2V0KXsgLy8gYWx3YXlzIGNyZWF0ZSBhIG5ldyBvYmplY3QgKEdILTQzNylcbnZhciBvcHRzPXt9O2lmKHBhY2tldC5vcHRpb25zKXtvcHRzLmNvbXByZXNzID0gcGFja2V0Lm9wdGlvbnMuY29tcHJlc3M7fWlmKHNlbGYucGVyTWVzc2FnZURlZmxhdGUpe3ZhciBsZW49J3N0cmluZycgPT0gdHlwZW9mIGRhdGE/Z2xvYmFsLkJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEpOmRhdGEubGVuZ3RoO2lmKGxlbiA8IHNlbGYucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKXtvcHRzLmNvbXByZXNzID0gZmFsc2U7fX19IC8vU29tZXRpbWVzIHRoZSB3ZWJzb2NrZXQgaGFzIGFscmVhZHkgYmVlbiBjbG9zZWQgYnV0IHRoZSBicm93c2VyIGRpZG4ndFxuLy9oYXZlIGEgY2hhbmNlIG9mIGluZm9ybWluZyB1cyBhYm91dCBpdCB5ZXQsIGluIHRoYXQgY2FzZSBzZW5kIHdpbGxcbi8vdGhyb3cgYW4gZXJyb3JcbnRyeXtpZihCcm93c2VyV2ViU29ja2V0KXsgLy8gVHlwZUVycm9yIGlzIHRocm93biB3aGVuIHBhc3NpbmcgdGhlIHNlY29uZCBhcmd1bWVudCBvbiBTYWZhcmlcbnNlbGYud3Muc2VuZChkYXRhKTt9ZWxzZSB7c2VsZi53cy5zZW5kKGRhdGEsb3B0cyk7fX1jYXRjaChlKSB7ZGVidWcoJ3dlYnNvY2tldCBjbG9zZWQgYmVmb3JlIG9uY2xvc2UgZXZlbnQnKTt9LS10b3RhbCB8fCBkb25lKCk7fSk7fSkocGFja2V0c1tpXSk7fWZ1bmN0aW9uIGRvbmUoKXtzZWxmLmVtaXQoJ2ZsdXNoJyk7IC8vIGZha2UgZHJhaW5cbi8vIGRlZmVyIHRvIG5leHQgdGljayB0byBhbGxvdyBTb2NrZXQgdG8gY2xlYXIgd3JpdGVCdWZmZXJcbnNldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLndyaXRhYmxlID0gdHJ1ZTtzZWxmLmVtaXQoJ2RyYWluJyk7fSwwKTt9fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIGNsb3NlXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9XUy5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uKCl7VHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlLmNhbGwodGhpcyk7fTsgLyoqXHJcbiAqIENsb3NlcyBzb2NrZXQuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9XUy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uKCl7aWYodHlwZW9mIHRoaXMud3MgIT09ICd1bmRlZmluZWQnKXt0aGlzLndzLmNsb3NlKCk7fX07IC8qKlxyXG4gKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovV1MucHJvdG90eXBlLnVyaSA9IGZ1bmN0aW9uKCl7dmFyIHF1ZXJ5PXRoaXMucXVlcnkgfHwge307dmFyIHNjaGVtYT10aGlzLnNlY3VyZT8nd3NzJzond3MnO3ZhciBwb3J0PScnOyAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuaWYodGhpcy5wb3J0ICYmICgnd3NzJyA9PSBzY2hlbWEgJiYgdGhpcy5wb3J0ICE9IDQ0MyB8fCAnd3MnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gODApKXtwb3J0ID0gJzonICsgdGhpcy5wb3J0O30gLy8gYXBwZW5kIHRpbWVzdGFtcCB0byBVUklcbmlmKHRoaXMudGltZXN0YW1wUmVxdWVzdHMpe3F1ZXJ5W3RoaXMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTt9IC8vIGNvbW11bmljYXRlIGJpbmFyeSBzdXBwb3J0IGNhcGFiaWxpdGllc1xuaWYoIXRoaXMuc3VwcG9ydHNCaW5hcnkpe3F1ZXJ5LmI2NCA9IDE7fXF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpOyAvLyBwcmVwZW5kID8gdG8gcXVlcnlcbmlmKHF1ZXJ5Lmxlbmd0aCl7cXVlcnkgPSAnPycgKyBxdWVyeTt9dmFyIGlwdjY9dGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgIT09IC0xO3JldHVybiBzY2hlbWEgKyAnOi8vJyArIChpcHY2PydbJyArIHRoaXMuaG9zdG5hbWUgKyAnXSc6dGhpcy5ob3N0bmFtZSkgKyBwb3J0ICsgdGhpcy5wYXRoICsgcXVlcnk7fTsgLyoqXHJcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uIGZvciBXZWJTb2NrZXQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgdGhpcyB0cmFuc3BvcnQgaXMgYXZhaWxhYmxlLlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9XUy5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbigpe3JldHVybiAhIVdlYlNvY2tldCAmJiAhKCdfX2luaXRpYWxpemUnIGluIFdlYlNvY2tldCAmJiB0aGlzLm5hbWUgPT09IFdTLnByb3RvdHlwZS5uYW1lKTt9O30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHtcIi4uL3RyYW5zcG9ydFwiOjQsXCJjb21wb25lbnQtaW5oZXJpdFwiOjE2LFwiZGVidWdcIjoxNyxcImVuZ2luZS5pby1wYXJzZXJcIjoxOSxcInBhcnNlcXNcIjoyNyxcIndzXCI6dW5kZWZpbmVkLFwieWVhc3RcIjozMH1dLDEwOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcbnZhciBoYXNDT1JTPV9kZXJlcV8oJ2hhcy1jb3JzJyk7bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcHRzKXt2YXIgeGRvbWFpbj1vcHRzLnhkb21haW47IC8vIHNjaGVtZSBtdXN0IGJlIHNhbWUgd2hlbiB1c2lnbiBYRG9tYWluUmVxdWVzdFxuLy8gaHR0cDovL2Jsb2dzLm1zZG4uY29tL2IvaWVpbnRlcm5hbHMvYXJjaGl2ZS8yMDEwLzA1LzEzL3hkb21haW5yZXF1ZXN0LXJlc3RyaWN0aW9ucy1saW1pdGF0aW9ucy1hbmQtd29ya2Fyb3VuZHMuYXNweFxudmFyIHhzY2hlbWU9b3B0cy54c2NoZW1lOyAvLyBYRG9tYWluUmVxdWVzdCBoYXMgYSBmbG93IG9mIG5vdCBzZW5kaW5nIGNvb2tpZSwgdGhlcmVmb3JlIGl0IHNob3VsZCBiZSBkaXNhYmxlZCBhcyBhIGRlZmF1bHQuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9lbmdpbmUuaW8tY2xpZW50L3B1bGwvMjE3XG52YXIgZW5hYmxlc1hEUj1vcHRzLmVuYWJsZXNYRFI7IC8vIFhNTEh0dHBSZXF1ZXN0IGNhbiBiZSBkaXNhYmxlZCBvbiBJRVxudHJ5e2lmKCd1bmRlZmluZWQnICE9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAmJiAoIXhkb21haW4gfHwgaGFzQ09SUykpe3JldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTt9fWNhdGNoKGUpIHt9IC8vIFVzZSBYRG9tYWluUmVxdWVzdCBmb3IgSUU4IGlmIGVuYWJsZXNYRFIgaXMgdHJ1ZVxuLy8gYmVjYXVzZSBsb2FkaW5nIGJhciBrZWVwcyBmbGFzaGluZyB3aGVuIHVzaW5nIGpzb25wLXBvbGxpbmdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS95dWppb3Nha2Evc29ja2UuaW8taWU4LWxvYWRpbmctZXhhbXBsZVxudHJ5e2lmKCd1bmRlZmluZWQnICE9IHR5cGVvZiBYRG9tYWluUmVxdWVzdCAmJiAheHNjaGVtZSAmJiBlbmFibGVzWERSKXtyZXR1cm4gbmV3IFhEb21haW5SZXF1ZXN0KCk7fX1jYXRjaChlKSB7fWlmKCF4ZG9tYWluKXt0cnl7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO31jYXRjaChlKSB7fX19O30se1wiaGFzLWNvcnNcIjoyMn1dLDExOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXttb2R1bGUuZXhwb3J0cyA9IGFmdGVyO2Z1bmN0aW9uIGFmdGVyKGNvdW50LGNhbGxiYWNrLGVycl9jYil7dmFyIGJhaWw9ZmFsc2U7ZXJyX2NiID0gZXJyX2NiIHx8IG5vb3A7cHJveHkuY291bnQgPSBjb3VudDtyZXR1cm4gY291bnQgPT09IDA/Y2FsbGJhY2soKTpwcm94eTtmdW5jdGlvbiBwcm94eShlcnIscmVzdWx0KXtpZihwcm94eS5jb3VudCA8PSAwKXt0aHJvdyBuZXcgRXJyb3IoJ2FmdGVyIGNhbGxlZCB0b28gbWFueSB0aW1lcycpO30tLXByb3h5LmNvdW50OyAvLyBhZnRlciBmaXJzdCBlcnJvciwgcmVzdCBhcmUgcGFzc2VkIHRvIGVycl9jYlxuaWYoZXJyKXtiYWlsID0gdHJ1ZTtjYWxsYmFjayhlcnIpOyAvLyBmdXR1cmUgZXJyb3IgY2FsbGJhY2tzIHdpbGwgZ28gdG8gZXJyb3IgaGFuZGxlclxuY2FsbGJhY2sgPSBlcnJfY2I7fWVsc2UgaWYocHJveHkuY291bnQgPT09IDAgJiYgIWJhaWwpe2NhbGxiYWNrKG51bGwscmVzdWx0KTt9fX1mdW5jdGlvbiBub29wKCl7fX0se31dLDEyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIEFuIGFic3RyYWN0aW9uIGZvciBzbGljaW5nIGFuIGFycmF5YnVmZmVyIGV2ZW4gd2hlblxyXG4gKiBBcnJheUJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgaXMgbm90IHN1cHBvcnRlZFxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyLHN0YXJ0LGVuZCl7dmFyIGJ5dGVzPWFycmF5YnVmZmVyLmJ5dGVMZW5ndGg7c3RhcnQgPSBzdGFydCB8fCAwO2VuZCA9IGVuZCB8fCBieXRlcztpZihhcnJheWJ1ZmZlci5zbGljZSl7cmV0dXJuIGFycmF5YnVmZmVyLnNsaWNlKHN0YXJ0LGVuZCk7fWlmKHN0YXJ0IDwgMCl7c3RhcnQgKz0gYnl0ZXM7fWlmKGVuZCA8IDApe2VuZCArPSBieXRlczt9aWYoZW5kID4gYnl0ZXMpe2VuZCA9IGJ5dGVzO31pZihzdGFydCA+PSBieXRlcyB8fCBzdGFydCA+PSBlbmQgfHwgYnl0ZXMgPT09IDApe3JldHVybiBuZXcgQXJyYXlCdWZmZXIoMCk7fXZhciBhYnY9bmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO3ZhciByZXN1bHQ9bmV3IFVpbnQ4QXJyYXkoZW5kIC0gc3RhcnQpO2Zvcih2YXIgaT1zdGFydCxpaT0wO2kgPCBlbmQ7aSsrLGlpKyspIHtyZXN1bHRbaWldID0gYWJ2W2ldO31yZXR1cm4gcmVzdWx0LmJ1ZmZlcjt9O30se31dLDEzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLypcclxuICogYmFzZTY0LWFycmF5YnVmZmVyXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWtsYXN2aC9iYXNlNjQtYXJyYXlidWZmZXJcclxuICpcclxuICogQ29weXJpZ2h0IChjKSAyMDEyIE5pa2xhcyB2b24gSGVydHplblxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiAqLyhmdW5jdGlvbihjaGFycyl7XCJ1c2Ugc3RyaWN0XCI7ZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbihhcnJheWJ1ZmZlcil7dmFyIGJ5dGVzPW5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSxpLGxlbj1ieXRlcy5sZW5ndGgsYmFzZTY0PVwiXCI7Zm9yKGkgPSAwO2kgPCBsZW47aSArPSAzKSB7YmFzZTY0ICs9IGNoYXJzW2J5dGVzW2ldID4+IDJdO2Jhc2U2NCArPSBjaGFyc1soYnl0ZXNbaV0gJiAzKSA8PCA0IHwgYnl0ZXNbaSArIDFdID4+IDRdO2Jhc2U2NCArPSBjaGFyc1soYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIgfCBieXRlc1tpICsgMl0gPj4gNl07YmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTt9aWYobGVuICUgMyA9PT0gMil7YmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLGJhc2U2NC5sZW5ndGggLSAxKSArIFwiPVwiO31lbHNlIGlmKGxlbiAlIDMgPT09IDEpe2Jhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCxiYXNlNjQubGVuZ3RoIC0gMikgKyBcIj09XCI7fXJldHVybiBiYXNlNjQ7fTtleHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKGJhc2U2NCl7dmFyIGJ1ZmZlckxlbmd0aD1iYXNlNjQubGVuZ3RoICogMC43NSxsZW49YmFzZTY0Lmxlbmd0aCxpLHA9MCxlbmNvZGVkMSxlbmNvZGVkMixlbmNvZGVkMyxlbmNvZGVkNDtpZihiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDFdID09PSBcIj1cIil7YnVmZmVyTGVuZ3RoLS07aWYoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAyXSA9PT0gXCI9XCIpe2J1ZmZlckxlbmd0aC0tO319dmFyIGFycmF5YnVmZmVyPW5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLGJ5dGVzPW5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtmb3IoaSA9IDA7aSA8IGxlbjtpICs9IDQpIHtlbmNvZGVkMSA9IGNoYXJzLmluZGV4T2YoYmFzZTY0W2ldKTtlbmNvZGVkMiA9IGNoYXJzLmluZGV4T2YoYmFzZTY0W2kgKyAxXSk7ZW5jb2RlZDMgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpICsgMl0pO2VuY29kZWQ0ID0gY2hhcnMuaW5kZXhPZihiYXNlNjRbaSArIDNdKTtieXRlc1twKytdID0gZW5jb2RlZDEgPDwgMiB8IGVuY29kZWQyID4+IDQ7Ynl0ZXNbcCsrXSA9IChlbmNvZGVkMiAmIDE1KSA8PCA0IHwgZW5jb2RlZDMgPj4gMjtieXRlc1twKytdID0gKGVuY29kZWQzICYgMykgPDwgNiB8IGVuY29kZWQ0ICYgNjM7fXJldHVybiBhcnJheWJ1ZmZlcjt9O30pKFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiKTt9LHt9XSwxNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxyXG4gKiBDcmVhdGUgYSBibG9iIGJ1aWxkZXIgZXZlbiB3aGVuIHZlbmRvciBwcmVmaXhlcyBleGlzdFxyXG4gKi92YXIgQmxvYkJ1aWxkZXI9Z2xvYmFsLkJsb2JCdWlsZGVyIHx8IGdsb2JhbC5XZWJLaXRCbG9iQnVpbGRlciB8fCBnbG9iYWwuTVNCbG9iQnVpbGRlciB8fCBnbG9iYWwuTW96QmxvYkJ1aWxkZXI7IC8qKlxyXG4gKiBDaGVjayBpZiBCbG9iIGNvbnN0cnVjdG9yIGlzIHN1cHBvcnRlZFxyXG4gKi92YXIgYmxvYlN1cHBvcnRlZD0oZnVuY3Rpb24oKXt0cnl7dmFyIGE9bmV3IEJsb2IoWydoaSddKTtyZXR1cm4gYS5zaXplID09PSAyO31jYXRjaChlKSB7cmV0dXJuIGZhbHNlO319KSgpOyAvKipcclxuICogQ2hlY2sgaWYgQmxvYiBjb25zdHJ1Y3RvciBzdXBwb3J0cyBBcnJheUJ1ZmZlclZpZXdzXHJcbiAqIEZhaWxzIGluIFNhZmFyaSA2LCBzbyB3ZSBuZWVkIHRvIG1hcCB0byBBcnJheUJ1ZmZlcnMgdGhlcmUuXHJcbiAqL3ZhciBibG9iU3VwcG9ydHNBcnJheUJ1ZmZlclZpZXc9YmxvYlN1cHBvcnRlZCAmJiAoZnVuY3Rpb24oKXt0cnl7dmFyIGI9bmV3IEJsb2IoW25ldyBVaW50OEFycmF5KFsxLDJdKV0pO3JldHVybiBiLnNpemUgPT09IDI7fWNhdGNoKGUpIHtyZXR1cm4gZmFsc2U7fX0pKCk7IC8qKlxyXG4gKiBDaGVjayBpZiBCbG9iQnVpbGRlciBpcyBzdXBwb3J0ZWRcclxuICovdmFyIGJsb2JCdWlsZGVyU3VwcG9ydGVkPUJsb2JCdWlsZGVyICYmIEJsb2JCdWlsZGVyLnByb3RvdHlwZS5hcHBlbmQgJiYgQmxvYkJ1aWxkZXIucHJvdG90eXBlLmdldEJsb2I7IC8qKlxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBtYXBzIEFycmF5QnVmZmVyVmlld3MgdG8gQXJyYXlCdWZmZXJzXHJcbiAqIFVzZWQgYnkgQmxvYkJ1aWxkZXIgY29uc3RydWN0b3IgYW5kIG9sZCBicm93c2VycyB0aGF0IGRpZG4ndFxyXG4gKiBzdXBwb3J0IGl0IGluIHRoZSBCbG9iIGNvbnN0cnVjdG9yLlxyXG4gKi9mdW5jdGlvbiBtYXBBcnJheUJ1ZmZlclZpZXdzKGFyeSl7Zm9yKHZhciBpPTA7aSA8IGFyeS5sZW5ndGg7aSsrKSB7dmFyIGNodW5rPWFyeVtpXTtpZihjaHVuay5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcil7dmFyIGJ1Zj1jaHVuay5idWZmZXI7IC8vIGlmIHRoaXMgaXMgYSBzdWJhcnJheSwgbWFrZSBhIGNvcHkgc28gd2Ugb25seVxuLy8gaW5jbHVkZSB0aGUgc3ViYXJyYXkgcmVnaW9uIGZyb20gdGhlIHVuZGVybHlpbmcgYnVmZmVyXG5pZihjaHVuay5ieXRlTGVuZ3RoICE9PSBidWYuYnl0ZUxlbmd0aCl7dmFyIGNvcHk9bmV3IFVpbnQ4QXJyYXkoY2h1bmsuYnl0ZUxlbmd0aCk7Y29weS5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmLGNodW5rLmJ5dGVPZmZzZXQsY2h1bmsuYnl0ZUxlbmd0aCkpO2J1ZiA9IGNvcHkuYnVmZmVyO31hcnlbaV0gPSBidWY7fX19ZnVuY3Rpb24gQmxvYkJ1aWxkZXJDb25zdHJ1Y3Rvcihhcnksb3B0aW9ucyl7b3B0aW9ucyA9IG9wdGlvbnMgfHwge307dmFyIGJiPW5ldyBCbG9iQnVpbGRlcigpO21hcEFycmF5QnVmZmVyVmlld3MoYXJ5KTtmb3IodmFyIGk9MDtpIDwgYXJ5Lmxlbmd0aDtpKyspIHtiYi5hcHBlbmQoYXJ5W2ldKTt9cmV0dXJuIG9wdGlvbnMudHlwZT9iYi5nZXRCbG9iKG9wdGlvbnMudHlwZSk6YmIuZ2V0QmxvYigpO307ZnVuY3Rpb24gQmxvYkNvbnN0cnVjdG9yKGFyeSxvcHRpb25zKXttYXBBcnJheUJ1ZmZlclZpZXdzKGFyeSk7cmV0dXJuIG5ldyBCbG9iKGFyeSxvcHRpb25zIHx8IHt9KTt9O21vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCl7aWYoYmxvYlN1cHBvcnRlZCl7cmV0dXJuIGJsb2JTdXBwb3J0c0FycmF5QnVmZmVyVmlldz9nbG9iYWwuQmxvYjpCbG9iQ29uc3RydWN0b3I7fWVsc2UgaWYoYmxvYkJ1aWxkZXJTdXBwb3J0ZWQpe3JldHVybiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yO31lbHNlIHtyZXR1cm4gdW5kZWZpbmVkO319KSgpO30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHt9XSwxNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7IC8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gRW1pdHRlcihvYmope2lmKG9iailyZXR1cm4gbWl4aW4ob2JqKTt9OyAvKipcclxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBtaXhpbihvYmope2Zvcih2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7b2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO31yZXR1cm4gb2JqO30gLyoqXHJcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9FbWl0dGVyLnByb3RvdHlwZS5vbiA9IEVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCxmbil7dGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9Oyh0aGlzLl9jYWxsYmFja3NbZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSkucHVzaChmbik7cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LGZuKXt2YXIgc2VsZj10aGlzO3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtmdW5jdGlvbiBvbigpe3NlbGYub2ZmKGV2ZW50LG9uKTtmbi5hcHBseSh0aGlzLGFyZ3VtZW50cyk7fW9uLmZuID0gZm47dGhpcy5vbihldmVudCxvbik7cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovRW1pdHRlci5wcm90b3R5cGUub2ZmID0gRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsZm4pe3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTsgLy8gYWxsXG5pZigwID09IGFyZ3VtZW50cy5sZW5ndGgpe3RoaXMuX2NhbGxiYWNrcyA9IHt9O3JldHVybiB0aGlzO30gLy8gc3BlY2lmaWMgZXZlbnRcbnZhciBjYWxsYmFja3M9dGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtpZighY2FsbGJhY2tzKXJldHVybiB0aGlzOyAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG5pZigxID09IGFyZ3VtZW50cy5sZW5ndGgpe2RlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO3JldHVybiB0aGlzO30gLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbnZhciBjYjtmb3IodmFyIGk9MDtpIDwgY2FsbGJhY2tzLmxlbmd0aDtpKyspIHtjYiA9IGNhbGxiYWNrc1tpXTtpZihjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKXtjYWxsYmFja3Muc3BsaWNlKGksMSk7YnJlYWs7fX1yZXR1cm4gdGhpczt9OyAvKipcclxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICovRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXt0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307dmFyIGFyZ3M9W10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSksY2FsbGJhY2tzPXRoaXMuX2NhbGxiYWNrc1tldmVudF07aWYoY2FsbGJhY2tzKXtjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7Zm9yKHZhciBpPTAsbGVuPWNhbGxiYWNrcy5sZW5ndGg7aSA8IGxlbjsrK2kpIHtjYWxsYmFja3NbaV0uYXBwbHkodGhpcyxhcmdzKTt9fXJldHVybiB0aGlzO307IC8qKlxyXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0VtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXt0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307cmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107fTsgLyoqXHJcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0VtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtyZXR1cm4gISF0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO307fSx7fV0sMTY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYSxiKXt2YXIgZm49ZnVuY3Rpb24gZm4oKXt9O2ZuLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO2EucHJvdG90eXBlID0gbmV3IGZuKCk7YS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBhO307fSx7fV0sMTc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxyXG4gKlxyXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXHJcbiAqL2V4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oJy4vZGVidWcnKTtleHBvcnRzLmxvZyA9IGxvZztleHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO2V4cG9ydHMuc2F2ZSA9IHNhdmU7ZXhwb3J0cy5sb2FkID0gbG9hZDtleHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztleHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZT9jaHJvbWUuc3RvcmFnZS5sb2NhbDpsb2NhbHN0b3JhZ2UoKTsgLyoqXHJcbiAqIENvbG9ycy5cclxuICovZXhwb3J0cy5jb2xvcnMgPSBbJ2xpZ2h0c2VhZ3JlZW4nLCdmb3Jlc3RncmVlbicsJ2dvbGRlbnJvZCcsJ2RvZGdlcmJsdWUnLCdkYXJrb3JjaGlkJywnY3JpbXNvbiddOyAvKipcclxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcclxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXHJcbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cclxuICpcclxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcclxuICovZnVuY3Rpb24gdXNlQ29sb3JzKCl7IC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG5yZXR1cm4gJ1dlYmtpdEFwcGVhcmFuY2UnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSB8fCAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xud2luZG93LmNvbnNvbGUgJiYgKGNvbnNvbGUuZmlyZWJ1ZyB8fCBjb25zb2xlLmV4Y2VwdGlvbiAmJiBjb25zb2xlLnRhYmxlKSB8fCAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwxMCkgPj0gMzE7fSAvKipcclxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxyXG4gKi9leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpe3JldHVybiBKU09OLnN0cmluZ2lmeSh2KTt9OyAvKipcclxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBmb3JtYXRBcmdzKCl7dmFyIGFyZ3M9YXJndW1lbnRzO3ZhciB1c2VDb2xvcnM9dGhpcy51c2VDb2xvcnM7YXJnc1swXSA9ICh1c2VDb2xvcnM/JyVjJzonJykgKyB0aGlzLm5hbWVzcGFjZSArICh1c2VDb2xvcnM/JyAlYyc6JyAnKSArIGFyZ3NbMF0gKyAodXNlQ29sb3JzPyclYyAnOicgJykgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7aWYoIXVzZUNvbG9ycylyZXR1cm4gYXJnczt2YXIgYz0nY29sb3I6ICcgKyB0aGlzLmNvbG9yO2FyZ3MgPSBbYXJnc1swXSxjLCdjb2xvcjogaW5oZXJpdCddLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLDEpKTsgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbi8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbi8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xudmFyIGluZGV4PTA7dmFyIGxhc3RDPTA7YXJnc1swXS5yZXBsYWNlKC8lW2EteiVdL2csZnVuY3Rpb24obWF0Y2gpe2lmKCclJScgPT09IG1hdGNoKXJldHVybjtpbmRleCsrO2lmKCclYycgPT09IG1hdGNoKXsgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4vLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxubGFzdEMgPSBpbmRleDt9fSk7YXJncy5zcGxpY2UobGFzdEMsMCxjKTtyZXR1cm4gYXJnczt9IC8qKlxyXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cclxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gbG9nKCl7IC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4vLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xucmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZSAmJiBjb25zb2xlLmxvZyAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZyxjb25zb2xlLGFyZ3VtZW50cyk7fSAvKipcclxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpe3RyeXtpZihudWxsID09IG5hbWVzcGFjZXMpe2V4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO31lbHNlIHtleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO319Y2F0Y2goZSkge319IC8qKlxyXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZnVuY3Rpb24gbG9hZCgpe3ZhciByO3RyeXtyID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO31jYXRjaChlKSB7fXJldHVybiByO30gLyoqXHJcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXHJcbiAqL2V4cG9ydHMuZW5hYmxlKGxvYWQoKSk7IC8qKlxyXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXHJcbiAqXHJcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xyXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxyXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKXt0cnl7cmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7fWNhdGNoKGUpIHt9fX0se1wiLi9kZWJ1Z1wiOjE4fV0sMTg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxyXG4gKlxyXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXHJcbiAqL2V4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGRlYnVnO2V4cG9ydHMuY29lcmNlID0gY29lcmNlO2V4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7ZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7ZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtleHBvcnRzLmh1bWFuaXplID0gX2RlcmVxXygnbXMnKTsgLyoqXHJcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxyXG4gKi9leHBvcnRzLm5hbWVzID0gW107ZXhwb3J0cy5za2lwcyA9IFtdOyAvKipcclxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxyXG4gKlxyXG4gKiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlcmNhc2VkIGxldHRlciwgaS5lLiBcIm5cIi5cclxuICovZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307IC8qKlxyXG4gKiBQcmV2aW91c2x5IGFzc2lnbmVkIGNvbG9yLlxyXG4gKi92YXIgcHJldkNvbG9yPTA7IC8qKlxyXG4gKiBQcmV2aW91cyBsb2cgdGltZXN0YW1wLlxyXG4gKi92YXIgcHJldlRpbWU7IC8qKlxyXG4gKiBTZWxlY3QgYSBjb2xvci5cclxuICpcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZnVuY3Rpb24gc2VsZWN0Q29sb3IoKXtyZXR1cm4gZXhwb3J0cy5jb2xvcnNbcHJldkNvbG9yKysgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO30gLyoqXHJcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBkZWJ1ZyhuYW1lc3BhY2UpeyAvLyBkZWZpbmUgdGhlIGBkaXNhYmxlZGAgdmVyc2lvblxuZnVuY3Rpb24gZGlzYWJsZWQoKXt9ZGlzYWJsZWQuZW5hYmxlZCA9IGZhbHNlOyAvLyBkZWZpbmUgdGhlIGBlbmFibGVkYCB2ZXJzaW9uXG5mdW5jdGlvbiBlbmFibGVkKCl7dmFyIHNlbGY9ZW5hYmxlZDsgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbnZhciBjdXJyPStuZXcgRGF0ZSgpO3ZhciBtcz1jdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO3NlbGYuZGlmZiA9IG1zO3NlbGYucHJldiA9IHByZXZUaW1lO3NlbGYuY3VyciA9IGN1cnI7cHJldlRpbWUgPSBjdXJyOyAvLyBhZGQgdGhlIGBjb2xvcmAgaWYgbm90IHNldFxuaWYobnVsbCA9PSBzZWxmLnVzZUNvbG9ycylzZWxmLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7aWYobnVsbCA9PSBzZWxmLmNvbG9yICYmIHNlbGYudXNlQ29sb3JzKXNlbGYuY29sb3IgPSBzZWxlY3RDb2xvcigpO3ZhciBhcmdzPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7YXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO2lmKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSl7IC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVvXG5hcmdzID0gWyclbyddLmNvbmNhdChhcmdzKTt9IC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG52YXIgaW5kZXg9MDthcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXolXSkvZyxmdW5jdGlvbihtYXRjaCxmb3JtYXQpeyAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG5pZihtYXRjaCA9PT0gJyUlJylyZXR1cm4gbWF0Y2g7aW5kZXgrKzt2YXIgZm9ybWF0dGVyPWV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO2lmKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpe3ZhciB2YWw9YXJnc1tpbmRleF07bWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLHZhbCk7IC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbmFyZ3Muc3BsaWNlKGluZGV4LDEpO2luZGV4LS07fXJldHVybiBtYXRjaDt9KTtpZignZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5mb3JtYXRBcmdzKXthcmdzID0gZXhwb3J0cy5mb3JtYXRBcmdzLmFwcGx5KHNlbGYsYXJncyk7fXZhciBsb2dGbj1lbmFibGVkLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO2xvZ0ZuLmFwcGx5KHNlbGYsYXJncyk7fWVuYWJsZWQuZW5hYmxlZCA9IHRydWU7dmFyIGZuPWV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpP2VuYWJsZWQ6ZGlzYWJsZWQ7Zm4ubmFtZXNwYWNlID0gbmFtZXNwYWNlO3JldHVybiBmbjt9IC8qKlxyXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXHJcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKXtleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7dmFyIHNwbGl0PShuYW1lc3BhY2VzIHx8ICcnKS5zcGxpdCgvW1xccyxdKy8pO3ZhciBsZW49c3BsaXQubGVuZ3RoO2Zvcih2YXIgaT0wO2kgPCBsZW47aSsrKSB7aWYoIXNwbGl0W2ldKWNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xubmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCcuKj8nKTtpZihuYW1lc3BhY2VzWzBdID09PSAnLScpe2V4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7fWVsc2Uge2V4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTt9fX0gLyoqXHJcbiAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBkaXNhYmxlKCl7ZXhwb3J0cy5lbmFibGUoJycpO30gLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gZW5hYmxlZChuYW1lKXt2YXIgaSxsZW47Zm9yKGkgPSAwLGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoO2kgPCBsZW47aSsrKSB7aWYoZXhwb3J0cy5za2lwc1tpXS50ZXN0KG5hbWUpKXtyZXR1cm4gZmFsc2U7fX1mb3IoaSA9IDAsbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7aSA8IGxlbjtpKyspIHtpZihleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpe3JldHVybiB0cnVlO319cmV0dXJuIGZhbHNlO30gLyoqXHJcbiAqIENvZXJjZSBgdmFsYC5cclxuICpcclxuICogQHBhcmFtIHtNaXhlZH0gdmFsXHJcbiAqIEByZXR1cm4ge01peGVkfVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZnVuY3Rpb24gY29lcmNlKHZhbCl7aWYodmFsIGluc3RhbmNlb2YgRXJyb3IpcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtyZXR1cm4gdmFsO319LHtcIm1zXCI6MjV9XSwxOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxyXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxyXG4gKi92YXIga2V5cz1fZGVyZXFfKCcuL2tleXMnKTt2YXIgaGFzQmluYXJ5PV9kZXJlcV8oJ2hhcy1iaW5hcnknKTt2YXIgc2xpY2VCdWZmZXI9X2RlcmVxXygnYXJyYXlidWZmZXIuc2xpY2UnKTt2YXIgYmFzZTY0ZW5jb2Rlcj1fZGVyZXFfKCdiYXNlNjQtYXJyYXlidWZmZXInKTt2YXIgYWZ0ZXI9X2RlcmVxXygnYWZ0ZXInKTt2YXIgdXRmOD1fZGVyZXFfKCd1dGY4Jyk7IC8qKlxyXG4gKiBDaGVjayBpZiB3ZSBhcmUgcnVubmluZyBhbiBhbmRyb2lkIGJyb3dzZXIuIFRoYXQgcmVxdWlyZXMgdXMgdG8gdXNlXHJcbiAqIEFycmF5QnVmZmVyIHdpdGggcG9sbGluZyB0cmFuc3BvcnRzLi4uXHJcbiAqXHJcbiAqIGh0dHA6Ly9naGluZGEubmV0L2pwZWctYmxvYi1hamF4LWFuZHJvaWQvXHJcbiAqL3ZhciBpc0FuZHJvaWQ9bmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKTsgLyoqXHJcbiAqIENoZWNrIGlmIHdlIGFyZSBydW5uaW5nIGluIFBoYW50b21KUy5cclxuICogVXBsb2FkaW5nIGEgQmxvYiB3aXRoIFBoYW50b21KUyBkb2VzIG5vdCB3b3JrIGNvcnJlY3RseSwgYXMgcmVwb3J0ZWQgaGVyZTpcclxuICogaHR0cHM6Ly9naXRodWIuY29tL2FyaXlhL3BoYW50b21qcy9pc3N1ZXMvMTEzOTVcclxuICogQHR5cGUgYm9vbGVhblxyXG4gKi92YXIgaXNQaGFudG9tSlM9L1BoYW50b21KUy9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7IC8qKlxyXG4gKiBXaGVuIHRydWUsIGF2b2lkcyB1c2luZyBCbG9icyB0byBlbmNvZGUgcGF5bG9hZHMuXHJcbiAqIEB0eXBlIGJvb2xlYW5cclxuICovdmFyIGRvbnRTZW5kQmxvYnM9aXNBbmRyb2lkIHx8IGlzUGhhbnRvbUpTOyAvKipcclxuICogQ3VycmVudCBwcm90b2NvbCB2ZXJzaW9uLlxyXG4gKi9leHBvcnRzLnByb3RvY29sID0gMzsgLyoqXHJcbiAqIFBhY2tldCB0eXBlcy5cclxuICovdmFyIHBhY2tldHM9ZXhwb3J0cy5wYWNrZXRzID0ge29wZW46MCwgLy8gbm9uLXdzXG5jbG9zZToxLCAvLyBub24td3NcbnBpbmc6Mixwb25nOjMsbWVzc2FnZTo0LHVwZ3JhZGU6NSxub29wOjZ9O3ZhciBwYWNrZXRzbGlzdD1rZXlzKHBhY2tldHMpOyAvKipcclxuICogUHJlbWFkZSBlcnJvciBwYWNrZXQuXHJcbiAqL3ZhciBlcnI9e3R5cGU6J2Vycm9yJyxkYXRhOidwYXJzZXIgZXJyb3InfTsgLyoqXHJcbiAqIENyZWF0ZSBhIGJsb2IgYXBpIGV2ZW4gZm9yIGJsb2IgYnVpbGRlciB3aGVuIHZlbmRvciBwcmVmaXhlcyBleGlzdFxyXG4gKi92YXIgQmxvYj1fZGVyZXFfKCdibG9iJyk7IC8qKlxyXG4gKiBFbmNvZGVzIGEgcGFja2V0LlxyXG4gKlxyXG4gKiAgICAgPHBhY2tldCB0eXBlIGlkPiBbIDxkYXRhPiBdXHJcbiAqXHJcbiAqIEV4YW1wbGU6XHJcbiAqXHJcbiAqICAgICA1aGVsbG8gd29ybGRcclxuICogICAgIDNcclxuICogICAgIDRcclxuICpcclxuICogQmluYXJ5IGlzIGVuY29kZWQgaW4gYW4gaWRlbnRpY2FsIHByaW5jaXBsZVxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZXhwb3J0cy5lbmNvZGVQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQsc3VwcG9ydHNCaW5hcnksdXRmOGVuY29kZSxjYWxsYmFjayl7aWYoJ2Z1bmN0aW9uJyA9PSB0eXBlb2Ygc3VwcG9ydHNCaW5hcnkpe2NhbGxiYWNrID0gc3VwcG9ydHNCaW5hcnk7c3VwcG9ydHNCaW5hcnkgPSBmYWxzZTt9aWYoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgdXRmOGVuY29kZSl7Y2FsbGJhY2sgPSB1dGY4ZW5jb2RlO3V0ZjhlbmNvZGUgPSBudWxsO312YXIgZGF0YT1wYWNrZXQuZGF0YSA9PT0gdW5kZWZpbmVkP3VuZGVmaW5lZDpwYWNrZXQuZGF0YS5idWZmZXIgfHwgcGFja2V0LmRhdGE7aWYoZ2xvYmFsLkFycmF5QnVmZmVyICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcil7cmV0dXJuIGVuY29kZUFycmF5QnVmZmVyKHBhY2tldCxzdXBwb3J0c0JpbmFyeSxjYWxsYmFjayk7fWVsc2UgaWYoQmxvYiAmJiBkYXRhIGluc3RhbmNlb2YgZ2xvYmFsLkJsb2Ipe3JldHVybiBlbmNvZGVCbG9iKHBhY2tldCxzdXBwb3J0c0JpbmFyeSxjYWxsYmFjayk7fSAvLyBtaWdodCBiZSBhbiBvYmplY3Qgd2l0aCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbmlmKGRhdGEgJiYgZGF0YS5iYXNlNjQpe3JldHVybiBlbmNvZGVCYXNlNjRPYmplY3QocGFja2V0LGNhbGxiYWNrKTt9IC8vIFNlbmRpbmcgZGF0YSBhcyBhIHV0Zi04IHN0cmluZ1xudmFyIGVuY29kZWQ9cGFja2V0c1twYWNrZXQudHlwZV07IC8vIGRhdGEgZnJhZ21lbnQgaXMgb3B0aW9uYWxcbmlmKHVuZGVmaW5lZCAhPT0gcGFja2V0LmRhdGEpe2VuY29kZWQgKz0gdXRmOGVuY29kZT91dGY4LmVuY29kZShTdHJpbmcocGFja2V0LmRhdGEpKTpTdHJpbmcocGFja2V0LmRhdGEpO31yZXR1cm4gY2FsbGJhY2soJycgKyBlbmNvZGVkKTt9O2Z1bmN0aW9uIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsY2FsbGJhY2speyAvLyBwYWNrZXQgZGF0YSBpcyBhbiBvYmplY3QgeyBiYXNlNjQ6IHRydWUsIGRhdGE6IGRhdGFBc0Jhc2U2NFN0cmluZyB9XG52YXIgbWVzc2FnZT0nYicgKyBleHBvcnRzLnBhY2tldHNbcGFja2V0LnR5cGVdICsgcGFja2V0LmRhdGEuZGF0YTtyZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7fSAvKipcclxuICogRW5jb2RlIHBhY2tldCBoZWxwZXJzIGZvciBiaW5hcnkgdHlwZXNcclxuICovZnVuY3Rpb24gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKXtpZighc3VwcG9ydHNCaW5hcnkpe3JldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsY2FsbGJhY2spO312YXIgZGF0YT1wYWNrZXQuZGF0YTt2YXIgY29udGVudEFycmF5PW5ldyBVaW50OEFycmF5KGRhdGEpO3ZhciByZXN1bHRCdWZmZXI9bmV3IFVpbnQ4QXJyYXkoMSArIGRhdGEuYnl0ZUxlbmd0aCk7cmVzdWx0QnVmZmVyWzBdID0gcGFja2V0c1twYWNrZXQudHlwZV07Zm9yKHZhciBpPTA7aSA8IGNvbnRlbnRBcnJheS5sZW5ndGg7aSsrKSB7cmVzdWx0QnVmZmVyW2kgKyAxXSA9IGNvbnRlbnRBcnJheVtpXTt9cmV0dXJuIGNhbGxiYWNrKHJlc3VsdEJ1ZmZlci5idWZmZXIpO31mdW5jdGlvbiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsc3VwcG9ydHNCaW5hcnksY2FsbGJhY2spe2lmKCFzdXBwb3J0c0JpbmFyeSl7cmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCxjYWxsYmFjayk7fXZhciBmcj1uZXcgRmlsZVJlYWRlcigpO2ZyLm9ubG9hZCA9IGZ1bmN0aW9uKCl7cGFja2V0LmRhdGEgPSBmci5yZXN1bHQ7ZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LHN1cHBvcnRzQmluYXJ5LHRydWUsY2FsbGJhY2spO307cmV0dXJuIGZyLnJlYWRBc0FycmF5QnVmZmVyKHBhY2tldC5kYXRhKTt9ZnVuY3Rpb24gZW5jb2RlQmxvYihwYWNrZXQsc3VwcG9ydHNCaW5hcnksY2FsbGJhY2spe2lmKCFzdXBwb3J0c0JpbmFyeSl7cmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCxjYWxsYmFjayk7fWlmKGRvbnRTZW5kQmxvYnMpe3JldHVybiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsc3VwcG9ydHNCaW5hcnksY2FsbGJhY2spO312YXIgbGVuZ3RoPW5ldyBVaW50OEFycmF5KDEpO2xlbmd0aFswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO3ZhciBibG9iPW5ldyBCbG9iKFtsZW5ndGguYnVmZmVyLHBhY2tldC5kYXRhXSk7cmV0dXJuIGNhbGxiYWNrKGJsb2IpO30gLyoqXHJcbiAqIEVuY29kZXMgYSBwYWNrZXQgd2l0aCBiaW5hcnkgZGF0YSBpbiBhIGJhc2U2NCBzdHJpbmdcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCwgaGFzIGB0eXBlYCBhbmQgYGRhdGFgXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gYmFzZTY0IGVuY29kZWQgbWVzc2FnZVxyXG4gKi9leHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCxjYWxsYmFjayl7dmFyIG1lc3NhZ2U9J2InICsgZXhwb3J0cy5wYWNrZXRzW3BhY2tldC50eXBlXTtpZihCbG9iICYmIHBhY2tldC5kYXRhIGluc3RhbmNlb2YgZ2xvYmFsLkJsb2Ipe3ZhciBmcj1uZXcgRmlsZVJlYWRlcigpO2ZyLm9ubG9hZCA9IGZ1bmN0aW9uKCl7dmFyIGI2ND1mci5yZXN1bHQuc3BsaXQoJywnKVsxXTtjYWxsYmFjayhtZXNzYWdlICsgYjY0KTt9O3JldHVybiBmci5yZWFkQXNEYXRhVVJMKHBhY2tldC5kYXRhKTt9dmFyIGI2NGRhdGE7dHJ5e2I2NGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsbmV3IFVpbnQ4QXJyYXkocGFja2V0LmRhdGEpKTt9Y2F0Y2goZSkgeyAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB3aXRoIHR5cGVkIGFycmF5c1xudmFyIHR5cGVkPW5ldyBVaW50OEFycmF5KHBhY2tldC5kYXRhKTt2YXIgYmFzaWM9bmV3IEFycmF5KHR5cGVkLmxlbmd0aCk7Zm9yKHZhciBpPTA7aSA8IHR5cGVkLmxlbmd0aDtpKyspIHtiYXNpY1tpXSA9IHR5cGVkW2ldO31iNjRkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGJhc2ljKTt9bWVzc2FnZSArPSBnbG9iYWwuYnRvYShiNjRkYXRhKTtyZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7fTsgLyoqXHJcbiAqIERlY29kZXMgYSBwYWNrZXQuIENoYW5nZXMgZm9ybWF0IHRvIEJsb2IgaWYgcmVxdWVzdGVkLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYHR5cGVgIGFuZCBgZGF0YWAgKGlmIGFueSlcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2V4cG9ydHMuZGVjb2RlUGFja2V0ID0gZnVuY3Rpb24oZGF0YSxiaW5hcnlUeXBlLHV0ZjhkZWNvZGUpeyAvLyBTdHJpbmcgZGF0YVxuaWYodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycgfHwgZGF0YSA9PT0gdW5kZWZpbmVkKXtpZihkYXRhLmNoYXJBdCgwKSA9PSAnYicpe3JldHVybiBleHBvcnRzLmRlY29kZUJhc2U2NFBhY2tldChkYXRhLnN1YnN0cigxKSxiaW5hcnlUeXBlKTt9aWYodXRmOGRlY29kZSl7dHJ5e2RhdGEgPSB1dGY4LmRlY29kZShkYXRhKTt9Y2F0Y2goZSkge3JldHVybiBlcnI7fX12YXIgdHlwZT1kYXRhLmNoYXJBdCgwKTtpZihOdW1iZXIodHlwZSkgIT0gdHlwZSB8fCAhcGFja2V0c2xpc3RbdHlwZV0pe3JldHVybiBlcnI7fWlmKGRhdGEubGVuZ3RoID4gMSl7cmV0dXJuIHt0eXBlOnBhY2tldHNsaXN0W3R5cGVdLGRhdGE6ZGF0YS5zdWJzdHJpbmcoMSl9O31lbHNlIHtyZXR1cm4ge3R5cGU6cGFja2V0c2xpc3RbdHlwZV19O319dmFyIGFzQXJyYXk9bmV3IFVpbnQ4QXJyYXkoZGF0YSk7dmFyIHR5cGU9YXNBcnJheVswXTt2YXIgcmVzdD1zbGljZUJ1ZmZlcihkYXRhLDEpO2lmKEJsb2IgJiYgYmluYXJ5VHlwZSA9PT0gJ2Jsb2InKXtyZXN0ID0gbmV3IEJsb2IoW3Jlc3RdKTt9cmV0dXJuIHt0eXBlOnBhY2tldHNsaXN0W3R5cGVdLGRhdGE6cmVzdH07fTsgLyoqXHJcbiAqIERlY29kZXMgYSBwYWNrZXQgZW5jb2RlZCBpbiBhIGJhc2U2NCBzdHJpbmdcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGJhc2U2NCBlbmNvZGVkIG1lc3NhZ2VcclxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGB0eXBlYCBhbmQgYGRhdGFgIChpZiBhbnkpXHJcbiAqL2V4cG9ydHMuZGVjb2RlQmFzZTY0UGFja2V0ID0gZnVuY3Rpb24obXNnLGJpbmFyeVR5cGUpe3ZhciB0eXBlPXBhY2tldHNsaXN0W21zZy5jaGFyQXQoMCldO2lmKCFnbG9iYWwuQXJyYXlCdWZmZXIpe3JldHVybiB7dHlwZTp0eXBlLGRhdGE6e2Jhc2U2NDp0cnVlLGRhdGE6bXNnLnN1YnN0cigxKX19O312YXIgZGF0YT1iYXNlNjRlbmNvZGVyLmRlY29kZShtc2cuc3Vic3RyKDEpKTtpZihiaW5hcnlUeXBlID09PSAnYmxvYicgJiYgQmxvYil7ZGF0YSA9IG5ldyBCbG9iKFtkYXRhXSk7fXJldHVybiB7dHlwZTp0eXBlLGRhdGE6ZGF0YX07fTsgLyoqXHJcbiAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpLlxyXG4gKlxyXG4gKiAgICAgPGxlbmd0aD46ZGF0YVxyXG4gKlxyXG4gKiBFeGFtcGxlOlxyXG4gKlxyXG4gKiAgICAgMTE6aGVsbG8gd29ybGQyOmhpXHJcbiAqXHJcbiAqIElmIGFueSBjb250ZW50cyBhcmUgYmluYXJ5LCB0aGV5IHdpbGwgYmUgZW5jb2RlZCBhcyBiYXNlNjQgc3RyaW5ncy4gQmFzZTY0XHJcbiAqIGVuY29kZWQgc3RyaW5ncyBhcmUgbWFya2VkIHdpdGggYSBiIGJlZm9yZSB0aGUgbGVuZ3RoIHNwZWNpZmllclxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9leHBvcnRzLmVuY29kZVBheWxvYWQgPSBmdW5jdGlvbihwYWNrZXRzLHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKXtpZih0eXBlb2Ygc3VwcG9ydHNCaW5hcnkgPT0gJ2Z1bmN0aW9uJyl7Y2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtzdXBwb3J0c0JpbmFyeSA9IG51bGw7fXZhciBpc0JpbmFyeT1oYXNCaW5hcnkocGFja2V0cyk7aWYoc3VwcG9ydHNCaW5hcnkgJiYgaXNCaW5hcnkpe2lmKEJsb2IgJiYgIWRvbnRTZW5kQmxvYnMpe3JldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IocGFja2V0cyxjYWxsYmFjayk7fXJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyKHBhY2tldHMsY2FsbGJhY2spO31pZighcGFja2V0cy5sZW5ndGgpe3JldHVybiBjYWxsYmFjaygnMDonKTt9ZnVuY3Rpb24gc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2Upe3JldHVybiBtZXNzYWdlLmxlbmd0aCArICc6JyArIG1lc3NhZ2U7fWZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsZG9uZUNhbGxiYWNrKXtleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIWlzQmluYXJ5P2ZhbHNlOnN1cHBvcnRzQmluYXJ5LHRydWUsZnVuY3Rpb24obWVzc2FnZSl7ZG9uZUNhbGxiYWNrKG51bGwsc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2UpKTt9KTt9bWFwKHBhY2tldHMsZW5jb2RlT25lLGZ1bmN0aW9uKGVycixyZXN1bHRzKXtyZXR1cm4gY2FsbGJhY2socmVzdWx0cy5qb2luKCcnKSk7fSk7fTsgLyoqXHJcbiAqIEFzeW5jIGFycmF5IG1hcCB1c2luZyBhZnRlclxyXG4gKi9mdW5jdGlvbiBtYXAoYXJ5LGVhY2gsZG9uZSl7dmFyIHJlc3VsdD1uZXcgQXJyYXkoYXJ5Lmxlbmd0aCk7dmFyIG5leHQ9YWZ0ZXIoYXJ5Lmxlbmd0aCxkb25lKTt2YXIgZWFjaFdpdGhJbmRleD1mdW5jdGlvbiBlYWNoV2l0aEluZGV4KGksZWwsY2Ipe2VhY2goZWwsZnVuY3Rpb24oZXJyb3IsbXNnKXtyZXN1bHRbaV0gPSBtc2c7Y2IoZXJyb3IscmVzdWx0KTt9KTt9O2Zvcih2YXIgaT0wO2kgPCBhcnkubGVuZ3RoO2krKykge2VhY2hXaXRoSW5kZXgoaSxhcnlbaV0sbmV4dCk7fX0gLypcclxuICogRGVjb2RlcyBkYXRhIHdoZW4gYSBwYXlsb2FkIGlzIG1heWJlIGV4cGVjdGVkLiBQb3NzaWJsZSBiaW5hcnkgY29udGVudHMgYXJlXHJcbiAqIGRlY29kZWQgZnJvbSB0aGVpciBiYXNlNjQgcmVwcmVzZW50YXRpb25cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLmRlY29kZVBheWxvYWQgPSBmdW5jdGlvbihkYXRhLGJpbmFyeVR5cGUsY2FsbGJhY2spe2lmKHR5cGVvZiBkYXRhICE9ICdzdHJpbmcnKXtyZXR1cm4gZXhwb3J0cy5kZWNvZGVQYXlsb2FkQXNCaW5hcnkoZGF0YSxiaW5hcnlUeXBlLGNhbGxiYWNrKTt9aWYodHlwZW9mIGJpbmFyeVR5cGUgPT09ICdmdW5jdGlvbicpe2NhbGxiYWNrID0gYmluYXJ5VHlwZTtiaW5hcnlUeXBlID0gbnVsbDt9dmFyIHBhY2tldDtpZihkYXRhID09ICcnKXsgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxucmV0dXJuIGNhbGxiYWNrKGVyciwwLDEpO312YXIgbGVuZ3RoPScnLG4sbXNnO2Zvcih2YXIgaT0wLGw9ZGF0YS5sZW5ndGg7aSA8IGw7aSsrKSB7dmFyIGNocj1kYXRhLmNoYXJBdChpKTtpZignOicgIT0gY2hyKXtsZW5ndGggKz0gY2hyO31lbHNlIHtpZignJyA9PSBsZW5ndGggfHwgbGVuZ3RoICE9IChuID0gTnVtYmVyKGxlbmd0aCkpKXsgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxucmV0dXJuIGNhbGxiYWNrKGVyciwwLDEpO31tc2cgPSBkYXRhLnN1YnN0cihpICsgMSxuKTtpZihsZW5ndGggIT0gbXNnLmxlbmd0aCl7IC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbnJldHVybiBjYWxsYmFjayhlcnIsMCwxKTt9aWYobXNnLmxlbmd0aCl7cGFja2V0ID0gZXhwb3J0cy5kZWNvZGVQYWNrZXQobXNnLGJpbmFyeVR5cGUsdHJ1ZSk7aWYoZXJyLnR5cGUgPT0gcGFja2V0LnR5cGUgJiYgZXJyLmRhdGEgPT0gcGFja2V0LmRhdGEpeyAvLyBwYXJzZXIgZXJyb3IgaW4gaW5kaXZpZHVhbCBwYWNrZXQgLSBpZ25vcmluZyBwYXlsb2FkXG5yZXR1cm4gY2FsbGJhY2soZXJyLDAsMSk7fXZhciByZXQ9Y2FsbGJhY2socGFja2V0LGkgKyBuLGwpO2lmKGZhbHNlID09PSByZXQpcmV0dXJuO30gLy8gYWR2YW5jZSBjdXJzb3JcbmkgKz0gbjtsZW5ndGggPSAnJzt9fWlmKGxlbmd0aCAhPSAnJyl7IC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbnJldHVybiBjYWxsYmFjayhlcnIsMCwxKTt9fTsgLyoqXHJcbiAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpIGFzIGJpbmFyeS5cclxuICpcclxuICogPDEgPSBiaW5hcnksIDAgPSBzdHJpbmc+PG51bWJlciBmcm9tIDAtOT48bnVtYmVyIGZyb20gMC05PlsuLi5dPG51bWJlclxyXG4gKiAyNTU+PGRhdGE+XHJcbiAqXHJcbiAqIEV4YW1wbGU6XHJcbiAqIDEgMyAyNTUgMSAyIDMsIGlmIHRoZSBiaW5hcnkgY29udGVudHMgYXJlIGludGVycHJldGVkIGFzIDggYml0IGludGVnZXJzXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcclxuICogQHJldHVybiB7QXJyYXlCdWZmZXJ9IGVuY29kZWQgcGF5bG9hZFxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNBcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKHBhY2tldHMsY2FsbGJhY2spe2lmKCFwYWNrZXRzLmxlbmd0aCl7cmV0dXJuIGNhbGxiYWNrKG5ldyBBcnJheUJ1ZmZlcigwKSk7fWZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsZG9uZUNhbGxiYWNrKXtleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsdHJ1ZSx0cnVlLGZ1bmN0aW9uKGRhdGEpe3JldHVybiBkb25lQ2FsbGJhY2sobnVsbCxkYXRhKTt9KTt9bWFwKHBhY2tldHMsZW5jb2RlT25lLGZ1bmN0aW9uKGVycixlbmNvZGVkUGFja2V0cyl7dmFyIHRvdGFsTGVuZ3RoPWVuY29kZWRQYWNrZXRzLnJlZHVjZShmdW5jdGlvbihhY2MscCl7dmFyIGxlbjtpZih0eXBlb2YgcCA9PT0gJ3N0cmluZycpe2xlbiA9IHAubGVuZ3RoO31lbHNlIHtsZW4gPSBwLmJ5dGVMZW5ndGg7fXJldHVybiBhY2MgKyBsZW4udG9TdHJpbmcoKS5sZW5ndGggKyBsZW4gKyAyOyAvLyBzdHJpbmcvYmluYXJ5IGlkZW50aWZpZXIgKyBzZXBhcmF0b3IgPSAyXG59LDApO3ZhciByZXN1bHRBcnJheT1uZXcgVWludDhBcnJheSh0b3RhbExlbmd0aCk7dmFyIGJ1ZmZlckluZGV4PTA7ZW5jb2RlZFBhY2tldHMuZm9yRWFjaChmdW5jdGlvbihwKXt2YXIgaXNTdHJpbmc9dHlwZW9mIHAgPT09ICdzdHJpbmcnO3ZhciBhYj1wO2lmKGlzU3RyaW5nKXt2YXIgdmlldz1uZXcgVWludDhBcnJheShwLmxlbmd0aCk7Zm9yKHZhciBpPTA7aSA8IHAubGVuZ3RoO2krKykge3ZpZXdbaV0gPSBwLmNoYXJDb2RlQXQoaSk7fWFiID0gdmlldy5idWZmZXI7fWlmKGlzU3RyaW5nKXsgLy8gbm90IHRydWUgYmluYXJ5XG5yZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDA7fWVsc2UgeyAvLyB0cnVlIGJpbmFyeVxucmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAxO312YXIgbGVuU3RyPWFiLmJ5dGVMZW5ndGgudG9TdHJpbmcoKTtmb3IodmFyIGk9MDtpIDwgbGVuU3RyLmxlbmd0aDtpKyspIHtyZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IHBhcnNlSW50KGxlblN0cltpXSk7fXJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMjU1O3ZhciB2aWV3PW5ldyBVaW50OEFycmF5KGFiKTtmb3IodmFyIGk9MDtpIDwgdmlldy5sZW5ndGg7aSsrKSB7cmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSB2aWV3W2ldO319KTtyZXR1cm4gY2FsbGJhY2socmVzdWx0QXJyYXkuYnVmZmVyKTt9KTt9OyAvKipcclxuICogRW5jb2RlIGFzIEJsb2JcclxuICovZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNCbG9iID0gZnVuY3Rpb24ocGFja2V0cyxjYWxsYmFjayl7ZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCxkb25lQ2FsbGJhY2spe2V4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCx0cnVlLHRydWUsZnVuY3Rpb24oZW5jb2RlZCl7dmFyIGJpbmFyeUlkZW50aWZpZXI9bmV3IFVpbnQ4QXJyYXkoMSk7YmluYXJ5SWRlbnRpZmllclswXSA9IDE7aWYodHlwZW9mIGVuY29kZWQgPT09ICdzdHJpbmcnKXt2YXIgdmlldz1uZXcgVWludDhBcnJheShlbmNvZGVkLmxlbmd0aCk7Zm9yKHZhciBpPTA7aSA8IGVuY29kZWQubGVuZ3RoO2krKykge3ZpZXdbaV0gPSBlbmNvZGVkLmNoYXJDb2RlQXQoaSk7fWVuY29kZWQgPSB2aWV3LmJ1ZmZlcjtiaW5hcnlJZGVudGlmaWVyWzBdID0gMDt9dmFyIGxlbj1lbmNvZGVkIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI/ZW5jb2RlZC5ieXRlTGVuZ3RoOmVuY29kZWQuc2l6ZTt2YXIgbGVuU3RyPWxlbi50b1N0cmluZygpO3ZhciBsZW5ndGhBcnk9bmV3IFVpbnQ4QXJyYXkobGVuU3RyLmxlbmd0aCArIDEpO2Zvcih2YXIgaT0wO2kgPCBsZW5TdHIubGVuZ3RoO2krKykge2xlbmd0aEFyeVtpXSA9IHBhcnNlSW50KGxlblN0cltpXSk7fWxlbmd0aEFyeVtsZW5TdHIubGVuZ3RoXSA9IDI1NTtpZihCbG9iKXt2YXIgYmxvYj1uZXcgQmxvYihbYmluYXJ5SWRlbnRpZmllci5idWZmZXIsbGVuZ3RoQXJ5LmJ1ZmZlcixlbmNvZGVkXSk7ZG9uZUNhbGxiYWNrKG51bGwsYmxvYik7fX0pO31tYXAocGFja2V0cyxlbmNvZGVPbmUsZnVuY3Rpb24oZXJyLHJlc3VsdHMpe3JldHVybiBjYWxsYmFjayhuZXcgQmxvYihyZXN1bHRzKSk7fSk7fTsgLypcclxuICogRGVjb2RlcyBkYXRhIHdoZW4gYSBwYXlsb2FkIGlzIG1heWJlIGV4cGVjdGVkLiBTdHJpbmdzIGFyZSBkZWNvZGVkIGJ5XHJcbiAqIGludGVycHJldGluZyBlYWNoIGJ5dGUgYXMgYSBrZXkgY29kZSBmb3IgZW50cmllcyBtYXJrZWQgdG8gc3RhcnQgd2l0aCAwLiBTZWVcclxuICogZGVzY3JpcHRpb24gb2YgZW5jb2RlUGF5bG9hZEFzQmluYXJ5XHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLmRlY29kZVBheWxvYWRBc0JpbmFyeSA9IGZ1bmN0aW9uKGRhdGEsYmluYXJ5VHlwZSxjYWxsYmFjayl7aWYodHlwZW9mIGJpbmFyeVR5cGUgPT09ICdmdW5jdGlvbicpe2NhbGxiYWNrID0gYmluYXJ5VHlwZTtiaW5hcnlUeXBlID0gbnVsbDt9dmFyIGJ1ZmZlclRhaWw9ZGF0YTt2YXIgYnVmZmVycz1bXTt2YXIgbnVtYmVyVG9vTG9uZz1mYWxzZTt3aGlsZShidWZmZXJUYWlsLmJ5dGVMZW5ndGggPiAwKSB7dmFyIHRhaWxBcnJheT1uZXcgVWludDhBcnJheShidWZmZXJUYWlsKTt2YXIgaXNTdHJpbmc9dGFpbEFycmF5WzBdID09PSAwO3ZhciBtc2dMZW5ndGg9Jyc7Zm9yKHZhciBpPTE7O2krKykge2lmKHRhaWxBcnJheVtpXSA9PSAyNTUpYnJlYWs7aWYobXNnTGVuZ3RoLmxlbmd0aCA+IDMxMCl7bnVtYmVyVG9vTG9uZyA9IHRydWU7YnJlYWs7fW1zZ0xlbmd0aCArPSB0YWlsQXJyYXlbaV07fWlmKG51bWJlclRvb0xvbmcpcmV0dXJuIGNhbGxiYWNrKGVyciwwLDEpO2J1ZmZlclRhaWwgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLDIgKyBtc2dMZW5ndGgubGVuZ3RoKTttc2dMZW5ndGggPSBwYXJzZUludChtc2dMZW5ndGgpO3ZhciBtc2c9c2xpY2VCdWZmZXIoYnVmZmVyVGFpbCwwLG1zZ0xlbmd0aCk7aWYoaXNTdHJpbmcpe3RyeXttc2cgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsbmV3IFVpbnQ4QXJyYXkobXNnKSk7fWNhdGNoKGUpIHsgLy8gaVBob25lIFNhZmFyaSBkb2Vzbid0IGxldCB5b3UgYXBwbHkgdG8gdHlwZWQgYXJyYXlzXG52YXIgdHlwZWQ9bmV3IFVpbnQ4QXJyYXkobXNnKTttc2cgPSAnJztmb3IodmFyIGk9MDtpIDwgdHlwZWQubGVuZ3RoO2krKykge21zZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHR5cGVkW2ldKTt9fX1idWZmZXJzLnB1c2gobXNnKTtidWZmZXJUYWlsID0gc2xpY2VCdWZmZXIoYnVmZmVyVGFpbCxtc2dMZW5ndGgpO312YXIgdG90YWw9YnVmZmVycy5sZW5ndGg7YnVmZmVycy5mb3JFYWNoKGZ1bmN0aW9uKGJ1ZmZlcixpKXtjYWxsYmFjayhleHBvcnRzLmRlY29kZVBhY2tldChidWZmZXIsYmluYXJ5VHlwZSx0cnVlKSxpLHRvdGFsKTt9KTt9O30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHtcIi4va2V5c1wiOjIwLFwiYWZ0ZXJcIjoxMSxcImFycmF5YnVmZmVyLnNsaWNlXCI6MTIsXCJiYXNlNjQtYXJyYXlidWZmZXJcIjoxMyxcImJsb2JcIjoxNCxcImhhcy1iaW5hcnlcIjoyMSxcInV0ZjhcIjoyOX1dLDIwOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIEdldHMgdGhlIGtleXMgZm9yIGFuIG9iamVjdC5cclxuICpcclxuICogQHJldHVybiB7QXJyYXl9IGtleXNcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL21vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhvYmope3ZhciBhcnI9W107dmFyIGhhcz1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O2Zvcih2YXIgaSBpbiBvYmopIHtpZihoYXMuY2FsbChvYmosaSkpe2Fyci5wdXNoKGkpO319cmV0dXJuIGFycjt9O30se31dLDIxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLypcclxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cclxuICovdmFyIGlzQXJyYXk9X2RlcmVxXygnaXNhcnJheScpOyAvKipcclxuICogTW9kdWxlIGV4cG9ydHMuXHJcbiAqL21vZHVsZS5leHBvcnRzID0gaGFzQmluYXJ5OyAvKipcclxuICogQ2hlY2tzIGZvciBiaW5hcnkgZGF0YS5cclxuICpcclxuICogUmlnaHQgbm93IG9ubHkgQnVmZmVyIGFuZCBBcnJheUJ1ZmZlciBhcmUgc3VwcG9ydGVkLi5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGFueXRoaW5nXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIGhhc0JpbmFyeShkYXRhKXtmdW5jdGlvbiBfaGFzQmluYXJ5KG9iail7aWYoIW9iailyZXR1cm4gZmFsc2U7aWYoZ2xvYmFsLkJ1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgZ2xvYmFsLkFycmF5QnVmZmVyICYmIG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGdsb2JhbC5CbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IgfHwgZ2xvYmFsLkZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSl7cmV0dXJuIHRydWU7fWlmKGlzQXJyYXkob2JqKSl7Zm9yKHZhciBpPTA7aSA8IG9iai5sZW5ndGg7aSsrKSB7aWYoX2hhc0JpbmFyeShvYmpbaV0pKXtyZXR1cm4gdHJ1ZTt9fX1lbHNlIGlmKG9iaiAmJiAnb2JqZWN0JyA9PSB0eXBlb2Ygb2JqKXtpZihvYmoudG9KU09OKXtvYmogPSBvYmoudG9KU09OKCk7fWZvcih2YXIga2V5IGluIG9iaikge2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosa2V5KSAmJiBfaGFzQmluYXJ5KG9ialtrZXldKSl7cmV0dXJuIHRydWU7fX19cmV0dXJuIGZhbHNlO31yZXR1cm4gX2hhc0JpbmFyeShkYXRhKTt9fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se1wiaXNhcnJheVwiOjI0fV0sMjI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogTW9kdWxlIGV4cG9ydHMuXHJcbiAqXHJcbiAqIExvZ2ljIGJvcnJvd2VkIGZyb20gTW9kZXJuaXpyOlxyXG4gKlxyXG4gKiAgIC0gaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2NvcnMuanNcclxuICovdHJ5e21vZHVsZS5leHBvcnRzID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKTt9Y2F0Y2goZXJyKSB7IC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbi8vIHdoZW4gdHJ5aW5nIHRvIGNyZWF0ZVxubW9kdWxlLmV4cG9ydHMgPSBmYWxzZTt9fSx7fV0sMjM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe3ZhciBpbmRleE9mPVtdLmluZGV4T2Y7bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsb2JqKXtpZihpbmRleE9mKXJldHVybiBhcnIuaW5kZXhPZihvYmopO2Zvcih2YXIgaT0wO2kgPCBhcnIubGVuZ3RoOysraSkge2lmKGFycltpXSA9PT0gb2JqKXJldHVybiBpO31yZXR1cm4gLTE7fTt9LHt9XSwyNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKGFycil7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7fTt9LHt9XSwyNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBIZWxwZXJzLlxyXG4gKi92YXIgcz0xMDAwO3ZhciBtPXMgKiA2MDt2YXIgaD1tICogNjA7dmFyIGQ9aCAqIDI0O3ZhciB5PWQgKiAzNjUuMjU7IC8qKlxyXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxyXG4gKlxyXG4gKiBPcHRpb25zOlxyXG4gKlxyXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsb3B0aW9ucyl7b3B0aW9ucyA9IG9wdGlvbnMgfHwge307aWYoJ3N0cmluZycgPT0gdHlwZW9mIHZhbClyZXR1cm4gcGFyc2UodmFsKTtyZXR1cm4gb3B0aW9ucy5sb25nP2xvbmcodmFsKTpzaG9ydCh2YWwpO307IC8qKlxyXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZnVuY3Rpb24gcGFyc2Uoc3RyKXtzdHIgPSAnJyArIHN0cjtpZihzdHIubGVuZ3RoID4gMTAwMDApcmV0dXJuO3ZhciBtYXRjaD0vXigoPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKHN0cik7aWYoIW1hdGNoKXJldHVybjt2YXIgbj1wYXJzZUZsb2F0KG1hdGNoWzFdKTt2YXIgdHlwZT0obWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtzd2l0Y2godHlwZSl7Y2FzZSAneWVhcnMnOmNhc2UgJ3llYXInOmNhc2UgJ3lycyc6Y2FzZSAneXInOmNhc2UgJ3knOnJldHVybiBuICogeTtjYXNlICdkYXlzJzpjYXNlICdkYXknOmNhc2UgJ2QnOnJldHVybiBuICogZDtjYXNlICdob3Vycyc6Y2FzZSAnaG91cic6Y2FzZSAnaHJzJzpjYXNlICdocic6Y2FzZSAnaCc6cmV0dXJuIG4gKiBoO2Nhc2UgJ21pbnV0ZXMnOmNhc2UgJ21pbnV0ZSc6Y2FzZSAnbWlucyc6Y2FzZSAnbWluJzpjYXNlICdtJzpyZXR1cm4gbiAqIG07Y2FzZSAnc2Vjb25kcyc6Y2FzZSAnc2Vjb25kJzpjYXNlICdzZWNzJzpjYXNlICdzZWMnOmNhc2UgJ3MnOnJldHVybiBuICogcztjYXNlICdtaWxsaXNlY29uZHMnOmNhc2UgJ21pbGxpc2Vjb25kJzpjYXNlICdtc2Vjcyc6Y2FzZSAnbXNlYyc6Y2FzZSAnbXMnOnJldHVybiBuO319IC8qKlxyXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBzaG9ydChtcyl7aWYobXMgPj0gZClyZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO2lmKG1zID49IGgpcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztpZihtcyA+PSBtKXJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7aWYobXMgPj0gcylyZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO3JldHVybiBtcyArICdtcyc7fSAvKipcclxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBsb25nKG1zKXtyZXR1cm4gcGx1cmFsKG1zLGQsJ2RheScpIHx8IHBsdXJhbChtcyxoLCdob3VyJykgfHwgcGx1cmFsKG1zLG0sJ21pbnV0ZScpIHx8IHBsdXJhbChtcyxzLCdzZWNvbmQnKSB8fCBtcyArICcgbXMnO30gLyoqXHJcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxyXG4gKi9mdW5jdGlvbiBwbHVyYWwobXMsbixuYW1lKXtpZihtcyA8IG4pcmV0dXJuO2lmKG1zIDwgbiAqIDEuNSlyZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZTtyZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO319LHt9XSwyNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxyXG4gKiBKU09OIHBhcnNlLlxyXG4gKlxyXG4gKiBAc2VlIEJhc2VkIG9uIGpRdWVyeSNwYXJzZUpTT04gKE1JVCkgYW5kIEpTT04yXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi92YXIgcnZhbGlkY2hhcnM9L15bXFxdLDp7fVxcc10qJC87dmFyIHJ2YWxpZGVzY2FwZT0vXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVswLTlhLWZBLUZdezR9KS9nO3ZhciBydmFsaWR0b2tlbnM9L1wiW15cIlxcXFxcXG5cXHJdKlwifHRydWV8ZmFsc2V8bnVsbHwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPy9nO3ZhciBydmFsaWRicmFjZXM9Lyg/Ol58OnwsKSg/OlxccypcXFspKy9nO3ZhciBydHJpbUxlZnQ9L15cXHMrLzt2YXIgcnRyaW1SaWdodD0vXFxzKyQvO21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2Vqc29uKGRhdGEpe2lmKCdzdHJpbmcnICE9IHR5cGVvZiBkYXRhIHx8ICFkYXRhKXtyZXR1cm4gbnVsbDt9ZGF0YSA9IGRhdGEucmVwbGFjZShydHJpbUxlZnQsJycpLnJlcGxhY2UocnRyaW1SaWdodCwnJyk7IC8vIEF0dGVtcHQgdG8gcGFyc2UgdXNpbmcgdGhlIG5hdGl2ZSBKU09OIHBhcnNlciBmaXJzdFxuaWYoZ2xvYmFsLkpTT04gJiYgSlNPTi5wYXJzZSl7cmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7fWlmKHJ2YWxpZGNoYXJzLnRlc3QoZGF0YS5yZXBsYWNlKHJ2YWxpZGVzY2FwZSwnQCcpLnJlcGxhY2UocnZhbGlkdG9rZW5zLCddJykucmVwbGFjZShydmFsaWRicmFjZXMsJycpKSl7cmV0dXJuIG5ldyBGdW5jdGlvbigncmV0dXJuICcgKyBkYXRhKSgpO319O30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHt9XSwyNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBDb21waWxlcyBhIHF1ZXJ5c3RyaW5nXHJcbiAqIFJldHVybnMgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKG9iail7dmFyIHN0cj0nJztmb3IodmFyIGkgaW4gb2JqKSB7aWYob2JqLmhhc093blByb3BlcnR5KGkpKXtpZihzdHIubGVuZ3RoKXN0ciArPSAnJic7c3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO319cmV0dXJuIHN0cjt9OyAvKipcclxuICogUGFyc2VzIGEgc2ltcGxlIHF1ZXJ5c3RyaW5nIGludG8gYW4gb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihxcyl7dmFyIHFyeT17fTt2YXIgcGFpcnM9cXMuc3BsaXQoJyYnKTtmb3IodmFyIGk9MCxsPXBhaXJzLmxlbmd0aDtpIDwgbDtpKyspIHt2YXIgcGFpcj1wYWlyc1tpXS5zcGxpdCgnPScpO3FyeVtkZWNvZGVVUklDb21wb25lbnQocGFpclswXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO31yZXR1cm4gcXJ5O307fSx7fV0sMjg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogUGFyc2VzIGFuIFVSSVxyXG4gKlxyXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi92YXIgcmU9L14oPzooPyFbXjpAXSs6W146QFxcL10qQCkoaHR0cHxodHRwc3x3c3x3c3MpOlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oKD86W2EtZjAtOV17MCw0fTopezIsN31bYS1mMC05XXswLDR9fFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87dmFyIHBhcnRzPVsnc291cmNlJywncHJvdG9jb2wnLCdhdXRob3JpdHknLCd1c2VySW5mbycsJ3VzZXInLCdwYXNzd29yZCcsJ2hvc3QnLCdwb3J0JywncmVsYXRpdmUnLCdwYXRoJywnZGlyZWN0b3J5JywnZmlsZScsJ3F1ZXJ5JywnYW5jaG9yJ107bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpe3ZhciBzcmM9c3RyLGI9c3RyLmluZGV4T2YoJ1snKSxlPXN0ci5pbmRleE9mKCddJyk7aWYoYiAhPSAtMSAmJiBlICE9IC0xKXtzdHIgPSBzdHIuc3Vic3RyaW5nKDAsYikgKyBzdHIuc3Vic3RyaW5nKGIsZSkucmVwbGFjZSgvOi9nLCc7JykgKyBzdHIuc3Vic3RyaW5nKGUsc3RyLmxlbmd0aCk7fXZhciBtPXJlLmV4ZWMoc3RyIHx8ICcnKSx1cmk9e30saT0xNDt3aGlsZShpLS0pIHt1cmlbcGFydHNbaV1dID0gbVtpXSB8fCAnJzt9aWYoYiAhPSAtMSAmJiBlICE9IC0xKXt1cmkuc291cmNlID0gc3JjO3VyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyaW5nKDEsdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCc6Jyk7dXJpLmF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHkucmVwbGFjZSgnWycsJycpLnJlcGxhY2UoJ10nLCcnKS5yZXBsYWNlKC87L2csJzonKTt1cmkuaXB2NnVyaSA9IHRydWU7fXJldHVybiB1cmk7fTt9LHt9XSwyOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qISBodHRwczovL210aHMuYmUvdXRmOGpzIHYyLjAuMCBieSBAbWF0aGlhcyAqLzsoZnVuY3Rpb24ocm9vdCl7IC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2BcbnZhciBmcmVlRXhwb3J0cz10eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzOyAvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYFxudmFyIGZyZWVNb2R1bGU9dHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlOyAvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLFxuLy8gYW5kIHVzZSBpdCBhcyBgcm9vdGBcbnZhciBmcmVlR2xvYmFsPXR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO2lmKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKXtyb290ID0gZnJlZUdsb2JhbDt9IC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL3ZhciBzdHJpbmdGcm9tQ2hhckNvZGU9U3RyaW5nLmZyb21DaGFyQ29kZTsgLy8gVGFrZW4gZnJvbSBodHRwczovL210aHMuYmUvcHVueWNvZGVcbmZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKXt2YXIgb3V0cHV0PVtdO3ZhciBjb3VudGVyPTA7dmFyIGxlbmd0aD1zdHJpbmcubGVuZ3RoO3ZhciB2YWx1ZTt2YXIgZXh0cmE7d2hpbGUoY291bnRlciA8IGxlbmd0aCkge3ZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtpZih2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpeyAvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcbmV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtpZigoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCl7IC8vIGxvdyBzdXJyb2dhdGVcbm91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7fWVsc2UgeyAvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuLy8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5vdXRwdXQucHVzaCh2YWx1ZSk7Y291bnRlci0tO319ZWxzZSB7b3V0cHV0LnB1c2godmFsdWUpO319cmV0dXJuIG91dHB1dDt9IC8vIFRha2VuIGZyb20gaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlXG5mdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KXt2YXIgbGVuZ3RoPWFycmF5Lmxlbmd0aDt2YXIgaW5kZXg9LTE7dmFyIHZhbHVlO3ZhciBvdXRwdXQ9Jyc7d2hpbGUoKytpbmRleCA8IGxlbmd0aCkge3ZhbHVlID0gYXJyYXlbaW5kZXhdO2lmKHZhbHVlID4gMHhGRkZGKXt2YWx1ZSAtPSAweDEwMDAwO291dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO3ZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjt9b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7fXJldHVybiBvdXRwdXQ7fWZ1bmN0aW9uIGNoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50KXtpZihjb2RlUG9pbnQgPj0gMHhEODAwICYmIGNvZGVQb2ludCA8PSAweERGRkYpe3Rocm93IEVycm9yKCdMb25lIHN1cnJvZ2F0ZSBVKycgKyBjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyAnIGlzIG5vdCBhIHNjYWxhciB2YWx1ZScpO319IC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL2Z1bmN0aW9uIGNyZWF0ZUJ5dGUoY29kZVBvaW50LHNoaWZ0KXtyZXR1cm4gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiBzaGlmdCAmIDB4M0YgfCAweDgwKTt9ZnVuY3Rpb24gZW5jb2RlQ29kZVBvaW50KGNvZGVQb2ludCl7aWYoKGNvZGVQb2ludCAmIDB4RkZGRkZGODApID09IDApeyAvLyAxLWJ5dGUgc2VxdWVuY2VcbnJldHVybiBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50KTt9dmFyIHN5bWJvbD0nJztpZigoY29kZVBvaW50ICYgMHhGRkZGRjgwMCkgPT0gMCl7IC8vIDItYnl0ZSBzZXF1ZW5jZVxuc3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiA2ICYgMHgxRiB8IDB4QzApO31lbHNlIGlmKChjb2RlUG9pbnQgJiAweEZGRkYwMDAwKSA9PSAwKXsgLy8gMy1ieXRlIHNlcXVlbmNlXG5jaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCk7c3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiAxMiAmIDB4MEYgfCAweEUwKTtzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsNik7fWVsc2UgaWYoKGNvZGVQb2ludCAmIDB4RkZFMDAwMDApID09IDApeyAvLyA0LWJ5dGUgc2VxdWVuY2VcbnN5bWJvbCA9IHN0cmluZ0Zyb21DaGFyQ29kZShjb2RlUG9pbnQgPj4gMTggJiAweDA3IHwgMHhGMCk7c3ltYm9sICs9IGNyZWF0ZUJ5dGUoY29kZVBvaW50LDEyKTtzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsNik7fXN5bWJvbCArPSBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50ICYgMHgzRiB8IDB4ODApO3JldHVybiBzeW1ib2w7fWZ1bmN0aW9uIHV0ZjhlbmNvZGUoc3RyaW5nKXt2YXIgY29kZVBvaW50cz11Y3MyZGVjb2RlKHN0cmluZyk7dmFyIGxlbmd0aD1jb2RlUG9pbnRzLmxlbmd0aDt2YXIgaW5kZXg9LTE7dmFyIGNvZGVQb2ludDt2YXIgYnl0ZVN0cmluZz0nJzt3aGlsZSgrK2luZGV4IDwgbGVuZ3RoKSB7Y29kZVBvaW50ID0gY29kZVBvaW50c1tpbmRleF07Ynl0ZVN0cmluZyArPSBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50KTt9cmV0dXJuIGJ5dGVTdHJpbmc7fSAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9mdW5jdGlvbiByZWFkQ29udGludWF0aW9uQnl0ZSgpe2lmKGJ5dGVJbmRleCA+PSBieXRlQ291bnQpe3Rocm93IEVycm9yKCdJbnZhbGlkIGJ5dGUgaW5kZXgnKTt9dmFyIGNvbnRpbnVhdGlvbkJ5dGU9Ynl0ZUFycmF5W2J5dGVJbmRleF0gJiAweEZGO2J5dGVJbmRleCsrO2lmKChjb250aW51YXRpb25CeXRlICYgMHhDMCkgPT0gMHg4MCl7cmV0dXJuIGNvbnRpbnVhdGlvbkJ5dGUgJiAweDNGO30gLy8gSWYgd2UgZW5kIHVwIGhlcmUsIGl04oCZcyBub3QgYSBjb250aW51YXRpb24gYnl0ZVxudGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTt9ZnVuY3Rpb24gZGVjb2RlU3ltYm9sKCl7dmFyIGJ5dGUxO3ZhciBieXRlMjt2YXIgYnl0ZTM7dmFyIGJ5dGU0O3ZhciBjb2RlUG9pbnQ7aWYoYnl0ZUluZGV4ID4gYnl0ZUNvdW50KXt0aHJvdyBFcnJvcignSW52YWxpZCBieXRlIGluZGV4Jyk7fWlmKGJ5dGVJbmRleCA9PSBieXRlQ291bnQpe3JldHVybiBmYWxzZTt9IC8vIFJlYWQgZmlyc3QgYnl0ZVxuYnl0ZTEgPSBieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7Ynl0ZUluZGV4Kys7IC8vIDEtYnl0ZSBzZXF1ZW5jZSAobm8gY29udGludWF0aW9uIGJ5dGVzKVxuaWYoKGJ5dGUxICYgMHg4MCkgPT0gMCl7cmV0dXJuIGJ5dGUxO30gLy8gMi1ieXRlIHNlcXVlbmNlXG5pZigoYnl0ZTEgJiAweEUwKSA9PSAweEMwKXt2YXIgYnl0ZTI9cmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtjb2RlUG9pbnQgPSAoYnl0ZTEgJiAweDFGKSA8PCA2IHwgYnl0ZTI7aWYoY29kZVBvaW50ID49IDB4ODApe3JldHVybiBjb2RlUG9pbnQ7fWVsc2Uge3Rocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7fX0gLy8gMy1ieXRlIHNlcXVlbmNlIChtYXkgaW5jbHVkZSB1bnBhaXJlZCBzdXJyb2dhdGVzKVxuaWYoKGJ5dGUxICYgMHhGMCkgPT0gMHhFMCl7Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO2J5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtjb2RlUG9pbnQgPSAoYnl0ZTEgJiAweDBGKSA8PCAxMiB8IGJ5dGUyIDw8IDYgfCBieXRlMztpZihjb2RlUG9pbnQgPj0gMHgwODAwKXtjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCk7cmV0dXJuIGNvZGVQb2ludDt9ZWxzZSB7dGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTt9fSAvLyA0LWJ5dGUgc2VxdWVuY2VcbmlmKChieXRlMSAmIDB4RjgpID09IDB4RjApe2J5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtieXRlMyA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7Ynl0ZTQgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO2NvZGVQb2ludCA9IChieXRlMSAmIDB4MEYpIDw8IDB4MTIgfCBieXRlMiA8PCAweDBDIHwgYnl0ZTMgPDwgMHgwNiB8IGJ5dGU0O2lmKGNvZGVQb2ludCA+PSAweDAxMDAwMCAmJiBjb2RlUG9pbnQgPD0gMHgxMEZGRkYpe3JldHVybiBjb2RlUG9pbnQ7fX10aHJvdyBFcnJvcignSW52YWxpZCBVVEYtOCBkZXRlY3RlZCcpO312YXIgYnl0ZUFycmF5O3ZhciBieXRlQ291bnQ7dmFyIGJ5dGVJbmRleDtmdW5jdGlvbiB1dGY4ZGVjb2RlKGJ5dGVTdHJpbmcpe2J5dGVBcnJheSA9IHVjczJkZWNvZGUoYnl0ZVN0cmluZyk7Ynl0ZUNvdW50ID0gYnl0ZUFycmF5Lmxlbmd0aDtieXRlSW5kZXggPSAwO3ZhciBjb2RlUG9pbnRzPVtdO3ZhciB0bXA7d2hpbGUoKHRtcCA9IGRlY29kZVN5bWJvbCgpKSAhPT0gZmFsc2UpIHtjb2RlUG9pbnRzLnB1c2godG1wKTt9cmV0dXJuIHVjczJlbmNvZGUoY29kZVBvaW50cyk7fSAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi92YXIgdXRmOD17J3ZlcnNpb24nOicyLjAuMCcsJ2VuY29kZSc6dXRmOGVuY29kZSwnZGVjb2RlJzp1dGY4ZGVjb2RlfTsgLy8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG4vLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5pZih0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCl7ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIHV0Zjg7fSk7fWVsc2UgaWYoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKXtpZihmcmVlTW9kdWxlKXsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcbmZyZWVNb2R1bGUuZXhwb3J0cyA9IHV0Zjg7fWVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxudmFyIG9iamVjdD17fTt2YXIgaGFzT3duUHJvcGVydHk9b2JqZWN0Lmhhc093blByb3BlcnR5O2Zvcih2YXIga2V5IGluIHV0ZjgpIHtoYXNPd25Qcm9wZXJ0eS5jYWxsKHV0Zjgsa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHV0Zjhba2V5XSk7fX19ZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcbnJvb3QudXRmOCA9IHV0Zjg7fX0pKHRoaXMpO30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHt9XSwzMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7J3VzZSBzdHJpY3QnO3ZhciBhbHBoYWJldD0nMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpLGxlbmd0aD02NCxtYXA9e30sc2VlZD0wLGk9MCxwcmV2OyAvKipcclxuICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgc3BlY2lmaWVkIG51bWJlci5cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG51bWJlci5cclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gZW5jb2RlKG51bSl7dmFyIGVuY29kZWQ9Jyc7ZG8ge2VuY29kZWQgPSBhbHBoYWJldFtudW0gJSBsZW5ndGhdICsgZW5jb2RlZDtudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7fXdoaWxlKG51bSA+IDApO3JldHVybiBlbmNvZGVkO30gLyoqXHJcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIGRlY29kZShzdHIpe3ZhciBkZWNvZGVkPTA7Zm9yKGkgPSAwO2kgPCBzdHIubGVuZ3RoO2krKykge2RlY29kZWQgPSBkZWNvZGVkICogbGVuZ3RoICsgbWFwW3N0ci5jaGFyQXQoaSldO31yZXR1cm4gZGVjb2RlZDt9IC8qKlxyXG4gKiBZZWFzdDogQSB0aW55IGdyb3dpbmcgaWQgZ2VuZXJhdG9yLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBBIHVuaXF1ZSBpZC5cclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24geWVhc3QoKXt2YXIgbm93PWVuY29kZSgrbmV3IERhdGUoKSk7aWYobm93ICE9PSBwcmV2KXJldHVybiBzZWVkID0gMCxwcmV2ID0gbm93O3JldHVybiBub3cgKyAnLicgKyBlbmNvZGUoc2VlZCsrKTt9IC8vXG4vLyBNYXAgZWFjaCBjaGFyYWN0ZXIgdG8gaXRzIGluZGV4LlxuLy9cbmZvcig7aSA8IGxlbmd0aDtpKyspIG1hcFthbHBoYWJldFtpXV0gPSBpOyAvL1xuLy8gRXhwb3NlIHRoZSBgeWVhc3RgLCBgZW5jb2RlYCBhbmQgYGRlY29kZWAgZnVuY3Rpb25zLlxuLy9cbnllYXN0LmVuY29kZSA9IGVuY29kZTt5ZWFzdC5kZWNvZGUgPSBkZWNvZGU7bW9kdWxlLmV4cG9ydHMgPSB5ZWFzdDt9LHt9XSwzMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxyXG4gKi92YXIgdXJsPV9kZXJlcV8oJy4vdXJsJyk7dmFyIHBhcnNlcj1fZGVyZXFfKCdzb2NrZXQuaW8tcGFyc2VyJyk7dmFyIE1hbmFnZXI9X2RlcmVxXygnLi9tYW5hZ2VyJyk7dmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQnKTsgLyoqXHJcbiAqIE1vZHVsZSBleHBvcnRzLlxyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBsb29rdXA7IC8qKlxyXG4gKiBNYW5hZ2VycyBjYWNoZS5cclxuICovdmFyIGNhY2hlPWV4cG9ydHMubWFuYWdlcnMgPSB7fTsgLyoqXHJcbiAqIExvb2tzIHVwIGFuIGV4aXN0aW5nIGBNYW5hZ2VyYCBmb3IgbXVsdGlwbGV4aW5nLlxyXG4gKiBJZiB0aGUgdXNlciBzdW1tb25zOlxyXG4gKlxyXG4gKiAgIGBpbygnaHR0cDovL2xvY2FsaG9zdC9hJyk7YFxyXG4gKiAgIGBpbygnaHR0cDovL2xvY2FsaG9zdC9iJyk7YFxyXG4gKlxyXG4gKiBXZSByZXVzZSB0aGUgZXhpc3RpbmcgaW5zdGFuY2UgYmFzZWQgb24gc2FtZSBzY2hlbWUvcG9ydC9ob3N0LFxyXG4gKiBhbmQgd2UgaW5pdGlhbGl6ZSBzb2NrZXRzIGZvciBlYWNoIG5hbWVzcGFjZS5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gbG9va3VwKHVyaSxvcHRzKXtpZih0eXBlb2YgdXJpID09ICdvYmplY3QnKXtvcHRzID0gdXJpO3VyaSA9IHVuZGVmaW5lZDt9b3B0cyA9IG9wdHMgfHwge307dmFyIHBhcnNlZD11cmwodXJpKTt2YXIgc291cmNlPXBhcnNlZC5zb3VyY2U7dmFyIGlkPXBhcnNlZC5pZDt2YXIgcGF0aD1wYXJzZWQucGF0aDt2YXIgc2FtZU5hbWVzcGFjZT1jYWNoZVtpZF0gJiYgcGF0aCBpbiBjYWNoZVtpZF0ubnNwczt2YXIgbmV3Q29ubmVjdGlvbj1vcHRzLmZvcmNlTmV3IHx8IG9wdHNbJ2ZvcmNlIG5ldyBjb25uZWN0aW9uJ10gfHwgZmFsc2UgPT09IG9wdHMubXVsdGlwbGV4IHx8IHNhbWVOYW1lc3BhY2U7dmFyIGlvO2lmKG5ld0Nvbm5lY3Rpb24pe2RlYnVnKCdpZ25vcmluZyBzb2NrZXQgY2FjaGUgZm9yICVzJyxzb3VyY2UpO2lvID0gTWFuYWdlcihzb3VyY2Usb3B0cyk7fWVsc2Uge2lmKCFjYWNoZVtpZF0pe2RlYnVnKCduZXcgaW8gaW5zdGFuY2UgZm9yICVzJyxzb3VyY2UpO2NhY2hlW2lkXSA9IE1hbmFnZXIoc291cmNlLG9wdHMpO31pbyA9IGNhY2hlW2lkXTt9cmV0dXJuIGlvLnNvY2tldChwYXJzZWQucGF0aCk7fSAvKipcclxuICogUHJvdG9jb2wgdmVyc2lvbi5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZXhwb3J0cy5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDsgLyoqXHJcbiAqIGBjb25uZWN0YC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHVyaVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLmNvbm5lY3QgPSBsb29rdXA7IC8qKlxyXG4gKiBFeHBvc2UgY29uc3RydWN0b3JzIGZvciBzdGFuZGFsb25lIGJ1aWxkLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLk1hbmFnZXIgPSBfZGVyZXFfKCcuL21hbmFnZXInKTtleHBvcnRzLlNvY2tldCA9IF9kZXJlcV8oJy4vc29ja2V0Jyk7fSx7XCIuL21hbmFnZXJcIjozMixcIi4vc29ja2V0XCI6MzQsXCIuL3VybFwiOjM1LFwiZGVidWdcIjozOSxcInNvY2tldC5pby1wYXJzZXJcIjo0N31dLDMyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL3ZhciBlaW89X2RlcmVxXygnZW5naW5lLmlvLWNsaWVudCcpO3ZhciBTb2NrZXQ9X2RlcmVxXygnLi9zb2NrZXQnKTt2YXIgRW1pdHRlcj1fZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpO3ZhciBwYXJzZXI9X2RlcmVxXygnc29ja2V0LmlvLXBhcnNlcicpO3ZhciBvbj1fZGVyZXFfKCcuL29uJyk7dmFyIGJpbmQ9X2RlcmVxXygnY29tcG9uZW50LWJpbmQnKTt2YXIgZGVidWc9X2RlcmVxXygnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDptYW5hZ2VyJyk7dmFyIGluZGV4T2Y9X2RlcmVxXygnaW5kZXhvZicpO3ZhciBCYWNrb2ZmPV9kZXJlcV8oJ2JhY2tvMicpOyAvKipcclxuICogSUU2KyBoYXNPd25Qcm9wZXJ0eVxyXG4gKi92YXIgaGFzPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7IC8qKlxyXG4gKiBNb2R1bGUgZXhwb3J0c1xyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IE1hbmFnZXI7IC8qKlxyXG4gKiBgTWFuYWdlcmAgY29uc3RydWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbmdpbmUgaW5zdGFuY2Ugb3IgZW5naW5lIHVyaS9vcHRzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIE1hbmFnZXIodXJpLG9wdHMpe2lmKCEodGhpcyBpbnN0YW5jZW9mIE1hbmFnZXIpKXJldHVybiBuZXcgTWFuYWdlcih1cmksb3B0cyk7aWYodXJpICYmICdvYmplY3QnID09IHR5cGVvZiB1cmkpe29wdHMgPSB1cmk7dXJpID0gdW5kZWZpbmVkO31vcHRzID0gb3B0cyB8fCB7fTtvcHRzLnBhdGggPSBvcHRzLnBhdGggfHwgJy9zb2NrZXQuaW8nO3RoaXMubnNwcyA9IHt9O3RoaXMuc3VicyA9IFtdO3RoaXMub3B0cyA9IG9wdHM7dGhpcy5yZWNvbm5lY3Rpb24ob3B0cy5yZWNvbm5lY3Rpb24gIT09IGZhbHNlKTt0aGlzLnJlY29ubmVjdGlvbkF0dGVtcHRzKG9wdHMucmVjb25uZWN0aW9uQXR0ZW1wdHMgfHwgSW5maW5pdHkpO3RoaXMucmVjb25uZWN0aW9uRGVsYXkob3B0cy5yZWNvbm5lY3Rpb25EZWxheSB8fCAxMDAwKTt0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KG9wdHMucmVjb25uZWN0aW9uRGVsYXlNYXggfHwgNTAwMCk7dGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKG9wdHMucmFuZG9taXphdGlvbkZhY3RvciB8fCAwLjUpO3RoaXMuYmFja29mZiA9IG5ldyBCYWNrb2ZmKHttaW46dGhpcy5yZWNvbm5lY3Rpb25EZWxheSgpLG1heDp0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KCksaml0dGVyOnRoaXMucmFuZG9taXphdGlvbkZhY3RvcigpfSk7dGhpcy50aW1lb3V0KG51bGwgPT0gb3B0cy50aW1lb3V0PzIwMDAwOm9wdHMudGltZW91dCk7dGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7dGhpcy51cmkgPSB1cmk7dGhpcy5jb25uZWN0aW5nID0gW107dGhpcy5sYXN0UGluZyA9IG51bGw7dGhpcy5lbmNvZGluZyA9IGZhbHNlO3RoaXMucGFja2V0QnVmZmVyID0gW107dGhpcy5lbmNvZGVyID0gbmV3IHBhcnNlci5FbmNvZGVyKCk7dGhpcy5kZWNvZGVyID0gbmV3IHBhcnNlci5EZWNvZGVyKCk7dGhpcy5hdXRvQ29ubmVjdCA9IG9wdHMuYXV0b0Nvbm5lY3QgIT09IGZhbHNlO2lmKHRoaXMuYXV0b0Nvbm5lY3QpdGhpcy5vcGVuKCk7fSAvKipcclxuICogUHJvcGFnYXRlIGdpdmVuIGV2ZW50IHRvIHNvY2tldHMgYW5kIGVtaXQgb24gYHRoaXNgXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5lbWl0QWxsID0gZnVuY3Rpb24oKXt0aGlzLmVtaXQuYXBwbHkodGhpcyxhcmd1bWVudHMpO2Zvcih2YXIgbnNwIGluIHRoaXMubnNwcykge2lmKGhhcy5jYWxsKHRoaXMubnNwcyxuc3ApKXt0aGlzLm5zcHNbbnNwXS5lbWl0LmFwcGx5KHRoaXMubnNwc1tuc3BdLGFyZ3VtZW50cyk7fX19OyAvKipcclxuICogVXBkYXRlIGBzb2NrZXQuaWRgIG9mIGFsbCBzb2NrZXRzXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVTb2NrZXRJZHMgPSBmdW5jdGlvbigpe2Zvcih2YXIgbnNwIGluIHRoaXMubnNwcykge2lmKGhhcy5jYWxsKHRoaXMubnNwcyxuc3ApKXt0aGlzLm5zcHNbbnNwXS5pZCA9IHRoaXMuZW5naW5lLmlkO319fTsgLyoqXHJcbiAqIE1peCBpbiBgRW1pdHRlcmAuXHJcbiAqL0VtaXR0ZXIoTWFuYWdlci5wcm90b3R5cGUpOyAvKipcclxuICogU2V0cyB0aGUgYHJlY29ubmVjdGlvbmAgY29uZmlnLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRydWUvZmFsc2UgaWYgaXQgc2hvdWxkIGF1dG9tYXRpY2FsbHkgcmVjb25uZWN0XHJcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcclxuICogQGFwaSBwdWJsaWNcclxuICovTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uID0gZnVuY3Rpb24odil7aWYoIWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbjt0aGlzLl9yZWNvbm5lY3Rpb24gPSAhIXY7cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIFNldHMgdGhlIHJlY29ubmVjdGlvbiBhdHRlbXB0cyBjb25maWcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzIGJlZm9yZSBnaXZpbmcgdXBcclxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IGZ1bmN0aW9uKHYpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0czt0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IHY7cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIFNldHMgdGhlIGRlbGF5IGJldHdlZW4gcmVjb25uZWN0aW9ucy5cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5XHJcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcclxuICogQGFwaSBwdWJsaWNcclxuICovTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uRGVsYXkgPSBmdW5jdGlvbih2KXtpZighYXJndW1lbnRzLmxlbmd0aClyZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXk7dGhpcy5fcmVjb25uZWN0aW9uRGVsYXkgPSB2O3RoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWluKHYpO3JldHVybiB0aGlzO307TWFuYWdlci5wcm90b3R5cGUucmFuZG9taXphdGlvbkZhY3RvciA9IGZ1bmN0aW9uKHYpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO3RoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3IgPSB2O3RoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0Sml0dGVyKHYpO3JldHVybiB0aGlzO307IC8qKlxyXG4gKiBTZXRzIHRoZSBtYXhpbXVtIGRlbGF5IGJldHdlZW4gcmVjb25uZWN0aW9ucy5cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5XHJcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcclxuICogQGFwaSBwdWJsaWNcclxuICovTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uRGVsYXlNYXggPSBmdW5jdGlvbih2KXtpZighYXJndW1lbnRzLmxlbmd0aClyZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7dGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXggPSB2O3RoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWF4KHYpO3JldHVybiB0aGlzO307IC8qKlxyXG4gKiBTZXRzIHRoZSBjb25uZWN0aW9uIHRpbWVvdXQuIGBmYWxzZWAgdG8gZGlzYWJsZVxyXG4gKlxyXG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbih2KXtpZighYXJndW1lbnRzLmxlbmd0aClyZXR1cm4gdGhpcy5fdGltZW91dDt0aGlzLl90aW1lb3V0ID0gdjtyZXR1cm4gdGhpczt9OyAvKipcclxuICogU3RhcnRzIHRyeWluZyB0byByZWNvbm5lY3QgaWYgcmVjb25uZWN0aW9uIGlzIGVuYWJsZWQgYW5kIHdlIGhhdmUgbm90XHJcbiAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovTWFuYWdlci5wcm90b3R5cGUubWF5YmVSZWNvbm5lY3RPbk9wZW4gPSBmdW5jdGlvbigpeyAvLyBPbmx5IHRyeSB0byByZWNvbm5lY3QgaWYgaXQncyB0aGUgZmlyc3QgdGltZSB3ZSdyZSBjb25uZWN0aW5nXG5pZighdGhpcy5yZWNvbm5lY3RpbmcgJiYgdGhpcy5fcmVjb25uZWN0aW9uICYmIHRoaXMuYmFja29mZi5hdHRlbXB0cyA9PT0gMCl7IC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbnRoaXMucmVjb25uZWN0KCk7fX07IC8qKlxyXG4gKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydCBgc29ja2V0YC5cclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9uYWwsIGNhbGxiYWNrXHJcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGZcclxuICogQGFwaSBwdWJsaWNcclxuICovTWFuYWdlci5wcm90b3R5cGUub3BlbiA9IE1hbmFnZXIucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbihmbil7ZGVidWcoJ3JlYWR5U3RhdGUgJXMnLHRoaXMucmVhZHlTdGF0ZSk7aWYofnRoaXMucmVhZHlTdGF0ZS5pbmRleE9mKCdvcGVuJykpcmV0dXJuIHRoaXM7ZGVidWcoJ29wZW5pbmcgJXMnLHRoaXMudXJpKTt0aGlzLmVuZ2luZSA9IGVpbyh0aGlzLnVyaSx0aGlzLm9wdHMpO3ZhciBzb2NrZXQ9dGhpcy5lbmdpbmU7dmFyIHNlbGY9dGhpczt0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7dGhpcy5za2lwUmVjb25uZWN0ID0gZmFsc2U7IC8vIGVtaXQgYG9wZW5gXG52YXIgb3BlblN1Yj1vbihzb2NrZXQsJ29wZW4nLGZ1bmN0aW9uKCl7c2VsZi5vbm9wZW4oKTtmbiAmJiBmbigpO30pOyAvLyBlbWl0IGBjb25uZWN0X2Vycm9yYFxudmFyIGVycm9yU3ViPW9uKHNvY2tldCwnZXJyb3InLGZ1bmN0aW9uKGRhdGEpe2RlYnVnKCdjb25uZWN0X2Vycm9yJyk7c2VsZi5jbGVhbnVwKCk7c2VsZi5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7c2VsZi5lbWl0QWxsKCdjb25uZWN0X2Vycm9yJyxkYXRhKTtpZihmbil7dmFyIGVycj1uZXcgRXJyb3IoJ0Nvbm5lY3Rpb24gZXJyb3InKTtlcnIuZGF0YSA9IGRhdGE7Zm4oZXJyKTt9ZWxzZSB7IC8vIE9ubHkgZG8gdGhpcyBpZiB0aGVyZSBpcyBubyBmbiB0byBoYW5kbGUgdGhlIGVycm9yXG5zZWxmLm1heWJlUmVjb25uZWN0T25PcGVuKCk7fX0pOyAvLyBlbWl0IGBjb25uZWN0X3RpbWVvdXRgXG5pZihmYWxzZSAhPT0gdGhpcy5fdGltZW91dCl7dmFyIHRpbWVvdXQ9dGhpcy5fdGltZW91dDtkZWJ1ZygnY29ubmVjdCBhdHRlbXB0IHdpbGwgdGltZW91dCBhZnRlciAlZCcsdGltZW91dCk7IC8vIHNldCB0aW1lclxudmFyIHRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtkZWJ1ZygnY29ubmVjdCBhdHRlbXB0IHRpbWVkIG91dCBhZnRlciAlZCcsdGltZW91dCk7b3BlblN1Yi5kZXN0cm95KCk7c29ja2V0LmNsb3NlKCk7c29ja2V0LmVtaXQoJ2Vycm9yJywndGltZW91dCcpO3NlbGYuZW1pdEFsbCgnY29ubmVjdF90aW1lb3V0Jyx0aW1lb3V0KTt9LHRpbWVvdXQpO3RoaXMuc3Vicy5wdXNoKHtkZXN0cm95OmZ1bmN0aW9uIGRlc3Ryb3koKXtjbGVhclRpbWVvdXQodGltZXIpO319KTt9dGhpcy5zdWJzLnB1c2gob3BlblN1Yik7dGhpcy5zdWJzLnB1c2goZXJyb3JTdWIpO3JldHVybiB0aGlzO307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgb3Blbi5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLm9ub3BlbiA9IGZ1bmN0aW9uKCl7ZGVidWcoJ29wZW4nKTsgLy8gY2xlYXIgb2xkIHN1YnNcbnRoaXMuY2xlYW51cCgpOyAvLyBtYXJrIGFzIG9wZW5cbnRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJzt0aGlzLmVtaXQoJ29wZW4nKTsgLy8gYWRkIG5ldyBzdWJzXG52YXIgc29ja2V0PXRoaXMuZW5naW5lO3RoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwnZGF0YScsYmluZCh0aGlzLCdvbmRhdGEnKSkpO3RoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwncGluZycsYmluZCh0aGlzLCdvbnBpbmcnKSkpO3RoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwncG9uZycsYmluZCh0aGlzLCdvbnBvbmcnKSkpO3RoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwnZXJyb3InLGJpbmQodGhpcywnb25lcnJvcicpKSk7dGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCdjbG9zZScsYmluZCh0aGlzLCdvbmNsb3NlJykpKTt0aGlzLnN1YnMucHVzaChvbih0aGlzLmRlY29kZXIsJ2RlY29kZWQnLGJpbmQodGhpcywnb25kZWNvZGVkJykpKTt9OyAvKipcclxuICogQ2FsbGVkIHVwb24gYSBwaW5nLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovTWFuYWdlci5wcm90b3R5cGUub25waW5nID0gZnVuY3Rpb24oKXt0aGlzLmxhc3RQaW5nID0gbmV3IERhdGUoKTt0aGlzLmVtaXRBbGwoJ3BpbmcnKTt9OyAvKipcclxuICogQ2FsbGVkIHVwb24gYSBwYWNrZXQuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5vbnBvbmcgPSBmdW5jdGlvbigpe3RoaXMuZW1pdEFsbCgncG9uZycsbmV3IERhdGUoKSAtIHRoaXMubGFzdFBpbmcpO307IC8qKlxyXG4gKiBDYWxsZWQgd2l0aCBkYXRhLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovTWFuYWdlci5wcm90b3R5cGUub25kYXRhID0gZnVuY3Rpb24oZGF0YSl7dGhpcy5kZWNvZGVyLmFkZChkYXRhKTt9OyAvKipcclxuICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5vbmRlY29kZWQgPSBmdW5jdGlvbihwYWNrZXQpe3RoaXMuZW1pdCgncGFja2V0JyxwYWNrZXQpO307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBzb2NrZXQgZXJyb3IuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24oZXJyKXtkZWJ1ZygnZXJyb3InLGVycik7dGhpcy5lbWl0QWxsKCdlcnJvcicsZXJyKTt9OyAvKipcclxuICogQ3JlYXRlcyBhIG5ldyBzb2NrZXQgZm9yIHRoZSBnaXZlbiBgbnNwYC5cclxuICpcclxuICogQHJldHVybiB7U29ja2V0fVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5zb2NrZXQgPSBmdW5jdGlvbihuc3Ape3ZhciBzb2NrZXQ9dGhpcy5uc3BzW25zcF07aWYoIXNvY2tldCl7c29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLG5zcCk7dGhpcy5uc3BzW25zcF0gPSBzb2NrZXQ7dmFyIHNlbGY9dGhpcztzb2NrZXQub24oJ2Nvbm5lY3RpbmcnLG9uQ29ubmVjdGluZyk7c29ja2V0Lm9uKCdjb25uZWN0JyxmdW5jdGlvbigpe3NvY2tldC5pZCA9IHNlbGYuZW5naW5lLmlkO30pO2lmKHRoaXMuYXV0b0Nvbm5lY3QpeyAvLyBtYW51YWxseSBjYWxsIGhlcmUgc2luY2UgY29ubmVjdGluZyBldm5ldCBpcyBmaXJlZCBiZWZvcmUgbGlzdGVuaW5nXG5vbkNvbm5lY3RpbmcoKTt9fWZ1bmN0aW9uIG9uQ29ubmVjdGluZygpe2lmKCEgfmluZGV4T2Yoc2VsZi5jb25uZWN0aW5nLHNvY2tldCkpe3NlbGYuY29ubmVjdGluZy5wdXNoKHNvY2tldCk7fX1yZXR1cm4gc29ja2V0O307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBhIHNvY2tldCBjbG9zZS5cclxuICpcclxuICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oc29ja2V0KXt2YXIgaW5kZXg9aW5kZXhPZih0aGlzLmNvbm5lY3Rpbmcsc29ja2V0KTtpZih+aW5kZXgpdGhpcy5jb25uZWN0aW5nLnNwbGljZShpbmRleCwxKTtpZih0aGlzLmNvbm5lY3RpbmcubGVuZ3RoKXJldHVybjt0aGlzLmNsb3NlKCk7fTsgLyoqXHJcbiAqIFdyaXRlcyBhIHBhY2tldC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovTWFuYWdlci5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KXtkZWJ1Zygnd3JpdGluZyBwYWNrZXQgJWonLHBhY2tldCk7dmFyIHNlbGY9dGhpcztpZighc2VsZi5lbmNvZGluZyl7IC8vIGVuY29kZSwgdGhlbiB3cml0ZSB0byBlbmdpbmUgd2l0aCByZXN1bHRcbnNlbGYuZW5jb2RpbmcgPSB0cnVlO3RoaXMuZW5jb2Rlci5lbmNvZGUocGFja2V0LGZ1bmN0aW9uKGVuY29kZWRQYWNrZXRzKXtmb3IodmFyIGk9MDtpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoO2krKykge3NlbGYuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldLHBhY2tldC5vcHRpb25zKTt9c2VsZi5lbmNvZGluZyA9IGZhbHNlO3NlbGYucHJvY2Vzc1BhY2tldFF1ZXVlKCk7fSk7fWVsc2UgeyAvLyBhZGQgcGFja2V0IHRvIHRoZSBxdWV1ZVxuc2VsZi5wYWNrZXRCdWZmZXIucHVzaChwYWNrZXQpO319OyAvKipcclxuICogSWYgcGFja2V0IGJ1ZmZlciBpcyBub24tZW1wdHksIGJlZ2lucyBlbmNvZGluZyB0aGVcclxuICogbmV4dCBwYWNrZXQgaW4gbGluZS5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLnByb2Nlc3NQYWNrZXRRdWV1ZSA9IGZ1bmN0aW9uKCl7aWYodGhpcy5wYWNrZXRCdWZmZXIubGVuZ3RoID4gMCAmJiAhdGhpcy5lbmNvZGluZyl7dmFyIHBhY2s9dGhpcy5wYWNrZXRCdWZmZXIuc2hpZnQoKTt0aGlzLnBhY2tldChwYWNrKTt9fTsgLyoqXHJcbiAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovTWFuYWdlci5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uKCl7ZGVidWcoJ2NsZWFudXAnKTt2YXIgc3ViO3doaWxlKHN1YiA9IHRoaXMuc3Vicy5zaGlmdCgpKSBzdWIuZGVzdHJveSgpO3RoaXMucGFja2V0QnVmZmVyID0gW107dGhpcy5lbmNvZGluZyA9IGZhbHNlO3RoaXMubGFzdFBpbmcgPSBudWxsO3RoaXMuZGVjb2Rlci5kZXN0cm95KCk7fTsgLyoqXHJcbiAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLmNsb3NlID0gTWFuYWdlci5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCl7ZGVidWcoJ2Rpc2Nvbm5lY3QnKTt0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO3RoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7aWYoJ29wZW5pbmcnID09IHRoaXMucmVhZHlTdGF0ZSl7IC8vIGBvbmNsb3NlYCB3aWxsIG5vdCBmaXJlIGJlY2F1c2Vcbi8vIGFuIG9wZW4gZXZlbnQgbmV2ZXIgaGFwcGVuZWRcbnRoaXMuY2xlYW51cCgpO310aGlzLmJhY2tvZmYucmVzZXQoKTt0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztpZih0aGlzLmVuZ2luZSl0aGlzLmVuZ2luZS5jbG9zZSgpO307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgY2xvc2UuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5vbmNsb3NlID0gZnVuY3Rpb24ocmVhc29uKXtkZWJ1Zygnb25jbG9zZScpO3RoaXMuY2xlYW51cCgpO3RoaXMuYmFja29mZi5yZXNldCgpO3RoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO3RoaXMuZW1pdCgnY2xvc2UnLHJlYXNvbik7aWYodGhpcy5fcmVjb25uZWN0aW9uICYmICF0aGlzLnNraXBSZWNvbm5lY3Qpe3RoaXMucmVjb25uZWN0KCk7fX07IC8qKlxyXG4gKiBBdHRlbXB0IGEgcmVjb25uZWN0aW9uLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24oKXtpZih0aGlzLnJlY29ubmVjdGluZyB8fCB0aGlzLnNraXBSZWNvbm5lY3QpcmV0dXJuIHRoaXM7dmFyIHNlbGY9dGhpcztpZih0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPj0gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMpe2RlYnVnKCdyZWNvbm5lY3QgZmFpbGVkJyk7dGhpcy5iYWNrb2ZmLnJlc2V0KCk7dGhpcy5lbWl0QWxsKCdyZWNvbm5lY3RfZmFpbGVkJyk7dGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTt9ZWxzZSB7dmFyIGRlbGF5PXRoaXMuYmFja29mZi5kdXJhdGlvbigpO2RlYnVnKCd3aWxsIHdhaXQgJWRtcyBiZWZvcmUgcmVjb25uZWN0IGF0dGVtcHQnLGRlbGF5KTt0aGlzLnJlY29ubmVjdGluZyA9IHRydWU7dmFyIHRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZihzZWxmLnNraXBSZWNvbm5lY3QpcmV0dXJuO2RlYnVnKCdhdHRlbXB0aW5nIHJlY29ubmVjdCcpO3NlbGYuZW1pdEFsbCgncmVjb25uZWN0X2F0dGVtcHQnLHNlbGYuYmFja29mZi5hdHRlbXB0cyk7c2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RpbmcnLHNlbGYuYmFja29mZi5hdHRlbXB0cyk7IC8vIGNoZWNrIGFnYWluIGZvciB0aGUgY2FzZSBzb2NrZXQgY2xvc2VkIGluIGFib3ZlIGV2ZW50c1xuaWYoc2VsZi5za2lwUmVjb25uZWN0KXJldHVybjtzZWxmLm9wZW4oZnVuY3Rpb24oZXJyKXtpZihlcnIpe2RlYnVnKCdyZWNvbm5lY3QgYXR0ZW1wdCBlcnJvcicpO3NlbGYucmVjb25uZWN0aW5nID0gZmFsc2U7c2VsZi5yZWNvbm5lY3QoKTtzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdF9lcnJvcicsZXJyLmRhdGEpO31lbHNlIHtkZWJ1ZygncmVjb25uZWN0IHN1Y2Nlc3MnKTtzZWxmLm9ucmVjb25uZWN0KCk7fX0pO30sZGVsYXkpO3RoaXMuc3Vicy5wdXNoKHtkZXN0cm95OmZ1bmN0aW9uIGRlc3Ryb3koKXtjbGVhclRpbWVvdXQodGltZXIpO319KTt9fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVjb25uZWN0LlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovTWFuYWdlci5wcm90b3R5cGUub25yZWNvbm5lY3QgPSBmdW5jdGlvbigpe3ZhciBhdHRlbXB0PXRoaXMuYmFja29mZi5hdHRlbXB0czt0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO3RoaXMuYmFja29mZi5yZXNldCgpO3RoaXMudXBkYXRlU29ja2V0SWRzKCk7dGhpcy5lbWl0QWxsKCdyZWNvbm5lY3QnLGF0dGVtcHQpO307fSx7XCIuL29uXCI6MzMsXCIuL3NvY2tldFwiOjM0LFwiYmFja28yXCI6MzYsXCJjb21wb25lbnQtYmluZFwiOjM3LFwiY29tcG9uZW50LWVtaXR0ZXJcIjozOCxcImRlYnVnXCI6MzksXCJlbmdpbmUuaW8tY2xpZW50XCI6MSxcImluZGV4b2ZcIjo0MixcInNvY2tldC5pby1wYXJzZXJcIjo0N31dLDMzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIE1vZHVsZSBleHBvcnRzLlxyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IG9uOyAvKipcclxuICogSGVscGVyIGZvciBzdWJzY3JpcHRpb25zLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdHxFdmVudEVtaXR0ZXJ9IG9iaiB3aXRoIGBFbWl0dGVyYCBtaXhpbiBvciBgRXZlbnRFbWl0dGVyYFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBvbihvYmosZXYsZm4pe29iai5vbihldixmbik7cmV0dXJuIHtkZXN0cm95OmZ1bmN0aW9uIGRlc3Ryb3koKXtvYmoucmVtb3ZlTGlzdGVuZXIoZXYsZm4pO319O319LHt9XSwzNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxyXG4gKi92YXIgcGFyc2VyPV9kZXJlcV8oJ3NvY2tldC5pby1wYXJzZXInKTt2YXIgRW1pdHRlcj1fZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpO3ZhciB0b0FycmF5PV9kZXJlcV8oJ3RvLWFycmF5Jyk7dmFyIG9uPV9kZXJlcV8oJy4vb24nKTt2YXIgYmluZD1fZGVyZXFfKCdjb21wb25lbnQtYmluZCcpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50OnNvY2tldCcpO3ZhciBoYXNCaW49X2RlcmVxXygnaGFzLWJpbmFyeScpOyAvKipcclxuICogTW9kdWxlIGV4cG9ydHMuXHJcbiAqL21vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IFNvY2tldDsgLyoqXHJcbiAqIEludGVybmFsIGV2ZW50cyAoYmxhY2tsaXN0ZWQpLlxyXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL3ZhciBldmVudHM9e2Nvbm5lY3Q6MSxjb25uZWN0X2Vycm9yOjEsY29ubmVjdF90aW1lb3V0OjEsY29ubmVjdGluZzoxLGRpc2Nvbm5lY3Q6MSxlcnJvcjoxLHJlY29ubmVjdDoxLHJlY29ubmVjdF9hdHRlbXB0OjEscmVjb25uZWN0X2ZhaWxlZDoxLHJlY29ubmVjdF9lcnJvcjoxLHJlY29ubmVjdGluZzoxLHBpbmc6MSxwb25nOjF9OyAvKipcclxuICogU2hvcnRjdXQgdG8gYEVtaXR0ZXIjZW1pdGAuXHJcbiAqL3ZhciBlbWl0PUVtaXR0ZXIucHJvdG90eXBlLmVtaXQ7IC8qKlxyXG4gKiBgU29ja2V0YCBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gU29ja2V0KGlvLG5zcCl7dGhpcy5pbyA9IGlvO3RoaXMubnNwID0gbnNwO3RoaXMuanNvbiA9IHRoaXM7IC8vIGNvbXBhdFxudGhpcy5pZHMgPSAwO3RoaXMuYWNrcyA9IHt9O3RoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO3RoaXMuc2VuZEJ1ZmZlciA9IFtdO3RoaXMuY29ubmVjdGVkID0gZmFsc2U7dGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO2lmKHRoaXMuaW8uYXV0b0Nvbm5lY3QpdGhpcy5vcGVuKCk7fSAvKipcclxuICogTWl4IGluIGBFbWl0dGVyYC5cclxuICovRW1pdHRlcihTb2NrZXQucHJvdG90eXBlKTsgLyoqXHJcbiAqIFN1YnNjcmliZSB0byBvcGVuLCBjbG9zZSBhbmQgcGFja2V0IGV2ZW50c1xyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5zdWJFdmVudHMgPSBmdW5jdGlvbigpe2lmKHRoaXMuc3VicylyZXR1cm47dmFyIGlvPXRoaXMuaW87dGhpcy5zdWJzID0gW29uKGlvLCdvcGVuJyxiaW5kKHRoaXMsJ29ub3BlbicpKSxvbihpbywncGFja2V0JyxiaW5kKHRoaXMsJ29ucGFja2V0JykpLG9uKGlvLCdjbG9zZScsYmluZCh0aGlzLCdvbmNsb3NlJykpXTt9OyAvKipcclxuICogXCJPcGVuc1wiIHRoZSBzb2NrZXQuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub3BlbiA9IFNvY2tldC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uKCl7aWYodGhpcy5jb25uZWN0ZWQpcmV0dXJuIHRoaXM7dGhpcy5zdWJFdmVudHMoKTt0aGlzLmlvLm9wZW4oKTsgLy8gZW5zdXJlIG9wZW5cbmlmKCdvcGVuJyA9PSB0aGlzLmlvLnJlYWR5U3RhdGUpdGhpcy5vbm9wZW4oKTt0aGlzLmVtaXQoJ2Nvbm5lY3RpbmcnKTtyZXR1cm4gdGhpczt9OyAvKipcclxuICogU2VuZHMgYSBgbWVzc2FnZWAgZXZlbnQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9Tb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbigpe3ZhciBhcmdzPXRvQXJyYXkoYXJndW1lbnRzKTthcmdzLnVuc2hpZnQoJ21lc3NhZ2UnKTt0aGlzLmVtaXQuYXBwbHkodGhpcyxhcmdzKTtyZXR1cm4gdGhpczt9OyAvKipcclxuICogT3ZlcnJpZGUgYGVtaXRgLlxyXG4gKiBJZiB0aGUgZXZlbnQgaXMgaW4gYGV2ZW50c2AsIGl0J3MgZW1pdHRlZCBub3JtYWxseS5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcclxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1NvY2tldC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2KXtpZihldmVudHMuaGFzT3duUHJvcGVydHkoZXYpKXtlbWl0LmFwcGx5KHRoaXMsYXJndW1lbnRzKTtyZXR1cm4gdGhpczt9dmFyIGFyZ3M9dG9BcnJheShhcmd1bWVudHMpO3ZhciBwYXJzZXJUeXBlPXBhcnNlci5FVkVOVDsgLy8gZGVmYXVsdFxuaWYoaGFzQmluKGFyZ3MpKXtwYXJzZXJUeXBlID0gcGFyc2VyLkJJTkFSWV9FVkVOVDt9IC8vIGJpbmFyeVxudmFyIHBhY2tldD17dHlwZTpwYXJzZXJUeXBlLGRhdGE6YXJnc307cGFja2V0Lm9wdGlvbnMgPSB7fTtwYWNrZXQub3B0aW9ucy5jb21wcmVzcyA9ICF0aGlzLmZsYWdzIHx8IGZhbHNlICE9PSB0aGlzLmZsYWdzLmNvbXByZXNzOyAvLyBldmVudCBhY2sgY2FsbGJhY2tcbmlmKCdmdW5jdGlvbicgPT0gdHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSl7ZGVidWcoJ2VtaXR0aW5nIHBhY2tldCB3aXRoIGFjayBpZCAlZCcsdGhpcy5pZHMpO3RoaXMuYWNrc1t0aGlzLmlkc10gPSBhcmdzLnBvcCgpO3BhY2tldC5pZCA9IHRoaXMuaWRzKys7fWlmKHRoaXMuY29ubmVjdGVkKXt0aGlzLnBhY2tldChwYWNrZXQpO31lbHNlIHt0aGlzLnNlbmRCdWZmZXIucHVzaChwYWNrZXQpO31kZWxldGUgdGhpcy5mbGFncztyZXR1cm4gdGhpczt9OyAvKipcclxuICogU2VuZHMgYSBwYWNrZXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KXtwYWNrZXQubnNwID0gdGhpcy5uc3A7dGhpcy5pby5wYWNrZXQocGFja2V0KTt9OyAvKipcclxuICogQ2FsbGVkIHVwb24gZW5naW5lIGBvcGVuYC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25vcGVuID0gZnVuY3Rpb24oKXtkZWJ1ZygndHJhbnNwb3J0IGlzIG9wZW4gLSBjb25uZWN0aW5nJyk7IC8vIHdyaXRlIGNvbm5lY3QgcGFja2V0IGlmIG5lY2Vzc2FyeVxuaWYoJy8nICE9IHRoaXMubnNwKXt0aGlzLnBhY2tldCh7dHlwZTpwYXJzZXIuQ09OTkVDVH0pO319OyAvKipcclxuICogQ2FsbGVkIHVwb24gZW5naW5lIGBjbG9zZWAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWFzb25cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25jbG9zZSA9IGZ1bmN0aW9uKHJlYXNvbil7ZGVidWcoJ2Nsb3NlICglcyknLHJlYXNvbik7dGhpcy5jb25uZWN0ZWQgPSBmYWxzZTt0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7ZGVsZXRlIHRoaXMuaWQ7dGhpcy5lbWl0KCdkaXNjb25uZWN0JyxyZWFzb24pO307IC8qKlxyXG4gKiBDYWxsZWQgd2l0aCBzb2NrZXQgcGFja2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9ucGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KXtpZihwYWNrZXQubnNwICE9IHRoaXMubnNwKXJldHVybjtzd2l0Y2gocGFja2V0LnR5cGUpe2Nhc2UgcGFyc2VyLkNPTk5FQ1Q6dGhpcy5vbmNvbm5lY3QoKTticmVhaztjYXNlIHBhcnNlci5FVkVOVDp0aGlzLm9uZXZlbnQocGFja2V0KTticmVhaztjYXNlIHBhcnNlci5CSU5BUllfRVZFTlQ6dGhpcy5vbmV2ZW50KHBhY2tldCk7YnJlYWs7Y2FzZSBwYXJzZXIuQUNLOnRoaXMub25hY2socGFja2V0KTticmVhaztjYXNlIHBhcnNlci5CSU5BUllfQUNLOnRoaXMub25hY2socGFja2V0KTticmVhaztjYXNlIHBhcnNlci5ESVNDT05ORUNUOnRoaXMub25kaXNjb25uZWN0KCk7YnJlYWs7Y2FzZSBwYXJzZXIuRVJST1I6dGhpcy5lbWl0KCdlcnJvcicscGFja2V0LmRhdGEpO2JyZWFrO319OyAvKipcclxuICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgZXZlbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25ldmVudCA9IGZ1bmN0aW9uKHBhY2tldCl7dmFyIGFyZ3M9cGFja2V0LmRhdGEgfHwgW107ZGVidWcoJ2VtaXR0aW5nIGV2ZW50ICVqJyxhcmdzKTtpZihudWxsICE9IHBhY2tldC5pZCl7ZGVidWcoJ2F0dGFjaGluZyBhY2sgY2FsbGJhY2sgdG8gZXZlbnQnKTthcmdzLnB1c2godGhpcy5hY2socGFja2V0LmlkKSk7fWlmKHRoaXMuY29ubmVjdGVkKXtlbWl0LmFwcGx5KHRoaXMsYXJncyk7fWVsc2Uge3RoaXMucmVjZWl2ZUJ1ZmZlci5wdXNoKGFyZ3MpO319OyAvKipcclxuICogUHJvZHVjZXMgYW4gYWNrIGNhbGxiYWNrIHRvIGVtaXQgd2l0aCBhbiBldmVudC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUuYWNrID0gZnVuY3Rpb24oaWQpe3ZhciBzZWxmPXRoaXM7dmFyIHNlbnQ9ZmFsc2U7cmV0dXJuIGZ1bmN0aW9uKCl7IC8vIHByZXZlbnQgZG91YmxlIGNhbGxiYWNrc1xuaWYoc2VudClyZXR1cm47c2VudCA9IHRydWU7dmFyIGFyZ3M9dG9BcnJheShhcmd1bWVudHMpO2RlYnVnKCdzZW5kaW5nIGFjayAlaicsYXJncyk7dmFyIHR5cGU9aGFzQmluKGFyZ3MpP3BhcnNlci5CSU5BUllfQUNLOnBhcnNlci5BQ0s7c2VsZi5wYWNrZXQoe3R5cGU6dHlwZSxpZDppZCxkYXRhOmFyZ3N9KTt9O307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBhY2tub3dsZWdlbWVudC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5vbmFjayA9IGZ1bmN0aW9uKHBhY2tldCl7dmFyIGFjaz10aGlzLmFja3NbcGFja2V0LmlkXTtpZignZnVuY3Rpb24nID09IHR5cGVvZiBhY2spe2RlYnVnKCdjYWxsaW5nIGFjayAlcyB3aXRoICVqJyxwYWNrZXQuaWQscGFja2V0LmRhdGEpO2Fjay5hcHBseSh0aGlzLHBhY2tldC5kYXRhKTtkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07fWVsc2Uge2RlYnVnKCdiYWQgYWNrICVzJyxwYWNrZXQuaWQpO319OyAvKipcclxuICogQ2FsbGVkIHVwb24gc2VydmVyIGNvbm5lY3QuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uY29ubmVjdCA9IGZ1bmN0aW9uKCl7dGhpcy5jb25uZWN0ZWQgPSB0cnVlO3RoaXMuZGlzY29ubmVjdGVkID0gZmFsc2U7dGhpcy5lbWl0KCdjb25uZWN0Jyk7dGhpcy5lbWl0QnVmZmVyZWQoKTt9OyAvKipcclxuICogRW1pdCBidWZmZXJlZCBldmVudHMgKHJlY2VpdmVkIGFuZCBlbWl0dGVkKS5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUuZW1pdEJ1ZmZlcmVkID0gZnVuY3Rpb24oKXt2YXIgaTtmb3IoaSA9IDA7aSA8IHRoaXMucmVjZWl2ZUJ1ZmZlci5sZW5ndGg7aSsrKSB7ZW1pdC5hcHBseSh0aGlzLHRoaXMucmVjZWl2ZUJ1ZmZlcltpXSk7fXRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO2ZvcihpID0gMDtpIDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aDtpKyspIHt0aGlzLnBhY2tldCh0aGlzLnNlbmRCdWZmZXJbaV0pO310aGlzLnNlbmRCdWZmZXIgPSBbXTt9OyAvKipcclxuICogQ2FsbGVkIHVwb24gc2VydmVyIGRpc2Nvbm5lY3QuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCl7ZGVidWcoJ3NlcnZlciBkaXNjb25uZWN0ICglcyknLHRoaXMubnNwKTt0aGlzLmRlc3Ryb3koKTt0aGlzLm9uY2xvc2UoJ2lvIHNlcnZlciBkaXNjb25uZWN0Jyk7fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIGZvcmNlZCBjbGllbnQvc2VydmVyIHNpZGUgZGlzY29ubmVjdGlvbnMsXHJcbiAqIHRoaXMgbWV0aG9kIGVuc3VyZXMgdGhlIG1hbmFnZXIgc3RvcHMgdHJhY2tpbmcgdXMgYW5kXHJcbiAqIHRoYXQgcmVjb25uZWN0aW9ucyBkb24ndCBnZXQgdHJpZ2dlcmVkIGZvciB0aGlzLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGUuXHJcbiAqL1NvY2tldC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCl7aWYodGhpcy5zdWJzKXsgLy8gY2xlYW4gc3Vic2NyaXB0aW9ucyB0byBhdm9pZCByZWNvbm5lY3Rpb25zXG5mb3IodmFyIGk9MDtpIDwgdGhpcy5zdWJzLmxlbmd0aDtpKyspIHt0aGlzLnN1YnNbaV0uZGVzdHJveSgpO310aGlzLnN1YnMgPSBudWxsO310aGlzLmlvLmRlc3Ryb3kodGhpcyk7fTsgLyoqXHJcbiAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgbWFudWFsbHkuXHJcbiAqXHJcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9Tb2NrZXQucHJvdG90eXBlLmNsb3NlID0gU29ja2V0LnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24oKXtpZih0aGlzLmNvbm5lY3RlZCl7ZGVidWcoJ3BlcmZvcm1pbmcgZGlzY29ubmVjdCAoJXMpJyx0aGlzLm5zcCk7dGhpcy5wYWNrZXQoe3R5cGU6cGFyc2VyLkRJU0NPTk5FQ1R9KTt9IC8vIHJlbW92ZSBzb2NrZXQgZnJvbSBwb29sXG50aGlzLmRlc3Ryb3koKTtpZih0aGlzLmNvbm5lY3RlZCl7IC8vIGZpcmUgZXZlbnRzXG50aGlzLm9uY2xvc2UoJ2lvIGNsaWVudCBkaXNjb25uZWN0Jyk7fXJldHVybiB0aGlzO307IC8qKlxyXG4gKiBTZXRzIHRoZSBjb21wcmVzcyBmbGFnLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlmIGB0cnVlYCwgY29tcHJlc3NlcyB0aGUgc2VuZGluZyBkYXRhXHJcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9Tb2NrZXQucHJvdG90eXBlLmNvbXByZXNzID0gZnVuY3Rpb24oY29tcHJlc3Mpe3RoaXMuZmxhZ3MgPSB0aGlzLmZsYWdzIHx8IHt9O3RoaXMuZmxhZ3MuY29tcHJlc3MgPSBjb21wcmVzcztyZXR1cm4gdGhpczt9O30se1wiLi9vblwiOjMzLFwiY29tcG9uZW50LWJpbmRcIjozNyxcImNvbXBvbmVudC1lbWl0dGVyXCI6MzgsXCJkZWJ1Z1wiOjM5LFwiaGFzLWJpbmFyeVwiOjQxLFwic29ja2V0LmlvLXBhcnNlclwiOjQ3LFwidG8tYXJyYXlcIjo1MX1dLDM1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL3ZhciBwYXJzZXVyaT1fZGVyZXFfKCdwYXJzZXVyaScpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50OnVybCcpOyAvKipcclxuICogTW9kdWxlIGV4cG9ydHMuXHJcbiAqL21vZHVsZS5leHBvcnRzID0gdXJsOyAvKipcclxuICogVVJMIHBhcnNlci5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxyXG4gKiBAcGFyYW0ge09iamVjdH0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cclxuICogICAgICAgICAgICAgICAgIERlZmF1bHRzIHRvIHdpbmRvdy5sb2NhdGlvbi5cclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gdXJsKHVyaSxsb2Mpe3ZhciBvYmo9dXJpOyAvLyBkZWZhdWx0IHRvIHdpbmRvdy5sb2NhdGlvblxudmFyIGxvYz1sb2MgfHwgZ2xvYmFsLmxvY2F0aW9uO2lmKG51bGwgPT0gdXJpKXVyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyBsb2MuaG9zdDsgLy8gcmVsYXRpdmUgcGF0aCBzdXBwb3J0XG5pZignc3RyaW5nJyA9PSB0eXBlb2YgdXJpKXtpZignLycgPT0gdXJpLmNoYXJBdCgwKSl7aWYoJy8nID09IHVyaS5jaGFyQXQoMSkpe3VyaSA9IGxvYy5wcm90b2NvbCArIHVyaTt9ZWxzZSB7dXJpID0gbG9jLmhvc3QgKyB1cmk7fX1pZighL14oaHR0cHM/fHdzcz8pOlxcL1xcLy8udGVzdCh1cmkpKXtkZWJ1ZygncHJvdG9jb2wtbGVzcyB1cmwgJXMnLHVyaSk7aWYoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGxvYyl7dXJpID0gbG9jLnByb3RvY29sICsgJy8vJyArIHVyaTt9ZWxzZSB7dXJpID0gJ2h0dHBzOi8vJyArIHVyaTt9fSAvLyBwYXJzZVxuZGVidWcoJ3BhcnNlICVzJyx1cmkpO29iaiA9IHBhcnNldXJpKHVyaSk7fSAvLyBtYWtlIHN1cmUgd2UgdHJlYXQgYGxvY2FsaG9zdDo4MGAgYW5kIGBsb2NhbGhvc3RgIGVxdWFsbHlcbmlmKCFvYmoucG9ydCl7aWYoL14oaHR0cHx3cykkLy50ZXN0KG9iai5wcm90b2NvbCkpe29iai5wb3J0ID0gJzgwJzt9ZWxzZSBpZigvXihodHRwfHdzKXMkLy50ZXN0KG9iai5wcm90b2NvbCkpe29iai5wb3J0ID0gJzQ0Myc7fX1vYmoucGF0aCA9IG9iai5wYXRoIHx8ICcvJzt2YXIgaXB2Nj1vYmouaG9zdC5pbmRleE9mKCc6JykgIT09IC0xO3ZhciBob3N0PWlwdjY/J1snICsgb2JqLmhvc3QgKyAnXSc6b2JqLmhvc3Q7IC8vIGRlZmluZSB1bmlxdWUgaWRcbm9iai5pZCA9IG9iai5wcm90b2NvbCArICc6Ly8nICsgaG9zdCArICc6JyArIG9iai5wb3J0OyAvLyBkZWZpbmUgaHJlZlxub2JqLmhyZWYgPSBvYmoucHJvdG9jb2wgKyAnOi8vJyArIGhvc3QgKyAobG9jICYmIGxvYy5wb3J0ID09IG9iai5wb3J0PycnOic6JyArIG9iai5wb3J0KTtyZXR1cm4gb2JqO319KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7XCJkZWJ1Z1wiOjM5LFwicGFyc2V1cmlcIjo0NX1dLDM2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIEV4cG9zZSBgQmFja29mZmAuXHJcbiAqL21vZHVsZS5leHBvcnRzID0gQmFja29mZjsgLyoqXHJcbiAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cclxuICpcclxuICogLSBgbWluYCBpbml0aWFsIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIFsxMDBdXHJcbiAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxyXG4gKiAtIGBqaXR0ZXJgIFswXVxyXG4gKiAtIGBmYWN0b3JgIFsyXVxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBCYWNrb2ZmKG9wdHMpe29wdHMgPSBvcHRzIHx8IHt9O3RoaXMubXMgPSBvcHRzLm1pbiB8fCAxMDA7dGhpcy5tYXggPSBvcHRzLm1heCB8fCAxMDAwMDt0aGlzLmZhY3RvciA9IG9wdHMuZmFjdG9yIHx8IDI7dGhpcy5qaXR0ZXIgPSBvcHRzLmppdHRlciA+IDAgJiYgb3B0cy5qaXR0ZXIgPD0gMT9vcHRzLmppdHRlcjowO3RoaXMuYXR0ZW1wdHMgPSAwO30gLyoqXHJcbiAqIFJldHVybiB0aGUgYmFja29mZiBkdXJhdGlvbi5cclxuICpcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9CYWNrb2ZmLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uKCl7dmFyIG1zPXRoaXMubXMgKiBNYXRoLnBvdyh0aGlzLmZhY3Rvcix0aGlzLmF0dGVtcHRzKyspO2lmKHRoaXMuaml0dGVyKXt2YXIgcmFuZD1NYXRoLnJhbmRvbSgpO3ZhciBkZXZpYXRpb249TWF0aC5mbG9vcihyYW5kICogdGhpcy5qaXR0ZXIgKiBtcyk7bXMgPSAoTWF0aC5mbG9vcihyYW5kICogMTApICYgMSkgPT0gMD9tcyAtIGRldmlhdGlvbjptcyArIGRldmlhdGlvbjt9cmV0dXJuIE1hdGgubWluKG1zLHRoaXMubWF4KSB8IDA7fTsgLyoqXHJcbiAqIFJlc2V0IHRoZSBudW1iZXIgb2YgYXR0ZW1wdHMuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0JhY2tvZmYucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXt0aGlzLmF0dGVtcHRzID0gMDt9OyAvKipcclxuICogU2V0IHRoZSBtaW5pbXVtIGR1cmF0aW9uXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0JhY2tvZmYucHJvdG90eXBlLnNldE1pbiA9IGZ1bmN0aW9uKG1pbil7dGhpcy5tcyA9IG1pbjt9OyAvKipcclxuICogU2V0IHRoZSBtYXhpbXVtIGR1cmF0aW9uXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0JhY2tvZmYucHJvdG90eXBlLnNldE1heCA9IGZ1bmN0aW9uKG1heCl7dGhpcy5tYXggPSBtYXg7fTsgLyoqXHJcbiAqIFNldCB0aGUgaml0dGVyXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0JhY2tvZmYucHJvdG90eXBlLnNldEppdHRlciA9IGZ1bmN0aW9uKGppdHRlcil7dGhpcy5qaXR0ZXIgPSBqaXR0ZXI7fTt9LHt9XSwzNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBTbGljZSByZWZlcmVuY2UuXHJcbiAqL3ZhciBzbGljZT1bXS5zbGljZTsgLyoqXHJcbiAqIEJpbmQgYG9iamAgdG8gYGZuYC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gZm4gb3Igc3RyaW5nXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaixmbil7aWYoJ3N0cmluZycgPT0gdHlwZW9mIGZuKWZuID0gb2JqW2ZuXTtpZignZnVuY3Rpb24nICE9IHR5cGVvZiBmbil0aHJvdyBuZXcgRXJyb3IoJ2JpbmQoKSByZXF1aXJlcyBhIGZ1bmN0aW9uJyk7dmFyIGFyZ3M9c2xpY2UuY2FsbChhcmd1bWVudHMsMik7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGZuLmFwcGx5KG9iaixhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTt9O307fSx7fV0sMzg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogRXhwb3NlIGBFbWl0dGVyYC5cclxuICovbW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyOyAvKipcclxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIEVtaXR0ZXIob2JqKXtpZihvYmopcmV0dXJuIG1peGluKG9iaik7fTsgLyoqXHJcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZnVuY3Rpb24gbWl4aW4ob2JqKXtmb3IodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge29ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTt9cmV0dXJuIG9iajt9IC8qKlxyXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovRW1pdHRlci5wcm90b3R5cGUub24gPSBFbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsZm4pe3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTsodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pLnB1c2goZm4pO3JldHVybiB0aGlzO307IC8qKlxyXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0VtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCxmbil7ZnVuY3Rpb24gb24oKXt0aGlzLm9mZihldmVudCxvbik7Zm4uYXBwbHkodGhpcyxhcmd1bWVudHMpO31vbi5mbiA9IGZuO3RoaXMub24oZXZlbnQsb24pO3JldHVybiB0aGlzO307IC8qKlxyXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxyXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0VtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LGZuKXt0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307IC8vIGFsbFxuaWYoMCA9PSBhcmd1bWVudHMubGVuZ3RoKXt0aGlzLl9jYWxsYmFja3MgPSB7fTtyZXR1cm4gdGhpczt9IC8vIHNwZWNpZmljIGV2ZW50XG52YXIgY2FsbGJhY2tzPXRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07aWYoIWNhbGxiYWNrcylyZXR1cm4gdGhpczsgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuaWYoMSA9PSBhcmd1bWVudHMubGVuZ3RoKXtkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtyZXR1cm4gdGhpczt9IC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG52YXIgY2I7Zm9yKHZhciBpPTA7aSA8IGNhbGxiYWNrcy5sZW5ndGg7aSsrKSB7Y2IgPSBjYWxsYmFja3NbaV07aWYoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbil7Y2FsbGJhY2tzLnNwbGljZShpLDEpO2JyZWFrO319cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtNaXhlZH0gLi4uXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqL0VtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7dGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O3ZhciBhcmdzPVtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpLGNhbGxiYWNrcz10aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO2lmKGNhbGxiYWNrcyl7Y2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO2Zvcih2YXIgaT0wLGxlbj1jYWxsYmFja3MubGVuZ3RoO2kgPCBsZW47KytpKSB7Y2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsYXJncyk7fX1yZXR1cm4gdGhpczt9OyAvKipcclxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7dGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O3JldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO307IC8qKlxyXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7cmV0dXJuICEhdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDt9O30se31dLDM5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXthcmd1bWVudHNbNF1bMTddWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKTt9LHtcIi4vZGVidWdcIjo0MCxcImR1cFwiOjE3fV0sNDA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe2FyZ3VtZW50c1s0XVsxOF1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpO30se1wiZHVwXCI6MTgsXCJtc1wiOjQ0fV0sNDE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKlxyXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxyXG4gKi92YXIgaXNBcnJheT1fZGVyZXFfKCdpc2FycmF5Jyk7IC8qKlxyXG4gKiBNb2R1bGUgZXhwb3J0cy5cclxuICovbW9kdWxlLmV4cG9ydHMgPSBoYXNCaW5hcnk7IC8qKlxyXG4gKiBDaGVja3MgZm9yIGJpbmFyeSBkYXRhLlxyXG4gKlxyXG4gKiBSaWdodCBub3cgb25seSBCdWZmZXIgYW5kIEFycmF5QnVmZmVyIGFyZSBzdXBwb3J0ZWQuLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gYW55dGhpbmdcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gaGFzQmluYXJ5KGRhdGEpe2Z1bmN0aW9uIF9oYXNCaW5hcnkob2JqKXtpZighb2JqKXJldHVybiBmYWxzZTtpZihnbG9iYWwuQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihvYmopIHx8IGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBnbG9iYWwuQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iIHx8IGdsb2JhbC5GaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpe3JldHVybiB0cnVlO31pZihpc0FycmF5KG9iaikpe2Zvcih2YXIgaT0wO2kgPCBvYmoubGVuZ3RoO2krKykge2lmKF9oYXNCaW5hcnkob2JqW2ldKSl7cmV0dXJuIHRydWU7fX19ZWxzZSBpZihvYmogJiYgJ29iamVjdCcgPT0gdHlwZW9mIG9iail7IC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvaGFzLWJpbmFyeS9wdWxsLzRcbmlmKG9iai50b0pTT04gJiYgJ2Z1bmN0aW9uJyA9PSB0eXBlb2Ygb2JqLnRvSlNPTil7b2JqID0gb2JqLnRvSlNPTigpO31mb3IodmFyIGtleSBpbiBvYmopIHtpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLGtleSkgJiYgX2hhc0JpbmFyeShvYmpba2V5XSkpe3JldHVybiB0cnVlO319fXJldHVybiBmYWxzZTt9cmV0dXJuIF9oYXNCaW5hcnkoZGF0YSk7fX0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHtcImlzYXJyYXlcIjo0M31dLDQyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXthcmd1bWVudHNbNF1bMjNdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKTt9LHtcImR1cFwiOjIzfV0sNDM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe2FyZ3VtZW50c1s0XVsyNF1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpO30se1wiZHVwXCI6MjR9XSw0NDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7YXJndW1lbnRzWzRdWzI1XVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cyk7fSx7XCJkdXBcIjoyNX1dLDQ1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXthcmd1bWVudHNbNF1bMjhdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKTt9LHtcImR1cFwiOjI4fV0sNDY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKmdsb2JhbCBCbG9iLEZpbGUqLyAvKipcclxuICogTW9kdWxlIHJlcXVpcmVtZW50c1xyXG4gKi92YXIgaXNBcnJheT1fZGVyZXFfKCdpc2FycmF5Jyk7dmFyIGlzQnVmPV9kZXJlcV8oJy4vaXMtYnVmZmVyJyk7IC8qKlxyXG4gKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciBpbiBwYWNrZXQgd2l0aCBhIG51bWJlcmVkIHBsYWNlaG9sZGVyLlxyXG4gKiBBbnl0aGluZyB3aXRoIGJsb2JzIG9yIGZpbGVzIHNob3VsZCBiZSBmZWQgdGhyb3VnaCByZW1vdmVCbG9icyBiZWZvcmUgY29taW5nXHJcbiAqIGhlcmUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBzb2NrZXQuaW8gZXZlbnQgcGFja2V0XHJcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMuZGVjb25zdHJ1Y3RQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQpe3ZhciBidWZmZXJzPVtdO3ZhciBwYWNrZXREYXRhPXBhY2tldC5kYXRhO2Z1bmN0aW9uIF9kZWNvbnN0cnVjdFBhY2tldChkYXRhKXtpZighZGF0YSlyZXR1cm4gZGF0YTtpZihpc0J1ZihkYXRhKSl7dmFyIHBsYWNlaG9sZGVyPXtfcGxhY2Vob2xkZXI6dHJ1ZSxudW06YnVmZmVycy5sZW5ndGh9O2J1ZmZlcnMucHVzaChkYXRhKTtyZXR1cm4gcGxhY2Vob2xkZXI7fWVsc2UgaWYoaXNBcnJheShkYXRhKSl7dmFyIG5ld0RhdGE9bmV3IEFycmF5KGRhdGEubGVuZ3RoKTtmb3IodmFyIGk9MDtpIDwgZGF0YS5sZW5ndGg7aSsrKSB7bmV3RGF0YVtpXSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldKTt9cmV0dXJuIG5ld0RhdGE7fWVsc2UgaWYoJ29iamVjdCcgPT0gdHlwZW9mIGRhdGEgJiYgIShkYXRhIGluc3RhbmNlb2YgRGF0ZSkpe3ZhciBuZXdEYXRhPXt9O2Zvcih2YXIga2V5IGluIGRhdGEpIHtuZXdEYXRhW2tleV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldKTt9cmV0dXJuIG5ld0RhdGE7fXJldHVybiBkYXRhO312YXIgcGFjaz1wYWNrZXQ7cGFjay5kYXRhID0gX2RlY29uc3RydWN0UGFja2V0KHBhY2tldERhdGEpO3BhY2suYXR0YWNobWVudHMgPSBidWZmZXJzLmxlbmd0aDsgLy8gbnVtYmVyIG9mIGJpbmFyeSAnYXR0YWNobWVudHMnXG5yZXR1cm4ge3BhY2tldDpwYWNrLGJ1ZmZlcnM6YnVmZmVyc307fTsgLyoqXHJcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBldmVudCBwYWNrZXQgd2l0aCBwbGFjZWhvbGRlcnNcclxuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcclxuICogQHJldHVybiB7T2JqZWN0fSByZWNvbnN0cnVjdGVkIHBhY2tldFxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLnJlY29uc3RydWN0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0LGJ1ZmZlcnMpe3ZhciBjdXJQbGFjZUhvbGRlcj0wO2Z1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhKXtpZihkYXRhICYmIGRhdGEuX3BsYWNlaG9sZGVyKXt2YXIgYnVmPWJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbnJldHVybiBidWY7fWVsc2UgaWYoaXNBcnJheShkYXRhKSl7Zm9yKHZhciBpPTA7aSA8IGRhdGEubGVuZ3RoO2krKykge2RhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSk7fXJldHVybiBkYXRhO31lbHNlIGlmKGRhdGEgJiYgJ29iamVjdCcgPT0gdHlwZW9mIGRhdGEpe2Zvcih2YXIga2V5IGluIGRhdGEpIHtkYXRhW2tleV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldKTt9cmV0dXJuIGRhdGE7fXJldHVybiBkYXRhO31wYWNrZXQuZGF0YSA9IF9yZWNvbnN0cnVjdFBhY2tldChwYWNrZXQuZGF0YSk7cGFja2V0LmF0dGFjaG1lbnRzID0gdW5kZWZpbmVkOyAvLyBubyBsb25nZXIgdXNlZnVsXG5yZXR1cm4gcGFja2V0O307IC8qKlxyXG4gKiBBc3luY2hyb25vdXNseSByZW1vdmVzIEJsb2JzIG9yIEZpbGVzIGZyb20gZGF0YSB2aWFcclxuICogRmlsZVJlYWRlcidzIHJlYWRBc0FycmF5QnVmZmVyIG1ldGhvZC4gVXNlZCBiZWZvcmUgZW5jb2RpbmdcclxuICogZGF0YSBhcyBtc2dwYWNrLiBDYWxscyBjYWxsYmFjayB3aXRoIHRoZSBibG9ibGVzcyBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZXhwb3J0cy5yZW1vdmVCbG9icyA9IGZ1bmN0aW9uKGRhdGEsY2FsbGJhY2spe2Z1bmN0aW9uIF9yZW1vdmVCbG9icyhvYmosY3VyS2V5LGNvbnRhaW5pbmdPYmplY3Qpe2lmKCFvYmopcmV0dXJuIG9iajsgLy8gY29udmVydCBhbnkgYmxvYlxuaWYoZ2xvYmFsLkJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYiB8fCBnbG9iYWwuRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKXtwZW5kaW5nQmxvYnMrKzsgLy8gYXN5bmMgZmlsZXJlYWRlclxudmFyIGZpbGVSZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCl7IC8vIHRoaXMucmVzdWx0ID09IGFycmF5YnVmZmVyXG5pZihjb250YWluaW5nT2JqZWN0KXtjb250YWluaW5nT2JqZWN0W2N1cktleV0gPSB0aGlzLnJlc3VsdDt9ZWxzZSB7YmxvYmxlc3NEYXRhID0gdGhpcy5yZXN1bHQ7fSAvLyBpZiBub3RoaW5nIHBlbmRpbmcgaXRzIGNhbGxiYWNrIHRpbWVcbmlmKCEgLS1wZW5kaW5nQmxvYnMpe2NhbGxiYWNrKGJsb2JsZXNzRGF0YSk7fX07ZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihvYmopOyAvLyBibG9iIC0+IGFycmF5YnVmZmVyXG59ZWxzZSBpZihpc0FycmF5KG9iaikpeyAvLyBoYW5kbGUgYXJyYXlcbmZvcih2YXIgaT0wO2kgPCBvYmoubGVuZ3RoO2krKykge19yZW1vdmVCbG9icyhvYmpbaV0saSxvYmopO319ZWxzZSBpZihvYmogJiYgJ29iamVjdCcgPT0gdHlwZW9mIG9iaiAmJiAhaXNCdWYob2JqKSl7IC8vIGFuZCBvYmplY3RcbmZvcih2YXIga2V5IGluIG9iaikge19yZW1vdmVCbG9icyhvYmpba2V5XSxrZXksb2JqKTt9fX12YXIgcGVuZGluZ0Jsb2JzPTA7dmFyIGJsb2JsZXNzRGF0YT1kYXRhO19yZW1vdmVCbG9icyhibG9ibGVzc0RhdGEpO2lmKCFwZW5kaW5nQmxvYnMpe2NhbGxiYWNrKGJsb2JsZXNzRGF0YSk7fX07fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se1wiLi9pcy1idWZmZXJcIjo0OCxcImlzYXJyYXlcIjo0M31dLDQ3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdzb2NrZXQuaW8tcGFyc2VyJyk7dmFyIGpzb249X2RlcmVxXygnanNvbjMnKTt2YXIgaXNBcnJheT1fZGVyZXFfKCdpc2FycmF5Jyk7dmFyIEVtaXR0ZXI9X2RlcmVxXygnY29tcG9uZW50LWVtaXR0ZXInKTt2YXIgYmluYXJ5PV9kZXJlcV8oJy4vYmluYXJ5Jyk7dmFyIGlzQnVmPV9kZXJlcV8oJy4vaXMtYnVmZmVyJyk7IC8qKlxyXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLnByb3RvY29sID0gNDsgLyoqXHJcbiAqIFBhY2tldCB0eXBlcy5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZXhwb3J0cy50eXBlcyA9IFsnQ09OTkVDVCcsJ0RJU0NPTk5FQ1QnLCdFVkVOVCcsJ0JJTkFSWV9FVkVOVCcsJ0FDSycsJ0JJTkFSWV9BQ0snLCdFUlJPUiddOyAvKipcclxuICogUGFja2V0IHR5cGUgYGNvbm5lY3RgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLkNPTk5FQ1QgPSAwOyAvKipcclxuICogUGFja2V0IHR5cGUgYGRpc2Nvbm5lY3RgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLkRJU0NPTk5FQ1QgPSAxOyAvKipcclxuICogUGFja2V0IHR5cGUgYGV2ZW50YC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZXhwb3J0cy5FVkVOVCA9IDI7IC8qKlxyXG4gKiBQYWNrZXQgdHlwZSBgYWNrYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZXhwb3J0cy5BQ0sgPSAzOyAvKipcclxuICogUGFja2V0IHR5cGUgYGVycm9yYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZXhwb3J0cy5FUlJPUiA9IDQ7IC8qKlxyXG4gKiBQYWNrZXQgdHlwZSAnYmluYXJ5IGV2ZW50J1xyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLkJJTkFSWV9FVkVOVCA9IDU7IC8qKlxyXG4gKiBQYWNrZXQgdHlwZSBgYmluYXJ5IGFja2AuIEZvciBhY2tzIHdpdGggYmluYXJ5IGFyZ3VtZW50cy5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZXhwb3J0cy5CSU5BUllfQUNLID0gNjsgLyoqXHJcbiAqIEVuY29kZXIgY29uc3RydWN0b3IuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMuRW5jb2RlciA9IEVuY29kZXI7IC8qKlxyXG4gKiBEZWNvZGVyIGNvbnN0cnVjdG9yLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLkRlY29kZXIgPSBEZWNvZGVyOyAvKipcclxuICogQSBzb2NrZXQuaW8gRW5jb2RlciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBFbmNvZGVyKCl7fSAvKipcclxuICogRW5jb2RlIGEgcGFja2V0IGFzIGEgc2luZ2xlIHN0cmluZyBpZiBub24tYmluYXJ5LCBvciBhcyBhXHJcbiAqIGJ1ZmZlciBzZXF1ZW5jZSwgZGVwZW5kaW5nIG9uIHBhY2tldCB0eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gcGFja2V0IG9iamVjdFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGhhbmRsZSBlbmNvZGluZ3MgKGxpa2VseSBlbmdpbmUud3JpdGUpXHJcbiAqIEByZXR1cm4gQ2FsbHMgY2FsbGJhY2sgd2l0aCBBcnJheSBvZiBlbmNvZGluZ3NcclxuICogQGFwaSBwdWJsaWNcclxuICovRW5jb2Rlci5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24ob2JqLGNhbGxiYWNrKXtkZWJ1ZygnZW5jb2RpbmcgcGFja2V0ICVqJyxvYmopO2lmKGV4cG9ydHMuQklOQVJZX0VWRU5UID09IG9iai50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PSBvYmoudHlwZSl7ZW5jb2RlQXNCaW5hcnkob2JqLGNhbGxiYWNrKTt9ZWxzZSB7dmFyIGVuY29kaW5nPWVuY29kZUFzU3RyaW5nKG9iaik7Y2FsbGJhY2soW2VuY29kaW5nXSk7fX07IC8qKlxyXG4gKiBFbmNvZGUgcGFja2V0IGFzIHN0cmluZy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGVuY29kZWRcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2Z1bmN0aW9uIGVuY29kZUFzU3RyaW5nKG9iail7dmFyIHN0cj0nJzt2YXIgbnNwPWZhbHNlOyAvLyBmaXJzdCBpcyB0eXBlXG5zdHIgKz0gb2JqLnR5cGU7IC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuaWYoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09IG9iai50eXBlKXtzdHIgKz0gb2JqLmF0dGFjaG1lbnRzO3N0ciArPSAnLSc7fSAvLyBpZiB3ZSBoYXZlIGEgbmFtZXNwYWNlIG90aGVyIHRoYW4gYC9gXG4vLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbmlmKG9iai5uc3AgJiYgJy8nICE9IG9iai5uc3Ape25zcCA9IHRydWU7c3RyICs9IG9iai5uc3A7fSAvLyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSB0aGUgaWRcbmlmKG51bGwgIT0gb2JqLmlkKXtpZihuc3Ape3N0ciArPSAnLCc7bnNwID0gZmFsc2U7fXN0ciArPSBvYmouaWQ7fSAvLyBqc29uIGRhdGFcbmlmKG51bGwgIT0gb2JqLmRhdGEpe2lmKG5zcClzdHIgKz0gJywnO3N0ciArPSBqc29uLnN0cmluZ2lmeShvYmouZGF0YSk7fWRlYnVnKCdlbmNvZGVkICVqIGFzICVzJyxvYmosc3RyKTtyZXR1cm4gc3RyO30gLyoqXHJcbiAqIEVuY29kZSBwYWNrZXQgYXMgJ2J1ZmZlciBzZXF1ZW5jZScgYnkgcmVtb3ZpbmcgYmxvYnMsIGFuZFxyXG4gKiBkZWNvbnN0cnVjdGluZyBwYWNrZXQgaW50byBvYmplY3Qgd2l0aCBwbGFjZWhvbGRlcnMgYW5kXHJcbiAqIGEgbGlzdCBvZiBidWZmZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAqIEByZXR1cm4ge0J1ZmZlcn0gZW5jb2RlZFxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZnVuY3Rpb24gZW5jb2RlQXNCaW5hcnkob2JqLGNhbGxiYWNrKXtmdW5jdGlvbiB3cml0ZUVuY29kaW5nKGJsb2JsZXNzRGF0YSl7dmFyIGRlY29uc3RydWN0aW9uPWJpbmFyeS5kZWNvbnN0cnVjdFBhY2tldChibG9ibGVzc0RhdGEpO3ZhciBwYWNrPWVuY29kZUFzU3RyaW5nKGRlY29uc3RydWN0aW9uLnBhY2tldCk7dmFyIGJ1ZmZlcnM9ZGVjb25zdHJ1Y3Rpb24uYnVmZmVycztidWZmZXJzLnVuc2hpZnQocGFjayk7IC8vIGFkZCBwYWNrZXQgaW5mbyB0byBiZWdpbm5pbmcgb2YgZGF0YSBsaXN0XG5jYWxsYmFjayhidWZmZXJzKTsgLy8gd3JpdGUgYWxsIHRoZSBidWZmZXJzXG59YmluYXJ5LnJlbW92ZUJsb2JzKG9iaix3cml0ZUVuY29kaW5nKTt9IC8qKlxyXG4gKiBBIHNvY2tldC5pbyBEZWNvZGVyIGluc3RhbmNlXHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gZGVjb2RlclxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBEZWNvZGVyKCl7dGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDt9IC8qKlxyXG4gKiBNaXggaW4gYEVtaXR0ZXJgIHdpdGggRGVjb2Rlci5cclxuICovRW1pdHRlcihEZWNvZGVyLnByb3RvdHlwZSk7IC8qKlxyXG4gKiBEZWNvZGVzIGFuIGVjb2RlZCBwYWNrZXQgc3RyaW5nIGludG8gcGFja2V0IEpTT04uXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9EZWNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihvYmope3ZhciBwYWNrZXQ7aWYoJ3N0cmluZycgPT0gdHlwZW9mIG9iail7cGFja2V0ID0gZGVjb2RlU3RyaW5nKG9iaik7aWYoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gcGFja2V0LnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09IHBhY2tldC50eXBlKXsgLy8gYmluYXJ5IHBhY2tldCdzIGpzb25cbnRoaXMucmVjb25zdHJ1Y3RvciA9IG5ldyBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCk7IC8vIG5vIGF0dGFjaG1lbnRzLCBsYWJlbGVkIGJpbmFyeSBidXQgbm8gYmluYXJ5IGRhdGEgdG8gZm9sbG93XG5pZih0aGlzLnJlY29uc3RydWN0b3IucmVjb25QYWNrLmF0dGFjaG1lbnRzID09PSAwKXt0aGlzLmVtaXQoJ2RlY29kZWQnLHBhY2tldCk7fX1lbHNlIHsgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxudGhpcy5lbWl0KCdkZWNvZGVkJyxwYWNrZXQpO319ZWxzZSBpZihpc0J1ZihvYmopIHx8IG9iai5iYXNlNjQpeyAvLyByYXcgYmluYXJ5IGRhdGFcbmlmKCF0aGlzLnJlY29uc3RydWN0b3Ipe3Rocm93IG5ldyBFcnJvcignZ290IGJpbmFyeSBkYXRhIHdoZW4gbm90IHJlY29uc3RydWN0aW5nIGEgcGFja2V0Jyk7fWVsc2Uge3BhY2tldCA9IHRoaXMucmVjb25zdHJ1Y3Rvci50YWtlQmluYXJ5RGF0YShvYmopO2lmKHBhY2tldCl7IC8vIHJlY2VpdmVkIGZpbmFsIGJ1ZmZlclxudGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDt0aGlzLmVtaXQoJ2RlY29kZWQnLHBhY2tldCk7fX19ZWxzZSB7dGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGU6ICcgKyBvYmopO319OyAvKipcclxuICogRGVjb2RlIGEgcGFja2V0IFN0cmluZyAoSlNPTiBkYXRhKVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBkZWNvZGVTdHJpbmcoc3RyKXt2YXIgcD17fTt2YXIgaT0wOyAvLyBsb29rIHVwIHR5cGVcbnAudHlwZSA9IE51bWJlcihzdHIuY2hhckF0KDApKTtpZihudWxsID09IGV4cG9ydHMudHlwZXNbcC50eXBlXSlyZXR1cm4gZXJyb3IoKTsgLy8gbG9vayB1cCBhdHRhY2htZW50cyBpZiB0eXBlIGJpbmFyeVxuaWYoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gcC50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PSBwLnR5cGUpe3ZhciBidWY9Jyc7d2hpbGUoc3RyLmNoYXJBdCgrK2kpICE9ICctJykge2J1ZiArPSBzdHIuY2hhckF0KGkpO2lmKGkgPT0gc3RyLmxlbmd0aClicmVhazt9aWYoYnVmICE9IE51bWJlcihidWYpIHx8IHN0ci5jaGFyQXQoaSkgIT0gJy0nKXt0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgYXR0YWNobWVudHMnKTt9cC5hdHRhY2htZW50cyA9IE51bWJlcihidWYpO30gLy8gbG9vayB1cCBuYW1lc3BhY2UgKGlmIGFueSlcbmlmKCcvJyA9PSBzdHIuY2hhckF0KGkgKyAxKSl7cC5uc3AgPSAnJzt3aGlsZSgrK2kpIHt2YXIgYz1zdHIuY2hhckF0KGkpO2lmKCcsJyA9PSBjKWJyZWFrO3AubnNwICs9IGM7aWYoaSA9PSBzdHIubGVuZ3RoKWJyZWFrO319ZWxzZSB7cC5uc3AgPSAnLyc7fSAvLyBsb29rIHVwIGlkXG52YXIgbmV4dD1zdHIuY2hhckF0KGkgKyAxKTtpZignJyAhPT0gbmV4dCAmJiBOdW1iZXIobmV4dCkgPT0gbmV4dCl7cC5pZCA9ICcnO3doaWxlKCsraSkge3ZhciBjPXN0ci5jaGFyQXQoaSk7aWYobnVsbCA9PSBjIHx8IE51bWJlcihjKSAhPSBjKXstLWk7YnJlYWs7fXAuaWQgKz0gc3RyLmNoYXJBdChpKTtpZihpID09IHN0ci5sZW5ndGgpYnJlYWs7fXAuaWQgPSBOdW1iZXIocC5pZCk7fSAvLyBsb29rIHVwIGpzb24gZGF0YVxuaWYoc3RyLmNoYXJBdCgrK2kpKXt0cnl7cC5kYXRhID0ganNvbi5wYXJzZShzdHIuc3Vic3RyKGkpKTt9Y2F0Y2goZSkge3JldHVybiBlcnJvcigpO319ZGVidWcoJ2RlY29kZWQgJXMgYXMgJWonLHN0cixwKTtyZXR1cm4gcDt9IC8qKlxyXG4gKiBEZWFsbG9jYXRlcyBhIHBhcnNlcidzIHJlc291cmNlc1xyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9EZWNvZGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKXtpZih0aGlzLnJlY29uc3RydWN0b3Ipe3RoaXMucmVjb25zdHJ1Y3Rvci5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7fX07IC8qKlxyXG4gKiBBIG1hbmFnZXIgb2YgYSBiaW5hcnkgZXZlbnQncyAnYnVmZmVyIHNlcXVlbmNlJy4gU2hvdWxkXHJcbiAqIGJlIGNvbnN0cnVjdGVkIHdoZW5ldmVyIGEgcGFja2V0IG9mIHR5cGUgQklOQVJZX0VWRU5UIGlzXHJcbiAqIGRlY29kZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcclxuICogQHJldHVybiB7QmluYXJ5UmVjb25zdHJ1Y3Rvcn0gaW5pdGlhbGl6ZWQgcmVjb25zdHJ1Y3RvclxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZnVuY3Rpb24gQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpe3RoaXMucmVjb25QYWNrID0gcGFja2V0O3RoaXMuYnVmZmVycyA9IFtdO30gLyoqXHJcbiAqIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiBiaW5hcnkgZGF0YSByZWNlaXZlZCBmcm9tIGNvbm5lY3Rpb25cclxuICogYWZ0ZXIgYSBCSU5BUllfRVZFTlQgcGFja2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0J1ZmZlciB8IEFycmF5QnVmZmVyfSBiaW5EYXRhIC0gdGhlIHJhdyBiaW5hcnkgZGF0YSByZWNlaXZlZFxyXG4gKiBAcmV0dXJuIHtudWxsIHwgT2JqZWN0fSByZXR1cm5zIG51bGwgaWYgbW9yZSBiaW5hcnkgZGF0YSBpcyBleHBlY3RlZCBvclxyXG4gKiAgIGEgcmVjb25zdHJ1Y3RlZCBwYWNrZXQgb2JqZWN0IGlmIGFsbCBidWZmZXJzIGhhdmUgYmVlbiByZWNlaXZlZC5cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL0JpbmFyeVJlY29uc3RydWN0b3IucHJvdG90eXBlLnRha2VCaW5hcnlEYXRhID0gZnVuY3Rpb24oYmluRGF0YSl7dGhpcy5idWZmZXJzLnB1c2goYmluRGF0YSk7aWYodGhpcy5idWZmZXJzLmxlbmd0aCA9PSB0aGlzLnJlY29uUGFjay5hdHRhY2htZW50cyl7IC8vIGRvbmUgd2l0aCBidWZmZXIgbGlzdFxudmFyIHBhY2tldD1iaW5hcnkucmVjb25zdHJ1Y3RQYWNrZXQodGhpcy5yZWNvblBhY2ssdGhpcy5idWZmZXJzKTt0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtyZXR1cm4gcGFja2V0O31yZXR1cm4gbnVsbDt9OyAvKipcclxuICogQ2xlYW5zIHVwIGJpbmFyeSBwYWNrZXQgcmVjb25zdHJ1Y3Rpb24gdmFyaWFibGVzLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZmluaXNoZWRSZWNvbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKCl7dGhpcy5yZWNvblBhY2sgPSBudWxsO3RoaXMuYnVmZmVycyA9IFtdO307ZnVuY3Rpb24gZXJyb3IoZGF0YSl7cmV0dXJuIHt0eXBlOmV4cG9ydHMuRVJST1IsZGF0YToncGFyc2VyIGVycm9yJ307fX0se1wiLi9iaW5hcnlcIjo0NixcIi4vaXMtYnVmZmVyXCI6NDgsXCJjb21wb25lbnQtZW1pdHRlclwiOjQ5LFwiZGVidWdcIjozOSxcImlzYXJyYXlcIjo0MyxcImpzb24zXCI6NTB9XSw0ODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7bW9kdWxlLmV4cG9ydHMgPSBpc0J1ZjsgLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBvYmogaXMgYSBidWZmZXIgb3IgYW4gYXJyYXlidWZmZXIuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBpc0J1ZihvYmope3JldHVybiBnbG9iYWwuQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIob2JqKSB8fCBnbG9iYWwuQXJyYXlCdWZmZXIgJiYgb2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7fX0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHt9XSw0OTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7YXJndW1lbnRzWzRdWzE1XVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cyk7fSx7XCJkdXBcIjoxNX1dLDUwOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyohIEpTT04gdjMuMy4yIHwgaHR0cDovL2Jlc3RpZWpzLmdpdGh1Yi5pby9qc29uMyB8IENvcHlyaWdodCAyMDEyLTIwMTQsIEtpdCBDYW1icmlkZ2UgfCBodHRwOi8va2l0Lm1pdC1saWNlbnNlLm9yZyAqLzsoZnVuY3Rpb24oKXsgLy8gRGV0ZWN0IHRoZSBgZGVmaW5lYCBmdW5jdGlvbiBleHBvc2VkIGJ5IGFzeW5jaHJvbm91cyBtb2R1bGUgbG9hZGVycy4gVGhlXG4vLyBzdHJpY3QgYGRlZmluZWAgY2hlY2sgaXMgbmVjZXNzYXJ5IGZvciBjb21wYXRpYmlsaXR5IHdpdGggYHIuanNgLlxudmFyIGlzTG9hZGVyPXR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kOyAvLyBBIHNldCBvZiB0eXBlcyB1c2VkIHRvIGRpc3Rpbmd1aXNoIG9iamVjdHMgZnJvbSBwcmltaXRpdmVzLlxudmFyIG9iamVjdFR5cGVzPXtcImZ1bmN0aW9uXCI6dHJ1ZSxcIm9iamVjdFwiOnRydWV9OyAvLyBEZXRlY3QgdGhlIGBleHBvcnRzYCBvYmplY3QgZXhwb3NlZCBieSBDb21tb25KUyBpbXBsZW1lbnRhdGlvbnMuXG52YXIgZnJlZUV4cG9ydHM9b2JqZWN0VHlwZXNbdHlwZW9mIGV4cG9ydHNdICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0czsgLy8gVXNlIHRoZSBgZ2xvYmFsYCBvYmplY3QgZXhwb3NlZCBieSBOb2RlIChpbmNsdWRpbmcgQnJvd3NlcmlmeSB2aWFcbi8vIGBpbnNlcnQtbW9kdWxlLWdsb2JhbHNgKSwgTmFyd2hhbCwgYW5kIFJpbmdvIGFzIHRoZSBkZWZhdWx0IGNvbnRleHQsXG4vLyBhbmQgdGhlIGB3aW5kb3dgIG9iamVjdCBpbiBicm93c2Vycy4gUmhpbm8gZXhwb3J0cyBhIGBnbG9iYWxgIGZ1bmN0aW9uXG4vLyBpbnN0ZWFkLlxudmFyIHJvb3Q9b2JqZWN0VHlwZXNbdHlwZW9mIHdpbmRvd10gJiYgd2luZG93IHx8IHRoaXMsZnJlZUdsb2JhbD1mcmVlRXhwb3J0cyAmJiBvYmplY3RUeXBlc1t0eXBlb2YgbW9kdWxlXSAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiB0eXBlb2YgZ2xvYmFsID09IFwib2JqZWN0XCIgJiYgZ2xvYmFsO2lmKGZyZWVHbG9iYWwgJiYgKGZyZWVHbG9iYWxbXCJnbG9iYWxcIl0gPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbFtcIndpbmRvd1wiXSA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsW1wic2VsZlwiXSA9PT0gZnJlZUdsb2JhbCkpe3Jvb3QgPSBmcmVlR2xvYmFsO30gLy8gUHVibGljOiBJbml0aWFsaXplcyBKU09OIDMgdXNpbmcgdGhlIGdpdmVuIGBjb250ZXh0YCBvYmplY3QsIGF0dGFjaGluZyB0aGVcbi8vIGBzdHJpbmdpZnlgIGFuZCBgcGFyc2VgIGZ1bmN0aW9ucyB0byB0aGUgc3BlY2lmaWVkIGBleHBvcnRzYCBvYmplY3QuXG5mdW5jdGlvbiBydW5JbkNvbnRleHQoY29udGV4dCxleHBvcnRzKXtjb250ZXh0IHx8IChjb250ZXh0ID0gcm9vdFtcIk9iamVjdFwiXSgpKTtleHBvcnRzIHx8IChleHBvcnRzID0gcm9vdFtcIk9iamVjdFwiXSgpKTsgLy8gTmF0aXZlIGNvbnN0cnVjdG9yIGFsaWFzZXMuXG52YXIgTnVtYmVyPWNvbnRleHRbXCJOdW1iZXJcIl0gfHwgcm9vdFtcIk51bWJlclwiXSxTdHJpbmc9Y29udGV4dFtcIlN0cmluZ1wiXSB8fCByb290W1wiU3RyaW5nXCJdLE9iamVjdD1jb250ZXh0W1wiT2JqZWN0XCJdIHx8IHJvb3RbXCJPYmplY3RcIl0sRGF0ZT1jb250ZXh0W1wiRGF0ZVwiXSB8fCByb290W1wiRGF0ZVwiXSxTeW50YXhFcnJvcj1jb250ZXh0W1wiU3ludGF4RXJyb3JcIl0gfHwgcm9vdFtcIlN5bnRheEVycm9yXCJdLFR5cGVFcnJvcj1jb250ZXh0W1wiVHlwZUVycm9yXCJdIHx8IHJvb3RbXCJUeXBlRXJyb3JcIl0sTWF0aD1jb250ZXh0W1wiTWF0aFwiXSB8fCByb290W1wiTWF0aFwiXSxuYXRpdmVKU09OPWNvbnRleHRbXCJKU09OXCJdIHx8IHJvb3RbXCJKU09OXCJdOyAvLyBEZWxlZ2F0ZSB0byB0aGUgbmF0aXZlIGBzdHJpbmdpZnlgIGFuZCBgcGFyc2VgIGltcGxlbWVudGF0aW9ucy5cbmlmKHR5cGVvZiBuYXRpdmVKU09OID09IFwib2JqZWN0XCIgJiYgbmF0aXZlSlNPTil7ZXhwb3J0cy5zdHJpbmdpZnkgPSBuYXRpdmVKU09OLnN0cmluZ2lmeTtleHBvcnRzLnBhcnNlID0gbmF0aXZlSlNPTi5wYXJzZTt9IC8vIENvbnZlbmllbmNlIGFsaWFzZXMuXG52YXIgb2JqZWN0UHJvdG89T2JqZWN0LnByb3RvdHlwZSxnZXRDbGFzcz1vYmplY3RQcm90by50b1N0cmluZyxpc1Byb3BlcnR5LGZvckVhY2gsdW5kZWY7IC8vIFRlc3QgdGhlIGBEYXRlI2dldFVUQypgIG1ldGhvZHMuIEJhc2VkIG9uIHdvcmsgYnkgQFlhZmZsZS5cbnZhciBpc0V4dGVuZGVkPW5ldyBEYXRlKC0zNTA5ODI3MzM0NTczMjkyKTt0cnl7IC8vIFRoZSBgZ2V0VVRDRnVsbFllYXJgLCBgTW9udGhgLCBhbmQgYERhdGVgIG1ldGhvZHMgcmV0dXJuIG5vbnNlbnNpY2FsXG4vLyByZXN1bHRzIGZvciBjZXJ0YWluIGRhdGVzIGluIE9wZXJhID49IDEwLjUzLlxuaXNFeHRlbmRlZCA9IGlzRXh0ZW5kZWQuZ2V0VVRDRnVsbFllYXIoKSA9PSAtMTA5MjUyICYmIGlzRXh0ZW5kZWQuZ2V0VVRDTW9udGgoKSA9PT0gMCAmJiBpc0V4dGVuZGVkLmdldFVUQ0RhdGUoKSA9PT0gMSAmJiAgLy8gU2FmYXJpIDwgMi4wLjIgc3RvcmVzIHRoZSBpbnRlcm5hbCBtaWxsaXNlY29uZCB0aW1lIHZhbHVlIGNvcnJlY3RseSxcbi8vIGJ1dCBjbGlwcyB0aGUgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBkYXRlIG1ldGhvZHMgdG8gdGhlIHJhbmdlIG9mXG4vLyBzaWduZWQgMzItYml0IGludGVnZXJzIChbLTIgKiogMzEsIDIgKiogMzEgLSAxXSkuXG5pc0V4dGVuZGVkLmdldFVUQ0hvdXJzKCkgPT0gMTAgJiYgaXNFeHRlbmRlZC5nZXRVVENNaW51dGVzKCkgPT0gMzcgJiYgaXNFeHRlbmRlZC5nZXRVVENTZWNvbmRzKCkgPT0gNiAmJiBpc0V4dGVuZGVkLmdldFVUQ01pbGxpc2Vjb25kcygpID09IDcwODt9Y2F0Y2goZXhjZXB0aW9uKSB7fSAvLyBJbnRlcm5hbDogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBuYXRpdmUgYEpTT04uc3RyaW5naWZ5YCBhbmQgYHBhcnNlYFxuLy8gaW1wbGVtZW50YXRpb25zIGFyZSBzcGVjLWNvbXBsaWFudC4gQmFzZWQgb24gd29yayBieSBLZW4gU255ZGVyLlxuZnVuY3Rpb24gaGFzKG5hbWUpe2lmKGhhc1tuYW1lXSAhPT0gdW5kZWYpeyAvLyBSZXR1cm4gY2FjaGVkIGZlYXR1cmUgdGVzdCByZXN1bHQuXG5yZXR1cm4gaGFzW25hbWVdO312YXIgaXNTdXBwb3J0ZWQ7aWYobmFtZSA9PSBcImJ1Zy1zdHJpbmctY2hhci1pbmRleFwiKXsgLy8gSUUgPD0gNyBkb2Vzbid0IHN1cHBvcnQgYWNjZXNzaW5nIHN0cmluZyBjaGFyYWN0ZXJzIHVzaW5nIHNxdWFyZVxuLy8gYnJhY2tldCBub3RhdGlvbi4gSUUgOCBvbmx5IHN1cHBvcnRzIHRoaXMgZm9yIHByaW1pdGl2ZXMuXG5pc1N1cHBvcnRlZCA9IFwiYVwiWzBdICE9IFwiYVwiO31lbHNlIGlmKG5hbWUgPT0gXCJqc29uXCIpeyAvLyBJbmRpY2F0ZXMgd2hldGhlciBib3RoIGBKU09OLnN0cmluZ2lmeWAgYW5kIGBKU09OLnBhcnNlYCBhcmVcbi8vIHN1cHBvcnRlZC5cbmlzU3VwcG9ydGVkID0gaGFzKFwianNvbi1zdHJpbmdpZnlcIikgJiYgaGFzKFwianNvbi1wYXJzZVwiKTt9ZWxzZSB7dmFyIHZhbHVlLHNlcmlhbGl6ZWQ9XCJ7XFxcImFcXFwiOlsxLHRydWUsZmFsc2UsbnVsbCxcXFwiXFxcXHUwMDAwXFxcXGJcXFxcblxcXFxmXFxcXHJcXFxcdFxcXCJdfVwiOyAvLyBUZXN0IGBKU09OLnN0cmluZ2lmeWAuXG5pZihuYW1lID09IFwianNvbi1zdHJpbmdpZnlcIil7dmFyIHN0cmluZ2lmeT1leHBvcnRzLnN0cmluZ2lmeSxzdHJpbmdpZnlTdXBwb3J0ZWQ9dHlwZW9mIHN0cmluZ2lmeSA9PSBcImZ1bmN0aW9uXCIgJiYgaXNFeHRlbmRlZDtpZihzdHJpbmdpZnlTdXBwb3J0ZWQpeyAvLyBBIHRlc3QgZnVuY3Rpb24gb2JqZWN0IHdpdGggYSBjdXN0b20gYHRvSlNPTmAgbWV0aG9kLlxuKHZhbHVlID0gZnVuY3Rpb24oKXtyZXR1cm4gMTt9KS50b0pTT04gPSB2YWx1ZTt0cnl7c3RyaW5naWZ5U3VwcG9ydGVkID0gIC8vIEZpcmVmb3ggMy4xYjEgYW5kIGIyIHNlcmlhbGl6ZSBzdHJpbmcsIG51bWJlciwgYW5kIGJvb2xlYW5cbi8vIHByaW1pdGl2ZXMgYXMgb2JqZWN0IGxpdGVyYWxzLlxuc3RyaW5naWZ5KDApID09PSBcIjBcIiAmJiAgLy8gRkYgMy4xYjEsIGIyLCBhbmQgSlNPTiAyIHNlcmlhbGl6ZSB3cmFwcGVkIHByaW1pdGl2ZXMgYXMgb2JqZWN0XG4vLyBsaXRlcmFscy5cbnN0cmluZ2lmeShuZXcgTnVtYmVyKCkpID09PSBcIjBcIiAmJiBzdHJpbmdpZnkobmV3IFN0cmluZygpKSA9PSAnXCJcIicgJiYgIC8vIEZGIDMuMWIxLCAyIHRocm93IGFuIGVycm9yIGlmIHRoZSB2YWx1ZSBpcyBgbnVsbGAsIGB1bmRlZmluZWRgLCBvclxuLy8gZG9lcyBub3QgZGVmaW5lIGEgY2Fub25pY2FsIEpTT04gcmVwcmVzZW50YXRpb24gKHRoaXMgYXBwbGllcyB0b1xuLy8gb2JqZWN0cyB3aXRoIGB0b0pTT05gIHByb3BlcnRpZXMgYXMgd2VsbCwgKnVubGVzcyogdGhleSBhcmUgbmVzdGVkXG4vLyB3aXRoaW4gYW4gb2JqZWN0IG9yIGFycmF5KS5cbnN0cmluZ2lmeShnZXRDbGFzcykgPT09IHVuZGVmICYmICAvLyBJRSA4IHNlcmlhbGl6ZXMgYHVuZGVmaW5lZGAgYXMgYFwidW5kZWZpbmVkXCJgLiBTYWZhcmkgPD0gNS4xLjcgYW5kXG4vLyBGRiAzLjFiMyBwYXNzIHRoaXMgdGVzdC5cbnN0cmluZ2lmeSh1bmRlZikgPT09IHVuZGVmICYmICAvLyBTYWZhcmkgPD0gNS4xLjcgYW5kIEZGIDMuMWIzIHRocm93IGBFcnJvcmBzIGFuZCBgVHlwZUVycm9yYHMsXG4vLyByZXNwZWN0aXZlbHksIGlmIHRoZSB2YWx1ZSBpcyBvbWl0dGVkIGVudGlyZWx5Llxuc3RyaW5naWZ5KCkgPT09IHVuZGVmICYmICAvLyBGRiAzLjFiMSwgMiB0aHJvdyBhbiBlcnJvciBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgbm90IGEgbnVtYmVyLFxuLy8gc3RyaW5nLCBhcnJheSwgb2JqZWN0LCBCb29sZWFuLCBvciBgbnVsbGAgbGl0ZXJhbC4gVGhpcyBhcHBsaWVzIHRvXG4vLyBvYmplY3RzIHdpdGggY3VzdG9tIGB0b0pTT05gIG1ldGhvZHMgYXMgd2VsbCwgdW5sZXNzIHRoZXkgYXJlIG5lc3RlZFxuLy8gaW5zaWRlIG9iamVjdCBvciBhcnJheSBsaXRlcmFscy4gWVVJIDMuMC4wYjEgaWdub3JlcyBjdXN0b20gYHRvSlNPTmBcbi8vIG1ldGhvZHMgZW50aXJlbHkuXG5zdHJpbmdpZnkodmFsdWUpID09PSBcIjFcIiAmJiBzdHJpbmdpZnkoW3ZhbHVlXSkgPT0gXCJbMV1cIiAmJiAgLy8gUHJvdG90eXBlIDw9IDEuNi4xIHNlcmlhbGl6ZXMgYFt1bmRlZmluZWRdYCBhcyBgXCJbXVwiYCBpbnN0ZWFkIG9mXG4vLyBgXCJbbnVsbF1cImAuXG5zdHJpbmdpZnkoW3VuZGVmXSkgPT0gXCJbbnVsbF1cIiAmJiAgLy8gWVVJIDMuMC4wYjEgZmFpbHMgdG8gc2VyaWFsaXplIGBudWxsYCBsaXRlcmFscy5cbnN0cmluZ2lmeShudWxsKSA9PSBcIm51bGxcIiAmJiAgLy8gRkYgMy4xYjEsIDIgaGFsdHMgc2VyaWFsaXphdGlvbiBpZiBhbiBhcnJheSBjb250YWlucyBhIGZ1bmN0aW9uOlxuLy8gYFsxLCB0cnVlLCBnZXRDbGFzcywgMV1gIHNlcmlhbGl6ZXMgYXMgXCJbMSx0cnVlLF0sXCIuIEZGIDMuMWIzXG4vLyBlbGlkZXMgbm9uLUpTT04gdmFsdWVzIGZyb20gb2JqZWN0cyBhbmQgYXJyYXlzLCB1bmxlc3MgdGhleVxuLy8gZGVmaW5lIGN1c3RvbSBgdG9KU09OYCBtZXRob2RzLlxuc3RyaW5naWZ5KFt1bmRlZixnZXRDbGFzcyxudWxsXSkgPT0gXCJbbnVsbCxudWxsLG51bGxdXCIgJiYgIC8vIFNpbXBsZSBzZXJpYWxpemF0aW9uIHRlc3QuIEZGIDMuMWIxIHVzZXMgVW5pY29kZSBlc2NhcGUgc2VxdWVuY2VzXG4vLyB3aGVyZSBjaGFyYWN0ZXIgZXNjYXBlIGNvZGVzIGFyZSBleHBlY3RlZCAoZS5nLiwgYFxcYmAgPT4gYFxcdTAwMDhgKS5cbnN0cmluZ2lmeSh7XCJhXCI6W3ZhbHVlLHRydWUsZmFsc2UsbnVsbCxcIlxceDAwXFxiXFxuXFxmXFxyXFx0XCJdfSkgPT0gc2VyaWFsaXplZCAmJiAgLy8gRkYgMy4xYjEgYW5kIGIyIGlnbm9yZSB0aGUgYGZpbHRlcmAgYW5kIGB3aWR0aGAgYXJndW1lbnRzLlxuc3RyaW5naWZ5KG51bGwsdmFsdWUpID09PSBcIjFcIiAmJiBzdHJpbmdpZnkoWzEsMl0sbnVsbCwxKSA9PSBcIltcXG4gMSxcXG4gMlxcbl1cIiAmJiAgLy8gSlNPTiAyLCBQcm90b3R5cGUgPD0gMS43LCBhbmQgb2xkZXIgV2ViS2l0IGJ1aWxkcyBpbmNvcnJlY3RseVxuLy8gc2VyaWFsaXplIGV4dGVuZGVkIHllYXJzLlxuc3RyaW5naWZ5KG5ldyBEYXRlKC04LjY0ZTE1KSkgPT0gJ1wiLTI3MTgyMS0wNC0yMFQwMDowMDowMC4wMDBaXCInICYmICAvLyBUaGUgbWlsbGlzZWNvbmRzIGFyZSBvcHRpb25hbCBpbiBFUyA1LCBidXQgcmVxdWlyZWQgaW4gNS4xLlxuc3RyaW5naWZ5KG5ldyBEYXRlKDguNjRlMTUpKSA9PSAnXCIrMjc1NzYwLTA5LTEzVDAwOjAwOjAwLjAwMFpcIicgJiYgIC8vIEZpcmVmb3ggPD0gMTEuMCBpbmNvcnJlY3RseSBzZXJpYWxpemVzIHllYXJzIHByaW9yIHRvIDAgYXMgbmVnYXRpdmVcbi8vIGZvdXItZGlnaXQgeWVhcnMgaW5zdGVhZCBvZiBzaXgtZGlnaXQgeWVhcnMuIENyZWRpdHM6IEBZYWZmbGUuXG5zdHJpbmdpZnkobmV3IERhdGUoLTYyMTk4NzU1MmU1KSkgPT0gJ1wiLTAwMDAwMS0wMS0wMVQwMDowMDowMC4wMDBaXCInICYmICAvLyBTYWZhcmkgPD0gNS4xLjUgYW5kIE9wZXJhID49IDEwLjUzIGluY29ycmVjdGx5IHNlcmlhbGl6ZSBtaWxsaXNlY29uZFxuLy8gdmFsdWVzIGxlc3MgdGhhbiAxMDAwLiBDcmVkaXRzOiBAWWFmZmxlLlxuc3RyaW5naWZ5KG5ldyBEYXRlKC0xKSkgPT0gJ1wiMTk2OS0xMi0zMVQyMzo1OTo1OS45OTlaXCInO31jYXRjaChleGNlcHRpb24pIHtzdHJpbmdpZnlTdXBwb3J0ZWQgPSBmYWxzZTt9fWlzU3VwcG9ydGVkID0gc3RyaW5naWZ5U3VwcG9ydGVkO30gLy8gVGVzdCBgSlNPTi5wYXJzZWAuXG5pZihuYW1lID09IFwianNvbi1wYXJzZVwiKXt2YXIgcGFyc2U9ZXhwb3J0cy5wYXJzZTtpZih0eXBlb2YgcGFyc2UgPT0gXCJmdW5jdGlvblwiKXt0cnl7IC8vIEZGIDMuMWIxLCBiMiB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhIGJhcmUgbGl0ZXJhbCBpcyBwcm92aWRlZC5cbi8vIENvbmZvcm1pbmcgaW1wbGVtZW50YXRpb25zIHNob3VsZCBhbHNvIGNvZXJjZSB0aGUgaW5pdGlhbCBhcmd1bWVudCB0b1xuLy8gYSBzdHJpbmcgcHJpb3IgdG8gcGFyc2luZy5cbmlmKHBhcnNlKFwiMFwiKSA9PT0gMCAmJiAhcGFyc2UoZmFsc2UpKXsgLy8gU2ltcGxlIHBhcnNpbmcgdGVzdC5cbnZhbHVlID0gcGFyc2Uoc2VyaWFsaXplZCk7dmFyIHBhcnNlU3VwcG9ydGVkPXZhbHVlW1wiYVwiXS5sZW5ndGggPT0gNSAmJiB2YWx1ZVtcImFcIl1bMF0gPT09IDE7aWYocGFyc2VTdXBwb3J0ZWQpe3RyeXsgLy8gU2FmYXJpIDw9IDUuMS4yIGFuZCBGRiAzLjFiMSBhbGxvdyB1bmVzY2FwZWQgdGFicyBpbiBzdHJpbmdzLlxucGFyc2VTdXBwb3J0ZWQgPSAhcGFyc2UoJ1wiXFx0XCInKTt9Y2F0Y2goZXhjZXB0aW9uKSB7fWlmKHBhcnNlU3VwcG9ydGVkKXt0cnl7IC8vIEZGIDQuMCBhbmQgNC4wLjEgYWxsb3cgbGVhZGluZyBgK2Agc2lnbnMgYW5kIGxlYWRpbmdcbi8vIGRlY2ltYWwgcG9pbnRzLiBGRiA0LjAsIDQuMC4xLCBhbmQgSUUgOS0xMCBhbHNvIGFsbG93XG4vLyBjZXJ0YWluIG9jdGFsIGxpdGVyYWxzLlxucGFyc2VTdXBwb3J0ZWQgPSBwYXJzZShcIjAxXCIpICE9PSAxO31jYXRjaChleGNlcHRpb24pIHt9fWlmKHBhcnNlU3VwcG9ydGVkKXt0cnl7IC8vIEZGIDQuMCwgNC4wLjEsIGFuZCBSaGlubyAxLjdSMy1SNCBhbGxvdyB0cmFpbGluZyBkZWNpbWFsXG4vLyBwb2ludHMuIFRoZXNlIGVudmlyb25tZW50cywgYWxvbmcgd2l0aCBGRiAzLjFiMSBhbmQgMixcbi8vIGFsc28gYWxsb3cgdHJhaWxpbmcgY29tbWFzIGluIEpTT04gb2JqZWN0cyBhbmQgYXJyYXlzLlxucGFyc2VTdXBwb3J0ZWQgPSBwYXJzZShcIjEuXCIpICE9PSAxO31jYXRjaChleGNlcHRpb24pIHt9fX19fWNhdGNoKGV4Y2VwdGlvbikge3BhcnNlU3VwcG9ydGVkID0gZmFsc2U7fX1pc1N1cHBvcnRlZCA9IHBhcnNlU3VwcG9ydGVkO319cmV0dXJuIGhhc1tuYW1lXSA9ICEhaXNTdXBwb3J0ZWQ7fWlmKCFoYXMoXCJqc29uXCIpKXsgLy8gQ29tbW9uIGBbW0NsYXNzXV1gIG5hbWUgYWxpYXNlcy5cbnZhciBmdW5jdGlvbkNsYXNzPVwiW29iamVjdCBGdW5jdGlvbl1cIixkYXRlQ2xhc3M9XCJbb2JqZWN0IERhdGVdXCIsbnVtYmVyQ2xhc3M9XCJbb2JqZWN0IE51bWJlcl1cIixzdHJpbmdDbGFzcz1cIltvYmplY3QgU3RyaW5nXVwiLGFycmF5Q2xhc3M9XCJbb2JqZWN0IEFycmF5XVwiLGJvb2xlYW5DbGFzcz1cIltvYmplY3QgQm9vbGVhbl1cIjsgLy8gRGV0ZWN0IGluY29tcGxldGUgc3VwcG9ydCBmb3IgYWNjZXNzaW5nIHN0cmluZyBjaGFyYWN0ZXJzIGJ5IGluZGV4LlxudmFyIGNoYXJJbmRleEJ1Z2d5PWhhcyhcImJ1Zy1zdHJpbmctY2hhci1pbmRleFwiKTsgLy8gRGVmaW5lIGFkZGl0aW9uYWwgdXRpbGl0eSBtZXRob2RzIGlmIHRoZSBgRGF0ZWAgbWV0aG9kcyBhcmUgYnVnZ3kuXG5pZighaXNFeHRlbmRlZCl7dmFyIGZsb29yPU1hdGguZmxvb3I7IC8vIEEgbWFwcGluZyBiZXR3ZWVuIHRoZSBtb250aHMgb2YgdGhlIHllYXIgYW5kIHRoZSBudW1iZXIgb2YgZGF5cyBiZXR3ZWVuXG4vLyBKYW51YXJ5IDFzdCBhbmQgdGhlIGZpcnN0IG9mIHRoZSByZXNwZWN0aXZlIG1vbnRoLlxudmFyIE1vbnRocz1bMCwzMSw1OSw5MCwxMjAsMTUxLDE4MSwyMTIsMjQzLDI3MywzMDQsMzM0XTsgLy8gSW50ZXJuYWw6IENhbGN1bGF0ZXMgdGhlIG51bWJlciBvZiBkYXlzIGJldHdlZW4gdGhlIFVuaXggZXBvY2ggYW5kIHRoZVxuLy8gZmlyc3QgZGF5IG9mIHRoZSBnaXZlbiBtb250aC5cbnZhciBnZXREYXk9ZnVuY3Rpb24gZ2V0RGF5KHllYXIsbW9udGgpe3JldHVybiBNb250aHNbbW9udGhdICsgMzY1ICogKHllYXIgLSAxOTcwKSArIGZsb29yKCh5ZWFyIC0gMTk2OSArIChtb250aCA9ICsobW9udGggPiAxKSkpIC8gNCkgLSBmbG9vcigoeWVhciAtIDE5MDEgKyBtb250aCkgLyAxMDApICsgZmxvb3IoKHllYXIgLSAxNjAxICsgbW9udGgpIC8gNDAwKTt9O30gLy8gSW50ZXJuYWw6IERldGVybWluZXMgaWYgYSBwcm9wZXJ0eSBpcyBhIGRpcmVjdCBwcm9wZXJ0eSBvZiB0aGUgZ2l2ZW5cbi8vIG9iamVjdC4gRGVsZWdhdGVzIHRvIHRoZSBuYXRpdmUgYE9iamVjdCNoYXNPd25Qcm9wZXJ0eWAgbWV0aG9kLlxuaWYoIShpc1Byb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHkpKXtpc1Byb3BlcnR5ID0gZnVuY3Rpb24ocHJvcGVydHkpe3ZhciBtZW1iZXJzPXt9LGNvbnN0cnVjdG9yO2lmKChtZW1iZXJzLl9fcHJvdG9fXyA9IG51bGwsbWVtYmVycy5fX3Byb3RvX18gPSB7IC8vIFRoZSAqcHJvdG8qIHByb3BlcnR5IGNhbm5vdCBiZSBzZXQgbXVsdGlwbGUgdGltZXMgaW4gcmVjZW50XG4vLyB2ZXJzaW9ucyBvZiBGaXJlZm94IGFuZCBTZWFNb25rZXkuXG5cInRvU3RyaW5nXCI6MX0sbWVtYmVycykudG9TdHJpbmcgIT0gZ2V0Q2xhc3MpeyAvLyBTYWZhcmkgPD0gMi4wLjMgZG9lc24ndCBpbXBsZW1lbnQgYE9iamVjdCNoYXNPd25Qcm9wZXJ0eWAsIGJ1dFxuLy8gc3VwcG9ydHMgdGhlIG11dGFibGUgKnByb3RvKiBwcm9wZXJ0eS5cbmlzUHJvcGVydHkgPSBmdW5jdGlvbihwcm9wZXJ0eSl7IC8vIENhcHR1cmUgYW5kIGJyZWFrIHRoZSBvYmplY3QncyBwcm90b3R5cGUgY2hhaW4gKHNlZSBzZWN0aW9uIDguNi4yXG4vLyBvZiB0aGUgRVMgNS4xIHNwZWMpLiBUaGUgcGFyZW50aGVzaXplZCBleHByZXNzaW9uIHByZXZlbnRzIGFuXG4vLyB1bnNhZmUgdHJhbnNmb3JtYXRpb24gYnkgdGhlIENsb3N1cmUgQ29tcGlsZXIuXG52YXIgb3JpZ2luYWw9dGhpcy5fX3Byb3RvX18scmVzdWx0PShwcm9wZXJ0eSBpbiAodGhpcy5fX3Byb3RvX18gPSBudWxsLHRoaXMpKTsgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgcHJvdG90eXBlIGNoYWluLlxudGhpcy5fX3Byb3RvX18gPSBvcmlnaW5hbDtyZXR1cm4gcmVzdWx0O307fWVsc2UgeyAvLyBDYXB0dXJlIGEgcmVmZXJlbmNlIHRvIHRoZSB0b3AtbGV2ZWwgYE9iamVjdGAgY29uc3RydWN0b3IuXG5jb25zdHJ1Y3RvciA9IG1lbWJlcnMuY29uc3RydWN0b3I7IC8vIFVzZSB0aGUgYGNvbnN0cnVjdG9yYCBwcm9wZXJ0eSB0byBzaW11bGF0ZSBgT2JqZWN0I2hhc093blByb3BlcnR5YCBpblxuLy8gb3RoZXIgZW52aXJvbm1lbnRzLlxuaXNQcm9wZXJ0eSA9IGZ1bmN0aW9uKHByb3BlcnR5KXt2YXIgcGFyZW50PSh0aGlzLmNvbnN0cnVjdG9yIHx8IGNvbnN0cnVjdG9yKS5wcm90b3R5cGU7cmV0dXJuIHByb3BlcnR5IGluIHRoaXMgJiYgIShwcm9wZXJ0eSBpbiBwYXJlbnQgJiYgdGhpc1twcm9wZXJ0eV0gPT09IHBhcmVudFtwcm9wZXJ0eV0pO307fW1lbWJlcnMgPSBudWxsO3JldHVybiBpc1Byb3BlcnR5LmNhbGwodGhpcyxwcm9wZXJ0eSk7fTt9IC8vIEludGVybmFsOiBOb3JtYWxpemVzIHRoZSBgZm9yLi4uaW5gIGl0ZXJhdGlvbiBhbGdvcml0aG0gYWNyb3NzXG4vLyBlbnZpcm9ubWVudHMuIEVhY2ggZW51bWVyYXRlZCBrZXkgaXMgeWllbGRlZCB0byBhIGBjYWxsYmFja2AgZnVuY3Rpb24uXG5mb3JFYWNoID0gZnVuY3Rpb24ob2JqZWN0LGNhbGxiYWNrKXt2YXIgc2l6ZT0wLFByb3BlcnRpZXMsbWVtYmVycyxwcm9wZXJ0eTsgLy8gVGVzdHMgZm9yIGJ1Z3MgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQncyBgZm9yLi4uaW5gIGFsZ29yaXRobS4gVGhlXG4vLyBgdmFsdWVPZmAgcHJvcGVydHkgaW5oZXJpdHMgdGhlIG5vbi1lbnVtZXJhYmxlIGZsYWcgZnJvbVxuLy8gYE9iamVjdC5wcm90b3R5cGVgIGluIG9sZGVyIHZlcnNpb25zIG9mIElFLCBOZXRzY2FwZSwgYW5kIE1vemlsbGEuXG4oUHJvcGVydGllcyA9IGZ1bmN0aW9uKCl7dGhpcy52YWx1ZU9mID0gMDt9KS5wcm90b3R5cGUudmFsdWVPZiA9IDA7IC8vIEl0ZXJhdGUgb3ZlciBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYFByb3BlcnRpZXNgIGNsYXNzLlxubWVtYmVycyA9IG5ldyBQcm9wZXJ0aWVzKCk7Zm9yKHByb3BlcnR5IGluIG1lbWJlcnMpIHsgLy8gSWdub3JlIGFsbCBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbmlmKGlzUHJvcGVydHkuY2FsbChtZW1iZXJzLHByb3BlcnR5KSl7c2l6ZSsrO319UHJvcGVydGllcyA9IG1lbWJlcnMgPSBudWxsOyAvLyBOb3JtYWxpemUgdGhlIGl0ZXJhdGlvbiBhbGdvcml0aG0uXG5pZighc2l6ZSl7IC8vIEEgbGlzdCBvZiBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbm1lbWJlcnMgPSBbXCJ2YWx1ZU9mXCIsXCJ0b1N0cmluZ1wiLFwidG9Mb2NhbGVTdHJpbmdcIixcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJoYXNPd25Qcm9wZXJ0eVwiLFwiY29uc3RydWN0b3JcIl07IC8vIElFIDw9IDgsIE1vemlsbGEgMS4wLCBhbmQgTmV0c2NhcGUgNi4yIGlnbm9yZSBzaGFkb3dlZCBub24tZW51bWVyYWJsZVxuLy8gcHJvcGVydGllcy5cbmZvckVhY2ggPSBmdW5jdGlvbihvYmplY3QsY2FsbGJhY2spe3ZhciBpc0Z1bmN0aW9uPWdldENsYXNzLmNhbGwob2JqZWN0KSA9PSBmdW5jdGlvbkNsYXNzLHByb3BlcnR5LGxlbmd0aDt2YXIgaGFzUHJvcGVydHk9IWlzRnVuY3Rpb24gJiYgdHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciAhPSBcImZ1bmN0aW9uXCIgJiYgb2JqZWN0VHlwZXNbdHlwZW9mIG9iamVjdC5oYXNPd25Qcm9wZXJ0eV0gJiYgb2JqZWN0Lmhhc093blByb3BlcnR5IHx8IGlzUHJvcGVydHk7Zm9yKHByb3BlcnR5IGluIG9iamVjdCkgeyAvLyBHZWNrbyA8PSAxLjAgZW51bWVyYXRlcyB0aGUgYHByb3RvdHlwZWAgcHJvcGVydHkgb2YgZnVuY3Rpb25zIHVuZGVyXG4vLyBjZXJ0YWluIGNvbmRpdGlvbnM7IElFIGRvZXMgbm90LlxuaWYoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LHByb3BlcnR5KSl7Y2FsbGJhY2socHJvcGVydHkpO319IC8vIE1hbnVhbGx5IGludm9rZSB0aGUgY2FsbGJhY2sgZm9yIGVhY2ggbm9uLWVudW1lcmFibGUgcHJvcGVydHkuXG5mb3IobGVuZ3RoID0gbWVtYmVycy5sZW5ndGg7cHJvcGVydHkgPSBtZW1iZXJzWy0tbGVuZ3RoXTtoYXNQcm9wZXJ0eS5jYWxsKG9iamVjdCxwcm9wZXJ0eSkgJiYgY2FsbGJhY2socHJvcGVydHkpKTt9O31lbHNlIGlmKHNpemUgPT0gMil7IC8vIFNhZmFyaSA8PSAyLjAuNCBlbnVtZXJhdGVzIHNoYWRvd2VkIHByb3BlcnRpZXMgdHdpY2UuXG5mb3JFYWNoID0gZnVuY3Rpb24ob2JqZWN0LGNhbGxiYWNrKXsgLy8gQ3JlYXRlIGEgc2V0IG9mIGl0ZXJhdGVkIHByb3BlcnRpZXMuXG52YXIgbWVtYmVycz17fSxpc0Z1bmN0aW9uPWdldENsYXNzLmNhbGwob2JqZWN0KSA9PSBmdW5jdGlvbkNsYXNzLHByb3BlcnR5O2Zvcihwcm9wZXJ0eSBpbiBvYmplY3QpIHsgLy8gU3RvcmUgZWFjaCBwcm9wZXJ0eSBuYW1lIHRvIHByZXZlbnQgZG91YmxlIGVudW1lcmF0aW9uLiBUaGVcbi8vIGBwcm90b3R5cGVgIHByb3BlcnR5IG9mIGZ1bmN0aW9ucyBpcyBub3QgZW51bWVyYXRlZCBkdWUgdG8gY3Jvc3MtXG4vLyBlbnZpcm9ubWVudCBpbmNvbnNpc3RlbmNpZXMuXG5pZighKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgIWlzUHJvcGVydHkuY2FsbChtZW1iZXJzLHByb3BlcnR5KSAmJiAobWVtYmVyc1twcm9wZXJ0eV0gPSAxKSAmJiBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LHByb3BlcnR5KSl7Y2FsbGJhY2socHJvcGVydHkpO319fTt9ZWxzZSB7IC8vIE5vIGJ1Z3MgZGV0ZWN0ZWQ7IHVzZSB0aGUgc3RhbmRhcmQgYGZvci4uLmluYCBhbGdvcml0aG0uXG5mb3JFYWNoID0gZnVuY3Rpb24ob2JqZWN0LGNhbGxiYWNrKXt2YXIgaXNGdW5jdGlvbj1nZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcyxwcm9wZXJ0eSxpc0NvbnN0cnVjdG9yO2Zvcihwcm9wZXJ0eSBpbiBvYmplY3QpIHtpZighKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgaXNQcm9wZXJ0eS5jYWxsKG9iamVjdCxwcm9wZXJ0eSkgJiYgIShpc0NvbnN0cnVjdG9yID0gcHJvcGVydHkgPT09IFwiY29uc3RydWN0b3JcIikpe2NhbGxiYWNrKHByb3BlcnR5KTt9fSAvLyBNYW51YWxseSBpbnZva2UgdGhlIGNhbGxiYWNrIGZvciB0aGUgYGNvbnN0cnVjdG9yYCBwcm9wZXJ0eSBkdWUgdG9cbi8vIGNyb3NzLWVudmlyb25tZW50IGluY29uc2lzdGVuY2llcy5cbmlmKGlzQ29uc3RydWN0b3IgfHwgaXNQcm9wZXJ0eS5jYWxsKG9iamVjdCxwcm9wZXJ0eSA9IFwiY29uc3RydWN0b3JcIikpe2NhbGxiYWNrKHByb3BlcnR5KTt9fTt9cmV0dXJuIGZvckVhY2gob2JqZWN0LGNhbGxiYWNrKTt9OyAvLyBQdWJsaWM6IFNlcmlhbGl6ZXMgYSBKYXZhU2NyaXB0IGB2YWx1ZWAgYXMgYSBKU09OIHN0cmluZy4gVGhlIG9wdGlvbmFsXG4vLyBgZmlsdGVyYCBhcmd1bWVudCBtYXkgc3BlY2lmeSBlaXRoZXIgYSBmdW5jdGlvbiB0aGF0IGFsdGVycyBob3cgb2JqZWN0IGFuZFxuLy8gYXJyYXkgbWVtYmVycyBhcmUgc2VyaWFsaXplZCwgb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncyBhbmQgbnVtYmVycyB0aGF0XG4vLyBpbmRpY2F0ZXMgd2hpY2ggcHJvcGVydGllcyBzaG91bGQgYmUgc2VyaWFsaXplZC4gVGhlIG9wdGlvbmFsIGB3aWR0aGBcbi8vIGFyZ3VtZW50IG1heSBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgbnVtYmVyIHRoYXQgc3BlY2lmaWVzIHRoZSBpbmRlbnRhdGlvblxuLy8gbGV2ZWwgb2YgdGhlIG91dHB1dC5cbmlmKCFoYXMoXCJqc29uLXN0cmluZ2lmeVwiKSl7IC8vIEludGVybmFsOiBBIG1hcCBvZiBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuXG52YXIgRXNjYXBlcz17OTI6XCJcXFxcXFxcXFwiLDM0OidcXFxcXCInLDg6XCJcXFxcYlwiLDEyOlwiXFxcXGZcIiwxMDpcIlxcXFxuXCIsMTM6XCJcXFxcclwiLDk6XCJcXFxcdFwifTsgLy8gSW50ZXJuYWw6IENvbnZlcnRzIGB2YWx1ZWAgaW50byBhIHplcm8tcGFkZGVkIHN0cmluZyBzdWNoIHRoYXQgaXRzXG4vLyBsZW5ndGggaXMgYXQgbGVhc3QgZXF1YWwgdG8gYHdpZHRoYC4gVGhlIGB3aWR0aGAgbXVzdCBiZSA8PSA2LlxudmFyIGxlYWRpbmdaZXJvZXM9XCIwMDAwMDBcIjt2YXIgdG9QYWRkZWRTdHJpbmc9ZnVuY3Rpb24gdG9QYWRkZWRTdHJpbmcod2lkdGgsdmFsdWUpeyAvLyBUaGUgYHx8IDBgIGV4cHJlc3Npb24gaXMgbmVjZXNzYXJ5IHRvIHdvcmsgYXJvdW5kIGEgYnVnIGluXG4vLyBPcGVyYSA8PSA3LjU0dTIgd2hlcmUgYDAgPT0gLTBgLCBidXQgYFN0cmluZygtMCkgIT09IFwiMFwiYC5cbnJldHVybiAobGVhZGluZ1plcm9lcyArICh2YWx1ZSB8fCAwKSkuc2xpY2UoLXdpZHRoKTt9OyAvLyBJbnRlcm5hbDogRG91YmxlLXF1b3RlcyBhIHN0cmluZyBgdmFsdWVgLCByZXBsYWNpbmcgYWxsIEFTQ0lJIGNvbnRyb2xcbi8vIGNoYXJhY3RlcnMgKGNoYXJhY3RlcnMgd2l0aCBjb2RlIHVuaXQgdmFsdWVzIGJldHdlZW4gMCBhbmQgMzEpIHdpdGhcbi8vIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlXG4vLyBgUXVvdGUodmFsdWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxudmFyIHVuaWNvZGVQcmVmaXg9XCJcXFxcdTAwXCI7dmFyIHF1b3RlPWZ1bmN0aW9uIHF1b3RlKHZhbHVlKXt2YXIgcmVzdWx0PSdcIicsaW5kZXg9MCxsZW5ndGg9dmFsdWUubGVuZ3RoLHVzZUNoYXJJbmRleD0hY2hhckluZGV4QnVnZ3kgfHwgbGVuZ3RoID4gMTA7dmFyIHN5bWJvbHM9dXNlQ2hhckluZGV4ICYmIChjaGFySW5kZXhCdWdneT92YWx1ZS5zcGxpdChcIlwiKTp2YWx1ZSk7Zm9yKDtpbmRleCA8IGxlbmd0aDtpbmRleCsrKSB7dmFyIGNoYXJDb2RlPXZhbHVlLmNoYXJDb2RlQXQoaW5kZXgpOyAvLyBJZiB0aGUgY2hhcmFjdGVyIGlzIGEgY29udHJvbCBjaGFyYWN0ZXIsIGFwcGVuZCBpdHMgVW5pY29kZSBvclxuLy8gc2hvcnRoYW5kIGVzY2FwZSBzZXF1ZW5jZTsgb3RoZXJ3aXNlLCBhcHBlbmQgdGhlIGNoYXJhY3RlciBhcy1pcy5cbnN3aXRjaChjaGFyQ29kZSl7Y2FzZSA4OmNhc2UgOTpjYXNlIDEwOmNhc2UgMTI6Y2FzZSAxMzpjYXNlIDM0OmNhc2UgOTI6cmVzdWx0ICs9IEVzY2FwZXNbY2hhckNvZGVdO2JyZWFrO2RlZmF1bHQ6aWYoY2hhckNvZGUgPCAzMil7cmVzdWx0ICs9IHVuaWNvZGVQcmVmaXggKyB0b1BhZGRlZFN0cmluZygyLGNoYXJDb2RlLnRvU3RyaW5nKDE2KSk7YnJlYWs7fXJlc3VsdCArPSB1c2VDaGFySW5kZXg/c3ltYm9sc1tpbmRleF06dmFsdWUuY2hhckF0KGluZGV4KTt9fXJldHVybiByZXN1bHQgKyAnXCInO307IC8vIEludGVybmFsOiBSZWN1cnNpdmVseSBzZXJpYWxpemVzIGFuIG9iamVjdC4gSW1wbGVtZW50cyB0aGVcbi8vIGBTdHIoa2V5LCBob2xkZXIpYCwgYEpPKHZhbHVlKWAsIGFuZCBgSkEodmFsdWUpYCBvcGVyYXRpb25zLlxudmFyIHNlcmlhbGl6ZT1mdW5jdGlvbiBzZXJpYWxpemUocHJvcGVydHksb2JqZWN0LGNhbGxiYWNrLHByb3BlcnRpZXMsd2hpdGVzcGFjZSxpbmRlbnRhdGlvbixzdGFjayl7dmFyIHZhbHVlLGNsYXNzTmFtZSx5ZWFyLG1vbnRoLGRhdGUsdGltZSxob3VycyxtaW51dGVzLHNlY29uZHMsbWlsbGlzZWNvbmRzLHJlc3VsdHMsZWxlbWVudCxpbmRleCxsZW5ndGgscHJlZml4LHJlc3VsdDt0cnl7IC8vIE5lY2Vzc2FyeSBmb3IgaG9zdCBvYmplY3Qgc3VwcG9ydC5cbnZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTt9Y2F0Y2goZXhjZXB0aW9uKSB7fWlmKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiICYmIHZhbHVlKXtjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKTtpZihjbGFzc05hbWUgPT0gZGF0ZUNsYXNzICYmICFpc1Byb3BlcnR5LmNhbGwodmFsdWUsXCJ0b0pTT05cIikpe2lmKHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDApeyAvLyBEYXRlcyBhcmUgc2VyaWFsaXplZCBhY2NvcmRpbmcgdG8gdGhlIGBEYXRlI3RvSlNPTmAgbWV0aG9kXG4vLyBzcGVjaWZpZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuOS41LjQ0LiBTZWUgc2VjdGlvbiAxNS45LjEuMTVcbi8vIGZvciB0aGUgSVNPIDg2MDEgZGF0ZSB0aW1lIHN0cmluZyBmb3JtYXQuXG5pZihnZXREYXkpeyAvLyBNYW51YWxseSBjb21wdXRlIHRoZSB5ZWFyLCBtb250aCwgZGF0ZSwgaG91cnMsIG1pbnV0ZXMsXG4vLyBzZWNvbmRzLCBhbmQgbWlsbGlzZWNvbmRzIGlmIHRoZSBgZ2V0VVRDKmAgbWV0aG9kcyBhcmVcbi8vIGJ1Z2d5LiBBZGFwdGVkIGZyb20gQFlhZmZsZSdzIGBkYXRlLXNoaW1gIHByb2plY3QuXG5kYXRlID0gZmxvb3IodmFsdWUgLyA4NjRlNSk7Zm9yKHllYXIgPSBmbG9vcihkYXRlIC8gMzY1LjI0MjUpICsgMTk3MCAtIDE7Z2V0RGF5KHllYXIgKyAxLDApIDw9IGRhdGU7eWVhcisrKTtmb3IobW9udGggPSBmbG9vcigoZGF0ZSAtIGdldERheSh5ZWFyLDApKSAvIDMwLjQyKTtnZXREYXkoeWVhcixtb250aCArIDEpIDw9IGRhdGU7bW9udGgrKyk7ZGF0ZSA9IDEgKyBkYXRlIC0gZ2V0RGF5KHllYXIsbW9udGgpOyAvLyBUaGUgYHRpbWVgIHZhbHVlIHNwZWNpZmllcyB0aGUgdGltZSB3aXRoaW4gdGhlIGRheSAoc2VlIEVTXG4vLyA1LjEgc2VjdGlvbiAxNS45LjEuMikuIFRoZSBmb3JtdWxhIGAoQSAlIEIgKyBCKSAlIEJgIGlzIHVzZWRcbi8vIHRvIGNvbXB1dGUgYEEgbW9kdWxvIEJgLCBhcyB0aGUgYCVgIG9wZXJhdG9yIGRvZXMgbm90XG4vLyBjb3JyZXNwb25kIHRvIHRoZSBgbW9kdWxvYCBvcGVyYXRpb24gZm9yIG5lZ2F0aXZlIG51bWJlcnMuXG50aW1lID0gKHZhbHVlICUgODY0ZTUgKyA4NjRlNSkgJSA4NjRlNTsgLy8gVGhlIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBhbmQgbWlsbGlzZWNvbmRzIGFyZSBvYnRhaW5lZCBieVxuLy8gZGVjb21wb3NpbmcgdGhlIHRpbWUgd2l0aGluIHRoZSBkYXkuIFNlZSBzZWN0aW9uIDE1LjkuMS4xMC5cbmhvdXJzID0gZmxvb3IodGltZSAvIDM2ZTUpICUgMjQ7bWludXRlcyA9IGZsb29yKHRpbWUgLyA2ZTQpICUgNjA7c2Vjb25kcyA9IGZsb29yKHRpbWUgLyAxZTMpICUgNjA7bWlsbGlzZWNvbmRzID0gdGltZSAlIDFlMzt9ZWxzZSB7eWVhciA9IHZhbHVlLmdldFVUQ0Z1bGxZZWFyKCk7bW9udGggPSB2YWx1ZS5nZXRVVENNb250aCgpO2RhdGUgPSB2YWx1ZS5nZXRVVENEYXRlKCk7aG91cnMgPSB2YWx1ZS5nZXRVVENIb3VycygpO21pbnV0ZXMgPSB2YWx1ZS5nZXRVVENNaW51dGVzKCk7c2Vjb25kcyA9IHZhbHVlLmdldFVUQ1NlY29uZHMoKTttaWxsaXNlY29uZHMgPSB2YWx1ZS5nZXRVVENNaWxsaXNlY29uZHMoKTt9IC8vIFNlcmlhbGl6ZSBleHRlbmRlZCB5ZWFycyBjb3JyZWN0bHkuXG52YWx1ZSA9ICh5ZWFyIDw9IDAgfHwgeWVhciA+PSAxZTQ/KHllYXIgPCAwP1wiLVwiOlwiK1wiKSArIHRvUGFkZGVkU3RyaW5nKDYseWVhciA8IDA/LXllYXI6eWVhcik6dG9QYWRkZWRTdHJpbmcoNCx5ZWFyKSkgKyBcIi1cIiArIHRvUGFkZGVkU3RyaW5nKDIsbW9udGggKyAxKSArIFwiLVwiICsgdG9QYWRkZWRTdHJpbmcoMixkYXRlKSArICAvLyBNb250aHMsIGRhdGVzLCBob3VycywgbWludXRlcywgYW5kIHNlY29uZHMgc2hvdWxkIGhhdmUgdHdvXG4vLyBkaWdpdHM7IG1pbGxpc2Vjb25kcyBzaG91bGQgaGF2ZSB0aHJlZS5cblwiVFwiICsgdG9QYWRkZWRTdHJpbmcoMixob3VycykgKyBcIjpcIiArIHRvUGFkZGVkU3RyaW5nKDIsbWludXRlcykgKyBcIjpcIiArIHRvUGFkZGVkU3RyaW5nKDIsc2Vjb25kcykgKyAgLy8gTWlsbGlzZWNvbmRzIGFyZSBvcHRpb25hbCBpbiBFUyA1LjAsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG5cIi5cIiArIHRvUGFkZGVkU3RyaW5nKDMsbWlsbGlzZWNvbmRzKSArIFwiWlwiO31lbHNlIHt2YWx1ZSA9IG51bGw7fX1lbHNlIGlmKHR5cGVvZiB2YWx1ZS50b0pTT04gPT0gXCJmdW5jdGlvblwiICYmIChjbGFzc05hbWUgIT0gbnVtYmVyQ2xhc3MgJiYgY2xhc3NOYW1lICE9IHN0cmluZ0NsYXNzICYmIGNsYXNzTmFtZSAhPSBhcnJheUNsYXNzIHx8IGlzUHJvcGVydHkuY2FsbCh2YWx1ZSxcInRvSlNPTlwiKSkpeyAvLyBQcm90b3R5cGUgPD0gMS42LjEgYWRkcyBub24tc3RhbmRhcmQgYHRvSlNPTmAgbWV0aG9kcyB0byB0aGVcbi8vIGBOdW1iZXJgLCBgU3RyaW5nYCwgYERhdGVgLCBhbmQgYEFycmF5YCBwcm90b3R5cGVzLiBKU09OIDNcbi8vIGlnbm9yZXMgYWxsIGB0b0pTT05gIG1ldGhvZHMgb24gdGhlc2Ugb2JqZWN0cyB1bmxlc3MgdGhleSBhcmVcbi8vIGRlZmluZWQgZGlyZWN0bHkgb24gYW4gaW5zdGFuY2UuXG52YWx1ZSA9IHZhbHVlLnRvSlNPTihwcm9wZXJ0eSk7fX1pZihjYWxsYmFjayl7IC8vIElmIGEgcmVwbGFjZW1lbnQgZnVuY3Rpb24gd2FzIHByb3ZpZGVkLCBjYWxsIGl0IHRvIG9idGFpbiB0aGUgdmFsdWVcbi8vIGZvciBzZXJpYWxpemF0aW9uLlxudmFsdWUgPSBjYWxsYmFjay5jYWxsKG9iamVjdCxwcm9wZXJ0eSx2YWx1ZSk7fWlmKHZhbHVlID09PSBudWxsKXtyZXR1cm4gXCJudWxsXCI7fWNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwodmFsdWUpO2lmKGNsYXNzTmFtZSA9PSBib29sZWFuQ2xhc3MpeyAvLyBCb29sZWFucyBhcmUgcmVwcmVzZW50ZWQgbGl0ZXJhbGx5LlxucmV0dXJuIFwiXCIgKyB2YWx1ZTt9ZWxzZSBpZihjbGFzc05hbWUgPT0gbnVtYmVyQ2xhc3MpeyAvLyBKU09OIG51bWJlcnMgbXVzdCBiZSBmaW5pdGUuIGBJbmZpbml0eWAgYW5kIGBOYU5gIGFyZSBzZXJpYWxpemVkIGFzXG4vLyBgXCJudWxsXCJgLlxucmV0dXJuIHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDA/XCJcIiArIHZhbHVlOlwibnVsbFwiO31lbHNlIGlmKGNsYXNzTmFtZSA9PSBzdHJpbmdDbGFzcyl7IC8vIFN0cmluZ3MgYXJlIGRvdWJsZS1xdW90ZWQgYW5kIGVzY2FwZWQuXG5yZXR1cm4gcXVvdGUoXCJcIiArIHZhbHVlKTt9IC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBvYmplY3RzIGFuZCBhcnJheXMuXG5pZih0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIil7IC8vIENoZWNrIGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhpcyBpcyBhIGxpbmVhciBzZWFyY2g7IHBlcmZvcm1hbmNlXG4vLyBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2YgdW5pcXVlIG5lc3RlZCBvYmplY3RzLlxuZm9yKGxlbmd0aCA9IHN0YWNrLmxlbmd0aDtsZW5ndGgtLTspIHtpZihzdGFja1tsZW5ndGhdID09PSB2YWx1ZSl7IC8vIEN5Y2xpYyBzdHJ1Y3R1cmVzIGNhbm5vdCBiZSBzZXJpYWxpemVkIGJ5IGBKU09OLnN0cmluZ2lmeWAuXG50aHJvdyBUeXBlRXJyb3IoKTt9fSAvLyBBZGQgdGhlIG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG5zdGFjay5wdXNoKHZhbHVlKTtyZXN1bHRzID0gW107IC8vIFNhdmUgdGhlIGN1cnJlbnQgaW5kZW50YXRpb24gbGV2ZWwgYW5kIGluZGVudCBvbmUgYWRkaXRpb25hbCBsZXZlbC5cbnByZWZpeCA9IGluZGVudGF0aW9uO2luZGVudGF0aW9uICs9IHdoaXRlc3BhY2U7aWYoY2xhc3NOYW1lID09IGFycmF5Q2xhc3MpeyAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgYXJyYXkgZWxlbWVudHMuXG5mb3IoaW5kZXggPSAwLGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtpbmRleCA8IGxlbmd0aDtpbmRleCsrKSB7ZWxlbWVudCA9IHNlcmlhbGl6ZShpbmRleCx2YWx1ZSxjYWxsYmFjayxwcm9wZXJ0aWVzLHdoaXRlc3BhY2UsaW5kZW50YXRpb24sc3RhY2spO3Jlc3VsdHMucHVzaChlbGVtZW50ID09PSB1bmRlZj9cIm51bGxcIjplbGVtZW50KTt9cmVzdWx0ID0gcmVzdWx0cy5sZW5ndGg/d2hpdGVzcGFjZT9cIltcXG5cIiArIGluZGVudGF0aW9uICsgcmVzdWx0cy5qb2luKFwiLFxcblwiICsgaW5kZW50YXRpb24pICsgXCJcXG5cIiArIHByZWZpeCArIFwiXVwiOlwiW1wiICsgcmVzdWx0cy5qb2luKFwiLFwiKSArIFwiXVwiOlwiW11cIjt9ZWxzZSB7IC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBvYmplY3QgbWVtYmVycy4gTWVtYmVycyBhcmUgc2VsZWN0ZWQgZnJvbVxuLy8gZWl0aGVyIGEgdXNlci1zcGVjaWZpZWQgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcywgb3IgdGhlIG9iamVjdFxuLy8gaXRzZWxmLlxuZm9yRWFjaChwcm9wZXJ0aWVzIHx8IHZhbHVlLGZ1bmN0aW9uKHByb3BlcnR5KXt2YXIgZWxlbWVudD1zZXJpYWxpemUocHJvcGVydHksdmFsdWUsY2FsbGJhY2sscHJvcGVydGllcyx3aGl0ZXNwYWNlLGluZGVudGF0aW9uLHN0YWNrKTtpZihlbGVtZW50ICE9PSB1bmRlZil7IC8vIEFjY29yZGluZyB0byBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zOiBcIklmIGBnYXBgIHt3aGl0ZXNwYWNlfVxuLy8gaXMgbm90IHRoZSBlbXB0eSBzdHJpbmcsIGxldCBgbWVtYmVyYCB7cXVvdGUocHJvcGVydHkpICsgXCI6XCJ9XG4vLyBiZSB0aGUgY29uY2F0ZW5hdGlvbiBvZiBgbWVtYmVyYCBhbmQgdGhlIGBzcGFjZWAgY2hhcmFjdGVyLlwiXG4vLyBUaGUgXCJgc3BhY2VgIGNoYXJhY3RlclwiIHJlZmVycyB0byB0aGUgbGl0ZXJhbCBzcGFjZVxuLy8gY2hhcmFjdGVyLCBub3QgdGhlIGBzcGFjZWAge3dpZHRofSBhcmd1bWVudCBwcm92aWRlZCB0b1xuLy8gYEpTT04uc3RyaW5naWZ5YC5cbnJlc3VsdHMucHVzaChxdW90ZShwcm9wZXJ0eSkgKyBcIjpcIiArICh3aGl0ZXNwYWNlP1wiIFwiOlwiXCIpICsgZWxlbWVudCk7fX0pO3Jlc3VsdCA9IHJlc3VsdHMubGVuZ3RoP3doaXRlc3BhY2U/XCJ7XFxuXCIgKyBpbmRlbnRhdGlvbiArIHJlc3VsdHMuam9pbihcIixcXG5cIiArIGluZGVudGF0aW9uKSArIFwiXFxuXCIgKyBwcmVmaXggKyBcIn1cIjpcIntcIiArIHJlc3VsdHMuam9pbihcIixcIikgKyBcIn1cIjpcInt9XCI7fSAvLyBSZW1vdmUgdGhlIG9iamVjdCBmcm9tIHRoZSB0cmF2ZXJzZWQgb2JqZWN0IHN0YWNrLlxuc3RhY2sucG9wKCk7cmV0dXJuIHJlc3VsdDt9fTsgLy8gUHVibGljOiBgSlNPTi5zdHJpbmdpZnlgLiBTZWUgRVMgNS4xIHNlY3Rpb24gMTUuMTIuMy5cbmV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24oc291cmNlLGZpbHRlcix3aWR0aCl7dmFyIHdoaXRlc3BhY2UsY2FsbGJhY2sscHJvcGVydGllcyxjbGFzc05hbWU7aWYob2JqZWN0VHlwZXNbdHlwZW9mIGZpbHRlcl0gJiYgZmlsdGVyKXtpZigoY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbChmaWx0ZXIpKSA9PSBmdW5jdGlvbkNsYXNzKXtjYWxsYmFjayA9IGZpbHRlcjt9ZWxzZSBpZihjbGFzc05hbWUgPT0gYXJyYXlDbGFzcyl7IC8vIENvbnZlcnQgdGhlIHByb3BlcnR5IG5hbWVzIGFycmF5IGludG8gYSBtYWtlc2hpZnQgc2V0LlxucHJvcGVydGllcyA9IHt9O2Zvcih2YXIgaW5kZXg9MCxsZW5ndGg9ZmlsdGVyLmxlbmd0aCx2YWx1ZTtpbmRleCA8IGxlbmd0aDt2YWx1ZSA9IGZpbHRlcltpbmRleCsrXSwoY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh2YWx1ZSksY2xhc3NOYW1lID09IHN0cmluZ0NsYXNzIHx8IGNsYXNzTmFtZSA9PSBudW1iZXJDbGFzcykgJiYgKHByb3BlcnRpZXNbdmFsdWVdID0gMSkpO319aWYod2lkdGgpe2lmKChjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHdpZHRoKSkgPT0gbnVtYmVyQ2xhc3MpeyAvLyBDb252ZXJ0IHRoZSBgd2lkdGhgIHRvIGFuIGludGVnZXIgYW5kIGNyZWF0ZSBhIHN0cmluZyBjb250YWluaW5nXG4vLyBgd2lkdGhgIG51bWJlciBvZiBzcGFjZSBjaGFyYWN0ZXJzLlxuaWYoKHdpZHRoIC09IHdpZHRoICUgMSkgPiAwKXtmb3Iod2hpdGVzcGFjZSA9IFwiXCIsd2lkdGggPiAxMCAmJiAod2lkdGggPSAxMCk7d2hpdGVzcGFjZS5sZW5ndGggPCB3aWR0aDt3aGl0ZXNwYWNlICs9IFwiIFwiKTt9fWVsc2UgaWYoY2xhc3NOYW1lID09IHN0cmluZ0NsYXNzKXt3aGl0ZXNwYWNlID0gd2lkdGgubGVuZ3RoIDw9IDEwP3dpZHRoOndpZHRoLnNsaWNlKDAsMTApO319IC8vIE9wZXJhIDw9IDcuNTR1MiBkaXNjYXJkcyB0aGUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBlbXB0eSBzdHJpbmcga2V5c1xuLy8gKGBcIlwiYCkgb25seSBpZiB0aGV5IGFyZSB1c2VkIGRpcmVjdGx5IHdpdGhpbiBhbiBvYmplY3QgbWVtYmVyIGxpc3Rcbi8vIChlLmcuLCBgIShcIlwiIGluIHsgXCJcIjogMX0pYCkuXG5yZXR1cm4gc2VyaWFsaXplKFwiXCIsKHZhbHVlID0ge30sdmFsdWVbXCJcIl0gPSBzb3VyY2UsdmFsdWUpLGNhbGxiYWNrLHByb3BlcnRpZXMsd2hpdGVzcGFjZSxcIlwiLFtdKTt9O30gLy8gUHVibGljOiBQYXJzZXMgYSBKU09OIHNvdXJjZSBzdHJpbmcuXG5pZighaGFzKFwianNvbi1wYXJzZVwiKSl7dmFyIGZyb21DaGFyQ29kZT1TdHJpbmcuZnJvbUNoYXJDb2RlOyAvLyBJbnRlcm5hbDogQSBtYXAgb2YgZXNjYXBlZCBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHRoZWlyIHVuZXNjYXBlZFxuLy8gZXF1aXZhbGVudHMuXG52YXIgVW5lc2NhcGVzPXs5MjpcIlxcXFxcIiwzNDonXCInLDQ3OlwiL1wiLDk4OlwiXFxiXCIsMTE2OlwiXFx0XCIsMTEwOlwiXFxuXCIsMTAyOlwiXFxmXCIsMTE0OlwiXFxyXCJ9OyAvLyBJbnRlcm5hbDogU3RvcmVzIHRoZSBwYXJzZXIgc3RhdGUuXG52YXIgSW5kZXgsU291cmNlOyAvLyBJbnRlcm5hbDogUmVzZXRzIHRoZSBwYXJzZXIgc3RhdGUgYW5kIHRocm93cyBhIGBTeW50YXhFcnJvcmAuXG52YXIgYWJvcnQ9ZnVuY3Rpb24gYWJvcnQoKXtJbmRleCA9IFNvdXJjZSA9IG51bGw7dGhyb3cgU3ludGF4RXJyb3IoKTt9OyAvLyBJbnRlcm5hbDogUmV0dXJucyB0aGUgbmV4dCB0b2tlbiwgb3IgYFwiJFwiYCBpZiB0aGUgcGFyc2VyIGhhcyByZWFjaGVkXG4vLyB0aGUgZW5kIG9mIHRoZSBzb3VyY2Ugc3RyaW5nLiBBIHRva2VuIG1heSBiZSBhIHN0cmluZywgbnVtYmVyLCBgbnVsbGBcbi8vIGxpdGVyYWwsIG9yIEJvb2xlYW4gbGl0ZXJhbC5cbnZhciBsZXg9ZnVuY3Rpb24gbGV4KCl7dmFyIHNvdXJjZT1Tb3VyY2UsbGVuZ3RoPXNvdXJjZS5sZW5ndGgsdmFsdWUsYmVnaW4scG9zaXRpb24saXNTaWduZWQsY2hhckNvZGU7d2hpbGUoSW5kZXggPCBsZW5ndGgpIHtjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtzd2l0Y2goY2hhckNvZGUpe2Nhc2UgOTpjYXNlIDEwOmNhc2UgMTM6Y2FzZSAzMjogLy8gU2tpcCB3aGl0ZXNwYWNlIHRva2VucywgaW5jbHVkaW5nIHRhYnMsIGNhcnJpYWdlIHJldHVybnMsIGxpbmVcbi8vIGZlZWRzLCBhbmQgc3BhY2UgY2hhcmFjdGVycy5cbkluZGV4Kys7YnJlYWs7Y2FzZSAxMjM6Y2FzZSAxMjU6Y2FzZSA5MTpjYXNlIDkzOmNhc2UgNTg6Y2FzZSA0NDogLy8gUGFyc2UgYSBwdW5jdHVhdG9yIHRva2VuIChge2AsIGB9YCwgYFtgLCBgXWAsIGA6YCwgb3IgYCxgKSBhdFxuLy8gdGhlIGN1cnJlbnQgcG9zaXRpb24uXG52YWx1ZSA9IGNoYXJJbmRleEJ1Z2d5P3NvdXJjZS5jaGFyQXQoSW5kZXgpOnNvdXJjZVtJbmRleF07SW5kZXgrKztyZXR1cm4gdmFsdWU7Y2FzZSAzNDogLy8gYFwiYCBkZWxpbWl0cyBhIEpTT04gc3RyaW5nOyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNoYXJhY3RlciBhbmRcbi8vIGJlZ2luIHBhcnNpbmcgdGhlIHN0cmluZy4gU3RyaW5nIHRva2VucyBhcmUgcHJlZml4ZWQgd2l0aCB0aGVcbi8vIHNlbnRpbmVsIGBAYCBjaGFyYWN0ZXIgdG8gZGlzdGluZ3Vpc2ggdGhlbSBmcm9tIHB1bmN0dWF0b3JzIGFuZFxuLy8gZW5kLW9mLXN0cmluZyB0b2tlbnMuXG5mb3IodmFsdWUgPSBcIkBcIixJbmRleCsrO0luZGV4IDwgbGVuZ3RoOykge2NoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO2lmKGNoYXJDb2RlIDwgMzIpeyAvLyBVbmVzY2FwZWQgQVNDSUkgY29udHJvbCBjaGFyYWN0ZXJzICh0aG9zZSB3aXRoIGEgY29kZSB1bml0XG4vLyBsZXNzIHRoYW4gdGhlIHNwYWNlIGNoYXJhY3RlcikgYXJlIG5vdCBwZXJtaXR0ZWQuXG5hYm9ydCgpO31lbHNlIGlmKGNoYXJDb2RlID09IDkyKXsgLy8gQSByZXZlcnNlIHNvbGlkdXMgKGBcXGApIG1hcmtzIHRoZSBiZWdpbm5pbmcgb2YgYW4gZXNjYXBlZFxuLy8gY29udHJvbCBjaGFyYWN0ZXIgKGluY2x1ZGluZyBgXCJgLCBgXFxgLCBhbmQgYC9gKSBvciBVbmljb2RlXG4vLyBlc2NhcGUgc2VxdWVuY2UuXG5jaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO3N3aXRjaChjaGFyQ29kZSl7Y2FzZSA5MjpjYXNlIDM0OmNhc2UgNDc6Y2FzZSA5ODpjYXNlIDExNjpjYXNlIDExMDpjYXNlIDEwMjpjYXNlIDExNDogLy8gUmV2aXZlIGVzY2FwZWQgY29udHJvbCBjaGFyYWN0ZXJzLlxudmFsdWUgKz0gVW5lc2NhcGVzW2NoYXJDb2RlXTtJbmRleCsrO2JyZWFrO2Nhc2UgMTE3OiAvLyBgXFx1YCBtYXJrcyB0aGUgYmVnaW5uaW5nIG9mIGEgVW5pY29kZSBlc2NhcGUgc2VxdWVuY2UuXG4vLyBBZHZhbmNlIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgYW5kIHZhbGlkYXRlIHRoZVxuLy8gZm91ci1kaWdpdCBjb2RlIHBvaW50LlxuYmVnaW4gPSArK0luZGV4O2Zvcihwb3NpdGlvbiA9IEluZGV4ICsgNDtJbmRleCA8IHBvc2l0aW9uO0luZGV4KyspIHtjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTsgLy8gQSB2YWxpZCBzZXF1ZW5jZSBjb21wcmlzZXMgZm91ciBoZXhkaWdpdHMgKGNhc2UtXG4vLyBpbnNlbnNpdGl2ZSkgdGhhdCBmb3JtIGEgc2luZ2xlIGhleGFkZWNpbWFsIHZhbHVlLlxuaWYoIShjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1NyB8fCBjaGFyQ29kZSA+PSA5NyAmJiBjaGFyQ29kZSA8PSAxMDIgfHwgY2hhckNvZGUgPj0gNjUgJiYgY2hhckNvZGUgPD0gNzApKXsgLy8gSW52YWxpZCBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZS5cbmFib3J0KCk7fX0gLy8gUmV2aXZlIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbnZhbHVlICs9IGZyb21DaGFyQ29kZShcIjB4XCIgKyBzb3VyY2Uuc2xpY2UoYmVnaW4sSW5kZXgpKTticmVhaztkZWZhdWx0OiAvLyBJbnZhbGlkIGVzY2FwZSBzZXF1ZW5jZS5cbmFib3J0KCk7fX1lbHNlIHtpZihjaGFyQ29kZSA9PSAzNCl7IC8vIEFuIHVuZXNjYXBlZCBkb3VibGUtcXVvdGUgY2hhcmFjdGVyIG1hcmtzIHRoZSBlbmQgb2YgdGhlXG4vLyBzdHJpbmcuXG5icmVhazt9Y2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7YmVnaW4gPSBJbmRleDsgLy8gT3B0aW1pemUgZm9yIHRoZSBjb21tb24gY2FzZSB3aGVyZSBhIHN0cmluZyBpcyB2YWxpZC5cbndoaWxlKGNoYXJDb2RlID49IDMyICYmIGNoYXJDb2RlICE9IDkyICYmIGNoYXJDb2RlICE9IDM0KSB7Y2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTt9IC8vIEFwcGVuZCB0aGUgc3RyaW5nIGFzLWlzLlxudmFsdWUgKz0gc291cmNlLnNsaWNlKGJlZ2luLEluZGV4KTt9fWlmKHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSA9PSAzNCl7IC8vIEFkdmFuY2UgdG8gdGhlIG5leHQgY2hhcmFjdGVyIGFuZCByZXR1cm4gdGhlIHJldml2ZWQgc3RyaW5nLlxuSW5kZXgrKztyZXR1cm4gdmFsdWU7fSAvLyBVbnRlcm1pbmF0ZWQgc3RyaW5nLlxuYWJvcnQoKTtkZWZhdWx0OiAvLyBQYXJzZSBudW1iZXJzIGFuZCBsaXRlcmFscy5cbmJlZ2luID0gSW5kZXg7IC8vIEFkdmFuY2UgcGFzdCB0aGUgbmVnYXRpdmUgc2lnbiwgaWYgb25lIGlzIHNwZWNpZmllZC5cbmlmKGNoYXJDb2RlID09IDQ1KXtpc1NpZ25lZCA9IHRydWU7Y2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTt9IC8vIFBhcnNlIGFuIGludGVnZXIgb3IgZmxvYXRpbmctcG9pbnQgdmFsdWUuXG5pZihjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyl7IC8vIExlYWRpbmcgemVyb2VzIGFyZSBpbnRlcnByZXRlZCBhcyBvY3RhbCBsaXRlcmFscy5cbmlmKGNoYXJDb2RlID09IDQ4ICYmIChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4ICsgMSksY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpKXsgLy8gSWxsZWdhbCBvY3RhbCBsaXRlcmFsLlxuYWJvcnQoKTt9aXNTaWduZWQgPSBmYWxzZTsgLy8gUGFyc2UgdGhlIGludGVnZXIgY29tcG9uZW50LlxuZm9yKDtJbmRleCA8IGxlbmd0aCAmJiAoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCksY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpO0luZGV4KyspOyAvLyBGbG9hdHMgY2Fubm90IGNvbnRhaW4gYSBsZWFkaW5nIGRlY2ltYWwgcG9pbnQ7IGhvd2V2ZXIsIHRoaXNcbi8vIGNhc2UgaXMgYWxyZWFkeSBhY2NvdW50ZWQgZm9yIGJ5IHRoZSBwYXJzZXIuXG5pZihzb3VyY2UuY2hhckNvZGVBdChJbmRleCkgPT0gNDYpe3Bvc2l0aW9uID0gKytJbmRleDsgLy8gUGFyc2UgdGhlIGRlY2ltYWwgY29tcG9uZW50LlxuZm9yKDtwb3NpdGlvbiA8IGxlbmd0aCAmJiAoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChwb3NpdGlvbiksY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpO3Bvc2l0aW9uKyspO2lmKHBvc2l0aW9uID09IEluZGV4KXsgLy8gSWxsZWdhbCB0cmFpbGluZyBkZWNpbWFsLlxuYWJvcnQoKTt9SW5kZXggPSBwb3NpdGlvbjt9IC8vIFBhcnNlIGV4cG9uZW50cy4gVGhlIGBlYCBkZW5vdGluZyB0aGUgZXhwb25lbnQgaXNcbi8vIGNhc2UtaW5zZW5zaXRpdmUuXG5jaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtpZihjaGFyQ29kZSA9PSAxMDEgfHwgY2hhckNvZGUgPT0gNjkpe2NoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7IC8vIFNraXAgcGFzdCB0aGUgc2lnbiBmb2xsb3dpbmcgdGhlIGV4cG9uZW50LCBpZiBvbmUgaXNcbi8vIHNwZWNpZmllZC5cbmlmKGNoYXJDb2RlID09IDQzIHx8IGNoYXJDb2RlID09IDQ1KXtJbmRleCsrO30gLy8gUGFyc2UgdGhlIGV4cG9uZW50aWFsIGNvbXBvbmVudC5cbmZvcihwb3NpdGlvbiA9IEluZGV4O3Bvc2l0aW9uIDwgbGVuZ3RoICYmIChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKSxjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7cG9zaXRpb24rKyk7aWYocG9zaXRpb24gPT0gSW5kZXgpeyAvLyBJbGxlZ2FsIGVtcHR5IGV4cG9uZW50LlxuYWJvcnQoKTt9SW5kZXggPSBwb3NpdGlvbjt9IC8vIENvZXJjZSB0aGUgcGFyc2VkIHZhbHVlIHRvIGEgSmF2YVNjcmlwdCBudW1iZXIuXG5yZXR1cm4gK3NvdXJjZS5zbGljZShiZWdpbixJbmRleCk7fSAvLyBBIG5lZ2F0aXZlIHNpZ24gbWF5IG9ubHkgcHJlY2VkZSBudW1iZXJzLlxuaWYoaXNTaWduZWQpe2Fib3J0KCk7fSAvLyBgdHJ1ZWAsIGBmYWxzZWAsIGFuZCBgbnVsbGAgbGl0ZXJhbHMuXG5pZihzb3VyY2Uuc2xpY2UoSW5kZXgsSW5kZXggKyA0KSA9PSBcInRydWVcIil7SW5kZXggKz0gNDtyZXR1cm4gdHJ1ZTt9ZWxzZSBpZihzb3VyY2Uuc2xpY2UoSW5kZXgsSW5kZXggKyA1KSA9PSBcImZhbHNlXCIpe0luZGV4ICs9IDU7cmV0dXJuIGZhbHNlO31lbHNlIGlmKHNvdXJjZS5zbGljZShJbmRleCxJbmRleCArIDQpID09IFwibnVsbFwiKXtJbmRleCArPSA0O3JldHVybiBudWxsO30gLy8gVW5yZWNvZ25pemVkIHRva2VuLlxuYWJvcnQoKTt9fSAvLyBSZXR1cm4gdGhlIHNlbnRpbmVsIGAkYCBjaGFyYWN0ZXIgaWYgdGhlIHBhcnNlciBoYXMgcmVhY2hlZCB0aGUgZW5kXG4vLyBvZiB0aGUgc291cmNlIHN0cmluZy5cbnJldHVybiBcIiRcIjt9OyAvLyBJbnRlcm5hbDogUGFyc2VzIGEgSlNPTiBgdmFsdWVgIHRva2VuLlxudmFyIGdldD1mdW5jdGlvbiBnZXQodmFsdWUpe3ZhciByZXN1bHRzLGhhc01lbWJlcnM7aWYodmFsdWUgPT0gXCIkXCIpeyAvLyBVbmV4cGVjdGVkIGVuZCBvZiBpbnB1dC5cbmFib3J0KCk7fWlmKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiKXtpZigoY2hhckluZGV4QnVnZ3k/dmFsdWUuY2hhckF0KDApOnZhbHVlWzBdKSA9PSBcIkBcIil7IC8vIFJlbW92ZSB0aGUgc2VudGluZWwgYEBgIGNoYXJhY3Rlci5cbnJldHVybiB2YWx1ZS5zbGljZSgxKTt9IC8vIFBhcnNlIG9iamVjdCBhbmQgYXJyYXkgbGl0ZXJhbHMuXG5pZih2YWx1ZSA9PSBcIltcIil7IC8vIFBhcnNlcyBhIEpTT04gYXJyYXksIHJldHVybmluZyBhIG5ldyBKYXZhU2NyaXB0IGFycmF5LlxucmVzdWx0cyA9IFtdO2Zvcig7O2hhc01lbWJlcnMgfHwgKGhhc01lbWJlcnMgPSB0cnVlKSkge3ZhbHVlID0gbGV4KCk7IC8vIEEgY2xvc2luZyBzcXVhcmUgYnJhY2tldCBtYXJrcyB0aGUgZW5kIG9mIHRoZSBhcnJheSBsaXRlcmFsLlxuaWYodmFsdWUgPT0gXCJdXCIpe2JyZWFrO30gLy8gSWYgdGhlIGFycmF5IGxpdGVyYWwgY29udGFpbnMgZWxlbWVudHMsIHRoZSBjdXJyZW50IHRva2VuXG4vLyBzaG91bGQgYmUgYSBjb21tYSBzZXBhcmF0aW5nIHRoZSBwcmV2aW91cyBlbGVtZW50IGZyb20gdGhlXG4vLyBuZXh0LlxuaWYoaGFzTWVtYmVycyl7aWYodmFsdWUgPT0gXCIsXCIpe3ZhbHVlID0gbGV4KCk7aWYodmFsdWUgPT0gXCJdXCIpeyAvLyBVbmV4cGVjdGVkIHRyYWlsaW5nIGAsYCBpbiBhcnJheSBsaXRlcmFsLlxuYWJvcnQoKTt9fWVsc2UgeyAvLyBBIGAsYCBtdXN0IHNlcGFyYXRlIGVhY2ggYXJyYXkgZWxlbWVudC5cbmFib3J0KCk7fX0gLy8gRWxpc2lvbnMgYW5kIGxlYWRpbmcgY29tbWFzIGFyZSBub3QgcGVybWl0dGVkLlxuaWYodmFsdWUgPT0gXCIsXCIpe2Fib3J0KCk7fXJlc3VsdHMucHVzaChnZXQodmFsdWUpKTt9cmV0dXJuIHJlc3VsdHM7fWVsc2UgaWYodmFsdWUgPT0gXCJ7XCIpeyAvLyBQYXJzZXMgYSBKU09OIG9iamVjdCwgcmV0dXJuaW5nIGEgbmV3IEphdmFTY3JpcHQgb2JqZWN0LlxucmVzdWx0cyA9IHt9O2Zvcig7O2hhc01lbWJlcnMgfHwgKGhhc01lbWJlcnMgPSB0cnVlKSkge3ZhbHVlID0gbGV4KCk7IC8vIEEgY2xvc2luZyBjdXJseSBicmFjZSBtYXJrcyB0aGUgZW5kIG9mIHRoZSBvYmplY3QgbGl0ZXJhbC5cbmlmKHZhbHVlID09IFwifVwiKXticmVhazt9IC8vIElmIHRoZSBvYmplY3QgbGl0ZXJhbCBjb250YWlucyBtZW1iZXJzLCB0aGUgY3VycmVudCB0b2tlblxuLy8gc2hvdWxkIGJlIGEgY29tbWEgc2VwYXJhdG9yLlxuaWYoaGFzTWVtYmVycyl7aWYodmFsdWUgPT0gXCIsXCIpe3ZhbHVlID0gbGV4KCk7aWYodmFsdWUgPT0gXCJ9XCIpeyAvLyBVbmV4cGVjdGVkIHRyYWlsaW5nIGAsYCBpbiBvYmplY3QgbGl0ZXJhbC5cbmFib3J0KCk7fX1lbHNlIHsgLy8gQSBgLGAgbXVzdCBzZXBhcmF0ZSBlYWNoIG9iamVjdCBtZW1iZXIuXG5hYm9ydCgpO319IC8vIExlYWRpbmcgY29tbWFzIGFyZSBub3QgcGVybWl0dGVkLCBvYmplY3QgcHJvcGVydHkgbmFtZXMgbXVzdCBiZVxuLy8gZG91YmxlLXF1b3RlZCBzdHJpbmdzLCBhbmQgYSBgOmAgbXVzdCBzZXBhcmF0ZSBlYWNoIHByb3BlcnR5XG4vLyBuYW1lIGFuZCB2YWx1ZS5cbmlmKHZhbHVlID09IFwiLFwiIHx8IHR5cGVvZiB2YWx1ZSAhPSBcInN0cmluZ1wiIHx8IChjaGFySW5kZXhCdWdneT92YWx1ZS5jaGFyQXQoMCk6dmFsdWVbMF0pICE9IFwiQFwiIHx8IGxleCgpICE9IFwiOlwiKXthYm9ydCgpO31yZXN1bHRzW3ZhbHVlLnNsaWNlKDEpXSA9IGdldChsZXgoKSk7fXJldHVybiByZXN1bHRzO30gLy8gVW5leHBlY3RlZCB0b2tlbiBlbmNvdW50ZXJlZC5cbmFib3J0KCk7fXJldHVybiB2YWx1ZTt9OyAvLyBJbnRlcm5hbDogVXBkYXRlcyBhIHRyYXZlcnNlZCBvYmplY3QgbWVtYmVyLlxudmFyIHVwZGF0ZT1mdW5jdGlvbiB1cGRhdGUoc291cmNlLHByb3BlcnR5LGNhbGxiYWNrKXt2YXIgZWxlbWVudD13YWxrKHNvdXJjZSxwcm9wZXJ0eSxjYWxsYmFjayk7aWYoZWxlbWVudCA9PT0gdW5kZWYpe2RlbGV0ZSBzb3VyY2VbcHJvcGVydHldO31lbHNlIHtzb3VyY2VbcHJvcGVydHldID0gZWxlbWVudDt9fTsgLy8gSW50ZXJuYWw6IFJlY3Vyc2l2ZWx5IHRyYXZlcnNlcyBhIHBhcnNlZCBKU09OIG9iamVjdCwgaW52b2tpbmcgdGhlXG4vLyBgY2FsbGJhY2tgIGZ1bmN0aW9uIGZvciBlYWNoIHZhbHVlLiBUaGlzIGlzIGFuIGltcGxlbWVudGF0aW9uIG9mIHRoZVxuLy8gYFdhbGsoaG9sZGVyLCBuYW1lKWAgb3BlcmF0aW9uIGRlZmluZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMi5cbnZhciB3YWxrPWZ1bmN0aW9uIHdhbGsoc291cmNlLHByb3BlcnR5LGNhbGxiYWNrKXt2YXIgdmFsdWU9c291cmNlW3Byb3BlcnR5XSxsZW5ndGg7aWYodHlwZW9mIHZhbHVlID09IFwib2JqZWN0XCIgJiYgdmFsdWUpeyAvLyBgZm9yRWFjaGAgY2FuJ3QgYmUgdXNlZCB0byB0cmF2ZXJzZSBhbiBhcnJheSBpbiBPcGVyYSA8PSA4LjU0XG4vLyBiZWNhdXNlIGl0cyBgT2JqZWN0I2hhc093blByb3BlcnR5YCBpbXBsZW1lbnRhdGlvbiByZXR1cm5zIGBmYWxzZWBcbi8vIGZvciBhcnJheSBpbmRpY2VzIChlLmcuLCBgIVsxLCAyLCAzXS5oYXNPd25Qcm9wZXJ0eShcIjBcIilgKS5cbmlmKGdldENsYXNzLmNhbGwodmFsdWUpID09IGFycmF5Q2xhc3Mpe2ZvcihsZW5ndGggPSB2YWx1ZS5sZW5ndGg7bGVuZ3RoLS07KSB7dXBkYXRlKHZhbHVlLGxlbmd0aCxjYWxsYmFjayk7fX1lbHNlIHtmb3JFYWNoKHZhbHVlLGZ1bmN0aW9uKHByb3BlcnR5KXt1cGRhdGUodmFsdWUscHJvcGVydHksY2FsbGJhY2spO30pO319cmV0dXJuIGNhbGxiYWNrLmNhbGwoc291cmNlLHByb3BlcnR5LHZhbHVlKTt9OyAvLyBQdWJsaWM6IGBKU09OLnBhcnNlYC4gU2VlIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjIuXG5leHBvcnRzLnBhcnNlID0gZnVuY3Rpb24oc291cmNlLGNhbGxiYWNrKXt2YXIgcmVzdWx0LHZhbHVlO0luZGV4ID0gMDtTb3VyY2UgPSBcIlwiICsgc291cmNlO3Jlc3VsdCA9IGdldChsZXgoKSk7IC8vIElmIGEgSlNPTiBzdHJpbmcgY29udGFpbnMgbXVsdGlwbGUgdG9rZW5zLCBpdCBpcyBpbnZhbGlkLlxuaWYobGV4KCkgIT0gXCIkXCIpe2Fib3J0KCk7fSAvLyBSZXNldCB0aGUgcGFyc2VyIHN0YXRlLlxuSW5kZXggPSBTb3VyY2UgPSBudWxsO3JldHVybiBjYWxsYmFjayAmJiBnZXRDbGFzcy5jYWxsKGNhbGxiYWNrKSA9PSBmdW5jdGlvbkNsYXNzP3dhbGsoKHZhbHVlID0ge30sdmFsdWVbXCJcIl0gPSByZXN1bHQsdmFsdWUpLFwiXCIsY2FsbGJhY2spOnJlc3VsdDt9O319ZXhwb3J0c1tcInJ1bkluQ29udGV4dFwiXSA9IHJ1bkluQ29udGV4dDtyZXR1cm4gZXhwb3J0czt9aWYoZnJlZUV4cG9ydHMgJiYgIWlzTG9hZGVyKXsgLy8gRXhwb3J0IGZvciBDb21tb25KUyBlbnZpcm9ubWVudHMuXG5ydW5JbkNvbnRleHQocm9vdCxmcmVlRXhwb3J0cyk7fWVsc2UgeyAvLyBFeHBvcnQgZm9yIHdlYiBicm93c2VycyBhbmQgSmF2YVNjcmlwdCBlbmdpbmVzLlxudmFyIG5hdGl2ZUpTT049cm9vdC5KU09OLHByZXZpb3VzSlNPTj1yb290W1wiSlNPTjNcIl0saXNSZXN0b3JlZD1mYWxzZTt2YXIgSlNPTjM9cnVuSW5Db250ZXh0KHJvb3Qscm9vdFtcIkpTT04zXCJdID0geyAvLyBQdWJsaWM6IFJlc3RvcmVzIHRoZSBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgZ2xvYmFsIGBKU09OYCBvYmplY3QgYW5kXG4vLyByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBgSlNPTjNgIG9iamVjdC5cblwibm9Db25mbGljdFwiOmZ1bmN0aW9uIG5vQ29uZmxpY3QoKXtpZighaXNSZXN0b3JlZCl7aXNSZXN0b3JlZCA9IHRydWU7cm9vdC5KU09OID0gbmF0aXZlSlNPTjtyb290W1wiSlNPTjNcIl0gPSBwcmV2aW91c0pTT047bmF0aXZlSlNPTiA9IHByZXZpb3VzSlNPTiA9IG51bGw7fXJldHVybiBKU09OMzt9fSk7cm9vdC5KU09OID0ge1wicGFyc2VcIjpKU09OMy5wYXJzZSxcInN0cmluZ2lmeVwiOkpTT04zLnN0cmluZ2lmeX07fSAvLyBFeHBvcnQgZm9yIGFzeW5jaHJvbm91cyBtb2R1bGUgbG9hZGVycy5cbmlmKGlzTG9hZGVyKXtkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gSlNPTjM7fSk7fX0pLmNhbGwodGhpcyk7fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se31dLDUxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXttb2R1bGUuZXhwb3J0cyA9IHRvQXJyYXk7ZnVuY3Rpb24gdG9BcnJheShsaXN0LGluZGV4KXt2YXIgYXJyYXk9W107aW5kZXggPSBpbmRleCB8fCAwO2Zvcih2YXIgaT1pbmRleCB8fCAwO2kgPCBsaXN0Lmxlbmd0aDtpKyspIHthcnJheVtpIC0gaW5kZXhdID0gbGlzdFtpXTt9cmV0dXJuIGFycmF5O319LHt9XX0se30sWzMxXSkoMzEpO30pO31cblxuY2MuX1JGcG9wKCk7Il19
