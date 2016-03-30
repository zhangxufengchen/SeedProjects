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