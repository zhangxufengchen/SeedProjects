
let CARD_SHOW_TYPE = cc.Enum ({
    OWN_UP:0,
    OWN_DOWN:1,
    LEFT:2,
    RIGHT:3,
    UP:4,
});
let CARD_TYPE = cc.Enum ({
    Guan:1,
    Tiao:2,
    Bing:3,
    Feng:4,
    Hua:5,
    Bg:6,
});

let tools = require('Tools');

cc.Class({
    extends: cc.Component,

    properties: {
        ResPath:'',
        CardIndex:0,    //牌型序列
        CardShowType: {
            default : CARD_SHOW_TYPE.OWN,
            type : CARD_SHOW_TYPE
        },
        CardType: {
            default : CARD_TYPE.Bg,
            type : CARD_TYPE
        },
        CardFrameMidName : {
            default :[],
            type : [cc.String]
        }
        
    },

    // use this for initialization
    onLoad: function () {
        
        let self = this;
        let CardIndexStart = 0;
        let showType = this.CardFrameMidName[this.CardShowType];
        
        if (this.CardType == CARD_TYPE.Guan) {
            CardIndexStart = 0;
        } else if (this.CardType == CARD_TYPE.Tiao) {
            CardIndexStart = 9;
        } else if (this.CardType == CARD_TYPE.Bing) {
            CardIndexStart = 18;
        } else if (this.CardType == CARD_TYPE.Feng) {
            CardIndexStart = 27;
        } else if (this.CardType == CARD_TYPE.Hua) {
            CardIndexStart = 34;
        } else if (this.CardType == CARD_TYPE.Bg) {
            CardIndexStart = 43;
        }
        
        let cardid = tools.fix(CardIndexStart + this.CardIndex-1, 4);
        
        tools.loadRes(this.ResPath + showType + '_' + cardid + '_-', function (spriteFrame) {
           var com = self.getComponent(cc.Sprite);
           com.spriteFrame = spriteFrame; 
        })

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
