cc.Class({
    extends: cc.Component,

    properties: {
        audioManager: {
            default: null,
            type: cc.Node
        },
        ListLayout:{
            default : null,
            type : cc.Layout
        },
        Cell_prefab:{
            default:null,
            type:cc.Prefab
        },
    },
    
    self : null,

    // use this for initialization
    onLoad: function () {
        self = this;
        
        this.audioManager = this.audioManager.getComponent('AudioManager');
        this.audioManager.playMusic();
        
        for(var i = 0; i < 4; ++i)
        {
            var newCell = cc.instantiate(this.Cell_prefab);
            
            newCell.getComponent('GameListCell').GameId = i;
            newCell.getComponent('GameListCell').CoinNum = 100*i;
            newCell.getComponent('GameListCell').MainScriptNode = this;
            
            this.ListLayout.node.addChild(newCell);
            
            
            console.log(this.ListLayout);
        }
        
    },
    
    onGameSelected : function(gameid) {
        console.log(gameid + '被选择');
        cc.director.loadScene('Game');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
