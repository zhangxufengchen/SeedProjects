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
},{}],"Card":[function(require,module,exports){
cc._RFpush(module, '98d48Z0qrVEv6aaRh6QNNZa', 'Card');
// Script\Game\Card.js

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

},{}]},{},["GameListCell","Game","HelloWorld","GameData","AudioManager","GameList","socket.io","Card","UserIcon","Tools","SigleImgBtn","Login"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9TY3JpcHQvdG9vbC9BdWRpb01hbmFnZXIuanMiLCJhc3NldHMvU2NyaXB0L0dhbWUvQ2FyZC5qcyIsImFzc2V0cy9TY3JpcHQvRGF0YS9HYW1lRGF0YS5qcyIsImFzc2V0cy9TY3JpcHQvR2FtZUxpc3QvR2FtZUxpc3RDZWxsLmpzIiwiYXNzZXRzL1NjcmlwdC9HYW1lTGlzdC9HYW1lTGlzdC5qcyIsImFzc2V0cy9TY3JpcHQvR2FtZS9HYW1lLmpzIiwiYXNzZXRzL1NjcmlwdC9IZWxsb1dvcmxkLmpzIiwiYXNzZXRzL1NjcmlwdC9Mb2dpbi9Mb2dpbi5qcyIsImFzc2V0cy9TY3JpcHQvY29udHJvbC9TaWdsZUltZ0J0bi5qcyIsImFzc2V0cy9TY3JpcHQvdG9vbC9Ub29scy5qcyIsImFzc2V0cy9TY3JpcHQvY29udHJvbC9Vc2VySWNvbi5qcyIsImFzc2V0cy9TY3JpcHQvdG9vbC9zb2NrZXQuaW8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzYzZjJmMXVmSE5JSkplbWVXVVVoZm01JywgJ0F1ZGlvTWFuYWdlcicpO1xuLy8gU2NyaXB0XFx0b29sXFxBdWRpb01hbmFnZXIuanNcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB3aW5BdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuXG4gICAgICAgIGxvc2VBdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuXG4gICAgICAgIGNhcmRBdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuXG4gICAgICAgIGJ1dHRvbkF1ZGlvOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hpcHNBdWRpbzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuXG4gICAgICAgIGJnbToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHBsYXlNdXNpYzogZnVuY3Rpb24gcGxheU11c2ljKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWModGhpcy5iZ20sIHRydWUpO1xuICAgIH0sXG5cbiAgICBwYXVzZU11c2ljOiBmdW5jdGlvbiBwYXVzZU11c2ljKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XG4gICAgfSxcblxuICAgIHJlc3VtZU11c2ljOiBmdW5jdGlvbiByZXN1bWVNdXNpYygpIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lTXVzaWMoKTtcbiAgICB9LFxuXG4gICAgX3BsYXlTRlg6IGZ1bmN0aW9uIF9wbGF5U0ZYKGNsaXApIHtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChjbGlwLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIHBsYXlXaW46IGZ1bmN0aW9uIHBsYXlXaW4oKSB7XG4gICAgICAgIHRoaXMuX3BsYXlTRlgodGhpcy53aW5BdWRpbyk7XG4gICAgfSxcblxuICAgIHBsYXlMb3NlOiBmdW5jdGlvbiBwbGF5TG9zZSgpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmxvc2VBdWRpbyk7XG4gICAgfSxcblxuICAgIHBsYXlDYXJkOiBmdW5jdGlvbiBwbGF5Q2FyZCgpIHtcbiAgICAgICAgdGhpcy5fcGxheVNGWCh0aGlzLmNhcmRBdWRpbyk7XG4gICAgfSxcblxuICAgIHBsYXlDaGlwczogZnVuY3Rpb24gcGxheUNoaXBzKCkge1xuICAgICAgICB0aGlzLl9wbGF5U0ZYKHRoaXMuY2hpcHNBdWRpbyk7XG4gICAgfSxcblxuICAgIHBsYXlCdXR0b246IGZ1bmN0aW9uIHBsYXlCdXR0b24oKSB7XG4gICAgICAgIHRoaXMuX3BsYXlTRlgodGhpcy5idXR0b25BdWRpbyk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnOThkNDhaMHFyVkV2NmFhUmg2UU5OWmEnLCAnQ2FyZCcpO1xuLy8gU2NyaXB0XFxHYW1lXFxDYXJkLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgQ0FSRF9UWVBFID0gY2MuRW51bSh7XG4gICAgT1dOOiAxLFxuICAgIExFRlQ6IDIsXG4gICAgUklHSFQ6IDMsXG4gICAgVVA6IDRcbn0pO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgQ2FyZElkOiAxLFxuICAgICAgICBDYXJkVHlwZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IENBUkRfVFlQRS5PV04sXG4gICAgICAgICAgICB0eXBlOiBDQVJEX1RZUEVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLkNhcmRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIENBUkRfVFlQRS5PV046XG4gICAgICAgICAgICAgICAgLy8gdmFyIGltZyA9ICdvd25fZG93bl8nK3RoaXMuR2FtZUlkLnRvU3RyaW5nKCkrJy5wbmcnO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGltZyk7XG4gICAgICAgICAgICAgICAgLy8gdmFyIGZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKGNjLnVybC5yYXcoaW1nKSk7XG4gICAgICAgICAgICAgICAgLy8gdmFyIGNvbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgICAgICAgICAgLy8gY29tLnNwcml0ZUZyYW1lID0gZnJhbWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG5cbiAgICAgICAgfVxuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICczNTYxMTM1aVFGT0VJZm9MVE84Rzg1UCcsICdHYW1lRGF0YScpO1xuLy8gU2NyaXB0XFxEYXRhXFxHYW1lRGF0YS5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnMTE3NjFmUDl5MURScWtNUXlCL2RRMUMnLCAnR2FtZUxpc3RDZWxsJyk7XG4vLyBTY3JpcHRcXEdhbWVMaXN0XFxHYW1lTGlzdENlbGwuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIE1haW5TY3JpcHROb2RlOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIEdhbWVJZDogMCxcbiAgICAgICAgQ29pbk51bTogMCxcbiAgICAgICAgTGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIFNwcml0ZUxpc3Q6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8vIHZhciBpbWcgPSAnUmVzb3VyY2UvVUkvcm9vbUJnJyt0aGlzLkdhbWVJZC50b1N0cmluZygpKycucG5nJztcbiAgICAgICAgLy8gY29uc29sZS5sb2coaW1nKTtcbiAgICAgICAgLy8gdmFyIGZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKGNjLnVybC5yYXcoaW1nKSk7XG5cbiAgICAgICAgdmFyIGNvbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIC8vY29tLnNwcml0ZUZyYW1lID0gZnJhbWU7XG5cbiAgICAgICAgY29tLnNwcml0ZUZyYW1lID0gdGhpcy5TcHJpdGVMaXN0W3RoaXMuR2FtZUlkXTtcblxuICAgICAgICB0aGlzLkxhYmVsLnN0cmluZyA9IHRoaXMuQ29pbk51bS50b1N0cmluZygpO1xuICAgIH0sXG4gICAgb25DZWxsQ2xpY2tlZDogZnVuY3Rpb24gb25DZWxsQ2xpY2tlZCgpIHtcbiAgICAgICAgdGhpcy5NYWluU2NyaXB0Tm9kZS5nZXRDb21wb25lbnQoJ0dhbWVMaXN0Jykub25HYW1lU2VsZWN0ZWQodGhpcy5HYW1lSWQpO1xuICAgIH1cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnNzI3MjNXdlVoRks4ckY3UC9IZUlOUWwnLCAnR2FtZUxpc3QnKTtcbi8vIFNjcmlwdFxcR2FtZUxpc3RcXEdhbWVMaXN0LmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBhdWRpb01hbmFnZXI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgTGlzdExheW91dDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGF5b3V0XG4gICAgICAgIH0sXG4gICAgICAgIENlbGxfcHJlZmFiOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZWxmOiBudWxsLFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuYXVkaW9NYW5hZ2VyID0gdGhpcy5hdWRpb01hbmFnZXIuZ2V0Q29tcG9uZW50KCdBdWRpb01hbmFnZXInKTtcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIucGxheU11c2ljKCk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgICAgICAgdmFyIG5ld0NlbGwgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLkNlbGxfcHJlZmFiKTtcblxuICAgICAgICAgICAgbmV3Q2VsbC5nZXRDb21wb25lbnQoJ0dhbWVMaXN0Q2VsbCcpLkdhbWVJZCA9IGk7XG4gICAgICAgICAgICBuZXdDZWxsLmdldENvbXBvbmVudCgnR2FtZUxpc3RDZWxsJykuQ29pbk51bSA9IDEwMCAqIGk7XG4gICAgICAgICAgICBuZXdDZWxsLmdldENvbXBvbmVudCgnR2FtZUxpc3RDZWxsJykuTWFpblNjcmlwdE5vZGUgPSB0aGlzO1xuXG4gICAgICAgICAgICB0aGlzLkxpc3RMYXlvdXQubm9kZS5hZGRDaGlsZChuZXdDZWxsKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5MaXN0TGF5b3V0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkdhbWVTZWxlY3RlZDogZnVuY3Rpb24gb25HYW1lU2VsZWN0ZWQoZ2FtZWlkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGdhbWVpZCArICfooqvpgInmi6knKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdHYW1lJyk7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzI3MGNmWkJjU0ZHdGJST3VYNHhaa3M3JywgJ0dhbWUnKTtcbi8vIFNjcmlwdFxcR2FtZVxcR2FtZS5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYXVkaW9NYW5hZ2VyOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuYXVkaW9NYW5hZ2VyID0gdGhpcy5hdWRpb01hbmFnZXIuZ2V0Q29tcG9uZW50KCdBdWRpb01hbmFnZXInKTtcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIucGxheU11c2ljKCk7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzI4MGMzcnNaSkpLblo5UnFiQUxWd3RLJywgJ0hlbGxvV29ybGQnKTtcbi8vIFNjcmlwdFxcSGVsbG9Xb3JsZC5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciByb290ID0gdGhpcztcblxuICAgICAgICBpZiAoY2MuaXNOYXRpdmUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5pbyA9IFNvY2tldElPO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxdWlyZSgnc29ja2V0LmlvJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNvY2tldCA9IGlvKCdodHRwOi8vbG9jYWxob3N0OjMwMDAnKTtcbiAgICAgICAgc29ja2V0Lm9uKCfmtojmga8nLCBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzb2NrZXQuZW1pdCgn55m75b2VJywgJ21lc3NhZ2UnKTtcbiAgICAgICAgc29ja2V0LmVtaXQoJ+a2iOaBrycsICcxMjMxNjE2MTY1MTYnKTtcblxuICAgICAgICAvL2h0dHAgZ2V0XG5cbiAgICAgICAgLy8gdmFyIHhociA9IGNjLmxvYWRlci5nZXRYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAvLyB4aHIub3BlbignR0VUJywnaHR0cDovL2h0dHBiaW4ub3JnL2dldD9zaG93X2Vudj0xJyx0cnVlKTtcblxuICAgICAgICAvLyB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIC8vICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8PSAyMDcpKSB7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGh0dHBTdGF0dXMgPSB4aHIuc3RhdHVzVGV4dDtcbiAgICAgICAgLy8gICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0LnN1YnN0cmluZygwLCAxMDApICsgXCIuLi5cIjtcbiAgICAgICAgLy8gICAgICAgICByb290LmxhYmVsLnN0cmluZyA9IHJlc3BvbnNlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIC8vIHhoci5zZW5kKCk7XG5cbiAgICAgICAgLy9odHRwIHBvc3RcbiAgICAgICAgLy8geGhyLm9wZW4oXCJQT1NUXCIsIFwiaHR0cDovL2h0dHBiaW4ub3JnL3Bvc3RcIik7XG4gICAgICAgIC8vIC8vc2V0IENvbnRlbnQtdHlwZSBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiIHRvIHBvc3QgcGxhaW4gdGV4dFxuICAgICAgICAvLyB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xuICAgICAgICAvLyB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPD0gMjA3KSkge1xuICAgICAgICAvLyAgICAgICAgIHZhciBodHRwU3RhdHVzID0geGhyLnN0YXR1c1RleHQ7XG4gICAgICAgIC8vICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dC5zdWJzdHJpbmcoMCwgMTAwKSArIFwiLi4uXCI7XG4gICAgICAgIC8vICAgICAgICAgcm9vdC5sYWJlbC5zdHJpbmcgPSByZXNwb25zZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfTtcbiAgICAgICAgLy8geGhyLnNlbmQoXCJwbGFpbiB0ZXh0IG1lc3NhZ2VcIik7XG5cbiAgICAgICAgLy8gc29ja2V0XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnYmYyNjlTSE9kVkJ2THlhbXRIamVneGcnLCAnTG9naW4nKTtcbi8vIFNjcmlwdFxcTG9naW5cXExvZ2luLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICByZWdpc3RlckxheWVyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYXVkaW9NYW5hZ2VyOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5hdWRpb01hbmFnZXIgPSB0aGlzLmF1ZGlvTWFuYWdlci5nZXRDb21wb25lbnQoJ0F1ZGlvTWFuYWdlcicpO1xuICAgICAgICB0aGlzLmF1ZGlvTWFuYWdlci5wbGF5TXVzaWMoKTtcbiAgICB9LFxuXG4gICAgb25Mb2dJbjogZnVuY3Rpb24gb25Mb2dJbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2dJblwiKTtcbiAgICB9LFxuXG4gICAgb25RdWlja0xvZ0luOiBmdW5jdGlvbiBvblF1aWNrTG9nSW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUVVpY2tsb2dJblwiKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdHYW1lTGlzdCcpO1xuICAgIH0sXG5cbiAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiBvblJlZ2lzdGVyKCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25SZWdpc3RlckNsb3NlOiBmdW5jdGlvbiBvblJlZ2lzdGVyQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJMYXllci5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnYTMxMGJlS2t3WkFwYTVyS1VNVERpWS8nLCAnU2lnbGVJbWdCdG4nKTtcbi8vIFNjcmlwdFxcY29udHJvbFxcU2lnbGVJbWdCdG4uanNcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge30sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIoe1xuICAgICAgICAgICAgZXZlbnQ6IGNjLkV2ZW50TGlzdGVuZXIuVE9VQ0hfT05FX0JZX09ORSxcbiAgICAgICAgICAgIHN3YWxsb3dUb3VjaGVzOiB0cnVlLFxuICAgICAgICAgICAgb25Ub3VjaEJlZ2FuOiBmdW5jdGlvbiBvblRvdWNoQmVnYW4odG91Y2gsIGV2ZW50KSB7XG5cbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUuc2V0U2NhbGUoMik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGFmZFwiKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVG91Y2hFbmQ6IGZ1bmN0aW9uIG9uVG91Y2hFbmQodG91Y2gsIGV2ZW50KSB7XG5cbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUuc2V0U2NhbGUoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNlbGYubm9kZSk7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2EwZjc2dU1IZ2hHd3I2L1ZmbkNvd1dXJywgJ1Rvb2xzJyk7XG4vLyBTY3JpcHRcXHRvb2xcXFRvb2xzLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcbiAgICBHZXRSYW5kb21OdW06IGZ1bmN0aW9uIEdldFJhbmRvbU51bShNaW4sIE1heCkge1xuICAgICAgICB2YXIgUmFuZ2UgPSBNYXggLSBNaW47XG4gICAgICAgIHZhciBSYW5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgcmV0dXJuIE1pbiArIE1hdGgucm91bmQoUmFuZCAqIFJhbmdlKTtcbiAgICB9XG59KTtcblxuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBHZXRSYW5kb21OdW06IGZ1bmN0aW9uIEdldFJhbmRvbU51bShNaW4sIE1heCkge1xuICAgICAgICB2YXIgUmFuZ2UgPSBNYXggLSBNaW47XG4gICAgICAgIHZhciBSYW5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgcmV0dXJuIE1pbiArIE1hdGgucm91bmQoUmFuZCAqIFJhbmdlKTtcbiAgICB9XG59O1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzlhMDQ5NkNndjlBaUtydVQ1WWJMbkpWJywgJ1VzZXJJY29uJyk7XG4vLyBTY3JpcHRcXGNvbnRyb2xcXFVzZXJJY29uLmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgSWNvbkluZGV4OiAwLFxuICAgICAgICBTcHJpdGVMaXN0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgY29tID0gdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgaWYgKHRoaXMuSWNvbkluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICB2YXIgdG9vbHMgPSByZXF1aXJlKCdUb29scycpO1xuICAgICAgICAgICAgdGhpcy5JY29uSW5kZXggPSB0b29scy5HZXRSYW5kb21OdW0oMCwgdGhpcy5TcHJpdGVMaXN0Lmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbS5zcHJpdGVGcmFtZSA9IHRoaXMuU3ByaXRlTGlzdFt0aGlzLkljb25JbmRleF07XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzdiYzUxYTVGek5FbkpWVFl5SXZUMzhEJywgJ3NvY2tldC5pbycpO1xuLy8gU2NyaXB0XFx0b29sXFxzb2NrZXQuaW8uanNcblxuXCJ1c2Ugc3RyaWN0XCI7aWYoIWNjLnN5cy5pc05hdGl2ZSl7KGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzID0gZigpO31lbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKXtkZWZpbmUoW10sZik7fWVsc2Uge3ZhciBnO2lmKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpe2cgPSB3aW5kb3c7fWVsc2UgaWYodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIil7ZyA9IGdsb2JhbDt9ZWxzZSBpZih0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7ZyA9IHNlbGY7fWVsc2Uge2cgPSB0aGlzO31nLmlvID0gZigpO319KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZSA9PSBcImZ1bmN0aW9uXCIgJiYgcmVxdWlyZTtpZighdSAmJiBhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG8gKyBcIidcIik7dGhyb3cgKGYuY29kZSA9IFwiTU9EVUxFX05PVF9GT1VORFwiLGYpO312YXIgbD1uW29dID0ge2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSk7fSxsLGwuZXhwb3J0cyxlLHQsbixyKTt9cmV0dXJuIG5bb10uZXhwb3J0czt9dmFyIGk9dHlwZW9mIHJlcXVpcmUgPT0gXCJmdW5jdGlvblwiICYmIHJlcXVpcmU7Zm9yKHZhciBvPTA7byA8IHIubGVuZ3RoO28rKykgcyhyW29dKTtyZXR1cm4gczt9KSh7MTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHMgPSBfZGVyZXFfKCcuL2xpYi8nKTt9LHtcIi4vbGliL1wiOjJ9XSwyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXttb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oJy4vc29ja2V0Jyk7IC8qKlxyXG4gKiBFeHBvcnRzIHBhcnNlclxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKlxyXG4gKi9tb2R1bGUuZXhwb3J0cy5wYXJzZXIgPSBfZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7fSx7XCIuL3NvY2tldFwiOjMsXCJlbmdpbmUuaW8tcGFyc2VyXCI6MTl9XSwzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL3ZhciB0cmFuc3BvcnRzPV9kZXJlcV8oJy4vdHJhbnNwb3J0cycpO3ZhciBFbWl0dGVyPV9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7dmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6c29ja2V0Jyk7dmFyIGluZGV4PV9kZXJlcV8oJ2luZGV4b2YnKTt2YXIgcGFyc2VyPV9kZXJlcV8oJ2VuZ2luZS5pby1wYXJzZXInKTt2YXIgcGFyc2V1cmk9X2RlcmVxXygncGFyc2V1cmknKTt2YXIgcGFyc2Vqc29uPV9kZXJlcV8oJ3BhcnNlanNvbicpO3ZhciBwYXJzZXFzPV9kZXJlcV8oJ3BhcnNlcXMnKTsgLyoqXHJcbiAqIE1vZHVsZSBleHBvcnRzLlxyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IFNvY2tldDsgLyoqXHJcbiAqIE5vb3AgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBub29wKCl7fSAvKipcclxuICogU29ja2V0IGNvbnN0cnVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIFNvY2tldCh1cmksb3B0cyl7aWYoISh0aGlzIGluc3RhbmNlb2YgU29ja2V0KSlyZXR1cm4gbmV3IFNvY2tldCh1cmksb3B0cyk7b3B0cyA9IG9wdHMgfHwge307aWYodXJpICYmICdvYmplY3QnID09IHR5cGVvZiB1cmkpe29wdHMgPSB1cmk7dXJpID0gbnVsbDt9aWYodXJpKXt1cmkgPSBwYXJzZXVyaSh1cmkpO29wdHMuaG9zdG5hbWUgPSB1cmkuaG9zdDtvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PSAnaHR0cHMnIHx8IHVyaS5wcm90b2NvbCA9PSAnd3NzJztvcHRzLnBvcnQgPSB1cmkucG9ydDtpZih1cmkucXVlcnkpb3B0cy5xdWVyeSA9IHVyaS5xdWVyeTt9ZWxzZSBpZihvcHRzLmhvc3Qpe29wdHMuaG9zdG5hbWUgPSBwYXJzZXVyaShvcHRzLmhvc3QpLmhvc3Q7fXRoaXMuc2VjdXJlID0gbnVsbCAhPSBvcHRzLnNlY3VyZT9vcHRzLnNlY3VyZTpnbG9iYWwubG9jYXRpb24gJiYgJ2h0dHBzOicgPT0gbG9jYXRpb24ucHJvdG9jb2w7aWYob3B0cy5ob3N0bmFtZSAmJiAhb3B0cy5wb3J0KXsgLy8gaWYgbm8gcG9ydCBpcyBzcGVjaWZpZWQgbWFudWFsbHksIHVzZSB0aGUgcHJvdG9jb2wgZGVmYXVsdFxub3B0cy5wb3J0ID0gdGhpcy5zZWN1cmU/JzQ0Myc6JzgwJzt9dGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7dGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWUgfHwgKGdsb2JhbC5sb2NhdGlvbj9sb2NhdGlvbi5ob3N0bmFtZTonbG9jYWxob3N0Jyk7dGhpcy5wb3J0ID0gb3B0cy5wb3J0IHx8IChnbG9iYWwubG9jYXRpb24gJiYgbG9jYXRpb24ucG9ydD9sb2NhdGlvbi5wb3J0OnRoaXMuc2VjdXJlPzQ0Mzo4MCk7dGhpcy5xdWVyeSA9IG9wdHMucXVlcnkgfHwge307aWYoJ3N0cmluZycgPT0gdHlwZW9mIHRoaXMucXVlcnkpdGhpcy5xdWVyeSA9IHBhcnNlcXMuZGVjb2RlKHRoaXMucXVlcnkpO3RoaXMudXBncmFkZSA9IGZhbHNlICE9PSBvcHRzLnVwZ3JhZGU7dGhpcy5wYXRoID0gKG9wdHMucGF0aCB8fCAnL2VuZ2luZS5pbycpLnJlcGxhY2UoL1xcLyQvLCcnKSArICcvJzt0aGlzLmZvcmNlSlNPTlAgPSAhIW9wdHMuZm9yY2VKU09OUDt0aGlzLmpzb25wID0gZmFsc2UgIT09IG9wdHMuanNvbnA7dGhpcy5mb3JjZUJhc2U2NCA9ICEhb3B0cy5mb3JjZUJhc2U2NDt0aGlzLmVuYWJsZXNYRFIgPSAhIW9wdHMuZW5hYmxlc1hEUjt0aGlzLnRpbWVzdGFtcFBhcmFtID0gb3B0cy50aW1lc3RhbXBQYXJhbSB8fCAndCc7dGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7dGhpcy50cmFuc3BvcnRzID0gb3B0cy50cmFuc3BvcnRzIHx8IFsncG9sbGluZycsJ3dlYnNvY2tldCddO3RoaXMucmVhZHlTdGF0ZSA9ICcnO3RoaXMud3JpdGVCdWZmZXIgPSBbXTt0aGlzLnBvbGljeVBvcnQgPSBvcHRzLnBvbGljeVBvcnQgfHwgODQzO3RoaXMucmVtZW1iZXJVcGdyYWRlID0gb3B0cy5yZW1lbWJlclVwZ3JhZGUgfHwgZmFsc2U7dGhpcy5iaW5hcnlUeXBlID0gbnVsbDt0aGlzLm9ubHlCaW5hcnlVcGdyYWRlcyA9IG9wdHMub25seUJpbmFyeVVwZ3JhZGVzO3RoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBmYWxzZSAhPT0gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZT9vcHRzLnBlck1lc3NhZ2VEZWZsYXRlIHx8IHt9OmZhbHNlO2lmKHRydWUgPT09IHRoaXMucGVyTWVzc2FnZURlZmxhdGUpdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSA9IHt9O2lmKHRoaXMucGVyTWVzc2FnZURlZmxhdGUgJiYgbnVsbCA9PSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCl7dGhpcy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQgPSAxMDI0O30gLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG50aGlzLnBmeCA9IG9wdHMucGZ4IHx8IG51bGw7dGhpcy5rZXkgPSBvcHRzLmtleSB8fCBudWxsO3RoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZSB8fCBudWxsO3RoaXMuY2VydCA9IG9wdHMuY2VydCB8fCBudWxsO3RoaXMuY2EgPSBvcHRzLmNhIHx8IG51bGw7dGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzIHx8IG51bGw7dGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9PT0gdW5kZWZpbmVkP251bGw6b3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7IC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG52YXIgZnJlZUdsb2JhbD10eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtpZihmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCl7aWYob3B0cy5leHRyYUhlYWRlcnMgJiYgT2JqZWN0LmtleXMob3B0cy5leHRyYUhlYWRlcnMpLmxlbmd0aCA+IDApe3RoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7fX10aGlzLm9wZW4oKTt9U29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlOyAvKipcclxuICogTWl4IGluIGBFbWl0dGVyYC5cclxuICovRW1pdHRlcihTb2NrZXQucHJvdG90eXBlKTsgLyoqXHJcbiAqIFByb3RvY29sIHZlcnNpb24uXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1NvY2tldC5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDsgLy8gdGhpcyBpcyBhbiBpbnRcbi8qKlxyXG4gKiBFeHBvc2UgZGVwcyBmb3IgbGVnYWN5IGNvbXBhdGliaWxpdHlcclxuICogYW5kIHN0YW5kYWxvbmUgYnJvd3NlciBhY2Nlc3MuXHJcbiAqL1NvY2tldC5Tb2NrZXQgPSBTb2NrZXQ7U29ja2V0LlRyYW5zcG9ydCA9IF9kZXJlcV8oJy4vdHJhbnNwb3J0Jyk7U29ja2V0LnRyYW5zcG9ydHMgPSBfZGVyZXFfKCcuL3RyYW5zcG9ydHMnKTtTb2NrZXQucGFyc2VyID0gX2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpOyAvKipcclxuICogQ3JlYXRlcyB0cmFuc3BvcnQgb2YgdGhlIGdpdmVuIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxyXG4gKiBAcmV0dXJuIHtUcmFuc3BvcnR9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLmNyZWF0ZVRyYW5zcG9ydCA9IGZ1bmN0aW9uKG5hbWUpe2RlYnVnKCdjcmVhdGluZyB0cmFuc3BvcnQgXCIlc1wiJyxuYW1lKTt2YXIgcXVlcnk9Y2xvbmUodGhpcy5xdWVyeSk7IC8vIGFwcGVuZCBlbmdpbmUuaW8gcHJvdG9jb2wgaWRlbnRpZmllclxucXVlcnkuRUlPID0gcGFyc2VyLnByb3RvY29sOyAvLyB0cmFuc3BvcnQgbmFtZVxucXVlcnkudHJhbnNwb3J0ID0gbmFtZTsgLy8gc2Vzc2lvbiBpZCBpZiB3ZSBhbHJlYWR5IGhhdmUgb25lXG5pZih0aGlzLmlkKXF1ZXJ5LnNpZCA9IHRoaXMuaWQ7dmFyIHRyYW5zcG9ydD1uZXcgdHJhbnNwb3J0c1tuYW1lXSh7YWdlbnQ6dGhpcy5hZ2VudCxob3N0bmFtZTp0aGlzLmhvc3RuYW1lLHBvcnQ6dGhpcy5wb3J0LHNlY3VyZTp0aGlzLnNlY3VyZSxwYXRoOnRoaXMucGF0aCxxdWVyeTpxdWVyeSxmb3JjZUpTT05QOnRoaXMuZm9yY2VKU09OUCxqc29ucDp0aGlzLmpzb25wLGZvcmNlQmFzZTY0OnRoaXMuZm9yY2VCYXNlNjQsZW5hYmxlc1hEUjp0aGlzLmVuYWJsZXNYRFIsdGltZXN0YW1wUmVxdWVzdHM6dGhpcy50aW1lc3RhbXBSZXF1ZXN0cyx0aW1lc3RhbXBQYXJhbTp0aGlzLnRpbWVzdGFtcFBhcmFtLHBvbGljeVBvcnQ6dGhpcy5wb2xpY3lQb3J0LHNvY2tldDp0aGlzLHBmeDp0aGlzLnBmeCxrZXk6dGhpcy5rZXkscGFzc3BocmFzZTp0aGlzLnBhc3NwaHJhc2UsY2VydDp0aGlzLmNlcnQsY2E6dGhpcy5jYSxjaXBoZXJzOnRoaXMuY2lwaGVycyxyZWplY3RVbmF1dGhvcml6ZWQ6dGhpcy5yZWplY3RVbmF1dGhvcml6ZWQscGVyTWVzc2FnZURlZmxhdGU6dGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSxleHRyYUhlYWRlcnM6dGhpcy5leHRyYUhlYWRlcnN9KTtyZXR1cm4gdHJhbnNwb3J0O307ZnVuY3Rpb24gY2xvbmUob2JqKXt2YXIgbz17fTtmb3IodmFyIGkgaW4gb2JqKSB7aWYob2JqLmhhc093blByb3BlcnR5KGkpKXtvW2ldID0gb2JqW2ldO319cmV0dXJuIG87fSAvKipcclxuICogSW5pdGlhbGl6ZXMgdHJhbnNwb3J0IHRvIHVzZSBhbmQgc3RhcnRzIHByb2JlLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKXt2YXIgdHJhbnNwb3J0O2lmKHRoaXMucmVtZW1iZXJVcGdyYWRlICYmIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiYgdGhpcy50cmFuc3BvcnRzLmluZGV4T2YoJ3dlYnNvY2tldCcpICE9IC0xKXt0cmFuc3BvcnQgPSAnd2Vic29ja2V0Jzt9ZWxzZSBpZigwID09PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKXsgLy8gRW1pdCBlcnJvciBvbiBuZXh0IHRpY2sgc28gaXQgY2FuIGJlIGxpc3RlbmVkIHRvXG52YXIgc2VsZj10aGlzO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtzZWxmLmVtaXQoJ2Vycm9yJywnTm8gdHJhbnNwb3J0cyBhdmFpbGFibGUnKTt9LDApO3JldHVybjt9ZWxzZSB7dHJhbnNwb3J0ID0gdGhpcy50cmFuc3BvcnRzWzBdO310aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7IC8vIFJldHJ5IHdpdGggdGhlIG5leHQgdHJhbnNwb3J0IGlmIHRoZSB0cmFuc3BvcnQgaXMgZGlzYWJsZWQgKGpzb25wOiBmYWxzZSlcbnRyeXt0cmFuc3BvcnQgPSB0aGlzLmNyZWF0ZVRyYW5zcG9ydCh0cmFuc3BvcnQpO31jYXRjaChlKSB7dGhpcy50cmFuc3BvcnRzLnNoaWZ0KCk7dGhpcy5vcGVuKCk7cmV0dXJuO310cmFuc3BvcnQub3BlbigpO3RoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7fTsgLyoqXHJcbiAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0LiBEaXNhYmxlcyB0aGUgZXhpc3Rpbmcgb25lIChpZiBhbnkpLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5zZXRUcmFuc3BvcnQgPSBmdW5jdGlvbih0cmFuc3BvcnQpe2RlYnVnKCdzZXR0aW5nIHRyYW5zcG9ydCAlcycsdHJhbnNwb3J0Lm5hbWUpO3ZhciBzZWxmPXRoaXM7aWYodGhpcy50cmFuc3BvcnQpe2RlYnVnKCdjbGVhcmluZyBleGlzdGluZyB0cmFuc3BvcnQgJXMnLHRoaXMudHJhbnNwb3J0Lm5hbWUpO3RoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO30gLy8gc2V0IHVwIHRyYW5zcG9ydFxudGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7IC8vIHNldCB1cCB0cmFuc3BvcnQgbGlzdGVuZXJzXG50cmFuc3BvcnQub24oJ2RyYWluJyxmdW5jdGlvbigpe3NlbGYub25EcmFpbigpO30pLm9uKCdwYWNrZXQnLGZ1bmN0aW9uKHBhY2tldCl7c2VsZi5vblBhY2tldChwYWNrZXQpO30pLm9uKCdlcnJvcicsZnVuY3Rpb24oZSl7c2VsZi5vbkVycm9yKGUpO30pLm9uKCdjbG9zZScsZnVuY3Rpb24oKXtzZWxmLm9uQ2xvc2UoJ3RyYW5zcG9ydCBjbG9zZScpO30pO307IC8qKlxyXG4gKiBQcm9iZXMgYSB0cmFuc3BvcnQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5wcm9iZSA9IGZ1bmN0aW9uKG5hbWUpe2RlYnVnKCdwcm9iaW5nIHRyYW5zcG9ydCBcIiVzXCInLG5hbWUpO3ZhciB0cmFuc3BvcnQ9dGhpcy5jcmVhdGVUcmFuc3BvcnQobmFtZSx7cHJvYmU6MX0pLGZhaWxlZD1mYWxzZSxzZWxmPXRoaXM7U29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO2Z1bmN0aW9uIG9uVHJhbnNwb3J0T3Blbigpe2lmKHNlbGYub25seUJpbmFyeVVwZ3JhZGVzKXt2YXIgdXBncmFkZUxvc2VzQmluYXJ5PSF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmIHNlbGYudHJhbnNwb3J0LnN1cHBvcnRzQmluYXJ5O2ZhaWxlZCA9IGZhaWxlZCB8fCB1cGdyYWRlTG9zZXNCaW5hcnk7fWlmKGZhaWxlZClyZXR1cm47ZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgb3BlbmVkJyxuYW1lKTt0cmFuc3BvcnQuc2VuZChbe3R5cGU6J3BpbmcnLGRhdGE6J3Byb2JlJ31dKTt0cmFuc3BvcnQub25jZSgncGFja2V0JyxmdW5jdGlvbihtc2cpe2lmKGZhaWxlZClyZXR1cm47aWYoJ3BvbmcnID09IG1zZy50eXBlICYmICdwcm9iZScgPT0gbXNnLmRhdGEpe2RlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIHBvbmcnLG5hbWUpO3NlbGYudXBncmFkaW5nID0gdHJ1ZTtzZWxmLmVtaXQoJ3VwZ3JhZGluZycsdHJhbnNwb3J0KTtpZighdHJhbnNwb3J0KXJldHVybjtTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gJ3dlYnNvY2tldCcgPT0gdHJhbnNwb3J0Lm5hbWU7ZGVidWcoJ3BhdXNpbmcgY3VycmVudCB0cmFuc3BvcnQgXCIlc1wiJyxzZWxmLnRyYW5zcG9ydC5uYW1lKTtzZWxmLnRyYW5zcG9ydC5wYXVzZShmdW5jdGlvbigpe2lmKGZhaWxlZClyZXR1cm47aWYoJ2Nsb3NlZCcgPT0gc2VsZi5yZWFkeVN0YXRlKXJldHVybjtkZWJ1ZygnY2hhbmdpbmcgdHJhbnNwb3J0IGFuZCBzZW5kaW5nIHVwZ3JhZGUgcGFja2V0Jyk7Y2xlYW51cCgpO3NlbGYuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7dHJhbnNwb3J0LnNlbmQoW3t0eXBlOid1cGdyYWRlJ31dKTtzZWxmLmVtaXQoJ3VwZ3JhZGUnLHRyYW5zcG9ydCk7dHJhbnNwb3J0ID0gbnVsbDtzZWxmLnVwZ3JhZGluZyA9IGZhbHNlO3NlbGYuZmx1c2goKTt9KTt9ZWxzZSB7ZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgZmFpbGVkJyxuYW1lKTt2YXIgZXJyPW5ldyBFcnJvcigncHJvYmUgZXJyb3InKTtlcnIudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7c2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLGVycik7fX0pO31mdW5jdGlvbiBmcmVlemVUcmFuc3BvcnQoKXtpZihmYWlsZWQpcmV0dXJuOyAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbmZhaWxlZCA9IHRydWU7Y2xlYW51cCgpO3RyYW5zcG9ydC5jbG9zZSgpO3RyYW5zcG9ydCA9IG51bGw7fSAvL0hhbmRsZSBhbnkgZXJyb3IgdGhhdCBoYXBwZW5zIHdoaWxlIHByb2JpbmdcbmZ1bmN0aW9uIG9uZXJyb3IoZXJyKXt2YXIgZXJyb3I9bmV3IEVycm9yKCdwcm9iZSBlcnJvcjogJyArIGVycik7ZXJyb3IudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7ZnJlZXplVHJhbnNwb3J0KCk7ZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgZmFpbGVkIGJlY2F1c2Ugb2YgZXJyb3I6ICVzJyxuYW1lLGVycik7c2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLGVycm9yKTt9ZnVuY3Rpb24gb25UcmFuc3BvcnRDbG9zZSgpe29uZXJyb3IoXCJ0cmFuc3BvcnQgY2xvc2VkXCIpO30gLy9XaGVuIHRoZSBzb2NrZXQgaXMgY2xvc2VkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbmZ1bmN0aW9uIG9uY2xvc2UoKXtvbmVycm9yKFwic29ja2V0IGNsb3NlZFwiKTt9IC8vV2hlbiB0aGUgc29ja2V0IGlzIHVwZ3JhZGVkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbmZ1bmN0aW9uIG9udXBncmFkZSh0byl7aWYodHJhbnNwb3J0ICYmIHRvLm5hbWUgIT0gdHJhbnNwb3J0Lm5hbWUpe2RlYnVnKCdcIiVzXCIgd29ya3MgLSBhYm9ydGluZyBcIiVzXCInLHRvLm5hbWUsdHJhbnNwb3J0Lm5hbWUpO2ZyZWV6ZVRyYW5zcG9ydCgpO319IC8vUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgb24gdGhlIHRyYW5zcG9ydCBhbmQgb24gc2VsZlxuZnVuY3Rpb24gY2xlYW51cCgpe3RyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignb3Blbicsb25UcmFuc3BvcnRPcGVuKTt0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJyxvbmVycm9yKTt0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJyxvblRyYW5zcG9ydENsb3NlKTtzZWxmLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsb25jbG9zZSk7c2VsZi5yZW1vdmVMaXN0ZW5lcigndXBncmFkaW5nJyxvbnVwZ3JhZGUpO310cmFuc3BvcnQub25jZSgnb3Blbicsb25UcmFuc3BvcnRPcGVuKTt0cmFuc3BvcnQub25jZSgnZXJyb3InLG9uZXJyb3IpO3RyYW5zcG9ydC5vbmNlKCdjbG9zZScsb25UcmFuc3BvcnRDbG9zZSk7dGhpcy5vbmNlKCdjbG9zZScsb25jbG9zZSk7dGhpcy5vbmNlKCd1cGdyYWRpbmcnLG9udXBncmFkZSk7dHJhbnNwb3J0Lm9wZW4oKTt9OyAvKipcclxuICogQ2FsbGVkIHdoZW4gY29ubmVjdGlvbiBpcyBkZWVtZWQgb3Blbi5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovU29ja2V0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbigpe2RlYnVnKCdzb2NrZXQgb3BlbicpO3RoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJztTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gJ3dlYnNvY2tldCcgPT0gdGhpcy50cmFuc3BvcnQubmFtZTt0aGlzLmVtaXQoJ29wZW4nKTt0aGlzLmZsdXNoKCk7IC8vIHdlIGNoZWNrIGZvciBgcmVhZHlTdGF0ZWAgaW4gY2FzZSBhbiBgb3BlbmBcbi8vIGxpc3RlbmVyIGFscmVhZHkgY2xvc2VkIHRoZSBzb2NrZXRcbmlmKCdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUgJiYgdGhpcy51cGdyYWRlICYmIHRoaXMudHJhbnNwb3J0LnBhdXNlKXtkZWJ1Zygnc3RhcnRpbmcgdXBncmFkZSBwcm9iZXMnKTtmb3IodmFyIGk9MCxsPXRoaXMudXBncmFkZXMubGVuZ3RoO2kgPCBsO2krKykge3RoaXMucHJvYmUodGhpcy51cGdyYWRlc1tpXSk7fX19OyAvKipcclxuICogSGFuZGxlcyBhIHBhY2tldC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQpe2lmKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSl7ZGVidWcoJ3NvY2tldCByZWNlaXZlOiB0eXBlIFwiJXNcIiwgZGF0YSBcIiVzXCInLHBhY2tldC50eXBlLHBhY2tldC5kYXRhKTt0aGlzLmVtaXQoJ3BhY2tldCcscGFja2V0KTsgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xudGhpcy5lbWl0KCdoZWFydGJlYXQnKTtzd2l0Y2gocGFja2V0LnR5cGUpe2Nhc2UgJ29wZW4nOnRoaXMub25IYW5kc2hha2UocGFyc2Vqc29uKHBhY2tldC5kYXRhKSk7YnJlYWs7Y2FzZSAncG9uZyc6dGhpcy5zZXRQaW5nKCk7dGhpcy5lbWl0KCdwb25nJyk7YnJlYWs7Y2FzZSAnZXJyb3InOnZhciBlcnI9bmV3IEVycm9yKCdzZXJ2ZXIgZXJyb3InKTtlcnIuY29kZSA9IHBhY2tldC5kYXRhO3RoaXMub25FcnJvcihlcnIpO2JyZWFrO2Nhc2UgJ21lc3NhZ2UnOnRoaXMuZW1pdCgnZGF0YScscGFja2V0LmRhdGEpO3RoaXMuZW1pdCgnbWVzc2FnZScscGFja2V0LmRhdGEpO2JyZWFrO319ZWxzZSB7ZGVidWcoJ3BhY2tldCByZWNlaXZlZCB3aXRoIHNvY2tldCByZWFkeVN0YXRlIFwiJXNcIicsdGhpcy5yZWFkeVN0YXRlKTt9fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIGhhbmRzaGFrZSBjb21wbGV0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gaGFuZHNoYWtlIG9ialxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5vbkhhbmRzaGFrZSA9IGZ1bmN0aW9uKGRhdGEpe3RoaXMuZW1pdCgnaGFuZHNoYWtlJyxkYXRhKTt0aGlzLmlkID0gZGF0YS5zaWQ7dGhpcy50cmFuc3BvcnQucXVlcnkuc2lkID0gZGF0YS5zaWQ7dGhpcy51cGdyYWRlcyA9IHRoaXMuZmlsdGVyVXBncmFkZXMoZGF0YS51cGdyYWRlcyk7dGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDt0aGlzLnBpbmdUaW1lb3V0ID0gZGF0YS5waW5nVGltZW91dDt0aGlzLm9uT3BlbigpOyAvLyBJbiBjYXNlIG9wZW4gaGFuZGxlciBjbG9zZXMgc29ja2V0XG5pZignY2xvc2VkJyA9PSB0aGlzLnJlYWR5U3RhdGUpcmV0dXJuO3RoaXMuc2V0UGluZygpOyAvLyBQcm9sb25nIGxpdmVuZXNzIG9mIHNvY2tldCBvbiBoZWFydGJlYXRcbnRoaXMucmVtb3ZlTGlzdGVuZXIoJ2hlYXJ0YmVhdCcsdGhpcy5vbkhlYXJ0YmVhdCk7dGhpcy5vbignaGVhcnRiZWF0Jyx0aGlzLm9uSGVhcnRiZWF0KTt9OyAvKipcclxuICogUmVzZXRzIHBpbmcgdGltZW91dC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25IZWFydGJlYXQgPSBmdW5jdGlvbih0aW1lb3V0KXtjbGVhclRpbWVvdXQodGhpcy5waW5nVGltZW91dFRpbWVyKTt2YXIgc2VsZj10aGlzO3NlbGYucGluZ1RpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZignY2xvc2VkJyA9PSBzZWxmLnJlYWR5U3RhdGUpcmV0dXJuO3NlbGYub25DbG9zZSgncGluZyB0aW1lb3V0Jyk7fSx0aW1lb3V0IHx8IHNlbGYucGluZ0ludGVydmFsICsgc2VsZi5waW5nVGltZW91dCk7fTsgLyoqXHJcbiAqIFBpbmdzIHNlcnZlciBldmVyeSBgdGhpcy5waW5nSW50ZXJ2YWxgIGFuZCBleHBlY3RzIHJlc3BvbnNlXHJcbiAqIHdpdGhpbiBgdGhpcy5waW5nVGltZW91dGAgb3IgY2xvc2VzIGNvbm5lY3Rpb24uXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLnNldFBpbmcgPSBmdW5jdGlvbigpe3ZhciBzZWxmPXRoaXM7Y2xlYXJUaW1lb3V0KHNlbGYucGluZ0ludGVydmFsVGltZXIpO3NlbGYucGluZ0ludGVydmFsVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZGVidWcoJ3dyaXRpbmcgcGluZyBwYWNrZXQgLSBleHBlY3RpbmcgcG9uZyB3aXRoaW4gJXNtcycsc2VsZi5waW5nVGltZW91dCk7c2VsZi5waW5nKCk7c2VsZi5vbkhlYXJ0YmVhdChzZWxmLnBpbmdUaW1lb3V0KTt9LHNlbGYucGluZ0ludGVydmFsKTt9OyAvKipcclxuKiBTZW5kcyBhIHBpbmcgcGFja2V0LlxyXG4qXHJcbiogQGFwaSBwcml2YXRlXHJcbiovU29ja2V0LnByb3RvdHlwZS5waW5nID0gZnVuY3Rpb24oKXt2YXIgc2VsZj10aGlzO3RoaXMuc2VuZFBhY2tldCgncGluZycsZnVuY3Rpb24oKXtzZWxmLmVtaXQoJ3BpbmcnKTt9KTt9OyAvKipcclxuICogQ2FsbGVkIG9uIGBkcmFpbmAgZXZlbnRcclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25EcmFpbiA9IGZ1bmN0aW9uKCl7dGhpcy53cml0ZUJ1ZmZlci5zcGxpY2UoMCx0aGlzLnByZXZCdWZmZXJMZW4pOyAvLyBzZXR0aW5nIHByZXZCdWZmZXJMZW4gPSAwIGlzIHZlcnkgaW1wb3J0YW50XG4vLyBmb3IgZXhhbXBsZSwgd2hlbiB1cGdyYWRpbmcsIHVwZ3JhZGUgcGFja2V0IGlzIHNlbnQgb3Zlcixcbi8vIGFuZCBhIG5vbnplcm8gcHJldkJ1ZmZlckxlbiBjb3VsZCBjYXVzZSBwcm9ibGVtcyBvbiBgZHJhaW5gXG50aGlzLnByZXZCdWZmZXJMZW4gPSAwO2lmKDAgPT09IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKXt0aGlzLmVtaXQoJ2RyYWluJyk7fWVsc2Uge3RoaXMuZmx1c2goKTt9fTsgLyoqXHJcbiAqIEZsdXNoIHdyaXRlIGJ1ZmZlcnMuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24oKXtpZignY2xvc2VkJyAhPSB0aGlzLnJlYWR5U3RhdGUgJiYgdGhpcy50cmFuc3BvcnQud3JpdGFibGUgJiYgIXRoaXMudXBncmFkaW5nICYmIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKXtkZWJ1ZygnZmx1c2hpbmcgJWQgcGFja2V0cyBpbiBzb2NrZXQnLHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKTt0aGlzLnRyYW5zcG9ydC5zZW5kKHRoaXMud3JpdGVCdWZmZXIpOyAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4vLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbnRoaXMucHJldkJ1ZmZlckxlbiA9IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoO3RoaXMuZW1pdCgnZmx1c2gnKTt9fTsgLyoqXHJcbiAqIFNlbmRzIGEgbWVzc2FnZS5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cclxuICogQHJldHVybiB7U29ja2V0fSBmb3IgY2hhaW5pbmcuXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1NvY2tldC5wcm90b3R5cGUud3JpdGUgPSBTb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihtc2csb3B0aW9ucyxmbil7dGhpcy5zZW5kUGFja2V0KCdtZXNzYWdlJyxtc2csb3B0aW9ucyxmbik7cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIFNlbmRzIGEgcGFja2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFja2V0IHR5cGUuXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLnNlbmRQYWNrZXQgPSBmdW5jdGlvbih0eXBlLGRhdGEsb3B0aW9ucyxmbil7aWYoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSl7Zm4gPSBkYXRhO2RhdGEgPSB1bmRlZmluZWQ7fWlmKCdmdW5jdGlvbicgPT0gdHlwZW9mIG9wdGlvbnMpe2ZuID0gb3B0aW9ucztvcHRpb25zID0gbnVsbDt9aWYoJ2Nsb3NpbmcnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2VkJyA9PSB0aGlzLnJlYWR5U3RhdGUpe3JldHVybjt9b3B0aW9ucyA9IG9wdGlvbnMgfHwge307b3B0aW9ucy5jb21wcmVzcyA9IGZhbHNlICE9PSBvcHRpb25zLmNvbXByZXNzO3ZhciBwYWNrZXQ9e3R5cGU6dHlwZSxkYXRhOmRhdGEsb3B0aW9uczpvcHRpb25zfTt0aGlzLmVtaXQoJ3BhY2tldENyZWF0ZScscGFja2V0KTt0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtpZihmbil0aGlzLm9uY2UoJ2ZsdXNoJyxmbik7dGhpcy5mbHVzaCgpO307IC8qKlxyXG4gKiBDbG9zZXMgdGhlIGNvbm5lY3Rpb24uXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKXtpZignb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUpe3RoaXMucmVhZHlTdGF0ZSA9ICdjbG9zaW5nJzt2YXIgc2VsZj10aGlzO2lmKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKXt0aGlzLm9uY2UoJ2RyYWluJyxmdW5jdGlvbigpe2lmKHRoaXMudXBncmFkaW5nKXt3YWl0Rm9yVXBncmFkZSgpO31lbHNlIHtjbG9zZSgpO319KTt9ZWxzZSBpZih0aGlzLnVwZ3JhZGluZyl7d2FpdEZvclVwZ3JhZGUoKTt9ZWxzZSB7Y2xvc2UoKTt9fWZ1bmN0aW9uIGNsb3NlKCl7c2VsZi5vbkNsb3NlKCdmb3JjZWQgY2xvc2UnKTtkZWJ1Zygnc29ja2V0IGNsb3NpbmcgLSB0ZWxsaW5nIHRyYW5zcG9ydCB0byBjbG9zZScpO3NlbGYudHJhbnNwb3J0LmNsb3NlKCk7fWZ1bmN0aW9uIGNsZWFudXBBbmRDbG9zZSgpe3NlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGUnLGNsZWFudXBBbmRDbG9zZSk7c2VsZi5yZW1vdmVMaXN0ZW5lcigndXBncmFkZUVycm9yJyxjbGVhbnVwQW5kQ2xvc2UpO2Nsb3NlKCk7fWZ1bmN0aW9uIHdhaXRGb3JVcGdyYWRlKCl7IC8vIHdhaXQgZm9yIHVwZ3JhZGUgdG8gZmluaXNoIHNpbmNlIHdlIGNhbid0IHNlbmQgcGFja2V0cyB3aGlsZSBwYXVzaW5nIGEgdHJhbnNwb3J0XG5zZWxmLm9uY2UoJ3VwZ3JhZGUnLGNsZWFudXBBbmRDbG9zZSk7c2VsZi5vbmNlKCd1cGdyYWRlRXJyb3InLGNsZWFudXBBbmRDbG9zZSk7fXJldHVybiB0aGlzO307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uKGVycil7ZGVidWcoJ3NvY2tldCBlcnJvciAlaicsZXJyKTtTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7dGhpcy5lbWl0KCdlcnJvcicsZXJyKTt0aGlzLm9uQ2xvc2UoJ3RyYW5zcG9ydCBlcnJvcicsZXJyKTt9OyAvKipcclxuICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24ocmVhc29uLGRlc2Mpe2lmKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2luZycgPT0gdGhpcy5yZWFkeVN0YXRlKXtkZWJ1Zygnc29ja2V0IGNsb3NlIHdpdGggcmVhc29uOiBcIiVzXCInLHJlYXNvbik7dmFyIHNlbGY9dGhpczsgLy8gY2xlYXIgdGltZXJzXG5jbGVhclRpbWVvdXQodGhpcy5waW5nSW50ZXJ2YWxUaW1lcik7Y2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7IC8vIHN0b3AgZXZlbnQgZnJvbSBmaXJpbmcgYWdhaW4gZm9yIHRyYW5zcG9ydFxudGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCdjbG9zZScpOyAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxudGhpcy50cmFuc3BvcnQuY2xvc2UoKTsgLy8gaWdub3JlIGZ1cnRoZXIgdHJhbnNwb3J0IGNvbW11bmljYXRpb25cbnRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpOyAvLyBzZXQgcmVhZHkgc3RhdGVcbnRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnOyAvLyBjbGVhciBzZXNzaW9uIGlkXG50aGlzLmlkID0gbnVsbDsgLy8gZW1pdCBjbG9zZSBldmVudFxudGhpcy5lbWl0KCdjbG9zZScscmVhc29uLGRlc2MpOyAvLyBjbGVhbiBidWZmZXJzIGFmdGVyLCBzbyB1c2VycyBjYW4gc3RpbGxcbi8vIGdyYWIgdGhlIGJ1ZmZlcnMgb24gYGNsb3NlYCBldmVudFxuc2VsZi53cml0ZUJ1ZmZlciA9IFtdO3NlbGYucHJldkJ1ZmZlckxlbiA9IDA7fX07IC8qKlxyXG4gKiBGaWx0ZXJzIHVwZ3JhZGVzLCByZXR1cm5pbmcgb25seSB0aG9zZSBtYXRjaGluZyBjbGllbnQgdHJhbnNwb3J0cy5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gc2VydmVyIHVwZ3JhZGVzXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKlxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLmZpbHRlclVwZ3JhZGVzID0gZnVuY3Rpb24odXBncmFkZXMpe3ZhciBmaWx0ZXJlZFVwZ3JhZGVzPVtdO2Zvcih2YXIgaT0wLGo9dXBncmFkZXMubGVuZ3RoO2kgPCBqO2krKykge2lmKH5pbmRleCh0aGlzLnRyYW5zcG9ydHMsdXBncmFkZXNbaV0pKWZpbHRlcmVkVXBncmFkZXMucHVzaCh1cGdyYWRlc1tpXSk7fXJldHVybiBmaWx0ZXJlZFVwZ3JhZGVzO307fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se1wiLi90cmFuc3BvcnRcIjo0LFwiLi90cmFuc3BvcnRzXCI6NSxcImNvbXBvbmVudC1lbWl0dGVyXCI6MTUsXCJkZWJ1Z1wiOjE3LFwiZW5naW5lLmlvLXBhcnNlclwiOjE5LFwiaW5kZXhvZlwiOjIzLFwicGFyc2Vqc29uXCI6MjYsXCJwYXJzZXFzXCI6MjcsXCJwYXJzZXVyaVwiOjI4fV0sNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxyXG4gKi92YXIgcGFyc2VyPV9kZXJlcV8oJ2VuZ2luZS5pby1wYXJzZXInKTt2YXIgRW1pdHRlcj1fZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpOyAvKipcclxuICogTW9kdWxlIGV4cG9ydHMuXHJcbiAqL21vZHVsZS5leHBvcnRzID0gVHJhbnNwb3J0OyAvKipcclxuICogVHJhbnNwb3J0IGFic3RyYWN0IGNvbnN0cnVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2Z1bmN0aW9uIFRyYW5zcG9ydChvcHRzKXt0aGlzLnBhdGggPSBvcHRzLnBhdGg7dGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWU7dGhpcy5wb3J0ID0gb3B0cy5wb3J0O3RoaXMuc2VjdXJlID0gb3B0cy5zZWN1cmU7dGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7dGhpcy50aW1lc3RhbXBQYXJhbSA9IG9wdHMudGltZXN0YW1wUGFyYW07dGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7dGhpcy5yZWFkeVN0YXRlID0gJyc7dGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7dGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDt0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7IC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxudGhpcy5wZnggPSBvcHRzLnBmeDt0aGlzLmtleSA9IG9wdHMua2V5O3RoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTt0aGlzLmNlcnQgPSBvcHRzLmNlcnQ7dGhpcy5jYSA9IG9wdHMuY2E7dGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO3RoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7IC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG50aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO30gLyoqXHJcbiAqIE1peCBpbiBgRW1pdHRlcmAuXHJcbiAqL0VtaXR0ZXIoVHJhbnNwb3J0LnByb3RvdHlwZSk7IC8qKlxyXG4gKiBFbWl0cyBhbiBlcnJvci5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtUcmFuc3BvcnR9IGZvciBjaGFpbmluZ1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9UcmFuc3BvcnQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbihtc2csZGVzYyl7dmFyIGVycj1uZXcgRXJyb3IobXNnKTtlcnIudHlwZSA9ICdUcmFuc3BvcnRFcnJvcic7ZXJyLmRlc2NyaXB0aW9uID0gZGVzYzt0aGlzLmVtaXQoJ2Vycm9yJyxlcnIpO3JldHVybiB0aGlzO307IC8qKlxyXG4gKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9UcmFuc3BvcnQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpe2lmKCdjbG9zZWQnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnJyA9PSB0aGlzLnJlYWR5U3RhdGUpe3RoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJzt0aGlzLmRvT3BlbigpO31yZXR1cm4gdGhpczt9OyAvKipcclxuICogQ2xvc2VzIHRoZSB0cmFuc3BvcnQuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9UcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKXtpZignb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUpe3RoaXMuZG9DbG9zZSgpO3RoaXMub25DbG9zZSgpO31yZXR1cm4gdGhpczt9OyAvKipcclxuICogU2VuZHMgbXVsdGlwbGUgcGFja2V0cy5cclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovVHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24ocGFja2V0cyl7aWYoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSl7dGhpcy53cml0ZShwYWNrZXRzKTt9ZWxzZSB7dGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgbm90IG9wZW4nKTt9fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIG9wZW5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1RyYW5zcG9ydC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24oKXt0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7dGhpcy53cml0YWJsZSA9IHRydWU7dGhpcy5lbWl0KCdvcGVuJyk7fTsgLyoqXHJcbiAqIENhbGxlZCB3aXRoIGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9UcmFuc3BvcnQucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe3ZhciBwYWNrZXQ9cGFyc2VyLmRlY29kZVBhY2tldChkYXRhLHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO3RoaXMub25QYWNrZXQocGFja2V0KTt9OyAvKipcclxuICogQ2FsbGVkIHdpdGggYSBkZWNvZGVkIHBhY2tldC5cclxuICovVHJhbnNwb3J0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCl7dGhpcy5lbWl0KCdwYWNrZXQnLHBhY2tldCk7fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIGNsb3NlLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24oKXt0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJzt0aGlzLmVtaXQoJ2Nsb3NlJyk7fTt9LHtcImNvbXBvbmVudC1lbWl0dGVyXCI6MTUsXCJlbmdpbmUuaW8tcGFyc2VyXCI6MTl9XSw1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcclxuICovdmFyIFhNTEh0dHBSZXF1ZXN0PV9kZXJlcV8oJ3htbGh0dHByZXF1ZXN0LXNzbCcpO3ZhciBYSFI9X2RlcmVxXygnLi9wb2xsaW5nLXhocicpO3ZhciBKU09OUD1fZGVyZXFfKCcuL3BvbGxpbmctanNvbnAnKTt2YXIgd2Vic29ja2V0PV9kZXJlcV8oJy4vd2Vic29ja2V0Jyk7IC8qKlxyXG4gKiBFeHBvcnQgdHJhbnNwb3J0cy5cclxuICovZXhwb3J0cy5wb2xsaW5nID0gcG9sbGluZztleHBvcnRzLndlYnNvY2tldCA9IHdlYnNvY2tldDsgLyoqXHJcbiAqIFBvbGxpbmcgdHJhbnNwb3J0IHBvbHltb3JwaGljIGNvbnN0cnVjdG9yLlxyXG4gKiBEZWNpZGVzIG9uIHhociB2cyBqc29ucCBiYXNlZCBvbiBmZWF0dXJlIGRldGVjdGlvbi5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2Z1bmN0aW9uIHBvbGxpbmcob3B0cyl7dmFyIHhocjt2YXIgeGQ9ZmFsc2U7dmFyIHhzPWZhbHNlO3ZhciBqc29ucD1mYWxzZSAhPT0gb3B0cy5qc29ucDtpZihnbG9iYWwubG9jYXRpb24pe3ZhciBpc1NTTD0naHR0cHM6JyA9PSBsb2NhdGlvbi5wcm90b2NvbDt2YXIgcG9ydD1sb2NhdGlvbi5wb3J0OyAvLyBzb21lIHVzZXIgYWdlbnRzIGhhdmUgZW1wdHkgYGxvY2F0aW9uLnBvcnRgXG5pZighcG9ydCl7cG9ydCA9IGlzU1NMPzQ0Mzo4MDt9eGQgPSBvcHRzLmhvc3RuYW1lICE9IGxvY2F0aW9uLmhvc3RuYW1lIHx8IHBvcnQgIT0gb3B0cy5wb3J0O3hzID0gb3B0cy5zZWN1cmUgIT0gaXNTU0w7fW9wdHMueGRvbWFpbiA9IHhkO29wdHMueHNjaGVtZSA9IHhzO3hociA9IG5ldyBYTUxIdHRwUmVxdWVzdChvcHRzKTtpZignb3BlbicgaW4geGhyICYmICFvcHRzLmZvcmNlSlNPTlApe3JldHVybiBuZXcgWEhSKG9wdHMpO31lbHNlIHtpZighanNvbnApdGhyb3cgbmV3IEVycm9yKCdKU09OUCBkaXNhYmxlZCcpO3JldHVybiBuZXcgSlNPTlAob3B0cyk7fX19KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7XCIuL3BvbGxpbmctanNvbnBcIjo2LFwiLi9wb2xsaW5nLXhoclwiOjcsXCIuL3dlYnNvY2tldFwiOjksXCJ4bWxodHRwcmVxdWVzdC1zc2xcIjoxMH1dLDY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKipcclxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cclxuICovdmFyIFBvbGxpbmc9X2RlcmVxXygnLi9wb2xsaW5nJyk7dmFyIGluaGVyaXQ9X2RlcmVxXygnY29tcG9uZW50LWluaGVyaXQnKTsgLyoqXHJcbiAqIE1vZHVsZSBleHBvcnRzLlxyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IEpTT05QUG9sbGluZzsgLyoqXHJcbiAqIENhY2hlZCByZWd1bGFyIGV4cHJlc3Npb25zLlxyXG4gKi92YXIgck5ld2xpbmU9L1xcbi9nO3ZhciByRXNjYXBlZE5ld2xpbmU9L1xcXFxuL2c7IC8qKlxyXG4gKiBHbG9iYWwgSlNPTlAgY2FsbGJhY2tzLlxyXG4gKi92YXIgY2FsbGJhY2tzOyAvKipcclxuICogQ2FsbGJhY2tzIGNvdW50LlxyXG4gKi92YXIgaW5kZXg9MDsgLyoqXHJcbiAqIE5vb3AuXHJcbiAqL2Z1bmN0aW9uIGVtcHR5KCl7fSAvKipcclxuICogSlNPTlAgUG9sbGluZyBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMuXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIEpTT05QUG9sbGluZyhvcHRzKXtQb2xsaW5nLmNhbGwodGhpcyxvcHRzKTt0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTsgLy8gZGVmaW5lIGdsb2JhbCBjYWxsYmFja3MgYXJyYXkgaWYgbm90IHByZXNlbnRcbi8vIHdlIGRvIHRoaXMgaGVyZSAobGF6aWx5KSB0byBhdm9pZCB1bm5lZWRlZCBnbG9iYWwgcG9sbHV0aW9uXG5pZighY2FsbGJhY2tzKXsgLy8gd2UgbmVlZCB0byBjb25zaWRlciBtdWx0aXBsZSBlbmdpbmVzIGluIHRoZSBzYW1lIHBhZ2VcbmlmKCFnbG9iYWwuX19fZWlvKWdsb2JhbC5fX19laW8gPSBbXTtjYWxsYmFja3MgPSBnbG9iYWwuX19fZWlvO30gLy8gY2FsbGJhY2sgaWRlbnRpZmllclxudGhpcy5pbmRleCA9IGNhbGxiYWNrcy5sZW5ndGg7IC8vIGFkZCBjYWxsYmFjayB0byBqc29ucCBnbG9iYWxcbnZhciBzZWxmPXRoaXM7Y2FsbGJhY2tzLnB1c2goZnVuY3Rpb24obXNnKXtzZWxmLm9uRGF0YShtc2cpO30pOyAvLyBhcHBlbmQgdG8gcXVlcnkgc3RyaW5nXG50aGlzLnF1ZXJ5LmogPSB0aGlzLmluZGV4OyAvLyBwcmV2ZW50IHNwdXJpb3VzIGVycm9ycyBmcm9tIGJlaW5nIGVtaXR0ZWQgd2hlbiB0aGUgd2luZG93IGlzIHVubG9hZGVkXG5pZihnbG9iYWwuZG9jdW1lbnQgJiYgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpe2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLGZ1bmN0aW9uKCl7aWYoc2VsZi5zY3JpcHQpc2VsZi5zY3JpcHQub25lcnJvciA9IGVtcHR5O30sZmFsc2UpO319IC8qKlxyXG4gKiBJbmhlcml0cyBmcm9tIFBvbGxpbmcuXHJcbiAqL2luaGVyaXQoSlNPTlBQb2xsaW5nLFBvbGxpbmcpOyAvKlxyXG4gKiBKU09OUCBvbmx5IHN1cHBvcnRzIGJpbmFyeSBhcyBiYXNlNjQgZW5jb2RlZCBzdHJpbmdzXHJcbiAqL0pTT05QUG9sbGluZy5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTsgLyoqXHJcbiAqIENsb3NlcyB0aGUgc29ja2V0LlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24oKXtpZih0aGlzLnNjcmlwdCl7dGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7dGhpcy5zY3JpcHQgPSBudWxsO31pZih0aGlzLmZvcm0pe3RoaXMuZm9ybS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZm9ybSk7dGhpcy5mb3JtID0gbnVsbDt0aGlzLmlmcmFtZSA9IG51bGw7fVBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UuY2FsbCh0aGlzKTt9OyAvKipcclxuICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL0pTT05QUG9sbGluZy5wcm90b3R5cGUuZG9Qb2xsID0gZnVuY3Rpb24oKXt2YXIgc2VsZj10aGlzO3ZhciBzY3JpcHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7aWYodGhpcy5zY3JpcHQpe3RoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO3RoaXMuc2NyaXB0ID0gbnVsbDt9c2NyaXB0LmFzeW5jID0gdHJ1ZTtzY3JpcHQuc3JjID0gdGhpcy51cmkoKTtzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uKGUpe3NlbGYub25FcnJvcignanNvbnAgcG9sbCBlcnJvcicsZSk7fTt2YXIgaW5zZXJ0QXQ9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO2lmKGluc2VydEF0KXtpbnNlcnRBdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsaW5zZXJ0QXQpO31lbHNlIHsoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChzY3JpcHQpO310aGlzLnNjcmlwdCA9IHNjcmlwdDt2YXIgaXNVQWdlY2tvPSd1bmRlZmluZWQnICE9IHR5cGVvZiBuYXZpZ2F0b3IgJiYgL2dlY2tvL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtpZihpc1VBZ2Vja28pe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt2YXIgaWZyYW1lPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZSk7fSwxMDApO319OyAvKipcclxuICogV3JpdGVzIHdpdGggYSBoaWRkZW4gaWZyYW1lLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb1dyaXRlID0gZnVuY3Rpb24oZGF0YSxmbil7dmFyIHNlbGY9dGhpcztpZighdGhpcy5mb3JtKXt2YXIgZm9ybT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7dmFyIGFyZWE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTt2YXIgaWQ9dGhpcy5pZnJhbWVJZCA9ICdlaW9faWZyYW1lXycgKyB0aGlzLmluZGV4O3ZhciBpZnJhbWU7Zm9ybS5jbGFzc05hbWUgPSAnc29ja2V0aW8nO2Zvcm0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO2Zvcm0uc3R5bGUudG9wID0gJy0xMDAwcHgnO2Zvcm0uc3R5bGUubGVmdCA9ICctMTAwMHB4Jztmb3JtLnRhcmdldCA9IGlkO2Zvcm0ubWV0aG9kID0gJ1BPU1QnO2Zvcm0uc2V0QXR0cmlidXRlKCdhY2NlcHQtY2hhcnNldCcsJ3V0Zi04Jyk7YXJlYS5uYW1lID0gJ2QnO2Zvcm0uYXBwZW5kQ2hpbGQoYXJlYSk7ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTt0aGlzLmZvcm0gPSBmb3JtO3RoaXMuYXJlYSA9IGFyZWE7fXRoaXMuZm9ybS5hY3Rpb24gPSB0aGlzLnVyaSgpO2Z1bmN0aW9uIGNvbXBsZXRlKCl7aW5pdElmcmFtZSgpO2ZuKCk7fWZ1bmN0aW9uIGluaXRJZnJhbWUoKXtpZihzZWxmLmlmcmFtZSl7dHJ5e3NlbGYuZm9ybS5yZW1vdmVDaGlsZChzZWxmLmlmcmFtZSk7fWNhdGNoKGUpIHtzZWxmLm9uRXJyb3IoJ2pzb25wIHBvbGxpbmcgaWZyYW1lIHJlbW92YWwgZXJyb3InLGUpO319dHJ5eyAvLyBpZTYgZHluYW1pYyBpZnJhbWVzIHdpdGggdGFyZ2V0PVwiXCIgc3VwcG9ydCAodGhhbmtzIENocmlzIExhbWJhY2hlcilcbnZhciBodG1sPSc8aWZyYW1lIHNyYz1cImphdmFzY3JpcHQ6MFwiIG5hbWU9XCInICsgc2VsZi5pZnJhbWVJZCArICdcIj4nO2lmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaHRtbCk7fWNhdGNoKGUpIHtpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtpZnJhbWUubmFtZSA9IHNlbGYuaWZyYW1lSWQ7aWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0OjAnO31pZnJhbWUuaWQgPSBzZWxmLmlmcmFtZUlkO3NlbGYuZm9ybS5hcHBlbmRDaGlsZChpZnJhbWUpO3NlbGYuaWZyYW1lID0gaWZyYW1lO31pbml0SWZyYW1lKCk7IC8vIGVzY2FwZSBcXG4gdG8gcHJldmVudCBpdCBmcm9tIGJlaW5nIGNvbnZlcnRlZCBpbnRvIFxcclxcbiBieSBzb21lIFVBc1xuLy8gZG91YmxlIGVzY2FwaW5nIGlzIHJlcXVpcmVkIGZvciBlc2NhcGVkIG5ldyBsaW5lcyBiZWNhdXNlIHVuZXNjYXBpbmcgb2YgbmV3IGxpbmVzIGNhbiBiZSBkb25lIHNhZmVseSBvbiBzZXJ2ZXItc2lkZVxuZGF0YSA9IGRhdGEucmVwbGFjZShyRXNjYXBlZE5ld2xpbmUsJ1xcXFxcXG4nKTt0aGlzLmFyZWEudmFsdWUgPSBkYXRhLnJlcGxhY2Uock5ld2xpbmUsJ1xcXFxuJyk7dHJ5e3RoaXMuZm9ybS5zdWJtaXQoKTt9Y2F0Y2goZSkge31pZih0aGlzLmlmcmFtZS5hdHRhY2hFdmVudCl7dGhpcy5pZnJhbWUub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtpZihzZWxmLmlmcmFtZS5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpe2NvbXBsZXRlKCk7fX07fWVsc2Uge3RoaXMuaWZyYW1lLm9ubG9hZCA9IGNvbXBsZXRlO319O30pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHtcIi4vcG9sbGluZ1wiOjgsXCJjb21wb25lbnQtaW5oZXJpdFwiOjE2fV0sNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qKlxyXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxyXG4gKi92YXIgWE1MSHR0cFJlcXVlc3Q9X2RlcmVxXygneG1saHR0cHJlcXVlc3Qtc3NsJyk7dmFyIFBvbGxpbmc9X2RlcmVxXygnLi9wb2xsaW5nJyk7dmFyIEVtaXR0ZXI9X2RlcmVxXygnY29tcG9uZW50LWVtaXR0ZXInKTt2YXIgaW5oZXJpdD1fZGVyZXFfKCdjb21wb25lbnQtaW5oZXJpdCcpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnBvbGxpbmcteGhyJyk7IC8qKlxyXG4gKiBNb2R1bGUgZXhwb3J0cy5cclxuICovbW9kdWxlLmV4cG9ydHMgPSBYSFI7bW9kdWxlLmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7IC8qKlxyXG4gKiBFbXB0eSBmdW5jdGlvblxyXG4gKi9mdW5jdGlvbiBlbXB0eSgpe30gLyoqXHJcbiAqIFhIUiBQb2xsaW5nIGNvbnN0cnVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBYSFIob3B0cyl7UG9sbGluZy5jYWxsKHRoaXMsb3B0cyk7aWYoZ2xvYmFsLmxvY2F0aW9uKXt2YXIgaXNTU0w9J2h0dHBzOicgPT0gbG9jYXRpb24ucHJvdG9jb2w7dmFyIHBvcnQ9bG9jYXRpb24ucG9ydDsgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuaWYoIXBvcnQpe3BvcnQgPSBpc1NTTD80NDM6ODA7fXRoaXMueGQgPSBvcHRzLmhvc3RuYW1lICE9IGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSB8fCBwb3J0ICE9IG9wdHMucG9ydDt0aGlzLnhzID0gb3B0cy5zZWN1cmUgIT0gaXNTU0w7fWVsc2Uge3RoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7fX0gLyoqXHJcbiAqIEluaGVyaXRzIGZyb20gUG9sbGluZy5cclxuICovaW5oZXJpdChYSFIsUG9sbGluZyk7IC8qKlxyXG4gKiBYSFIgc3VwcG9ydHMgYmluYXJ5XHJcbiAqL1hIUi5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSB0cnVlOyAvKipcclxuICogQ3JlYXRlcyBhIHJlcXVlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1hIUi5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uKG9wdHMpe29wdHMgPSBvcHRzIHx8IHt9O29wdHMudXJpID0gdGhpcy51cmkoKTtvcHRzLnhkID0gdGhpcy54ZDtvcHRzLnhzID0gdGhpcy54cztvcHRzLmFnZW50ID0gdGhpcy5hZ2VudCB8fCBmYWxzZTtvcHRzLnN1cHBvcnRzQmluYXJ5ID0gdGhpcy5zdXBwb3J0c0JpbmFyeTtvcHRzLmVuYWJsZXNYRFIgPSB0aGlzLmVuYWJsZXNYRFI7IC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxub3B0cy5wZnggPSB0aGlzLnBmeDtvcHRzLmtleSA9IHRoaXMua2V5O29wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7b3B0cy5jYSA9IHRoaXMuY2E7b3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO29wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7IC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG5vcHRzLmV4dHJhSGVhZGVycyA9IHRoaXMuZXh0cmFIZWFkZXJzO3JldHVybiBuZXcgUmVxdWVzdChvcHRzKTt9OyAvKipcclxuICogU2VuZHMgZGF0YS5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdG8gc2VuZC5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9YSFIucHJvdG90eXBlLmRvV3JpdGUgPSBmdW5jdGlvbihkYXRhLGZuKXt2YXIgaXNCaW5hcnk9dHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnICYmIGRhdGEgIT09IHVuZGVmaW5lZDt2YXIgcmVxPXRoaXMucmVxdWVzdCh7bWV0aG9kOidQT1NUJyxkYXRhOmRhdGEsaXNCaW5hcnk6aXNCaW5hcnl9KTt2YXIgc2VsZj10aGlzO3JlcS5vbignc3VjY2VzcycsZm4pO3JlcS5vbignZXJyb3InLGZ1bmN0aW9uKGVycil7c2VsZi5vbkVycm9yKCd4aHIgcG9zdCBlcnJvcicsZXJyKTt9KTt0aGlzLnNlbmRYaHIgPSByZXE7fTsgLyoqXHJcbiAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9YSFIucHJvdG90eXBlLmRvUG9sbCA9IGZ1bmN0aW9uKCl7ZGVidWcoJ3hociBwb2xsJyk7dmFyIHJlcT10aGlzLnJlcXVlc3QoKTt2YXIgc2VsZj10aGlzO3JlcS5vbignZGF0YScsZnVuY3Rpb24oZGF0YSl7c2VsZi5vbkRhdGEoZGF0YSk7fSk7cmVxLm9uKCdlcnJvcicsZnVuY3Rpb24oZXJyKXtzZWxmLm9uRXJyb3IoJ3hociBwb2xsIGVycm9yJyxlcnIpO30pO3RoaXMucG9sbFhociA9IHJlcTt9OyAvKipcclxuICogUmVxdWVzdCBjb25zdHJ1Y3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBSZXF1ZXN0KG9wdHMpe3RoaXMubWV0aG9kID0gb3B0cy5tZXRob2QgfHwgJ0dFVCc7dGhpcy51cmkgPSBvcHRzLnVyaTt0aGlzLnhkID0gISFvcHRzLnhkO3RoaXMueHMgPSAhIW9wdHMueHM7dGhpcy5hc3luYyA9IGZhbHNlICE9PSBvcHRzLmFzeW5jO3RoaXMuZGF0YSA9IHVuZGVmaW5lZCAhPSBvcHRzLmRhdGE/b3B0cy5kYXRhOm51bGw7dGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQ7dGhpcy5pc0JpbmFyeSA9IG9wdHMuaXNCaW5hcnk7dGhpcy5zdXBwb3J0c0JpbmFyeSA9IG9wdHMuc3VwcG9ydHNCaW5hcnk7dGhpcy5lbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSOyAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbnRoaXMucGZ4ID0gb3B0cy5wZng7dGhpcy5rZXkgPSBvcHRzLmtleTt0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2U7dGhpcy5jZXJ0ID0gb3B0cy5jZXJ0O3RoaXMuY2EgPSBvcHRzLmNhO3RoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVyczt0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkOyAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxudGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVyczt0aGlzLmNyZWF0ZSgpO30gLyoqXHJcbiAqIE1peCBpbiBgRW1pdHRlcmAuXHJcbiAqL0VtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpOyAvKipcclxuICogQ3JlYXRlcyB0aGUgWEhSIG9iamVjdCBhbmQgc2VuZHMgdGhlIHJlcXVlc3QuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9SZXF1ZXN0LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe3ZhciBvcHRzPXthZ2VudDp0aGlzLmFnZW50LHhkb21haW46dGhpcy54ZCx4c2NoZW1lOnRoaXMueHMsZW5hYmxlc1hEUjp0aGlzLmVuYWJsZXNYRFJ9OyAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbm9wdHMucGZ4ID0gdGhpcy5wZng7b3B0cy5rZXkgPSB0aGlzLmtleTtvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7b3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O29wdHMuY2EgPSB0aGlzLmNhO29wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO3ZhciB4aHI9dGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7dmFyIHNlbGY9dGhpczt0cnl7ZGVidWcoJ3hociBvcGVuICVzOiAlcycsdGhpcy5tZXRob2QsdGhpcy51cmkpO3hoci5vcGVuKHRoaXMubWV0aG9kLHRoaXMudXJpLHRoaXMuYXN5bmMpO3RyeXtpZih0aGlzLmV4dHJhSGVhZGVycyl7eGhyLnNldERpc2FibGVIZWFkZXJDaGVjayh0cnVlKTtmb3IodmFyIGkgaW4gdGhpcy5leHRyYUhlYWRlcnMpIHtpZih0aGlzLmV4dHJhSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSl7eGhyLnNldFJlcXVlc3RIZWFkZXIoaSx0aGlzLmV4dHJhSGVhZGVyc1tpXSk7fX19fWNhdGNoKGUpIHt9aWYodGhpcy5zdXBwb3J0c0JpbmFyeSl7IC8vIFRoaXMgaGFzIHRvIGJlIGRvbmUgYWZ0ZXIgb3BlbiBiZWNhdXNlIEZpcmVmb3ggaXMgc3R1cGlkXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEzMjE2OTAzL2dldC1iaW5hcnktZGF0YS13aXRoLXhtbGh0dHByZXF1ZXN0LWluLWEtZmlyZWZveC1leHRlbnNpb25cbnhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO31pZignUE9TVCcgPT0gdGhpcy5tZXRob2Qpe3RyeXtpZih0aGlzLmlzQmluYXJ5KXt4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyk7fWVsc2Uge3hoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKTt9fWNhdGNoKGUpIHt9fSAvLyBpZTYgY2hlY2tcbmlmKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocil7eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7fWlmKHRoaXMuaGFzWERSKCkpe3hoci5vbmxvYWQgPSBmdW5jdGlvbigpe3NlbGYub25Mb2FkKCk7fTt4aHIub25lcnJvciA9IGZ1bmN0aW9uKCl7c2VsZi5vbkVycm9yKHhoci5yZXNwb25zZVRleHQpO307fWVsc2Uge3hoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe2lmKDQgIT0geGhyLnJlYWR5U3RhdGUpcmV0dXJuO2lmKDIwMCA9PSB4aHIuc3RhdHVzIHx8IDEyMjMgPT0geGhyLnN0YXR1cyl7c2VsZi5vbkxvYWQoKTt9ZWxzZSB7IC8vIG1ha2Ugc3VyZSB0aGUgYGVycm9yYCBldmVudCBoYW5kbGVyIHRoYXQncyB1c2VyLXNldFxuLy8gZG9lcyBub3QgdGhyb3cgaW4gdGhlIHNhbWUgdGljayBhbmQgZ2V0cyBjYXVnaHQgaGVyZVxuc2V0VGltZW91dChmdW5jdGlvbigpe3NlbGYub25FcnJvcih4aHIuc3RhdHVzKTt9LDApO319O31kZWJ1ZygneGhyIGRhdGEgJXMnLHRoaXMuZGF0YSk7eGhyLnNlbmQodGhpcy5kYXRhKTt9Y2F0Y2goZSkgeyAvLyBOZWVkIHRvIGRlZmVyIHNpbmNlIC5jcmVhdGUoKSBpcyBjYWxsZWQgZGlyZWN0bHkgZmhyb20gdGhlIGNvbnN0cnVjdG9yXG4vLyBhbmQgdGh1cyB0aGUgJ2Vycm9yJyBldmVudCBjYW4gb25seSBiZSBvbmx5IGJvdW5kICphZnRlciogdGhpcyBleGNlcHRpb25cbi8vIG9jY3Vycy4gIFRoZXJlZm9yZSwgYWxzbywgd2UgY2Fubm90IHRocm93IGhlcmUgYXQgYWxsLlxuc2V0VGltZW91dChmdW5jdGlvbigpe3NlbGYub25FcnJvcihlKTt9LDApO3JldHVybjt9aWYoZ2xvYmFsLmRvY3VtZW50KXt0aGlzLmluZGV4ID0gUmVxdWVzdC5yZXF1ZXN0c0NvdW50Kys7UmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XSA9IHRoaXM7fX07IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlc3BvbnNlLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovUmVxdWVzdC5wcm90b3R5cGUub25TdWNjZXNzID0gZnVuY3Rpb24oKXt0aGlzLmVtaXQoJ3N1Y2Nlc3MnKTt0aGlzLmNsZWFudXAoKTt9OyAvKipcclxuICogQ2FsbGVkIGlmIHdlIGhhdmUgZGF0YS5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1JlcXVlc3QucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe3RoaXMuZW1pdCgnZGF0YScsZGF0YSk7dGhpcy5vblN1Y2Nlc3MoKTt9OyAvKipcclxuICogQ2FsbGVkIHVwb24gZXJyb3IuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9SZXF1ZXN0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24oZXJyKXt0aGlzLmVtaXQoJ2Vycm9yJyxlcnIpO3RoaXMuY2xlYW51cCh0cnVlKTt9OyAvKipcclxuICogQ2xlYW5zIHVwIGhvdXNlLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovUmVxdWVzdC5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uKGZyb21FcnJvcil7aWYoJ3VuZGVmaW5lZCcgPT0gdHlwZW9mIHRoaXMueGhyIHx8IG51bGwgPT09IHRoaXMueGhyKXtyZXR1cm47fSAvLyB4bWxodHRwcmVxdWVzdFxuaWYodGhpcy5oYXNYRFIoKSl7dGhpcy54aHIub25sb2FkID0gdGhpcy54aHIub25lcnJvciA9IGVtcHR5O31lbHNlIHt0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBlbXB0eTt9aWYoZnJvbUVycm9yKXt0cnl7dGhpcy54aHIuYWJvcnQoKTt9Y2F0Y2goZSkge319aWYoZ2xvYmFsLmRvY3VtZW50KXtkZWxldGUgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XTt9dGhpcy54aHIgPSBudWxsO307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBsb2FkLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovUmVxdWVzdC5wcm90b3R5cGUub25Mb2FkID0gZnVuY3Rpb24oKXt2YXIgZGF0YTt0cnl7dmFyIGNvbnRlbnRUeXBlO3RyeXtjb250ZW50VHlwZSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKS5zcGxpdCgnOycpWzBdO31jYXRjaChlKSB7fWlmKGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyl7ZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlO31lbHNlIHtpZighdGhpcy5zdXBwb3J0c0JpbmFyeSl7ZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlVGV4dDt9ZWxzZSB7dHJ5e2RhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsbmV3IFVpbnQ4QXJyYXkodGhpcy54aHIucmVzcG9uc2UpKTt9Y2F0Y2goZSkge3ZhciB1aThBcnI9bmV3IFVpbnQ4QXJyYXkodGhpcy54aHIucmVzcG9uc2UpO3ZhciBkYXRhQXJyYXk9W107Zm9yKHZhciBpZHg9MCxsZW5ndGg9dWk4QXJyLmxlbmd0aDtpZHggPCBsZW5ndGg7aWR4KyspIHtkYXRhQXJyYXkucHVzaCh1aThBcnJbaWR4XSk7fWRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsZGF0YUFycmF5KTt9fX19Y2F0Y2goZSkge3RoaXMub25FcnJvcihlKTt9aWYobnVsbCAhPSBkYXRhKXt0aGlzLm9uRGF0YShkYXRhKTt9fTsgLyoqXHJcbiAqIENoZWNrIGlmIGl0IGhhcyBYRG9tYWluUmVxdWVzdC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1JlcXVlc3QucHJvdG90eXBlLmhhc1hEUiA9IGZ1bmN0aW9uKCl7cmV0dXJuICd1bmRlZmluZWQnICE9PSB0eXBlb2YgZ2xvYmFsLlhEb21haW5SZXF1ZXN0ICYmICF0aGlzLnhzICYmIHRoaXMuZW5hYmxlc1hEUjt9OyAvKipcclxuICogQWJvcnRzIHRoZSByZXF1ZXN0LlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9SZXF1ZXN0LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCl7dGhpcy5jbGVhbnVwKCk7fTsgLyoqXHJcbiAqIEFib3J0cyBwZW5kaW5nIHJlcXVlc3RzIHdoZW4gdW5sb2FkaW5nIHRoZSB3aW5kb3cuIFRoaXMgaXMgbmVlZGVkIHRvIHByZXZlbnRcclxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xyXG4gKiBlbWl0dGVkLlxyXG4gKi9pZihnbG9iYWwuZG9jdW1lbnQpe1JlcXVlc3QucmVxdWVzdHNDb3VudCA9IDA7UmVxdWVzdC5yZXF1ZXN0cyA9IHt9O2lmKGdsb2JhbC5hdHRhY2hFdmVudCl7Z2xvYmFsLmF0dGFjaEV2ZW50KCdvbnVubG9hZCcsdW5sb2FkSGFuZGxlcik7fWVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpe2dsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLHVubG9hZEhhbmRsZXIsZmFsc2UpO319ZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpe2Zvcih2YXIgaSBpbiBSZXF1ZXN0LnJlcXVlc3RzKSB7aWYoUmVxdWVzdC5yZXF1ZXN0cy5oYXNPd25Qcm9wZXJ0eShpKSl7UmVxdWVzdC5yZXF1ZXN0c1tpXS5hYm9ydCgpO319fX0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHtcIi4vcG9sbGluZ1wiOjgsXCJjb21wb25lbnQtZW1pdHRlclwiOjE1LFwiY29tcG9uZW50LWluaGVyaXRcIjoxNixcImRlYnVnXCI6MTcsXCJ4bWxodHRwcmVxdWVzdC1zc2xcIjoxMH1dLDg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICovdmFyIFRyYW5zcG9ydD1fZGVyZXFfKCcuLi90cmFuc3BvcnQnKTt2YXIgcGFyc2Vxcz1fZGVyZXFfKCdwYXJzZXFzJyk7dmFyIHBhcnNlcj1fZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7dmFyIGluaGVyaXQ9X2RlcmVxXygnY29tcG9uZW50LWluaGVyaXQnKTt2YXIgeWVhc3Q9X2RlcmVxXygneWVhc3QnKTt2YXIgZGVidWc9X2RlcmVxXygnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpwb2xsaW5nJyk7IC8qKlxyXG4gKiBNb2R1bGUgZXhwb3J0cy5cclxuICovbW9kdWxlLmV4cG9ydHMgPSBQb2xsaW5nOyAvKipcclxuICogSXMgWEhSMiBzdXBwb3J0ZWQ/XHJcbiAqL3ZhciBoYXNYSFIyPShmdW5jdGlvbigpe3ZhciBYTUxIdHRwUmVxdWVzdD1fZGVyZXFfKCd4bWxodHRwcmVxdWVzdC1zc2wnKTt2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdCh7eGRvbWFpbjpmYWxzZX0pO3JldHVybiBudWxsICE9IHhoci5yZXNwb25zZVR5cGU7fSkoKTsgLyoqXHJcbiAqIFBvbGxpbmcgaW50ZXJmYWNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZnVuY3Rpb24gUG9sbGluZyhvcHRzKXt2YXIgZm9yY2VCYXNlNjQ9b3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0O2lmKCFoYXNYSFIyIHx8IGZvcmNlQmFzZTY0KXt0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7fVRyYW5zcG9ydC5jYWxsKHRoaXMsb3B0cyk7fSAvKipcclxuICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXHJcbiAqL2luaGVyaXQoUG9sbGluZyxUcmFuc3BvcnQpOyAvKipcclxuICogVHJhbnNwb3J0IG5hbWUuXHJcbiAqL1BvbGxpbmcucHJvdG90eXBlLm5hbWUgPSAncG9sbGluZyc7IC8qKlxyXG4gKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXHJcbiAqIHdoZW4gdGhlIHRyYW5zcG9ydCBpcyBvcGVuLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovUG9sbGluZy5wcm90b3R5cGUuZG9PcGVuID0gZnVuY3Rpb24oKXt0aGlzLnBvbGwoKTt9OyAvKipcclxuICogUGF1c2VzIHBvbGxpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovUG9sbGluZy5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbihvblBhdXNlKXt2YXIgcGVuZGluZz0wO3ZhciBzZWxmPXRoaXM7dGhpcy5yZWFkeVN0YXRlID0gJ3BhdXNpbmcnO2Z1bmN0aW9uIHBhdXNlKCl7ZGVidWcoJ3BhdXNlZCcpO3NlbGYucmVhZHlTdGF0ZSA9ICdwYXVzZWQnO29uUGF1c2UoKTt9aWYodGhpcy5wb2xsaW5nIHx8ICF0aGlzLndyaXRhYmxlKXt2YXIgdG90YWw9MDtpZih0aGlzLnBvbGxpbmcpe2RlYnVnKCd3ZSBhcmUgY3VycmVudGx5IHBvbGxpbmcgLSB3YWl0aW5nIHRvIHBhdXNlJyk7dG90YWwrKzt0aGlzLm9uY2UoJ3BvbGxDb21wbGV0ZScsZnVuY3Rpb24oKXtkZWJ1ZygncHJlLXBhdXNlIHBvbGxpbmcgY29tcGxldGUnKTstLXRvdGFsIHx8IHBhdXNlKCk7fSk7fWlmKCF0aGlzLndyaXRhYmxlKXtkZWJ1Zygnd2UgYXJlIGN1cnJlbnRseSB3cml0aW5nIC0gd2FpdGluZyB0byBwYXVzZScpO3RvdGFsKys7dGhpcy5vbmNlKCdkcmFpbicsZnVuY3Rpb24oKXtkZWJ1ZygncHJlLXBhdXNlIHdyaXRpbmcgY29tcGxldGUnKTstLXRvdGFsIHx8IHBhdXNlKCk7fSk7fX1lbHNlIHtwYXVzZSgpO319OyAvKipcclxuICogU3RhcnRzIHBvbGxpbmcgY3ljbGUuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1BvbGxpbmcucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbigpe2RlYnVnKCdwb2xsaW5nJyk7dGhpcy5wb2xsaW5nID0gdHJ1ZTt0aGlzLmRvUG9sbCgpO3RoaXMuZW1pdCgncG9sbCcpO307IC8qKlxyXG4gKiBPdmVybG9hZHMgb25EYXRhIHRvIGRldGVjdCBwYXlsb2Fkcy5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1BvbGxpbmcucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe3ZhciBzZWxmPXRoaXM7ZGVidWcoJ3BvbGxpbmcgZ290IGRhdGEgJXMnLGRhdGEpO3ZhciBjYWxsYmFjaz1mdW5jdGlvbiBjYWxsYmFjayhwYWNrZXQsaW5kZXgsdG90YWwpeyAvLyBpZiBpdHMgdGhlIGZpcnN0IG1lc3NhZ2Ugd2UgY29uc2lkZXIgdGhlIHRyYW5zcG9ydCBvcGVuXG5pZignb3BlbmluZycgPT0gc2VsZi5yZWFkeVN0YXRlKXtzZWxmLm9uT3BlbigpO30gLy8gaWYgaXRzIGEgY2xvc2UgcGFja2V0LCB3ZSBjbG9zZSB0aGUgb25nb2luZyByZXF1ZXN0c1xuaWYoJ2Nsb3NlJyA9PSBwYWNrZXQudHlwZSl7c2VsZi5vbkNsb3NlKCk7cmV0dXJuIGZhbHNlO30gLy8gb3RoZXJ3aXNlIGJ5cGFzcyBvbkRhdGEgYW5kIGhhbmRsZSB0aGUgbWVzc2FnZVxuc2VsZi5vblBhY2tldChwYWNrZXQpO307IC8vIGRlY29kZSBwYXlsb2FkXG5wYXJzZXIuZGVjb2RlUGF5bG9hZChkYXRhLHRoaXMuc29ja2V0LmJpbmFyeVR5cGUsY2FsbGJhY2spOyAvLyBpZiBhbiBldmVudCBkaWQgbm90IHRyaWdnZXIgY2xvc2luZ1xuaWYoJ2Nsb3NlZCcgIT0gdGhpcy5yZWFkeVN0YXRlKXsgLy8gaWYgd2UgZ290IGRhdGEgd2UncmUgbm90IHBvbGxpbmdcbnRoaXMucG9sbGluZyA9IGZhbHNlO3RoaXMuZW1pdCgncG9sbENvbXBsZXRlJyk7aWYoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSl7dGhpcy5wb2xsKCk7fWVsc2Uge2RlYnVnKCdpZ25vcmluZyBwb2xsIC0gdHJhbnNwb3J0IHN0YXRlIFwiJXNcIicsdGhpcy5yZWFkeVN0YXRlKTt9fX07IC8qKlxyXG4gKiBGb3IgcG9sbGluZywgc2VuZCBhIGNsb3NlIHBhY2tldC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1BvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UgPSBmdW5jdGlvbigpe3ZhciBzZWxmPXRoaXM7ZnVuY3Rpb24gY2xvc2UoKXtkZWJ1Zygnd3JpdGluZyBjbG9zZSBwYWNrZXQnKTtzZWxmLndyaXRlKFt7dHlwZTonY2xvc2UnfV0pO31pZignb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKXtkZWJ1ZygndHJhbnNwb3J0IG9wZW4gLSBjbG9zaW5nJyk7Y2xvc2UoKTt9ZWxzZSB7IC8vIGluIGNhc2Ugd2UncmUgdHJ5aW5nIHRvIGNsb3NlIHdoaWxlXG4vLyBoYW5kc2hha2luZyBpcyBpbiBwcm9ncmVzcyAoR0gtMTY0KVxuZGVidWcoJ3RyYW5zcG9ydCBub3Qgb3BlbiAtIGRlZmVycmluZyBjbG9zZScpO3RoaXMub25jZSgnb3BlbicsY2xvc2UpO319OyAvKipcclxuICogV3JpdGVzIGEgcGFja2V0cyBwYXlsb2FkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHBhY2tldHNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZHJhaW4gY2FsbGJhY2tcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1BvbGxpbmcucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24ocGFja2V0cyl7dmFyIHNlbGY9dGhpczt0aGlzLndyaXRhYmxlID0gZmFsc2U7dmFyIGNhbGxiYWNrZm49ZnVuY3Rpb24gY2FsbGJhY2tmbigpe3NlbGYud3JpdGFibGUgPSB0cnVlO3NlbGYuZW1pdCgnZHJhaW4nKTt9O3ZhciBzZWxmPXRoaXM7cGFyc2VyLmVuY29kZVBheWxvYWQocGFja2V0cyx0aGlzLnN1cHBvcnRzQmluYXJ5LGZ1bmN0aW9uKGRhdGEpe3NlbGYuZG9Xcml0ZShkYXRhLGNhbGxiYWNrZm4pO30pO307IC8qKlxyXG4gKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovUG9sbGluZy5wcm90b3R5cGUudXJpID0gZnVuY3Rpb24oKXt2YXIgcXVlcnk9dGhpcy5xdWVyeSB8fCB7fTt2YXIgc2NoZW1hPXRoaXMuc2VjdXJlPydodHRwcyc6J2h0dHAnO3ZhciBwb3J0PScnOyAvLyBjYWNoZSBidXN0aW5nIGlzIGZvcmNlZFxuaWYoZmFsc2UgIT09IHRoaXMudGltZXN0YW1wUmVxdWVzdHMpe3F1ZXJ5W3RoaXMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTt9aWYoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCl7cXVlcnkuYjY0ID0gMTt9cXVlcnkgPSBwYXJzZXFzLmVuY29kZShxdWVyeSk7IC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG5pZih0aGlzLnBvcnQgJiYgKCdodHRwcycgPT0gc2NoZW1hICYmIHRoaXMucG9ydCAhPSA0NDMgfHwgJ2h0dHAnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gODApKXtwb3J0ID0gJzonICsgdGhpcy5wb3J0O30gLy8gcHJlcGVuZCA/IHRvIHF1ZXJ5XG5pZihxdWVyeS5sZW5ndGgpe3F1ZXJ5ID0gJz8nICsgcXVlcnk7fXZhciBpcHY2PXRoaXMuaG9zdG5hbWUuaW5kZXhPZignOicpICE9PSAtMTtyZXR1cm4gc2NoZW1hICsgJzovLycgKyAoaXB2Nj8nWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nOnRoaXMuaG9zdG5hbWUpICsgcG9ydCArIHRoaXMucGF0aCArIHF1ZXJ5O307fSx7XCIuLi90cmFuc3BvcnRcIjo0LFwiY29tcG9uZW50LWluaGVyaXRcIjoxNixcImRlYnVnXCI6MTcsXCJlbmdpbmUuaW8tcGFyc2VyXCI6MTksXCJwYXJzZXFzXCI6MjcsXCJ4bWxodHRwcmVxdWVzdC1zc2xcIjoxMCxcInllYXN0XCI6MzB9XSw5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL3ZhciBUcmFuc3BvcnQ9X2RlcmVxXygnLi4vdHJhbnNwb3J0Jyk7dmFyIHBhcnNlcj1fZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7dmFyIHBhcnNlcXM9X2RlcmVxXygncGFyc2VxcycpO3ZhciBpbmhlcml0PV9kZXJlcV8oJ2NvbXBvbmVudC1pbmhlcml0Jyk7dmFyIHllYXN0PV9kZXJlcV8oJ3llYXN0Jyk7dmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6d2Vic29ja2V0Jyk7dmFyIEJyb3dzZXJXZWJTb2NrZXQ9Z2xvYmFsLldlYlNvY2tldCB8fCBnbG9iYWwuTW96V2ViU29ja2V0OyAvKipcclxuICogR2V0IGVpdGhlciB0aGUgYFdlYlNvY2tldGAgb3IgYE1veldlYlNvY2tldGAgZ2xvYmFsc1xyXG4gKiBpbiB0aGUgYnJvd3NlciBvciB0aGUgV2ViU29ja2V0LWNvbXBhdGlibGUgaW50ZXJmYWNlXHJcbiAqIGV4cG9zZWQgYnkgYHdzYCBmb3IgTm9kZSBlbnZpcm9ubWVudC5cclxuICovdmFyIFdlYlNvY2tldD1Ccm93c2VyV2ViU29ja2V0IHx8ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJz9udWxsOl9kZXJlcV8oJ3dzJykpOyAvKipcclxuICogTW9kdWxlIGV4cG9ydHMuXHJcbiAqL21vZHVsZS5leHBvcnRzID0gV1M7IC8qKlxyXG4gKiBXZWJTb2NrZXQgdHJhbnNwb3J0IGNvbnN0cnVjdG9yLlxyXG4gKlxyXG4gKiBAYXBpIHtPYmplY3R9IGNvbm5lY3Rpb24gb3B0aW9uc1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBXUyhvcHRzKXt2YXIgZm9yY2VCYXNlNjQ9b3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0O2lmKGZvcmNlQmFzZTY0KXt0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7fXRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlO1RyYW5zcG9ydC5jYWxsKHRoaXMsb3B0cyk7fSAvKipcclxuICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXHJcbiAqL2luaGVyaXQoV1MsVHJhbnNwb3J0KTsgLyoqXHJcbiAqIFRyYW5zcG9ydCBuYW1lLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9XUy5wcm90b3R5cGUubmFtZSA9ICd3ZWJzb2NrZXQnOyAvKlxyXG4gKiBXZWJTb2NrZXRzIHN1cHBvcnQgYmluYXJ5XHJcbiAqL1dTLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IHRydWU7IC8qKlxyXG4gKiBPcGVucyBzb2NrZXQuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9XUy5wcm90b3R5cGUuZG9PcGVuID0gZnVuY3Rpb24oKXtpZighdGhpcy5jaGVjaygpKXsgLy8gbGV0IHByb2JlIHRpbWVvdXRcbnJldHVybjt9dmFyIHNlbGY9dGhpczt2YXIgdXJpPXRoaXMudXJpKCk7dmFyIHByb3RvY29scz12b2lkIDA7dmFyIG9wdHM9e2FnZW50OnRoaXMuYWdlbnQscGVyTWVzc2FnZURlZmxhdGU6dGhpcy5wZXJNZXNzYWdlRGVmbGF0ZX07IC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxub3B0cy5wZnggPSB0aGlzLnBmeDtvcHRzLmtleSA9IHRoaXMua2V5O29wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7b3B0cy5jYSA9IHRoaXMuY2E7b3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO29wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7aWYodGhpcy5leHRyYUhlYWRlcnMpe29wdHMuaGVhZGVycyA9IHRoaXMuZXh0cmFIZWFkZXJzO310aGlzLndzID0gQnJvd3NlcldlYlNvY2tldD9uZXcgV2ViU29ja2V0KHVyaSk6bmV3IFdlYlNvY2tldCh1cmkscHJvdG9jb2xzLG9wdHMpO2lmKHRoaXMud3MuYmluYXJ5VHlwZSA9PT0gdW5kZWZpbmVkKXt0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7fWlmKHRoaXMud3Muc3VwcG9ydHMgJiYgdGhpcy53cy5zdXBwb3J0cy5iaW5hcnkpe3RoaXMuc3VwcG9ydHNCaW5hcnkgPSB0cnVlO3RoaXMud3MuYmluYXJ5VHlwZSA9ICdidWZmZXInO31lbHNlIHt0aGlzLndzLmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInO310aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7fTsgLyoqXHJcbiAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBzb2NrZXRcclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1dTLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCl7dmFyIHNlbGY9dGhpczt0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uKCl7c2VsZi5vbk9wZW4oKTt9O3RoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uKCl7c2VsZi5vbkNsb3NlKCk7fTt0aGlzLndzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2KXtzZWxmLm9uRGF0YShldi5kYXRhKTt9O3RoaXMud3Mub25lcnJvciA9IGZ1bmN0aW9uKGUpe3NlbGYub25FcnJvcignd2Vic29ja2V0IGVycm9yJyxlKTt9O307IC8qKlxyXG4gKiBPdmVycmlkZSBgb25EYXRhYCB0byB1c2UgYSB0aW1lciBvbiBpT1MuXHJcbiAqIFNlZTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vbWxvdWdocmFuLzIwNTIwMDZcclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2lmKCd1bmRlZmluZWQnICE9IHR5cGVvZiBuYXZpZ2F0b3IgJiYgL2lQYWR8aVBob25lfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKXtXUy5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24oZGF0YSl7dmFyIHNlbGY9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7VHJhbnNwb3J0LnByb3RvdHlwZS5vbkRhdGEuY2FsbChzZWxmLGRhdGEpO30sMCk7fTt9IC8qKlxyXG4gKiBXcml0ZXMgZGF0YSB0byBzb2NrZXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IG9mIHBhY2tldHMuXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9XUy5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbihwYWNrZXRzKXt2YXIgc2VsZj10aGlzO3RoaXMud3JpdGFibGUgPSBmYWxzZTsgLy8gZW5jb2RlUGFja2V0IGVmZmljaWVudCBhcyBpdCB1c2VzIFdTIGZyYW1pbmdcbi8vIG5vIG5lZWQgZm9yIGVuY29kZVBheWxvYWRcbnZhciB0b3RhbD1wYWNrZXRzLmxlbmd0aDtmb3IodmFyIGk9MCxsPXRvdGFsO2kgPCBsO2krKykgeyhmdW5jdGlvbihwYWNrZXQpe3BhcnNlci5lbmNvZGVQYWNrZXQocGFja2V0LHNlbGYuc3VwcG9ydHNCaW5hcnksZnVuY3Rpb24oZGF0YSl7aWYoIUJyb3dzZXJXZWJTb2NrZXQpeyAvLyBhbHdheXMgY3JlYXRlIGEgbmV3IG9iamVjdCAoR0gtNDM3KVxudmFyIG9wdHM9e307aWYocGFja2V0Lm9wdGlvbnMpe29wdHMuY29tcHJlc3MgPSBwYWNrZXQub3B0aW9ucy5jb21wcmVzczt9aWYoc2VsZi5wZXJNZXNzYWdlRGVmbGF0ZSl7dmFyIGxlbj0nc3RyaW5nJyA9PSB0eXBlb2YgZGF0YT9nbG9iYWwuQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSk6ZGF0YS5sZW5ndGg7aWYobGVuIDwgc2VsZi5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpe29wdHMuY29tcHJlc3MgPSBmYWxzZTt9fX0gLy9Tb21ldGltZXMgdGhlIHdlYnNvY2tldCBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZCBidXQgdGhlIGJyb3dzZXIgZGlkbid0XG4vL2hhdmUgYSBjaGFuY2Ugb2YgaW5mb3JtaW5nIHVzIGFib3V0IGl0IHlldCwgaW4gdGhhdCBjYXNlIHNlbmQgd2lsbFxuLy90aHJvdyBhbiBlcnJvclxudHJ5e2lmKEJyb3dzZXJXZWJTb2NrZXQpeyAvLyBUeXBlRXJyb3IgaXMgdGhyb3duIHdoZW4gcGFzc2luZyB0aGUgc2Vjb25kIGFyZ3VtZW50IG9uIFNhZmFyaVxuc2VsZi53cy5zZW5kKGRhdGEpO31lbHNlIHtzZWxmLndzLnNlbmQoZGF0YSxvcHRzKTt9fWNhdGNoKGUpIHtkZWJ1Zygnd2Vic29ja2V0IGNsb3NlZCBiZWZvcmUgb25jbG9zZSBldmVudCcpO30tLXRvdGFsIHx8IGRvbmUoKTt9KTt9KShwYWNrZXRzW2ldKTt9ZnVuY3Rpb24gZG9uZSgpe3NlbGYuZW1pdCgnZmx1c2gnKTsgLy8gZmFrZSBkcmFpblxuLy8gZGVmZXIgdG8gbmV4dCB0aWNrIHRvIGFsbG93IFNvY2tldCB0byBjbGVhciB3cml0ZUJ1ZmZlclxuc2V0VGltZW91dChmdW5jdGlvbigpe3NlbGYud3JpdGFibGUgPSB0cnVlO3NlbGYuZW1pdCgnZHJhaW4nKTt9LDApO319OyAvKipcclxuICogQ2FsbGVkIHVwb24gY2xvc2VcclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1dTLnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24oKXtUcmFuc3BvcnQucHJvdG90eXBlLm9uQ2xvc2UuY2FsbCh0aGlzKTt9OyAvKipcclxuICogQ2xvc2VzIHNvY2tldC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1dTLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24oKXtpZih0eXBlb2YgdGhpcy53cyAhPT0gJ3VuZGVmaW5lZCcpe3RoaXMud3MuY2xvc2UoKTt9fTsgLyoqXHJcbiAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9XUy5wcm90b3R5cGUudXJpID0gZnVuY3Rpb24oKXt2YXIgcXVlcnk9dGhpcy5xdWVyeSB8fCB7fTt2YXIgc2NoZW1hPXRoaXMuc2VjdXJlPyd3c3MnOid3cyc7dmFyIHBvcnQ9Jyc7IC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG5pZih0aGlzLnBvcnQgJiYgKCd3c3MnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gNDQzIHx8ICd3cycgPT0gc2NoZW1hICYmIHRoaXMucG9ydCAhPSA4MCkpe3BvcnQgPSAnOicgKyB0aGlzLnBvcnQ7fSAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuaWYodGhpcy50aW1lc3RhbXBSZXF1ZXN0cyl7cXVlcnlbdGhpcy50aW1lc3RhbXBQYXJhbV0gPSB5ZWFzdCgpO30gLy8gY29tbXVuaWNhdGUgYmluYXJ5IHN1cHBvcnQgY2FwYWJpbGl0aWVzXG5pZighdGhpcy5zdXBwb3J0c0JpbmFyeSl7cXVlcnkuYjY0ID0gMTt9cXVlcnkgPSBwYXJzZXFzLmVuY29kZShxdWVyeSk7IC8vIHByZXBlbmQgPyB0byBxdWVyeVxuaWYocXVlcnkubGVuZ3RoKXtxdWVyeSA9ICc/JyArIHF1ZXJ5O312YXIgaXB2Nj10aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSAhPT0gLTE7cmV0dXJuIHNjaGVtYSArICc6Ly8nICsgKGlwdjY/J1snICsgdGhpcy5ob3N0bmFtZSArICddJzp0aGlzLmhvc3RuYW1lKSArIHBvcnQgKyB0aGlzLnBhdGggKyBxdWVyeTt9OyAvKipcclxuICogRmVhdHVyZSBkZXRlY3Rpb24gZm9yIFdlYlNvY2tldC5cclxuICpcclxuICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciB0aGlzIHRyYW5zcG9ydCBpcyBhdmFpbGFibGUuXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1dTLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKCl7cmV0dXJuICEhV2ViU29ja2V0ICYmICEoJ19faW5pdGlhbGl6ZScgaW4gV2ViU29ja2V0ICYmIHRoaXMubmFtZSA9PT0gV1MucHJvdG90eXBlLm5hbWUpO307fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se1wiLi4vdHJhbnNwb3J0XCI6NCxcImNvbXBvbmVudC1pbmhlcml0XCI6MTYsXCJkZWJ1Z1wiOjE3LFwiZW5naW5lLmlvLXBhcnNlclwiOjE5LFwicGFyc2Vxc1wiOjI3LFwid3NcIjp1bmRlZmluZWQsXCJ5ZWFzdFwiOjMwfV0sMTA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvLyBicm93c2VyIHNoaW0gZm9yIHhtbGh0dHByZXF1ZXN0IG1vZHVsZVxudmFyIGhhc0NPUlM9X2RlcmVxXygnaGFzLWNvcnMnKTttb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9wdHMpe3ZhciB4ZG9tYWluPW9wdHMueGRvbWFpbjsgLy8gc2NoZW1lIG11c3QgYmUgc2FtZSB3aGVuIHVzaWduIFhEb21haW5SZXF1ZXN0XG4vLyBodHRwOi8vYmxvZ3MubXNkbi5jb20vYi9pZWludGVybmFscy9hcmNoaXZlLzIwMTAvMDUvMTMveGRvbWFpbnJlcXVlc3QtcmVzdHJpY3Rpb25zLWxpbWl0YXRpb25zLWFuZC13b3JrYXJvdW5kcy5hc3B4XG52YXIgeHNjaGVtZT1vcHRzLnhzY2hlbWU7IC8vIFhEb21haW5SZXF1ZXN0IGhhcyBhIGZsb3cgb2Ygbm90IHNlbmRpbmcgY29va2llLCB0aGVyZWZvcmUgaXQgc2hvdWxkIGJlIGRpc2FibGVkIGFzIGEgZGVmYXVsdC5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL2VuZ2luZS5pby1jbGllbnQvcHVsbC8yMTdcbnZhciBlbmFibGVzWERSPW9wdHMuZW5hYmxlc1hEUjsgLy8gWE1MSHR0cFJlcXVlc3QgY2FuIGJlIGRpc2FibGVkIG9uIElFXG50cnl7aWYoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSl7cmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO319Y2F0Y2goZSkge30gLy8gVXNlIFhEb21haW5SZXF1ZXN0IGZvciBJRTggaWYgZW5hYmxlc1hEUiBpcyB0cnVlXG4vLyBiZWNhdXNlIGxvYWRpbmcgYmFyIGtlZXBzIGZsYXNoaW5nIHdoZW4gdXNpbmcganNvbnAtcG9sbGluZ1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3l1amlvc2FrYS9zb2NrZS5pby1pZTgtbG9hZGluZy1leGFtcGxlXG50cnl7aWYoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIFhEb21haW5SZXF1ZXN0ICYmICF4c2NoZW1lICYmIGVuYWJsZXNYRFIpe3JldHVybiBuZXcgWERvbWFpblJlcXVlc3QoKTt9fWNhdGNoKGUpIHt9aWYoIXhkb21haW4pe3RyeXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7fWNhdGNoKGUpIHt9fX07fSx7XCJoYXMtY29yc1wiOjIyfV0sMTE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe21vZHVsZS5leHBvcnRzID0gYWZ0ZXI7ZnVuY3Rpb24gYWZ0ZXIoY291bnQsY2FsbGJhY2ssZXJyX2NiKXt2YXIgYmFpbD1mYWxzZTtlcnJfY2IgPSBlcnJfY2IgfHwgbm9vcDtwcm94eS5jb3VudCA9IGNvdW50O3JldHVybiBjb3VudCA9PT0gMD9jYWxsYmFjaygpOnByb3h5O2Z1bmN0aW9uIHByb3h5KGVycixyZXN1bHQpe2lmKHByb3h5LmNvdW50IDw9IDApe3Rocm93IG5ldyBFcnJvcignYWZ0ZXIgY2FsbGVkIHRvbyBtYW55IHRpbWVzJyk7fS0tcHJveHkuY291bnQ7IC8vIGFmdGVyIGZpcnN0IGVycm9yLCByZXN0IGFyZSBwYXNzZWQgdG8gZXJyX2NiXG5pZihlcnIpe2JhaWwgPSB0cnVlO2NhbGxiYWNrKGVycik7IC8vIGZ1dHVyZSBlcnJvciBjYWxsYmFja3Mgd2lsbCBnbyB0byBlcnJvciBoYW5kbGVyXG5jYWxsYmFjayA9IGVycl9jYjt9ZWxzZSBpZihwcm94eS5jb3VudCA9PT0gMCAmJiAhYmFpbCl7Y2FsbGJhY2sobnVsbCxyZXN1bHQpO319fWZ1bmN0aW9uIG5vb3AoKXt9fSx7fV0sMTI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogQW4gYWJzdHJhY3Rpb24gZm9yIHNsaWNpbmcgYW4gYXJyYXlidWZmZXIgZXZlbiB3aGVuXHJcbiAqIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSBpcyBub3Qgc3VwcG9ydGVkXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyYXlidWZmZXIsc3RhcnQsZW5kKXt2YXIgYnl0ZXM9YXJyYXlidWZmZXIuYnl0ZUxlbmd0aDtzdGFydCA9IHN0YXJ0IHx8IDA7ZW5kID0gZW5kIHx8IGJ5dGVzO2lmKGFycmF5YnVmZmVyLnNsaWNlKXtyZXR1cm4gYXJyYXlidWZmZXIuc2xpY2Uoc3RhcnQsZW5kKTt9aWYoc3RhcnQgPCAwKXtzdGFydCArPSBieXRlczt9aWYoZW5kIDwgMCl7ZW5kICs9IGJ5dGVzO31pZihlbmQgPiBieXRlcyl7ZW5kID0gYnl0ZXM7fWlmKHN0YXJ0ID49IGJ5dGVzIHx8IHN0YXJ0ID49IGVuZCB8fCBieXRlcyA9PT0gMCl7cmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKTt9dmFyIGFidj1uZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7dmFyIHJlc3VsdD1uZXcgVWludDhBcnJheShlbmQgLSBzdGFydCk7Zm9yKHZhciBpPXN0YXJ0LGlpPTA7aSA8IGVuZDtpKyssaWkrKykge3Jlc3VsdFtpaV0gPSBhYnZbaV07fXJldHVybiByZXN1bHQuYnVmZmVyO307fSx7fV0sMTM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKlxyXG4gKiBiYXNlNjQtYXJyYXlidWZmZXJcclxuICogaHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlclxyXG4gKlxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIgTmlrbGFzIHZvbiBIZXJ0emVuXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuICovKGZ1bmN0aW9uKGNoYXJzKXtcInVzZSBzdHJpY3RcIjtleHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyKXt2YXIgYnl0ZXM9bmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLGksbGVuPWJ5dGVzLmxlbmd0aCxiYXNlNjQ9XCJcIjtmb3IoaSA9IDA7aSA8IGxlbjtpICs9IDMpIHtiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07YmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpXSAmIDMpIDw8IDQgfCBieXRlc1tpICsgMV0gPj4gNF07YmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpICsgMV0gJiAxNSkgPDwgMiB8IGJ5dGVzW2kgKyAyXSA+PiA2XTtiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaSArIDJdICYgNjNdO31pZihsZW4gJSAzID09PSAyKXtiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsYmFzZTY0Lmxlbmd0aCAtIDEpICsgXCI9XCI7fWVsc2UgaWYobGVuICUgMyA9PT0gMSl7YmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLGJhc2U2NC5sZW5ndGggLSAyKSArIFwiPT1cIjt9cmV0dXJuIGJhc2U2NDt9O2V4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24oYmFzZTY0KXt2YXIgYnVmZmVyTGVuZ3RoPWJhc2U2NC5sZW5ndGggKiAwLjc1LGxlbj1iYXNlNjQubGVuZ3RoLGkscD0wLGVuY29kZWQxLGVuY29kZWQyLGVuY29kZWQzLGVuY29kZWQ0O2lmKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMV0gPT09IFwiPVwiKXtidWZmZXJMZW5ndGgtLTtpZihiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSBcIj1cIil7YnVmZmVyTGVuZ3RoLS07fX12YXIgYXJyYXlidWZmZXI9bmV3IEFycmF5QnVmZmVyKGJ1ZmZlckxlbmd0aCksYnl0ZXM9bmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO2ZvcihpID0gMDtpIDwgbGVuO2kgKz0gNCkge2VuY29kZWQxID0gY2hhcnMuaW5kZXhPZihiYXNlNjRbaV0pO2VuY29kZWQyID0gY2hhcnMuaW5kZXhPZihiYXNlNjRbaSArIDFdKTtlbmNvZGVkMyA9IGNoYXJzLmluZGV4T2YoYmFzZTY0W2kgKyAyXSk7ZW5jb2RlZDQgPSBjaGFycy5pbmRleE9mKGJhc2U2NFtpICsgM10pO2J5dGVzW3ArK10gPSBlbmNvZGVkMSA8PCAyIHwgZW5jb2RlZDIgPj4gNDtieXRlc1twKytdID0gKGVuY29kZWQyICYgMTUpIDw8IDQgfCBlbmNvZGVkMyA+PiAyO2J5dGVzW3ArK10gPSAoZW5jb2RlZDMgJiAzKSA8PCA2IHwgZW5jb2RlZDQgJiA2Mzt9cmV0dXJuIGFycmF5YnVmZmVyO307fSkoXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIpO30se31dLDE0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXHJcbiAqIENyZWF0ZSBhIGJsb2IgYnVpbGRlciBldmVuIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XHJcbiAqL3ZhciBCbG9iQnVpbGRlcj1nbG9iYWwuQmxvYkJ1aWxkZXIgfHwgZ2xvYmFsLldlYktpdEJsb2JCdWlsZGVyIHx8IGdsb2JhbC5NU0Jsb2JCdWlsZGVyIHx8IGdsb2JhbC5Nb3pCbG9iQnVpbGRlcjsgLyoqXHJcbiAqIENoZWNrIGlmIEJsb2IgY29uc3RydWN0b3IgaXMgc3VwcG9ydGVkXHJcbiAqL3ZhciBibG9iU3VwcG9ydGVkPShmdW5jdGlvbigpe3RyeXt2YXIgYT1uZXcgQmxvYihbJ2hpJ10pO3JldHVybiBhLnNpemUgPT09IDI7fWNhdGNoKGUpIHtyZXR1cm4gZmFsc2U7fX0pKCk7IC8qKlxyXG4gKiBDaGVjayBpZiBCbG9iIGNvbnN0cnVjdG9yIHN1cHBvcnRzIEFycmF5QnVmZmVyVmlld3NcclxuICogRmFpbHMgaW4gU2FmYXJpIDYsIHNvIHdlIG5lZWQgdG8gbWFwIHRvIEFycmF5QnVmZmVycyB0aGVyZS5cclxuICovdmFyIGJsb2JTdXBwb3J0c0FycmF5QnVmZmVyVmlldz1ibG9iU3VwcG9ydGVkICYmIChmdW5jdGlvbigpe3RyeXt2YXIgYj1uZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoWzEsMl0pXSk7cmV0dXJuIGIuc2l6ZSA9PT0gMjt9Y2F0Y2goZSkge3JldHVybiBmYWxzZTt9fSkoKTsgLyoqXHJcbiAqIENoZWNrIGlmIEJsb2JCdWlsZGVyIGlzIHN1cHBvcnRlZFxyXG4gKi92YXIgYmxvYkJ1aWxkZXJTdXBwb3J0ZWQ9QmxvYkJ1aWxkZXIgJiYgQmxvYkJ1aWxkZXIucHJvdG90eXBlLmFwcGVuZCAmJiBCbG9iQnVpbGRlci5wcm90b3R5cGUuZ2V0QmxvYjsgLyoqXHJcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IG1hcHMgQXJyYXlCdWZmZXJWaWV3cyB0byBBcnJheUJ1ZmZlcnNcclxuICogVXNlZCBieSBCbG9iQnVpbGRlciBjb25zdHJ1Y3RvciBhbmQgb2xkIGJyb3dzZXJzIHRoYXQgZGlkbid0XHJcbiAqIHN1cHBvcnQgaXQgaW4gdGhlIEJsb2IgY29uc3RydWN0b3IuXHJcbiAqL2Z1bmN0aW9uIG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KXtmb3IodmFyIGk9MDtpIDwgYXJ5Lmxlbmd0aDtpKyspIHt2YXIgY2h1bms9YXJ5W2ldO2lmKGNodW5rLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKXt2YXIgYnVmPWNodW5rLmJ1ZmZlcjsgLy8gaWYgdGhpcyBpcyBhIHN1YmFycmF5LCBtYWtlIGEgY29weSBzbyB3ZSBvbmx5XG4vLyBpbmNsdWRlIHRoZSBzdWJhcnJheSByZWdpb24gZnJvbSB0aGUgdW5kZXJseWluZyBidWZmZXJcbmlmKGNodW5rLmJ5dGVMZW5ndGggIT09IGJ1Zi5ieXRlTGVuZ3RoKXt2YXIgY29weT1uZXcgVWludDhBcnJheShjaHVuay5ieXRlTGVuZ3RoKTtjb3B5LnNldChuZXcgVWludDhBcnJheShidWYsY2h1bmsuYnl0ZU9mZnNldCxjaHVuay5ieXRlTGVuZ3RoKSk7YnVmID0gY29weS5idWZmZXI7fWFyeVtpXSA9IGJ1Zjt9fX1mdW5jdGlvbiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yKGFyeSxvcHRpb25zKXtvcHRpb25zID0gb3B0aW9ucyB8fCB7fTt2YXIgYmI9bmV3IEJsb2JCdWlsZGVyKCk7bWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpO2Zvcih2YXIgaT0wO2kgPCBhcnkubGVuZ3RoO2krKykge2JiLmFwcGVuZChhcnlbaV0pO31yZXR1cm4gb3B0aW9ucy50eXBlP2JiLmdldEJsb2Iob3B0aW9ucy50eXBlKTpiYi5nZXRCbG9iKCk7fTtmdW5jdGlvbiBCbG9iQ29uc3RydWN0b3IoYXJ5LG9wdGlvbnMpe21hcEFycmF5QnVmZmVyVmlld3MoYXJ5KTtyZXR1cm4gbmV3IEJsb2IoYXJ5LG9wdGlvbnMgfHwge30pO307bW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKXtpZihibG9iU3VwcG9ydGVkKXtyZXR1cm4gYmxvYlN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3P2dsb2JhbC5CbG9iOkJsb2JDb25zdHJ1Y3Rvcjt9ZWxzZSBpZihibG9iQnVpbGRlclN1cHBvcnRlZCl7cmV0dXJuIEJsb2JCdWlsZGVyQ29uc3RydWN0b3I7fWVsc2Uge3JldHVybiB1bmRlZmluZWQ7fX0pKCk7fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se31dLDE1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXHJcbiAqL21vZHVsZS5leHBvcnRzID0gRW1pdHRlcjsgLyoqXHJcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBFbWl0dGVyKG9iail7aWYob2JqKXJldHVybiBtaXhpbihvYmopO307IC8qKlxyXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2Z1bmN0aW9uIG1peGluKG9iail7Zm9yKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtvYmpba2V5XSA9IEVtaXR0ZXIucHJvdG90eXBlW2tleV07fXJldHVybiBvYmo7fSAvKipcclxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0VtaXR0ZXIucHJvdG90eXBlLm9uID0gRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LGZuKXt0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307KHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKS5wdXNoKGZuKTtyZXR1cm4gdGhpczt9OyAvKipcclxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXHJcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsZm4pe3ZhciBzZWxmPXRoaXM7dGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O2Z1bmN0aW9uIG9uKCl7c2VsZi5vZmYoZXZlbnQsb24pO2ZuLmFwcGx5KHRoaXMsYXJndW1lbnRzKTt9b24uZm4gPSBmbjt0aGlzLm9uKGV2ZW50LG9uKTtyZXR1cm4gdGhpczt9OyAvKipcclxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9FbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCxmbil7dGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9OyAvLyBhbGxcbmlmKDAgPT0gYXJndW1lbnRzLmxlbmd0aCl7dGhpcy5fY2FsbGJhY2tzID0ge307cmV0dXJuIHRoaXM7fSAvLyBzcGVjaWZpYyBldmVudFxudmFyIGNhbGxiYWNrcz10aGlzLl9jYWxsYmFja3NbZXZlbnRdO2lmKCFjYWxsYmFja3MpcmV0dXJuIHRoaXM7IC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbmlmKDEgPT0gYXJndW1lbnRzLmxlbmd0aCl7ZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tldmVudF07cmV0dXJuIHRoaXM7fSAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxudmFyIGNiO2Zvcih2YXIgaT0wO2kgPCBjYWxsYmFja3MubGVuZ3RoO2krKykge2NiID0gY2FsbGJhY2tzW2ldO2lmKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pe2NhbGxiYWNrcy5zcGxpY2UoaSwxKTticmVhazt9fXJldHVybiB0aGlzO307IC8qKlxyXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKi9FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTt2YXIgYXJncz1bXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSxjYWxsYmFja3M9dGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtpZihjYWxsYmFja3Mpe2NhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtmb3IodmFyIGk9MCxsZW49Y2FsbGJhY2tzLmxlbmd0aDtpIDwgbGVuOysraSkge2NhbGxiYWNrc1tpXS5hcHBseSh0aGlzLGFyZ3MpO319cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogQGFwaSBwdWJsaWNcclxuICovRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtyZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTt9OyAvKipcclxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe3JldHVybiAhIXRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7fTt9LHt9XSwxNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhLGIpe3ZhciBmbj1mdW5jdGlvbiBmbigpe307Zm4ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7YS5wcm90b3R5cGUgPSBuZXcgZm4oKTthLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGE7fTt9LHt9XSwxNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXHJcbiAqXHJcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cclxuICovZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gX2RlcmVxXygnLi9kZWJ1ZycpO2V4cG9ydHMubG9nID0gbG9nO2V4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7ZXhwb3J0cy5zYXZlID0gc2F2ZTtleHBvcnRzLmxvYWQgPSBsb2FkO2V4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO2V4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlP2Nocm9tZS5zdG9yYWdlLmxvY2FsOmxvY2Fsc3RvcmFnZSgpOyAvKipcclxuICogQ29sb3JzLlxyXG4gKi9leHBvcnRzLmNvbG9ycyA9IFsnbGlnaHRzZWFncmVlbicsJ2ZvcmVzdGdyZWVuJywnZ29sZGVucm9kJywnZG9kZ2VyYmx1ZScsJ2RhcmtvcmNoaWQnLCdjcmltc29uJ107IC8qKlxyXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxyXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cclxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxyXG4gKlxyXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xyXG4gKi9mdW5jdGlvbiB1c2VDb2xvcnMoKXsgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbnJldHVybiAnV2Via2l0QXBwZWFyYW5jZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlIHx8ICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG53aW5kb3cuY29uc29sZSAmJiAoY29uc29sZS5maXJlYnVnIHx8IGNvbnNvbGUuZXhjZXB0aW9uICYmIGNvbnNvbGUudGFibGUpIHx8ICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLDEwKSA+PSAzMTt9IC8qKlxyXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXHJcbiAqL2V4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odil7cmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO307IC8qKlxyXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIGZvcm1hdEFyZ3MoKXt2YXIgYXJncz1hcmd1bWVudHM7dmFyIHVzZUNvbG9ycz10aGlzLnVzZUNvbG9yczthcmdzWzBdID0gKHVzZUNvbG9ycz8nJWMnOicnKSArIHRoaXMubmFtZXNwYWNlICsgKHVzZUNvbG9ycz8nICVjJzonICcpICsgYXJnc1swXSArICh1c2VDb2xvcnM/JyVjICc6JyAnKSArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtpZighdXNlQ29sb3JzKXJldHVybiBhcmdzO3ZhciBjPSdjb2xvcjogJyArIHRoaXMuY29sb3I7YXJncyA9IFthcmdzWzBdLGMsJ2NvbG9yOiBpbmhlcml0J10uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsMSkpOyAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG52YXIgaW5kZXg9MDt2YXIgbGFzdEM9MDthcmdzWzBdLnJlcGxhY2UoLyVbYS16JV0vZyxmdW5jdGlvbihtYXRjaCl7aWYoJyUlJyA9PT0gbWF0Y2gpcmV0dXJuO2luZGV4Kys7aWYoJyVjJyA9PT0gbWF0Y2gpeyAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbi8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG5sYXN0QyA9IGluZGV4O319KTthcmdzLnNwbGljZShsYXN0QywwLGMpO3JldHVybiBhcmdzO30gLyoqXHJcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxyXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBsb2coKXsgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbi8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG5yZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlICYmIGNvbnNvbGUubG9nICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLGNvbnNvbGUsYXJndW1lbnRzKTt9IC8qKlxyXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2Z1bmN0aW9uIHNhdmUobmFtZXNwYWNlcyl7dHJ5e2lmKG51bGwgPT0gbmFtZXNwYWNlcyl7ZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7fWVsc2Uge2V4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7fX1jYXRjaChlKSB7fX0gLyoqXHJcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBsb2FkKCl7dmFyIHI7dHJ5e3IgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7fWNhdGNoKGUpIHt9cmV0dXJuIHI7fSAvKipcclxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cclxuICovZXhwb3J0cy5lbmFibGUobG9hZCgpKTsgLyoqXHJcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cclxuICpcclxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXHJcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXHJcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2Z1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpe3RyeXtyZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTt9Y2F0Y2goZSkge319fSx7XCIuL2RlYnVnXCI6MTh9XSwxODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXHJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXHJcbiAqXHJcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cclxuICovZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZGVidWc7ZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7ZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtleHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtleHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO2V4cG9ydHMuaHVtYW5pemUgPSBfZGVyZXFfKCdtcycpOyAvKipcclxuICogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXHJcbiAqL2V4cG9ydHMubmFtZXMgPSBbXTtleHBvcnRzLnNraXBzID0gW107IC8qKlxyXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXHJcbiAqXHJcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyY2FzZWQgbGV0dGVyLCBpLmUuIFwiblwiLlxyXG4gKi9leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTsgLyoqXHJcbiAqIFByZXZpb3VzbHkgYXNzaWduZWQgY29sb3IuXHJcbiAqL3ZhciBwcmV2Q29sb3I9MDsgLyoqXHJcbiAqIFByZXZpb3VzIGxvZyB0aW1lc3RhbXAuXHJcbiAqL3ZhciBwcmV2VGltZTsgLyoqXHJcbiAqIFNlbGVjdCBhIGNvbG9yLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBzZWxlY3RDb2xvcigpe3JldHVybiBleHBvcnRzLmNvbG9yc1twcmV2Q29sb3IrKyAlIGV4cG9ydHMuY29sb3JzLmxlbmd0aF07fSAvKipcclxuICogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIGRlYnVnKG5hbWVzcGFjZSl7IC8vIGRlZmluZSB0aGUgYGRpc2FibGVkYCB2ZXJzaW9uXG5mdW5jdGlvbiBkaXNhYmxlZCgpe31kaXNhYmxlZC5lbmFibGVkID0gZmFsc2U7IC8vIGRlZmluZSB0aGUgYGVuYWJsZWRgIHZlcnNpb25cbmZ1bmN0aW9uIGVuYWJsZWQoKXt2YXIgc2VsZj1lbmFibGVkOyAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxudmFyIGN1cnI9K25ldyBEYXRlKCk7dmFyIG1zPWN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7c2VsZi5kaWZmID0gbXM7c2VsZi5wcmV2ID0gcHJldlRpbWU7c2VsZi5jdXJyID0gY3VycjtwcmV2VGltZSA9IGN1cnI7IC8vIGFkZCB0aGUgYGNvbG9yYCBpZiBub3Qgc2V0XG5pZihudWxsID09IHNlbGYudXNlQ29sb3JzKXNlbGYudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtpZihudWxsID09IHNlbGYuY29sb3IgJiYgc2VsZi51c2VDb2xvcnMpc2VsZi5jb2xvciA9IHNlbGVjdENvbG9yKCk7dmFyIGFyZ3M9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTthcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7aWYoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKXsgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJW9cbmFyZ3MgPSBbJyVvJ10uY29uY2F0KGFyZ3MpO30gLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbnZhciBpbmRleD0wO2FyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EteiVdKS9nLGZ1bmN0aW9uKG1hdGNoLGZvcm1hdCl7IC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbmlmKG1hdGNoID09PSAnJSUnKXJldHVybiBtYXRjaDtpbmRleCsrO3ZhciBmb3JtYXR0ZXI9ZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07aWYoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcil7dmFyIHZhbD1hcmdzW2luZGV4XTttYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsdmFsKTsgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuYXJncy5zcGxpY2UoaW5kZXgsMSk7aW5kZXgtLTt9cmV0dXJuIG1hdGNoO30pO2lmKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmZvcm1hdEFyZ3Mpe2FyZ3MgPSBleHBvcnRzLmZvcm1hdEFyZ3MuYXBwbHkoc2VsZixhcmdzKTt9dmFyIGxvZ0ZuPWVuYWJsZWQubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7bG9nRm4uYXBwbHkoc2VsZixhcmdzKTt9ZW5hYmxlZC5lbmFibGVkID0gdHJ1ZTt2YXIgZm49ZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk/ZW5hYmxlZDpkaXNhYmxlZDtmbi5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7cmV0dXJuIGZuO30gLyoqXHJcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcclxuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpe2V4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTt2YXIgc3BsaXQ9KG5hbWVzcGFjZXMgfHwgJycpLnNwbGl0KC9bXFxzLF0rLyk7dmFyIGxlbj1zcGxpdC5sZW5ndGg7Zm9yKHZhciBpPTA7aSA8IGxlbjtpKyspIHtpZighc3BsaXRbaV0pY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG5uYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csJy4qPycpO2lmKG5hbWVzcGFjZXNbMF0gPT09ICctJyl7ZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTt9ZWxzZSB7ZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO319fSAvKipcclxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIGRpc2FibGUoKXtleHBvcnRzLmVuYWJsZSgnJyk7fSAvKipcclxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBlbmFibGVkKG5hbWUpe3ZhciBpLGxlbjtmb3IoaSA9IDAsbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7aSA8IGxlbjtpKyspIHtpZihleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpe3JldHVybiBmYWxzZTt9fWZvcihpID0gMCxsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDtpIDwgbGVuO2krKykge2lmKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSl7cmV0dXJuIHRydWU7fX1yZXR1cm4gZmFsc2U7fSAvKipcclxuICogQ29lcmNlIGB2YWxgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcclxuICogQHJldHVybiB7TWl4ZWR9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBjb2VyY2UodmFsKXtpZih2YWwgaW5zdGFuY2VvZiBFcnJvcilyZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO3JldHVybiB2YWw7fX0se1wibXNcIjoyNX1dLDE5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL3ZhciBrZXlzPV9kZXJlcV8oJy4va2V5cycpO3ZhciBoYXNCaW5hcnk9X2RlcmVxXygnaGFzLWJpbmFyeScpO3ZhciBzbGljZUJ1ZmZlcj1fZGVyZXFfKCdhcnJheWJ1ZmZlci5zbGljZScpO3ZhciBiYXNlNjRlbmNvZGVyPV9kZXJlcV8oJ2Jhc2U2NC1hcnJheWJ1ZmZlcicpO3ZhciBhZnRlcj1fZGVyZXFfKCdhZnRlcicpO3ZhciB1dGY4PV9kZXJlcV8oJ3V0ZjgnKTsgLyoqXHJcbiAqIENoZWNrIGlmIHdlIGFyZSBydW5uaW5nIGFuIGFuZHJvaWQgYnJvd3Nlci4gVGhhdCByZXF1aXJlcyB1cyB0byB1c2VcclxuICogQXJyYXlCdWZmZXIgd2l0aCBwb2xsaW5nIHRyYW5zcG9ydHMuLi5cclxuICpcclxuICogaHR0cDovL2doaW5kYS5uZXQvanBlZy1ibG9iLWFqYXgtYW5kcm9pZC9cclxuICovdmFyIGlzQW5kcm9pZD1uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpOyAvKipcclxuICogQ2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gUGhhbnRvbUpTLlxyXG4gKiBVcGxvYWRpbmcgYSBCbG9iIHdpdGggUGhhbnRvbUpTIGRvZXMgbm90IHdvcmsgY29ycmVjdGx5LCBhcyByZXBvcnRlZCBoZXJlOlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXJpeWEvcGhhbnRvbWpzL2lzc3Vlcy8xMTM5NVxyXG4gKiBAdHlwZSBib29sZWFuXHJcbiAqL3ZhciBpc1BoYW50b21KUz0vUGhhbnRvbUpTL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTsgLyoqXHJcbiAqIFdoZW4gdHJ1ZSwgYXZvaWRzIHVzaW5nIEJsb2JzIHRvIGVuY29kZSBwYXlsb2Fkcy5cclxuICogQHR5cGUgYm9vbGVhblxyXG4gKi92YXIgZG9udFNlbmRCbG9icz1pc0FuZHJvaWQgfHwgaXNQaGFudG9tSlM7IC8qKlxyXG4gKiBDdXJyZW50IHByb3RvY29sIHZlcnNpb24uXHJcbiAqL2V4cG9ydHMucHJvdG9jb2wgPSAzOyAvKipcclxuICogUGFja2V0IHR5cGVzLlxyXG4gKi92YXIgcGFja2V0cz1leHBvcnRzLnBhY2tldHMgPSB7b3BlbjowLCAvLyBub24td3NcbmNsb3NlOjEsIC8vIG5vbi13c1xucGluZzoyLHBvbmc6MyxtZXNzYWdlOjQsdXBncmFkZTo1LG5vb3A6Nn07dmFyIHBhY2tldHNsaXN0PWtleXMocGFja2V0cyk7IC8qKlxyXG4gKiBQcmVtYWRlIGVycm9yIHBhY2tldC5cclxuICovdmFyIGVycj17dHlwZTonZXJyb3InLGRhdGE6J3BhcnNlciBlcnJvcid9OyAvKipcclxuICogQ3JlYXRlIGEgYmxvYiBhcGkgZXZlbiBmb3IgYmxvYiBidWlsZGVyIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XHJcbiAqL3ZhciBCbG9iPV9kZXJlcV8oJ2Jsb2InKTsgLyoqXHJcbiAqIEVuY29kZXMgYSBwYWNrZXQuXHJcbiAqXHJcbiAqICAgICA8cGFja2V0IHR5cGUgaWQ+IFsgPGRhdGE+IF1cclxuICpcclxuICogRXhhbXBsZTpcclxuICpcclxuICogICAgIDVoZWxsbyB3b3JsZFxyXG4gKiAgICAgM1xyXG4gKiAgICAgNFxyXG4gKlxyXG4gKiBCaW5hcnkgaXMgZW5jb2RlZCBpbiBhbiBpZGVudGljYWwgcHJpbmNpcGxlXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9leHBvcnRzLmVuY29kZVBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCxzdXBwb3J0c0JpbmFyeSx1dGY4ZW5jb2RlLGNhbGxiYWNrKXtpZignZnVuY3Rpb24nID09IHR5cGVvZiBzdXBwb3J0c0JpbmFyeSl7Y2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtzdXBwb3J0c0JpbmFyeSA9IGZhbHNlO31pZignZnVuY3Rpb24nID09IHR5cGVvZiB1dGY4ZW5jb2RlKXtjYWxsYmFjayA9IHV0ZjhlbmNvZGU7dXRmOGVuY29kZSA9IG51bGw7fXZhciBkYXRhPXBhY2tldC5kYXRhID09PSB1bmRlZmluZWQ/dW5kZWZpbmVkOnBhY2tldC5kYXRhLmJ1ZmZlciB8fCBwYWNrZXQuZGF0YTtpZihnbG9iYWwuQXJyYXlCdWZmZXIgJiYgZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKXtyZXR1cm4gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKTt9ZWxzZSBpZihCbG9iICYmIGRhdGEgaW5zdGFuY2VvZiBnbG9iYWwuQmxvYil7cmV0dXJuIGVuY29kZUJsb2IocGFja2V0LHN1cHBvcnRzQmluYXJ5LGNhbGxiYWNrKTt9IC8vIG1pZ2h0IGJlIGFuIG9iamVjdCB3aXRoIHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBkYXRhQXNCYXNlNjRTdHJpbmcgfVxuaWYoZGF0YSAmJiBkYXRhLmJhc2U2NCl7cmV0dXJuIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsY2FsbGJhY2spO30gLy8gU2VuZGluZyBkYXRhIGFzIGEgdXRmLTggc3RyaW5nXG52YXIgZW5jb2RlZD1wYWNrZXRzW3BhY2tldC50eXBlXTsgLy8gZGF0YSBmcmFnbWVudCBpcyBvcHRpb25hbFxuaWYodW5kZWZpbmVkICE9PSBwYWNrZXQuZGF0YSl7ZW5jb2RlZCArPSB1dGY4ZW5jb2RlP3V0ZjguZW5jb2RlKFN0cmluZyhwYWNrZXQuZGF0YSkpOlN0cmluZyhwYWNrZXQuZGF0YSk7fXJldHVybiBjYWxsYmFjaygnJyArIGVuY29kZWQpO307ZnVuY3Rpb24gZW5jb2RlQmFzZTY0T2JqZWN0KHBhY2tldCxjYWxsYmFjayl7IC8vIHBhY2tldCBkYXRhIGlzIGFuIG9iamVjdCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbnZhciBtZXNzYWdlPSdiJyArIGV4cG9ydHMucGFja2V0c1twYWNrZXQudHlwZV0gKyBwYWNrZXQuZGF0YS5kYXRhO3JldHVybiBjYWxsYmFjayhtZXNzYWdlKTt9IC8qKlxyXG4gKiBFbmNvZGUgcGFja2V0IGhlbHBlcnMgZm9yIGJpbmFyeSB0eXBlc1xyXG4gKi9mdW5jdGlvbiBlbmNvZGVBcnJheUJ1ZmZlcihwYWNrZXQsc3VwcG9ydHNCaW5hcnksY2FsbGJhY2spe2lmKCFzdXBwb3J0c0JpbmFyeSl7cmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCxjYWxsYmFjayk7fXZhciBkYXRhPXBhY2tldC5kYXRhO3ZhciBjb250ZW50QXJyYXk9bmV3IFVpbnQ4QXJyYXkoZGF0YSk7dmFyIHJlc3VsdEJ1ZmZlcj1uZXcgVWludDhBcnJheSgxICsgZGF0YS5ieXRlTGVuZ3RoKTtyZXN1bHRCdWZmZXJbMF0gPSBwYWNrZXRzW3BhY2tldC50eXBlXTtmb3IodmFyIGk9MDtpIDwgY29udGVudEFycmF5Lmxlbmd0aDtpKyspIHtyZXN1bHRCdWZmZXJbaSArIDFdID0gY29udGVudEFycmF5W2ldO31yZXR1cm4gY2FsbGJhY2socmVzdWx0QnVmZmVyLmJ1ZmZlcik7fWZ1bmN0aW9uIGVuY29kZUJsb2JBc0FycmF5QnVmZmVyKHBhY2tldCxzdXBwb3J0c0JpbmFyeSxjYWxsYmFjayl7aWYoIXN1cHBvcnRzQmluYXJ5KXtyZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LGNhbGxiYWNrKTt9dmFyIGZyPW5ldyBGaWxlUmVhZGVyKCk7ZnIub25sb2FkID0gZnVuY3Rpb24oKXtwYWNrZXQuZGF0YSA9IGZyLnJlc3VsdDtleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsc3VwcG9ydHNCaW5hcnksdHJ1ZSxjYWxsYmFjayk7fTtyZXR1cm4gZnIucmVhZEFzQXJyYXlCdWZmZXIocGFja2V0LmRhdGEpO31mdW5jdGlvbiBlbmNvZGVCbG9iKHBhY2tldCxzdXBwb3J0c0JpbmFyeSxjYWxsYmFjayl7aWYoIXN1cHBvcnRzQmluYXJ5KXtyZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LGNhbGxiYWNrKTt9aWYoZG9udFNlbmRCbG9icyl7cmV0dXJuIGVuY29kZUJsb2JBc0FycmF5QnVmZmVyKHBhY2tldCxzdXBwb3J0c0JpbmFyeSxjYWxsYmFjayk7fXZhciBsZW5ndGg9bmV3IFVpbnQ4QXJyYXkoMSk7bGVuZ3RoWzBdID0gcGFja2V0c1twYWNrZXQudHlwZV07dmFyIGJsb2I9bmV3IEJsb2IoW2xlbmd0aC5idWZmZXIscGFja2V0LmRhdGFdKTtyZXR1cm4gY2FsbGJhY2soYmxvYik7fSAvKipcclxuICogRW5jb2RlcyBhIHBhY2tldCB3aXRoIGJpbmFyeSBkYXRhIGluIGEgYmFzZTY0IHN0cmluZ1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0LCBoYXMgYHR5cGVgIGFuZCBgZGF0YWBcclxuICogQHJldHVybiB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXHJcbiAqL2V4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0LGNhbGxiYWNrKXt2YXIgbWVzc2FnZT0nYicgKyBleHBvcnRzLnBhY2tldHNbcGFja2V0LnR5cGVdO2lmKEJsb2IgJiYgcGFja2V0LmRhdGEgaW5zdGFuY2VvZiBnbG9iYWwuQmxvYil7dmFyIGZyPW5ldyBGaWxlUmVhZGVyKCk7ZnIub25sb2FkID0gZnVuY3Rpb24oKXt2YXIgYjY0PWZyLnJlc3VsdC5zcGxpdCgnLCcpWzFdO2NhbGxiYWNrKG1lc3NhZ2UgKyBiNjQpO307cmV0dXJuIGZyLnJlYWRBc0RhdGFVUkwocGFja2V0LmRhdGEpO312YXIgYjY0ZGF0YTt0cnl7YjY0ZGF0YSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxuZXcgVWludDhBcnJheShwYWNrZXQuZGF0YSkpO31jYXRjaChlKSB7IC8vIGlQaG9uZSBTYWZhcmkgZG9lc24ndCBsZXQgeW91IGFwcGx5IHdpdGggdHlwZWQgYXJyYXlzXG52YXIgdHlwZWQ9bmV3IFVpbnQ4QXJyYXkocGFja2V0LmRhdGEpO3ZhciBiYXNpYz1uZXcgQXJyYXkodHlwZWQubGVuZ3RoKTtmb3IodmFyIGk9MDtpIDwgdHlwZWQubGVuZ3RoO2krKykge2Jhc2ljW2ldID0gdHlwZWRbaV07fWI2NGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsYmFzaWMpO31tZXNzYWdlICs9IGdsb2JhbC5idG9hKGI2NGRhdGEpO3JldHVybiBjYWxsYmFjayhtZXNzYWdlKTt9OyAvKipcclxuICogRGVjb2RlcyBhIHBhY2tldC4gQ2hhbmdlcyBmb3JtYXQgdG8gQmxvYiBpZiByZXF1ZXN0ZWQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBgdHlwZWAgYW5kIGBkYXRhYCAoaWYgYW55KVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZXhwb3J0cy5kZWNvZGVQYWNrZXQgPSBmdW5jdGlvbihkYXRhLGJpbmFyeVR5cGUsdXRmOGRlY29kZSl7IC8vIFN0cmluZyBkYXRhXG5pZih0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJyB8fCBkYXRhID09PSB1bmRlZmluZWQpe2lmKGRhdGEuY2hhckF0KDApID09ICdiJyl7cmV0dXJuIGV4cG9ydHMuZGVjb2RlQmFzZTY0UGFja2V0KGRhdGEuc3Vic3RyKDEpLGJpbmFyeVR5cGUpO31pZih1dGY4ZGVjb2RlKXt0cnl7ZGF0YSA9IHV0ZjguZGVjb2RlKGRhdGEpO31jYXRjaChlKSB7cmV0dXJuIGVycjt9fXZhciB0eXBlPWRhdGEuY2hhckF0KDApO2lmKE51bWJlcih0eXBlKSAhPSB0eXBlIHx8ICFwYWNrZXRzbGlzdFt0eXBlXSl7cmV0dXJuIGVycjt9aWYoZGF0YS5sZW5ndGggPiAxKXtyZXR1cm4ge3R5cGU6cGFja2V0c2xpc3RbdHlwZV0sZGF0YTpkYXRhLnN1YnN0cmluZygxKX07fWVsc2Uge3JldHVybiB7dHlwZTpwYWNrZXRzbGlzdFt0eXBlXX07fX12YXIgYXNBcnJheT1uZXcgVWludDhBcnJheShkYXRhKTt2YXIgdHlwZT1hc0FycmF5WzBdO3ZhciByZXN0PXNsaWNlQnVmZmVyKGRhdGEsMSk7aWYoQmxvYiAmJiBiaW5hcnlUeXBlID09PSAnYmxvYicpe3Jlc3QgPSBuZXcgQmxvYihbcmVzdF0pO31yZXR1cm4ge3R5cGU6cGFja2V0c2xpc3RbdHlwZV0sZGF0YTpyZXN0fTt9OyAvKipcclxuICogRGVjb2RlcyBhIHBhY2tldCBlbmNvZGVkIGluIGEgYmFzZTY0IHN0cmluZ1xyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gYmFzZTY0IGVuY29kZWQgbWVzc2FnZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYHR5cGVgIGFuZCBgZGF0YWAgKGlmIGFueSlcclxuICovZXhwb3J0cy5kZWNvZGVCYXNlNjRQYWNrZXQgPSBmdW5jdGlvbihtc2csYmluYXJ5VHlwZSl7dmFyIHR5cGU9cGFja2V0c2xpc3RbbXNnLmNoYXJBdCgwKV07aWYoIWdsb2JhbC5BcnJheUJ1ZmZlcil7cmV0dXJuIHt0eXBlOnR5cGUsZGF0YTp7YmFzZTY0OnRydWUsZGF0YTptc2cuc3Vic3RyKDEpfX07fXZhciBkYXRhPWJhc2U2NGVuY29kZXIuZGVjb2RlKG1zZy5zdWJzdHIoMSkpO2lmKGJpbmFyeVR5cGUgPT09ICdibG9iJyAmJiBCbG9iKXtkYXRhID0gbmV3IEJsb2IoW2RhdGFdKTt9cmV0dXJuIHt0eXBlOnR5cGUsZGF0YTpkYXRhfTt9OyAvKipcclxuICogRW5jb2RlcyBtdWx0aXBsZSBtZXNzYWdlcyAocGF5bG9hZCkuXHJcbiAqXHJcbiAqICAgICA8bGVuZ3RoPjpkYXRhXHJcbiAqXHJcbiAqIEV4YW1wbGU6XHJcbiAqXHJcbiAqICAgICAxMTpoZWxsbyB3b3JsZDI6aGlcclxuICpcclxuICogSWYgYW55IGNvbnRlbnRzIGFyZSBiaW5hcnksIHRoZXkgd2lsbCBiZSBlbmNvZGVkIGFzIGJhc2U2NCBzdHJpbmdzLiBCYXNlNjRcclxuICogZW5jb2RlZCBzdHJpbmdzIGFyZSBtYXJrZWQgd2l0aCBhIGIgYmVmb3JlIHRoZSBsZW5ndGggc3BlY2lmaWVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2V4cG9ydHMuZW5jb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKHBhY2tldHMsc3VwcG9ydHNCaW5hcnksY2FsbGJhY2spe2lmKHR5cGVvZiBzdXBwb3J0c0JpbmFyeSA9PSAnZnVuY3Rpb24nKXtjYWxsYmFjayA9IHN1cHBvcnRzQmluYXJ5O3N1cHBvcnRzQmluYXJ5ID0gbnVsbDt9dmFyIGlzQmluYXJ5PWhhc0JpbmFyeShwYWNrZXRzKTtpZihzdXBwb3J0c0JpbmFyeSAmJiBpc0JpbmFyeSl7aWYoQmxvYiAmJiAhZG9udFNlbmRCbG9icyl7cmV0dXJuIGV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQmxvYihwYWNrZXRzLGNhbGxiYWNrKTt9cmV0dXJuIGV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQXJyYXlCdWZmZXIocGFja2V0cyxjYWxsYmFjayk7fWlmKCFwYWNrZXRzLmxlbmd0aCl7cmV0dXJuIGNhbGxiYWNrKCcwOicpO31mdW5jdGlvbiBzZXRMZW5ndGhIZWFkZXIobWVzc2FnZSl7cmV0dXJuIG1lc3NhZ2UubGVuZ3RoICsgJzonICsgbWVzc2FnZTt9ZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCxkb25lQ2FsbGJhY2spe2V4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwhaXNCaW5hcnk/ZmFsc2U6c3VwcG9ydHNCaW5hcnksdHJ1ZSxmdW5jdGlvbihtZXNzYWdlKXtkb25lQ2FsbGJhY2sobnVsbCxzZXRMZW5ndGhIZWFkZXIobWVzc2FnZSkpO30pO31tYXAocGFja2V0cyxlbmNvZGVPbmUsZnVuY3Rpb24oZXJyLHJlc3VsdHMpe3JldHVybiBjYWxsYmFjayhyZXN1bHRzLmpvaW4oJycpKTt9KTt9OyAvKipcclxuICogQXN5bmMgYXJyYXkgbWFwIHVzaW5nIGFmdGVyXHJcbiAqL2Z1bmN0aW9uIG1hcChhcnksZWFjaCxkb25lKXt2YXIgcmVzdWx0PW5ldyBBcnJheShhcnkubGVuZ3RoKTt2YXIgbmV4dD1hZnRlcihhcnkubGVuZ3RoLGRvbmUpO3ZhciBlYWNoV2l0aEluZGV4PWZ1bmN0aW9uIGVhY2hXaXRoSW5kZXgoaSxlbCxjYil7ZWFjaChlbCxmdW5jdGlvbihlcnJvcixtc2cpe3Jlc3VsdFtpXSA9IG1zZztjYihlcnJvcixyZXN1bHQpO30pO307Zm9yKHZhciBpPTA7aSA8IGFyeS5sZW5ndGg7aSsrKSB7ZWFjaFdpdGhJbmRleChpLGFyeVtpXSxuZXh0KTt9fSAvKlxyXG4gKiBEZWNvZGVzIGRhdGEgd2hlbiBhIHBheWxvYWQgaXMgbWF5YmUgZXhwZWN0ZWQuIFBvc3NpYmxlIGJpbmFyeSBjb250ZW50cyBhcmVcclxuICogZGVjb2RlZCBmcm9tIHRoZWlyIGJhc2U2NCByZXByZXNlbnRhdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSwgY2FsbGJhY2sgbWV0aG9kXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMuZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uKGRhdGEsYmluYXJ5VHlwZSxjYWxsYmFjayl7aWYodHlwZW9mIGRhdGEgIT0gJ3N0cmluZycpe3JldHVybiBleHBvcnRzLmRlY29kZVBheWxvYWRBc0JpbmFyeShkYXRhLGJpbmFyeVR5cGUsY2FsbGJhY2spO31pZih0eXBlb2YgYmluYXJ5VHlwZSA9PT0gJ2Z1bmN0aW9uJyl7Y2FsbGJhY2sgPSBiaW5hcnlUeXBlO2JpbmFyeVR5cGUgPSBudWxsO312YXIgcGFja2V0O2lmKGRhdGEgPT0gJycpeyAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG5yZXR1cm4gY2FsbGJhY2soZXJyLDAsMSk7fXZhciBsZW5ndGg9Jycsbixtc2c7Zm9yKHZhciBpPTAsbD1kYXRhLmxlbmd0aDtpIDwgbDtpKyspIHt2YXIgY2hyPWRhdGEuY2hhckF0KGkpO2lmKCc6JyAhPSBjaHIpe2xlbmd0aCArPSBjaHI7fWVsc2Uge2lmKCcnID09IGxlbmd0aCB8fCBsZW5ndGggIT0gKG4gPSBOdW1iZXIobGVuZ3RoKSkpeyAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG5yZXR1cm4gY2FsbGJhY2soZXJyLDAsMSk7fW1zZyA9IGRhdGEuc3Vic3RyKGkgKyAxLG4pO2lmKGxlbmd0aCAhPSBtc2cubGVuZ3RoKXsgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxucmV0dXJuIGNhbGxiYWNrKGVyciwwLDEpO31pZihtc2cubGVuZ3RoKXtwYWNrZXQgPSBleHBvcnRzLmRlY29kZVBhY2tldChtc2csYmluYXJ5VHlwZSx0cnVlKTtpZihlcnIudHlwZSA9PSBwYWNrZXQudHlwZSAmJiBlcnIuZGF0YSA9PSBwYWNrZXQuZGF0YSl7IC8vIHBhcnNlciBlcnJvciBpbiBpbmRpdmlkdWFsIHBhY2tldCAtIGlnbm9yaW5nIHBheWxvYWRcbnJldHVybiBjYWxsYmFjayhlcnIsMCwxKTt9dmFyIHJldD1jYWxsYmFjayhwYWNrZXQsaSArIG4sbCk7aWYoZmFsc2UgPT09IHJldClyZXR1cm47fSAvLyBhZHZhbmNlIGN1cnNvclxuaSArPSBuO2xlbmd0aCA9ICcnO319aWYobGVuZ3RoICE9ICcnKXsgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxucmV0dXJuIGNhbGxiYWNrKGVyciwwLDEpO319OyAvKipcclxuICogRW5jb2RlcyBtdWx0aXBsZSBtZXNzYWdlcyAocGF5bG9hZCkgYXMgYmluYXJ5LlxyXG4gKlxyXG4gKiA8MSA9IGJpbmFyeSwgMCA9IHN0cmluZz48bnVtYmVyIGZyb20gMC05PjxudW1iZXIgZnJvbSAwLTk+Wy4uLl08bnVtYmVyXHJcbiAqIDI1NT48ZGF0YT5cclxuICpcclxuICogRXhhbXBsZTpcclxuICogMSAzIDI1NSAxIDIgMywgaWYgdGhlIGJpbmFyeSBjb250ZW50cyBhcmUgaW50ZXJwcmV0ZWQgYXMgOCBiaXQgaW50ZWdlcnNcclxuICpcclxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xyXG4gKiBAcmV0dXJuIHtBcnJheUJ1ZmZlcn0gZW5jb2RlZCBwYXlsb2FkXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9leHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyID0gZnVuY3Rpb24ocGFja2V0cyxjYWxsYmFjayl7aWYoIXBhY2tldHMubGVuZ3RoKXtyZXR1cm4gY2FsbGJhY2sobmV3IEFycmF5QnVmZmVyKDApKTt9ZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCxkb25lQ2FsbGJhY2spe2V4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCx0cnVlLHRydWUsZnVuY3Rpb24oZGF0YSl7cmV0dXJuIGRvbmVDYWxsYmFjayhudWxsLGRhdGEpO30pO31tYXAocGFja2V0cyxlbmNvZGVPbmUsZnVuY3Rpb24oZXJyLGVuY29kZWRQYWNrZXRzKXt2YXIgdG90YWxMZW5ndGg9ZW5jb2RlZFBhY2tldHMucmVkdWNlKGZ1bmN0aW9uKGFjYyxwKXt2YXIgbGVuO2lmKHR5cGVvZiBwID09PSAnc3RyaW5nJyl7bGVuID0gcC5sZW5ndGg7fWVsc2Uge2xlbiA9IHAuYnl0ZUxlbmd0aDt9cmV0dXJuIGFjYyArIGxlbi50b1N0cmluZygpLmxlbmd0aCArIGxlbiArIDI7IC8vIHN0cmluZy9iaW5hcnkgaWRlbnRpZmllciArIHNlcGFyYXRvciA9IDJcbn0sMCk7dmFyIHJlc3VsdEFycmF5PW5ldyBVaW50OEFycmF5KHRvdGFsTGVuZ3RoKTt2YXIgYnVmZmVySW5kZXg9MDtlbmNvZGVkUGFja2V0cy5mb3JFYWNoKGZ1bmN0aW9uKHApe3ZhciBpc1N0cmluZz10eXBlb2YgcCA9PT0gJ3N0cmluZyc7dmFyIGFiPXA7aWYoaXNTdHJpbmcpe3ZhciB2aWV3PW5ldyBVaW50OEFycmF5KHAubGVuZ3RoKTtmb3IodmFyIGk9MDtpIDwgcC5sZW5ndGg7aSsrKSB7dmlld1tpXSA9IHAuY2hhckNvZGVBdChpKTt9YWIgPSB2aWV3LmJ1ZmZlcjt9aWYoaXNTdHJpbmcpeyAvLyBub3QgdHJ1ZSBiaW5hcnlcbnJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMDt9ZWxzZSB7IC8vIHRydWUgYmluYXJ5XG5yZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDE7fXZhciBsZW5TdHI9YWIuYnl0ZUxlbmd0aC50b1N0cmluZygpO2Zvcih2YXIgaT0wO2kgPCBsZW5TdHIubGVuZ3RoO2krKykge3Jlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gcGFyc2VJbnQobGVuU3RyW2ldKTt9cmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAyNTU7dmFyIHZpZXc9bmV3IFVpbnQ4QXJyYXkoYWIpO2Zvcih2YXIgaT0wO2kgPCB2aWV3Lmxlbmd0aDtpKyspIHtyZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IHZpZXdbaV07fX0pO3JldHVybiBjYWxsYmFjayhyZXN1bHRBcnJheS5idWZmZXIpO30pO307IC8qKlxyXG4gKiBFbmNvZGUgYXMgQmxvYlxyXG4gKi9leHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IgPSBmdW5jdGlvbihwYWNrZXRzLGNhbGxiYWNrKXtmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LGRvbmVDYWxsYmFjayl7ZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LHRydWUsdHJ1ZSxmdW5jdGlvbihlbmNvZGVkKXt2YXIgYmluYXJ5SWRlbnRpZmllcj1uZXcgVWludDhBcnJheSgxKTtiaW5hcnlJZGVudGlmaWVyWzBdID0gMTtpZih0eXBlb2YgZW5jb2RlZCA9PT0gJ3N0cmluZycpe3ZhciB2aWV3PW5ldyBVaW50OEFycmF5KGVuY29kZWQubGVuZ3RoKTtmb3IodmFyIGk9MDtpIDwgZW5jb2RlZC5sZW5ndGg7aSsrKSB7dmlld1tpXSA9IGVuY29kZWQuY2hhckNvZGVBdChpKTt9ZW5jb2RlZCA9IHZpZXcuYnVmZmVyO2JpbmFyeUlkZW50aWZpZXJbMF0gPSAwO312YXIgbGVuPWVuY29kZWQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcj9lbmNvZGVkLmJ5dGVMZW5ndGg6ZW5jb2RlZC5zaXplO3ZhciBsZW5TdHI9bGVuLnRvU3RyaW5nKCk7dmFyIGxlbmd0aEFyeT1uZXcgVWludDhBcnJheShsZW5TdHIubGVuZ3RoICsgMSk7Zm9yKHZhciBpPTA7aSA8IGxlblN0ci5sZW5ndGg7aSsrKSB7bGVuZ3RoQXJ5W2ldID0gcGFyc2VJbnQobGVuU3RyW2ldKTt9bGVuZ3RoQXJ5W2xlblN0ci5sZW5ndGhdID0gMjU1O2lmKEJsb2Ipe3ZhciBibG9iPW5ldyBCbG9iKFtiaW5hcnlJZGVudGlmaWVyLmJ1ZmZlcixsZW5ndGhBcnkuYnVmZmVyLGVuY29kZWRdKTtkb25lQ2FsbGJhY2sobnVsbCxibG9iKTt9fSk7fW1hcChwYWNrZXRzLGVuY29kZU9uZSxmdW5jdGlvbihlcnIscmVzdWx0cyl7cmV0dXJuIGNhbGxiYWNrKG5ldyBCbG9iKHJlc3VsdHMpKTt9KTt9OyAvKlxyXG4gKiBEZWNvZGVzIGRhdGEgd2hlbiBhIHBheWxvYWQgaXMgbWF5YmUgZXhwZWN0ZWQuIFN0cmluZ3MgYXJlIGRlY29kZWQgYnlcclxuICogaW50ZXJwcmV0aW5nIGVhY2ggYnl0ZSBhcyBhIGtleSBjb2RlIGZvciBlbnRyaWVzIG1hcmtlZCB0byBzdGFydCB3aXRoIDAuIFNlZVxyXG4gKiBkZXNjcmlwdGlvbiBvZiBlbmNvZGVQYXlsb2FkQXNCaW5hcnlcclxuICpcclxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gZGF0YSwgY2FsbGJhY2sgbWV0aG9kXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMuZGVjb2RlUGF5bG9hZEFzQmluYXJ5ID0gZnVuY3Rpb24oZGF0YSxiaW5hcnlUeXBlLGNhbGxiYWNrKXtpZih0eXBlb2YgYmluYXJ5VHlwZSA9PT0gJ2Z1bmN0aW9uJyl7Y2FsbGJhY2sgPSBiaW5hcnlUeXBlO2JpbmFyeVR5cGUgPSBudWxsO312YXIgYnVmZmVyVGFpbD1kYXRhO3ZhciBidWZmZXJzPVtdO3ZhciBudW1iZXJUb29Mb25nPWZhbHNlO3doaWxlKGJ1ZmZlclRhaWwuYnl0ZUxlbmd0aCA+IDApIHt2YXIgdGFpbEFycmF5PW5ldyBVaW50OEFycmF5KGJ1ZmZlclRhaWwpO3ZhciBpc1N0cmluZz10YWlsQXJyYXlbMF0gPT09IDA7dmFyIG1zZ0xlbmd0aD0nJztmb3IodmFyIGk9MTs7aSsrKSB7aWYodGFpbEFycmF5W2ldID09IDI1NSlicmVhaztpZihtc2dMZW5ndGgubGVuZ3RoID4gMzEwKXtudW1iZXJUb29Mb25nID0gdHJ1ZTticmVhazt9bXNnTGVuZ3RoICs9IHRhaWxBcnJheVtpXTt9aWYobnVtYmVyVG9vTG9uZylyZXR1cm4gY2FsbGJhY2soZXJyLDAsMSk7YnVmZmVyVGFpbCA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsMiArIG1zZ0xlbmd0aC5sZW5ndGgpO21zZ0xlbmd0aCA9IHBhcnNlSW50KG1zZ0xlbmd0aCk7dmFyIG1zZz1zbGljZUJ1ZmZlcihidWZmZXJUYWlsLDAsbXNnTGVuZ3RoKTtpZihpc1N0cmluZyl7dHJ5e21zZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxuZXcgVWludDhBcnJheShtc2cpKTt9Y2F0Y2goZSkgeyAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB0byB0eXBlZCBhcnJheXNcbnZhciB0eXBlZD1uZXcgVWludDhBcnJheShtc2cpO21zZyA9ICcnO2Zvcih2YXIgaT0wO2kgPCB0eXBlZC5sZW5ndGg7aSsrKSB7bXNnICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodHlwZWRbaV0pO319fWJ1ZmZlcnMucHVzaChtc2cpO2J1ZmZlclRhaWwgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLG1zZ0xlbmd0aCk7fXZhciB0b3RhbD1idWZmZXJzLmxlbmd0aDtidWZmZXJzLmZvckVhY2goZnVuY3Rpb24oYnVmZmVyLGkpe2NhbGxiYWNrKGV4cG9ydHMuZGVjb2RlUGFja2V0KGJ1ZmZlcixiaW5hcnlUeXBlLHRydWUpLGksdG90YWwpO30pO307fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se1wiLi9rZXlzXCI6MjAsXCJhZnRlclwiOjExLFwiYXJyYXlidWZmZXIuc2xpY2VcIjoxMixcImJhc2U2NC1hcnJheWJ1ZmZlclwiOjEzLFwiYmxvYlwiOjE0LFwiaGFzLWJpbmFyeVwiOjIxLFwidXRmOFwiOjI5fV0sMjA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogR2V0cyB0aGUga2V5cyBmb3IgYW4gb2JqZWN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtBcnJheX0ga2V5c1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovbW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKG9iail7dmFyIGFycj1bXTt2YXIgaGFzPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7Zm9yKHZhciBpIGluIG9iaikge2lmKGhhcy5jYWxsKG9iaixpKSl7YXJyLnB1c2goaSk7fX1yZXR1cm4gYXJyO307fSx7fV0sMjE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKlxyXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxyXG4gKi92YXIgaXNBcnJheT1fZGVyZXFfKCdpc2FycmF5Jyk7IC8qKlxyXG4gKiBNb2R1bGUgZXhwb3J0cy5cclxuICovbW9kdWxlLmV4cG9ydHMgPSBoYXNCaW5hcnk7IC8qKlxyXG4gKiBDaGVja3MgZm9yIGJpbmFyeSBkYXRhLlxyXG4gKlxyXG4gKiBSaWdodCBub3cgb25seSBCdWZmZXIgYW5kIEFycmF5QnVmZmVyIGFyZSBzdXBwb3J0ZWQuLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gYW55dGhpbmdcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gaGFzQmluYXJ5KGRhdGEpe2Z1bmN0aW9uIF9oYXNCaW5hcnkob2JqKXtpZighb2JqKXJldHVybiBmYWxzZTtpZihnbG9iYWwuQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIob2JqKSB8fCBnbG9iYWwuQXJyYXlCdWZmZXIgJiYgb2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgZ2xvYmFsLkJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYiB8fCBnbG9iYWwuRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKXtyZXR1cm4gdHJ1ZTt9aWYoaXNBcnJheShvYmopKXtmb3IodmFyIGk9MDtpIDwgb2JqLmxlbmd0aDtpKyspIHtpZihfaGFzQmluYXJ5KG9ialtpXSkpe3JldHVybiB0cnVlO319fWVsc2UgaWYob2JqICYmICdvYmplY3QnID09IHR5cGVvZiBvYmope2lmKG9iai50b0pTT04pe29iaiA9IG9iai50b0pTT04oKTt9Zm9yKHZhciBrZXkgaW4gb2JqKSB7aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaixrZXkpICYmIF9oYXNCaW5hcnkob2JqW2tleV0pKXtyZXR1cm4gdHJ1ZTt9fX1yZXR1cm4gZmFsc2U7fXJldHVybiBfaGFzQmluYXJ5KGRhdGEpO319KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7XCJpc2FycmF5XCI6MjR9XSwyMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBNb2R1bGUgZXhwb3J0cy5cclxuICpcclxuICogTG9naWMgYm9ycm93ZWQgZnJvbSBNb2Rlcm5penI6XHJcbiAqXHJcbiAqICAgLSBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvY29ycy5qc1xyXG4gKi90cnl7bW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnICYmICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpO31jYXRjaChlcnIpIHsgLy8gaWYgWE1MSHR0cCBzdXBwb3J0IGlzIGRpc2FibGVkIGluIElFIHRoZW4gaXQgd2lsbCB0aHJvd1xuLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG5tb2R1bGUuZXhwb3J0cyA9IGZhbHNlO319LHt9XSwyMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7dmFyIGluZGV4T2Y9W10uaW5kZXhPZjttb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFycixvYmope2lmKGluZGV4T2YpcmV0dXJuIGFyci5pbmRleE9mKG9iaik7Zm9yKHZhciBpPTA7aSA8IGFyci5sZW5ndGg7KytpKSB7aWYoYXJyW2ldID09PSBvYmopcmV0dXJuIGk7fXJldHVybiAtMTt9O30se31dLDI0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXttb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24oYXJyKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJzt9O30se31dLDI1OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIEhlbHBlcnMuXHJcbiAqL3ZhciBzPTEwMDA7dmFyIG09cyAqIDYwO3ZhciBoPW0gKiA2MDt2YXIgZD1oICogMjQ7dmFyIHk9ZCAqIDM2NS4yNTsgLyoqXHJcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXHJcbiAqXHJcbiAqIE9wdGlvbnM6XHJcbiAqXHJcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCxvcHRpb25zKXtvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtpZignc3RyaW5nJyA9PSB0eXBlb2YgdmFsKXJldHVybiBwYXJzZSh2YWwpO3JldHVybiBvcHRpb25zLmxvbmc/bG9uZyh2YWwpOnNob3J0KHZhbCk7fTsgLyoqXHJcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBwYXJzZShzdHIpe3N0ciA9ICcnICsgc3RyO2lmKHN0ci5sZW5ndGggPiAxMDAwMClyZXR1cm47dmFyIG1hdGNoPS9eKCg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoc3RyKTtpZighbWF0Y2gpcmV0dXJuO3ZhciBuPXBhcnNlRmxvYXQobWF0Y2hbMV0pO3ZhciB0eXBlPShtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO3N3aXRjaCh0eXBlKXtjYXNlICd5ZWFycyc6Y2FzZSAneWVhcic6Y2FzZSAneXJzJzpjYXNlICd5cic6Y2FzZSAneSc6cmV0dXJuIG4gKiB5O2Nhc2UgJ2RheXMnOmNhc2UgJ2RheSc6Y2FzZSAnZCc6cmV0dXJuIG4gKiBkO2Nhc2UgJ2hvdXJzJzpjYXNlICdob3VyJzpjYXNlICdocnMnOmNhc2UgJ2hyJzpjYXNlICdoJzpyZXR1cm4gbiAqIGg7Y2FzZSAnbWludXRlcyc6Y2FzZSAnbWludXRlJzpjYXNlICdtaW5zJzpjYXNlICdtaW4nOmNhc2UgJ20nOnJldHVybiBuICogbTtjYXNlICdzZWNvbmRzJzpjYXNlICdzZWNvbmQnOmNhc2UgJ3NlY3MnOmNhc2UgJ3NlYyc6Y2FzZSAncyc6cmV0dXJuIG4gKiBzO2Nhc2UgJ21pbGxpc2Vjb25kcyc6Y2FzZSAnbWlsbGlzZWNvbmQnOmNhc2UgJ21zZWNzJzpjYXNlICdtc2VjJzpjYXNlICdtcyc6cmV0dXJuIG47fX0gLyoqXHJcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2Z1bmN0aW9uIHNob3J0KG1zKXtpZihtcyA+PSBkKXJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7aWYobXMgPj0gaClyZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO2lmKG1zID49IG0pcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztpZihtcyA+PSBzKXJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7cmV0dXJuIG1zICsgJ21zJzt9IC8qKlxyXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2Z1bmN0aW9uIGxvbmcobXMpe3JldHVybiBwbHVyYWwobXMsZCwnZGF5JykgfHwgcGx1cmFsKG1zLGgsJ2hvdXInKSB8fCBwbHVyYWwobXMsbSwnbWludXRlJykgfHwgcGx1cmFsKG1zLHMsJ3NlY29uZCcpIHx8IG1zICsgJyBtcyc7fSAvKipcclxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXHJcbiAqL2Z1bmN0aW9uIHBsdXJhbChtcyxuLG5hbWUpe2lmKG1zIDwgbilyZXR1cm47aWYobXMgPCBuICogMS41KXJldHVybiBNYXRoLmZsb29yKG1zIC8gbikgKyAnICcgKyBuYW1lO3JldHVybiBNYXRoLmNlaWwobXMgLyBuKSArICcgJyArIG5hbWUgKyAncyc7fX0se31dLDI2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyoqXHJcbiAqIEpTT04gcGFyc2UuXHJcbiAqXHJcbiAqIEBzZWUgQmFzZWQgb24galF1ZXJ5I3BhcnNlSlNPTiAoTUlUKSBhbmQgSlNPTjJcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL3ZhciBydmFsaWRjaGFycz0vXltcXF0sOnt9XFxzXSokLzt2YXIgcnZhbGlkZXNjYXBlPS9cXFxcKD86W1wiXFxcXFxcL2JmbnJ0XXx1WzAtOWEtZkEtRl17NH0pL2c7dmFyIHJ2YWxpZHRva2Vucz0vXCJbXlwiXFxcXFxcblxccl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/XFxkKyg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/L2c7dmFyIHJ2YWxpZGJyYWNlcz0vKD86Xnw6fCwpKD86XFxzKlxcWykrL2c7dmFyIHJ0cmltTGVmdD0vXlxccysvO3ZhciBydHJpbVJpZ2h0PS9cXHMrJC87bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZWpzb24oZGF0YSl7aWYoJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgfHwgIWRhdGEpe3JldHVybiBudWxsO31kYXRhID0gZGF0YS5yZXBsYWNlKHJ0cmltTGVmdCwnJykucmVwbGFjZShydHJpbVJpZ2h0LCcnKTsgLy8gQXR0ZW1wdCB0byBwYXJzZSB1c2luZyB0aGUgbmF0aXZlIEpTT04gcGFyc2VyIGZpcnN0XG5pZihnbG9iYWwuSlNPTiAmJiBKU09OLnBhcnNlKXtyZXR1cm4gSlNPTi5wYXJzZShkYXRhKTt9aWYocnZhbGlkY2hhcnMudGVzdChkYXRhLnJlcGxhY2UocnZhbGlkZXNjYXBlLCdAJykucmVwbGFjZShydmFsaWR0b2tlbnMsJ10nKS5yZXBsYWNlKHJ2YWxpZGJyYWNlcywnJykpKXtyZXR1cm4gbmV3IEZ1bmN0aW9uKCdyZXR1cm4gJyArIGRhdGEpKCk7fX07fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se31dLDI3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIENvbXBpbGVzIGEgcXVlcnlzdHJpbmdcclxuICogUmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2V4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24ob2JqKXt2YXIgc3RyPScnO2Zvcih2YXIgaSBpbiBvYmopIHtpZihvYmouaGFzT3duUHJvcGVydHkoaSkpe2lmKHN0ci5sZW5ndGgpc3RyICs9ICcmJztzdHIgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtpXSk7fX1yZXR1cm4gc3RyO307IC8qKlxyXG4gKiBQYXJzZXMgYSBzaW1wbGUgcXVlcnlzdHJpbmcgaW50byBhbiBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHFzXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKHFzKXt2YXIgcXJ5PXt9O3ZhciBwYWlycz1xcy5zcGxpdCgnJicpO2Zvcih2YXIgaT0wLGw9cGFpcnMubGVuZ3RoO2kgPCBsO2krKykge3ZhciBwYWlyPXBhaXJzW2ldLnNwbGl0KCc9Jyk7cXJ5W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7fXJldHVybiBxcnk7fTt9LHt9XSwyODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBQYXJzZXMgYW4gVVJJXHJcbiAqXHJcbiAqIEBhdXRob3IgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+IChNSVQgbGljZW5zZSlcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL3ZhciByZT0vXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShodHRwfGh0dHBzfHdzfHdzcyk6XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLzt2YXIgcGFydHM9Wydzb3VyY2UnLCdwcm90b2NvbCcsJ2F1dGhvcml0eScsJ3VzZXJJbmZvJywndXNlcicsJ3Bhc3N3b3JkJywnaG9zdCcsJ3BvcnQnLCdyZWxhdGl2ZScsJ3BhdGgnLCdkaXJlY3RvcnknLCdmaWxlJywncXVlcnknLCdhbmNob3InXTttb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNldXJpKHN0cil7dmFyIHNyYz1zdHIsYj1zdHIuaW5kZXhPZignWycpLGU9c3RyLmluZGV4T2YoJ10nKTtpZihiICE9IC0xICYmIGUgIT0gLTEpe3N0ciA9IHN0ci5zdWJzdHJpbmcoMCxiKSArIHN0ci5zdWJzdHJpbmcoYixlKS5yZXBsYWNlKC86L2csJzsnKSArIHN0ci5zdWJzdHJpbmcoZSxzdHIubGVuZ3RoKTt9dmFyIG09cmUuZXhlYyhzdHIgfHwgJycpLHVyaT17fSxpPTE0O3doaWxlKGktLSkge3VyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO31pZihiICE9IC0xICYmIGUgIT0gLTEpe3VyaS5zb3VyY2UgPSBzcmM7dXJpLmhvc3QgPSB1cmkuaG9zdC5zdWJzdHJpbmcoMSx1cmkuaG9zdC5sZW5ndGggLSAxKS5yZXBsYWNlKC87L2csJzonKTt1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywnJykucmVwbGFjZSgnXScsJycpLnJlcGxhY2UoLzsvZywnOicpO3VyaS5pcHY2dXJpID0gdHJ1ZTt9cmV0dXJuIHVyaTt9O30se31dLDI5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXsgLyohIGh0dHBzOi8vbXRocy5iZS91dGY4anMgdjIuMC4wIGJ5IEBtYXRoaWFzICovOyhmdW5jdGlvbihyb290KXsgLy8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYFxudmFyIGZyZWVFeHBvcnRzPXR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7IC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgXG52YXIgZnJlZU1vZHVsZT10eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7IC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsXG4vLyBhbmQgdXNlIGl0IGFzIGByb290YFxudmFyIGZyZWVHbG9iYWw9dHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7aWYoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpe3Jvb3QgPSBmcmVlR2xvYmFsO30gLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovdmFyIHN0cmluZ0Zyb21DaGFyQ29kZT1TdHJpbmcuZnJvbUNoYXJDb2RlOyAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZVxuZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpe3ZhciBvdXRwdXQ9W107dmFyIGNvdW50ZXI9MDt2YXIgbGVuZ3RoPXN0cmluZy5sZW5ndGg7dmFyIHZhbHVlO3ZhciBleHRyYTt3aGlsZShjb3VudGVyIDwgbGVuZ3RoKSB7dmFsdWUgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO2lmKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCl7IC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuZXh0cmEgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO2lmKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKXsgLy8gbG93IHN1cnJvZ2F0ZVxub3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTt9ZWxzZSB7IC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG4vLyBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXJcbm91dHB1dC5wdXNoKHZhbHVlKTtjb3VudGVyLS07fX1lbHNlIHtvdXRwdXQucHVzaCh2YWx1ZSk7fX1yZXR1cm4gb3V0cHV0O30gLy8gVGFrZW4gZnJvbSBodHRwczovL210aHMuYmUvcHVueWNvZGVcbmZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpe3ZhciBsZW5ndGg9YXJyYXkubGVuZ3RoO3ZhciBpbmRleD0tMTt2YXIgdmFsdWU7dmFyIG91dHB1dD0nJzt3aGlsZSgrK2luZGV4IDwgbGVuZ3RoKSB7dmFsdWUgPSBhcnJheVtpbmRleF07aWYodmFsdWUgPiAweEZGRkYpe3ZhbHVlIC09IDB4MTAwMDA7b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO31vdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlKTt9cmV0dXJuIG91dHB1dDt9ZnVuY3Rpb24gY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQpe2lmKGNvZGVQb2ludCA+PSAweEQ4MDAgJiYgY29kZVBvaW50IDw9IDB4REZGRil7dGhyb3cgRXJyb3IoJ0xvbmUgc3Vycm9nYXRlIFUrJyArIGNvZGVQb2ludC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArICcgaXMgbm90IGEgc2NhbGFyIHZhbHVlJyk7fX0gLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovZnVuY3Rpb24gY3JlYXRlQnl0ZShjb2RlUG9pbnQsc2hpZnQpe3JldHVybiBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50ID4+IHNoaWZ0ICYgMHgzRiB8IDB4ODApO31mdW5jdGlvbiBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50KXtpZigoY29kZVBvaW50ICYgMHhGRkZGRkY4MCkgPT0gMCl7IC8vIDEtYnl0ZSBzZXF1ZW5jZVxucmV0dXJuIHN0cmluZ0Zyb21DaGFyQ29kZShjb2RlUG9pbnQpO312YXIgc3ltYm9sPScnO2lmKChjb2RlUG9pbnQgJiAweEZGRkZGODAwKSA9PSAwKXsgLy8gMi1ieXRlIHNlcXVlbmNlXG5zeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50ID4+IDYgJiAweDFGIHwgMHhDMCk7fWVsc2UgaWYoKGNvZGVQb2ludCAmIDB4RkZGRjAwMDApID09IDApeyAvLyAzLWJ5dGUgc2VxdWVuY2VcbmNoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50KTtzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50ID4+IDEyICYgMHgwRiB8IDB4RTApO3N5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCw2KTt9ZWxzZSBpZigoY29kZVBvaW50ICYgMHhGRkUwMDAwMCkgPT0gMCl7IC8vIDQtYnl0ZSBzZXF1ZW5jZVxuc3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiAxOCAmIDB4MDcgfCAweEYwKTtzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsMTIpO3N5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCw2KTt9c3ltYm9sICs9IHN0cmluZ0Zyb21DaGFyQ29kZShjb2RlUG9pbnQgJiAweDNGIHwgMHg4MCk7cmV0dXJuIHN5bWJvbDt9ZnVuY3Rpb24gdXRmOGVuY29kZShzdHJpbmcpe3ZhciBjb2RlUG9pbnRzPXVjczJkZWNvZGUoc3RyaW5nKTt2YXIgbGVuZ3RoPWNvZGVQb2ludHMubGVuZ3RoO3ZhciBpbmRleD0tMTt2YXIgY29kZVBvaW50O3ZhciBieXRlU3RyaW5nPScnO3doaWxlKCsraW5kZXggPCBsZW5ndGgpIHtjb2RlUG9pbnQgPSBjb2RlUG9pbnRzW2luZGV4XTtieXRlU3RyaW5nICs9IGVuY29kZUNvZGVQb2ludChjb2RlUG9pbnQpO31yZXR1cm4gYnl0ZVN0cmluZzt9IC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL2Z1bmN0aW9uIHJlYWRDb250aW51YXRpb25CeXRlKCl7aWYoYnl0ZUluZGV4ID49IGJ5dGVDb3VudCl7dGhyb3cgRXJyb3IoJ0ludmFsaWQgYnl0ZSBpbmRleCcpO312YXIgY29udGludWF0aW9uQnl0ZT1ieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7Ynl0ZUluZGV4Kys7aWYoKGNvbnRpbnVhdGlvbkJ5dGUgJiAweEMwKSA9PSAweDgwKXtyZXR1cm4gY29udGludWF0aW9uQnl0ZSAmIDB4M0Y7fSAvLyBJZiB3ZSBlbmQgdXAgaGVyZSwgaXTigJlzIG5vdCBhIGNvbnRpbnVhdGlvbiBieXRlXG50aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO31mdW5jdGlvbiBkZWNvZGVTeW1ib2woKXt2YXIgYnl0ZTE7dmFyIGJ5dGUyO3ZhciBieXRlMzt2YXIgYnl0ZTQ7dmFyIGNvZGVQb2ludDtpZihieXRlSW5kZXggPiBieXRlQ291bnQpe3Rocm93IEVycm9yKCdJbnZhbGlkIGJ5dGUgaW5kZXgnKTt9aWYoYnl0ZUluZGV4ID09IGJ5dGVDb3VudCl7cmV0dXJuIGZhbHNlO30gLy8gUmVhZCBmaXJzdCBieXRlXG5ieXRlMSA9IGJ5dGVBcnJheVtieXRlSW5kZXhdICYgMHhGRjtieXRlSW5kZXgrKzsgLy8gMS1ieXRlIHNlcXVlbmNlIChubyBjb250aW51YXRpb24gYnl0ZXMpXG5pZigoYnl0ZTEgJiAweDgwKSA9PSAwKXtyZXR1cm4gYnl0ZTE7fSAvLyAyLWJ5dGUgc2VxdWVuY2VcbmlmKChieXRlMSAmIDB4RTApID09IDB4QzApe3ZhciBieXRlMj1yZWFkQ29udGludWF0aW9uQnl0ZSgpO2NvZGVQb2ludCA9IChieXRlMSAmIDB4MUYpIDw8IDYgfCBieXRlMjtpZihjb2RlUG9pbnQgPj0gMHg4MCl7cmV0dXJuIGNvZGVQb2ludDt9ZWxzZSB7dGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTt9fSAvLyAzLWJ5dGUgc2VxdWVuY2UgKG1heSBpbmNsdWRlIHVucGFpcmVkIHN1cnJvZ2F0ZXMpXG5pZigoYnl0ZTEgJiAweEYwKSA9PSAweEUwKXtieXRlMiA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7Ynl0ZTMgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO2NvZGVQb2ludCA9IChieXRlMSAmIDB4MEYpIDw8IDEyIHwgYnl0ZTIgPDwgNiB8IGJ5dGUzO2lmKGNvZGVQb2ludCA+PSAweDA4MDApe2NoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50KTtyZXR1cm4gY29kZVBvaW50O31lbHNlIHt0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO319IC8vIDQtYnl0ZSBzZXF1ZW5jZVxuaWYoKGJ5dGUxICYgMHhGOCkgPT0gMHhGMCl7Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO2J5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtieXRlNCA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7Y29kZVBvaW50ID0gKGJ5dGUxICYgMHgwRikgPDwgMHgxMiB8IGJ5dGUyIDw8IDB4MEMgfCBieXRlMyA8PCAweDA2IHwgYnl0ZTQ7aWYoY29kZVBvaW50ID49IDB4MDEwMDAwICYmIGNvZGVQb2ludCA8PSAweDEwRkZGRil7cmV0dXJuIGNvZGVQb2ludDt9fXRocm93IEVycm9yKCdJbnZhbGlkIFVURi04IGRldGVjdGVkJyk7fXZhciBieXRlQXJyYXk7dmFyIGJ5dGVDb3VudDt2YXIgYnl0ZUluZGV4O2Z1bmN0aW9uIHV0ZjhkZWNvZGUoYnl0ZVN0cmluZyl7Ynl0ZUFycmF5ID0gdWNzMmRlY29kZShieXRlU3RyaW5nKTtieXRlQ291bnQgPSBieXRlQXJyYXkubGVuZ3RoO2J5dGVJbmRleCA9IDA7dmFyIGNvZGVQb2ludHM9W107dmFyIHRtcDt3aGlsZSgodG1wID0gZGVjb2RlU3ltYm9sKCkpICE9PSBmYWxzZSkge2NvZGVQb2ludHMucHVzaCh0bXApO31yZXR1cm4gdWNzMmVuY29kZShjb2RlUG9pbnRzKTt9IC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL3ZhciB1dGY4PXsndmVyc2lvbic6JzIuMC4wJywnZW5jb2RlJzp1dGY4ZW5jb2RlLCdkZWNvZGUnOnV0ZjhkZWNvZGV9OyAvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcbi8vIGxpa2UgdGhlIGZvbGxvd2luZzpcbmlmKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKXtkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gdXRmODt9KTt9ZWxzZSBpZihmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpe2lmKGZyZWVNb2R1bGUpeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuZnJlZU1vZHVsZS5leHBvcnRzID0gdXRmODt9ZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG52YXIgb2JqZWN0PXt9O3ZhciBoYXNPd25Qcm9wZXJ0eT1vYmplY3QuaGFzT3duUHJvcGVydHk7Zm9yKHZhciBrZXkgaW4gdXRmOCkge2hhc093blByb3BlcnR5LmNhbGwodXRmOCxrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gdXRmOFtrZXldKTt9fX1lbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3Nlclxucm9vdC51dGY4ID0gdXRmODt9fSkodGhpcyk7fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se31dLDMwOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsndXNlIHN0cmljdCc7dmFyIGFscGhhYmV0PScwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ei1fJy5zcGxpdCgnJyksbGVuZ3RoPTY0LG1hcD17fSxzZWVkPTAsaT0wLHByZXY7IC8qKlxyXG4gKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbnVtIFRoZSBudW1iZXIgdG8gY29udmVydC5cclxuICogQHJldHVybnMge1N0cmluZ30gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbnVtYmVyLlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBlbmNvZGUobnVtKXt2YXIgZW5jb2RlZD0nJztkbyB7ZW5jb2RlZCA9IGFscGhhYmV0W251bSAlIGxlbmd0aF0gKyBlbmNvZGVkO251bSA9IE1hdGguZmxvb3IobnVtIC8gbGVuZ3RoKTt9d2hpbGUobnVtID4gMCk7cmV0dXJuIGVuY29kZWQ7fSAvKipcclxuICogUmV0dXJuIHRoZSBpbnRlZ2VyIHZhbHVlIHNwZWNpZmllZCBieSB0aGUgZ2l2ZW4gc3RyaW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cclxuICogQHJldHVybnMge051bWJlcn0gVGhlIGludGVnZXIgdmFsdWUgcmVwcmVzZW50ZWQgYnkgdGhlIHN0cmluZy5cclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gZGVjb2RlKHN0cil7dmFyIGRlY29kZWQ9MDtmb3IoaSA9IDA7aSA8IHN0ci5sZW5ndGg7aSsrKSB7ZGVjb2RlZCA9IGRlY29kZWQgKiBsZW5ndGggKyBtYXBbc3RyLmNoYXJBdChpKV07fXJldHVybiBkZWNvZGVkO30gLyoqXHJcbiAqIFllYXN0OiBBIHRpbnkgZ3Jvd2luZyBpZCBnZW5lcmF0b3IuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgdW5pcXVlIGlkLlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiB5ZWFzdCgpe3ZhciBub3c9ZW5jb2RlKCtuZXcgRGF0ZSgpKTtpZihub3cgIT09IHByZXYpcmV0dXJuIHNlZWQgPSAwLHByZXYgPSBub3c7cmV0dXJuIG5vdyArICcuJyArIGVuY29kZShzZWVkKyspO30gLy9cbi8vIE1hcCBlYWNoIGNoYXJhY3RlciB0byBpdHMgaW5kZXguXG4vL1xuZm9yKDtpIDwgbGVuZ3RoO2krKykgbWFwW2FscGhhYmV0W2ldXSA9IGk7IC8vXG4vLyBFeHBvc2UgdGhlIGB5ZWFzdGAsIGBlbmNvZGVgIGFuZCBgZGVjb2RlYCBmdW5jdGlvbnMuXG4vL1xueWVhc3QuZW5jb2RlID0gZW5jb2RlO3llYXN0LmRlY29kZSA9IGRlY29kZTttb2R1bGUuZXhwb3J0cyA9IHllYXN0O30se31dLDMxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL3ZhciB1cmw9X2RlcmVxXygnLi91cmwnKTt2YXIgcGFyc2VyPV9kZXJlcV8oJ3NvY2tldC5pby1wYXJzZXInKTt2YXIgTWFuYWdlcj1fZGVyZXFfKCcuL21hbmFnZXInKTt2YXIgZGVidWc9X2RlcmVxXygnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudCcpOyAvKipcclxuICogTW9kdWxlIGV4cG9ydHMuXHJcbiAqL21vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGxvb2t1cDsgLyoqXHJcbiAqIE1hbmFnZXJzIGNhY2hlLlxyXG4gKi92YXIgY2FjaGU9ZXhwb3J0cy5tYW5hZ2VycyA9IHt9OyAvKipcclxuICogTG9va3MgdXAgYW4gZXhpc3RpbmcgYE1hbmFnZXJgIGZvciBtdWx0aXBsZXhpbmcuXHJcbiAqIElmIHRoZSB1c2VyIHN1bW1vbnM6XHJcbiAqXHJcbiAqICAgYGlvKCdodHRwOi8vbG9jYWxob3N0L2EnKTtgXHJcbiAqICAgYGlvKCdodHRwOi8vbG9jYWxob3N0L2InKTtgXHJcbiAqXHJcbiAqIFdlIHJldXNlIHRoZSBleGlzdGluZyBpbnN0YW5jZSBiYXNlZCBvbiBzYW1lIHNjaGVtZS9wb3J0L2hvc3QsXHJcbiAqIGFuZCB3ZSBpbml0aWFsaXplIHNvY2tldHMgZm9yIGVhY2ggbmFtZXNwYWNlLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBsb29rdXAodXJpLG9wdHMpe2lmKHR5cGVvZiB1cmkgPT0gJ29iamVjdCcpe29wdHMgPSB1cmk7dXJpID0gdW5kZWZpbmVkO31vcHRzID0gb3B0cyB8fCB7fTt2YXIgcGFyc2VkPXVybCh1cmkpO3ZhciBzb3VyY2U9cGFyc2VkLnNvdXJjZTt2YXIgaWQ9cGFyc2VkLmlkO3ZhciBwYXRoPXBhcnNlZC5wYXRoO3ZhciBzYW1lTmFtZXNwYWNlPWNhY2hlW2lkXSAmJiBwYXRoIGluIGNhY2hlW2lkXS5uc3BzO3ZhciBuZXdDb25uZWN0aW9uPW9wdHMuZm9yY2VOZXcgfHwgb3B0c1snZm9yY2UgbmV3IGNvbm5lY3Rpb24nXSB8fCBmYWxzZSA9PT0gb3B0cy5tdWx0aXBsZXggfHwgc2FtZU5hbWVzcGFjZTt2YXIgaW87aWYobmV3Q29ubmVjdGlvbil7ZGVidWcoJ2lnbm9yaW5nIHNvY2tldCBjYWNoZSBmb3IgJXMnLHNvdXJjZSk7aW8gPSBNYW5hZ2VyKHNvdXJjZSxvcHRzKTt9ZWxzZSB7aWYoIWNhY2hlW2lkXSl7ZGVidWcoJ25ldyBpbyBpbnN0YW5jZSBmb3IgJXMnLHNvdXJjZSk7Y2FjaGVbaWRdID0gTWFuYWdlcihzb3VyY2Usb3B0cyk7fWlvID0gY2FjaGVbaWRdO31yZXR1cm4gaW8uc29ja2V0KHBhcnNlZC5wYXRoKTt9IC8qKlxyXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLnByb3RvY29sID0gcGFyc2VyLnByb3RvY29sOyAvKipcclxuICogYGNvbm5lY3RgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJpXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMuY29ubmVjdCA9IGxvb2t1cDsgLyoqXHJcbiAqIEV4cG9zZSBjb25zdHJ1Y3RvcnMgZm9yIHN0YW5kYWxvbmUgYnVpbGQuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMuTWFuYWdlciA9IF9kZXJlcV8oJy4vbWFuYWdlcicpO2V4cG9ydHMuU29ja2V0ID0gX2RlcmVxXygnLi9zb2NrZXQnKTt9LHtcIi4vbWFuYWdlclwiOjMyLFwiLi9zb2NrZXRcIjozNCxcIi4vdXJsXCI6MzUsXCJkZWJ1Z1wiOjM5LFwic29ja2V0LmlvLXBhcnNlclwiOjQ3fV0sMzI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICovdmFyIGVpbz1fZGVyZXFfKCdlbmdpbmUuaW8tY2xpZW50Jyk7dmFyIFNvY2tldD1fZGVyZXFfKCcuL3NvY2tldCcpO3ZhciBFbWl0dGVyPV9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7dmFyIHBhcnNlcj1fZGVyZXFfKCdzb2NrZXQuaW8tcGFyc2VyJyk7dmFyIG9uPV9kZXJlcV8oJy4vb24nKTt2YXIgYmluZD1fZGVyZXFfKCdjb21wb25lbnQtYmluZCcpO3ZhciBkZWJ1Zz1fZGVyZXFfKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50Om1hbmFnZXInKTt2YXIgaW5kZXhPZj1fZGVyZXFfKCdpbmRleG9mJyk7dmFyIEJhY2tvZmY9X2RlcmVxXygnYmFja28yJyk7IC8qKlxyXG4gKiBJRTYrIGhhc093blByb3BlcnR5XHJcbiAqL3ZhciBoYXM9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTsgLyoqXHJcbiAqIE1vZHVsZSBleHBvcnRzXHJcbiAqL21vZHVsZS5leHBvcnRzID0gTWFuYWdlcjsgLyoqXHJcbiAqIGBNYW5hZ2VyYCBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGVuZ2luZSBpbnN0YW5jZSBvciBlbmdpbmUgdXJpL29wdHNcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gTWFuYWdlcih1cmksb3B0cyl7aWYoISh0aGlzIGluc3RhbmNlb2YgTWFuYWdlcikpcmV0dXJuIG5ldyBNYW5hZ2VyKHVyaSxvcHRzKTtpZih1cmkgJiYgJ29iamVjdCcgPT0gdHlwZW9mIHVyaSl7b3B0cyA9IHVyaTt1cmkgPSB1bmRlZmluZWQ7fW9wdHMgPSBvcHRzIHx8IHt9O29wdHMucGF0aCA9IG9wdHMucGF0aCB8fCAnL3NvY2tldC5pbyc7dGhpcy5uc3BzID0ge307dGhpcy5zdWJzID0gW107dGhpcy5vcHRzID0gb3B0czt0aGlzLnJlY29ubmVjdGlvbihvcHRzLnJlY29ubmVjdGlvbiAhPT0gZmFsc2UpO3RoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7dGhpcy5yZWNvbm5lY3Rpb25EZWxheShvcHRzLnJlY29ubmVjdGlvbkRlbGF5IHx8IDEwMDApO3RoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgob3B0cy5yZWNvbm5lY3Rpb25EZWxheU1heCB8fCA1MDAwKTt0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3Iob3B0cy5yYW5kb21pemF0aW9uRmFjdG9yIHx8IDAuNSk7dGhpcy5iYWNrb2ZmID0gbmV3IEJhY2tvZmYoe21pbjp0aGlzLnJlY29ubmVjdGlvbkRlbGF5KCksbWF4OnRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgoKSxqaXR0ZXI6dGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKCl9KTt0aGlzLnRpbWVvdXQobnVsbCA9PSBvcHRzLnRpbWVvdXQ/MjAwMDA6b3B0cy50aW1lb3V0KTt0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJzt0aGlzLnVyaSA9IHVyaTt0aGlzLmNvbm5lY3RpbmcgPSBbXTt0aGlzLmxhc3RQaW5nID0gbnVsbDt0aGlzLmVuY29kaW5nID0gZmFsc2U7dGhpcy5wYWNrZXRCdWZmZXIgPSBbXTt0aGlzLmVuY29kZXIgPSBuZXcgcGFyc2VyLkVuY29kZXIoKTt0aGlzLmRlY29kZXIgPSBuZXcgcGFyc2VyLkRlY29kZXIoKTt0aGlzLmF1dG9Db25uZWN0ID0gb3B0cy5hdXRvQ29ubmVjdCAhPT0gZmFsc2U7aWYodGhpcy5hdXRvQ29ubmVjdCl0aGlzLm9wZW4oKTt9IC8qKlxyXG4gKiBQcm9wYWdhdGUgZ2l2ZW4gZXZlbnQgdG8gc29ja2V0cyBhbmQgZW1pdCBvbiBgdGhpc2BcclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLmVtaXRBbGwgPSBmdW5jdGlvbigpe3RoaXMuZW1pdC5hcHBseSh0aGlzLGFyZ3VtZW50cyk7Zm9yKHZhciBuc3AgaW4gdGhpcy5uc3BzKSB7aWYoaGFzLmNhbGwodGhpcy5uc3BzLG5zcCkpe3RoaXMubnNwc1tuc3BdLmVtaXQuYXBwbHkodGhpcy5uc3BzW25zcF0sYXJndW1lbnRzKTt9fX07IC8qKlxyXG4gKiBVcGRhdGUgYHNvY2tldC5pZGAgb2YgYWxsIHNvY2tldHNcclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLnVwZGF0ZVNvY2tldElkcyA9IGZ1bmN0aW9uKCl7Zm9yKHZhciBuc3AgaW4gdGhpcy5uc3BzKSB7aWYoaGFzLmNhbGwodGhpcy5uc3BzLG5zcCkpe3RoaXMubnNwc1tuc3BdLmlkID0gdGhpcy5lbmdpbmUuaWQ7fX19OyAvKipcclxuICogTWl4IGluIGBFbWl0dGVyYC5cclxuICovRW1pdHRlcihNYW5hZ2VyLnByb3RvdHlwZSk7IC8qKlxyXG4gKiBTZXRzIHRoZSBgcmVjb25uZWN0aW9uYCBjb25maWcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiBpdCBzaG91bGQgYXV0b21hdGljYWxseSByZWNvbm5lY3RcclxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb24gPSBmdW5jdGlvbih2KXtpZighYXJndW1lbnRzLmxlbmd0aClyZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uO3RoaXMuX3JlY29ubmVjdGlvbiA9ICEhdjtyZXR1cm4gdGhpczt9OyAvKipcclxuICogU2V0cyB0aGUgcmVjb25uZWN0aW9uIGF0dGVtcHRzIGNvbmZpZy5cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCByZWNvbm5lY3Rpb24gYXR0ZW1wdHMgYmVmb3JlIGdpdmluZyB1cFxyXG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkF0dGVtcHRzID0gZnVuY3Rpb24odil7aWYoIWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzO3RoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzID0gdjtyZXR1cm4gdGhpczt9OyAvKipcclxuICogU2V0cyB0aGUgZGVsYXkgYmV0d2VlbiByZWNvbm5lY3Rpb25zLlxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcclxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25EZWxheSA9IGZ1bmN0aW9uKHYpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheTt0aGlzLl9yZWNvbm5lY3Rpb25EZWxheSA9IHY7dGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRNaW4odik7cmV0dXJuIHRoaXM7fTtNYW5hZ2VyLnByb3RvdHlwZS5yYW5kb21pemF0aW9uRmFjdG9yID0gZnVuY3Rpb24odil7aWYoIWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3I7dGhpcy5fcmFuZG9taXphdGlvbkZhY3RvciA9IHY7dGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRKaXR0ZXIodik7cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIFNldHMgdGhlIG1heGltdW0gZGVsYXkgYmV0d2VlbiByZWNvbm5lY3Rpb25zLlxyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcclxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25EZWxheU1heCA9IGZ1bmN0aW9uKHYpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heDt0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heCA9IHY7dGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRNYXgodik7cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIFNldHMgdGhlIGNvbm5lY3Rpb24gdGltZW91dC4gYGZhbHNlYCB0byBkaXNhYmxlXHJcbiAqXHJcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcclxuICogQGFwaSBwdWJsaWNcclxuICovTWFuYWdlci5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uKHYpe2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiB0aGlzLl90aW1lb3V0O3RoaXMuX3RpbWVvdXQgPSB2O3JldHVybiB0aGlzO307IC8qKlxyXG4gKiBTdGFydHMgdHJ5aW5nIHRvIHJlY29ubmVjdCBpZiByZWNvbm5lY3Rpb24gaXMgZW5hYmxlZCBhbmQgd2UgaGF2ZSBub3RcclxuICogc3RhcnRlZCByZWNvbm5lY3RpbmcgeWV0XHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5tYXliZVJlY29ubmVjdE9uT3BlbiA9IGZ1bmN0aW9uKCl7IC8vIE9ubHkgdHJ5IHRvIHJlY29ubmVjdCBpZiBpdCdzIHRoZSBmaXJzdCB0aW1lIHdlJ3JlIGNvbm5lY3RpbmdcbmlmKCF0aGlzLnJlY29ubmVjdGluZyAmJiB0aGlzLl9yZWNvbm5lY3Rpb24gJiYgdGhpcy5iYWNrb2ZmLmF0dGVtcHRzID09PSAwKXsgLy8ga2VlcHMgcmVjb25uZWN0aW9uIGZyb20gZmlyaW5nIHR3aWNlIGZvciB0aGUgc2FtZSByZWNvbm5lY3Rpb24gbG9vcFxudGhpcy5yZWNvbm5lY3QoKTt9fTsgLyoqXHJcbiAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0IGBzb2NrZXRgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25hbCwgY2FsbGJhY2tcclxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5vcGVuID0gTWFuYWdlci5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uKGZuKXtkZWJ1ZygncmVhZHlTdGF0ZSAlcycsdGhpcy5yZWFkeVN0YXRlKTtpZih+dGhpcy5yZWFkeVN0YXRlLmluZGV4T2YoJ29wZW4nKSlyZXR1cm4gdGhpcztkZWJ1Zygnb3BlbmluZyAlcycsdGhpcy51cmkpO3RoaXMuZW5naW5lID0gZWlvKHRoaXMudXJpLHRoaXMub3B0cyk7dmFyIHNvY2tldD10aGlzLmVuZ2luZTt2YXIgc2VsZj10aGlzO3RoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJzt0aGlzLnNraXBSZWNvbm5lY3QgPSBmYWxzZTsgLy8gZW1pdCBgb3BlbmBcbnZhciBvcGVuU3ViPW9uKHNvY2tldCwnb3BlbicsZnVuY3Rpb24oKXtzZWxmLm9ub3BlbigpO2ZuICYmIGZuKCk7fSk7IC8vIGVtaXQgYGNvbm5lY3RfZXJyb3JgXG52YXIgZXJyb3JTdWI9b24oc29ja2V0LCdlcnJvcicsZnVuY3Rpb24oZGF0YSl7ZGVidWcoJ2Nvbm5lY3RfZXJyb3InKTtzZWxmLmNsZWFudXAoKTtzZWxmLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztzZWxmLmVtaXRBbGwoJ2Nvbm5lY3RfZXJyb3InLGRhdGEpO2lmKGZuKXt2YXIgZXJyPW5ldyBFcnJvcignQ29ubmVjdGlvbiBlcnJvcicpO2Vyci5kYXRhID0gZGF0YTtmbihlcnIpO31lbHNlIHsgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbnNlbGYubWF5YmVSZWNvbm5lY3RPbk9wZW4oKTt9fSk7IC8vIGVtaXQgYGNvbm5lY3RfdGltZW91dGBcbmlmKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KXt2YXIgdGltZW91dD10aGlzLl90aW1lb3V0O2RlYnVnKCdjb25uZWN0IGF0dGVtcHQgd2lsbCB0aW1lb3V0IGFmdGVyICVkJyx0aW1lb3V0KTsgLy8gc2V0IHRpbWVyXG52YXIgdGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe2RlYnVnKCdjb25uZWN0IGF0dGVtcHQgdGltZWQgb3V0IGFmdGVyICVkJyx0aW1lb3V0KTtvcGVuU3ViLmRlc3Ryb3koKTtzb2NrZXQuY2xvc2UoKTtzb2NrZXQuZW1pdCgnZXJyb3InLCd0aW1lb3V0Jyk7c2VsZi5lbWl0QWxsKCdjb25uZWN0X3RpbWVvdXQnLHRpbWVvdXQpO30sdGltZW91dCk7dGhpcy5zdWJzLnB1c2goe2Rlc3Ryb3k6ZnVuY3Rpb24gZGVzdHJveSgpe2NsZWFyVGltZW91dCh0aW1lcik7fX0pO310aGlzLnN1YnMucHVzaChvcGVuU3ViKTt0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBvcGVuLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovTWFuYWdlci5wcm90b3R5cGUub25vcGVuID0gZnVuY3Rpb24oKXtkZWJ1Zygnb3BlbicpOyAvLyBjbGVhciBvbGQgc3Vic1xudGhpcy5jbGVhbnVwKCk7IC8vIG1hcmsgYXMgb3BlblxudGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO3RoaXMuZW1pdCgnb3BlbicpOyAvLyBhZGQgbmV3IHN1YnNcbnZhciBzb2NrZXQ9dGhpcy5lbmdpbmU7dGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCdkYXRhJyxiaW5kKHRoaXMsJ29uZGF0YScpKSk7dGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCdwaW5nJyxiaW5kKHRoaXMsJ29ucGluZycpKSk7dGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCdwb25nJyxiaW5kKHRoaXMsJ29ucG9uZycpKSk7dGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCdlcnJvcicsYmluZCh0aGlzLCdvbmVycm9yJykpKTt0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsJ2Nsb3NlJyxiaW5kKHRoaXMsJ29uY2xvc2UnKSkpO3RoaXMuc3Vicy5wdXNoKG9uKHRoaXMuZGVjb2RlciwnZGVjb2RlZCcsYmluZCh0aGlzLCdvbmRlY29kZWQnKSkpO307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBhIHBpbmcuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5vbnBpbmcgPSBmdW5jdGlvbigpe3RoaXMubGFzdFBpbmcgPSBuZXcgRGF0ZSgpO3RoaXMuZW1pdEFsbCgncGluZycpO307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBhIHBhY2tldC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLm9ucG9uZyA9IGZ1bmN0aW9uKCl7dGhpcy5lbWl0QWxsKCdwb25nJyxuZXcgRGF0ZSgpIC0gdGhpcy5sYXN0UGluZyk7fTsgLyoqXHJcbiAqIENhbGxlZCB3aXRoIGRhdGEuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5vbmRhdGEgPSBmdW5jdGlvbihkYXRhKXt0aGlzLmRlY29kZXIuYWRkKGRhdGEpO307IC8qKlxyXG4gKiBDYWxsZWQgd2hlbiBwYXJzZXIgZnVsbHkgZGVjb2RlcyBhIHBhY2tldC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLm9uZGVjb2RlZCA9IGZ1bmN0aW9uKHBhY2tldCl7dGhpcy5lbWl0KCdwYWNrZXQnLHBhY2tldCk7fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbihlcnIpe2RlYnVnKCdlcnJvcicsZXJyKTt0aGlzLmVtaXRBbGwoJ2Vycm9yJyxlcnIpO307IC8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtTb2NrZXR9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLnNvY2tldCA9IGZ1bmN0aW9uKG5zcCl7dmFyIHNvY2tldD10aGlzLm5zcHNbbnNwXTtpZighc29ja2V0KXtzb2NrZXQgPSBuZXcgU29ja2V0KHRoaXMsbnNwKTt0aGlzLm5zcHNbbnNwXSA9IHNvY2tldDt2YXIgc2VsZj10aGlzO3NvY2tldC5vbignY29ubmVjdGluZycsb25Db25uZWN0aW5nKTtzb2NrZXQub24oJ2Nvbm5lY3QnLGZ1bmN0aW9uKCl7c29ja2V0LmlkID0gc2VsZi5lbmdpbmUuaWQ7fSk7aWYodGhpcy5hdXRvQ29ubmVjdCl7IC8vIG1hbnVhbGx5IGNhbGwgaGVyZSBzaW5jZSBjb25uZWN0aW5nIGV2bmV0IGlzIGZpcmVkIGJlZm9yZSBsaXN0ZW5pbmdcbm9uQ29ubmVjdGluZygpO319ZnVuY3Rpb24gb25Db25uZWN0aW5nKCl7aWYoISB+aW5kZXhPZihzZWxmLmNvbm5lY3Rpbmcsc29ja2V0KSl7c2VsZi5jb25uZWN0aW5nLnB1c2goc29ja2V0KTt9fXJldHVybiBzb2NrZXQ7fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0XHJcbiAqL01hbmFnZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbihzb2NrZXQpe3ZhciBpbmRleD1pbmRleE9mKHRoaXMuY29ubmVjdGluZyxzb2NrZXQpO2lmKH5pbmRleCl0aGlzLmNvbm5lY3Rpbmcuc3BsaWNlKGluZGV4LDEpO2lmKHRoaXMuY29ubmVjdGluZy5sZW5ndGgpcmV0dXJuO3RoaXMuY2xvc2UoKTt9OyAvKipcclxuICogV3JpdGVzIGEgcGFja2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQpe2RlYnVnKCd3cml0aW5nIHBhY2tldCAlaicscGFja2V0KTt2YXIgc2VsZj10aGlzO2lmKCFzZWxmLmVuY29kaW5nKXsgLy8gZW5jb2RlLCB0aGVuIHdyaXRlIHRvIGVuZ2luZSB3aXRoIHJlc3VsdFxuc2VsZi5lbmNvZGluZyA9IHRydWU7dGhpcy5lbmNvZGVyLmVuY29kZShwYWNrZXQsZnVuY3Rpb24oZW5jb2RlZFBhY2tldHMpe2Zvcih2YXIgaT0wO2kgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7aSsrKSB7c2VsZi5lbmdpbmUud3JpdGUoZW5jb2RlZFBhY2tldHNbaV0scGFja2V0Lm9wdGlvbnMpO31zZWxmLmVuY29kaW5nID0gZmFsc2U7c2VsZi5wcm9jZXNzUGFja2V0UXVldWUoKTt9KTt9ZWxzZSB7IC8vIGFkZCBwYWNrZXQgdG8gdGhlIHF1ZXVlXG5zZWxmLnBhY2tldEJ1ZmZlci5wdXNoKHBhY2tldCk7fX07IC8qKlxyXG4gKiBJZiBwYWNrZXQgYnVmZmVyIGlzIG5vbi1lbXB0eSwgYmVnaW5zIGVuY29kaW5nIHRoZVxyXG4gKiBuZXh0IHBhY2tldCBpbiBsaW5lLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovTWFuYWdlci5wcm90b3R5cGUucHJvY2Vzc1BhY2tldFF1ZXVlID0gZnVuY3Rpb24oKXtpZih0aGlzLnBhY2tldEJ1ZmZlci5sZW5ndGggPiAwICYmICF0aGlzLmVuY29kaW5nKXt2YXIgcGFjaz10aGlzLnBhY2tldEJ1ZmZlci5zaGlmdCgpO3RoaXMucGFja2V0KHBhY2spO319OyAvKipcclxuICogQ2xlYW4gdXAgdHJhbnNwb3J0IHN1YnNjcmlwdGlvbnMgYW5kIHBhY2tldCBidWZmZXIuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24oKXtkZWJ1ZygnY2xlYW51cCcpO3ZhciBzdWI7d2hpbGUoc3ViID0gdGhpcy5zdWJzLnNoaWZ0KCkpIHN1Yi5kZXN0cm95KCk7dGhpcy5wYWNrZXRCdWZmZXIgPSBbXTt0aGlzLmVuY29kaW5nID0gZmFsc2U7dGhpcy5sYXN0UGluZyA9IG51bGw7dGhpcy5kZWNvZGVyLmRlc3Ryb3koKTt9OyAvKipcclxuICogQ2xvc2UgdGhlIGN1cnJlbnQgc29ja2V0LlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovTWFuYWdlci5wcm90b3R5cGUuY2xvc2UgPSBNYW5hZ2VyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24oKXtkZWJ1ZygnZGlzY29ubmVjdCcpO3RoaXMuc2tpcFJlY29ubmVjdCA9IHRydWU7dGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtpZignb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlKXsgLy8gYG9uY2xvc2VgIHdpbGwgbm90IGZpcmUgYmVjYXVzZVxuLy8gYW4gb3BlbiBldmVudCBuZXZlciBoYXBwZW5lZFxudGhpcy5jbGVhbnVwKCk7fXRoaXMuYmFja29mZi5yZXNldCgpO3RoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO2lmKHRoaXMuZW5naW5lKXRoaXMuZW5naW5lLmNsb3NlKCk7fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIGVuZ2luZSBjbG9zZS5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL01hbmFnZXIucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbihyZWFzb24pe2RlYnVnKCdvbmNsb3NlJyk7dGhpcy5jbGVhbnVwKCk7dGhpcy5iYWNrb2ZmLnJlc2V0KCk7dGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7dGhpcy5lbWl0KCdjbG9zZScscmVhc29uKTtpZih0aGlzLl9yZWNvbm5lY3Rpb24gJiYgIXRoaXMuc2tpcFJlY29ubmVjdCl7dGhpcy5yZWNvbm5lY3QoKTt9fTsgLyoqXHJcbiAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3QgPSBmdW5jdGlvbigpe2lmKHRoaXMucmVjb25uZWN0aW5nIHx8IHRoaXMuc2tpcFJlY29ubmVjdClyZXR1cm4gdGhpczt2YXIgc2VsZj10aGlzO2lmKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cyl7ZGVidWcoJ3JlY29ubmVjdCBmYWlsZWQnKTt0aGlzLmJhY2tvZmYucmVzZXQoKTt0aGlzLmVtaXRBbGwoJ3JlY29ubmVjdF9mYWlsZWQnKTt0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO31lbHNlIHt2YXIgZGVsYXk9dGhpcy5iYWNrb2ZmLmR1cmF0aW9uKCk7ZGVidWcoJ3dpbGwgd2FpdCAlZG1zIGJlZm9yZSByZWNvbm5lY3QgYXR0ZW1wdCcsZGVsYXkpO3RoaXMucmVjb25uZWN0aW5nID0gdHJ1ZTt2YXIgdGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe2lmKHNlbGYuc2tpcFJlY29ubmVjdClyZXR1cm47ZGVidWcoJ2F0dGVtcHRpbmcgcmVjb25uZWN0Jyk7c2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RfYXR0ZW1wdCcsc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdGluZycsc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTsgLy8gY2hlY2sgYWdhaW4gZm9yIHRoZSBjYXNlIHNvY2tldCBjbG9zZWQgaW4gYWJvdmUgZXZlbnRzXG5pZihzZWxmLnNraXBSZWNvbm5lY3QpcmV0dXJuO3NlbGYub3BlbihmdW5jdGlvbihlcnIpe2lmKGVycil7ZGVidWcoJ3JlY29ubmVjdCBhdHRlbXB0IGVycm9yJyk7c2VsZi5yZWNvbm5lY3RpbmcgPSBmYWxzZTtzZWxmLnJlY29ubmVjdCgpO3NlbGYuZW1pdEFsbCgncmVjb25uZWN0X2Vycm9yJyxlcnIuZGF0YSk7fWVsc2Uge2RlYnVnKCdyZWNvbm5lY3Qgc3VjY2VzcycpO3NlbGYub25yZWNvbm5lY3QoKTt9fSk7fSxkZWxheSk7dGhpcy5zdWJzLnB1c2goe2Rlc3Ryb3k6ZnVuY3Rpb24gZGVzdHJveSgpe2NsZWFyVGltZW91dCh0aW1lcik7fX0pO319OyAvKipcclxuICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZWNvbm5lY3QuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9NYW5hZ2VyLnByb3RvdHlwZS5vbnJlY29ubmVjdCA9IGZ1bmN0aW9uKCl7dmFyIGF0dGVtcHQ9dGhpcy5iYWNrb2ZmLmF0dGVtcHRzO3RoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7dGhpcy5iYWNrb2ZmLnJlc2V0KCk7dGhpcy51cGRhdGVTb2NrZXRJZHMoKTt0aGlzLmVtaXRBbGwoJ3JlY29ubmVjdCcsYXR0ZW1wdCk7fTt9LHtcIi4vb25cIjozMyxcIi4vc29ja2V0XCI6MzQsXCJiYWNrbzJcIjozNixcImNvbXBvbmVudC1iaW5kXCI6MzcsXCJjb21wb25lbnQtZW1pdHRlclwiOjM4LFwiZGVidWdcIjozOSxcImVuZ2luZS5pby1jbGllbnRcIjoxLFwiaW5kZXhvZlwiOjQyLFwic29ja2V0LmlvLXBhcnNlclwiOjQ3fV0sMzM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogTW9kdWxlIGV4cG9ydHMuXHJcbiAqL21vZHVsZS5leHBvcnRzID0gb247IC8qKlxyXG4gKiBIZWxwZXIgZm9yIHN1YnNjcmlwdGlvbnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fEV2ZW50RW1pdHRlcn0gb2JqIHdpdGggYEVtaXR0ZXJgIG1peGluIG9yIGBFdmVudEVtaXR0ZXJgXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIG9uKG9iaixldixmbil7b2JqLm9uKGV2LGZuKTtyZXR1cm4ge2Rlc3Ryb3k6ZnVuY3Rpb24gZGVzdHJveSgpe29iai5yZW1vdmVMaXN0ZW5lcihldixmbik7fX07fX0se31dLDM0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAqL3ZhciBwYXJzZXI9X2RlcmVxXygnc29ja2V0LmlvLXBhcnNlcicpO3ZhciBFbWl0dGVyPV9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7dmFyIHRvQXJyYXk9X2RlcmVxXygndG8tYXJyYXknKTt2YXIgb249X2RlcmVxXygnLi9vbicpO3ZhciBiaW5kPV9kZXJlcV8oJ2NvbXBvbmVudC1iaW5kJyk7dmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6c29ja2V0Jyk7dmFyIGhhc0Jpbj1fZGVyZXFfKCdoYXMtYmluYXJ5Jyk7IC8qKlxyXG4gKiBNb2R1bGUgZXhwb3J0cy5cclxuICovbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gU29ja2V0OyAvKipcclxuICogSW50ZXJuYWwgZXZlbnRzIChibGFja2xpc3RlZCkuXHJcbiAqIFRoZXNlIGV2ZW50cyBjYW4ndCBiZSBlbWl0dGVkIGJ5IHRoZSB1c2VyLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovdmFyIGV2ZW50cz17Y29ubmVjdDoxLGNvbm5lY3RfZXJyb3I6MSxjb25uZWN0X3RpbWVvdXQ6MSxjb25uZWN0aW5nOjEsZGlzY29ubmVjdDoxLGVycm9yOjEscmVjb25uZWN0OjEscmVjb25uZWN0X2F0dGVtcHQ6MSxyZWNvbm5lY3RfZmFpbGVkOjEscmVjb25uZWN0X2Vycm9yOjEscmVjb25uZWN0aW5nOjEscGluZzoxLHBvbmc6MX07IC8qKlxyXG4gKiBTaG9ydGN1dCB0byBgRW1pdHRlciNlbWl0YC5cclxuICovdmFyIGVtaXQ9RW1pdHRlci5wcm90b3R5cGUuZW1pdDsgLyoqXHJcbiAqIGBTb2NrZXRgIGNvbnN0cnVjdG9yLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBTb2NrZXQoaW8sbnNwKXt0aGlzLmlvID0gaW87dGhpcy5uc3AgPSBuc3A7dGhpcy5qc29uID0gdGhpczsgLy8gY29tcGF0XG50aGlzLmlkcyA9IDA7dGhpcy5hY2tzID0ge307dGhpcy5yZWNlaXZlQnVmZmVyID0gW107dGhpcy5zZW5kQnVmZmVyID0gW107dGhpcy5jb25uZWN0ZWQgPSBmYWxzZTt0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7aWYodGhpcy5pby5hdXRvQ29ubmVjdCl0aGlzLm9wZW4oKTt9IC8qKlxyXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxyXG4gKi9FbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpOyAvKipcclxuICogU3Vic2NyaWJlIHRvIG9wZW4sIGNsb3NlIGFuZCBwYWNrZXQgZXZlbnRzXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLnN1YkV2ZW50cyA9IGZ1bmN0aW9uKCl7aWYodGhpcy5zdWJzKXJldHVybjt2YXIgaW89dGhpcy5pbzt0aGlzLnN1YnMgPSBbb24oaW8sJ29wZW4nLGJpbmQodGhpcywnb25vcGVuJykpLG9uKGlvLCdwYWNrZXQnLGJpbmQodGhpcywnb25wYWNrZXQnKSksb24oaW8sJ2Nsb3NlJyxiaW5kKHRoaXMsJ29uY2xvc2UnKSldO307IC8qKlxyXG4gKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovU29ja2V0LnByb3RvdHlwZS5vcGVuID0gU29ja2V0LnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24oKXtpZih0aGlzLmNvbm5lY3RlZClyZXR1cm4gdGhpczt0aGlzLnN1YkV2ZW50cygpO3RoaXMuaW8ub3BlbigpOyAvLyBlbnN1cmUgb3BlblxuaWYoJ29wZW4nID09IHRoaXMuaW8ucmVhZHlTdGF0ZSl0aGlzLm9ub3BlbigpO3RoaXMuZW1pdCgnY29ubmVjdGluZycpO3JldHVybiB0aGlzO307IC8qKlxyXG4gKiBTZW5kcyBhIGBtZXNzYWdlYCBldmVudC5cclxuICpcclxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1NvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKCl7dmFyIGFyZ3M9dG9BcnJheShhcmd1bWVudHMpO2FyZ3MudW5zaGlmdCgnbWVzc2FnZScpO3RoaXMuZW1pdC5hcHBseSh0aGlzLGFyZ3MpO3JldHVybiB0aGlzO307IC8qKlxyXG4gKiBPdmVycmlkZSBgZW1pdGAuXHJcbiAqIElmIHRoZSBldmVudCBpcyBpbiBgZXZlbnRzYCwgaXQncyBlbWl0dGVkIG5vcm1hbGx5LlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxyXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcclxuICogQGFwaSBwdWJsaWNcclxuICovU29ja2V0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXYpe2lmKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldikpe2VtaXQuYXBwbHkodGhpcyxhcmd1bWVudHMpO3JldHVybiB0aGlzO312YXIgYXJncz10b0FycmF5KGFyZ3VtZW50cyk7dmFyIHBhcnNlclR5cGU9cGFyc2VyLkVWRU5UOyAvLyBkZWZhdWx0XG5pZihoYXNCaW4oYXJncykpe3BhcnNlclR5cGUgPSBwYXJzZXIuQklOQVJZX0VWRU5UO30gLy8gYmluYXJ5XG52YXIgcGFja2V0PXt0eXBlOnBhcnNlclR5cGUsZGF0YTphcmdzfTtwYWNrZXQub3B0aW9ucyA9IHt9O3BhY2tldC5vcHRpb25zLmNvbXByZXNzID0gIXRoaXMuZmxhZ3MgfHwgZmFsc2UgIT09IHRoaXMuZmxhZ3MuY29tcHJlc3M7IC8vIGV2ZW50IGFjayBjYWxsYmFja1xuaWYoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdKXtkZWJ1ZygnZW1pdHRpbmcgcGFja2V0IHdpdGggYWNrIGlkICVkJyx0aGlzLmlkcyk7dGhpcy5hY2tzW3RoaXMuaWRzXSA9IGFyZ3MucG9wKCk7cGFja2V0LmlkID0gdGhpcy5pZHMrKzt9aWYodGhpcy5jb25uZWN0ZWQpe3RoaXMucGFja2V0KHBhY2tldCk7fWVsc2Uge3RoaXMuc2VuZEJ1ZmZlci5wdXNoKHBhY2tldCk7fWRlbGV0ZSB0aGlzLmZsYWdzO3JldHVybiB0aGlzO307IC8qKlxyXG4gKiBTZW5kcyBhIHBhY2tldC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQpe3BhY2tldC5uc3AgPSB0aGlzLm5zcDt0aGlzLmlvLnBhY2tldChwYWNrZXQpO307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgYG9wZW5gLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5vbm9wZW4gPSBmdW5jdGlvbigpe2RlYnVnKCd0cmFuc3BvcnQgaXMgb3BlbiAtIGNvbm5lY3RpbmcnKTsgLy8gd3JpdGUgY29ubmVjdCBwYWNrZXQgaWYgbmVjZXNzYXJ5XG5pZignLycgIT0gdGhpcy5uc3Ape3RoaXMucGFja2V0KHt0eXBlOnBhcnNlci5DT05ORUNUfSk7fX07IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHJlYXNvblxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5vbmNsb3NlID0gZnVuY3Rpb24ocmVhc29uKXtkZWJ1ZygnY2xvc2UgKCVzKScscmVhc29uKTt0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO3RoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtkZWxldGUgdGhpcy5pZDt0aGlzLmVtaXQoJ2Rpc2Nvbm5lY3QnLHJlYXNvbik7fTsgLyoqXHJcbiAqIENhbGxlZCB3aXRoIHNvY2tldCBwYWNrZXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25wYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQpe2lmKHBhY2tldC5uc3AgIT0gdGhpcy5uc3ApcmV0dXJuO3N3aXRjaChwYWNrZXQudHlwZSl7Y2FzZSBwYXJzZXIuQ09OTkVDVDp0aGlzLm9uY29ubmVjdCgpO2JyZWFrO2Nhc2UgcGFyc2VyLkVWRU5UOnRoaXMub25ldmVudChwYWNrZXQpO2JyZWFrO2Nhc2UgcGFyc2VyLkJJTkFSWV9FVkVOVDp0aGlzLm9uZXZlbnQocGFja2V0KTticmVhaztjYXNlIHBhcnNlci5BQ0s6dGhpcy5vbmFjayhwYWNrZXQpO2JyZWFrO2Nhc2UgcGFyc2VyLkJJTkFSWV9BQ0s6dGhpcy5vbmFjayhwYWNrZXQpO2JyZWFrO2Nhc2UgcGFyc2VyLkRJU0NPTk5FQ1Q6dGhpcy5vbmRpc2Nvbm5lY3QoKTticmVhaztjYXNlIHBhcnNlci5FUlJPUjp0aGlzLmVtaXQoJ2Vycm9yJyxwYWNrZXQuZGF0YSk7YnJlYWs7fX07IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBldmVudC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5vbmV2ZW50ID0gZnVuY3Rpb24ocGFja2V0KXt2YXIgYXJncz1wYWNrZXQuZGF0YSB8fCBbXTtkZWJ1ZygnZW1pdHRpbmcgZXZlbnQgJWonLGFyZ3MpO2lmKG51bGwgIT0gcGFja2V0LmlkKXtkZWJ1ZygnYXR0YWNoaW5nIGFjayBjYWxsYmFjayB0byBldmVudCcpO2FyZ3MucHVzaCh0aGlzLmFjayhwYWNrZXQuaWQpKTt9aWYodGhpcy5jb25uZWN0ZWQpe2VtaXQuYXBwbHkodGhpcyxhcmdzKTt9ZWxzZSB7dGhpcy5yZWNlaXZlQnVmZmVyLnB1c2goYXJncyk7fX07IC8qKlxyXG4gKiBQcm9kdWNlcyBhbiBhY2sgY2FsbGJhY2sgdG8gZW1pdCB3aXRoIGFuIGV2ZW50LlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5hY2sgPSBmdW5jdGlvbihpZCl7dmFyIHNlbGY9dGhpczt2YXIgc2VudD1mYWxzZTtyZXR1cm4gZnVuY3Rpb24oKXsgLy8gcHJldmVudCBkb3VibGUgY2FsbGJhY2tzXG5pZihzZW50KXJldHVybjtzZW50ID0gdHJ1ZTt2YXIgYXJncz10b0FycmF5KGFyZ3VtZW50cyk7ZGVidWcoJ3NlbmRpbmcgYWNrICVqJyxhcmdzKTt2YXIgdHlwZT1oYXNCaW4oYXJncyk/cGFyc2VyLkJJTkFSWV9BQ0s6cGFyc2VyLkFDSztzZWxmLnBhY2tldCh7dHlwZTp0eXBlLGlkOmlkLGRhdGE6YXJnc30pO307fTsgLyoqXHJcbiAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGFja25vd2xlZ2VtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9Tb2NrZXQucHJvdG90eXBlLm9uYWNrID0gZnVuY3Rpb24ocGFja2V0KXt2YXIgYWNrPXRoaXMuYWNrc1twYWNrZXQuaWRdO2lmKCdmdW5jdGlvbicgPT0gdHlwZW9mIGFjayl7ZGVidWcoJ2NhbGxpbmcgYWNrICVzIHdpdGggJWonLHBhY2tldC5pZCxwYWNrZXQuZGF0YSk7YWNrLmFwcGx5KHRoaXMscGFja2V0LmRhdGEpO2RlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmlkXTt9ZWxzZSB7ZGVidWcoJ2JhZCBhY2sgJXMnLHBhY2tldC5pZCk7fX07IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgY29ubmVjdC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25jb25uZWN0ID0gZnVuY3Rpb24oKXt0aGlzLmNvbm5lY3RlZCA9IHRydWU7dGhpcy5kaXNjb25uZWN0ZWQgPSBmYWxzZTt0aGlzLmVtaXQoJ2Nvbm5lY3QnKTt0aGlzLmVtaXRCdWZmZXJlZCgpO307IC8qKlxyXG4gKiBFbWl0IGJ1ZmZlcmVkIGV2ZW50cyAocmVjZWl2ZWQgYW5kIGVtaXR0ZWQpLlxyXG4gKlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovU29ja2V0LnByb3RvdHlwZS5lbWl0QnVmZmVyZWQgPSBmdW5jdGlvbigpe3ZhciBpO2ZvcihpID0gMDtpIDwgdGhpcy5yZWNlaXZlQnVmZmVyLmxlbmd0aDtpKyspIHtlbWl0LmFwcGx5KHRoaXMsdGhpcy5yZWNlaXZlQnVmZmVyW2ldKTt9dGhpcy5yZWNlaXZlQnVmZmVyID0gW107Zm9yKGkgPSAwO2kgPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoO2krKykge3RoaXMucGFja2V0KHRoaXMuc2VuZEJ1ZmZlcltpXSk7fXRoaXMuc2VuZEJ1ZmZlciA9IFtdO307IC8qKlxyXG4gKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgZGlzY29ubmVjdC5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1NvY2tldC5wcm90b3R5cGUub25kaXNjb25uZWN0ID0gZnVuY3Rpb24oKXtkZWJ1Zygnc2VydmVyIGRpc2Nvbm5lY3QgKCVzKScsdGhpcy5uc3ApO3RoaXMuZGVzdHJveSgpO3RoaXMub25jbG9zZSgnaW8gc2VydmVyIGRpc2Nvbm5lY3QnKTt9OyAvKipcclxuICogQ2FsbGVkIHVwb24gZm9yY2VkIGNsaWVudC9zZXJ2ZXIgc2lkZSBkaXNjb25uZWN0aW9ucyxcclxuICogdGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgbWFuYWdlciBzdG9wcyB0cmFja2luZyB1cyBhbmRcclxuICogdGhhdCByZWNvbm5lY3Rpb25zIGRvbid0IGdldCB0cmlnZ2VyZWQgZm9yIHRoaXMuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZS5cclxuICovU29ja2V0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKXtpZih0aGlzLnN1YnMpeyAvLyBjbGVhbiBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIHJlY29ubmVjdGlvbnNcbmZvcih2YXIgaT0wO2kgPCB0aGlzLnN1YnMubGVuZ3RoO2krKykge3RoaXMuc3Vic1tpXS5kZXN0cm95KCk7fXRoaXMuc3VicyA9IG51bGw7fXRoaXMuaW8uZGVzdHJveSh0aGlzKTt9OyAvKipcclxuICogRGlzY29ubmVjdHMgdGhlIHNvY2tldCBtYW51YWxseS5cclxuICpcclxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1NvY2tldC5wcm90b3R5cGUuY2xvc2UgPSBTb2NrZXQucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbigpe2lmKHRoaXMuY29ubmVjdGVkKXtkZWJ1ZygncGVyZm9ybWluZyBkaXNjb25uZWN0ICglcyknLHRoaXMubnNwKTt0aGlzLnBhY2tldCh7dHlwZTpwYXJzZXIuRElTQ09OTkVDVH0pO30gLy8gcmVtb3ZlIHNvY2tldCBmcm9tIHBvb2xcbnRoaXMuZGVzdHJveSgpO2lmKHRoaXMuY29ubmVjdGVkKXsgLy8gZmlyZSBldmVudHNcbnRoaXMub25jbG9zZSgnaW8gY2xpZW50IGRpc2Nvbm5lY3QnKTt9cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIFNldHMgdGhlIGNvbXByZXNzIGZsYWcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaWYgYHRydWVgLCBjb21wcmVzc2VzIHRoZSBzZW5kaW5nIGRhdGFcclxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1NvY2tldC5wcm90b3R5cGUuY29tcHJlc3MgPSBmdW5jdGlvbihjb21wcmVzcyl7dGhpcy5mbGFncyA9IHRoaXMuZmxhZ3MgfHwge307dGhpcy5mbGFncy5jb21wcmVzcyA9IGNvbXByZXNzO3JldHVybiB0aGlzO307fSx7XCIuL29uXCI6MzMsXCJjb21wb25lbnQtYmluZFwiOjM3LFwiY29tcG9uZW50LWVtaXR0ZXJcIjozOCxcImRlYnVnXCI6MzksXCJoYXMtYmluYXJ5XCI6NDEsXCJzb2NrZXQuaW8tcGFyc2VyXCI6NDcsXCJ0by1hcnJheVwiOjUxfV0sMzU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKipcclxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICovdmFyIHBhcnNldXJpPV9kZXJlcV8oJ3BhcnNldXJpJyk7dmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6dXJsJyk7IC8qKlxyXG4gKiBNb2R1bGUgZXhwb3J0cy5cclxuICovbW9kdWxlLmV4cG9ydHMgPSB1cmw7IC8qKlxyXG4gKiBVUkwgcGFyc2VyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBBbiBvYmplY3QgbWVhbnQgdG8gbWltaWMgd2luZG93LmxvY2F0aW9uLlxyXG4gKiAgICAgICAgICAgICAgICAgRGVmYXVsdHMgdG8gd2luZG93LmxvY2F0aW9uLlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiB1cmwodXJpLGxvYyl7dmFyIG9iaj11cmk7IC8vIGRlZmF1bHQgdG8gd2luZG93LmxvY2F0aW9uXG52YXIgbG9jPWxvYyB8fCBnbG9iYWwubG9jYXRpb247aWYobnVsbCA9PSB1cmkpdXJpID0gbG9jLnByb3RvY29sICsgJy8vJyArIGxvYy5ob3N0OyAvLyByZWxhdGl2ZSBwYXRoIHN1cHBvcnRcbmlmKCdzdHJpbmcnID09IHR5cGVvZiB1cmkpe2lmKCcvJyA9PSB1cmkuY2hhckF0KDApKXtpZignLycgPT0gdXJpLmNoYXJBdCgxKSl7dXJpID0gbG9jLnByb3RvY29sICsgdXJpO31lbHNlIHt1cmkgPSBsb2MuaG9zdCArIHVyaTt9fWlmKCEvXihodHRwcz98d3NzPyk6XFwvXFwvLy50ZXN0KHVyaSkpe2RlYnVnKCdwcm90b2NvbC1sZXNzIHVybCAlcycsdXJpKTtpZigndW5kZWZpbmVkJyAhPSB0eXBlb2YgbG9jKXt1cmkgPSBsb2MucHJvdG9jb2wgKyAnLy8nICsgdXJpO31lbHNlIHt1cmkgPSAnaHR0cHM6Ly8nICsgdXJpO319IC8vIHBhcnNlXG5kZWJ1ZygncGFyc2UgJXMnLHVyaSk7b2JqID0gcGFyc2V1cmkodXJpKTt9IC8vIG1ha2Ugc3VyZSB3ZSB0cmVhdCBgbG9jYWxob3N0OjgwYCBhbmQgYGxvY2FsaG9zdGAgZXF1YWxseVxuaWYoIW9iai5wb3J0KXtpZigvXihodHRwfHdzKSQvLnRlc3Qob2JqLnByb3RvY29sKSl7b2JqLnBvcnQgPSAnODAnO31lbHNlIGlmKC9eKGh0dHB8d3MpcyQvLnRlc3Qob2JqLnByb3RvY29sKSl7b2JqLnBvcnQgPSAnNDQzJzt9fW9iai5wYXRoID0gb2JqLnBhdGggfHwgJy8nO3ZhciBpcHY2PW9iai5ob3N0LmluZGV4T2YoJzonKSAhPT0gLTE7dmFyIGhvc3Q9aXB2Nj8nWycgKyBvYmouaG9zdCArICddJzpvYmouaG9zdDsgLy8gZGVmaW5lIHVuaXF1ZSBpZFxub2JqLmlkID0gb2JqLnByb3RvY29sICsgJzovLycgKyBob3N0ICsgJzonICsgb2JqLnBvcnQ7IC8vIGRlZmluZSBocmVmXG5vYmouaHJlZiA9IG9iai5wcm90b2NvbCArICc6Ly8nICsgaG9zdCArIChsb2MgJiYgbG9jLnBvcnQgPT0gb2JqLnBvcnQ/Jyc6JzonICsgb2JqLnBvcnQpO3JldHVybiBvYmo7fX0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIj9zZWxmOnR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI/d2luZG93OnR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCI/Z2xvYmFsOnt9KTt9LHtcImRlYnVnXCI6MzksXCJwYXJzZXVyaVwiOjQ1fV0sMzY6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogRXhwb3NlIGBCYWNrb2ZmYC5cclxuICovbW9kdWxlLmV4cG9ydHMgPSBCYWNrb2ZmOyAvKipcclxuICogSW5pdGlhbGl6ZSBiYWNrb2ZmIHRpbWVyIHdpdGggYG9wdHNgLlxyXG4gKlxyXG4gKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cclxuICogLSBgbWF4YCBtYXggdGltZW91dCBbMTAwMDBdXHJcbiAqIC0gYGppdHRlcmAgWzBdXHJcbiAqIC0gYGZhY3RvcmAgWzJdXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIEJhY2tvZmYob3B0cyl7b3B0cyA9IG9wdHMgfHwge307dGhpcy5tcyA9IG9wdHMubWluIHx8IDEwMDt0aGlzLm1heCA9IG9wdHMubWF4IHx8IDEwMDAwO3RoaXMuZmFjdG9yID0gb3B0cy5mYWN0b3IgfHwgMjt0aGlzLmppdHRlciA9IG9wdHMuaml0dGVyID4gMCAmJiBvcHRzLmppdHRlciA8PSAxP29wdHMuaml0dGVyOjA7dGhpcy5hdHRlbXB0cyA9IDA7fSAvKipcclxuICogUmV0dXJuIHRoZSBiYWNrb2ZmIGR1cmF0aW9uLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0JhY2tvZmYucHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24oKXt2YXIgbXM9dGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLHRoaXMuYXR0ZW1wdHMrKyk7aWYodGhpcy5qaXR0ZXIpe3ZhciByYW5kPU1hdGgucmFuZG9tKCk7dmFyIGRldmlhdGlvbj1NYXRoLmZsb29yKHJhbmQgKiB0aGlzLmppdHRlciAqIG1zKTttcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwP21zIC0gZGV2aWF0aW9uOm1zICsgZGV2aWF0aW9uO31yZXR1cm4gTWF0aC5taW4obXMsdGhpcy5tYXgpIHwgMDt9OyAvKipcclxuICogUmVzZXQgdGhlIG51bWJlciBvZiBhdHRlbXB0cy5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovQmFja29mZi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe3RoaXMuYXR0ZW1wdHMgPSAwO307IC8qKlxyXG4gKiBTZXQgdGhlIG1pbmltdW0gZHVyYXRpb25cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovQmFja29mZi5wcm90b3R5cGUuc2V0TWluID0gZnVuY3Rpb24obWluKXt0aGlzLm1zID0gbWluO307IC8qKlxyXG4gKiBTZXQgdGhlIG1heGltdW0gZHVyYXRpb25cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovQmFja29mZi5wcm90b3R5cGUuc2V0TWF4ID0gZnVuY3Rpb24obWF4KXt0aGlzLm1heCA9IG1heDt9OyAvKipcclxuICogU2V0IHRoZSBqaXR0ZXJcclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovQmFja29mZi5wcm90b3R5cGUuc2V0Sml0dGVyID0gZnVuY3Rpb24oaml0dGVyKXt0aGlzLmppdHRlciA9IGppdHRlcjt9O30se31dLDM3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsgLyoqXHJcbiAqIFNsaWNlIHJlZmVyZW5jZS5cclxuICovdmFyIHNsaWNlPVtdLnNsaWNlOyAvKipcclxuICogQmluZCBgb2JqYCB0byBgZm5gLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBmbiBvciBzdHJpbmdcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL21vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLGZuKXtpZignc3RyaW5nJyA9PSB0eXBlb2YgZm4pZm4gPSBvYmpbZm5dO2lmKCdmdW5jdGlvbicgIT0gdHlwZW9mIGZuKXRocm93IG5ldyBFcnJvcignYmluZCgpIHJlcXVpcmVzIGEgZnVuY3Rpb24nKTt2YXIgYXJncz1zbGljZS5jYWxsKGFyZ3VtZW50cywyKTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZm4uYXBwbHkob2JqLGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO307fTt9LHt9XSwzODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7IC8qKlxyXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7IC8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZnVuY3Rpb24gRW1pdHRlcihvYmope2lmKG9iailyZXR1cm4gbWl4aW4ob2JqKTt9OyAvKipcclxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBtaXhpbihvYmope2Zvcih2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7b2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO31yZXR1cm4gb2JqO30gLyoqXHJcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9FbWl0dGVyLnByb3RvdHlwZS5vbiA9IEVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCxmbil7dGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9Oyh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSkucHVzaChmbik7cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LGZuKXtmdW5jdGlvbiBvbigpe3RoaXMub2ZmKGV2ZW50LG9uKTtmbi5hcHBseSh0aGlzLGFyZ3VtZW50cyk7fW9uLmZuID0gZm47dGhpcy5vbihldmVudCxvbik7cmV0dXJuIHRoaXM7fTsgLyoqXHJcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovRW1pdHRlci5wcm90b3R5cGUub2ZmID0gRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsZm4pe3RoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTsgLy8gYWxsXG5pZigwID09IGFyZ3VtZW50cy5sZW5ndGgpe3RoaXMuX2NhbGxiYWNrcyA9IHt9O3JldHVybiB0aGlzO30gLy8gc3BlY2lmaWMgZXZlbnRcbnZhciBjYWxsYmFja3M9dGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtpZighY2FsbGJhY2tzKXJldHVybiB0aGlzOyAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG5pZigxID09IGFyZ3VtZW50cy5sZW5ndGgpe2RlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO3JldHVybiB0aGlzO30gLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbnZhciBjYjtmb3IodmFyIGk9MDtpIDwgY2FsbGJhY2tzLmxlbmd0aDtpKyspIHtjYiA9IGNhbGxiYWNrc1tpXTtpZihjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKXtjYWxsYmFja3Muc3BsaWNlKGksMSk7YnJlYWs7fX1yZXR1cm4gdGhpczt9OyAvKipcclxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICovRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXt0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307dmFyIGFyZ3M9W10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSksY2FsbGJhY2tzPXRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07aWYoY2FsbGJhY2tzKXtjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7Zm9yKHZhciBpPTAsbGVuPWNhbGxiYWNrcy5sZW5ndGg7aSA8IGxlbjsrK2kpIHtjYWxsYmFja3NbaV0uYXBwbHkodGhpcyxhcmdzKTt9fXJldHVybiB0aGlzO307IC8qKlxyXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0VtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXt0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307cmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107fTsgLyoqXHJcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0VtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtyZXR1cm4gISF0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO307fSx7fV0sMzk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe2FyZ3VtZW50c1s0XVsxN11bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpO30se1wiLi9kZWJ1Z1wiOjQwLFwiZHVwXCI6MTd9XSw0MDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7YXJndW1lbnRzWzRdWzE4XVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cyk7fSx7XCJkdXBcIjoxOCxcIm1zXCI6NDR9XSw0MTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qXHJcbiAqIE1vZHVsZSByZXF1aXJlbWVudHMuXHJcbiAqL3ZhciBpc0FycmF5PV9kZXJlcV8oJ2lzYXJyYXknKTsgLyoqXHJcbiAqIE1vZHVsZSBleHBvcnRzLlxyXG4gKi9tb2R1bGUuZXhwb3J0cyA9IGhhc0JpbmFyeTsgLyoqXHJcbiAqIENoZWNrcyBmb3IgYmluYXJ5IGRhdGEuXHJcbiAqXHJcbiAqIFJpZ2h0IG5vdyBvbmx5IEJ1ZmZlciBhbmQgQXJyYXlCdWZmZXIgYXJlIHN1cHBvcnRlZC4uXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbnl0aGluZ1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9mdW5jdGlvbiBoYXNCaW5hcnkoZGF0YSl7ZnVuY3Rpb24gX2hhc0JpbmFyeShvYmope2lmKCFvYmopcmV0dXJuIGZhbHNlO2lmKGdsb2JhbC5CdWZmZXIgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgZ2xvYmFsLkFycmF5QnVmZmVyICYmIG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGdsb2JhbC5CbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IgfHwgZ2xvYmFsLkZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSl7cmV0dXJuIHRydWU7fWlmKGlzQXJyYXkob2JqKSl7Zm9yKHZhciBpPTA7aSA8IG9iai5sZW5ndGg7aSsrKSB7aWYoX2hhc0JpbmFyeShvYmpbaV0pKXtyZXR1cm4gdHJ1ZTt9fX1lbHNlIGlmKG9iaiAmJiAnb2JqZWN0JyA9PSB0eXBlb2Ygb2JqKXsgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9oYXMtYmluYXJ5L3B1bGwvNFxuaWYob2JqLnRvSlNPTiAmJiAnZnVuY3Rpb24nID09IHR5cGVvZiBvYmoudG9KU09OKXtvYmogPSBvYmoudG9KU09OKCk7fWZvcih2YXIga2V5IGluIG9iaikge2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosa2V5KSAmJiBfaGFzQmluYXJ5KG9ialtrZXldKSl7cmV0dXJuIHRydWU7fX19cmV0dXJuIGZhbHNlO31yZXR1cm4gX2hhc0JpbmFyeShkYXRhKTt9fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se1wiaXNhcnJheVwiOjQzfV0sNDI6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe2FyZ3VtZW50c1s0XVsyM11bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpO30se1wiZHVwXCI6MjN9XSw0MzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7YXJndW1lbnRzWzRdWzI0XVswXS5hcHBseShleHBvcnRzLGFyZ3VtZW50cyk7fSx7XCJkdXBcIjoyNH1dLDQ0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXthcmd1bWVudHNbNF1bMjVdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKTt9LHtcImR1cFwiOjI1fV0sNDU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe2FyZ3VtZW50c1s0XVsyOF1bMF0uYXBwbHkoZXhwb3J0cyxhcmd1bWVudHMpO30se1wiZHVwXCI6Mjh9XSw0NjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7KGZ1bmN0aW9uKGdsb2JhbCl7IC8qZ2xvYmFsIEJsb2IsRmlsZSovIC8qKlxyXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzXHJcbiAqL3ZhciBpc0FycmF5PV9kZXJlcV8oJ2lzYXJyYXknKTt2YXIgaXNCdWY9X2RlcmVxXygnLi9pcy1idWZmZXInKTsgLyoqXHJcbiAqIFJlcGxhY2VzIGV2ZXJ5IEJ1ZmZlciB8IEFycmF5QnVmZmVyIGluIHBhY2tldCB3aXRoIGEgbnVtYmVyZWQgcGxhY2Vob2xkZXIuXHJcbiAqIEFueXRoaW5nIHdpdGggYmxvYnMgb3IgZmlsZXMgc2hvdWxkIGJlIGZlZCB0aHJvdWdoIHJlbW92ZUJsb2JzIGJlZm9yZSBjb21pbmdcclxuICogaGVyZS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcclxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGRlY29uc3RydWN0ZWQgcGFja2V0IGFuZCBsaXN0IG9mIGJ1ZmZlcnNcclxuICogQGFwaSBwdWJsaWNcclxuICovZXhwb3J0cy5kZWNvbnN0cnVjdFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCl7dmFyIGJ1ZmZlcnM9W107dmFyIHBhY2tldERhdGE9cGFja2V0LmRhdGE7ZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEpe2lmKCFkYXRhKXJldHVybiBkYXRhO2lmKGlzQnVmKGRhdGEpKXt2YXIgcGxhY2Vob2xkZXI9e19wbGFjZWhvbGRlcjp0cnVlLG51bTpidWZmZXJzLmxlbmd0aH07YnVmZmVycy5wdXNoKGRhdGEpO3JldHVybiBwbGFjZWhvbGRlcjt9ZWxzZSBpZihpc0FycmF5KGRhdGEpKXt2YXIgbmV3RGF0YT1uZXcgQXJyYXkoZGF0YS5sZW5ndGgpO2Zvcih2YXIgaT0wO2kgPCBkYXRhLmxlbmd0aDtpKyspIHtuZXdEYXRhW2ldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFbaV0pO31yZXR1cm4gbmV3RGF0YTt9ZWxzZSBpZignb2JqZWN0JyA9PSB0eXBlb2YgZGF0YSAmJiAhKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSl7dmFyIG5ld0RhdGE9e307Zm9yKHZhciBrZXkgaW4gZGF0YSkge25ld0RhdGFba2V5XSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0pO31yZXR1cm4gbmV3RGF0YTt9cmV0dXJuIGRhdGE7fXZhciBwYWNrPXBhY2tldDtwYWNrLmRhdGEgPSBfZGVjb25zdHJ1Y3RQYWNrZXQocGFja2V0RGF0YSk7cGFjay5hdHRhY2htZW50cyA9IGJ1ZmZlcnMubGVuZ3RoOyAvLyBudW1iZXIgb2YgYmluYXJ5ICdhdHRhY2htZW50cydcbnJldHVybiB7cGFja2V0OnBhY2ssYnVmZmVyczpidWZmZXJzfTt9OyAvKipcclxuICogUmVjb25zdHJ1Y3RzIGEgYmluYXJ5IHBhY2tldCBmcm9tIGl0cyBwbGFjZWhvbGRlciBwYWNrZXQgYW5kIGJ1ZmZlcnNcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xyXG4gKiBAcGFyYW0ge0FycmF5fSBidWZmZXJzIC0gYmluYXJ5IGJ1ZmZlcnMgdG8gcHV0IGluIHBsYWNlaG9sZGVyIHBvc2l0aW9uc1xyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlY29uc3RydWN0ZWQgcGFja2V0XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMucmVjb25zdHJ1Y3RQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQsYnVmZmVycyl7dmFyIGN1clBsYWNlSG9sZGVyPTA7ZnVuY3Rpb24gX3JlY29uc3RydWN0UGFja2V0KGRhdGEpe2lmKGRhdGEgJiYgZGF0YS5fcGxhY2Vob2xkZXIpe3ZhciBidWY9YnVmZmVyc1tkYXRhLm51bV07IC8vIGFwcHJvcHJpYXRlIGJ1ZmZlciAoc2hvdWxkIGJlIG5hdHVyYWwgb3JkZXIgYW55d2F5KVxucmV0dXJuIGJ1Zjt9ZWxzZSBpZihpc0FycmF5KGRhdGEpKXtmb3IodmFyIGk9MDtpIDwgZGF0YS5sZW5ndGg7aSsrKSB7ZGF0YVtpXSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldKTt9cmV0dXJuIGRhdGE7fWVsc2UgaWYoZGF0YSAmJiAnb2JqZWN0JyA9PSB0eXBlb2YgZGF0YSl7Zm9yKHZhciBrZXkgaW4gZGF0YSkge2RhdGFba2V5XSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0pO31yZXR1cm4gZGF0YTt9cmV0dXJuIGRhdGE7fXBhY2tldC5kYXRhID0gX3JlY29uc3RydWN0UGFja2V0KHBhY2tldC5kYXRhKTtwYWNrZXQuYXR0YWNobWVudHMgPSB1bmRlZmluZWQ7IC8vIG5vIGxvbmdlciB1c2VmdWxcbnJldHVybiBwYWNrZXQ7fTsgLyoqXHJcbiAqIEFzeW5jaHJvbm91c2x5IHJlbW92ZXMgQmxvYnMgb3IgRmlsZXMgZnJvbSBkYXRhIHZpYVxyXG4gKiBGaWxlUmVhZGVyJ3MgcmVhZEFzQXJyYXlCdWZmZXIgbWV0aG9kLiBVc2VkIGJlZm9yZSBlbmNvZGluZ1xyXG4gKiBkYXRhIGFzIG1zZ3BhY2suIENhbGxzIGNhbGxiYWNrIHdpdGggdGhlIGJsb2JsZXNzIGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9leHBvcnRzLnJlbW92ZUJsb2JzID0gZnVuY3Rpb24oZGF0YSxjYWxsYmFjayl7ZnVuY3Rpb24gX3JlbW92ZUJsb2JzKG9iaixjdXJLZXksY29udGFpbmluZ09iamVjdCl7aWYoIW9iailyZXR1cm4gb2JqOyAvLyBjb252ZXJ0IGFueSBibG9iXG5pZihnbG9iYWwuQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iIHx8IGdsb2JhbC5GaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpe3BlbmRpbmdCbG9icysrOyAvLyBhc3luYyBmaWxlcmVhZGVyXG52YXIgZmlsZVJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO2ZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKXsgLy8gdGhpcy5yZXN1bHQgPT0gYXJyYXlidWZmZXJcbmlmKGNvbnRhaW5pbmdPYmplY3Qpe2NvbnRhaW5pbmdPYmplY3RbY3VyS2V5XSA9IHRoaXMucmVzdWx0O31lbHNlIHtibG9ibGVzc0RhdGEgPSB0aGlzLnJlc3VsdDt9IC8vIGlmIG5vdGhpbmcgcGVuZGluZyBpdHMgY2FsbGJhY2sgdGltZVxuaWYoISAtLXBlbmRpbmdCbG9icyl7Y2FsbGJhY2soYmxvYmxlc3NEYXRhKTt9fTtmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKG9iaik7IC8vIGJsb2IgLT4gYXJyYXlidWZmZXJcbn1lbHNlIGlmKGlzQXJyYXkob2JqKSl7IC8vIGhhbmRsZSBhcnJheVxuZm9yKHZhciBpPTA7aSA8IG9iai5sZW5ndGg7aSsrKSB7X3JlbW92ZUJsb2JzKG9ialtpXSxpLG9iaik7fX1lbHNlIGlmKG9iaiAmJiAnb2JqZWN0JyA9PSB0eXBlb2Ygb2JqICYmICFpc0J1ZihvYmopKXsgLy8gYW5kIG9iamVjdFxuZm9yKHZhciBrZXkgaW4gb2JqKSB7X3JlbW92ZUJsb2JzKG9ialtrZXldLGtleSxvYmopO319fXZhciBwZW5kaW5nQmxvYnM9MDt2YXIgYmxvYmxlc3NEYXRhPWRhdGE7X3JlbW92ZUJsb2JzKGJsb2JsZXNzRGF0YSk7aWYoIXBlbmRpbmdCbG9icyl7Y2FsbGJhY2soYmxvYmxlc3NEYXRhKTt9fTt9KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7XCIuL2lzLWJ1ZmZlclwiOjQ4LFwiaXNhcnJheVwiOjQzfV0sNDc6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyAvKipcclxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICovdmFyIGRlYnVnPV9kZXJlcV8oJ2RlYnVnJykoJ3NvY2tldC5pby1wYXJzZXInKTt2YXIganNvbj1fZGVyZXFfKCdqc29uMycpO3ZhciBpc0FycmF5PV9kZXJlcV8oJ2lzYXJyYXknKTt2YXIgRW1pdHRlcj1fZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpO3ZhciBiaW5hcnk9X2RlcmVxXygnLi9iaW5hcnknKTt2YXIgaXNCdWY9X2RlcmVxXygnLi9pcy1idWZmZXInKTsgLyoqXHJcbiAqIFByb3RvY29sIHZlcnNpb24uXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMucHJvdG9jb2wgPSA0OyAvKipcclxuICogUGFja2V0IHR5cGVzLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLnR5cGVzID0gWydDT05ORUNUJywnRElTQ09OTkVDVCcsJ0VWRU5UJywnQklOQVJZX0VWRU5UJywnQUNLJywnQklOQVJZX0FDSycsJ0VSUk9SJ107IC8qKlxyXG4gKiBQYWNrZXQgdHlwZSBgY29ubmVjdGAuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMuQ09OTkVDVCA9IDA7IC8qKlxyXG4gKiBQYWNrZXQgdHlwZSBgZGlzY29ubmVjdGAuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMuRElTQ09OTkVDVCA9IDE7IC8qKlxyXG4gKiBQYWNrZXQgdHlwZSBgZXZlbnRgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLkVWRU5UID0gMjsgLyoqXHJcbiAqIFBhY2tldCB0eXBlIGBhY2tgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLkFDSyA9IDM7IC8qKlxyXG4gKiBQYWNrZXQgdHlwZSBgZXJyb3JgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLkVSUk9SID0gNDsgLyoqXHJcbiAqIFBhY2tldCB0eXBlICdiaW5hcnkgZXZlbnQnXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMuQklOQVJZX0VWRU5UID0gNTsgLyoqXHJcbiAqIFBhY2tldCB0eXBlIGBiaW5hcnkgYWNrYC4gRm9yIGFja3Mgd2l0aCBiaW5hcnkgYXJndW1lbnRzLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9leHBvcnRzLkJJTkFSWV9BQ0sgPSA2OyAvKipcclxuICogRW5jb2RlciBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovZXhwb3J0cy5FbmNvZGVyID0gRW5jb2RlcjsgLyoqXHJcbiAqIERlY29kZXIgY29uc3RydWN0b3IuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2V4cG9ydHMuRGVjb2RlciA9IERlY29kZXI7IC8qKlxyXG4gKiBBIHNvY2tldC5pbyBFbmNvZGVyIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIEVuY29kZXIoKXt9IC8qKlxyXG4gKiBFbmNvZGUgYSBwYWNrZXQgYXMgYSBzaW5nbGUgc3RyaW5nIGlmIG5vbi1iaW5hcnksIG9yIGFzIGFcclxuICogYnVmZmVyIHNlcXVlbmNlLCBkZXBlbmRpbmcgb24gcGFja2V0IHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBwYWNrZXQgb2JqZWN0XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gaGFuZGxlIGVuY29kaW5ncyAobGlrZWx5IGVuZ2luZS53cml0ZSlcclxuICogQHJldHVybiBDYWxscyBjYWxsYmFjayB3aXRoIEFycmF5IG9mIGVuY29kaW5nc1xyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9FbmNvZGVyLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbihvYmosY2FsbGJhY2spe2RlYnVnKCdlbmNvZGluZyBwYWNrZXQgJWonLG9iaik7aWYoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09IG9iai50eXBlKXtlbmNvZGVBc0JpbmFyeShvYmosY2FsbGJhY2spO31lbHNlIHt2YXIgZW5jb2Rpbmc9ZW5jb2RlQXNTdHJpbmcob2JqKTtjYWxsYmFjayhbZW5jb2RpbmddKTt9fTsgLyoqXHJcbiAqIEVuY29kZSBwYWNrZXQgYXMgc3RyaW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAqIEByZXR1cm4ge1N0cmluZ30gZW5jb2RlZFxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovZnVuY3Rpb24gZW5jb2RlQXNTdHJpbmcob2JqKXt2YXIgc3RyPScnO3ZhciBuc3A9ZmFsc2U7IC8vIGZpcnN0IGlzIHR5cGVcbnN0ciArPSBvYmoudHlwZTsgLy8gYXR0YWNobWVudHMgaWYgd2UgaGF2ZSB0aGVtXG5pZihleHBvcnRzLkJJTkFSWV9FVkVOVCA9PSBvYmoudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT0gb2JqLnR5cGUpe3N0ciArPSBvYmouYXR0YWNobWVudHM7c3RyICs9ICctJzt9IC8vIGlmIHdlIGhhdmUgYSBuYW1lc3BhY2Ugb3RoZXIgdGhhbiBgL2Bcbi8vIHdlIGFwcGVuZCBpdCBmb2xsb3dlZCBieSBhIGNvbW1hIGAsYFxuaWYob2JqLm5zcCAmJiAnLycgIT0gb2JqLm5zcCl7bnNwID0gdHJ1ZTtzdHIgKz0gb2JqLm5zcDt9IC8vIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IHRoZSBpZFxuaWYobnVsbCAhPSBvYmouaWQpe2lmKG5zcCl7c3RyICs9ICcsJztuc3AgPSBmYWxzZTt9c3RyICs9IG9iai5pZDt9IC8vIGpzb24gZGF0YVxuaWYobnVsbCAhPSBvYmouZGF0YSl7aWYobnNwKXN0ciArPSAnLCc7c3RyICs9IGpzb24uc3RyaW5naWZ5KG9iai5kYXRhKTt9ZGVidWcoJ2VuY29kZWQgJWogYXMgJXMnLG9iaixzdHIpO3JldHVybiBzdHI7fSAvKipcclxuICogRW5jb2RlIHBhY2tldCBhcyAnYnVmZmVyIHNlcXVlbmNlJyBieSByZW1vdmluZyBibG9icywgYW5kXHJcbiAqIGRlY29uc3RydWN0aW5nIHBhY2tldCBpbnRvIG9iamVjdCB3aXRoIHBsYWNlaG9sZGVycyBhbmRcclxuICogYSBsaXN0IG9mIGJ1ZmZlcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcclxuICogQHJldHVybiB7QnVmZmVyfSBlbmNvZGVkXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBlbmNvZGVBc0JpbmFyeShvYmosY2FsbGJhY2spe2Z1bmN0aW9uIHdyaXRlRW5jb2RpbmcoYmxvYmxlc3NEYXRhKXt2YXIgZGVjb25zdHJ1Y3Rpb249YmluYXJ5LmRlY29uc3RydWN0UGFja2V0KGJsb2JsZXNzRGF0YSk7dmFyIHBhY2s9ZW5jb2RlQXNTdHJpbmcoZGVjb25zdHJ1Y3Rpb24ucGFja2V0KTt2YXIgYnVmZmVycz1kZWNvbnN0cnVjdGlvbi5idWZmZXJzO2J1ZmZlcnMudW5zaGlmdChwYWNrKTsgLy8gYWRkIHBhY2tldCBpbmZvIHRvIGJlZ2lubmluZyBvZiBkYXRhIGxpc3RcbmNhbGxiYWNrKGJ1ZmZlcnMpOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbn1iaW5hcnkucmVtb3ZlQmxvYnMob2JqLHdyaXRlRW5jb2RpbmcpO30gLyoqXHJcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSBkZWNvZGVyXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL2Z1bmN0aW9uIERlY29kZXIoKXt0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO30gLyoqXHJcbiAqIE1peCBpbiBgRW1pdHRlcmAgd2l0aCBEZWNvZGVyLlxyXG4gKi9FbWl0dGVyKERlY29kZXIucHJvdG90eXBlKTsgLyoqXHJcbiAqIERlY29kZXMgYW4gZWNvZGVkIHBhY2tldCBzdHJpbmcgaW50byBwYWNrZXQgSlNPTi5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IG9iaiAtIGVuY29kZWQgcGFja2V0XHJcbiAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0RlY29kZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKG9iail7dmFyIHBhY2tldDtpZignc3RyaW5nJyA9PSB0eXBlb2Ygb2JqKXtwYWNrZXQgPSBkZWNvZGVTdHJpbmcob2JqKTtpZihleHBvcnRzLkJJTkFSWV9FVkVOVCA9PSBwYWNrZXQudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT0gcGFja2V0LnR5cGUpeyAvLyBiaW5hcnkgcGFja2V0J3MganNvblxudGhpcy5yZWNvbnN0cnVjdG9yID0gbmV3IEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KTsgLy8gbm8gYXR0YWNobWVudHMsIGxhYmVsZWQgYmluYXJ5IGJ1dCBubyBiaW5hcnkgZGF0YSB0byBmb2xsb3dcbmlmKHRoaXMucmVjb25zdHJ1Y3Rvci5yZWNvblBhY2suYXR0YWNobWVudHMgPT09IDApe3RoaXMuZW1pdCgnZGVjb2RlZCcscGFja2V0KTt9fWVsc2UgeyAvLyBub24tYmluYXJ5IGZ1bGwgcGFja2V0XG50aGlzLmVtaXQoJ2RlY29kZWQnLHBhY2tldCk7fX1lbHNlIGlmKGlzQnVmKG9iaikgfHwgb2JqLmJhc2U2NCl7IC8vIHJhdyBiaW5hcnkgZGF0YVxuaWYoIXRoaXMucmVjb25zdHJ1Y3Rvcil7dGhyb3cgbmV3IEVycm9yKCdnb3QgYmluYXJ5IGRhdGEgd2hlbiBub3QgcmVjb25zdHJ1Y3RpbmcgYSBwYWNrZXQnKTt9ZWxzZSB7cGFja2V0ID0gdGhpcy5yZWNvbnN0cnVjdG9yLnRha2VCaW5hcnlEYXRhKG9iaik7aWYocGFja2V0KXsgLy8gcmVjZWl2ZWQgZmluYWwgYnVmZmVyXG50aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO3RoaXMuZW1pdCgnZGVjb2RlZCcscGFja2V0KTt9fX1lbHNlIHt0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZTogJyArIG9iaik7fX07IC8qKlxyXG4gKiBEZWNvZGUgYSBwYWNrZXQgU3RyaW5nIChKU09OIGRhdGEpXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2Z1bmN0aW9uIGRlY29kZVN0cmluZyhzdHIpe3ZhciBwPXt9O3ZhciBpPTA7IC8vIGxvb2sgdXAgdHlwZVxucC50eXBlID0gTnVtYmVyKHN0ci5jaGFyQXQoMCkpO2lmKG51bGwgPT0gZXhwb3J0cy50eXBlc1twLnR5cGVdKXJldHVybiBlcnJvcigpOyAvLyBsb29rIHVwIGF0dGFjaG1lbnRzIGlmIHR5cGUgYmluYXJ5XG5pZihleHBvcnRzLkJJTkFSWV9FVkVOVCA9PSBwLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09IHAudHlwZSl7dmFyIGJ1Zj0nJzt3aGlsZShzdHIuY2hhckF0KCsraSkgIT0gJy0nKSB7YnVmICs9IHN0ci5jaGFyQXQoaSk7aWYoaSA9PSBzdHIubGVuZ3RoKWJyZWFrO31pZihidWYgIT0gTnVtYmVyKGJ1ZikgfHwgc3RyLmNoYXJBdChpKSAhPSAnLScpe3Rocm93IG5ldyBFcnJvcignSWxsZWdhbCBhdHRhY2htZW50cycpO31wLmF0dGFjaG1lbnRzID0gTnVtYmVyKGJ1Zik7fSAvLyBsb29rIHVwIG5hbWVzcGFjZSAoaWYgYW55KVxuaWYoJy8nID09IHN0ci5jaGFyQXQoaSArIDEpKXtwLm5zcCA9ICcnO3doaWxlKCsraSkge3ZhciBjPXN0ci5jaGFyQXQoaSk7aWYoJywnID09IGMpYnJlYWs7cC5uc3AgKz0gYztpZihpID09IHN0ci5sZW5ndGgpYnJlYWs7fX1lbHNlIHtwLm5zcCA9ICcvJzt9IC8vIGxvb2sgdXAgaWRcbnZhciBuZXh0PXN0ci5jaGFyQXQoaSArIDEpO2lmKCcnICE9PSBuZXh0ICYmIE51bWJlcihuZXh0KSA9PSBuZXh0KXtwLmlkID0gJyc7d2hpbGUoKytpKSB7dmFyIGM9c3RyLmNoYXJBdChpKTtpZihudWxsID09IGMgfHwgTnVtYmVyKGMpICE9IGMpey0taTticmVhazt9cC5pZCArPSBzdHIuY2hhckF0KGkpO2lmKGkgPT0gc3RyLmxlbmd0aClicmVhazt9cC5pZCA9IE51bWJlcihwLmlkKTt9IC8vIGxvb2sgdXAganNvbiBkYXRhXG5pZihzdHIuY2hhckF0KCsraSkpe3RyeXtwLmRhdGEgPSBqc29uLnBhcnNlKHN0ci5zdWJzdHIoaSkpO31jYXRjaChlKSB7cmV0dXJuIGVycm9yKCk7fX1kZWJ1ZygnZGVjb2RlZCAlcyBhcyAlaicsc3RyLHApO3JldHVybiBwO30gLyoqXHJcbiAqIERlYWxsb2NhdGVzIGEgcGFyc2VyJ3MgcmVzb3VyY2VzXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL0RlY29kZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpe2lmKHRoaXMucmVjb25zdHJ1Y3Rvcil7dGhpcy5yZWNvbnN0cnVjdG9yLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTt9fTsgLyoqXHJcbiAqIEEgbWFuYWdlciBvZiBhIGJpbmFyeSBldmVudCdzICdidWZmZXIgc2VxdWVuY2UnLiBTaG91bGRcclxuICogYmUgY29uc3RydWN0ZWQgd2hlbmV2ZXIgYSBwYWNrZXQgb2YgdHlwZSBCSU5BUllfRVZFTlQgaXNcclxuICogZGVjb2RlZC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxyXG4gKiBAcmV0dXJuIHtCaW5hcnlSZWNvbnN0cnVjdG9yfSBpbml0aWFsaXplZCByZWNvbnN0cnVjdG9yXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9mdW5jdGlvbiBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCl7dGhpcy5yZWNvblBhY2sgPSBwYWNrZXQ7dGhpcy5idWZmZXJzID0gW107fSAvKipcclxuICogTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIGJpbmFyeSBkYXRhIHJlY2VpdmVkIGZyb20gY29ubmVjdGlvblxyXG4gKiBhZnRlciBhIEJJTkFSWV9FVkVOVCBwYWNrZXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7QnVmZmVyIHwgQXJyYXlCdWZmZXJ9IGJpbkRhdGEgLSB0aGUgcmF3IGJpbmFyeSBkYXRhIHJlY2VpdmVkXHJcbiAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IHJldHVybnMgbnVsbCBpZiBtb3JlIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkIG9yXHJcbiAqICAgYSByZWNvbnN0cnVjdGVkIHBhY2tldCBvYmplY3QgaWYgYWxsIGJ1ZmZlcnMgaGF2ZSBiZWVuIHJlY2VpdmVkLlxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUudGFrZUJpbmFyeURhdGEgPSBmdW5jdGlvbihiaW5EYXRhKXt0aGlzLmJ1ZmZlcnMucHVzaChiaW5EYXRhKTtpZih0aGlzLmJ1ZmZlcnMubGVuZ3RoID09IHRoaXMucmVjb25QYWNrLmF0dGFjaG1lbnRzKXsgLy8gZG9uZSB3aXRoIGJ1ZmZlciBsaXN0XG52YXIgcGFja2V0PWJpbmFyeS5yZWNvbnN0cnVjdFBhY2tldCh0aGlzLnJlY29uUGFjayx0aGlzLmJ1ZmZlcnMpO3RoaXMuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO3JldHVybiBwYWNrZXQ7fXJldHVybiBudWxsO307IC8qKlxyXG4gKiBDbGVhbnMgdXAgYmluYXJ5IHBhY2tldCByZWNvbnN0cnVjdGlvbiB2YXJpYWJsZXMuXHJcbiAqXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9CaW5hcnlSZWNvbnN0cnVjdG9yLnByb3RvdHlwZS5maW5pc2hlZFJlY29uc3RydWN0aW9uID0gZnVuY3Rpb24oKXt0aGlzLnJlY29uUGFjayA9IG51bGw7dGhpcy5idWZmZXJzID0gW107fTtmdW5jdGlvbiBlcnJvcihkYXRhKXtyZXR1cm4ge3R5cGU6ZXhwb3J0cy5FUlJPUixkYXRhOidwYXJzZXIgZXJyb3InfTt9fSx7XCIuL2JpbmFyeVwiOjQ2LFwiLi9pcy1idWZmZXJcIjo0OCxcImNvbXBvbmVudC1lbWl0dGVyXCI6NDksXCJkZWJ1Z1wiOjM5LFwiaXNhcnJheVwiOjQzLFwianNvbjNcIjo1MH1dLDQ4OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXsoZnVuY3Rpb24oZ2xvYmFsKXttb2R1bGUuZXhwb3J0cyA9IGlzQnVmOyAvKipcclxuICogUmV0dXJucyB0cnVlIGlmIG9iaiBpcyBhIGJ1ZmZlciBvciBhbiBhcnJheWJ1ZmZlci5cclxuICpcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL2Z1bmN0aW9uIGlzQnVmKG9iail7cmV0dXJuIGdsb2JhbC5CdWZmZXIgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihvYmopIHx8IGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjt9fSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiP3NlbGY6dHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIj93aW5kb3c6dHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIj9nbG9iYWw6e30pO30se31dLDQ5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXthcmd1bWVudHNbNF1bMTVdWzBdLmFwcGx5KGV4cG9ydHMsYXJndW1lbnRzKTt9LHtcImR1cFwiOjE1fV0sNTA6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpeyhmdW5jdGlvbihnbG9iYWwpeyAvKiEgSlNPTiB2My4zLjIgfCBodHRwOi8vYmVzdGllanMuZ2l0aHViLmlvL2pzb24zIHwgQ29weXJpZ2h0IDIwMTItMjAxNCwgS2l0IENhbWJyaWRnZSB8IGh0dHA6Ly9raXQubWl0LWxpY2Vuc2Uub3JnICovOyhmdW5jdGlvbigpeyAvLyBEZXRlY3QgdGhlIGBkZWZpbmVgIGZ1bmN0aW9uIGV4cG9zZWQgYnkgYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzLiBUaGVcbi8vIHN0cmljdCBgZGVmaW5lYCBjaGVjayBpcyBuZWNlc3NhcnkgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBgci5qc2AuXG52YXIgaXNMb2FkZXI9dHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQ7IC8vIEEgc2V0IG9mIHR5cGVzIHVzZWQgdG8gZGlzdGluZ3Vpc2ggb2JqZWN0cyBmcm9tIHByaW1pdGl2ZXMuXG52YXIgb2JqZWN0VHlwZXM9e1wiZnVuY3Rpb25cIjp0cnVlLFwib2JqZWN0XCI6dHJ1ZX07IC8vIERldGVjdCB0aGUgYGV4cG9ydHNgIG9iamVjdCBleHBvc2VkIGJ5IENvbW1vbkpTIGltcGxlbWVudGF0aW9ucy5cbnZhciBmcmVlRXhwb3J0cz1vYmplY3RUeXBlc1t0eXBlb2YgZXhwb3J0c10gJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzOyAvLyBVc2UgdGhlIGBnbG9iYWxgIG9iamVjdCBleHBvc2VkIGJ5IE5vZGUgKGluY2x1ZGluZyBCcm93c2VyaWZ5IHZpYVxuLy8gYGluc2VydC1tb2R1bGUtZ2xvYmFsc2ApLCBOYXJ3aGFsLCBhbmQgUmluZ28gYXMgdGhlIGRlZmF1bHQgY29udGV4dCxcbi8vIGFuZCB0aGUgYHdpbmRvd2Agb2JqZWN0IGluIGJyb3dzZXJzLiBSaGlubyBleHBvcnRzIGEgYGdsb2JhbGAgZnVuY3Rpb25cbi8vIGluc3RlYWQuXG52YXIgcm9vdD1vYmplY3RUeXBlc1t0eXBlb2Ygd2luZG93XSAmJiB3aW5kb3cgfHwgdGhpcyxmcmVlR2xvYmFsPWZyZWVFeHBvcnRzICYmIG9iamVjdFR5cGVzW3R5cGVvZiBtb2R1bGVdICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIHR5cGVvZiBnbG9iYWwgPT0gXCJvYmplY3RcIiAmJiBnbG9iYWw7aWYoZnJlZUdsb2JhbCAmJiAoZnJlZUdsb2JhbFtcImdsb2JhbFwiXSA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsW1wid2luZG93XCJdID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWxbXCJzZWxmXCJdID09PSBmcmVlR2xvYmFsKSl7cm9vdCA9IGZyZWVHbG9iYWw7fSAvLyBQdWJsaWM6IEluaXRpYWxpemVzIEpTT04gMyB1c2luZyB0aGUgZ2l2ZW4gYGNvbnRleHRgIG9iamVjdCwgYXR0YWNoaW5nIHRoZVxuLy8gYHN0cmluZ2lmeWAgYW5kIGBwYXJzZWAgZnVuY3Rpb25zIHRvIHRoZSBzcGVjaWZpZWQgYGV4cG9ydHNgIG9iamVjdC5cbmZ1bmN0aW9uIHJ1bkluQ29udGV4dChjb250ZXh0LGV4cG9ydHMpe2NvbnRleHQgfHwgKGNvbnRleHQgPSByb290W1wiT2JqZWN0XCJdKCkpO2V4cG9ydHMgfHwgKGV4cG9ydHMgPSByb290W1wiT2JqZWN0XCJdKCkpOyAvLyBOYXRpdmUgY29uc3RydWN0b3IgYWxpYXNlcy5cbnZhciBOdW1iZXI9Y29udGV4dFtcIk51bWJlclwiXSB8fCByb290W1wiTnVtYmVyXCJdLFN0cmluZz1jb250ZXh0W1wiU3RyaW5nXCJdIHx8IHJvb3RbXCJTdHJpbmdcIl0sT2JqZWN0PWNvbnRleHRbXCJPYmplY3RcIl0gfHwgcm9vdFtcIk9iamVjdFwiXSxEYXRlPWNvbnRleHRbXCJEYXRlXCJdIHx8IHJvb3RbXCJEYXRlXCJdLFN5bnRheEVycm9yPWNvbnRleHRbXCJTeW50YXhFcnJvclwiXSB8fCByb290W1wiU3ludGF4RXJyb3JcIl0sVHlwZUVycm9yPWNvbnRleHRbXCJUeXBlRXJyb3JcIl0gfHwgcm9vdFtcIlR5cGVFcnJvclwiXSxNYXRoPWNvbnRleHRbXCJNYXRoXCJdIHx8IHJvb3RbXCJNYXRoXCJdLG5hdGl2ZUpTT049Y29udGV4dFtcIkpTT05cIl0gfHwgcm9vdFtcIkpTT05cIl07IC8vIERlbGVnYXRlIHRvIHRoZSBuYXRpdmUgYHN0cmluZ2lmeWAgYW5kIGBwYXJzZWAgaW1wbGVtZW50YXRpb25zLlxuaWYodHlwZW9mIG5hdGl2ZUpTT04gPT0gXCJvYmplY3RcIiAmJiBuYXRpdmVKU09OKXtleHBvcnRzLnN0cmluZ2lmeSA9IG5hdGl2ZUpTT04uc3RyaW5naWZ5O2V4cG9ydHMucGFyc2UgPSBuYXRpdmVKU09OLnBhcnNlO30gLy8gQ29udmVuaWVuY2UgYWxpYXNlcy5cbnZhciBvYmplY3RQcm90bz1PYmplY3QucHJvdG90eXBlLGdldENsYXNzPW9iamVjdFByb3RvLnRvU3RyaW5nLGlzUHJvcGVydHksZm9yRWFjaCx1bmRlZjsgLy8gVGVzdCB0aGUgYERhdGUjZ2V0VVRDKmAgbWV0aG9kcy4gQmFzZWQgb24gd29yayBieSBAWWFmZmxlLlxudmFyIGlzRXh0ZW5kZWQ9bmV3IERhdGUoLTM1MDk4MjczMzQ1NzMyOTIpO3RyeXsgLy8gVGhlIGBnZXRVVENGdWxsWWVhcmAsIGBNb250aGAsIGFuZCBgRGF0ZWAgbWV0aG9kcyByZXR1cm4gbm9uc2Vuc2ljYWxcbi8vIHJlc3VsdHMgZm9yIGNlcnRhaW4gZGF0ZXMgaW4gT3BlcmEgPj0gMTAuNTMuXG5pc0V4dGVuZGVkID0gaXNFeHRlbmRlZC5nZXRVVENGdWxsWWVhcigpID09IC0xMDkyNTIgJiYgaXNFeHRlbmRlZC5nZXRVVENNb250aCgpID09PSAwICYmIGlzRXh0ZW5kZWQuZ2V0VVRDRGF0ZSgpID09PSAxICYmICAvLyBTYWZhcmkgPCAyLjAuMiBzdG9yZXMgdGhlIGludGVybmFsIG1pbGxpc2Vjb25kIHRpbWUgdmFsdWUgY29ycmVjdGx5LFxuLy8gYnV0IGNsaXBzIHRoZSB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGRhdGUgbWV0aG9kcyB0byB0aGUgcmFuZ2Ugb2Zcbi8vIHNpZ25lZCAzMi1iaXQgaW50ZWdlcnMgKFstMiAqKiAzMSwgMiAqKiAzMSAtIDFdKS5cbmlzRXh0ZW5kZWQuZ2V0VVRDSG91cnMoKSA9PSAxMCAmJiBpc0V4dGVuZGVkLmdldFVUQ01pbnV0ZXMoKSA9PSAzNyAmJiBpc0V4dGVuZGVkLmdldFVUQ1NlY29uZHMoKSA9PSA2ICYmIGlzRXh0ZW5kZWQuZ2V0VVRDTWlsbGlzZWNvbmRzKCkgPT0gNzA4O31jYXRjaChleGNlcHRpb24pIHt9IC8vIEludGVybmFsOiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG5hdGl2ZSBgSlNPTi5zdHJpbmdpZnlgIGFuZCBgcGFyc2VgXG4vLyBpbXBsZW1lbnRhdGlvbnMgYXJlIHNwZWMtY29tcGxpYW50LiBCYXNlZCBvbiB3b3JrIGJ5IEtlbiBTbnlkZXIuXG5mdW5jdGlvbiBoYXMobmFtZSl7aWYoaGFzW25hbWVdICE9PSB1bmRlZil7IC8vIFJldHVybiBjYWNoZWQgZmVhdHVyZSB0ZXN0IHJlc3VsdC5cbnJldHVybiBoYXNbbmFtZV07fXZhciBpc1N1cHBvcnRlZDtpZihuYW1lID09IFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpeyAvLyBJRSA8PSA3IGRvZXNuJ3Qgc3VwcG9ydCBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgdXNpbmcgc3F1YXJlXG4vLyBicmFja2V0IG5vdGF0aW9uLiBJRSA4IG9ubHkgc3VwcG9ydHMgdGhpcyBmb3IgcHJpbWl0aXZlcy5cbmlzU3VwcG9ydGVkID0gXCJhXCJbMF0gIT0gXCJhXCI7fWVsc2UgaWYobmFtZSA9PSBcImpzb25cIil7IC8vIEluZGljYXRlcyB3aGV0aGVyIGJvdGggYEpTT04uc3RyaW5naWZ5YCBhbmQgYEpTT04ucGFyc2VgIGFyZVxuLy8gc3VwcG9ydGVkLlxuaXNTdXBwb3J0ZWQgPSBoYXMoXCJqc29uLXN0cmluZ2lmeVwiKSAmJiBoYXMoXCJqc29uLXBhcnNlXCIpO31lbHNlIHt2YXIgdmFsdWUsc2VyaWFsaXplZD1cIntcXFwiYVxcXCI6WzEsdHJ1ZSxmYWxzZSxudWxsLFxcXCJcXFxcdTAwMDBcXFxcYlxcXFxuXFxcXGZcXFxcclxcXFx0XFxcIl19XCI7IC8vIFRlc3QgYEpTT04uc3RyaW5naWZ5YC5cbmlmKG5hbWUgPT0gXCJqc29uLXN0cmluZ2lmeVwiKXt2YXIgc3RyaW5naWZ5PWV4cG9ydHMuc3RyaW5naWZ5LHN0cmluZ2lmeVN1cHBvcnRlZD10eXBlb2Ygc3RyaW5naWZ5ID09IFwiZnVuY3Rpb25cIiAmJiBpc0V4dGVuZGVkO2lmKHN0cmluZ2lmeVN1cHBvcnRlZCl7IC8vIEEgdGVzdCBmdW5jdGlvbiBvYmplY3Qgd2l0aCBhIGN1c3RvbSBgdG9KU09OYCBtZXRob2QuXG4odmFsdWUgPSBmdW5jdGlvbigpe3JldHVybiAxO30pLnRvSlNPTiA9IHZhbHVlO3RyeXtzdHJpbmdpZnlTdXBwb3J0ZWQgPSAgLy8gRmlyZWZveCAzLjFiMSBhbmQgYjIgc2VyaWFsaXplIHN0cmluZywgbnVtYmVyLCBhbmQgYm9vbGVhblxuLy8gcHJpbWl0aXZlcyBhcyBvYmplY3QgbGl0ZXJhbHMuXG5zdHJpbmdpZnkoMCkgPT09IFwiMFwiICYmICAvLyBGRiAzLjFiMSwgYjIsIGFuZCBKU09OIDIgc2VyaWFsaXplIHdyYXBwZWQgcHJpbWl0aXZlcyBhcyBvYmplY3Rcbi8vIGxpdGVyYWxzLlxuc3RyaW5naWZ5KG5ldyBOdW1iZXIoKSkgPT09IFwiMFwiICYmIHN0cmluZ2lmeShuZXcgU3RyaW5nKCkpID09ICdcIlwiJyAmJiAgLy8gRkYgMy4xYjEsIDIgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIHZhbHVlIGlzIGBudWxsYCwgYHVuZGVmaW5lZGAsIG9yXG4vLyBkb2VzIG5vdCBkZWZpbmUgYSBjYW5vbmljYWwgSlNPTiByZXByZXNlbnRhdGlvbiAodGhpcyBhcHBsaWVzIHRvXG4vLyBvYmplY3RzIHdpdGggYHRvSlNPTmAgcHJvcGVydGllcyBhcyB3ZWxsLCAqdW5sZXNzKiB0aGV5IGFyZSBuZXN0ZWRcbi8vIHdpdGhpbiBhbiBvYmplY3Qgb3IgYXJyYXkpLlxuc3RyaW5naWZ5KGdldENsYXNzKSA9PT0gdW5kZWYgJiYgIC8vIElFIDggc2VyaWFsaXplcyBgdW5kZWZpbmVkYCBhcyBgXCJ1bmRlZmluZWRcImAuIFNhZmFyaSA8PSA1LjEuNyBhbmRcbi8vIEZGIDMuMWIzIHBhc3MgdGhpcyB0ZXN0Llxuc3RyaW5naWZ5KHVuZGVmKSA9PT0gdW5kZWYgJiYgIC8vIFNhZmFyaSA8PSA1LjEuNyBhbmQgRkYgMy4xYjMgdGhyb3cgYEVycm9yYHMgYW5kIGBUeXBlRXJyb3Jgcyxcbi8vIHJlc3BlY3RpdmVseSwgaWYgdGhlIHZhbHVlIGlzIG9taXR0ZWQgZW50aXJlbHkuXG5zdHJpbmdpZnkoKSA9PT0gdW5kZWYgJiYgIC8vIEZGIDMuMWIxLCAyIHRocm93IGFuIGVycm9yIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBub3QgYSBudW1iZXIsXG4vLyBzdHJpbmcsIGFycmF5LCBvYmplY3QsIEJvb2xlYW4sIG9yIGBudWxsYCBsaXRlcmFsLiBUaGlzIGFwcGxpZXMgdG9cbi8vIG9iamVjdHMgd2l0aCBjdXN0b20gYHRvSlNPTmAgbWV0aG9kcyBhcyB3ZWxsLCB1bmxlc3MgdGhleSBhcmUgbmVzdGVkXG4vLyBpbnNpZGUgb2JqZWN0IG9yIGFycmF5IGxpdGVyYWxzLiBZVUkgMy4wLjBiMSBpZ25vcmVzIGN1c3RvbSBgdG9KU09OYFxuLy8gbWV0aG9kcyBlbnRpcmVseS5cbnN0cmluZ2lmeSh2YWx1ZSkgPT09IFwiMVwiICYmIHN0cmluZ2lmeShbdmFsdWVdKSA9PSBcIlsxXVwiICYmICAvLyBQcm90b3R5cGUgPD0gMS42LjEgc2VyaWFsaXplcyBgW3VuZGVmaW5lZF1gIGFzIGBcIltdXCJgIGluc3RlYWQgb2Zcbi8vIGBcIltudWxsXVwiYC5cbnN0cmluZ2lmeShbdW5kZWZdKSA9PSBcIltudWxsXVwiICYmICAvLyBZVUkgMy4wLjBiMSBmYWlscyB0byBzZXJpYWxpemUgYG51bGxgIGxpdGVyYWxzLlxuc3RyaW5naWZ5KG51bGwpID09IFwibnVsbFwiICYmICAvLyBGRiAzLjFiMSwgMiBoYWx0cyBzZXJpYWxpemF0aW9uIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgZnVuY3Rpb246XG4vLyBgWzEsIHRydWUsIGdldENsYXNzLCAxXWAgc2VyaWFsaXplcyBhcyBcIlsxLHRydWUsXSxcIi4gRkYgMy4xYjNcbi8vIGVsaWRlcyBub24tSlNPTiB2YWx1ZXMgZnJvbSBvYmplY3RzIGFuZCBhcnJheXMsIHVubGVzcyB0aGV5XG4vLyBkZWZpbmUgY3VzdG9tIGB0b0pTT05gIG1ldGhvZHMuXG5zdHJpbmdpZnkoW3VuZGVmLGdldENsYXNzLG51bGxdKSA9PSBcIltudWxsLG51bGwsbnVsbF1cIiAmJiAgLy8gU2ltcGxlIHNlcmlhbGl6YXRpb24gdGVzdC4gRkYgMy4xYjEgdXNlcyBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZXNcbi8vIHdoZXJlIGNoYXJhY3RlciBlc2NhcGUgY29kZXMgYXJlIGV4cGVjdGVkIChlLmcuLCBgXFxiYCA9PiBgXFx1MDAwOGApLlxuc3RyaW5naWZ5KHtcImFcIjpbdmFsdWUsdHJ1ZSxmYWxzZSxudWxsLFwiXFx4MDBcXGJcXG5cXGZcXHJcXHRcIl19KSA9PSBzZXJpYWxpemVkICYmICAvLyBGRiAzLjFiMSBhbmQgYjIgaWdub3JlIHRoZSBgZmlsdGVyYCBhbmQgYHdpZHRoYCBhcmd1bWVudHMuXG5zdHJpbmdpZnkobnVsbCx2YWx1ZSkgPT09IFwiMVwiICYmIHN0cmluZ2lmeShbMSwyXSxudWxsLDEpID09IFwiW1xcbiAxLFxcbiAyXFxuXVwiICYmICAvLyBKU09OIDIsIFByb3RvdHlwZSA8PSAxLjcsIGFuZCBvbGRlciBXZWJLaXQgYnVpbGRzIGluY29ycmVjdGx5XG4vLyBzZXJpYWxpemUgZXh0ZW5kZWQgeWVhcnMuXG5zdHJpbmdpZnkobmV3IERhdGUoLTguNjRlMTUpKSA9PSAnXCItMjcxODIxLTA0LTIwVDAwOjAwOjAwLjAwMFpcIicgJiYgIC8vIFRoZSBtaWxsaXNlY29uZHMgYXJlIG9wdGlvbmFsIGluIEVTIDUsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG5zdHJpbmdpZnkobmV3IERhdGUoOC42NGUxNSkpID09ICdcIisyNzU3NjAtMDktMTNUMDA6MDA6MDAuMDAwWlwiJyAmJiAgLy8gRmlyZWZveCA8PSAxMS4wIGluY29ycmVjdGx5IHNlcmlhbGl6ZXMgeWVhcnMgcHJpb3IgdG8gMCBhcyBuZWdhdGl2ZVxuLy8gZm91ci1kaWdpdCB5ZWFycyBpbnN0ZWFkIG9mIHNpeC1kaWdpdCB5ZWFycy4gQ3JlZGl0czogQFlhZmZsZS5cbnN0cmluZ2lmeShuZXcgRGF0ZSgtNjIxOTg3NTUyZTUpKSA9PSAnXCItMDAwMDAxLTAxLTAxVDAwOjAwOjAwLjAwMFpcIicgJiYgIC8vIFNhZmFyaSA8PSA1LjEuNSBhbmQgT3BlcmEgPj0gMTAuNTMgaW5jb3JyZWN0bHkgc2VyaWFsaXplIG1pbGxpc2Vjb25kXG4vLyB2YWx1ZXMgbGVzcyB0aGFuIDEwMDAuIENyZWRpdHM6IEBZYWZmbGUuXG5zdHJpbmdpZnkobmV3IERhdGUoLTEpKSA9PSAnXCIxOTY5LTEyLTMxVDIzOjU5OjU5Ljk5OVpcIic7fWNhdGNoKGV4Y2VwdGlvbikge3N0cmluZ2lmeVN1cHBvcnRlZCA9IGZhbHNlO319aXNTdXBwb3J0ZWQgPSBzdHJpbmdpZnlTdXBwb3J0ZWQ7fSAvLyBUZXN0IGBKU09OLnBhcnNlYC5cbmlmKG5hbWUgPT0gXCJqc29uLXBhcnNlXCIpe3ZhciBwYXJzZT1leHBvcnRzLnBhcnNlO2lmKHR5cGVvZiBwYXJzZSA9PSBcImZ1bmN0aW9uXCIpe3RyeXsgLy8gRkYgMy4xYjEsIGIyIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGEgYmFyZSBsaXRlcmFsIGlzIHByb3ZpZGVkLlxuLy8gQ29uZm9ybWluZyBpbXBsZW1lbnRhdGlvbnMgc2hvdWxkIGFsc28gY29lcmNlIHRoZSBpbml0aWFsIGFyZ3VtZW50IHRvXG4vLyBhIHN0cmluZyBwcmlvciB0byBwYXJzaW5nLlxuaWYocGFyc2UoXCIwXCIpID09PSAwICYmICFwYXJzZShmYWxzZSkpeyAvLyBTaW1wbGUgcGFyc2luZyB0ZXN0LlxudmFsdWUgPSBwYXJzZShzZXJpYWxpemVkKTt2YXIgcGFyc2VTdXBwb3J0ZWQ9dmFsdWVbXCJhXCJdLmxlbmd0aCA9PSA1ICYmIHZhbHVlW1wiYVwiXVswXSA9PT0gMTtpZihwYXJzZVN1cHBvcnRlZCl7dHJ5eyAvLyBTYWZhcmkgPD0gNS4xLjIgYW5kIEZGIDMuMWIxIGFsbG93IHVuZXNjYXBlZCB0YWJzIGluIHN0cmluZ3MuXG5wYXJzZVN1cHBvcnRlZCA9ICFwYXJzZSgnXCJcXHRcIicpO31jYXRjaChleGNlcHRpb24pIHt9aWYocGFyc2VTdXBwb3J0ZWQpe3RyeXsgLy8gRkYgNC4wIGFuZCA0LjAuMSBhbGxvdyBsZWFkaW5nIGArYCBzaWducyBhbmQgbGVhZGluZ1xuLy8gZGVjaW1hbCBwb2ludHMuIEZGIDQuMCwgNC4wLjEsIGFuZCBJRSA5LTEwIGFsc28gYWxsb3dcbi8vIGNlcnRhaW4gb2N0YWwgbGl0ZXJhbHMuXG5wYXJzZVN1cHBvcnRlZCA9IHBhcnNlKFwiMDFcIikgIT09IDE7fWNhdGNoKGV4Y2VwdGlvbikge319aWYocGFyc2VTdXBwb3J0ZWQpe3RyeXsgLy8gRkYgNC4wLCA0LjAuMSwgYW5kIFJoaW5vIDEuN1IzLVI0IGFsbG93IHRyYWlsaW5nIGRlY2ltYWxcbi8vIHBvaW50cy4gVGhlc2UgZW52aXJvbm1lbnRzLCBhbG9uZyB3aXRoIEZGIDMuMWIxIGFuZCAyLFxuLy8gYWxzbyBhbGxvdyB0cmFpbGluZyBjb21tYXMgaW4gSlNPTiBvYmplY3RzIGFuZCBhcnJheXMuXG5wYXJzZVN1cHBvcnRlZCA9IHBhcnNlKFwiMS5cIikgIT09IDE7fWNhdGNoKGV4Y2VwdGlvbikge319fX19Y2F0Y2goZXhjZXB0aW9uKSB7cGFyc2VTdXBwb3J0ZWQgPSBmYWxzZTt9fWlzU3VwcG9ydGVkID0gcGFyc2VTdXBwb3J0ZWQ7fX1yZXR1cm4gaGFzW25hbWVdID0gISFpc1N1cHBvcnRlZDt9aWYoIWhhcyhcImpzb25cIikpeyAvLyBDb21tb24gYFtbQ2xhc3NdXWAgbmFtZSBhbGlhc2VzLlxudmFyIGZ1bmN0aW9uQ2xhc3M9XCJbb2JqZWN0IEZ1bmN0aW9uXVwiLGRhdGVDbGFzcz1cIltvYmplY3QgRGF0ZV1cIixudW1iZXJDbGFzcz1cIltvYmplY3QgTnVtYmVyXVwiLHN0cmluZ0NsYXNzPVwiW29iamVjdCBTdHJpbmddXCIsYXJyYXlDbGFzcz1cIltvYmplY3QgQXJyYXldXCIsYm9vbGVhbkNsYXNzPVwiW29iamVjdCBCb29sZWFuXVwiOyAvLyBEZXRlY3QgaW5jb21wbGV0ZSBzdXBwb3J0IGZvciBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgYnkgaW5kZXguXG52YXIgY2hhckluZGV4QnVnZ3k9aGFzKFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpOyAvLyBEZWZpbmUgYWRkaXRpb25hbCB1dGlsaXR5IG1ldGhvZHMgaWYgdGhlIGBEYXRlYCBtZXRob2RzIGFyZSBidWdneS5cbmlmKCFpc0V4dGVuZGVkKXt2YXIgZmxvb3I9TWF0aC5mbG9vcjsgLy8gQSBtYXBwaW5nIGJldHdlZW4gdGhlIG1vbnRocyBvZiB0aGUgeWVhciBhbmQgdGhlIG51bWJlciBvZiBkYXlzIGJldHdlZW5cbi8vIEphbnVhcnkgMXN0IGFuZCB0aGUgZmlyc3Qgb2YgdGhlIHJlc3BlY3RpdmUgbW9udGguXG52YXIgTW9udGhzPVswLDMxLDU5LDkwLDEyMCwxNTEsMTgxLDIxMiwyNDMsMjczLDMwNCwzMzRdOyAvLyBJbnRlcm5hbDogQ2FsY3VsYXRlcyB0aGUgbnVtYmVyIG9mIGRheXMgYmV0d2VlbiB0aGUgVW5peCBlcG9jaCBhbmQgdGhlXG4vLyBmaXJzdCBkYXkgb2YgdGhlIGdpdmVuIG1vbnRoLlxudmFyIGdldERheT1mdW5jdGlvbiBnZXREYXkoeWVhcixtb250aCl7cmV0dXJuIE1vbnRoc1ttb250aF0gKyAzNjUgKiAoeWVhciAtIDE5NzApICsgZmxvb3IoKHllYXIgLSAxOTY5ICsgKG1vbnRoID0gKyhtb250aCA+IDEpKSkgLyA0KSAtIGZsb29yKCh5ZWFyIC0gMTkwMSArIG1vbnRoKSAvIDEwMCkgKyBmbG9vcigoeWVhciAtIDE2MDEgKyBtb250aCkgLyA0MDApO307fSAvLyBJbnRlcm5hbDogRGV0ZXJtaW5lcyBpZiBhIHByb3BlcnR5IGlzIGEgZGlyZWN0IHByb3BlcnR5IG9mIHRoZSBnaXZlblxuLy8gb2JqZWN0LiBEZWxlZ2F0ZXMgdG8gdGhlIG5hdGl2ZSBgT2JqZWN0I2hhc093blByb3BlcnR5YCBtZXRob2QuXG5pZighKGlzUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eSkpe2lzUHJvcGVydHkgPSBmdW5jdGlvbihwcm9wZXJ0eSl7dmFyIG1lbWJlcnM9e30sY29uc3RydWN0b3I7aWYoKG1lbWJlcnMuX19wcm90b19fID0gbnVsbCxtZW1iZXJzLl9fcHJvdG9fXyA9IHsgLy8gVGhlICpwcm90byogcHJvcGVydHkgY2Fubm90IGJlIHNldCBtdWx0aXBsZSB0aW1lcyBpbiByZWNlbnRcbi8vIHZlcnNpb25zIG9mIEZpcmVmb3ggYW5kIFNlYU1vbmtleS5cblwidG9TdHJpbmdcIjoxfSxtZW1iZXJzKS50b1N0cmluZyAhPSBnZXRDbGFzcyl7IC8vIFNhZmFyaSA8PSAyLjAuMyBkb2Vzbid0IGltcGxlbWVudCBgT2JqZWN0I2hhc093blByb3BlcnR5YCwgYnV0XG4vLyBzdXBwb3J0cyB0aGUgbXV0YWJsZSAqcHJvdG8qIHByb3BlcnR5LlxuaXNQcm9wZXJ0eSA9IGZ1bmN0aW9uKHByb3BlcnR5KXsgLy8gQ2FwdHVyZSBhbmQgYnJlYWsgdGhlIG9iamVjdCdzIHByb3RvdHlwZSBjaGFpbiAoc2VlIHNlY3Rpb24gOC42LjJcbi8vIG9mIHRoZSBFUyA1LjEgc3BlYykuIFRoZSBwYXJlbnRoZXNpemVkIGV4cHJlc3Npb24gcHJldmVudHMgYW5cbi8vIHVuc2FmZSB0cmFuc2Zvcm1hdGlvbiBieSB0aGUgQ2xvc3VyZSBDb21waWxlci5cbnZhciBvcmlnaW5hbD10aGlzLl9fcHJvdG9fXyxyZXN1bHQ9KHByb3BlcnR5IGluICh0aGlzLl9fcHJvdG9fXyA9IG51bGwsdGhpcykpOyAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBwcm90b3R5cGUgY2hhaW4uXG50aGlzLl9fcHJvdG9fXyA9IG9yaWdpbmFsO3JldHVybiByZXN1bHQ7fTt9ZWxzZSB7IC8vIENhcHR1cmUgYSByZWZlcmVuY2UgdG8gdGhlIHRvcC1sZXZlbCBgT2JqZWN0YCBjb25zdHJ1Y3Rvci5cbmNvbnN0cnVjdG9yID0gbWVtYmVycy5jb25zdHJ1Y3RvcjsgLy8gVXNlIHRoZSBgY29uc3RydWN0b3JgIHByb3BlcnR5IHRvIHNpbXVsYXRlIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIGluXG4vLyBvdGhlciBlbnZpcm9ubWVudHMuXG5pc1Byb3BlcnR5ID0gZnVuY3Rpb24ocHJvcGVydHkpe3ZhciBwYXJlbnQ9KHRoaXMuY29uc3RydWN0b3IgfHwgY29uc3RydWN0b3IpLnByb3RvdHlwZTtyZXR1cm4gcHJvcGVydHkgaW4gdGhpcyAmJiAhKHByb3BlcnR5IGluIHBhcmVudCAmJiB0aGlzW3Byb3BlcnR5XSA9PT0gcGFyZW50W3Byb3BlcnR5XSk7fTt9bWVtYmVycyA9IG51bGw7cmV0dXJuIGlzUHJvcGVydHkuY2FsbCh0aGlzLHByb3BlcnR5KTt9O30gLy8gSW50ZXJuYWw6IE5vcm1hbGl6ZXMgdGhlIGBmb3IuLi5pbmAgaXRlcmF0aW9uIGFsZ29yaXRobSBhY3Jvc3Ncbi8vIGVudmlyb25tZW50cy4gRWFjaCBlbnVtZXJhdGVkIGtleSBpcyB5aWVsZGVkIHRvIGEgYGNhbGxiYWNrYCBmdW5jdGlvbi5cbmZvckVhY2ggPSBmdW5jdGlvbihvYmplY3QsY2FsbGJhY2spe3ZhciBzaXplPTAsUHJvcGVydGllcyxtZW1iZXJzLHByb3BlcnR5OyAvLyBUZXN0cyBmb3IgYnVncyBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudCdzIGBmb3IuLi5pbmAgYWxnb3JpdGhtLiBUaGVcbi8vIGB2YWx1ZU9mYCBwcm9wZXJ0eSBpbmhlcml0cyB0aGUgbm9uLWVudW1lcmFibGUgZmxhZyBmcm9tXG4vLyBgT2JqZWN0LnByb3RvdHlwZWAgaW4gb2xkZXIgdmVyc2lvbnMgb2YgSUUsIE5ldHNjYXBlLCBhbmQgTW96aWxsYS5cbihQcm9wZXJ0aWVzID0gZnVuY3Rpb24oKXt0aGlzLnZhbHVlT2YgPSAwO30pLnByb3RvdHlwZS52YWx1ZU9mID0gMDsgLy8gSXRlcmF0ZSBvdmVyIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBgUHJvcGVydGllc2AgY2xhc3MuXG5tZW1iZXJzID0gbmV3IFByb3BlcnRpZXMoKTtmb3IocHJvcGVydHkgaW4gbWVtYmVycykgeyAvLyBJZ25vcmUgYWxsIHByb3BlcnRpZXMgaW5oZXJpdGVkIGZyb20gYE9iamVjdC5wcm90b3R5cGVgLlxuaWYoaXNQcm9wZXJ0eS5jYWxsKG1lbWJlcnMscHJvcGVydHkpKXtzaXplKys7fX1Qcm9wZXJ0aWVzID0gbWVtYmVycyA9IG51bGw7IC8vIE5vcm1hbGl6ZSB0aGUgaXRlcmF0aW9uIGFsZ29yaXRobS5cbmlmKCFzaXplKXsgLy8gQSBsaXN0IG9mIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgaW5oZXJpdGVkIGZyb20gYE9iamVjdC5wcm90b3R5cGVgLlxubWVtYmVycyA9IFtcInZhbHVlT2ZcIixcInRvU3RyaW5nXCIsXCJ0b0xvY2FsZVN0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImlzUHJvdG90eXBlT2ZcIixcImhhc093blByb3BlcnR5XCIsXCJjb25zdHJ1Y3RvclwiXTsgLy8gSUUgPD0gOCwgTW96aWxsYSAxLjAsIGFuZCBOZXRzY2FwZSA2LjIgaWdub3JlIHNoYWRvd2VkIG5vbi1lbnVtZXJhYmxlXG4vLyBwcm9wZXJ0aWVzLlxuZm9yRWFjaCA9IGZ1bmN0aW9uKG9iamVjdCxjYWxsYmFjayl7dmFyIGlzRnVuY3Rpb249Z2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MscHJvcGVydHksbGVuZ3RoO3ZhciBoYXNQcm9wZXJ0eT0haXNGdW5jdGlvbiAmJiB0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yICE9IFwiZnVuY3Rpb25cIiAmJiBvYmplY3RUeXBlc1t0eXBlb2Ygb2JqZWN0Lmhhc093blByb3BlcnR5XSAmJiBvYmplY3QuaGFzT3duUHJvcGVydHkgfHwgaXNQcm9wZXJ0eTtmb3IocHJvcGVydHkgaW4gb2JqZWN0KSB7IC8vIEdlY2tvIDw9IDEuMCBlbnVtZXJhdGVzIHRoZSBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgdW5kZXJcbi8vIGNlcnRhaW4gY29uZGl0aW9uczsgSUUgZG9lcyBub3QuXG5pZighKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgaGFzUHJvcGVydHkuY2FsbChvYmplY3QscHJvcGVydHkpKXtjYWxsYmFjayhwcm9wZXJ0eSk7fX0gLy8gTWFudWFsbHkgaW52b2tlIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBub24tZW51bWVyYWJsZSBwcm9wZXJ0eS5cbmZvcihsZW5ndGggPSBtZW1iZXJzLmxlbmd0aDtwcm9wZXJ0eSA9IG1lbWJlcnNbLS1sZW5ndGhdO2hhc1Byb3BlcnR5LmNhbGwob2JqZWN0LHByb3BlcnR5KSAmJiBjYWxsYmFjayhwcm9wZXJ0eSkpO307fWVsc2UgaWYoc2l6ZSA9PSAyKXsgLy8gU2FmYXJpIDw9IDIuMC40IGVudW1lcmF0ZXMgc2hhZG93ZWQgcHJvcGVydGllcyB0d2ljZS5cbmZvckVhY2ggPSBmdW5jdGlvbihvYmplY3QsY2FsbGJhY2speyAvLyBDcmVhdGUgYSBzZXQgb2YgaXRlcmF0ZWQgcHJvcGVydGllcy5cbnZhciBtZW1iZXJzPXt9LGlzRnVuY3Rpb249Z2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MscHJvcGVydHk7Zm9yKHByb3BlcnR5IGluIG9iamVjdCkgeyAvLyBTdG9yZSBlYWNoIHByb3BlcnR5IG5hbWUgdG8gcHJldmVudCBkb3VibGUgZW51bWVyYXRpb24uIFRoZVxuLy8gYHByb3RvdHlwZWAgcHJvcGVydHkgb2YgZnVuY3Rpb25zIGlzIG5vdCBlbnVtZXJhdGVkIGR1ZSB0byBjcm9zcy1cbi8vIGVudmlyb25tZW50IGluY29uc2lzdGVuY2llcy5cbmlmKCEoaXNGdW5jdGlvbiAmJiBwcm9wZXJ0eSA9PSBcInByb3RvdHlwZVwiKSAmJiAhaXNQcm9wZXJ0eS5jYWxsKG1lbWJlcnMscHJvcGVydHkpICYmIChtZW1iZXJzW3Byb3BlcnR5XSA9IDEpICYmIGlzUHJvcGVydHkuY2FsbChvYmplY3QscHJvcGVydHkpKXtjYWxsYmFjayhwcm9wZXJ0eSk7fX19O31lbHNlIHsgLy8gTm8gYnVncyBkZXRlY3RlZDsgdXNlIHRoZSBzdGFuZGFyZCBgZm9yLi4uaW5gIGFsZ29yaXRobS5cbmZvckVhY2ggPSBmdW5jdGlvbihvYmplY3QsY2FsbGJhY2spe3ZhciBpc0Z1bmN0aW9uPWdldENsYXNzLmNhbGwob2JqZWN0KSA9PSBmdW5jdGlvbkNsYXNzLHByb3BlcnR5LGlzQ29uc3RydWN0b3I7Zm9yKHByb3BlcnR5IGluIG9iamVjdCkge2lmKCEoaXNGdW5jdGlvbiAmJiBwcm9wZXJ0eSA9PSBcInByb3RvdHlwZVwiKSAmJiBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LHByb3BlcnR5KSAmJiAhKGlzQ29uc3RydWN0b3IgPSBwcm9wZXJ0eSA9PT0gXCJjb25zdHJ1Y3RvclwiKSl7Y2FsbGJhY2socHJvcGVydHkpO319IC8vIE1hbnVhbGx5IGludm9rZSB0aGUgY2FsbGJhY2sgZm9yIHRoZSBgY29uc3RydWN0b3JgIHByb3BlcnR5IGR1ZSB0b1xuLy8gY3Jvc3MtZW52aXJvbm1lbnQgaW5jb25zaXN0ZW5jaWVzLlxuaWYoaXNDb25zdHJ1Y3RvciB8fCBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LHByb3BlcnR5ID0gXCJjb25zdHJ1Y3RvclwiKSl7Y2FsbGJhY2socHJvcGVydHkpO319O31yZXR1cm4gZm9yRWFjaChvYmplY3QsY2FsbGJhY2spO307IC8vIFB1YmxpYzogU2VyaWFsaXplcyBhIEphdmFTY3JpcHQgYHZhbHVlYCBhcyBhIEpTT04gc3RyaW5nLiBUaGUgb3B0aW9uYWxcbi8vIGBmaWx0ZXJgIGFyZ3VtZW50IG1heSBzcGVjaWZ5IGVpdGhlciBhIGZ1bmN0aW9uIHRoYXQgYWx0ZXJzIGhvdyBvYmplY3QgYW5kXG4vLyBhcnJheSBtZW1iZXJzIGFyZSBzZXJpYWxpemVkLCBvciBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCBudW1iZXJzIHRoYXRcbi8vIGluZGljYXRlcyB3aGljaCBwcm9wZXJ0aWVzIHNob3VsZCBiZSBzZXJpYWxpemVkLiBUaGUgb3B0aW9uYWwgYHdpZHRoYFxuLy8gYXJndW1lbnQgbWF5IGJlIGVpdGhlciBhIHN0cmluZyBvciBudW1iZXIgdGhhdCBzcGVjaWZpZXMgdGhlIGluZGVudGF0aW9uXG4vLyBsZXZlbCBvZiB0aGUgb3V0cHV0LlxuaWYoIWhhcyhcImpzb24tc3RyaW5naWZ5XCIpKXsgLy8gSW50ZXJuYWw6IEEgbWFwIG9mIGNvbnRyb2wgY2hhcmFjdGVycyBhbmQgdGhlaXIgZXNjYXBlZCBlcXVpdmFsZW50cy5cbnZhciBFc2NhcGVzPXs5MjpcIlxcXFxcXFxcXCIsMzQ6J1xcXFxcIicsODpcIlxcXFxiXCIsMTI6XCJcXFxcZlwiLDEwOlwiXFxcXG5cIiwxMzpcIlxcXFxyXCIsOTpcIlxcXFx0XCJ9OyAvLyBJbnRlcm5hbDogQ29udmVydHMgYHZhbHVlYCBpbnRvIGEgemVyby1wYWRkZWQgc3RyaW5nIHN1Y2ggdGhhdCBpdHNcbi8vIGxlbmd0aCBpcyBhdCBsZWFzdCBlcXVhbCB0byBgd2lkdGhgLiBUaGUgYHdpZHRoYCBtdXN0IGJlIDw9IDYuXG52YXIgbGVhZGluZ1plcm9lcz1cIjAwMDAwMFwiO3ZhciB0b1BhZGRlZFN0cmluZz1mdW5jdGlvbiB0b1BhZGRlZFN0cmluZyh3aWR0aCx2YWx1ZSl7IC8vIFRoZSBgfHwgMGAgZXhwcmVzc2lvbiBpcyBuZWNlc3NhcnkgdG8gd29yayBhcm91bmQgYSBidWcgaW5cbi8vIE9wZXJhIDw9IDcuNTR1MiB3aGVyZSBgMCA9PSAtMGAsIGJ1dCBgU3RyaW5nKC0wKSAhPT0gXCIwXCJgLlxucmV0dXJuIChsZWFkaW5nWmVyb2VzICsgKHZhbHVlIHx8IDApKS5zbGljZSgtd2lkdGgpO307IC8vIEludGVybmFsOiBEb3VibGUtcXVvdGVzIGEgc3RyaW5nIGB2YWx1ZWAsIHJlcGxhY2luZyBhbGwgQVNDSUkgY29udHJvbFxuLy8gY2hhcmFjdGVycyAoY2hhcmFjdGVycyB3aXRoIGNvZGUgdW5pdCB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAzMSkgd2l0aFxuLy8gdGhlaXIgZXNjYXBlZCBlcXVpdmFsZW50cy4gVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbi8vIGBRdW90ZSh2YWx1ZSlgIG9wZXJhdGlvbiBkZWZpbmVkIGluIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMuXG52YXIgdW5pY29kZVByZWZpeD1cIlxcXFx1MDBcIjt2YXIgcXVvdGU9ZnVuY3Rpb24gcXVvdGUodmFsdWUpe3ZhciByZXN1bHQ9J1wiJyxpbmRleD0wLGxlbmd0aD12YWx1ZS5sZW5ndGgsdXNlQ2hhckluZGV4PSFjaGFySW5kZXhCdWdneSB8fCBsZW5ndGggPiAxMDt2YXIgc3ltYm9scz11c2VDaGFySW5kZXggJiYgKGNoYXJJbmRleEJ1Z2d5P3ZhbHVlLnNwbGl0KFwiXCIpOnZhbHVlKTtmb3IoO2luZGV4IDwgbGVuZ3RoO2luZGV4KyspIHt2YXIgY2hhckNvZGU9dmFsdWUuY2hhckNvZGVBdChpbmRleCk7IC8vIElmIHRoZSBjaGFyYWN0ZXIgaXMgYSBjb250cm9sIGNoYXJhY3RlciwgYXBwZW5kIGl0cyBVbmljb2RlIG9yXG4vLyBzaG9ydGhhbmQgZXNjYXBlIHNlcXVlbmNlOyBvdGhlcndpc2UsIGFwcGVuZCB0aGUgY2hhcmFjdGVyIGFzLWlzLlxuc3dpdGNoKGNoYXJDb2RlKXtjYXNlIDg6Y2FzZSA5OmNhc2UgMTA6Y2FzZSAxMjpjYXNlIDEzOmNhc2UgMzQ6Y2FzZSA5MjpyZXN1bHQgKz0gRXNjYXBlc1tjaGFyQ29kZV07YnJlYWs7ZGVmYXVsdDppZihjaGFyQ29kZSA8IDMyKXtyZXN1bHQgKz0gdW5pY29kZVByZWZpeCArIHRvUGFkZGVkU3RyaW5nKDIsY2hhckNvZGUudG9TdHJpbmcoMTYpKTticmVhazt9cmVzdWx0ICs9IHVzZUNoYXJJbmRleD9zeW1ib2xzW2luZGV4XTp2YWx1ZS5jaGFyQXQoaW5kZXgpO319cmV0dXJuIHJlc3VsdCArICdcIic7fTsgLy8gSW50ZXJuYWw6IFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZXMgYW4gb2JqZWN0LiBJbXBsZW1lbnRzIHRoZVxuLy8gYFN0cihrZXksIGhvbGRlcilgLCBgSk8odmFsdWUpYCwgYW5kIGBKQSh2YWx1ZSlgIG9wZXJhdGlvbnMuXG52YXIgc2VyaWFsaXplPWZ1bmN0aW9uIHNlcmlhbGl6ZShwcm9wZXJ0eSxvYmplY3QsY2FsbGJhY2sscHJvcGVydGllcyx3aGl0ZXNwYWNlLGluZGVudGF0aW9uLHN0YWNrKXt2YXIgdmFsdWUsY2xhc3NOYW1lLHllYXIsbW9udGgsZGF0ZSx0aW1lLGhvdXJzLG1pbnV0ZXMsc2Vjb25kcyxtaWxsaXNlY29uZHMscmVzdWx0cyxlbGVtZW50LGluZGV4LGxlbmd0aCxwcmVmaXgscmVzdWx0O3RyeXsgLy8gTmVjZXNzYXJ5IGZvciBob3N0IG9iamVjdCBzdXBwb3J0LlxudmFsdWUgPSBvYmplY3RbcHJvcGVydHldO31jYXRjaChleGNlcHRpb24pIHt9aWYodHlwZW9mIHZhbHVlID09IFwib2JqZWN0XCIgJiYgdmFsdWUpe2NsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwodmFsdWUpO2lmKGNsYXNzTmFtZSA9PSBkYXRlQ2xhc3MgJiYgIWlzUHJvcGVydHkuY2FsbCh2YWx1ZSxcInRvSlNPTlwiKSl7aWYodmFsdWUgPiAtMSAvIDAgJiYgdmFsdWUgPCAxIC8gMCl7IC8vIERhdGVzIGFyZSBzZXJpYWxpemVkIGFjY29yZGluZyB0byB0aGUgYERhdGUjdG9KU09OYCBtZXRob2Rcbi8vIHNwZWNpZmllZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS45LjUuNDQuIFNlZSBzZWN0aW9uIDE1LjkuMS4xNVxuLy8gZm9yIHRoZSBJU08gODYwMSBkYXRlIHRpbWUgc3RyaW5nIGZvcm1hdC5cbmlmKGdldERheSl7IC8vIE1hbnVhbGx5IGNvbXB1dGUgdGhlIHllYXIsIG1vbnRoLCBkYXRlLCBob3VycywgbWludXRlcyxcbi8vIHNlY29uZHMsIGFuZCBtaWxsaXNlY29uZHMgaWYgdGhlIGBnZXRVVEMqYCBtZXRob2RzIGFyZVxuLy8gYnVnZ3kuIEFkYXB0ZWQgZnJvbSBAWWFmZmxlJ3MgYGRhdGUtc2hpbWAgcHJvamVjdC5cbmRhdGUgPSBmbG9vcih2YWx1ZSAvIDg2NGU1KTtmb3IoeWVhciA9IGZsb29yKGRhdGUgLyAzNjUuMjQyNSkgKyAxOTcwIC0gMTtnZXREYXkoeWVhciArIDEsMCkgPD0gZGF0ZTt5ZWFyKyspO2Zvcihtb250aCA9IGZsb29yKChkYXRlIC0gZ2V0RGF5KHllYXIsMCkpIC8gMzAuNDIpO2dldERheSh5ZWFyLG1vbnRoICsgMSkgPD0gZGF0ZTttb250aCsrKTtkYXRlID0gMSArIGRhdGUgLSBnZXREYXkoeWVhcixtb250aCk7IC8vIFRoZSBgdGltZWAgdmFsdWUgc3BlY2lmaWVzIHRoZSB0aW1lIHdpdGhpbiB0aGUgZGF5IChzZWUgRVNcbi8vIDUuMSBzZWN0aW9uIDE1LjkuMS4yKS4gVGhlIGZvcm11bGEgYChBICUgQiArIEIpICUgQmAgaXMgdXNlZFxuLy8gdG8gY29tcHV0ZSBgQSBtb2R1bG8gQmAsIGFzIHRoZSBgJWAgb3BlcmF0b3IgZG9lcyBub3Rcbi8vIGNvcnJlc3BvbmQgdG8gdGhlIGBtb2R1bG9gIG9wZXJhdGlvbiBmb3IgbmVnYXRpdmUgbnVtYmVycy5cbnRpbWUgPSAodmFsdWUgJSA4NjRlNSArIDg2NGU1KSAlIDg2NGU1OyAvLyBUaGUgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIGFuZCBtaWxsaXNlY29uZHMgYXJlIG9idGFpbmVkIGJ5XG4vLyBkZWNvbXBvc2luZyB0aGUgdGltZSB3aXRoaW4gdGhlIGRheS4gU2VlIHNlY3Rpb24gMTUuOS4xLjEwLlxuaG91cnMgPSBmbG9vcih0aW1lIC8gMzZlNSkgJSAyNDttaW51dGVzID0gZmxvb3IodGltZSAvIDZlNCkgJSA2MDtzZWNvbmRzID0gZmxvb3IodGltZSAvIDFlMykgJSA2MDttaWxsaXNlY29uZHMgPSB0aW1lICUgMWUzO31lbHNlIHt5ZWFyID0gdmFsdWUuZ2V0VVRDRnVsbFllYXIoKTttb250aCA9IHZhbHVlLmdldFVUQ01vbnRoKCk7ZGF0ZSA9IHZhbHVlLmdldFVUQ0RhdGUoKTtob3VycyA9IHZhbHVlLmdldFVUQ0hvdXJzKCk7bWludXRlcyA9IHZhbHVlLmdldFVUQ01pbnV0ZXMoKTtzZWNvbmRzID0gdmFsdWUuZ2V0VVRDU2Vjb25kcygpO21pbGxpc2Vjb25kcyA9IHZhbHVlLmdldFVUQ01pbGxpc2Vjb25kcygpO30gLy8gU2VyaWFsaXplIGV4dGVuZGVkIHllYXJzIGNvcnJlY3RseS5cbnZhbHVlID0gKHllYXIgPD0gMCB8fCB5ZWFyID49IDFlND8oeWVhciA8IDA/XCItXCI6XCIrXCIpICsgdG9QYWRkZWRTdHJpbmcoNix5ZWFyIDwgMD8teWVhcjp5ZWFyKTp0b1BhZGRlZFN0cmluZyg0LHllYXIpKSArIFwiLVwiICsgdG9QYWRkZWRTdHJpbmcoMixtb250aCArIDEpICsgXCItXCIgKyB0b1BhZGRlZFN0cmluZygyLGRhdGUpICsgIC8vIE1vbnRocywgZGF0ZXMsIGhvdXJzLCBtaW51dGVzLCBhbmQgc2Vjb25kcyBzaG91bGQgaGF2ZSB0d29cbi8vIGRpZ2l0czsgbWlsbGlzZWNvbmRzIHNob3VsZCBoYXZlIHRocmVlLlxuXCJUXCIgKyB0b1BhZGRlZFN0cmluZygyLGhvdXJzKSArIFwiOlwiICsgdG9QYWRkZWRTdHJpbmcoMixtaW51dGVzKSArIFwiOlwiICsgdG9QYWRkZWRTdHJpbmcoMixzZWNvbmRzKSArICAvLyBNaWxsaXNlY29uZHMgYXJlIG9wdGlvbmFsIGluIEVTIDUuMCwgYnV0IHJlcXVpcmVkIGluIDUuMS5cblwiLlwiICsgdG9QYWRkZWRTdHJpbmcoMyxtaWxsaXNlY29uZHMpICsgXCJaXCI7fWVsc2Uge3ZhbHVlID0gbnVsbDt9fWVsc2UgaWYodHlwZW9mIHZhbHVlLnRvSlNPTiA9PSBcImZ1bmN0aW9uXCIgJiYgKGNsYXNzTmFtZSAhPSBudW1iZXJDbGFzcyAmJiBjbGFzc05hbWUgIT0gc3RyaW5nQ2xhc3MgJiYgY2xhc3NOYW1lICE9IGFycmF5Q2xhc3MgfHwgaXNQcm9wZXJ0eS5jYWxsKHZhbHVlLFwidG9KU09OXCIpKSl7IC8vIFByb3RvdHlwZSA8PSAxLjYuMSBhZGRzIG5vbi1zdGFuZGFyZCBgdG9KU09OYCBtZXRob2RzIHRvIHRoZVxuLy8gYE51bWJlcmAsIGBTdHJpbmdgLCBgRGF0ZWAsIGFuZCBgQXJyYXlgIHByb3RvdHlwZXMuIEpTT04gM1xuLy8gaWdub3JlcyBhbGwgYHRvSlNPTmAgbWV0aG9kcyBvbiB0aGVzZSBvYmplY3RzIHVubGVzcyB0aGV5IGFyZVxuLy8gZGVmaW5lZCBkaXJlY3RseSBvbiBhbiBpbnN0YW5jZS5cbnZhbHVlID0gdmFsdWUudG9KU09OKHByb3BlcnR5KTt9fWlmKGNhbGxiYWNrKXsgLy8gSWYgYSByZXBsYWNlbWVudCBmdW5jdGlvbiB3YXMgcHJvdmlkZWQsIGNhbGwgaXQgdG8gb2J0YWluIHRoZSB2YWx1ZVxuLy8gZm9yIHNlcmlhbGl6YXRpb24uXG52YWx1ZSA9IGNhbGxiYWNrLmNhbGwob2JqZWN0LHByb3BlcnR5LHZhbHVlKTt9aWYodmFsdWUgPT09IG51bGwpe3JldHVybiBcIm51bGxcIjt9Y2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh2YWx1ZSk7aWYoY2xhc3NOYW1lID09IGJvb2xlYW5DbGFzcyl7IC8vIEJvb2xlYW5zIGFyZSByZXByZXNlbnRlZCBsaXRlcmFsbHkuXG5yZXR1cm4gXCJcIiArIHZhbHVlO31lbHNlIGlmKGNsYXNzTmFtZSA9PSBudW1iZXJDbGFzcyl7IC8vIEpTT04gbnVtYmVycyBtdXN0IGJlIGZpbml0ZS4gYEluZmluaXR5YCBhbmQgYE5hTmAgYXJlIHNlcmlhbGl6ZWQgYXNcbi8vIGBcIm51bGxcImAuXG5yZXR1cm4gdmFsdWUgPiAtMSAvIDAgJiYgdmFsdWUgPCAxIC8gMD9cIlwiICsgdmFsdWU6XCJudWxsXCI7fWVsc2UgaWYoY2xhc3NOYW1lID09IHN0cmluZ0NsYXNzKXsgLy8gU3RyaW5ncyBhcmUgZG91YmxlLXF1b3RlZCBhbmQgZXNjYXBlZC5cbnJldHVybiBxdW90ZShcIlwiICsgdmFsdWUpO30gLy8gUmVjdXJzaXZlbHkgc2VyaWFsaXplIG9iamVjdHMgYW5kIGFycmF5cy5cbmlmKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiKXsgLy8gQ2hlY2sgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGlzIGlzIGEgbGluZWFyIHNlYXJjaDsgcGVyZm9ybWFuY2Vcbi8vIGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gdGhlIG51bWJlciBvZiB1bmlxdWUgbmVzdGVkIG9iamVjdHMuXG5mb3IobGVuZ3RoID0gc3RhY2subGVuZ3RoO2xlbmd0aC0tOykge2lmKHN0YWNrW2xlbmd0aF0gPT09IHZhbHVlKXsgLy8gQ3ljbGljIHN0cnVjdHVyZXMgY2Fubm90IGJlIHNlcmlhbGl6ZWQgYnkgYEpTT04uc3RyaW5naWZ5YC5cbnRocm93IFR5cGVFcnJvcigpO319IC8vIEFkZCB0aGUgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbnN0YWNrLnB1c2godmFsdWUpO3Jlc3VsdHMgPSBbXTsgLy8gU2F2ZSB0aGUgY3VycmVudCBpbmRlbnRhdGlvbiBsZXZlbCBhbmQgaW5kZW50IG9uZSBhZGRpdGlvbmFsIGxldmVsLlxucHJlZml4ID0gaW5kZW50YXRpb247aW5kZW50YXRpb24gKz0gd2hpdGVzcGFjZTtpZihjbGFzc05hbWUgPT0gYXJyYXlDbGFzcyl7IC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBhcnJheSBlbGVtZW50cy5cbmZvcihpbmRleCA9IDAsbGVuZ3RoID0gdmFsdWUubGVuZ3RoO2luZGV4IDwgbGVuZ3RoO2luZGV4KyspIHtlbGVtZW50ID0gc2VyaWFsaXplKGluZGV4LHZhbHVlLGNhbGxiYWNrLHByb3BlcnRpZXMsd2hpdGVzcGFjZSxpbmRlbnRhdGlvbixzdGFjayk7cmVzdWx0cy5wdXNoKGVsZW1lbnQgPT09IHVuZGVmP1wibnVsbFwiOmVsZW1lbnQpO31yZXN1bHQgPSByZXN1bHRzLmxlbmd0aD93aGl0ZXNwYWNlP1wiW1xcblwiICsgaW5kZW50YXRpb24gKyByZXN1bHRzLmpvaW4oXCIsXFxuXCIgKyBpbmRlbnRhdGlvbikgKyBcIlxcblwiICsgcHJlZml4ICsgXCJdXCI6XCJbXCIgKyByZXN1bHRzLmpvaW4oXCIsXCIpICsgXCJdXCI6XCJbXVwiO31lbHNlIHsgLy8gUmVjdXJzaXZlbHkgc2VyaWFsaXplIG9iamVjdCBtZW1iZXJzLiBNZW1iZXJzIGFyZSBzZWxlY3RlZCBmcm9tXG4vLyBlaXRoZXIgYSB1c2VyLXNwZWNpZmllZCBsaXN0IG9mIHByb3BlcnR5IG5hbWVzLCBvciB0aGUgb2JqZWN0XG4vLyBpdHNlbGYuXG5mb3JFYWNoKHByb3BlcnRpZXMgfHwgdmFsdWUsZnVuY3Rpb24ocHJvcGVydHkpe3ZhciBlbGVtZW50PXNlcmlhbGl6ZShwcm9wZXJ0eSx2YWx1ZSxjYWxsYmFjayxwcm9wZXJ0aWVzLHdoaXRlc3BhY2UsaW5kZW50YXRpb24sc3RhY2spO2lmKGVsZW1lbnQgIT09IHVuZGVmKXsgLy8gQWNjb3JkaW5nIHRvIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjM6IFwiSWYgYGdhcGAge3doaXRlc3BhY2V9XG4vLyBpcyBub3QgdGhlIGVtcHR5IHN0cmluZywgbGV0IGBtZW1iZXJgIHtxdW90ZShwcm9wZXJ0eSkgKyBcIjpcIn1cbi8vIGJlIHRoZSBjb25jYXRlbmF0aW9uIG9mIGBtZW1iZXJgIGFuZCB0aGUgYHNwYWNlYCBjaGFyYWN0ZXIuXCJcbi8vIFRoZSBcImBzcGFjZWAgY2hhcmFjdGVyXCIgcmVmZXJzIHRvIHRoZSBsaXRlcmFsIHNwYWNlXG4vLyBjaGFyYWN0ZXIsIG5vdCB0aGUgYHNwYWNlYCB7d2lkdGh9IGFyZ3VtZW50IHByb3ZpZGVkIHRvXG4vLyBgSlNPTi5zdHJpbmdpZnlgLlxucmVzdWx0cy5wdXNoKHF1b3RlKHByb3BlcnR5KSArIFwiOlwiICsgKHdoaXRlc3BhY2U/XCIgXCI6XCJcIikgKyBlbGVtZW50KTt9fSk7cmVzdWx0ID0gcmVzdWx0cy5sZW5ndGg/d2hpdGVzcGFjZT9cIntcXG5cIiArIGluZGVudGF0aW9uICsgcmVzdWx0cy5qb2luKFwiLFxcblwiICsgaW5kZW50YXRpb24pICsgXCJcXG5cIiArIHByZWZpeCArIFwifVwiOlwie1wiICsgcmVzdWx0cy5qb2luKFwiLFwiKSArIFwifVwiOlwie31cIjt9IC8vIFJlbW92ZSB0aGUgb2JqZWN0IGZyb20gdGhlIHRyYXZlcnNlZCBvYmplY3Qgc3RhY2suXG5zdGFjay5wb3AoKTtyZXR1cm4gcmVzdWx0O319OyAvLyBQdWJsaWM6IGBKU09OLnN0cmluZ2lmeWAuIFNlZSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxuZXhwb3J0cy5zdHJpbmdpZnkgPSBmdW5jdGlvbihzb3VyY2UsZmlsdGVyLHdpZHRoKXt2YXIgd2hpdGVzcGFjZSxjYWxsYmFjayxwcm9wZXJ0aWVzLGNsYXNzTmFtZTtpZihvYmplY3RUeXBlc1t0eXBlb2YgZmlsdGVyXSAmJiBmaWx0ZXIpe2lmKChjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKGZpbHRlcikpID09IGZ1bmN0aW9uQ2xhc3Mpe2NhbGxiYWNrID0gZmlsdGVyO31lbHNlIGlmKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKXsgLy8gQ29udmVydCB0aGUgcHJvcGVydHkgbmFtZXMgYXJyYXkgaW50byBhIG1ha2VzaGlmdCBzZXQuXG5wcm9wZXJ0aWVzID0ge307Zm9yKHZhciBpbmRleD0wLGxlbmd0aD1maWx0ZXIubGVuZ3RoLHZhbHVlO2luZGV4IDwgbGVuZ3RoO3ZhbHVlID0gZmlsdGVyW2luZGV4KytdLChjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKSxjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3MgfHwgY2xhc3NOYW1lID09IG51bWJlckNsYXNzKSAmJiAocHJvcGVydGllc1t2YWx1ZV0gPSAxKSk7fX1pZih3aWR0aCl7aWYoKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwod2lkdGgpKSA9PSBudW1iZXJDbGFzcyl7IC8vIENvbnZlcnQgdGhlIGB3aWR0aGAgdG8gYW4gaW50ZWdlciBhbmQgY3JlYXRlIGEgc3RyaW5nIGNvbnRhaW5pbmdcbi8vIGB3aWR0aGAgbnVtYmVyIG9mIHNwYWNlIGNoYXJhY3RlcnMuXG5pZigod2lkdGggLT0gd2lkdGggJSAxKSA+IDApe2Zvcih3aGl0ZXNwYWNlID0gXCJcIix3aWR0aCA+IDEwICYmICh3aWR0aCA9IDEwKTt3aGl0ZXNwYWNlLmxlbmd0aCA8IHdpZHRoO3doaXRlc3BhY2UgKz0gXCIgXCIpO319ZWxzZSBpZihjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3Mpe3doaXRlc3BhY2UgPSB3aWR0aC5sZW5ndGggPD0gMTA/d2lkdGg6d2lkdGguc2xpY2UoMCwxMCk7fX0gLy8gT3BlcmEgPD0gNy41NHUyIGRpc2NhcmRzIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGVtcHR5IHN0cmluZyBrZXlzXG4vLyAoYFwiXCJgKSBvbmx5IGlmIHRoZXkgYXJlIHVzZWQgZGlyZWN0bHkgd2l0aGluIGFuIG9iamVjdCBtZW1iZXIgbGlzdFxuLy8gKGUuZy4sIGAhKFwiXCIgaW4geyBcIlwiOiAxfSlgKS5cbnJldHVybiBzZXJpYWxpemUoXCJcIiwodmFsdWUgPSB7fSx2YWx1ZVtcIlwiXSA9IHNvdXJjZSx2YWx1ZSksY2FsbGJhY2sscHJvcGVydGllcyx3aGl0ZXNwYWNlLFwiXCIsW10pO307fSAvLyBQdWJsaWM6IFBhcnNlcyBhIEpTT04gc291cmNlIHN0cmluZy5cbmlmKCFoYXMoXCJqc29uLXBhcnNlXCIpKXt2YXIgZnJvbUNoYXJDb2RlPVN0cmluZy5mcm9tQ2hhckNvZGU7IC8vIEludGVybmFsOiBBIG1hcCBvZiBlc2NhcGVkIGNvbnRyb2wgY2hhcmFjdGVycyBhbmQgdGhlaXIgdW5lc2NhcGVkXG4vLyBlcXVpdmFsZW50cy5cbnZhciBVbmVzY2FwZXM9ezkyOlwiXFxcXFwiLDM0OidcIicsNDc6XCIvXCIsOTg6XCJcXGJcIiwxMTY6XCJcXHRcIiwxMTA6XCJcXG5cIiwxMDI6XCJcXGZcIiwxMTQ6XCJcXHJcIn07IC8vIEludGVybmFsOiBTdG9yZXMgdGhlIHBhcnNlciBzdGF0ZS5cbnZhciBJbmRleCxTb3VyY2U7IC8vIEludGVybmFsOiBSZXNldHMgdGhlIHBhcnNlciBzdGF0ZSBhbmQgdGhyb3dzIGEgYFN5bnRheEVycm9yYC5cbnZhciBhYm9ydD1mdW5jdGlvbiBhYm9ydCgpe0luZGV4ID0gU291cmNlID0gbnVsbDt0aHJvdyBTeW50YXhFcnJvcigpO307IC8vIEludGVybmFsOiBSZXR1cm5zIHRoZSBuZXh0IHRva2VuLCBvciBgXCIkXCJgIGlmIHRoZSBwYXJzZXIgaGFzIHJlYWNoZWRcbi8vIHRoZSBlbmQgb2YgdGhlIHNvdXJjZSBzdHJpbmcuIEEgdG9rZW4gbWF5IGJlIGEgc3RyaW5nLCBudW1iZXIsIGBudWxsYFxuLy8gbGl0ZXJhbCwgb3IgQm9vbGVhbiBsaXRlcmFsLlxudmFyIGxleD1mdW5jdGlvbiBsZXgoKXt2YXIgc291cmNlPVNvdXJjZSxsZW5ndGg9c291cmNlLmxlbmd0aCx2YWx1ZSxiZWdpbixwb3NpdGlvbixpc1NpZ25lZCxjaGFyQ29kZTt3aGlsZShJbmRleCA8IGxlbmd0aCkge2NoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO3N3aXRjaChjaGFyQ29kZSl7Y2FzZSA5OmNhc2UgMTA6Y2FzZSAxMzpjYXNlIDMyOiAvLyBTa2lwIHdoaXRlc3BhY2UgdG9rZW5zLCBpbmNsdWRpbmcgdGFicywgY2FycmlhZ2UgcmV0dXJucywgbGluZVxuLy8gZmVlZHMsIGFuZCBzcGFjZSBjaGFyYWN0ZXJzLlxuSW5kZXgrKzticmVhaztjYXNlIDEyMzpjYXNlIDEyNTpjYXNlIDkxOmNhc2UgOTM6Y2FzZSA1ODpjYXNlIDQ0OiAvLyBQYXJzZSBhIHB1bmN0dWF0b3IgdG9rZW4gKGB7YCwgYH1gLCBgW2AsIGBdYCwgYDpgLCBvciBgLGApIGF0XG4vLyB0aGUgY3VycmVudCBwb3NpdGlvbi5cbnZhbHVlID0gY2hhckluZGV4QnVnZ3k/c291cmNlLmNoYXJBdChJbmRleCk6c291cmNlW0luZGV4XTtJbmRleCsrO3JldHVybiB2YWx1ZTtjYXNlIDM0OiAvLyBgXCJgIGRlbGltaXRzIGEgSlNPTiBzdHJpbmc7IGFkdmFuY2UgdG8gdGhlIG5leHQgY2hhcmFjdGVyIGFuZFxuLy8gYmVnaW4gcGFyc2luZyB0aGUgc3RyaW5nLiBTdHJpbmcgdG9rZW5zIGFyZSBwcmVmaXhlZCB3aXRoIHRoZVxuLy8gc2VudGluZWwgYEBgIGNoYXJhY3RlciB0byBkaXN0aW5ndWlzaCB0aGVtIGZyb20gcHVuY3R1YXRvcnMgYW5kXG4vLyBlbmQtb2Ytc3RyaW5nIHRva2Vucy5cbmZvcih2YWx1ZSA9IFwiQFwiLEluZGV4Kys7SW5kZXggPCBsZW5ndGg7KSB7Y2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7aWYoY2hhckNvZGUgPCAzMil7IC8vIFVuZXNjYXBlZCBBU0NJSSBjb250cm9sIGNoYXJhY3RlcnMgKHRob3NlIHdpdGggYSBjb2RlIHVuaXRcbi8vIGxlc3MgdGhhbiB0aGUgc3BhY2UgY2hhcmFjdGVyKSBhcmUgbm90IHBlcm1pdHRlZC5cbmFib3J0KCk7fWVsc2UgaWYoY2hhckNvZGUgPT0gOTIpeyAvLyBBIHJldmVyc2Ugc29saWR1cyAoYFxcYCkgbWFya3MgdGhlIGJlZ2lubmluZyBvZiBhbiBlc2NhcGVkXG4vLyBjb250cm9sIGNoYXJhY3RlciAoaW5jbHVkaW5nIGBcImAsIGBcXGAsIGFuZCBgL2ApIG9yIFVuaWNvZGVcbi8vIGVzY2FwZSBzZXF1ZW5jZS5cbmNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7c3dpdGNoKGNoYXJDb2RlKXtjYXNlIDkyOmNhc2UgMzQ6Y2FzZSA0NzpjYXNlIDk4OmNhc2UgMTE2OmNhc2UgMTEwOmNhc2UgMTAyOmNhc2UgMTE0OiAvLyBSZXZpdmUgZXNjYXBlZCBjb250cm9sIGNoYXJhY3RlcnMuXG52YWx1ZSArPSBVbmVzY2FwZXNbY2hhckNvZGVdO0luZGV4Kys7YnJlYWs7Y2FzZSAxMTc6IC8vIGBcXHVgIG1hcmtzIHRoZSBiZWdpbm5pbmcgb2YgYSBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZS5cbi8vIEFkdmFuY2UgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBhbmQgdmFsaWRhdGUgdGhlXG4vLyBmb3VyLWRpZ2l0IGNvZGUgcG9pbnQuXG5iZWdpbiA9ICsrSW5kZXg7Zm9yKHBvc2l0aW9uID0gSW5kZXggKyA0O0luZGV4IDwgcG9zaXRpb247SW5kZXgrKykge2NoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpOyAvLyBBIHZhbGlkIHNlcXVlbmNlIGNvbXByaXNlcyBmb3VyIGhleGRpZ2l0cyAoY2FzZS1cbi8vIGluc2Vuc2l0aXZlKSB0aGF0IGZvcm0gYSBzaW5nbGUgaGV4YWRlY2ltYWwgdmFsdWUuXG5pZighKGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3IHx8IGNoYXJDb2RlID49IDk3ICYmIGNoYXJDb2RlIDw9IDEwMiB8fCBjaGFyQ29kZSA+PSA2NSAmJiBjaGFyQ29kZSA8PSA3MCkpeyAvLyBJbnZhbGlkIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlLlxuYWJvcnQoKTt9fSAvLyBSZXZpdmUgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxudmFsdWUgKz0gZnJvbUNoYXJDb2RlKFwiMHhcIiArIHNvdXJjZS5zbGljZShiZWdpbixJbmRleCkpO2JyZWFrO2RlZmF1bHQ6IC8vIEludmFsaWQgZXNjYXBlIHNlcXVlbmNlLlxuYWJvcnQoKTt9fWVsc2Uge2lmKGNoYXJDb2RlID09IDM0KXsgLy8gQW4gdW5lc2NhcGVkIGRvdWJsZS1xdW90ZSBjaGFyYWN0ZXIgbWFya3MgdGhlIGVuZCBvZiB0aGVcbi8vIHN0cmluZy5cbmJyZWFrO31jaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtiZWdpbiA9IEluZGV4OyAvLyBPcHRpbWl6ZSBmb3IgdGhlIGNvbW1vbiBjYXNlIHdoZXJlIGEgc3RyaW5nIGlzIHZhbGlkLlxud2hpbGUoY2hhckNvZGUgPj0gMzIgJiYgY2hhckNvZGUgIT0gOTIgJiYgY2hhckNvZGUgIT0gMzQpIHtjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO30gLy8gQXBwZW5kIHRoZSBzdHJpbmcgYXMtaXMuXG52YWx1ZSArPSBzb3VyY2Uuc2xpY2UoYmVnaW4sSW5kZXgpO319aWYoc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpID09IDM0KXsgLy8gQWR2YW5jZSB0byB0aGUgbmV4dCBjaGFyYWN0ZXIgYW5kIHJldHVybiB0aGUgcmV2aXZlZCBzdHJpbmcuXG5JbmRleCsrO3JldHVybiB2YWx1ZTt9IC8vIFVudGVybWluYXRlZCBzdHJpbmcuXG5hYm9ydCgpO2RlZmF1bHQ6IC8vIFBhcnNlIG51bWJlcnMgYW5kIGxpdGVyYWxzLlxuYmVnaW4gPSBJbmRleDsgLy8gQWR2YW5jZSBwYXN0IHRoZSBuZWdhdGl2ZSBzaWduLCBpZiBvbmUgaXMgc3BlY2lmaWVkLlxuaWYoY2hhckNvZGUgPT0gNDUpe2lzU2lnbmVkID0gdHJ1ZTtjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO30gLy8gUGFyc2UgYW4gaW50ZWdlciBvciBmbG9hdGluZy1wb2ludCB2YWx1ZS5cbmlmKGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KXsgLy8gTGVhZGluZyB6ZXJvZXMgYXJlIGludGVycHJldGVkIGFzIG9jdGFsIGxpdGVyYWxzLlxuaWYoY2hhckNvZGUgPT0gNDggJiYgKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXggKyAxKSxjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1NykpeyAvLyBJbGxlZ2FsIG9jdGFsIGxpdGVyYWwuXG5hYm9ydCgpO31pc1NpZ25lZCA9IGZhbHNlOyAvLyBQYXJzZSB0aGUgaW50ZWdlciBjb21wb25lbnQuXG5mb3IoO0luZGV4IDwgbGVuZ3RoICYmIChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSxjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7SW5kZXgrKyk7IC8vIEZsb2F0cyBjYW5ub3QgY29udGFpbiBhIGxlYWRpbmcgZGVjaW1hbCBwb2ludDsgaG93ZXZlciwgdGhpc1xuLy8gY2FzZSBpcyBhbHJlYWR5IGFjY291bnRlZCBmb3IgYnkgdGhlIHBhcnNlci5cbmlmKHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSA9PSA0Nil7cG9zaXRpb24gPSArK0luZGV4OyAvLyBQYXJzZSB0aGUgZGVjaW1hbCBjb21wb25lbnQuXG5mb3IoO3Bvc2l0aW9uIDwgbGVuZ3RoICYmIChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKSxjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7cG9zaXRpb24rKyk7aWYocG9zaXRpb24gPT0gSW5kZXgpeyAvLyBJbGxlZ2FsIHRyYWlsaW5nIGRlY2ltYWwuXG5hYm9ydCgpO31JbmRleCA9IHBvc2l0aW9uO30gLy8gUGFyc2UgZXhwb25lbnRzLiBUaGUgYGVgIGRlbm90aW5nIHRoZSBleHBvbmVudCBpc1xuLy8gY2FzZS1pbnNlbnNpdGl2ZS5cbmNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO2lmKGNoYXJDb2RlID09IDEwMSB8fCBjaGFyQ29kZSA9PSA2OSl7Y2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTsgLy8gU2tpcCBwYXN0IHRoZSBzaWduIGZvbGxvd2luZyB0aGUgZXhwb25lbnQsIGlmIG9uZSBpc1xuLy8gc3BlY2lmaWVkLlxuaWYoY2hhckNvZGUgPT0gNDMgfHwgY2hhckNvZGUgPT0gNDUpe0luZGV4Kys7fSAvLyBQYXJzZSB0aGUgZXhwb25lbnRpYWwgY29tcG9uZW50LlxuZm9yKHBvc2l0aW9uID0gSW5kZXg7cG9zaXRpb24gPCBsZW5ndGggJiYgKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQocG9zaXRpb24pLGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTtwb3NpdGlvbisrKTtpZihwb3NpdGlvbiA9PSBJbmRleCl7IC8vIElsbGVnYWwgZW1wdHkgZXhwb25lbnQuXG5hYm9ydCgpO31JbmRleCA9IHBvc2l0aW9uO30gLy8gQ29lcmNlIHRoZSBwYXJzZWQgdmFsdWUgdG8gYSBKYXZhU2NyaXB0IG51bWJlci5cbnJldHVybiArc291cmNlLnNsaWNlKGJlZ2luLEluZGV4KTt9IC8vIEEgbmVnYXRpdmUgc2lnbiBtYXkgb25seSBwcmVjZWRlIG51bWJlcnMuXG5pZihpc1NpZ25lZCl7YWJvcnQoKTt9IC8vIGB0cnVlYCwgYGZhbHNlYCwgYW5kIGBudWxsYCBsaXRlcmFscy5cbmlmKHNvdXJjZS5zbGljZShJbmRleCxJbmRleCArIDQpID09IFwidHJ1ZVwiKXtJbmRleCArPSA0O3JldHVybiB0cnVlO31lbHNlIGlmKHNvdXJjZS5zbGljZShJbmRleCxJbmRleCArIDUpID09IFwiZmFsc2VcIil7SW5kZXggKz0gNTtyZXR1cm4gZmFsc2U7fWVsc2UgaWYoc291cmNlLnNsaWNlKEluZGV4LEluZGV4ICsgNCkgPT0gXCJudWxsXCIpe0luZGV4ICs9IDQ7cmV0dXJuIG51bGw7fSAvLyBVbnJlY29nbml6ZWQgdG9rZW4uXG5hYm9ydCgpO319IC8vIFJldHVybiB0aGUgc2VudGluZWwgYCRgIGNoYXJhY3RlciBpZiB0aGUgcGFyc2VyIGhhcyByZWFjaGVkIHRoZSBlbmRcbi8vIG9mIHRoZSBzb3VyY2Ugc3RyaW5nLlxucmV0dXJuIFwiJFwiO307IC8vIEludGVybmFsOiBQYXJzZXMgYSBKU09OIGB2YWx1ZWAgdG9rZW4uXG52YXIgZ2V0PWZ1bmN0aW9uIGdldCh2YWx1ZSl7dmFyIHJlc3VsdHMsaGFzTWVtYmVycztpZih2YWx1ZSA9PSBcIiRcIil7IC8vIFVuZXhwZWN0ZWQgZW5kIG9mIGlucHV0LlxuYWJvcnQoKTt9aWYodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIpe2lmKChjaGFySW5kZXhCdWdneT92YWx1ZS5jaGFyQXQoMCk6dmFsdWVbMF0pID09IFwiQFwiKXsgLy8gUmVtb3ZlIHRoZSBzZW50aW5lbCBgQGAgY2hhcmFjdGVyLlxucmV0dXJuIHZhbHVlLnNsaWNlKDEpO30gLy8gUGFyc2Ugb2JqZWN0IGFuZCBhcnJheSBsaXRlcmFscy5cbmlmKHZhbHVlID09IFwiW1wiKXsgLy8gUGFyc2VzIGEgSlNPTiBhcnJheSwgcmV0dXJuaW5nIGEgbmV3IEphdmFTY3JpcHQgYXJyYXkuXG5yZXN1bHRzID0gW107Zm9yKDs7aGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpKSB7dmFsdWUgPSBsZXgoKTsgLy8gQSBjbG9zaW5nIHNxdWFyZSBicmFja2V0IG1hcmtzIHRoZSBlbmQgb2YgdGhlIGFycmF5IGxpdGVyYWwuXG5pZih2YWx1ZSA9PSBcIl1cIil7YnJlYWs7fSAvLyBJZiB0aGUgYXJyYXkgbGl0ZXJhbCBjb250YWlucyBlbGVtZW50cywgdGhlIGN1cnJlbnQgdG9rZW5cbi8vIHNob3VsZCBiZSBhIGNvbW1hIHNlcGFyYXRpbmcgdGhlIHByZXZpb3VzIGVsZW1lbnQgZnJvbSB0aGVcbi8vIG5leHQuXG5pZihoYXNNZW1iZXJzKXtpZih2YWx1ZSA9PSBcIixcIil7dmFsdWUgPSBsZXgoKTtpZih2YWx1ZSA9PSBcIl1cIil7IC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIGFycmF5IGxpdGVyYWwuXG5hYm9ydCgpO319ZWxzZSB7IC8vIEEgYCxgIG11c3Qgc2VwYXJhdGUgZWFjaCBhcnJheSBlbGVtZW50LlxuYWJvcnQoKTt9fSAvLyBFbGlzaW9ucyBhbmQgbGVhZGluZyBjb21tYXMgYXJlIG5vdCBwZXJtaXR0ZWQuXG5pZih2YWx1ZSA9PSBcIixcIil7YWJvcnQoKTt9cmVzdWx0cy5wdXNoKGdldCh2YWx1ZSkpO31yZXR1cm4gcmVzdWx0czt9ZWxzZSBpZih2YWx1ZSA9PSBcIntcIil7IC8vIFBhcnNlcyBhIEpTT04gb2JqZWN0LCByZXR1cm5pbmcgYSBuZXcgSmF2YVNjcmlwdCBvYmplY3QuXG5yZXN1bHRzID0ge307Zm9yKDs7aGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpKSB7dmFsdWUgPSBsZXgoKTsgLy8gQSBjbG9zaW5nIGN1cmx5IGJyYWNlIG1hcmtzIHRoZSBlbmQgb2YgdGhlIG9iamVjdCBsaXRlcmFsLlxuaWYodmFsdWUgPT0gXCJ9XCIpe2JyZWFrO30gLy8gSWYgdGhlIG9iamVjdCBsaXRlcmFsIGNvbnRhaW5zIG1lbWJlcnMsIHRoZSBjdXJyZW50IHRva2VuXG4vLyBzaG91bGQgYmUgYSBjb21tYSBzZXBhcmF0b3IuXG5pZihoYXNNZW1iZXJzKXtpZih2YWx1ZSA9PSBcIixcIil7dmFsdWUgPSBsZXgoKTtpZih2YWx1ZSA9PSBcIn1cIil7IC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIG9iamVjdCBsaXRlcmFsLlxuYWJvcnQoKTt9fWVsc2UgeyAvLyBBIGAsYCBtdXN0IHNlcGFyYXRlIGVhY2ggb2JqZWN0IG1lbWJlci5cbmFib3J0KCk7fX0gLy8gTGVhZGluZyBjb21tYXMgYXJlIG5vdCBwZXJtaXR0ZWQsIG9iamVjdCBwcm9wZXJ0eSBuYW1lcyBtdXN0IGJlXG4vLyBkb3VibGUtcXVvdGVkIHN0cmluZ3MsIGFuZCBhIGA6YCBtdXN0IHNlcGFyYXRlIGVhY2ggcHJvcGVydHlcbi8vIG5hbWUgYW5kIHZhbHVlLlxuaWYodmFsdWUgPT0gXCIsXCIgfHwgdHlwZW9mIHZhbHVlICE9IFwic3RyaW5nXCIgfHwgKGNoYXJJbmRleEJ1Z2d5P3ZhbHVlLmNoYXJBdCgwKTp2YWx1ZVswXSkgIT0gXCJAXCIgfHwgbGV4KCkgIT0gXCI6XCIpe2Fib3J0KCk7fXJlc3VsdHNbdmFsdWUuc2xpY2UoMSldID0gZ2V0KGxleCgpKTt9cmV0dXJuIHJlc3VsdHM7fSAvLyBVbmV4cGVjdGVkIHRva2VuIGVuY291bnRlcmVkLlxuYWJvcnQoKTt9cmV0dXJuIHZhbHVlO307IC8vIEludGVybmFsOiBVcGRhdGVzIGEgdHJhdmVyc2VkIG9iamVjdCBtZW1iZXIuXG52YXIgdXBkYXRlPWZ1bmN0aW9uIHVwZGF0ZShzb3VyY2UscHJvcGVydHksY2FsbGJhY2spe3ZhciBlbGVtZW50PXdhbGsoc291cmNlLHByb3BlcnR5LGNhbGxiYWNrKTtpZihlbGVtZW50ID09PSB1bmRlZil7ZGVsZXRlIHNvdXJjZVtwcm9wZXJ0eV07fWVsc2Uge3NvdXJjZVtwcm9wZXJ0eV0gPSBlbGVtZW50O319OyAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgdHJhdmVyc2VzIGEgcGFyc2VkIEpTT04gb2JqZWN0LCBpbnZva2luZyB0aGVcbi8vIGBjYWxsYmFja2AgZnVuY3Rpb24gZm9yIGVhY2ggdmFsdWUuIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlXG4vLyBgV2Fsayhob2xkZXIsIG5hbWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4yLlxudmFyIHdhbGs9ZnVuY3Rpb24gd2Fsayhzb3VyY2UscHJvcGVydHksY2FsbGJhY2spe3ZhciB2YWx1ZT1zb3VyY2VbcHJvcGVydHldLGxlbmd0aDtpZih0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIiAmJiB2YWx1ZSl7IC8vIGBmb3JFYWNoYCBjYW4ndCBiZSB1c2VkIHRvIHRyYXZlcnNlIGFuIGFycmF5IGluIE9wZXJhIDw9IDguNTRcbi8vIGJlY2F1c2UgaXRzIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIGltcGxlbWVudGF0aW9uIHJldHVybnMgYGZhbHNlYFxuLy8gZm9yIGFycmF5IGluZGljZXMgKGUuZy4sIGAhWzEsIDIsIDNdLmhhc093blByb3BlcnR5KFwiMFwiKWApLlxuaWYoZ2V0Q2xhc3MuY2FsbCh2YWx1ZSkgPT0gYXJyYXlDbGFzcyl7Zm9yKGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtsZW5ndGgtLTspIHt1cGRhdGUodmFsdWUsbGVuZ3RoLGNhbGxiYWNrKTt9fWVsc2Uge2ZvckVhY2godmFsdWUsZnVuY3Rpb24ocHJvcGVydHkpe3VwZGF0ZSh2YWx1ZSxwcm9wZXJ0eSxjYWxsYmFjayk7fSk7fX1yZXR1cm4gY2FsbGJhY2suY2FsbChzb3VyY2UscHJvcGVydHksdmFsdWUpO307IC8vIFB1YmxpYzogYEpTT04ucGFyc2VgLiBTZWUgRVMgNS4xIHNlY3Rpb24gMTUuMTIuMi5cbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbihzb3VyY2UsY2FsbGJhY2spe3ZhciByZXN1bHQsdmFsdWU7SW5kZXggPSAwO1NvdXJjZSA9IFwiXCIgKyBzb3VyY2U7cmVzdWx0ID0gZ2V0KGxleCgpKTsgLy8gSWYgYSBKU09OIHN0cmluZyBjb250YWlucyBtdWx0aXBsZSB0b2tlbnMsIGl0IGlzIGludmFsaWQuXG5pZihsZXgoKSAhPSBcIiRcIil7YWJvcnQoKTt9IC8vIFJlc2V0IHRoZSBwYXJzZXIgc3RhdGUuXG5JbmRleCA9IFNvdXJjZSA9IG51bGw7cmV0dXJuIGNhbGxiYWNrICYmIGdldENsYXNzLmNhbGwoY2FsbGJhY2spID09IGZ1bmN0aW9uQ2xhc3M/d2FsaygodmFsdWUgPSB7fSx2YWx1ZVtcIlwiXSA9IHJlc3VsdCx2YWx1ZSksXCJcIixjYWxsYmFjayk6cmVzdWx0O307fX1leHBvcnRzW1wicnVuSW5Db250ZXh0XCJdID0gcnVuSW5Db250ZXh0O3JldHVybiBleHBvcnRzO31pZihmcmVlRXhwb3J0cyAmJiAhaXNMb2FkZXIpeyAvLyBFeHBvcnQgZm9yIENvbW1vbkpTIGVudmlyb25tZW50cy5cbnJ1bkluQ29udGV4dChyb290LGZyZWVFeHBvcnRzKTt9ZWxzZSB7IC8vIEV4cG9ydCBmb3Igd2ViIGJyb3dzZXJzIGFuZCBKYXZhU2NyaXB0IGVuZ2luZXMuXG52YXIgbmF0aXZlSlNPTj1yb290LkpTT04scHJldmlvdXNKU09OPXJvb3RbXCJKU09OM1wiXSxpc1Jlc3RvcmVkPWZhbHNlO3ZhciBKU09OMz1ydW5JbkNvbnRleHQocm9vdCxyb290W1wiSlNPTjNcIl0gPSB7IC8vIFB1YmxpYzogUmVzdG9yZXMgdGhlIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSBnbG9iYWwgYEpTT05gIG9iamVjdCBhbmRcbi8vIHJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIGBKU09OM2Agb2JqZWN0LlxuXCJub0NvbmZsaWN0XCI6ZnVuY3Rpb24gbm9Db25mbGljdCgpe2lmKCFpc1Jlc3RvcmVkKXtpc1Jlc3RvcmVkID0gdHJ1ZTtyb290LkpTT04gPSBuYXRpdmVKU09OO3Jvb3RbXCJKU09OM1wiXSA9IHByZXZpb3VzSlNPTjtuYXRpdmVKU09OID0gcHJldmlvdXNKU09OID0gbnVsbDt9cmV0dXJuIEpTT04zO319KTtyb290LkpTT04gPSB7XCJwYXJzZVwiOkpTT04zLnBhcnNlLFwic3RyaW5naWZ5XCI6SlNPTjMuc3RyaW5naWZ5fTt9IC8vIEV4cG9ydCBmb3IgYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzLlxuaWYoaXNMb2FkZXIpe2RlZmluZShmdW5jdGlvbigpe3JldHVybiBKU09OMzt9KTt9fSkuY2FsbCh0aGlzKTt9KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCI/c2VsZjp0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiP3dpbmRvdzp0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiP2dsb2JhbDp7fSk7fSx7fV0sNTE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe21vZHVsZS5leHBvcnRzID0gdG9BcnJheTtmdW5jdGlvbiB0b0FycmF5KGxpc3QsaW5kZXgpe3ZhciBhcnJheT1bXTtpbmRleCA9IGluZGV4IHx8IDA7Zm9yKHZhciBpPWluZGV4IHx8IDA7aSA8IGxpc3QubGVuZ3RoO2krKykge2FycmF5W2kgLSBpbmRleF0gPSBsaXN0W2ldO31yZXR1cm4gYXJyYXk7fX0se31dfSx7fSxbMzFdKSgzMSk7fSk7fVxuXG5jYy5fUkZwb3AoKTsiXX0=
