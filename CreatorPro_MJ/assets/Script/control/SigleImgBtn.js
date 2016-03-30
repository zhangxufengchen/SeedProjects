cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                
                self.node.setScale(2);
                console.log("adafd");
                
                return true;
            },
            onTouchEnd: function (touch, event) {
                
                self.node.setScale(1);
                
            }
        }, self.node);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
            
    // },
});
