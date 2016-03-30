"use strict";
cc._RFpush(module, 'a310beKkwZApa5rKUMTDiY/', 'SigleImgBtn');
// Script/control/SigleImgBtn.js

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