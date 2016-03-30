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