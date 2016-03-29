cc.Class({
    extends: cc.Component,

    properties: {
        MainScriptNode:{
            default:null,
            type: cc.Node
        },
        GameId:0,
        CoinNum:0,
        Label:{
            default:null,
            type:cc.Label
        },
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        },
    },

    // use this for initialization
    onLoad: function () {
        // var img = 'Resource/UI/roomBg'+this.GameId.toString()+'.png';
        // console.log(img);
        // var frame = new cc.SpriteFrame(cc.url.raw(img));
        
        var com = this.getComponent(cc.Sprite);
        //com.spriteFrame = frame; 
        
        com.spriteFrame = this.spriteList[this.GameId];
        
        this.Label.string = this.CoinNum.toString();
    },
    onCellClicked : function() {
        this.MainScriptNode.getComponent('GameList').onGameSelected(this.GameId);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
