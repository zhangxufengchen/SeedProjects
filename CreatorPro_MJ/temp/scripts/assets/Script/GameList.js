cc._RFpush(module, '72723WvUhFK8rF7P/HeINQl', 'GameList');
// Script\GameList.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        ListLayout: {
            'default': null,
            type: cc.Layout
        },
        Cell_prefab: {
            'default': null,
            type: cc.Prefab
        }
    },

    self: null,

    // use this for initialization
    onLoad: function onLoad() {
        self = this;

        for (i = 0; i < 4; ++i) {
            var newCell = cc.instantiate(this.Cell_prefab);

            newCell.getComponent('GameListCell').GameId = i;
            newCell.getComponent('GameListCell').CoinNum = 100 * i;

            this.ListLayout.node.addChild(newCell);

            console.log(this.ListLayout);
        }
    },

    onGameSelected: function onGameSelected(sender, value) {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();