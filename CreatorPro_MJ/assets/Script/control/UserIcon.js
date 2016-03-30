

cc.Class({
    extends: cc.Component,
    properties: {
        IconIndex:0,
        SpriteList: {
            default: [],
            type: [cc.SpriteFrame]
        },
    },
    
    // use this for initialization
    onLoad: function () {
        var com = this.getComponent(cc.Sprite);
        if (this.IconIndex == -1) {
            var tools = require('Tools');
            this.IconIndex = tools.GetRandomNum(0, this.SpriteList.length-1);
        }
        com.spriteFrame = this.SpriteList[this.IconIndex];
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
