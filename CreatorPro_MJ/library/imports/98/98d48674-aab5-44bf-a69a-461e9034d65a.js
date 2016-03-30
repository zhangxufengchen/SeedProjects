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