cc.Class({
    "extends": cc.Component,

    properties: {
        LoadingBar: cc.ProgressBar,
        ToSceneName: "",
        ResList: {
            "default": [],
            type: [cc.String]
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this._urls = [];
        for (var prop in this.ResList) {
            var path = this.ResList[prop];
            var start = path.lastIndexOf("/");
            var filename = path.substring(start + 1, path.length);
            this._urls.push({ id: filename, url: cc.url.raw(path) });
        }

        this.LoadingBar.progress = 0;
        cc.loader.releaseAll();
        cc.loader.load(this._urls, this._progressCallback.bind(this), this._completeCallback.bind(this));
    },

    _progressCallback: function _progressCallback(completedCount, totalCount, res) {
        this.LoadingBar.progress = completedCount / totalCount;
        this.resource = res;
        this.completedCount = completedCount;
        this.totalCount = totalCount;
        cc.log(res);
    },

    _completeCallback: function _completeCallback(error, res) {
        cc.director.loadScene(this.ToSceneName);
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },