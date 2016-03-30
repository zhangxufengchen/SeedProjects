"use strict";
cc._RFpush(module, 'a0f76uMHghGwr6/VfnCowWW', 'Tools');
// Script/tool/Tools.js

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